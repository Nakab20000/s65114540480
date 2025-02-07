from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from .models import *
from rest_framework import status
from rest_framework import permissions
from django.views.generic import ListView
from rest_framework.generics import *
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Portfolio
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import BookingSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from .models import Booking, Hairstyle, Promotion
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers import BookingSerializer, PortfolioSerializer, PromotionSerializer
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            # ส่งข้อมูล role พร้อมกับ token
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "role": "admin" if user.is_superuser else "user"  # กำหนด role ที่นี่
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        user = request.user

        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateAdminUserView(APIView):
    permission_classes = [IsAdminUser]  # จำกัดเฉพาะ admin user เท่านั้น

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_superuser(username=username, email=email, password=password)
        return Response({"message": "Admin user created successfully."}, status=status.HTTP_201_CREATED)

class PortfolioCreateView(APIView):
    permission_classes = [IsAdminUser]  # ให้ admin เท่านั้นที่สามารถเพิ่มผลงาน

    def post(self, request):
        serializer = PortfolioSerializer(data=request.data)
        if serializer.is_valid():
            # บันทึกข้อมูล พร้อมกำหนด user เป็น request.user
            serializer.save(user=request.user)
            return Response(
                {"message": "Portfolio created successfully.", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PortfolioListView(APIView):
    permission_classes = [AllowAny]  # ให้ user และ member สามารถดูได้

    def get(self, request):
        portfolios = Portfolio.objects.all()  # ดึงข้อมูลทั้งหมดของผลงาน
        serializer = PortfolioSerializer(portfolios, many=True)
        return Response(serializer.data)


class PortfolioUpdateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, id):
        try:
            portfolio = Portfolio.objects.get(id=id)
            serializer = PortfolioSerializer(portfolio)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Portfolio not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            portfolio = Portfolio.objects.get(id=id)
            serializer = PortfolioSerializer(portfolio, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Portfolio not found'}, status=status.HTTP_404_NOT_FOUND)
        
class PortfolioDeleteView(DestroyAPIView):
    queryset = Portfolio.objects.all()


class UpdateBookingStatusAPIView(APIView):
    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id)
            serializer = UpdateBookingStatusSerializer(data=request.data)

            if serializer.is_valid():
                new_status = serializer.validated_data.get('status')

                # ตรวจสอบว่าสถานะที่ส่งมาถูกต้อง
                if new_status not in ['ผู้ใช้ยกเลิก', 'แอดมินยกเลิก']:
                    return Response({"error": "สถานะไม่ถูกต้อง"}, status=status.HTTP_400_BAD_REQUEST)

                booking.status = new_status
                booking.save()
                return Response({"message": "อัปเดตสถานะสำเร็จ"}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Booking.DoesNotExist:
            return Response({"error": "ไม่พบการจอง"}, status=status.HTTP_404_NOT_FOUND)
        
class BookingCreateAPIView(APIView):
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Booking created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PromotionListCreateAPIView(APIView):
    def get(self, request):
        promotions = Promotion.objects.all()
        serializer = PromotionSerializer(promotions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PromotionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt  # ปิด CSRF ชั่วคราวสำหรับการทดสอบ
def create_booking(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # หา User จาก username แทน user_id
            user = User.objects.get(username=data["username"])  # ใช้ username แทน user_id

            booking = Booking.objects.create(
                user=user,
                booking_date=data["date"],
                booking_time=data["time"],
                hair_style=data["hairStyle"],
                hair_type=data.get("hairType", ""),
            )
            return JsonResponse({"message": "จองสำเร็จ!", "booking_id": booking.id}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# ✅ 1. ดึงรายการจองทั้งหมด (GET /bookings/)
class BookingListView(generics.ListAPIView):
    queryset = Booking.objects.all().order_by("-booking_date")
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]  # ต้องล็อกอินก่อนใช้งาน

# ✅ 2. สร้างการจองใหม่ (POST /booking/create/)
class BookingCreateAPIView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # บันทึกผู้ใช้ที่สร้างการจอง

# ✅ 3. อัปเดตสถานะการจอง (PUT /booking/update-status/<booking_id>/)
class UpdateBookingStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)
        new_status = request.data.get("status")

        if new_status not in ["รออนุมัติ", "อนุมัติ", "ยกเลิก", "เสร็จสิ้น"]:
            return Response({"error": "สถานะไม่ถูกต้อง"}, status=400)

        booking.status = new_status
        booking.save()

        return Response({"message": f"อัปเดตสถานะเป็น {new_status} สำเร็จ!"})

# ✅ 4. ลบการจอง (DELETE /booking/<booking_id>/delete/)
class BookingDeleteAPIView(generics.DestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

# ✅ 5. API สร้างการจองแบบธรรมดา (ใช้กับ React) (POST /create-booking/)
@api_view(["POST"])
def create_booking(request):
    serializer = BookingSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)  # เชื่อมโยงกับผู้ใช้ที่ล็อกอิน
        return Response({"message": "จองคิวสำเร็จ!", "data": serializer.data})
    
    return Response(serializer.errors, status=400)