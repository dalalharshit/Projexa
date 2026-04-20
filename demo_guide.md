# InternNova - Quick Start Guide

## 🚀 How to Launch

1. **Open the application:** Simply double-click `index.html` or open it in any modern web browser
2. **Login page will appear:** You'll see the InternNova login screen with demo credentials

## 👤 Demo Accounts

### 1. **Super Administrator**
```
Email: admin@krmu.edu.in
Password: admin123
```

**What You Can Do:**
- View statistics and activity logs
- Review student directory with filters
- Manage student applications
- Create bootcamp programs
- Approve and assign faculty
- Browse email directory

---

### 2. **Faculty Member**
```
Email: faculty1@krmu.edu.in
Password: faculty123
```

**What You Can Do:**
- View your assigned sections and students
- Browse mentorship hub
- Monitor active bootcamps
- Chat with students in real-time
- View recent student queries

---

### 3. **Student**
```
Email: student1@krmu.edu.in
Password: student123
```

**What You Can Do:**
- Complete email verification (any 6-digit code works)
- Enroll in an internship or bootcamp
- View your profile and academic info
- Chat with your assigned mentor
- Track enrollment status and countdowns

---

## 📋 Step-by-Step Experience Guide

### Admin Dashboard Experience (20 minutes)

**Step 1: Login as Admin**
- Enter: `admin@krmu.edu.in` / `admin123`
- Click "Sign In"

**Step 2: Explore Dashboard**
- View statistics cards (Students, Pending Applications, etc.)
- Scroll down to see Recent Activity Log

**Step 3: Student Directory**
- Click "Student Directory" in sidebar
- Try live search (search by student name)
- Apply filters (Program, Semester, Section)
- Click "Review" on any student to view details

**Step 4: Review Applications**
- Click "Review System" in sidebar
- See pending application cards
- Click "Approve" or "Reject" buttons
- Watch activity log update in real-time

**Step 5: Create a Bootcamp**
- Click "Bootcamp Manager" in sidebar
- Fill in bootcamp details (Title, dates, outcomes)
- Click "🤖 Auto-Generate Description" to create marketing copy
- Click "Create Bootcamp"

**Step 6: Manage Faculty**
- Click "Faculty Oversight" in sidebar
- See pending staff registrations
- Click "Approve & Assign" to add them
- Assign them to specific sections

**Step 7: Email Directory**
- Click "Email Directory" in sidebar
- Search for any user by name or email
- See complete contact information

---

### Faculty Portal Experience (15 minutes)

**Step 1: Login as Faculty**
- Enter: `faculty1@krmu.edu.in` / `faculty123`
- Click "Sign In"

**Step 2: View Dashboard**
- See your assigned sections
- View metrics (students, messages)
- Check recent student queries

**Step 3: Mentorship Hub**
- Click "Mentorship Hub" in sidebar
- See all students in your assigned sections
- Use search to find specific students
- Click "Message" to start a conversation

**Step 4: Class Monitor**
- Click "Class Monitor" in sidebar
- See active bootcamps for your semesters
- Watch countdown timers (real-time)
- Click "View Enrolled Students" to see bootcamp participants

**Step 5: Real-Time Chat**
- Click "Real-Time Mentorship" in sidebar
- Select a student from the left panel
- Type messages in the chat box
- See message history with timestamps

---

### Student Portal Experience (20 minutes)

**Step 1: Login as Student**
- Enter: `student1@krmu.edu.in` / `student123`
- Click "Sign In"

**Step 2: Email Verification**
- You're presented with OTP verification
- Enter any 6-digit code (e.g., 123456)
- Click "Verify Email"
- You're now logged into student dashboard

**Step 3: View Dashboard**
- See your program, semester, and section info
- Check your verification status
- View application status
- Click quick action buttons

**Step 4: Start Enrollment Wizard**
- Click "Enrollment Wizard" in sidebar
- **Step 1:** Select internship type (Online/Offline/Bootcamp)
  - Try "Bootcamp" for the full experience
- **Step 2:** Select a bootcamp
  - Click on any bootcamp card to select
  - Click "Next"
- **Step 3:** Upload documents
  - This is simulated - you can skip file upload
  - Click "Complete Enrollment"

**Step 5: View Your Profile**
- Click "My Profile" in sidebar
- See your academic summary
- View communication history
- Check path history if you've enrolled

