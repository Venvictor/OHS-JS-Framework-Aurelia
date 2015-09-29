import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Patient} from '../fhir/patient'
import {Observation} from '../fhir/observation'
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
    // Clear BMIs and load the patients from FHIR
    this.bmis = []
    return this.http.fetch('Patient')
      .then(response => response.json())
      .then(bundle => Array.from(bundle.entry, e => new Patient(e.resource)))
      .then(patients => this.patients = patients.sort((a, b) => {
        return cmp(a.lastName, b.lastName) || cmp(a.firstName, b.firstName)
      }));
  }

  loadPatient(p){
    // Mark the "active" patient
    for (let patient of this.patients) {
      patient.isActive = (patient == p)
    }

    // We'll need a function to pair heights and weights together for BMI calculation
    let bmisFromObservations = function(observations) {
      let sortFn = (a, b) => cmp(a.date, b.date)
      let heights = Array.filter(observations, o => o.hasCode('http://loinc.org','8302-2')).sort(sortFn)
      let weights = Array.filter(observations, o => o.hasCode('http://loinc.org','29463-7')).sort(sortFn)

      let i = 0
      return Array.from(weights, w => {
        if (heights[i+1] && heights[i+1].date <= w.date) i++
        return new BMI(heights[i], w)
      })
    }

    // Get all of the patient's height and weight observations from FHIR.
    return this.http.fetch(`Observation?patient=${p.id}&code=http://loinc.org|8302-2,29463-7`)
      .then(response => response.json())
      .then(bundle => Array.from(bundle.entry, e => new Observation(e.resource)))
      .then(observations => this.bmis = bmisFromObservations(observations));
    }
}

// A simple BMI class to hold the paired height/weight observations and calculate BMI
export class BMI{
  constructor(heightObs, weightObs){
    this.height = heightObs
    this.weight = weightObs
  }

  // This is overkill since height and weight will never change, but I wanted to show how it's done
  @computedFrom('height', 'weight')
  get BMI(){
    return ((this.weight.value * 703) / Math.pow(this.height.value, 2)).toFixed(1)
  }
}

// A standard compare function for use in sorting
let cmp = (a, b) => a < b ? -1 : a > b ? 1 : 0
