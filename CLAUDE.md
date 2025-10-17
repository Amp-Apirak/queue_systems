# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Blood Test Queue Management System** for Thammarat Advanced Medical Center (THAMC). The system consists of two main components:

1. **Patient Registration System** (`blood-test-registration-system.html`) - A kiosk interface for patients to register and get queue numbers
2. **Staff Queue Management System** (`blood-test-queue-management.html`) - An admin dashboard for staff to manage blood test queues

The system implements a "One Queue" workflow where patients use their hospital registration queue number to check in at the blood test department.

## Language and Context

- **Primary Language**: Thai (ภาษาไทย)
- **Target Users**: Hospital patients and medical staff in Thailand
- **UI/UX Requirements**: Must be accessible to all ages and genders, appropriate for hospital settings

## Architecture

### File Structure

```
queue_systems/
├── blood-test-registration-system.html  # Patient-facing kiosk interface
├── blood-test-queue-management.html     # Staff dashboard (embedded CSS/JS)
├── css/
│   └── style.css                        # Styles for registration system
├── js/
│   └── main.js                          # Logic for registration system
├── Requirment.txt                       # Thai requirements document
├── เพิ่มเติม.txt                        # Additional feature specifications
└── *.png                                # UI mockups/references
```

### System Flow

1. **Patient Registration** (`blood-test-registration-system.html`):
   - Search by Name/LN (Lab Number)/HN (Hospital Number) OR scan QR code
   - Verify patient information from HIS (Hospital Information System)
   - Select patient type (General/Wheelchair/Urgent/Container)
   - Generate queue number with prefix (A=General, W=Wheelchair, U=Urgent, C=Container)

2. **Staff Queue Management** (`blood-test-queue-management.html`):
   - Login with staff credentials and select service counter (1-5)
   - View real-time queue dashboard with stats by patient type
   - Call queue → starts process and displays patient details
   - Start service → prints blood tube labels automatically
   - Scan blood tubes as they're sent via pneumatic tube system
   - Complete or manage exceptions (difficult draw, no-show, etc.)

### Data Model

**Queue Object Structure**:
```javascript
{
  id: 'A032',                          // Queue number
  name: 'นางสาวสมหญิง รักดี',          // Patient name
  hn: 'HN123456',                      // Hospital number
  type: 'general',                     // general|wheelchair|urgent|container
  status: 'waiting',                   // waiting|serving|completed
  time: '08:30',                       // Registration time
  sex: 'หญิง',                         // Gender
  age: '34 ปี',                        // Age
  ward: 'OPD Med',                     // Ward/Department
  right: 'ประกันสังคม',                // Insurance type
  notes: 'แพ้ยา Penicillin',           // Medical notes
  photo: 'https://...',                // Patient photo URL
  tubes: [...],                        // Blood test tubes
  calledByStaff: 'admin',             // Staff who called queue
  calledByCounter: 1,                  // Counter number
  serviceStartTime: '2025-10-17T...'   // Service start timestamp
}
```

**Blood Tube Object**:
```javascript
{
  id: 1,
  color: 'red',                        // red|purple|green|blue|yellow|gray|light-blue|pink|orange|black|white
  name: '🔴 Red Top',
  volume: '5 mL',
  tests: 'Chemistry',
  details: 'ตรวจเคมีในเลือดทั่วไป',
  additives: ['Clot Activator'],
  scanned: false                       // Track if sent via pneumatic tube
}
```

## Key Features

### Patient Detail Page Layout (from เพิ่มเติม.txt)

The patient detail page is divided into 5 sections in a grid layout:

**Section 1 - Action Panel** (Top, full width):
- **Before Starting Service**: Call Again | Release Queue | Start Service | Difficult Draw
- **After Starting Service**: Complete | Wait for Re-call | Close Queue | Labelling
- Plus: Counter number display and service timer

**Section 2 - Patient Information** (Left column):
- Queue number, patient type, photo
- HN, gender, age, ward, insurance, department, nationality, notes

**Section 3 - Blood Test List** (Center column):
- Visual representation of blood tubes with colored caps
- Print label button per tube
- Scan status indicator (gray → green when scanned)

