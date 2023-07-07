import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;

export default async function handler(req, res) {
  const { location, startDate, endDate } = req.query;

  try {
    const response = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&city=${encodeURIComponent(
        location
      )}&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`
    );
    const data = response.data.data;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
}
