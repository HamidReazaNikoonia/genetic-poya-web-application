import { Outlet } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
