from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    # User Authentication
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('register/', RegisterView.as_view(), name='register'),

    # Portfolio Management
    path('portfolio/create/', PortfolioCreateView.as_view(), name='create-portfolio'),
    path('portfolio/', PortfolioListView.as_view(), name='portfolio-list'),
    path('portfolio/<int:pk>/edit/', PortfolioUpdateView.as_view(), name='portfolio-edit'),
    path('portfolio/<int:pk>/delete/', PortfolioDeleteView.as_view(), name='portfolio-delete'),

    # Booking Management (สำหรับแอดมิน)
    path('bookings/', BookingListView.as_view(), name='booking-list'),  # ดึงข้อมูลการจองทั้งหมด
    path('booking/update-status/<int:booking_id>/', UpdateBookingStatusAPIView.as_view(), name='update-booking-status'),
    path('booking/create/', BookingCreateAPIView.as_view(), name='create-booking'),
    path('booking/<int:pk>/delete/', BookingDeleteAPIView.as_view(), name='delete-booking'),

    # Promotions
    path('promotions/', PromotionListCreateAPIView.as_view(), name='promotions'),

    # Extra Booking API (Frontend)
    path("create-booking/", create_booking, name="create_booking"),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
