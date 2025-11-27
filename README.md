# ระบบจัดการคิวห้องเจาะเลือด (Blood Test Queue Management System)

ระบบจัดการคิวแบบครบวงจรสำหรับห้องเจาะเลือด โรงพยาบาลธนารมณ์ขั้นสูง (Thammarat Advanced Medical Center - THAMC)

## 📋 ภาพรวมระบบ

ระบบนี้พัฒนาขึ้นเพื่อจัดการคิวผู้ป่วยที่มาใช้บริการห้องเจาะเลือดแบบ **One Queue System** โดยผู้ป่วยจะใช้หมายเลขคิวเดียวกันตั้งแต่ลงทะเบียนจนถึงเจาะเลือด

### 🎯 วัตถุประสงค์

- เพิ่มประสิทธิภาพการจัดการคิวผู้ป่วย
- ลดเวลาการรอคอยและความสับสน
- ติดตามสถานะผู้ป่วยแบบ Real-time
- บันทึกข้อมูลการให้บริการอย่างเป็นระบบ
- เพิ่มความโปร่งใสในการให้บริการ

---

## 🏗️ สถาปัตยกรรมระบบ

ระบบประกอบด้วย **3 ส่วนหลัก** ที่ทำงานประสานกัน:

### 1️⃣ ระบบลงทะเบียนผู้ป่วย (Patient Registration - Kiosk)

**ไฟล์:** `blood-test-registration-system.html`

**คุณสมบัติ:**
- 🔍 ค้นหาผู้ป่วยด้วย ชื่อ-นามสกุล, LN (Lab Number), หรือ HN (Hospital Number)
- 📱 รองรับการสแกน QR Code จากใบนัดหมาย
- ✅ ยืนยันข้อมูลผู้ป่วยจากระบบ HIS
- 🏷️ เลือกประเภทผู้ป่วย (ทั่วไป/รถเข็น/เร่งด่วน/กระปุก)
- 🎫 ออกหมายเลขคิวอัตโนมัติ (A/W/U/C + เลข 3 หลัก)
- 📊 แสดงข้อมูลเวลารอโดยประมาณ

**เทคโนโลยี:**
- HTML5
- CSS3 (ไฟล์แยก: `css/style.css`)
- JavaScript (ไฟล์แยก: `js/main.js`)
- Font: Sarabun (Google Fonts)

**หน้าจอในระบบ:**
1. หน้าแรก - เลือกวิธีลงทะเบียน
2. หน้าสแกน QR Code
3. หน้ายืนยันข้อมูล
4. หน้าเลือกประเภทผู้ป่วย
5. หน้าแสดงหมายเลขคิว (Success)
6. หน้าแจ้งข้อผิดพลาด (Error)

---

### 2️⃣ ระบบจัดการคิวเจ้าหน้าที่ (Staff Queue Management)

**ไฟล์:** `blood-test-queue-management.html` (3,014 บรรทัด)

**คุณสมบัติ:**
- 🔐 Login ด้วย Username/Password
- 🎛️ เลือกช่องบริการ (Counter 1-10)
- 📊 Dashboard แสดงสถิติคิวตามประเภท
- 🔔 เรียกคิวผู้ป่วย
- 💉 จัดการกระบวนการเจาะเลือด
- 🏷️ พิมพ์ Label หลอดเลือด
- 📋 สแกนหลอดเลือดผ่านระบบท่อลม
- ⏱️ จับเวลาการให้บริการ
- 📈 ดูประวัติการให้บริการ

**เมนูหลัก:**
1. **จัดการคิว** - แสดงรายการคิว, สถิติ, และดำเนินการ
2. **ตั้งค่า** - เลือกช่องบริการ, กรองประเภทผู้ป่วย, การแจ้งเตือน
3. **ประวัติ** - ดูประวัติการให้บริการที่เสร็จสิ้น

**หน้ารายละเอียดผู้ป่วย (Patient Detail Page):**

แบ่งออกเป็น 5 ส่วนแบบ Grid Layout:

