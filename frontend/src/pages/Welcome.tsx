import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
      <h1>Welcome</h1>
      <p>This is a protected page.</p>

      <ul>
        <li>
          <Link to="/Matches">Go Matches</Link>
        </li>
      </ul>
    </>
  )
}