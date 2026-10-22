// Component làm khung (dùng props.children)
export default function Card({ title, children }) {
  return (
    <div className="box">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