**Step 6: Chat with Mentor (After Enrollment)**
- After completing enrollment, click "Mentor Portal" sidebar
- See your assigned mentor's info
- Chat interface will be available
- Send messages and see history

---

## 🎯 Key Features to Try

### Toast Notifications
- Perform any action and watch colored notifications appear in top-right
- They auto-dismiss after 3 seconds

### Skeleton Loading
- Some components show shimmer animations while loading
- Test by rapidly switching between pages

### Countdown Timers
- View bootcamp countdowns in Real-Time Mentorship
- Timers update every second in real-time format

### Modal Dialogs
- Click "Review" on any student in directory
- A detailed modal will pop up with close button
- Try clicking outside the modal to close

### Live Search & Sorting
- In Student Directory, start typing in search
- Results filter instantly as you type
- Click table headers to sort by column

### Multi-Select Filters
- Student Directory has multiple filter dropdowns
- Combine filters (Program + Semester + Section)
- See results update in real-time

---

## 💡 Pro Tips

1. **Try Different Device Sizes:**
   - Resize browser window to see responsive design
   - Sidebar collapses on mobile (< 768px)
   - All layouts adjust for smaller screens

2. **Check Activity Log:**
   - Every action you perform appears in admin activity log
   - Includes logins, application submissions, approvals

3. **Test Messaging:**
   - As admin, approve a student application
   - Switch to faculty account
   - Go to Real-Time Mentorship
   - Try messaging a student

4. **Explore All Pages:**
   - Each role has distinct dashboards
   - Try all navigation items in each role
   - Check how data persists (it's stored locally)

5. **Refresh and Persist:**
   - Make changes and refresh the page (F5)
   - All data is saved locally and persists
   - Try logging out and back in

---

## 🔍 Data Persistence

All data is stored in your browser's LocalStorage:
- Data consists across browser sessions
- To clear data: Press F12 → Application → LocalStorage → Clear All
- Then refresh the page (data will reinitialize)

---

## 🎨 Design Highlights to Notice

- **Color Scheme:** Slate and Indigo professional theme
- **Animations:** Smooth transitions, skeleton loaders, countdown timers
- **Responsive Design:** Try resizing - layout adapts perfectly
- **Chat Bubbles:** Messages show as colored bubbles (blue for incoming, indigo for outgoing)
- **Badges:** Status indicators with color coding (green=success, yellow=pending, etc.)

---

## 📊 Sample Data Available

The app comes with pre-loaded sample data:

**Students:**
- Priya Sharma (CSE, Semester 4, Section A)
- Arjun Desai (AI&ML, Semester 2, Section C)
- Zara Khan (CSE, Semester 4, Section B)
- Rahul Verma (CSE, Semester 6, Section B) - Already approved

**Bootcamps:**
- Full Stack Web Development Bootcamp
- AI & Machine Learning Specialization
- Cloud Architecture & DevOps Mastery

**Faculty:**
- Prof. Ananya Singh (assigned to CSE, Sem 4 & 6)
- Dr. Vikram Patel (assigned to AI&ML, Sem 2 & 4)

---

## 🆘 Troubleshooting

**Page is blank?**
- Check browser console (F12) for errors
- Make sure JavaScript is enabled
- Try clearing browsercache and refresh

**Data not persisting?**
- Check if LocalStorage is enabled in browser
- Some browsers block LocalStorage in private mode
- Try a different browser or normal window

**Animations not smooth?**
- This is normal on older devices
- Try closing other browser tabs
- Animations are intentionally lightweight

**Can't login?**
- Make sure you're using exact email and password
- Check if Caps Lock is on
- Try refreshing the page

---

## 📞 Common Questions

**Q: Is this a real application that stores data on servers?**
A: No, this is a demo. All data is stored locally in your browser only.

**Q: Can I add more users?**
A: The data initialization adds specific demo users. You'd need to edit data-service.js to add more.

**Q: Does it use any external APIs?**
A: No, everything is standalone. The app only uses HTML, CSS, and JavaScript.

**Q: Are emails really sent?**
A: No, this is simulated. Email functionality is mocked.

**Q: Can I deploy this?**
A: Yes! Simply upload all files to a web server or use GitHub Pages. It needs no backend.

---

Enjoy exploring InternNova! 🎓✨
