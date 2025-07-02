pip install django #ติดตั้งdjango
pip install -r requirements.txt #ตั้งแพ็คเกจ
ต่อมาในส่วน database ใช้ mysql

mysql --version #คำสั้งตรวจสอบ mysql ว่ามีมั้ย
ถ้าไม่มี ให้ดาวโหลดทีที่ https://dev.mysql.com/downloads/installer #https://www.linkedin.com/pulse/how-install-mysql-windows-thescribe-co-lawjc เว็บสอนติดตั้งถ้าทำไม่เป็นก็ทำตามภาพขั้นตอน
ติดตั้ง mysql สร้างรหัสผ่านroot ให้เสร็จ
เมื่อติดตั้งเสร็จลองใช้คำสั่ง mysql --version เพื่่อตรวจสอบว่าติดตั้งสำเร็จหรือไม่
ต่อมาสร้างdatabase ใหม่ ทำในcmd

ตัวอย่าง cd C:\Program Files\MySQL\MySQL Server 8.0\bin> #cd ไปที่ไฟล์ที่่ดาวโหลด mysql มา คัดลอกpath ถึงตัว bin เลย
mysql -u root -p #คำสั่งเข้าmysql และใส่รหัสที่เราสร้างไว้ตอนติดตั้ง
CREATE DATABASE toyland; #คำสั่ง สร้างดาต้าเบลดใหม่ ที่ใช้ชื่อ toyland เพราะใน database ใน setting.py ใน backendใช้ชื่อนี้
cd ไปที่ไฟล์backend

python manage.py migrate #ใช้คำสั่งในterminal
python manage.py runserver #เปิดใช้งานเซิร์ฟเวอร์
ในส่วนfrontend ใช้ react cd ไปที่ ไฟล์ frontend

node -v #ใช้คำสั่งนี้ตรวจสอบ ว่ามีnodejsหรือไม่ ถ้าไม่มีจะแสดงแบบนี้ The term 'node' is not recognized
https://nodejs.org #ให้เข้าเว็บไซต์นี้และดาวโหลดและติดตั้ง เมื่อติดตั้งเสร็จรีสตาร์ท PowerShell
npm -v #ใช้คำสั่งนี้ตรวจสอบว่าติดตั้งเสร็จแล้วหรือไม่ ถ้าแสดงเวอร์ชั่นแปลว่าติดตั้งสำเร็จ
npm install #ติดตั้ง dependencies (คำสั่งนี้จะติดตั้ง react-scripts และทุกอย่างที่ต้องใช้)
npm start #สั่งใช้งาน frontend
คำสั่งในการสร้างรหัสแอดมิน cd ไปที่ไฟล์ backend

python manage.py createsuperuser #สร้างอีเมลล์และรหัสแอดมิน
แนะนำ ใช้terminal 2ตัว เพื่อให้สับสนน้อย ตัวที่1 รันfrontend # cd frontend ตัวที่2 รันbackend # cd backend
