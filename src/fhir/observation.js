export class Observation{
  constructor(resource){
    this.code = resource.code
    this.date = new Date(resource.effectiveDateTime)
    this.value = resource.valueQuantity.value
  }

  hasCode(system, code){
    return this.code.coding.some(c => c.system == system && c.code == code)
  }
}
