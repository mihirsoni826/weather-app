import { Component, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { Weather } from '../../model/weather';
import { Location } from '../../model/location';
import { ErrorComponent } from '../../model/error/error.component';
import { GeodbService } from '../../services/geodb/geodb.service';
import {
  FormBuilder,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CurrentWeatherComponent, ErrorComponent, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  weatherData: Weather | undefined;
  locationData: Location | undefined;
  displayWeatherResults: boolean = false;
  noResultsFound: boolean = false;
  citySuggestions: Array<string> = [];
  form = this.formBuilder.group({
    searchQuery: ['', Validators.required],
    li: [''],
  });

  constructor(
    private weatherService: WeatherService,
    private geodbService: GeodbService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((formValue) => {
      this.getCityNameSuggestions(formValue.searchQuery!);
    });
    document.addEventListener('click', () =>
      this.toggleAutoCompleteBoxVisibility('hidden')
    );
  }

  optionSelected(event: any) {
    event.stopImmediatePropagation();
    this.toggleAutoCompleteBoxVisibility('hidden');
    this.getCurrentWeather(event.target.innerText);
  }

  getCurrentWeather(query?: string) {
    let searchQuery: string = query ? query : this.form.value.searchQuery!;

    this.form.patchValue({
      searchQuery: searchQuery,
    });

    this.weatherService
      .getCurrentWeather(searchQuery)
      .then((data) => {
        this.weatherData = data[0];
        this.locationData = data[1];
        this.displayWeatherResults = true;
      })
      .catch((err) => {
        this.displayWeatherResults = false;
        this.noResultsFound = true;
      });
  }

  toggleAutoCompleteBoxVisibility(value: string) {
    let classList = document.getElementById('autocomplete-box')?.classList;
    if (value === 'show') classList?.remove('hidden');
    else classList?.add('hidden');
  }

  getCityNameSuggestions(cityPrefix: string) {
    if (cityPrefix && cityPrefix.length > 1) {
      this.geodbService.getCities(cityPrefix).then((data) => {
        this.toggleAutoCompleteBoxVisibility('show');
        this.citySuggestions = [];
        this.citySuggestions = [...data];
      });
    } else {
      this.toggleAutoCompleteBoxVisibility('hidden');
    }
  }
}
