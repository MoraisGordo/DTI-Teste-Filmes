import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ListMovies from './pages/ListMovies';
import UpdateMovie from './pages/UpdateMovie';
import NewMovie from './pages/NewMovie';
export default function App() {

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ListMovies />}
          />
          <Route
            path='/listMovies'
            element={<ListMovies />}
          />
          <Route
            path='/updateMovie'
            element={<UpdateMovie />}
          />
          <Route
            path='/newMovie'
            element={<NewMovie />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}