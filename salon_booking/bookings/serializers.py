# serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework import serializers
from .models import Portfolio
from .models import Booking
from .models import Promotion
class RegisterSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password_confirmation', 'phone_number', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirmation')
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        return user
    

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'first_name', 'last_name']

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id','title', 'description', 'image1', 'image2', 'image3', 'image4']

    # กำหนดให้รองรับการอัปโหลดไฟล์
    image1 = serializers.ImageField(required=False)
    image2 = serializers.ImageField(required=False)
    image3 = serializers.ImageField(required=False)
    image4 = serializers.ImageField(required=False)

class BookingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)  # เพิ่ม username ของผู้ใช้
    
    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'username', 'booking_date', 'booking_time',
            'hair_style', 'hair_type', 'status', 'promotion'
        ]
        read_only_fields = ['id', 'user', 'username', 'status']  # กำหนดฟิลด์ที่ไม่สามารถแก้ไขได้


class UpdateBookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status']

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ['promotion_id', 'name', 'description', 'discount_amount', 'discount_type', 'start_date', 'end_date']