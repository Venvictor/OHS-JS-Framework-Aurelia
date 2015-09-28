import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Home{
  constructor(http){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://mm181308-pc.mitre.org:3001/');
    });

    this.http = http;
  }

  activate(){
    this.bmis = []
    return this.http.fetch('Patient')
      .then(response => response.json())
      .then(bundle => this.patients = Array.from(bundle.entry, e => new Patient(e.resource)));
  }

  loadBMI(p){
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

export class Patient{
  constructor(resource){
    this.id = resource.id
    this.firstName = resource.name[0].given[0]
    this.lastName = resource.name[0].family[0]
  }
}

export class Observation{
  constructor(resource){
    this.code = resource.code
    this.date = resource.effectiveDateTime
    this.value = resource.valueQuantity.value
  }

  hasCode(system, code){
    return this.code.coding.some(c => c.system == system && c.code == code)
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
