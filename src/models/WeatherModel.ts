import type { DailyForecast } from './DailyForecast';
import type { HourlyForecast } from './HourlyForecast';

export class WeatherModel {
  location: string;
  temperature: number;
  conditions: string;
  hourlyForecast: HourlyForecast[];
  weeklyForecast: DailyForecast[];

  constructor(
    location: string,
    temperature: number,
    conditions: string,
    hourlyForecast: HourlyForecast[],
    weeklyForecast: DailyForecast[]
  ) {
    this.location = location;
    this.temperature = temperature;
    this.conditions = conditions;
    this.hourlyForecast = hourlyForecast;
    this.weeklyForecast = weeklyForecast;
  }

  // Przykładowa metoda klasy do formatowania temperatury
  getFormattedTemperature(): string {
    return `${this.temperature}°C`;
  }
}