**ส่วนที่ 1 - แผงดำเนินการ (Action Panel)**
- ก่อนเริ่มบริการ: `เรียกซ้ำ` | `ปล่อยคิว` | `เริ่มให้บริการ` | `เจาะเลือดยาก`
- หลังเริ่มบริการ: `สำเร็จ` | `รอเรียกใหม่` | `ปิดคิว` | `Labelling`
- แสดงหมายเลขช่องและ Timer การให้บริการ

**ส่วนที่ 2 - ข้อมูลผู้ป่วย**
- รูปภาพผู้ป่วย
- คิวที่, ประเภท, HN, เพศ
- วันเกิด, อายุ (ปี เดือน วัน)
- วอร์ด, สิทธิ์, แผนก, สัญชาติ
- หมายเหตุพิเศษ

**ส่วนที่ 3 - รายการเจาะเลือด**
- แสดงหลอดเลือดแบบ Horizontal พร้อมสีฝา 11 สี
- แต่ละหลอดแสดง: ชื่อ, ปริมาตร, รายการตรวจ, สารเติมแต่ง
- ไอคอนพิมพ์ Label แยกแต่ละหลอด
- Barcode Scanner สถานะ (เทา = ยังไม่สแกน, เขียว = สแกนแล้ว)
- Progress Counter (X/Y หลอดที่สแกนแล้ว)

**ส่วนที่ 4 - ข้อมูลการตรวจ**
- เวลาที่กดคิว
- เวลาเป้าหมาย (+30 นาที)
- ระยะเวลาที่ใช้
- Target เวลา (00:30:00)

**ส่วนที่ 5 - ข้อมูลการชำระเงิน**
- Billing Number
- วันที่ชำระเงิน
- เวลาเริ่มให้บริการ
- ผลการเจาะเก็บ
- ชื่อผู้ให้บริการ

**เทคโนโลยี:**
- HTML5
- CSS3 (Embedded)
- JavaScript (Embedded)
- Font: Sarabun (Google Fonts)

---

### 3️⃣ หน้าจอแสดงผลคิว (Queue Display Monitor)

**ไฟล์:** `blood-test-display-screen.html`

**คุณสมบัติ:**
- 🖥️ แสดงคิวปัจจุบันที่กำลังเรียกแบบ Full Screen
- 📱 แสดงรายการคิวที่รอถัดไป
- 🔄 อัพเดทแบบ Real-time
- ✨ Animation และเอฟเฟกต์พิเศษ
- 🔊 รองรับระบบเสียงแจ้งเตือน

**Layout:**
- **Header:** โลโก้ + ชื่อห้อง + เวลา/วันที่ปัจจุบัน
- **Main (Grid 2 คอลัมน์):**
  - ซ้าย (2/3): คิวปัจจุบัน (ตัวเลขขนาด 180px พร้อม Animation กระพริบ)
  - ขวา (1/3): รายการคิวที่รอ (แสดงหมายเลขคิวและช่องบริการ)
- **Footer:** ข้อความแนะนำผู้ใช้บริการ

**Animation:**
- `pulseGlow` - คิวปัจจุบันเรืองแสงกระพริบ
- `slideIn` - คิวใหม่เลื่อนเข้ามาจากด้านข้าง
- `blink` - หมายเลขคิวกระพริบสลับ

**เทคโนโลยี:**
- HTML5
- CSS3 (Embedded)
- JavaScript (Embedded)
- Font: Sarabun (Google Fonts)

---

## 🎨 ธีมสีและ Design System

### สีหลักของระบบ

**Primary Colors:**
```css
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Background: Purple Gradient
```

### สีตามประเภทผู้ป่วย

| ประเภท | สี | Hex Code |
|--------|-----|----------|
| ทั่วไป (General) | 🟢 เขียว | `#48bb78` |
| รถเข็น (Wheelchair) | 🟠 ส้ม | `#ed8936` |
| เร่งด่วน (Urgent) | 🔴 แดง | `#f56565` |
| กระปุก (Container) | 🟣 ม่วง | `#9f7aea` |

### สีตามสถานะคิว

