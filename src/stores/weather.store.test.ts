import { beforeEach, describe, it, expect } from "vitest";
import { useWeatherStore } from "./weather.store";

describe("useWeatherStore", () => {
  beforeEach(async () => {
    const state = useWeatherStore.getState();

    try {
      await state.fetch();
      console.log("Let say did fetch...");
    } catch (error) {
      console.log("Error...", error);
    }
  });

  it("should have data after fetch", () => {
    const state = useWeatherStore.getState();
    expect(state.temperature_2m).not.toEqual(-88);
    expect(state.daily).not.toEqual([]);
    expect(state.hourly).not.toEqual([]);
    expect(Array.isArray(state.daily)).toBe(true);
    expect(Array.isArray(state.hourly)).toBe(true);

    // console.log(useWeatherStore.getState());
  });
});
