// Nút đổi °C / °F
export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit">
      <button className={unit === 'C' ? 'active' : ''} onClick={() => onChange('C')}>
        °C
      </button>
      <button className={unit === 'F' ? 'active' : ''} onClick={() => onChange('F')}>
        °F
      </button>
    </div>
  )
}
