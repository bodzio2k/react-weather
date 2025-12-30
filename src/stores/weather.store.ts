import { create } from "zustand";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  temperature_2m: number | null;
  daily: object[];
  hourly: object[];
  loading: boolean;
  fetch: () => Promise<void>;
}

export const useWeatherStore = create<WeatherData>()((set) => ({
  temperature_2m: null,
  daily: [],
  hourly: [],
  loading: false,
  fetch: async () => {
    set({ loading: true });
    console.log("Fetching...");

    const params = {
      //latitude: 52.52,
      //longitude: 13.41,
      latitude: 34.05,
      longitude: 118.24,
      hourly: ["temperature_2m"],
      daily: ["temperature_2m_max", "temperature_2m_min"],
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    console.log("Did fetch...");

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const sunrise = daily.variables(0)!;
    const sunset = daily.variables(1)!;

    // console.log(
    // //   `\nCoordinates: ${latitude}°N ${longitude}°E`,
    // //   `\nElevation: ${elevation}m asl`,
    // //   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
    // // );

    const hourlyTemperatureArray = hourly.variables(0)?.valuesArray();
    const currentTemperature = hourlyTemperatureArray?.[0] || 0;

    const hourlyLength =
      (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval();
    const dailyLength =
      (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval();

    const hourlyTimeArray = Array.from(
      { length: hourlyLength },
      (_, i) =>
        new Date(
          (Number(hourly.time()) +
            i * hourly.interval() +
            utcOffsetSeconds) *
          1000
        )
    );

    const dailyTimeArray = Array.from(
      { length: dailyLength },
      (_, i) =>
        new Date(
          (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
          1000
        )
    );

    const hourlyData = Array.from({ length: hourlyLength }, (_, i) => ({
      time: hourlyTimeArray[i],
      temperature_2m: hourlyTemperatureArray?.[i] ?? null,
      precipitation_probability: hourly.variables(1)?.valuesArray()?.[i] ?? null,
      precipitation: hourly.variables(2)?.valuesArray()?.[i] ?? null,
      rain: hourly.variables(3)?.valuesArray()?.[i] ?? null,
      showers: hourly.variables(4)?.valuesArray()?.[i] ?? null,
    }));

    const dailyData = Array.from({ length: dailyLength }, (_, i) => ({
      time: dailyTimeArray[i],
      sunrise: new Date(
        (Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000
      ),
      sunset: new Date(
        (Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000
      ),
      temperature_2m_max: daily.variables(2)?.valuesArray()?.[i] ?? null,
      temperature_2m_min: daily.variables(3)?.valuesArray()?.[i] ?? null,
      wind_speed_10m_max: daily.variables(4)?.valuesArray()?.[i] ?? null,
      wind_gusts_10m_max: daily.variables(5)?.valuesArray()?.[i] ?? null,
    }));

    set({
      temperature_2m: currentTemperature,
      daily: dailyData,
      hourly: hourlyData,
      loading: false,
    });
  },
}));
