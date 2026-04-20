# InternNova - University Internship & Bootcamp Management Portal

A professional, fully-responsive web application for managing university internships and bootcamp programs with role-based access control, real-time messaging, and advanced features.

## 🎯 Project Overview

InternNova is built exclusively with **HTML5, CSS3 (Tailwind CSS CDN), and Vanilla JavaScript** to provide a modern, professional dashboard for managing:
- **Student internship applications** and bootcamp enrollments
- **Faculty mentorship** and student management
- **Admin oversight** of the entire system

## 📁 Project Structure

```
internNOva/
├── index.html                  # Main HTML entry point
├── css/
│   └── styles.css             # Custom CSS with animations and theme
├── js/
│   ├── main.js                # Application routing and initialization
│   ├── auth.js                # Authentication and session management
│   ├── data-service.js        # Mock data layer with LocalStorage
│   ├── ui-components.js       # Reusable UI components (modals, toasts, etc.)
│   ├── admin-dashboard.js     # Super Administrator portal
│   ├── faculty-dashboard.js   # Faculty Member portal
│   └── student-dashboard.js   # Student portal
└── README.md                  # Project documentation
```

## 🎨 Visual Design

- **Theme:** Modern "Slate and Indigo" professional dashboard aesthetic
- **Color Palette:**
  - Primary: Indigo (#4f46e5)
  - Secondary: Slate (#64748b)
  - Success: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Danger: Red (#ef4444)

- **Components:**
  - Persistent sidebar navigation
  - Fixed header with user profile
  - Skeleton loading animations
  - Modal/Dialog system
  - Toast notifications
  - Chat bubbles
  - Responsive tables with live search and sorting
  - Countdown timers

## 👥 Three Role-Based Portals

### 1. 🔐 **Super Administrator Dashboard**

**Features:**
- **Overview:** Statistical cards showing:
  - Total Students
  - Pending Applications
  - Approved Placements
  - Recent Activity Log

- **Student Directory:**
  - Comprehensive data table with all students
  - Live search by name
  - Multi-filter options (Program, Semester, Section)
  - Column sorting by Name/Roll Number

- **Review System:**
  - Inspect pending student applications
  - Approve or reject internship submissions
  - Detailed student information modal

- **Faculty Oversight:**
  - Approve pending staff registrations
  - Hierarchical assignment of faculty to class/semester/section combinations
  - View all approved faculty members

- **Bootcamp Management:**
  - Create new bootcamp programs
  - Auto-generate bootcamp descriptions (AI-simulated)
  - Define applicable semesters and capacities
  - Track bootcamp capacity and enrollment

- **Email Directory:**
  - Unified user database
  - Searchable by Name or Email
  - Academic and role-based filtering

**Demo Access:**
```
Email: admin@krmu.edu.in
Password: admin123
```

---

### 2. 👨‍🏫 **Faculty Member Portal**

**Features:**
- **Dashboard:**
  - Key metrics (assigned sections, students under mentorship, unread messages)
  - List of assigned class/semester/section combinations
  - Recent student queries feed (filtered to their sections only)

- **Mentorship Hub:**
  - Browse students in assigned sections
  - Live search students
  - Quick-access message buttons

- **Class Monitor:**
  - View active bootcamps matching assigned semesters
  - Enrolled students list for each bootcamp
  - Commencement countdown timer for each bootcamp

- **Real-Time Mentorship Chat:**
  - Sidebar-driven chat interface
  - Auto-populated with students from assigned sections
  - Bubble chat UI with timestamps
  - Message persistence with read/unread status

**Demo Access:**
```
Email: faculty1@krmu.edu.in
Password: faculty123
```

---

### 3. 🎓 **Student Portal**

**Features:**
- **Email Registration & OTP Verification:**
  - Specialized signup for @krmu.edu.in users
  - 6-digit OTP verification (demo mode)
  - Email verification status tracking

- **3-Step Enrollment Wizard:**
  - **Step 1:** Type selection (Online/Offline/Bootcamp)
  - **Step 2:** Program details
    - For regular internships: Company name, position, duration, start date
    - For bootcamps: Select from available bootcamps
  - **Step 3:** Document upload simulation (offer letters)
  - Visual progress indicator

- **Dynamic Dashboard:**
  - Current Program, Section, Verification Status cards
  - Application Status badge
  - Active Bootcamp Enrollments with timers
  - Quick action buttons

- **Mentor Portal:**
  - Only available after selecting internship path
  - Real-time chat with assigned mentor
  - Mentor contact information (Email/Phone)
  - Message history with timestamps

- **My Profile:**
  - Profile photo display with update capability
  - Academic summary (Program, Semester, Section)
  - Path History log
  - Communication History snippets
  - Verification status display

**Demo Access:**
```
Email: student1@krmu.edu.in
Password: student123
```

---

## ⚡ Advanced Features

### 🎬 Skeleton Loading Animations
- High-fidelity placeholder animations during data transitions
- Mirrors final UI layout for seamless experience
- Visible on table rows, cards, and chat messages

### 🔔 Toast Notifications
- Success, Error, Warning, and Info types
- Auto-dismiss with manual close option
- Stacked notifications in top-right corner

### 📋 Modal/Dialog System
- Centered, responsive modals
- Customizable buttons and callbacks
- Backdrop click to close
- Form validation within modals

### 💬 Real-Time Chat Interface
- Bubble-style messages (incoming/outgoing)
- Timestamps for each message
- Read/unread status tracking
- Automatic thread creation between users

### 🔄 Countdown Timers
- Bootcamp commencement timers
- Real-time updates every second
- Format: Days, Hours, Minutes, Seconds
- Expires gracefully

### 📊 Responsive Data Tables
- Live search/filter functionality
- Column-based sorting
- Mobile-friendly design
- Pagination-ready

### 🎨 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Sidebar collapse on mobile
- Touch-friendly buttons and inputs

## 💾 Data Layer

### LocalStorage Mock Database
All data is persisted in browser LocalStorage:
- **Users:** Admin, Faculty, Students
- **Students:** Comprehensive student records
- **Bootcamps:** Program definitions and enrollments
- **Pending Staff:** Faculty registration queue
- **Activity Log:** System-wide activity tracking
- **Messages:** Conversation history

### Data Initialization
- Automatic initialization on first load
- Persistent across browser sessions
- Can be reset by clearing browser data

## 🔐 Authentication & Authorization

- **Session Management:** Login/logout with token (stored in LocalStorage)
- **Role-Based Access Control (RBAC):**
  - Super Admin: Full system access
  - Faculty: Access to assigned sections only
  - Student: Personal account management
- **Protected Routes:** Dashboard access checks current user role

## 📱 Technical Stack

- **Frontend:** HTML5, CSS3 (Tailwind CSS CDN), Vanilla JavaScript
- **Styling:** Tailwind CSS with custom animations
- **Data Storage:** Browser LocalStorage
- **No External Dependencies:** Purely HTML, CSS, and JavaScript

## 🚀 Getting Started

### 1. Open in Browser
Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)

### 2. Login with Demo Credentials

**Admin Account:**
- Email: `admin@krmu.edu.in`
- Password: `admin123`

**Faculty Account:**
- Email: `faculty1@krmu.edu.in`
- Password: `faculty123`

**Student Account:**
- Email: `student1@krmu.edu.in`
- Password: `student123`

### 3. Explore Features
- Create bootcamps
- Review student applications
- Enroll in programs
- Chat with mentors/students

## 🎯 Key Functionalities

### For Administrators
✅ View system statistics and activity logs
✅ Manage student directory with filters
✅ Review and approve/reject applications
✅ Approve and assign faculty to sections
✅ Create and manage bootcamps with auto-description
✅ Access email directory

### For Faculty
✅ View assigned sections and students
✅ Access mentorship hub
✅ Monitor active bootcamps
✅ Real-time chat with students
✅ Track student queries

### For Students
✅ Email verification with OTP
✅ Multi-step enrollment wizard
✅ Select internship type and bootcamp
✅ Upload documents (simulated)
✅ View enrollment status
✅ Chat with assigned mentor
✅ Manage profile and view history

## 🎨 UI/UX Highlights

- **Animations:**
  - Fade-in effects on page loads
  - Skeleton shimmer during loading
  - Smooth transitions between views
  - Pulse animation for active elements

- **Accessibility:**
  - Semantic HTML structure
  - ARIA-friendly components
  - Keyboard navigation support
  - Clear visual hierarchy

- **Performance:**
  - No server requests (all local)
  - Instant UI updates
  - Smooth scrolling
  - Optimized animations

## 📞 Support

For questions or issues, refer to the code comments throughout the project files for detailed explanations of each module's functionality.

## 📝 License

This project is for educational purposes.

---

**Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript**
