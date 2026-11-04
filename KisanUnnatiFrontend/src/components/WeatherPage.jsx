import React, { useState, useEffect, useMemo } from "react";
import "./WeatherPage.css";

// --- WMO mapping (same as before) ---
const WMO_CODES = {
  0: { description: "Clear sky", icon: "☀️" },
  1: { description: "Mainly clear", icon: "🌤️" },
  2: { description: "Partly cloudy", icon: "⛅" },
  3: { description: "Overcast", icon: "☁️" },
  45: { description: "Fog", icon: "🌫️" },
  48: { description: "Depositing rime fog", icon: "🌫️" },
  51: { description: "Light drizzle", icon: "🌦️" },
  53: { description: "Moderate drizzle", icon: "🌦️" },
  55: { description: "Dense drizzle", icon: "🌦️" },
  61: { description: "Slight rain", icon: "🌧️" },
  63: { description: "Moderate rain", icon: "🌧️" },
  65: { description: "Heavy rain", icon: "🌧️" },
  80: { description: "Slight rain showers", icon: "🌦️" },
  81: { description: "Moderate rain showers", icon: "🌦️" },
  82: { description: "Violent rain showers", icon: "🌦️" },
  95: { description: "Thunderstorm", icon: "⛈️" },
  96: { description: "Thunderstorm with slight hail", icon: "⛈️" },
  99: { description: "Thunderstorm with heavy hail", icon: "⛈️" },
};
const RAINY_CODES = [61, 63, 65, 80, 81, 82, 95, 96, 99];
const ALERT_CODES = [95, 96, 99];

