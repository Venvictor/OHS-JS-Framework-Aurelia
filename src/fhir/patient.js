export class Patient{
  constructor(resource){
    this.id = resource.id
    this.firstName = resource.name[0].given[0]
    this.lastName = resource.name[0].family[0]
  }
}
