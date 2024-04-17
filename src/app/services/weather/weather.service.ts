import { Injectable } from '@angular/core';
import { Weather } from '../../model/weather';
import { Location } from '../../model/location';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private BASE_URL: string = 'https://api.weatherapi.com/v1';
  private API_KEY: string = 'a9ddb94a60664356bef143608241504';
  private query: string | undefined;

  constructor() {}

  setQuery(query: string) {
    this.query = query;
  }
  getQuery() {
    return this.query;
  }

  async getCurrentWeather(
    query: string | undefined
  ): Promise<[Weather, Location]> {
    const response = await fetch(
      `${this.BASE_URL}/current.json?q=${query}&key=${this.API_KEY}`
    );
    let data = await response.json();
    const regex = /^.*(\d{3}\.png)$/;

    return new Promise<[Weather, Location]>((resolve, reject) => {
      if (response.status !== 200) {
        reject(data.error.message);
      }
      let weather: Weather = {
        tempC: data.current.temp_c,
        tempF: data.current.temp_f,
        feelsLikeC: data.current.feelslike_c,
        feelsLikeF: data.current.feelslike_f,
        text: data.current.condition.text,
        icon: regex.exec(data.current.condition.icon)![1],
      };

      let location: Location = {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        localTime: data.location.localtime,
        timezone: data.location.tz_id,
      };
      resolve([weather, location]);
    });
  }
}
