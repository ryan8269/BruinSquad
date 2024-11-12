import { Link } from 'react-router-dom'

export default function MatchesPage() {
  return (
    <>
      <h1>Matches page</h1>
      <p>This is a protected page.</p>

      <ul>
        <li>
          <Link to="/">Return to index</Link>
        </li>
      </ul>
    </>
  )
}