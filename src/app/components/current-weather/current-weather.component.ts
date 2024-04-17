import { Component, Input } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { Weather } from '../../model/weather';
import { Location } from '../../model/location';
import { initTooltips } from 'flowbite';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  isDay: boolean = true;
  dayOrNight: string = 'day';
  @Input() weatherData!: Weather;
  @Input() locationData!: Location;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    initTooltips();
  }

  ngOnChanges() {
    const regex = /^.*\s(\d{1,2}).*$/;
    let time = +regex.exec(this.locationData.localTime)![1];
    let day = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    if (day.includes(time)) this.dayOrNight = 'day';
    else this.dayOrNight = 'night';
  }
}
