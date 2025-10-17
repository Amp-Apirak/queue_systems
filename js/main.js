        let currentCard = 'mainScreen';
        let selectedPatientType = null;
        let patientData = null;

        // Update time display
        function updateTime() {
            const now = new Date();
            const options = { 
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            document.getElementById('timeDisplay').textContent = now.toLocaleTimeString('th-TH', options);
        }
        updateTime();
        setInterval(updateTime, 1000);

        // Show specific card
        function showCard(cardId) {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('active');
            });
            document.getElementById(cardId).classList.add('active');
            currentCard = cardId;
        }

        // Start scanning
        function startScanning() {
            showCard('scanningScreen');
            
            // Simulate QR code scanning (replace with actual scanning logic)
            setTimeout(() => {
                // Simulate finding patient data
                const mockData = {
                    ln: 'LN20251016001',
                    hn: 'HN123456',
                    name: 'คุณสมชาย ใจดี',
                    date: '16 ตุลาคม 2568',
                    tests: 'Complete Blood Count (CBC), Lipid Profile'
                };
                showVerification(mockData);
            }, 3000);
        }

        // Cancel scanning
        function cancelScanning() {
            showCard('mainScreen');
        }

        // Search patient
        function searchPatient(event) {
            event.preventDefault();
            const searchValue = document.getElementById('searchInput').value.trim();
            
            if (!searchValue) {
                alert('กรุณากรอกชื่อ, LN, หรือ HN');
                return;
            }
            
            // Simulate search (replace with actual API call)
            setTimeout(() => {
                // Check if patient found
                if (searchValue.toLowerCase().includes('error')) {
                    showError('ไม่พบข้อมูลผู้รับบริการที่ค้นหา');
                } else {
                    const mockData = {
                        ln: 'LN20251016001',
                        hn: 'HN123456',
                        name: searchValue.startsWith('LN') ? 'คุณสมชาย ใจดี' : searchValue,
                        date: '16 ตุลาคม 2568',
                        tests: 'Complete Blood Count (CBC)'
                    };
                    showVerification(mockData);
                }
            }, 1000);
        }

        // Show verification screen with patient data
        function showVerification(data) {
            patientData = data;
            document.getElementById('patientName').textContent = data.name;
            document.getElementById('patientLN').textContent = data.ln;
            document.getElementById('patientHN').textContent = data.hn;
            document.getElementById('appointmentDate').textContent = data.date;
            
            showCard('verificationScreen');
        }

        // Show patient type selection
        function showPatientTypeSelection() {
            // Reset selection
            selectedPatientType = null;
            document.querySelectorAll('.type-card').forEach(card => {
                card.classList.remove('selected');
            });
            document.getElementById('confirmTypeBtn').disabled = true;
            document.getElementById('confirmTypeBtn').style.opacity = '0.5';
            document.getElementById('confirmTypeBtn').style.cursor = 'not-allowed';
            
            showCard('patientTypeScreen');
        }

        // Select patient type
        function selectPatientType(type, element) {
            selectedPatientType = type;
            
            // Remove selected class from all cards
            document.querySelectorAll('.type-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            element.classList.add('selected');
            
            // Enable confirm button
            const confirmBtn = document.getElementById('confirmTypeBtn');
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
        }

        // Confirm patient type and proceed
        function confirmPatientType() {
            if (!selectedPatientType) {
                alert('กรุณาเลือกประเภทผู้รับบริการ');
                return;
            }
            
            // Generate queue number based on type
            let queuePrefix = 'A';
            switch(selectedPatientType) {
                case 'general':
                    queuePrefix = 'A';
                    break;
                case 'wheelchair':
                    queuePrefix = 'W';
                    break;
                case 'urgent':
                    queuePrefix = 'U';
                    break;
                case 'container':
                    queuePrefix = 'C';
                    break;
            }
            
            const queueNum = queuePrefix + String(Math.floor(Math.random() * 50) + 30).padStart(3, '0');
            document.getElementById('queueNumber').textContent = queueNum;
            
            showCard('successScreen');
            
            // Auto return to home after 10 seconds
            setTimeout(() => {
                backToHome();
            }, 10000);
        }

        // Back to verification
        function backToVerification() {
            showCard('verificationScreen');
        }

        // Reject verification
        function rejectVerification() {
            showError('คุณได้ปฏิเสธข้อมูล กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่');
        }

        // Show error screen
        function showError(message) {
            document.getElementById('errorMessage').textContent = message;
            showCard('errorScreen');
        }

        // Contact staff
        function contactStaff() {
            alert('กำลังเรียกเจ้าหน้าที่...\n\nเจ้าหน้าที่จะมาให้บริการในไม่ช้า\nหรือโทร: 02-XXX-XXXX ต่อ 1234');
        }

        // Back to home
        function backToHome() {
            document.getElementById('searchInput').value = '';
            selectedPatientType = null;
            patientData = null;
            showCard('mainScreen');
        }
    
