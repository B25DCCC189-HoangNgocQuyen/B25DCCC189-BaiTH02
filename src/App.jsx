import { useState, useEffect } from 'react'
import { CITIES } from './data/cities'
import CityList from './components/CityList'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import UnitToggle from './components/UnitToggle'

export default function App() {
  const [selected, setSelected] = useState(null) // vị trí thành phố đang chọn (null = chưa chọn)
  const [weather, setWeather] = useState(null) // dữ liệu từ API
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [unit, setUnit] = useState('C')
  const [retryCount, setRetryCount] = useState(0) // tăng lên để gọi lại API khi bấm Thử lại

  // Gọi API mỗi khi đổi thành phố hoặc bấm Thử lại.
  // Không có "unit" trong mảng phụ thuộc nên đổi °C/°F không gọi lại API.
  useEffect(() => {
    if (selected === null) return

    let ignore = false // bỏ qua kết quả cũ nếu đã chọn thành phố khác
    const city = CITIES[selected]
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' + city.lat +
      '&longitude=' + city.lon +
      '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
      '&timezone=Asia%2FHo_Chi_Minh&forecast_days=7'

    async function load() {
      setLoading(true)
      setError(false)
      setWeather(null)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Lỗi tải dữ liệu')
        const data = await res.json()
        if (!ignore) setWeather(data)
      } catch (err) {
        if (!ignore) setError(true)
      }
      if (!ignore) setLoading(false)
    }
    load()

    return () => {
      ignore = true
    }
  }, [selected, retryCount])

  // Phần bên phải hiển thị tùy theo trạng thái
  let content
  if (selected === null) {
    content = <p className="message">Hãy chọn một thành phố ở danh sách để xem thời tiết.</p>
  } else if (loading) {
    content = <p className="message">Đang tải...</p>
  } else if (error) {
    content = (
      <div className="message">
        <p>Không tải được dữ liệu. Vui lòng thử lại.</p>
        <button onClick={() => setRetryCount(retryCount + 1)}>Thử lại</button>
      </div>
    )
  } else if (weather) {
    content = (
      <>
        <CurrentWeather cityName={CITIES[selected].name} current={weather.current} unit={unit} />
        <Forecast daily={weather.daily} unit={unit} />
      </>
    )
  }

  return (
    <div className="app">
      <h1>Thời tiết Việt Nam</h1>
      <UnitToggle unit={unit} onChange={setUnit} />

      <div className="layout">
        <CityList cities={CITIES} selected={selected} onSelect={setSelected} />
        <div className="content">{content}</div>
      </div>
    </div>
  )
}
