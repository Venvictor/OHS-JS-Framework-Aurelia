import {Home} from '../../src/home/home';

class HttpStub {
  fetch(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    })
  }
  configure(func){
  }
}

describe('the Home module', () => {

  it('sets fetch response to patients', (done) => {
    var http = new HttpStub(),
        sut = new Home(http),
        bundle = {
          "resourceType": "Bundle",
          "id": "5609ffc919d250774a0002b3",
          "type": "searchset",
          "total": 2,
          "entry": [{
            "resource": {
              "resourceType": "Patient",
              "id": "5609e43b19d250774a000001",
              "name": [{
                "family": ["Jacobs"],
                "given": ["Irene"]
              }],
              "gender": "female",
              "birthDate": "1941-06-15",
              "address": [{
                "line": ["Aberg Avenue"],
                "city": "City of Commerce",
                "state": "NE",
                "postalCode": "0992114"
              }]
            }
          }, {
            "resource": {
              "resourceType": "Patient",
              "id": "5609e43b19d250774a00001b",
              "name": [{
                "family": ["Riley"],
                "given": ["Diana"]
              }],
              "gender": "female",
              "birthDate": "1949-08-03",
              "address": [{
                "line": ["Hansons Way"],
                "city": "Lemon Grove",
                "state": "NY",
                "postalCode": "8042915"
              }]
            }
          }]
        }

    http.itemStub = bundle;
    sut.activate().then(() => {
      expect(sut.patients.length).toBe(2);
      expect(sut.patients[0].id).toBe("5609e43b19d250774a000001");
      expect(sut.patients[0].firstName).toBe("Irene");
      expect(sut.patients[0].lastName).toBe("Jacobs");
      expect(sut.patients[1].id).toBe("5609e43b19d250774a00001b");
      expect(sut.patients[1].firstName).toBe("Diana");
      expect(sut.patients[1].lastName).toBe("Riley");
      done();
    });
  });
});
