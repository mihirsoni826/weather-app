import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeodbService {
  private BASE_URL = 'http://geodb-free-service.wirefreethought.com';
  constructor() {}

  async getCities(cityPrefix: string): Promise<Array<string>> {
    const data = await fetch(
      `${this.BASE_URL}/v1/geo/places?namePrefix=${cityPrefix}&hateoasMode=false&limit=5&offset=0&sort=-population,name`
    );
    const response = await data.json();
    let cityNames = [];
    for (let cityObj of response.data) cityNames.push(cityObj.name);
    return cityNames;
  }
}
