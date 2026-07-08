import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/search" element={<Search />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/tv/:id" element={<TVDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
