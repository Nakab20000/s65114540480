import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Editp from './Editp';
import Home from './Home';
import MainPage from './MainPage';
import Profile from './Profile';
import BookingPage from './BookingPage';
import ReviewsPage from "./ReviewsPage";
import Memberbookingpage from "./Memberbookingpage";
import AdminPage from './AdminPage';
import PortfolioList from './PortfolioList';
import CreatePortfolio from './CreatePortfolio'
import HairstyleDetails from './HairstyleDetails';
import PortfolioListMember from './PortfolioListMember';
import AdminPortfolioList from './AdminPortfolioList';
import PortfolioEdit from './PortfolioEdit';
import PortfolioDelete from './PortfolioDelete';
import SelectTimePage from "./SelectTimePage";
import SelectDetailsPage from "./SelectDetailsPage";
import AdminBookingsPage from "./AdminBookingsPage";
import AdminBookingScheduleCalendar from "./AdminBookingScheduleCalendar";
import AvailableTimesPage from "./AvailableTimesPage";
import MemberBookingsPage from "./MemberBookingsPage"; // ✅ นำเข้า "คิวของฉัน"
import AdminBookingDetailsPage from "./AdminBookingDetailsPage";
import MemberReviewsPage from "./MemberReviewsPage";
import AddReviewPage from './AddReviewPage';
import MyReviewsPage from "./MyReviewsPage";
import AddPromotionPage from "./AddPromotionPage";
import MemberPromotionsPage from "./MemberPromotionsPage";
import PublicPromotionsPage from "./PublicPromotionsPage";
import AdminMemberManagementPage from './AdminMemberManagementPage';
import NoShowMembersPage from "./NoShowMembersPage";
import MyNoShowPage from "./MyNoShowPage";
import AdminHairstylesPage from './AdminHairstylesPage';
import AdminPromotionsPage from "./AdminPromotionsPage";
import CreatePortfolioPage from './CreatePortfolioPage';  // นำเข้า CreatePortfolioPage
import AdminHairstyleDetail from './AdminHairstyleDetail';  // นำเข้า CreatePortfolioPage
import AdminHairstyleList from "./AdminHairstyleList";
import RequestReset from "./RequestReset";
import ResetPassword from "./ResetPassword";
import VerifyResetCode from './VerifyResetCode';

function App() {
    return (
        <Router basename="/s65114540480">
            <Routes>
                {/* 🌐 Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/request-reset" element={<RequestReset />} />
                <Route path="/verify-reset-code" element={<VerifyResetCode />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/public/promotions" element={<PublicPromotionsPage />} />

                {/* 🔒 Member Routes (main) */}
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<Editp />} />
                <Route path="/main/Memberbooking" element={<Memberbookingpage />} />
                <Route path="/main/PortfolioListMember" element={<PortfolioListMember />} />
                <Route path="/main/reviews" element={<MemberReviewsPage />} />
                <Route path="/main/promotions" element={<MemberPromotionsPage />} />
                <Route path="/main/my-no-show" element={<MyNoShowPage />} />
                <Route path="/member-bookings" element={<MemberBookingsPage />} /> {/* ✅ คิวของฉัน */}
                <Route path="/my-reviews" element={<MyReviewsPage />} /> {/* ✅ รีวิวของฉัน */}
                <Route path="/review/:bookingId" element={<AddReviewPage />} />
                <Route path="/hairstyle/:id" element={<HairstyleDetails />} />

                {/* 🔧 Admin Routes */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/members" element={<AdminMemberManagementPage />} />
                <Route path="/admin/no-show-members" element={<NoShowMembersPage />} />
                <Route path="/admin/bookings" element={<AdminBookingsPage />} />
                <Route path="/admin/calendar" element={<AdminBookingScheduleCalendar />} />
                <Route path="/admin/calendar/booking-details" element={<AdminBookingDetailsPage />} />
                <Route path="/admin/add-promotion" element={<AddPromotionPage />} />
                <Route path="/admin/promotions" element={<AdminPromotionsPage />} />

                {/* 🖼️ Admin Portfolio */}
                <Route path="/admin/portfolio" element={<AdminPortfolioList />} />
                <Route path="/admin/portfolio/:id/edit" element={<PortfolioEdit />} />
                <Route path="/admin/portfolio/:id/delete" element={<PortfolioDelete />} />
                <Route path="/admin/create-portfolio" element={<CreatePortfolioPage />} />

                {/* ✂️ Admin Hairstyles */}
                <Route path="/admin/hairstyles" element={<AdminHairstyleList />} />
                <Route path="/admin/hairstyles/:id" element={<AdminHairstyleDetail />} />
                <Route path="/admin/create/hairstyles" element={<AdminHairstylesPage />} />

                {/* 🔄 General Routes */}
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/portfolio" element={<PortfolioList />} />
                <Route path="/CreatePortfolio" element={<CreatePortfolio />} />
                <Route path="/select-time" element={<SelectTimePage />} />
                <Route path="/select-details" element={<SelectDetailsPage />} />
                <Route path="/available-times" element={<AvailableTimesPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
            </Routes>
        </Router>

    );
}

export default App;