| สถานะ | สี | รายละเอียด |
|-------|-----|-----------|
| รอเรียก (Waiting) | 🟡 เหลืองอำพัน | ยังไม่ได้เรียกคิว |
| เรียกแล้ว (Called) | 🟢 เขียว | เรียกคิวแล้วรอผู้ป่วย |
| กำลังให้บริการ (Serving) | 🔵 น้ำเงิน | กำลังเจาะเลือด |
| เสร็จสิ้น (Completed) | 🟣 ม่วง | ให้บริการเสร็จสิ้น |

### สีหลอดเลือด (11 สี)

| ลำดับ | สี | ชื่อ | การใช้งาน |
|-------|-----|------|-----------|
| 1 | 🔴 | Red Top | Chemistry Panel |
| 2 | 🟣 | Lavender (Purple) | CBC, EDTA |
| 3 | 🟢 | Green Top | Electrolytes, Lithium Heparin |
| 4 | 🔵 | Blue Top | Coagulation Tests |
| 5 | 🟡 | Yellow Top | Blood Culture, Serum Tests |
| 6 | ⚪ | Gray Top | Glucose, Sodium Fluoride |
| 7 | 🔵 | Light Blue | PT/PTT, Sodium Citrate |
| 8 | 🩷 | Pink Top | Blood Bank |
| 9 | 🟠 | Orange Top | Stat Tests |
| 10 | ⚫ | Black Top | ESR |
| 11 | ⚪ | White Top | Special Tests |

---

## 📊 โครงสร้างข้อมูล (Data Model)

### Queue Object (ข้อมูลคิว)

```javascript
{
  // ข้อมูลพื้นฐาน
  id: 'A032',                          // หมายเลขคิว (A/W/U/C + เลข 3 หลัก)
  name: 'นางสาวสมหญิง รักดี',           // ชื่อ-นามสกุล
  hn: 'HN123456',                      // Hospital Number
  type: 'general',                     // general|wheelchair|urgent|container
  status: 'waiting',                   // waiting|called|serving|completed
  time: '08:30',                       // เวลาลงทะเบียน

  // ข้อมูลผู้ป่วย
  sex: 'หญิง',                         // เพศ
  birthdate: '1990-03-15',             // วันเกิด (ใช้คำนวณอายุ)
  ward: 'OPD Med',                     // วอร์ด/แผนก
  right: 'ประกันสังคม',                 // สิทธิ์การรักษา
  department: '11MED',                 // รหัสแผนก
  nationality: 'ไทย',                   // สัญชาติ
  notes: 'แพ้ยา Penicillin',           // หมายเหตุพิเศษ
  photo: 'https://...',                // URL รูปภาพผู้ป่วย

  // รายการเจาะเลือด
  tubes: [...],                        // Array ของหลอดเลือด (Tube Object)

  // ข้อมูลการเรียกคิว
  calledByStaff: 'admin',              // ชื่อเจ้าหน้าที่ที่เรียก
  calledByCounter: 1,                  // หมายเลขช่องที่เรียก (1-10)
  queueCallTime: '14/10/2568 11:59:02', // เวลาที่เรียกคิว
  targetTime: '14/10/2568 12:29:02',   // เวลาเป้าหมาย (+30 นาที)

  // ข้อมูลการให้บริการ
  serviceStartTime: '2025-10-17T08:35:00.000Z', // เวลาเริ่มบริการ (ISO String)
  serviceDuration: '00:10:30',        // ระยะเวลาที่ใช้ (HH:MM:SS)
  serviceEndTime: '2025-10-17T08:45:30.000Z',   // เวลาจบบริการ
  drawOutcome: 'สำเร็จ',                // ผลการเจาะเก็บ
  difficultDrawReason: 'เส้นเลือดแตก',  // เหตุผล (ถ้าเจาะยาก)

  // ข้อมูลการชำระเงิน
  billingNo: 'BL202510001',            // เลขที่ Billing
  billingDate: '14/10/2568 11:56:02'   // วันที่ชำระเงิน
}
```

### Tube Object (ข้อมูลหลอดเลือด)

