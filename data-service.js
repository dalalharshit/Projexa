/**
 * Mock Data Service
 * Manages all data operations with LocalStorage persistence
 */

class DataService {
    constructor() {
        this.initializeMockData();
    }

    initializeMockData() {
        // Check if data already exists
        if (localStorage.getItem('internNova_initialized')) {
            return;
        }

        // Initialize users
        const users = {
            admin: {
                id: 'admin_001',
                email: 'admin@krmu.edu.in',
                password: 'admin123',
                name: 'Dr. Rajesh Kumar',
                role: 'super_admin',
                phone: '+91-9876543210',
                department: 'Academic Affairs',
                avatar: 'https://util.visme.co/temp/f3c91f26d3e84fa9a91ca12d9c5d8e5c.png'
            },
            faculty1: {
                id: 'faculty_001',
                email: 'faculty1@krmu.edu.in',
                password: 'faculty123',
                name: 'Prof. Ananya Singh',
                role: 'faculty',
                phone: '+91-9876543211',
                department: 'Computer Science',
                assignedSections: [
                    { program: 'B.Tech CSE', semester: 4, section: 'A' },
                    { program: 'B.Tech CSE', semester: 6, section: 'B' }
                ],
                avatar: 'https://util.visme.co/temp/a2d9c7e3f5b1c8a4e6f2d0c5b7a9e1f3.png'
            },
            faculty2: {
                id: 'faculty_002',
                email: 'faculty2@krmu.edu.in',
                password: 'faculty123',
                name: 'Dr. Vikram Patel',
                role: 'faculty',
                phone: '+91-9876543212',
                department: 'Computer Science',
                assignedSections: [
                    { program: 'B.Tech AI&ML', semester: 2, section: 'C' },
                    { program: 'B.Tech AI&ML', semester: 4, section: 'D' }
                ],
                avatar: 'https://util.visme.co/temp/e1a3b5c7d9f1e3a5b7c9d1f3a5b7c9d1.png'
            },
            student1: {
                id: 'student_001',
                email: 'student1@krmu.edu.in',
                password: 'student123',
                name: 'Priya Sharma',
                rollNumber: 'CSE2024001',
                role: 'student',
                phone: '+91-8765432100',
                program: 'B.Tech CSE',
                semester: 4,
                section: 'A',
                avatar: 'https://util.visme.co/temp/c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9.png',
                verificationStatus: 'verified',
                currentPath: null,
                enrolledBootcamps: []
            },
            student2: {
                id: 'student_002',
                email: 'student2@krmu.edu.in',
                password: 'student123',
                name: 'Arjun Desai',
                rollNumber: 'AI2024015',
                role: 'student',
                phone: '+91-8765432101',
                program: 'B.Tech AI&ML',
                semester: 2,
                section: 'C',
                avatar: 'https://util.visme.co/temp/f3e1d9c7b5a3f1e9d7c5b3a1f9e7d5c3.png',
                verificationStatus: 'verified',
                currentPath: null,
                enrolledBootcamps: []
            }
        };

        // Initialize students database
        const students = [
            {
                id: 'student_001',
                name: 'Priya Sharma',
                email: 'priya.sharma@krmu.edu.in',
                rollNumber: 'CSE2024001',
                phone: '+91-8765432100',
                program: 'B.Tech CSE',
                semester: 4,
                section: 'A',
                verificationStatus: 'verified',
                applicationStatus: 'pending',
                internshipType: null,
                mentorId: null
            },
            {
                id: 'student_002',
                name: 'Arjun Desai',
                email: 'arjun.desai@krmu.edu.in',
                rollNumber: 'AI2024015',
                phone: '+91-8765432101',
                program: 'B.Tech AI&ML',
                semester: 2,
                section: 'C',
                verificationStatus: 'verified',
                applicationStatus: 'pending',
                internshipType: null,
                mentorId: null
            },
            {
                id: 'student_003',
                name: 'Zara Khan',
                email: 'zara.khan@krmu.edu.in',
                rollNumber: 'CSE2024002',
                phone: '+91-8765432102',
                program: 'B.Tech CSE',
                semester: 4,
                section: 'B',
                verificationStatus: 'pending',
                applicationStatus: 'pending',
                internshipType: null,
                mentorId: null
            },
            {
                id: 'student_004',
                name: 'Rahul Verma',
                email: 'rahul.verma@krmu.edu.in',
                rollNumber: 'CSE2024003',
                phone: '+91-8765432103',
                program: 'B.Tech CSE',
                semester: 6,
                section: 'B',
                verificationStatus: 'verified',
                applicationStatus: 'approved',
                internshipType: 'online',
                mentorId: 'faculty_001'
            }
        ];

        // Initialize bootcamps
        const bootcamps = [
            {
                id: 'bootcamp_001',
                title: 'Full Stack Web Development Bootcamp',
                description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world projects and earn industry-recognized certification.',
                outcomes: ['Build scalable web applications', 'Master Node.js backend', 'Learn MongoDB databases'],
                startDate: '2024-05-15',
                endDate: '2024-08-15',
                duration: '12 weeks',
                minSemester: 4,
                maxSemester: 6,
                capacity: 50,
                enrolled: 12,
                mentor: 'faculty_001',
                status: 'active'
            },
            {
                id: 'bootcamp_002',
                title: 'AI & Machine Learning Specialization',
                description: 'Deep dive into machine learning algorithms, neural networks, and AI applications. Includes hands-on projects with TensorFlow and PyTorch.',
                outcomes: ['Understand ML algorithms', 'Build neural networks', 'Deploy ML models'],
                startDate: '2024-06-01',
                endDate: '2024-09-01',
                duration: '14 weeks',
                minSemester: 2,
                maxSemester: 4,
                capacity: 40,
                enrolled: 8,
                mentor: 'faculty_002',
                status: 'active'
            },
            {
                id: 'bootcamp_003',
                title: 'Cloud Architecture & DevOps Mastery',
                description: 'Learn cloud platforms, containerization, CI/CD pipelines, and infrastructure automation with AWS and Kubernetes.',
                outcomes: ['Master AWS services', 'Docker & Kubernetes', 'Implement CI/CD pipelines'],
                startDate: '2024-07-10',
                endDate: '2024-09-20',
                duration: '10 weeks',
                minSemester: 4,
                maxSemester: 6,
                capacity: 35,
                enrolled: 5,
                mentor: 'faculty_001',
                status: 'active'
            }
        ];

        // Initialize pending staff
        const pendingStaff = [
            {
                id: 'staff_pending_001',
                name: 'Dr. Sneha Gupta',
                email: 'sneha.gupta@krmu.edu.in',
                phone: '+91-9876543213',
                department: 'Computer Science',
                status: 'pending',
                submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'staff_pending_002',
                name: 'Prof. Amit Sharma',
                email: 'amit.sharma@krmu.edu.in',
                phone: '+91-9876543214',
                department: 'Information Technology',
                status: 'pending',
                submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        // Initialize activity log
        const activityLog = [
            {
                id: 'activity_001',
                userId: 'student_001',
                userName: 'Priya Sharma',
                action: 'Submitted internship application',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                type: 'submission'
            },
            {
                id: 'activity_002',
                userId: 'student_004',
                userName: 'Rahul Verma',
                action: 'Application approved for Online Internship',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                type: 'approval'
            },
            {
                id: 'activity_003',
                userId: 'faculty_001',
                userName: 'Prof. Ananya Singh',
                action: 'Registered as Faculty Member',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                type: 'registration'
            },
            {
                id: 'activity_004',
                userId: 'student_002',
                userName: 'Arjun Desai',
                action: 'Enrolled in AI & Machine Learning Bootcamp',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                type: 'enrollment'
            }
        ];

        // Initialize messages
        const messages = [
            {
                id: 'msg_001',
                senderId: 'student_001',
                receiverId: 'faculty_001',
                senderName: 'Priya Sharma',
                receiverName: 'Prof. Ananya Singh',
                content: 'Hi Professor, I would like to discuss my internship options.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                read: false
            },
            {
                id: 'msg_002',
                senderId: 'faculty_001',
                receiverId: 'student_001',
                senderName: 'Prof. Ananya Singh',
                receiverName: 'Priya Sharma',
                content: 'Hi Priya! I\'d be happy to help. Let\'s schedule a meeting this week.',
                timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
                read: false
            }
        ];

        // Save to localStorage
        localStorage.setItem('internNova_users', JSON.stringify(users));
        localStorage.setItem('internNova_students', JSON.stringify(students));
        localStorage.setItem('internNova_bootcamps', JSON.stringify(bootcamps));
        localStorage.setItem('internNova_pendingStaff', JSON.stringify(pendingStaff));
        localStorage.setItem('internNova_activityLog', JSON.stringify(activityLog));
        localStorage.setItem('internNova_messages', JSON.stringify(messages));
        localStorage.setItem('internNova_initialized', 'true');
    }

    // User Methods
    getUser(email, password) {
        const users = JSON.parse(localStorage.getItem('internNova_users') || '{}');
        const user = Object.values(users).find(u => u.email === email && u.password === password);
        return user ? { ...user } : null;
    }

    getUserById(userId) {
        const users = JSON.parse(localStorage.getItem('internNova_users') || '{}');
        return Object.values(users).find(u => u.id === userId) || null;
    }

    // Students Methods
    getAllStudents() {
        return JSON.parse(localStorage.getItem('internNova_students') || '[]');
    }

    getStudentById(studentId) {
        const students = this.getAllStudents();
        return students.find(s => s.id === studentId);
    }

    getStudentsBySection(program, semester, section) {
        const students = this.getAllStudents();
        return students.filter(s => s.program === program && s.semester === semester && s.section === section);
    }

    updateStudent(studentId, updates) {
        const students = this.getAllStudents();
        const index = students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            students[index] = { ...students[index], ...updates };
            localStorage.setItem('internNova_students', JSON.stringify(students));
            return students[index];
        }
        return null;
    }

    // Bootcamp Methods
    getAllBootcamps() {
        return JSON.parse(localStorage.getItem('internNova_bootcamps') || '[]');
    }

    getBootcampsForSemester(semester) {
        const bootcamps = this.getAllBootcamps();
        return bootcamps.filter(b => b.minSemester <= semester && semester <= b.maxSemester && b.status === 'active');
    }

    createBootcamp(bootcampData) {
        const bootcamps = this.getAllBootcamps();
        const newBootcamp = {
            id: 'bootcamp_' + Date.now(),
            ...bootcampData,
            enrolled: 0,
            status: 'active'
        };
        bootcamps.push(newBootcamp);
        localStorage.setItem('internNova_bootcamps', JSON.stringify(bootcamps));
        return newBootcamp;
    }

    // Pending Staff Methods
    getPendingStaff() {
        return JSON.parse(localStorage.getItem('internNova_pendingStaff') || '[]');
    }

    approveStaffAndAddUser(staffId, userData) {
        const pendingStaff = this.getPendingStaff();
        const staffIndex = pendingStaff.findIndex(s => s.id === staffId);
        
        if (staffIndex !== -1) {
            pendingStaff.splice(staffIndex, 1);
            localStorage.setItem('internNova_pendingStaff', JSON.stringify(pendingStaff));
            
            // Add to users
            const users = JSON.parse(localStorage.getItem('internNova_users') || '{}');
            users[userData.id] = userData;
            localStorage.setItem('internNova_users', JSON.stringify(users));
            
            return true;
        }
        return false;
    }

    rejectStaff(staffId) {
        const pendingStaff = this.getPendingStaff();
        const filtered = pendingStaff.filter(s => s.id !== staffId);
        localStorage.setItem('internNova_pendingStaff', JSON.stringify(filtered));
        return true;
    }

    // Activity Log Methods
    getActivityLog(limit = 10) {
        const log = JSON.parse(localStorage.getItem('internNova_activityLog') || '[]');
        return log.slice(-limit).reverse();
    }

    addActivityLog(activity) {
        const log = JSON.parse(localStorage.getItem('internNova_activityLog') || '[]');
        log.push({
            id: 'activity_' + Date.now(),
            timestamp: new Date().toISOString(),
            ...activity
        });
        localStorage.setItem('internNova_activityLog', JSON.stringify(log));
    }

    // Messages Methods
    getMessages(userId) {
        const messages = JSON.parse(localStorage.getItem('internNova_messages') || '[]');
        return messages.filter(m => m.senderId === userId || m.receiverId === userId).sort((a, b) => 
            new Date(a.timestamp) - new Date(b.timestamp)
        );
    }

    getConversation(userId1, userId2) {
        const messages = JSON.parse(localStorage.getItem('internNova_messages') || '[]');
        return messages.filter(m => 
            (m.senderId === userId1 && m.receiverId === userId2) || 
            (m.senderId === userId2 && m.receiverId === userId1)
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    sendMessage(senderId, receiverId, senderName, receiverName, content) {
        const messages = JSON.parse(localStorage.getItem('internNova_messages') || '[]');
        const newMessage = {
            id: 'msg_' + Date.now(),
            senderId,
            receiverId,
            senderName,
            receiverName,
            content,
            timestamp: new Date().toISOString(),
            read: false
        };
        messages.push(newMessage);
        localStorage.setItem('internNova_messages', JSON.stringify(messages));
        return newMessage;
    }

    markMessagesAsRead(userId, otherId) {
        let messages = JSON.parse(localStorage.getItem('internNova_messages') || '[]');
        messages = messages.map(m => {
            if (m.receiverId === userId && m.senderId === otherId) {
                m.read = true;
            }
            return m;
        });
        localStorage.setItem('internNova_messages', JSON.stringify(messages));
    }

    // Statistics Methods
    getStatistics() {
        const students = this.getAllStudents();
        const bootcamps = this.getAllBootcamps();
        
        return {
            totalStudents: students.length,
            pendingApplications: students.filter(s => s.applicationStatus === 'pending').length,
            approvedPlacements: students.filter(s => s.applicationStatus === 'approved').length,
            verifiedStudents: students.filter(s => s.verificationStatus === 'verified').length,
            totalBootcamps: bootcamps.length,
            activeBootcamps: bootcamps.filter(b => b.status === 'active').length
        };
    }
}

// Create global instance
const dataService = new DataService();
