export const THU = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

// Mã thời tiết -> [biểu tượng, mô tả]
export function getWeather(code) {
  if (code === 0) return ['☀️', 'Trời quang']
  if (code === 1) return ['🌤️', 'Ít mây']
  if (code === 2) return ['⛅', 'Có mây']
  if (code === 3) return ['☁️', 'Nhiều mây']
  if (code === 45 || code === 48) return ['🌫️', 'Sương mù']
  if (code >= 51 && code <= 57) return ['🌦️', 'Mưa phùn']
  if (code >= 61 && code <= 65) return ['🌧️', 'Mưa']
  if (code === 66 || code === 67) return ['🌧️', 'Mưa lạnh']
  if (code >= 71 && code <= 77) return ['❄️', 'Tuyết']
  if (code >= 80 && code <= 82) return ['🌦️', 'Mưa rào']
  if (code === 85 || code === 86) return ['🌨️', 'Mưa tuyết']
  if (code >= 95) return ['⛈️', 'Dông']
  return ['❓', 'Không rõ']
}

// Đổi nhiệt độ theo đơn vị. Dữ liệu API luôn là °C nên chỉ đổi khi hiển thị
export function showTemp(celsius, unit) {
  let t = celsius
  if (unit === 'F') {
    t = (celsius * 9) / 5 + 32
  }
  return Math.round(t) + '°' + unit
}

// "2026-10-22T13:45" -> "13:45 22/10/2026"
export function formatTime(time) {
  const [date, hour] = time.split('T')
  const [y, m, d] = date.split('-')
  return hour + ' ' + d + '/' + m + '/' + y
}
