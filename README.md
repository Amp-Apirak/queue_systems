# Blood Test Queue Management System

ระบบจัดการคิวห้องเจาะเลือด สำหรับศูนย์การแพทย์ขั้นสูงธนารมณ์ (THAMC)

## 📋 ภาพรวมระบบ

ระบบนี้ประกอบด้วย 2 ส่วนหลัก:

1. **ระบบลงทะเบียนผู้ป่วย (Patient Registration System)** - `blood-test-registration-system.html`
   - ตู้ Kiosk สำหรับผู้ป่วยลงทะเบียนคิวด้วยตนเอง
   - รองรับการค้นหาด้วยชื่อ, LN, HN หรือสแกน QR Code
   - เลือกประเภทผู้ป่วย: ทั่วไป, รถเข็น, เร่งด่วน, กระปุก

2. **ระบบจัดการคิวเจ้าหน้าที่ (Staff Queue Management)** - `blood-test-queue-management.html`
   - Dashboard สำหรับเจ้าหน้าที่จัดการคิว
   - เรียกคิว, เจาะเลือด, บันทึกผลการปฏิบัติงาน
   - จัดการผู้ใช้งาน, ตั้งค่าระบบ

---

## 🚀 การเริ่มต้นใช้งาน

### ความต้องการของระบบ
- เว็บเบราว์เซอร์ (Chrome, Firefox, Edge, Safari)
- ไม่ต้องติดตั้ง Server (Standalone HTML)

### วิธีการใช้งาน

