import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Editp from './Editp';
import Home from './Home';
import MainPage from './MainPage';
import ResetPassword from './ResetPassword'; 
import Profile from './Profile';
import BookingPage from './BookingPage';
import ReviewPage from "./ReviewPage";
import Memberbookingpage from "./Memberbookingpage";
import AdminPage from './AdminPage';
import PortfolioList from './PortfolioList'; 
import CreatePortfolio from './CreatePortfolio'
import HairstyleDetails from './HairstyleDetails';
import PortfolioListMember from './PortfolioListMember';
import AdminPortfolioList from './AdminPortfolioList';
import PortfolioEdit from './PortfolioEdit';
import PortfolioDelete from './PortfolioDelete';
import SelectDatePage from "./SelectDatePage";
import SelectTimePage from "./SelectTimePage";
import SelectDetailsPage from "./SelectDetailsPage";
import AdminBookingsPage from "./AdminBookingsPage";
import BookingScheduleCalendar from "./BookingScheduleCalendar";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<Editp />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="main/Memberbooking" element={<Memberbookingpage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/portfolio" element={<PortfolioList />} />
                <Route path="/CreatePortfolio" element={<CreatePortfolio />} />
                <Route path="/hairstyle/:id" element={<HairstyleDetails />} />
                <Route path="main/PortfolioListMember" element={<PortfolioListMember />} />
                <Route path="/admin/portfolio" element={<AdminPortfolioList />} />
                <Route path="/admin/portfolio/:id/edit" element={<PortfolioEdit />} />
                <Route path="/admin/portfolio/:id/delete" element={<PortfolioDelete />} />
                <Route path="/member-booking" element={<SelectDatePage />} />
                <Route path="/select-time" element={<SelectTimePage />} />
                <Route path="/select-details" element={<SelectDetailsPage />} />
                <Route path="/admin/bookings" element={<AdminBookingsPage />} />
                <Route path="/admin/calendar" element={<BookingScheduleCalendar />} />
            </Routes>
        </Router>
    );
}

export default App;
