import "./App.css";
import { useWeatherStore } from "./stores/weather.store";
import { CurrentLocationCard } from "./components/CurrentLocationCard";
import { useEffect } from "react";

function App() {
  const fetchWeather = useWeatherStore((s) => s.fetch);
  const temperature_2m = useWeatherStore((s) => s.temperature_2m);
  const loading = useWeatherStore((s) => s.loading);

  useEffect(() => {
    fetchWeather();
  }, []);

  console.log("Creating app...");

  const displayTemp = loading || temperature_2m === null ? "--" : temperature_2m;

  return CurrentLocationCard({
    feelsLike: 1,
    high: 2,
    low: 3,
    name: "Berlin",
    temp: displayTemp,
    isCurrent: false,
  });
}

export default App;