**Section 4 - Test Information** (Right top):
- Queue call time, target time, elapsed time, target duration (30:00)

**Section 5 - Billing Information** (Right bottom):
- Billing number, billing date, service start time, draw outcome, staff name

### State Management

**Button State Changes**:
- When "Start Service" is clicked:
  - Automatically prints labels for all tubes
  - Starts service timer
  - Changes button panel from initial actions to in-service actions
  - Sets `serviceStartTime` timestamp

**Queue Status Flow**:
```
waiting → (call) → serving → (complete/release/close) → completed/waiting/removed
```

## Development Guidelines

### Styling Conventions

- **Color Scheme**: Purple gradient (`#667eea` to `#764ba2`)
- **Patient Type Colors**:
  - General: Green (`#48bb78`)
  - Wheelchair: Orange (`#ed8936`)
  - Urgent: Red (`#f56565`)
  - Container: Purple (`#9f7aea`)
- **Status Badge Colors**:
  - Waiting: Yellow/amber background
  - Called: Green background
  - Serving: Blue background
  - Completed: Purple background

### Mock Data

Both HTML files use mock data for development. When integrating with the actual HIS:
- Replace QR scanning simulation with actual scanner API
- Replace search function with HIS API calls
- Connect to real-time queue updates via WebSocket or polling
- Integrate with label printer API
- Connect barcode scanner for tube tracking

### Testing Patient Types

Use these prefixes to generate different queue types:
- `A###` - General patients
- `W###` - Wheelchair patients
- `U###` - Urgent patients
- `C###` - Container/sample only

## Integration Points

### Hospital Information System (HIS)
- **Patient lookup**: Search by Name, LN (Lab Number), HN (Hospital Number)
- **Lab test orders**: Retrieve ordered blood tests and tube requirements
- **Patient demographics**: Photo, age, gender, ward, insurance, etc.
- **Billing status**: Verify payment before service

### Hardware Integration
- **QR Code Scanner**: Patient appointment QR codes
- **Label Printer**: Blood tube labels with patient info and test codes
- **Barcode Scanner**: Scan tube barcodes when sending via pneumatic system
- **Display Monitor**: Queue announcement display (not yet implemented)
- **Audio System**: Voice announcement when calling queue (not yet implemented)

## Common Workflows

### Running the System Locally

```bash
# No build required - pure HTML/CSS/JS
# Open in browser directly:
# For kiosk interface:
open blood-test-registration-system.html

# For staff dashboard:
open blood-test-queue-management.html
# Login: username=admin, password=admin (pre-filled)
```

### Testing Different Scenarios

**Registration System**:
- Test search with any patient name (avoid "error" in search term)
- Test QR scan simulation (waits 3 seconds then shows verification)
- Test all 4 patient type selections
- Check responsive design on tablet/mobile devices

**Management System**:
- Test calling queue from waiting list
- Test starting service and timer functionality
- Test tube scanning toggle (click checkmark icon)
- Test completing service (moves to history)
- Test releasing queue (returns to waiting)
- Filter queues by status (waiting/serving/completed)

## Technical Notes

### Timer Implementation
Service timer uses `setInterval` and calculates elapsed time from `serviceStartTime` timestamp. Remember to call `stopServiceTimer()` before navigating away from patient detail page.

### Tube Visualization
Blood tubes are rendered horizontally with realistic CSS styling including:
- Gradient glass effect on tube body
- Colored caps with grip texture
- Blood liquid visualization inside tube
- Responsive to different screen sizes

### Navigation Pattern
The system uses `showPage()` and `showCard()` functions to toggle between views without page reloads. All screens are single-page applications.

### History Tracking
Completed queues are added to `historyData` array and displayed in the History page. In production, this should sync with the database.

## Future Enhancements

Based on requirements, planned features include:
- Monitor display system for queue announcements
- Audio announcement system
- Real-time integration with HIS database
- WebSocket for live queue updates across multiple counters
- Reporting and analytics dashboard
- Mobile app for patients to check queue status
