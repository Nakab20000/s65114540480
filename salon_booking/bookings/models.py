from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # ตั้ง role เป็น admin

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('member', 'Member'),
        ('guest', 'Guest'),
    )

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='member')  # ฟิลด์ Role
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class Portfolio(models.Model):
    title = models.CharField(max_length=255)  # ชื่อผลงาน
    description = models.TextField()  # คำอธิบายเกี่ยวกับทรงผม
    image1 = models.ImageField(upload_to='portfolio_images/')  # รูปที่ 1
    image2 = models.ImageField(upload_to='portfolio_images/')  # รูปที่ 2
    image3 = models.ImageField(upload_to='portfolio_images/')  # รูปที่ 3
    image4 = models.ImageField(upload_to='portfolio_images/')  # รูปที่ 4
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # ใช้ settings.AUTH_USER_MODEL แทน

    def __str__(self):
        return self.title
    


class Promotion(models.Model):
    DISCOUNT_TYPES = [
        ('percent', 'เปอร์เซ็นต์'),
        ('amount', 'บาท'),
    ]

    promotion_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    discount_amount = models.FloatField()
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPES, default='amount')
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.discount_amount} {self.get_discount_type_display()})"
    
class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    booking_date = models.DateField()
    booking_time = models.TimeField()
    hair_style = models.CharField(max_length=255)
    hair_type = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('จองสำเร็จ', 'จองสำเร็จ'),
            ('ผู้ใช้ยกเลิก', 'ผู้ใช้ยกเลิก'),
            ('แอดมินยกเลิก', 'แอดมินยกเลิก'),
        ],
        default='จองสำเร็จ'
    )
    promotion = models.ForeignKey("Promotion", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Booking by {self.user.username} on {self.booking_date} at {self.booking_time}"

class Hairstyle(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)