```javascript
{
  id: 1,                               // รหัสหลอด
  color: 'red',                        // สีหลอด (red|purple|green|blue|yellow|gray|light-blue|pink|orange|black|white)
  name: '🔴 Red Top',                  // ชื่อหลอด (พร้อม Emoji)
  volume: '5 mL',                      // ปริมาตร
  tests: 'Chemistry Panel',            // รายการตรวจ
  details: 'ตรวจเคมีในเลือดทั่วไป',      // รายละเอียด
  additives: ['Clot Activator'],      // สารเติมแต่งในหลอด (Array)
  scanned: false                       // สถานะสแกนส่งท่อลม (false|true)
}
```

---

## ⚙️ ขั้นตอนการทำงาน (Workflow)

### 1. ผู้ป่วยลงทะเบียน (Kiosk)

```
เริ่มต้น
  ↓
เลือกวิธีลงทะเบียน (ค้นหา หรือ สแกน QR)
  ↓
ระบบดึงข้อมูลจาก HIS
  ↓
ยืนยันข้อมูลผู้ป่วย (ถูกต้อง/ไม่ถูกต้อง)
  ↓
เลือกประเภทผู้ป่วย (A/W/U/C)
  ↓
ออกหมายเลขคิว + พิมพ์ใบคิว
  ↓
เสร็จสิ้น (รอที่บริเวณห้องเจาะเลือด)
```

### 2. เจ้าหน้าที่จัดการคิว (Staff Dashboard)

```
Login เข้าระบบ → เลือกช่องบริการ
  ↓
ดูรายการคิวในตาราง
  ↓
กดเรียกคิว (Status: waiting → serving)
  ↓
ผู้ป่วยมาถึง
  ↓
กดเริ่มให้บริการ
  ↓
- ระบบพิมพ์ Label หลอดเลือดอัตโนมัติ
- เริ่มจับเวลา Timer
- เปลี่ยน Action Buttons
  ↓
เจาะเลือด → ใส่หลอด
  ↓
สแกนหลอดเลือดทีละอัน (ส่งผ่านท่อลม)
  ↓
ครบทุกหลอด → กดสำเร็จ
  ↓
- หยุด Timer
- บันทึกระยะเวลา
- เปลี่ยน Status → completed
- ย้ายข้อมูลไป History
  ↓
เสร็จสิ้น
```

### 3. หน้าจอแสดงผลคิว (Display Monitor)

```
แสดงคิวปัจจุบันที่กำลังเรียก
  ↓
แสดงรายการคิวที่รอถัดไป (4-5 คิว)
  ↓
รับข้อมูลอัพเดทแบบ Real-time
  ↓
เมื่อมีคิวใหม่
  - เปลี่ยนคิวปัจจุบัน (Animation)
  - เล่นเสียงแจ้งเตือน
  - อัพเดทรายการรอ
  ↓
วนซ้ำต่อเนื่อง
```

---

## 🔧 ฟังก์ชันสำคัญ

### ระบบลงทะเบียน (Registration System)

| ฟังก์ชัน | รายละเอียด |
|----------|-----------|
| `showCard(cardId)` | สลับหน้าจอโดยเพิ่ม/ลบ class `active` |
| `searchPatient(event)` | ค้นหาผู้ป่วยจาก Name/LN/HN |
| `startScanning()` | เริ่มสแกน QR Code (setTimeout 3 วินาที) |
| `showVerification(data)` | แสดงหน้ายืนยันข้อมูล |
| `selectPatientType(type, element)` | เลือกประเภทผู้ป่วย |
| `confirmPatientType()` | สร้างหมายเลขคิวและแสดงผล |
| `backToHome()` | กลับหน้าหลักและ reset ข้อมูล |

### ระบบจัดการคิว (Queue Management System)

