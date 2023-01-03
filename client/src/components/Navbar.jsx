import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navigation">
      <Link to="/" className="text-white font-bold">
      <h1>React Mysql</h1>
      </Link>
      
      <ul className="flex gap-x-2">
        <li>
          <Link to="/" className="bg-slate-200 px-2 py-1">Home</Link>
        </li>
        <li>
          <Link to="/new" className="bg-teal-200 px-2 py-1">Create task</Link>
        </li>
      </ul>
    </div>
  );
}
