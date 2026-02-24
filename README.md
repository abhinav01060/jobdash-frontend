🎨 JobDash – Frontend (React Dashboard)
🚀 Overview

JobDash Frontend is a React-based dashboard application that allows users to manage and track job applications.

It connects to a Spring Boot backend via REST APIs and provides a clean, responsive interface for:

Creating job applications

Viewing all applications

Updating application status

Deleting applications

This project demonstrates full-stack integration using React and Axios.

🛠 Tech Stack

React (Functional Components)

Axios (API communication)

Tailwind CSS (Styling) (if used)

JavaScript (ES6+)

🔗 Backend Integration

This frontend connects to the JobDash backend API.

Backend Repository:
👉 https://github.com/your-username/jobdash-backend

Make sure the backend is running at:

http://localhost:8080
📂 Project Structure
src/
 ├── components/
 ├── pages/
 ├── services/
 │    └── api.js
 ├── App.js
 └── index.js
Folder Responsibilities

components/ → UI components

pages/ → Main dashboard page

services/api.js → Axios API calls

App.js → Main application component

📡 API Usage

The frontend consumes the following backend endpoints:

GET /applications

POST /applications

PUT /applications/{id}/status

DELETE /applications/{id}

API calls are managed using Axios inside services/api.js.

🧪 Running Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/jobdash-frontend.git
cd jobdash-frontend
2️⃣ Install dependencies
npm install
3️⃣ Start development server
npm start

App runs at:

http://localhost:3000
⚙️ Environment Configuration (Recommended)

Instead of hardcoding API URL, create a .env file:

REACT_APP_API_URL=http://localhost:8080

Then update Axios config:

baseURL: process.env.REACT_APP_API_URL
✨ Features Implemented

Responsive dashboard layout

Add new job application form

Applications table view

Status update dropdown

Delete confirmation

Loading and error handling

Full backend integration