| ฟังก์ชัน | รายละเอียด |
|----------|-----------|
| `handleLogin(event)` | Login เข้าระบบ |
| `showPage(pageId)` | สลับหน้าเมนู |
| `callQueue(queueId)` | เรียกคิว (เปลี่ยน status → serving) |
| `viewPatient(queueId)` | แสดงรายละเอียดผู้ป่วย |
| `startService()` | เริ่มบริการ (พิมพ์ Label + เริ่ม Timer) |
| `scanTube(tubeId)` | Toggle สถานะสแกนหลอด |
| `startServiceTimer(startTime)` | เริ่มนับเวลาบริการ (setInterval 1s) |
| `stopServiceTimer()` | หยุดนับเวลา (clearInterval) |
| `completeService()` | จบบริการ (ย้าย History) |
| `releaseQueue()` | ปล่อยคิวกลับไปรอ (reset state) |
| `renderQueue(statusFilter)` | แสดงรายการคิวตาม filter |
| `renderTubeList(tubes)` | แสดงรายการหลอดเลือด |
| `updateStats()` | อัพเดทสถิติตามประเภท |
| `calculateDetailedAge(birthdate)` | คำนวณอายุ (ปี เดือน วัน) |
| `formatBirthdate(birthdate)` | แปลงวันเกิดเป็นรูปแบบไทย |

### หน้าจอแสดงผล (Display Screen)

| ฟังก์ชัน | รายละเอียด |
|----------|-----------|
| `updateTime()` | อัพเดทเวลาและวันที่ |
| `renderCurrentQueue()` | แสดงคิวปัจจุบัน |
| `renderWaitingQueues()` | แสดงรายการคิวรอ |
| `playNotificationSound()` | เล่นเสียงแจ้งเตือน |
| `simulateQueueUpdate()` | จำลองการอัพเดทคิว (Demo) |

---

## 🚀 วิธีการใช้งาน

### การติดตั้ง

ระบบนี้เป็น **Static HTML** ไม่ต้องติดตั้งหรือ Build

```bash
# Clone Repository
git clone [repository-url]
cd queue_systems

# เปิดไฟล์ HTML โดยตรงในเว็บเบราว์เซอร์
```

### การรันระบบ

#### 1. ระบบลงทะเบียน (Kiosk)
```bash
# เปิดไฟล์ในเบราว์เซอร์
open blood-test-registration-system.html

# หรือ double-click ที่ไฟล์
```

**การทดสอบ:**
- ค้นหา: พิมพ์ชื่อผู้ป่วยใดๆ (ยกเว้นคำว่า "error")
- สแกน QR: จำลองการสแกนใช้เวลา 3 วินาที
- เลือกประเภท: ทดสอบทั้ง 4 ประเภท
- ตรวจสอบ Responsive Design

#### 2. ระบบจัดการคิว (Staff)
```bash
# เปิดไฟล์ในเบราว์เซอร์
open blood-test-queue-management.html

# ข้อมูล Login (Pre-filled)
Username: admin
Password: admin
```

**การทดสอบ:**
- เลือกช่องบริการ (1-10)
- กดเรียกคิวจากตาราง
- ทดสอบการเริ่มบริการและ Timer
- กดสแกนหลอดเลือด (Toggle สีเขียว)
- จบการให้บริการ (ย้าย History)
- ทดสอบการปล่อยคิว
- Filter ตามสถานะ

#### 3. หน้าจอแสดงผล (Monitor)
```bash
# เปิดไฟล์ในเบราว์เซอร์ (แสดง Full Screen)
open blood-test-display-screen.html

# ไม่ต้อง Login
# จะแสดงคิวปัจจุบันและรายการรอโดยอัตโนมัติ
```

**การทดสอบ:**
- เปิดโหมด Full Screen (F11)
- สังเกต Animation การกระพริบ
- ดูการอัพเดทเวลา/วันที่

---

## 📁 โครงสร้างไฟล์

```
queue_systems/
│
├── 📄 blood-test-registration-system.html   # หน้าลงทะเบียนผู้ป่วย (338 บรรทัด)
├── 📄 blood-test-queue-management.html      # หน้าจัดการคิวเจ้าหน้าที่ (3,014 บรรทัด)
├── 📄 blood-test-display-screen.html        # หน้าจอแสดงผลคิว (574 บรรทัด)
│
├── 📁 css/
│   └── 📄 style.css                         # Styles สำหรับ Registration System (646 บรรทัด)
│
├── 📁 js/
│   └── 📄 main.js                           # JavaScript สำหรับ Registration System (186 บรรทัด)
│
├── 📄 CLAUDE.md                             # คู่มือสำหรับ Claude Code
├── 📄 README.md                             # ไฟล์นี้
├── 📄 Requirment.txt                        # ความต้องการเป็นภาษาไทย
├── 📄 เพิ่มเติม.txt                          # รายละเอียดเพิ่มเติมเป็นภาษาไทย
│
└── 📁 *.png                                 # ภาพ Mockup/Reference

**รวมทั้งหมด: 4,758 บรรทัดโค้ด**
```

