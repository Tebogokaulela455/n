import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import PropertyDetails from "./pages/PropertyDetails"
import BookingPage from "./pages/BookingPage"
import WishListPage from "./pages/WishListPage"
import PopertyListPage from "./pages/PropertyListPage"
import ReservationsListPage from "./pages/ReservationsListPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listings/:listingId" element={<PropertyDetails />} />
          <Route path="/:userId/my-bookings" element={<BookingPage />} />
          <Route path="/:userId/my-wish-list" element={<WishListPage />} />
          <Route path="/:userId/property-list" element={<PopertyListPage />} />
          <Route path="/:userId/reservations-list" element={<ReservationsListPage />} />
          <Route path="/listings/category/:category" element={<CategoryPage />} />
          <Route path="/listings/search/:search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

