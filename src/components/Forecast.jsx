import Card from './Card'
import { getWeather, showTemp, THU } from '../utils/weather'

// Dự báo 7 ngày. 4 mảng trong daily có cùng độ dài, phần tử thứ i thuộc cùng một ngày
export default function Forecast({ daily, unit }) {
  return (
    <Card title="Dự báo 7 ngày">
      {daily.time.map((date, i) => {
        const [icon] = getWeather(daily.weather_code[i])
        const d = new Date(date + 'T00:00:00')
        return (
          <div className="day" key={date}>
            <span className="day-name">
              {THU[d.getDay()]} ({d.getDate()}/{d.getMonth() + 1})
            </span>
            <span>{icon}</span>
            <span>
              Cao: {showTemp(daily.temperature_2m_max[i], unit)} - Thấp:{' '}
              {showTemp(daily.temperature_2m_min[i], unit)}
            </span>
          </div>
        )
      })}
    </Card>
  )
}