---

## 🔐 ข้อมูล Mock Data

### ผู้ใช้งานสำหรับ Testing

```javascript
// Login Credentials (ฝั่งเจ้าหน้าที่)
Username: admin
Password: admin
```

### ข้อมูลคิวตัวอย่าง (10 รายการ)

| หมายเลขคิว | ชื่อผู้ป่วย | HN | ประเภท | สถานะ |
|-----------|------------|-----|--------|-------|
| A030 | นายวิชัย มั่งคั่ง | HN111111 | ทั่วไป | waiting |
| A031 | นางสาวพิมพ์ใจ สวยงาม | HN222222 | ทั่วไป | waiting |
| A032 | นางสาวสมหญิง รักดี | HN123456 | ทั่วไป | waiting |
| U005 | นายประชา สุขใจ | HN234567 | เร่งด่วน | waiting |
| A033 | นางสาววรรณา มีสุข | HN345678 | ทั่วไป | serving |
| W002 | นายสมชาย ใจดี | HN456789 | รถเข็น | waiting |
| A034 | นายเดชา กล้าหาญ | HN567890 | ทั่วไป | waiting |
| C003 | นางสาวมานี ส่งตัวอย่าง | HN678901 | กระปุก | waiting |
| A035 | นายอนุชา รุ่งเรือง | HN789012 | ทั่วไป | waiting |
| W003 | นางสมใจ ดีมาก | HN890123 | รถเข็น | waiting |

---

## 🎯 คุณสมบัติพิเศษ

### ✨ UI/UX Design

- 🎨 **Modern Gradient Design** - ใช้ Purple Gradient Theme
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- 🎭 **Rich Animations** - Animation ที่ลื่นไหลและสวยงาม
- 🌈 **Color-Coded System** - แยกสีตามประเภทและสถานะ
- 🖼️ **Visual Blood Tubes** - หลอดเลือดแบบ 3D Realistic

### 🔔 การแจ้งเตือน

- ✅ Visual Notification (Badge, Status Colors)
- ⏱️ Real-time Timer Display
- 🎯 Progress Tracking (Tube Scanning)
- 📊 Live Statistics Update

### 🔒 ความปลอดภัย

- 🔐 Staff Login System
- 👤 User Role Management
- 📝 Activity Logging (ผู้ให้บริการ, เวลา)
- ✅ Data Validation

### ♿ Accessibility

- 🔤 ฟอนต์ Sarabun (อ่านง่าย รองรับภาษาไทย)
- 🎨 High Contrast Colors
- 📏 Large Touch Targets (เหมาะสำหรับผู้สูงอายุ)
- 🌐 Thai Language Interface

---

## 🔄 Flow การเปลี่ยนสถานะคิว

```
┌─────────┐
│ waiting │ ◄──────────────────┐
└─────────┘                    │
     │                         │
     │ callQueue()            │ releaseQueue()
     ↓                         │
┌─────────┐                    │
│ serving │ ───────────────────┘
└─────────┘
     │
     │ startService()
     ↓
┌─────────────────────┐
│ serving (hasStarted)│
└─────────────────────┘
     │
     │ completeService()
     ↓
┌───────────┐
│ completed │ → move to History
└───────────┘
```

---

## 🎬 หน้าจอและ Actions ตามสถานะ

### สถานะ: waiting

**ปุ่มที่แสดง:**
- 🔵 เรียกคิว (Call Queue)
- 👁️ ดูข้อมูล (View Details)

**Action:**
- กดเรียกคิว → เปลี่ยนเป็น `serving`

---

### สถานะ: serving (ยังไม่ startService)

**ปุ่มที่แสดง (Initial Actions):**
- 🔁 เรียกซ้ำ (Recall)
- ↩️ ปล่อยคิว (Release)
- ▶️ เริ่มให้บริการ (Start Service)
- ⚠️ เจาะเลือดยาก (Difficult Draw - Dropdown)

