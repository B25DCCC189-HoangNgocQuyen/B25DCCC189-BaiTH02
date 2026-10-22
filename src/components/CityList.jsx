// Danh sách thành phố, thành phố đang chọn được làm nổi bật
export default function CityList({ cities, selected, onSelect }) {
  return (
    <ul className="cities">
      {cities.map((city, i) => (
        <li key={city.name}>
          <button className={i === selected ? 'city active' : 'city'} onClick={() => onSelect(i)}>
            {city.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
