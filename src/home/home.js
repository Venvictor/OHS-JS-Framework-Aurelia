import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Patient} from 'fhir/patient'
import {Observation} from 'fhir/observation'
import 'fetch';

@inject(HttpClient)
export class Home{
  constructor(http){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3001/');
    });

    this.http = http;
  }

  activate(){
    this.bmis = []
    return this.http.fetch('Patient')
      .then(response => response.json())
      .then(bundle => this.patients = Array.from(bundle.entry, e => new Patient(e.resource)));
  }

  loadPatient(p){
    for (let patient of this.patients) {
      patient.isActive = (patient == p)
    }

    let bmisFromObservations = function(observations) {
      let sortFn = (a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0
      let heights = Array.filter(observations, o => o.hasCode('http://loinc.org','8302-2')).sort(sortFn)
      let weights = Array.filter(observations, o => o.hasCode('http://loinc.org','29463-7')).sort(sortFn)

      let i = 0
      return Array.from(weights, w => {
        if (heights[i+1] && heights[i+1].date <= w.date) i++
        return new BMI(heights[i], w)
      })
    }

    return this.http.fetch('Observation?patient=' + p.id)
      .then(response => response.json())
      .then(bundle => Array.from(bundle.entry, e => new Observation(e.resource)))
      .then(observations => this.bmis = bmisFromObservations(observations));
    }
}

export class BMI{
  constructor(heightObs, weightObs){
    this.height = heightObs
    this.weight = weightObs
  }

  @computedFrom('height', 'weight')
  get BMI(){
    return ((this.weight.value * 703) / Math.pow(this.height.value, 2)).toFixed(1)
  }
}
