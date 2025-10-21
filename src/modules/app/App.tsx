import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Link to="users">Users</Link>
        <Link to="counters">Counter</Link>
      </header>
      <Outlet />
    </>
  );
}

export default App;
