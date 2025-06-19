# 🎓 Student Progress Management System

A full-stack **MERN** application to track and manage the competitive programming progress of students. This system fetches data from platforms like **Codeforces**, displays detailed analytics, and provides easy admin controls for student management, syncing, and reporting.

---

Video Link : https://youtu.be/vqeIJT4P8sE

---

## 🚀 Features

- ✅ **Student Dashboard**: View a list of all students with key metrics.
- ✅ **Detailed Profile View**: Individual student performance, ratings, submissions, and contests.
- ✅ **Codeforces Integration**: Automatically fetches student data via handle (e.g., problems solved, rating, contest history).
- ✅ **Manual & Automatic Sync**: Sync individual or all students’ data manually or via a cron job.
- ✅ **Inactivity Monitoring**: Detect inactivity and send email reminders.
- ✅ **Download Reports**: Export table data as CSV.
- ✅ **Responsive UI**: Works on desktop and mobile with Light/Dark mode toggle.
- ✅ **Secure Backend**: Built with Express and MongoDB, handles API calls safely.

---


## 🛠️ Tech Stack

| Layer         | Technology                 |
|---------------|----------------------------|
| Frontend      | React, Tailwind CSS        |
| Backend       | Node.js, Express.js        |
| Database      | MongoDB                    |
| External API  | Codeforces Public API      |
| Syncing       | Node-Cron                  |
| Email         | Nodemailer                 |
| Charts        | Recharts / Chart.js        |
| Routing       | React Router DOM           |
| Icons         | Lucide React               |

---

## 🖥️ Project Structure

```bash
Student-Progress-Management-System/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── package.json

```

## 📸 Screenshots

### 🧮 Dashboard View
![image](https://github.com/user-attachments/assets/4a60abe3-4b26-4574-99d0-614451d0a92e)

### 🌗 Light/Dark Mode Toggle
![image](https://github.com/user-attachments/assets/fa524836-2f8a-41cd-86b4-04575ae32b67)
![image](https://github.com/user-attachments/assets/483b0033-c625-4303-b40b-370dd93a8b0e)

### 🧠 Schema Architecture
![diagram-export-6-19-2025-12_15_14-AM](https://github.com/user-attachments/assets/9bb5f490-fefe-4dac-87c9-d29fb5f6b16e)

## 🧑‍💻 Getting Started

Follow these steps to set up and run the Student Progress Management System locally on your machine.

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/prathamesh-pichkate/Student-Progress-Management-System.git
cd Student-Progress-Management-System
```
### 🛠️ 2. Backend Setup

```bash
cd backend
npm install
```

Create a .env file inside the backend/ directory with the following variables:
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Start the backend server:
```bash
npm run dev
```

The backend server will run at http://localhost:5000

💻 3. Frontend Setup
Open a new terminal window/tab and run:
```bash
cd frontend
npm install
npm run dev
```

🔁 4. Automatic Sync Cron Job
The backend has a cron job (backend/utils/sync.js) that automatically syncs student data with Codeforces API at scheduled intervals.

🧪 5. Test the Application
Open http://localhost:5173 in your browser.

-Add or view students.
-Check detailed profiles with Codeforces data.
-Export CSV reports.
-Toggle Light/Dark mode.