**Action:**
- กดเริ่มให้บริการ → พิมพ์ Label + เริ่ม Timer
- กดปล่อยคิว → กลับไป `waiting`

---

### สถานะ: serving (startService แล้ว)

**ปุ่มที่แสดง (In-Service Actions):**
- ✅ สำเร็จ (Complete)
- ⏸️ รอเรียกใหม่ (Wait for Recall)
- ❌ ปิดคิว (Close Queue)
- 🏷️ Labelling (Print Again)

**Display:**
- ⏱️ Timer นับเวลาแบบ Real-time
- 📊 Progress Counter (X/Y หลอดสแกน)

**Action:**
- กดสำเร็จ → หยุด Timer → เปลี่ยนเป็น `completed` → ย้าย History

---

## 📊 Mock Data Structure

### ประเภทผู้ป่วย (Patient Types)

```javascript
{
  general: 'ทั่วไป',       // Prefix: A
  wheelchair: 'รถเข็น',    // Prefix: W
  urgent: 'เร่งด่วน',      // Prefix: U
  container: 'กระปุก'      // Prefix: C
}
```

### สถานะคิว (Queue Status)

```javascript
{
  waiting: 'รอเรียก',
  called: 'เรียกแล้ว',
  serving: 'กำลังให้บริการ',
  completed: 'เสร็จสิ้น'
}
```

### หลอดเลือดในระบบ (Blood Tube Colors)

```javascript
const tubeColors = [
  'red',        // Chemistry
  'purple',     // CBC (EDTA)
  'green',      // Electrolytes
  'blue',       // Coagulation
  'yellow',     // Blood Culture
  'gray',       // Glucose
  'light-blue', // PT/PTT
  'pink',       // Blood Bank
  'orange',     // Stat Tests
  'black',      // ESR
  'white'       // Special Tests
];
```

---

## 🔮 การพัฒนาต่อยอด (Future Enhancements)

### 🔴 ความสำคัญสูง (High Priority)

- [ ] **Backend API Development**
  - สร้าง REST API หรือ GraphQL
  - Database Integration (PostgreSQL/MySQL)
  - Authentication & Authorization

- [ ] **Real-time Synchronization**
  - WebSocket Implementation
  - หรือ Server-Sent Events (SSE)
  - Sync ข้อมูลระหว่าง 3 ระบบ

- [ ] **HIS Integration**
  - เชื่อมต่อระบบ Hospital Information System
  - ดึงข้อมูลผู้ป่วยจริง
  - ดึงรายการ Lab Orders

### 🟡 ความสำคัญปานกลาง (Medium Priority)

- [ ] **Hardware Integration**
  - QR Code Scanner (Physical Device)
  - Label Printer API
  - Barcode Scanner API
  - ระบบท่อลม (Pneumatic Tube System)

- [ ] **Audio System**
  - Thai TTS (Text-to-Speech)
  - เสียงเรียกคิวอัตโนมัติ
  - Background Music

- [ ] **Reporting & Analytics**
  - Dashboard สถิติรายวัน/รายเดือน
  - ระยะเวลารอเฉลี่ย
  - ประสิทธิภาพการให้บริการ
  - Export รายงาน (PDF/Excel)

### 🟢 ความสำคัญต่ำ (Low Priority)

- [ ] **Mobile Application**
  - แอพสำหรับผู้ป่วยตรวจสอบคิว
  - แจ้งเตือนเมื่อใกล้ถึงคิว
  - ประวัติการตรวจ

- [ ] **Advanced Features**
  - AI Prediction เวลารอโดยประมาณ
  - Auto-scheduling ตามความเร่งด่วน
  - Multi-language Support
  - Dark Mode

- [ ] **Performance Optimization**
  - Progressive Web App (PWA)
  - Offline Support
  - Caching Strategy

---

## 🐛 ข้อจำกัดปัจจุบัน (Current Limitations)

### 1. ข้อมูลแยกกัน (Data Isolation)
- ❌ 3 ระบบไม่เชื่อมต่อกัน
- ❌ ข้อมูลอยู่ใน Browser Memory (หายเมื่อ Refresh)
- ❌ ไม่มีการบันทึกถาวร

