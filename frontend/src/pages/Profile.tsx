import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <>
      <h1>Explore page</h1>
      <p>This is a protected page.</p>

      <ul>
        <li>
          <Link to="/">Return to index</Link>
        </li>
      </ul>
    </>
  );
}
