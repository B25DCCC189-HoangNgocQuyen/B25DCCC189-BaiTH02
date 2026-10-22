import Card from './Card'
import { getWeather, showTemp, formatTime } from '../utils/weather'

// Thời tiết hiện tại
export default function CurrentWeather({ cityName, current, unit }) {
  const [icon, desc] = getWeather(current.weather_code)

  return (
    <Card title={cityName}>
      <div className="current">
        <span className="big-icon">{icon}</span>
        <div>
          <div className="temp">{showTemp(current.temperature_2m, unit)}</div>
          <div>{desc}</div>
        </div>
      </div>
      <p>Độ ẩm: {current.relative_humidity_2m}%</p>
      <p>Tốc độ gió: {current.wind_speed_10m} km/h</p>
      <p>Cập nhật lúc: {formatTime(current.time)}</p>
    </Card>
  )
}