### 2. Mock Data
- ❌ ข้อมูลผู้ป่วยเป็น Mock
- ❌ QR Scanner เป็นการจำลอง (3 วินาที)
- ❌ Label Printer เป็น Alert
- ❌ Barcode Scanner เป็น Click Toggle

### 3. ไม่มี Backend
- ❌ ไม่มี Database
- ❌ ไม่มี API
- ❌ ไม่มี Authentication จริง

### 4. Real-time Updates
- ❌ ไม่มี WebSocket
- ❌ ไม่มีการ Sync อัตโนมัติ
- ❌ ต้อง Manual Refresh

---

## 🛠️ เทคโนโลยีที่ใช้

| ส่วน | เทคโนโลยี | Version |
|------|----------|---------|
| Frontend | HTML5 | - |
| Styling | CSS3 | - |
| Animation | CSS Animations & Transitions | - |
| Script | JavaScript (ES6+) | - |
| Font | Sarabun (Google Fonts) | - |
| Icons | SVG (Inline) | - |
| Layout | CSS Grid, Flexbox | - |

---

## 📝 หมายเหตุสำหรับ Developer

### การแก้ไขโค้ด

**ระบบลงทะเบียน:**
- HTML: `blood-test-registration-system.html`
- CSS: แก้ใน `css/style.css`
- JS: แก้ใน `js/main.js`

**ระบบจัดการคิว:**
- แก้ใน `blood-test-queue-management.html` ทั้ง CSS และ JS
- CSS อยู่ใน `<style>` tag (บรรทัด 10-1874)
- JS อยู่ใน `<script>` tag (บรรทัด 2408-3013)

**หน้าจอแสดงผล:**
- แก้ใน `blood-test-display-screen.html` ทั้ง CSS และ JS
- CSS อยู่ใน `<style>` tag (บรรทัด 10-378)
- JS อยู่ใน `<script>` tag (บรรทัด 443-571)

### สิ่งสำคัญที่ต้องระวัง

⚠️ **Timer Management:**
- ต้อง `stopServiceTimer()` ก่อนออกจากหน้า Patient Detail
- มิฉะนั้น Timer จะยังทำงานต่อใน Background

⚠️ **Status Flow:**
- ห้าม skip status (เช่น waiting → completed โดยตรง)
- ต้องผ่าน serving เสมอ

⚠️ **Data Validation:**
- ตรวจสอบ `serviceStartTime` ก่อนคำนวณ Timer
- ตรวจสอบ Queue exists ก่อน update

---

## 📞 การติดต่อและสนับสนุน

### ทีมพัฒนา
- **โรงพยาบาล:** Thammarat Advanced Medical Center (THAMC)
- **แผนก:** ห้องเจาะเลือด (Blood Test Department)

### เอกสารอ้างอิง
- 📄 `CLAUDE.md` - คู่มือสำหรับ Claude Code
- 📄 `Requirment.txt` - ความต้องการระบบภาษาไทย
- 📄 `เพิ่มเติม.txt` - รายละเอียดเพิ่มเติม Patient Detail Page

---

## 📜 License

ระบบนี้พัฒนาขึ้นเพื่อใช้งานภายในโรงพยาบาล THAMC
สงวนลิขสิทธิ์ © 2025 Thammarat Advanced Medical Center

---

## 🎉 สรุป

ระบบจัดการคิวห้องเจาะเลือดนี้ออกแบบมาเพื่อ:

✅ **เพิ่มประสิทธิภาพ** - จัดการคิวอย่างเป็นระบบ
✅ **ลดความผิดพลาด** - ตรวจสอบข้อมูลผู้ป่วยและหลอดเลือด
✅ **ประหยัดเวลา** - กระบวนการเจาะเลือดที่รวดเร็ว
✅ **โปร่งใส** - ผู้ป่วยเห็นสถานะคิวแบบ Real-time
✅ **ครบวงจร** - ตั้งแต่ลงทะเบียนจนเสร็จสิ้น

---

**พัฒนาด้วย ❤️ สำหรับทีมแพทย์และพยาบาลห้องเจาะเลือด THAMC**