#### 1. ระบบลงทะเบียนผู้ป่วย
```bash
# เปิดไฟล์ในเบราว์เซอร์
open blood-test-registration-system.html
```
- ค้นหาผู้ป่วยด้วย ชื่อ/LN/HN หรือสแกน QR Code
- เลือกประเภทผู้ป่วย
- รับหมายเลขคิว (A###, W###, U###, C###)

#### 2. ระบบจัดการคิวเจ้าหน้าที่
```bash
# เปิดไฟล์ในเบราว์เซอร์
open blood-test-queue-management.html
```
- Login ด้วย Username/Password
- เลือกช่องบริการ (Counter 1-5)
- จัดการคิวและให้บริการผู้ป่วย

---

## 🔐 ข้อมูล Login สำหรับทดสอบ

### Login หลัก
- **Username**: `admin`
- **Password**: `admin`

### ลืมรหัสผ่าน (Forgot Password)
- **Email ที่ถูกต้อง**: `admin@pointit.co.th`
- **ผลลัพธ์**: แสดงข้อมูลผู้ใช้ทั้งหมด (Username, Password, ข้อมูลส่วนตัว)

---

## 🆕 การอัปเดตล่าสุด (Latest Updates)

### ✅ Version 1.3.0 - Patient Detail Page Sweet Alert Conversion

#### 📌 **การแปลง Windows Alert เป็น Sweet Alert ในหน้ารายละเอียดผู้ป่วย**

**ภาพรวม:**
- ✅ แปลง `alert()` และ `confirm()` ทั้งหมดในหน้ารายละเอียดผู้ป่วยเป็น Sweet Alert 2
- ✅ ปรับปรุง UX/UI ให้สวยงามและทันสมัย
- ✅ คงข้อความเดิมไว้ทั้งหมด
- ✅ รองรับ Auto-hide และ Progress Bar

**ฟังก์ชันที่แปลงทั้งหมด (13 จุด):**

1. **recallPatient()** - เรียกผู้ป่วยซ้ำ (บรรทัด 6482-6491)
   - ✅ Info Alert พร้อมข้อความ "กำลังเรียกผู้ป่วยซ้ำ"

2. **releaseQueue()** - ปล่อยคิวกลับไปรอเรียก (บรรทัด 6294-6334)
   - ✅ Warning Confirm Dialog สำหรับยืนยัน
   - ✅ Success Alert พร้อม Auto-hide (2 วินาที)

3. **startService()** - เริ่มให้บริการและพิมพ์ Label (บรรทัด 6283-6302)
   - ✅ Success Alert พร้อม Timer Progress Bar

4. **completeService()** - บันทึกการให้บริการสำเร็จ (บรรทัด 6346-6445)
   - ✅ Error Alert: "ไม่พบข้อมูลผู้ป่วย" (บรรทัด 6355-6365)
   - ✅ Success Alert: "บันทึกการให้บริการสำเร็จ" (บรรทัด 6430-6444)

5. **recallNew()** - รอเรียกใหม่ (บรรทัด 6461-6469)
   - ✅ Warning Alert สำหรับแจ้งเตือน

6. **cancelQueue()** - ปิดคิว (บรรทัด 6447-6470)
   - ✅ Warning Confirm Dialog พร้อมสีปุ่มแดง (Red)

7. **labelling()** - พิมพ์สติ๊กเกอร์ทั้งหมด (บรรทัด 6481-6491)
   - ✅ Info Alert พร้อม Auto-hide

8. **printTubeLabel()** - พิมพ์สติ๊กเกอร์หลอดเลือด (บรรทัด 6493-6503) *ใหม่*
   - ✅ สร้างฟังก์ชันใหม่สำหรับพิมพ์สติ๊กเกอร์แต่ละหลอด
   - ✅ แสดงชื่อหลอดเลือดใน Alert
   - ✅ เปลี่ยนจาก inline `alert()` → function call

9. **saveDifficultDraw()** - บันทึกเจาะเลือดยาก (บรรทัด 6524-6555)
   - ✅ Success Alert แสดงสาเหตุและหมายเหตุ
   - ✅ ปิด Modal ก่อนแสดง Alert (แก้ z-index)

10. **saveTargetTimeSetting()** - บันทึกเวลาเป้าหมาย (บรรทัด 6605-6650)
    - ✅ Warning Alert: Validation เวลา 5-120 นาที (บรรทัด 6611-6622)
    - ✅ Success Alert: แสดงเวลาที่บันทึก (บรรทัด 6633-6644)

11. **saveAllSettings()** - บันทึกการตั้งค่าทั้งหมด (บรรทัด 6642-6764)
    - ✅ Success Alert แสดงสรุปการตั้งค่าทั้งหมด
    - ✅ แสดงจำนวนรายการที่บันทึกสำเร็จ

12. **viewHistoryDetail()** - ดูรายละเอียดคิวจากประวัติ (บรรทัด 6788-6813)
    - ✅ Error Alert: "ไม่พบข้อมูลคิวนี้ในระบบ"

13. **viewHistoryDetail()** - Placeholder (บรรทัด 6029-6037)
    - ✅ Info Alert: แจ้งเตือนฟังก์ชันยังไม่เสร็จ

**ไฟล์ที่แก้ไข:**
- `blood-test-queue-management.html`
- Sweet Alert 2 CDN: อยู่ที่บรรทัด 13-14

**การปรับปรุง UX:**
- 🎨 ใช้ไอคอนที่เหมาะสมกับแต่ละสถานการณ์ (info, success, warning, error)
- ⏱️ Auto-hide Timer สำหรับ Alert ที่ไม่ต้องการ User Action
- 📊 Progress Bar แสดงเวลาที่เหลือก่อน Auto-close
- 🎯 Confirm Dialog สำหรับการกระทำที่สำคัญ (ปล่อยคิว, ปิดคิว)
- 🔐 ปิด Modal ก่อนแสดง Sweet Alert (แก้ปัญหา z-index ทุกจุด)

---

### ✅ Version 1.2.0 - Profile Management + Forgot Password Enhancement

#### 📌 **1. ระบบจัดการโปรไฟล์ (Profile Management)**

**ฟีเจอร์ที่เพิ่ม:**
- ✅ เปลี่ยนจาก `alert()` เป็น Sweet Alert 2
- ✅ Validation - ตรวจสอบข้อมูลครบถ้วน
- ✅ แสดงข้อมูลที่บันทึกอย่างสวยงาม
- ✅ Conditional Display - แสดงสถานะเปลี่ยนรหัสผ่าน
- ✅ ปิด Modal ก่อนแสดง Sweet Alert (แก้ปัญหา z-index)

**การแก้ไข:**
- ไฟล์: `blood-test-queue-management.html`
- Function: `handleProfileSubmit(event)`
- บรรทัด: 6808-6874

**กรณีการแจ้งเตือน:**

1. **กรอกข้อมูลไม่ครบ** → ⚠️ Warning Alert
   ```
   กรุณากรอกข้อมูลให้ครบถ้วน
   กรุณากรอกชื่อ-สกุล, ตำแหน่ง และแผนก
   ```

2. **บันทึกสำเร็จ (ไม่เปลี่ยนรหัสผ่าน)** → ✅ Success Alert
   ```
   ╔══════════════════════════════════════════╗
   ║   ✅ บันทึกข้อมูลโปรไฟล์เรียบร้อย!       ║
   ╠══════════════════════════════════════════╣
   ║          📋 ข้อมูลที่บันทึก               ║
   ║          ───────────────────────         ║
   ║  👤 ชื่อ-สกุล:    Admin User             ║
   ║  💼 ตำแหน่ง:      Admin                  ║
   ║  🏢 แผนก:        IT                      ║
   ║                                          ║
   ║  ✅ ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดต   ║
   ║     เรียบร้อยแล้ว                        ║
   ╚══════════════════════════════════════════╝
   ```

3. **บันทึกสำเร็จ (เปลี่ยนรหัสผ่าน)** → ✅ Success Alert
   ```
   (เหมือนข้างบน แต่เพิ่ม)
   ║  🔐 รหัสผ่าน:     เปลี่ยนเรียบร้อย ✓     ║
   ```

---

#### 📌 **2. ปรับปรุงระบบลืมรหัสผ่าน (Forgot Password Enhancement)**

**การปรับปรุง:**
- ✅ แก้ไขปัญหา Sweet Alert อยู่ด้านหลัง Modal
- ✅ เปลี่ยนจากแสดงข้อมูลผู้ใช้ → แสดงข้อความส่ง Link
- ✅ เพิ่มความปลอดภัย (ไม่แสดง Password บนหน้าจอ)
- ✅ ปิด Modal ก่อนแสดง Sweet Alert

**การแก้ไข:**
- ไฟล์: `blood-test-queue-management.html`
- Function: `handleForgotPassword(event)`
- บรรทัด: 5168-5266

**กรณี Email ถูกต้อง - ข้อความใหม่:**
```
╔═══════════════════════════════════════════╗
║    ✅ ส่งลิงก์รีเซ็ตรหัสผ่านสำเร็จ!        ║
╠═══════════════════════════════════════════╣
║  📧 ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง     ║
║     admin@pointit.co.th                   ║
║                                           ║
║  ✅ กรุณาตรวจสอบอีเมลของท่าน              ║
║  🔗 คลิกลิงก์ในอีเมลเพื่อรีเซ็ตรหัสผ่าน    ║
║  ⏰ ลิงก์จะหมดอายุภายใน 24 ชั่วโมง        ║
║                                           ║
║  💡 หากไม่พบอีเมล กรุณาตรวจสอบ           ║
║     ในกล่อง Spam/Junk Mail                ║
╚═══════════════════════════════════════════╝
```

---

### ✅ Version 1.1.0 - เพิ่ม Sweet Alert 2 Notifications

#### 📌 **1. ระบบแจ้งเตือนการ Login**

**ฟีเจอร์ที่เพิ่ม:**
- ✅ Sweet Alert 2 Library Integration
- ✅ ตรวจสอบว่ากรอก Username/Password ครบถ้วน
- ✅ แจ้งเตือนเมื่อ Login ไม่สำเร็จ
- ✅ แจ้งเตือนเมื่อ Login สำเร็จ
- ✅ Auto-focus Password field เมื่อเกิด Error

**การแก้ไข:**
- ไฟล์: `blood-test-queue-management.html`
- Function: `handleLogin(event)`
- เพิ่ม: Sweet Alert 2 CDN ในส่วน `<head>`

**กรณีการแจ้งเตือน:**

1. **ไม่กรอกข้อมูลครบ** → ⚠️ Warning Alert
   ```
   กรุณากรอกข้อมูลให้ครบถ้วน
   กรุณากรอก Username และ Password
   ```

2. **Login ไม่สำเร็จ** → ❌ Error Alert
   ```
   เข้าสู่ระบบไม่สำเร็จ
   ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
   กรุณาตรวจสอบและลองใหม่อีกครั้ง
   ```

3. **Login สำเร็จ** → ✅ Success Alert (Auto-hide 1.5s)
   ```
   เข้าสู่ระบบสำเร็จ!
   ยินดีต้อนรับ admin
   ```

---

#### 📌 **2. ระบบตรวจสอบ Email (Forgot Password)**

**ฟีเจอร์ที่เพิ่ม:**
- ✅ Email Validation (ตรวจสอบรูปแบบ Email)
- ✅ แจ้งเตือนเมื่อ Email ไม่ถูกต้อง
- ✅ แจ้งเตือนเมื่อไม่พบ Email ในระบบ
- ✅ แสดงข้อมูลผู้ใช้แบบละเอียดเมื่อ Email ถูกต้อง
- ✅ Auto-clear และ Auto-focus Email field เมื่อ Error

**การแก้ไข:**
- ไฟล์: `blood-test-queue-management.html`
- Function: `handleForgotPassword(event)`
- Email ที่ถูกต้อง: `admin@pointit.co.th`

**กรณีการแจ้งเตือน:**

1. **ไม่กรอก Email** → ⚠️ Warning Alert
   ```
   กรุณากรอกอีเมล
   กรุณากรอกที่อยู่อีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน
   ```

2. **Email รูปแบบผิด** → ❌ Error Alert
   ```
   รูปแบบอีเมลไม่ถูกต้อง
   กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@domain.com
   ```

3. **Email ถูกต้อง** (`admin@pointit.co.th`) → ✅ Success Alert
   ```
   ╔══════════════════════════════════════════╗
   ║          ✅ พบข้อมูลในระบบ!              ║
   ╠══════════════════════════════════════════╣
   ║        📋 ข้อมูลผู้ใช้งาน                ║
   ║        ───────────────────────────       ║
   ║  📧 อีเมล:      admin@pointit.co.th     ║
   ║  👤 ชื่อผู้ใช้:   admin                  ║
   ║  🏷️ ชื่อ-สกุล:   ผู้ดูแลระบบ            ║
   ║  💼 ตำแหน่ง:     ผู้จัดการ               ║
   ║  🏢 แผนก:       IT                      ║
   ║  🔑 สิทธิ์:      Admin                   ║
   ║  🔐 รหัสผ่าน:    admin                   ║
   ║                                          ║
   ║  ✅ กรุณาใช้ข้อมูลด้านบนเพื่อเข้าสู่ระบบ  ║
   ╚══════════════════════════════════════════╝
   ```

4. **Email ไม่มีในระบบ** → ❌ Error Alert
   ```
   ไม่พบอีเมลในระบบ
   อีเมล "test@example.com" ไม่มีในระบบของเรา
   💡 กรุณาตรวจสอบอีเมลอีกครั้งหรือติดต่อผู้ดูแลระบบ
   ```

---

## 🧪 วิธีการทดสอบ (Testing Guide)

### **Test Case 1: ทดสอบ Login**

#### ✅ **Test 1.1: Login สำเร็จ**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. กรอก Username: admin
3. กรอก Password: admin
4. กดปุ่ม "เข้าสู่ระบบ"

✅ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีเขียว "เข้าสู่ระบบสำเร็จ!"
- ข้อความ "ยินดีต้อนรับ admin"
- Alert หายไปอัตโนมัติใน 1.5 วินาที
- เข้าสู่หน้า Dashboard
```

#### ❌ **Test 1.2: Login ไม่สำเร็จ (รหัสผ่านผิด)**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. กรอก Username: admin
3. กรอก Password: wrongpassword
4. กดปุ่ม "เข้าสู่ระบบ"

❌ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีแดง "เข้าสู่ระบบไม่สำเร็จ"
- ข้อความ "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
- Password field ถูกล้างค่า
- Focus กลับมาที่ Password field
```

#### ⚠️ **Test 1.3: ไม่กรอกข้อมูล**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. เว้นว่าง Username และ/หรือ Password
3. กดปุ่ม "เข้าสู่ระบบ"

⚠️ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีเหลือง "กรุณากรอกข้อมูลให้ครบถ้วน"
- ข้อความ "กรุณากรอก Username และ Password"
```

---

### **Test Case 2: ทดสอบ Forgot Password**

#### ✅ **Test 2.1: Email ถูกต้อง**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. คลิก "ลืมรหัสผ่าน?" ที่หน้า Login
3. กรอก Email: admin@pointit.co.th
4. กดปุ่ม "รีเซ็ตรหัสผ่าน"

✅ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีเขียว "พบข้อมูลในระบบ!"
- แสดงข้อมูลผู้ใช้ 7 ฟิลด์:
  * อีเมล: admin@pointit.co.th
  * ชื่อผู้ใช้: admin
  * ชื่อ-สกุล: ผู้ดูแลระบบ
  * ตำแหน่ง: ผู้จัดการ
  * แผนก: IT
  * สิทธิ์: Admin
  * รหัสผ่าน: admin
- Modal ปิดอัตโนมัติเมื่อกด "ปิด"
```

#### ❌ **Test 2.2: Email ไม่มีในระบบ**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. คลิก "ลืมรหัสผ่าน?"
3. กรอก Email: test@example.com
4. กดปุ่ม "รีเซ็ตรหัสผ่าน"

❌ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีแดง "ไม่พบอีเมลในระบบ"
- ข้อความ 'อีเมล "test@example.com" ไม่มีในระบบของเรา'
- คำแนะนำ "กรุณาตรวจสอบอีเมลอีกครั้งหรือติดต่อผู้ดูแลระบบ"
- Email field ถูกล้างค่า
- Focus กลับมาที่ Email field
```

#### ❌ **Test 2.3: Email รูปแบบผิด**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. คลิก "ลืมรหัสผ่าน?"
3. กรอก Email: invalidformat (ไม่มี @)
4. กดปุ่ม "รีเซ็ตรหัสผ่าน"

❌ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีแดง "รูปแบบอีเมลไม่ถูกต้อง"
- ข้อความ "กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@domain.com"
```

#### ⚠️ **Test 2.4: ไม่กรอก Email**
```
1. เปิดไฟล์ blood-test-queue-management.html
2. คลิก "ลืมรหัสผ่าน?"
3. เว้นว่าง Email field
4. กดปุ่ม "รีเซ็ตรหัสผ่าน"

⚠️ ผลลัพธ์ที่คาดหวัง:
- แสดง Sweet Alert สีเหลือง "กรุณากรอกอีเมล"
- ข้อความ "กรุณากรอกที่อยู่อีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน"
```

---

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#667eea` → `#764ba2` (Purple)
- **Success**: `#38a169` (Green)
- **Warning**: `#ed8936` (Orange)
- **Error**: `#e53e3e` (Red)
- **Info**: `#3182ce` (Blue)

### Alert Types
| Icon | Type | Color | Use Case |
|------|------|-------|----------|
| ✅ | Success | Green | Login สำเร็จ, พบข้อมูล |
| ❌ | Error | Red | Login ผิด, ไม่พบข้อมูล |
| ⚠️ | Warning | Yellow/Orange | ไม่กรอกข้อมูล |
| ℹ️ | Info | Blue | ข้อมูลทั่วไป |

---

## 📦 Dependencies

### External Libraries
- **Sweet Alert 2** (v11) - `https://cdn.jsdelivr.net/npm/sweetalert2@11`
  - ใช้สำหรับ: Alert dialogs, Confirmations, Notifications
  - Documentation: https://sweetalert2.github.io/

- **Google Fonts - Sarabun** - รองรับภาษาไทย
  - Weights: 300, 400, 500, 600, 700, 800

---

## 🔧 การพัฒนาต่อ (Future Development)

### ฟีเจอร์ที่ยังไม่ได้พัฒนา
- [ ] เชื่อมต่อ Backend API
- [ ] เชื่อมต่อ Database (MySQL/PostgreSQL)
- [ ] Real-time Updates (WebSocket)
- [ ] Hardware Integration (QR Scanner, Label Printer, Barcode Scanner)
- [ ] Monitor Display System
- [ ] Audio Announcement System
- [ ] Mobile App
- [ ] Analytics Dashboard
- [ ] Multi-language Support

---

## 📝 เอกสารเพิ่มเติม

- **CLAUDE.md** - คู่มือสำหรับ Claude Code Developer
- **Requirment.txt** - เอกสารความต้องการหลัก (ภาษาไทย)
- **เพิ่มเติม.txt** - ข้อกำหนดเพิ่มเติมสำหรับ Patient Detail Layout

---

## 👨‍💻 Developer Notes

### การแก้ไขโค้ด
- **Login System**: `blood-test-queue-management.html:5484-5538`
- **Forgot Password**: `blood-test-queue-management.html:5168-5294`
- **Sweet Alert Integration**: `blood-test-queue-management.html:13-14`

### Best Practices
1. ใช้ Sweet Alert 2 แทน `alert()` และ `confirm()`
2. Validate input ก่อนส่งข้อมูล
3. แสดงข้อความ Error ที่ชัดเจนและเป็นมิตร
4. Auto-focus input field เมื่อเกิด Error
5. ใช้ Emoji เพื่อความเข้าใจง่าย

---

## 📄 License

This project is proprietary software for Thammarat Advanced Medical Center (THAMC).

---

## 📞 ติดต่อ

หากมีคำถามหรือพบปัญหาในการใช้งาน กรุณาติดต่อทีมพัฒนา