export default function WeatherDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);

  // Harvest risk state
  const [cropReady, setCropReady] = useState(true); // toggle for "ready to harvest"
  const [rainRisk, setRainRisk] = useState({ willRainWithin48: false, eventTime: null });
  const [notifyPerm, setNotifyPerm] = useState(Notification?.permission || "default");

  // --- Helpers ---
  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDateTime = (d) =>
    d.toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" });

  const toICSDate = (date) => {
    // UTC yyyymmddThhmmssZ
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");
    return (
      d.getUTCFullYear().toString() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      pad(d.getUTCSeconds()) +
      "Z"
    );
  };

  const makeICS = (rainStart) => {
    // Event scheduled exactly 48h before rain start
    const start = new Date(rainStart.getTime() - 48 * 3600 * 1000);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30-min block
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//FarmGuard//Harvest Alert//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(start)}`,
      `DTEND:${toICSDate(end)}`,
      "SUMMARY:🌧️ Rain expected — prepare harvest",
      `DESCRIPTION:Rain expected around ${formatDateTime(rainStart)} at ${city}. Consider harvesting before it starts.`,
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "harvest-rain-alert.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const requestNotif = async () => {
    if (!("Notification" in window)) return alert("Notifications not supported in this browser.");
    const perm = await Notification.requestPermission();
    setNotifyPerm(perm);
  };

  const showImmediateNotification = (rainStart) => {
    if (!("Notification" in window) || notifyPerm !== "granted") return;
    new Notification("🌧️ Rain expected within 48 hours", {
      body: `Rain around ${formatDateTime(rainStart)}. Consider harvesting early.`,
      icon: undefined, // add your icon path if you have one
    });
  };

  // --- Risk detection from hourly data ---
  const computeRainRisk = (hourly) => {
    if (!hourly?.time?.length) return { willRainWithin48: false, eventTime: null };

    const now = new Date();
    for (let i = 0; i < hourly.time.length; i++) {
      const t = new Date(hourly.time[i]);
      const aheadHrs = (t - now) / 3600000;
      if (aheadHrs < 0 || aheadHrs > 72) continue; // scan next 72h

      const code = hourly.weather_code?.[i];
      const prob = hourly.precipitation_probability?.[i];
      const precip = hourly.precipitation?.[i]; // mm
      const rainyByCode = RAINY_CODES.includes(code);
      const rainyByProb = typeof prob === "number" && prob >= 70; // threshold
      const rainyByAmount = typeof precip === "number" && precip >= 1.0; // 1mm+

      if (rainyByCode || rainyByProb || rainyByAmount) {
        const within48 = aheadHrs <= 48;
        return { willRainWithin48: within48, eventTime: t };
      }
    }
    return { willRainWithin48: false, eventTime: null };
  };

  // --- API calls (updated to include hourly) ---
  const fetchWeatherForCoords = async (lat, lon, cityName) => {
    setLoading(true);
    setError("");
    try {
      const weatherParams =
        "current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset" +
        "&hourly=weather_code,precipitation_probability,precipitation" +
        "&timezone=auto";
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${weatherParams}`
      );
      if (!res.ok) throw new Error("Failed to fetch weather data.");
      const data = await res.json();

      setWeather(data);
      setCity(cityName);

      // compute risk
      const risk = computeRainRisk(data.hourly);
      setRainRisk(risk);

      // If already within 48h and crop is ready, notify now
      if (risk.willRainWithin48 && cropReady) {
        showImmediateNotification(risk.eventTime);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoordsForCity = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=en&format=json`
      );
      if (!res.ok) throw new Error("Failed to fetch location data.");
      const data = await res.json();
      if (!data.results || data.results.length === 0)
        throw new Error(`Could not find location: "${cityName}".`);
      const { latitude, longitude, name } = data.results[0];
      fetchWeatherForCoords(latitude, longitude, name);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      if (!res.ok) throw new Error("Could not determine city name.");
      const data = await res.json();
      return data.address.city || data.address.town || "Current Location";
    } catch (err) {
      console.error(err);
      return "Current Location";
    }
  };

  // --- Initial load ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const cityName = await fetchCityFromCoords(latitude, longitude);
          fetchWeatherForCoords(latitude, longitude, cityName);
        },
        () => {
          fetchWeatherForCoords(22.7196, 75.8577, "Indore");
        }
      );
    } else {
      fetchWeatherForCoords(22.7196, 75.8577, "Indore");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- UI helpers for existing cards ---
  const renderCurrentWeather = () => {
    const { current, daily } = weather;
    return (
      <div id="current-weather-card" className="weather-card">
        <div className="content">
          <div className="main-info">
            <h2 className="location">{city}</h2>
            <p className="description">
              {WMO_CODES[current.weather_code]?.description || "Unknown"}
            </p>
            <div className="temp-display">
              <div className="temp">{Math.round(current.temperature_2m)}°C</div>
              <div className="weather-icon">
                {WMO_CODES[current.weather_code]?.icon || "🤷"}
              </div>
            </div>
            <p className="feels-like">
              Feels like {Math.round(current.apparent_temperature)}°C
            </p>
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <span>💧</span>Humidity: {current.relative_humidity_2m}%
            </div>
            <div className="detail-item">
              <span>💨</span>Wind: {current.wind_speed_10m.toFixed(1)} km/h
            </div>
            <div className="detail-item">
              <span>🌅</span>Sunrise: {formatTime(weather.daily.sunrise[0])}
            </div>
            <div className="detail-item">
              <span>🌇</span>Sunset: {formatTime(weather.daily.sunset[0])}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAlerts = () => {
    const { daily } = weather;
    const upcoming = daily.weather_code.slice(0, 3);
    const severe = upcoming.find((c) => ALERT_CODES.includes(c));
    return (
      <div
        id="alerts-card"
        className={`weather-card ${severe ? "alert-active" : "alert-none"}`}
      >
        <h2>Weather Alerts</h2>
        <p id="alert-text">
          {severe
            ? `ALERT: Potential for ${
                WMO_CODES[severe]?.description || "Severe Weather"
              } in the next 3 days.`
            : "No active weather alerts for this area."}
        </p>
      </div>
    );
  };

  // --- NEW: Harvest Risk card ---
  const renderHarvestRisk = () => {
    if (!cropReady) {
      return (
        <div className="weather-card">
          <h2>Harvest Risk (48h)</h2>
          <p>Crop not marked as "Ready to harvest". Toggle below to enable risk alerts.</p>
        </div>
      );
    }

    if (rainRisk.willRainWithin48) {
      return (
        <div className="weather-card alert-active">
          <h2>🌧️ Harvest Risk in 48 Hours</h2>
          <p>
            Rain expected around <b>{formatDateTime(rainRisk.eventTime)}</b>. It may damage your
            harvest. Consider cutting crops early.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            {notifyPerm !== "granted" && (
              <button onClick={requestNotif} className="btn">
                Enable Browser Notification
              </button>
            )}
            <button onClick={() => makeICS(rainRisk.eventTime)} className="btn">
              Add 48h Reminder to Calendar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="weather-card alert-none">
        <h2>Harvest Risk (48h)</h2>
        <p>No rain risk within next 48 hours for this location.</p>
      </div>
    );
  };

  const renderForecast = () => {
    const { daily } = weather;
    return (
      <div id="forecast-card" className="weather-card">
        <h2>7-Day Forecast</h2>
        <div id="forecast-grid" className="forecast-grid">
          {daily.time.slice(1, 8).map((date, i) => (
            <div key={i} className="forecast-day">
              <p className="day-name">
                {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <div className="weather-icon">
                {WMO_CODES[daily.weather_code[i + 1]]?.icon || "🤷"}
              </div>
              <p className="temp-high">{Math.round(daily.temperature_2m_max[i + 1])}°</p>
              <p className="temp-low">{Math.round(daily.temperature_2m_min[i + 1])}°</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="app-container">
      <header>
        <h1>Farmer's Weather Dashboard</h1>
        <p>Real-time data and alerts to protect your crops</p>
      </header>

      <form
        id="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) fetchCoordsForCity(input.trim());
        }}
      >
        <input
          type="text"
          id="search-input"
          placeholder="Search for a city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <div className="toggle-row">
        <label className="toggle">
          <input
            type="checkbox"
            checked={cropReady}
            onChange={(e) => setCropReady(e.target.checked)}
          />
          <span>Crop is ready to harvest</span>
        </label>
      </div>

      <main id="weather-content">
        {loading && (
          <div id="loader">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div id="error-message" className="weather-card">
            {error}
          </div>
        )}

        {!loading && !error && weather && (
          <div id="weather-data-container">
            {renderCurrentWeather()}
            {renderHarvestRisk()}
            {renderAlerts()}
            {renderForecast()}
          </div>
        )}
      </main>
    </div>
  );
}
