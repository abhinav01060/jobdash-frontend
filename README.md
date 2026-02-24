📌 JobDash – Job Application Dashboard (Backend) 🚀 Overview

JobDash is a Spring Boot backend application that allows users to manage and track job applications.

It provides REST APIs for:

Creating job applications

Viewing all applications

Updating application status

Deleting applications

Validating input

Handling errors properly

This project demonstrates clean backend architecture using Spring Boot and JPA.

🛠 Tech Stack

Java 17+

Spring Boot

Spring Data JPA

H2 (development database)

PostgreSQL (optional for production)

Maven

REST APIs

🧱 Project Architecture com.jobdash.dash ├── controller ├── service ├── repository ├── model ├── dto ├── exception └── JobDashApplication Layer Responsibilities

Controller → Handles HTTP requests

Service → Contains business logic

Repository → Handles database operations

DTO → Represents client input

Model (Entity) → Represents database table

Exception → Global error handling

📡 API Endpoints 1️⃣ Create Application

POST /applications

{ "companyName": "Google", "role": "Backend Engineer", "source": "LinkedIn" } 2️⃣ Get All Applications

GET /applications

3️⃣ Update Application Status

PUT /applications/{id}/status?status=INTERVIEW

Allowed status values:

APPLIED

INTERVIEW

OFFER

REJECTED

4️⃣ Delete Application

DELETE /applications/{id}

✅ Features Implemented

Clean layered architecture

DTO → Entity conversion

Enum-based status management

JPA-based persistence

Automatic ID generation

Validation using @NotBlank

Global exception handling (@ControllerAdvice)

RESTful API design

🧪 Running Locally 1️⃣ Clone the repository git clone https://github.com/your-username/jobdash-backend.git cd jobdash-backend 2️⃣ Run the application ./mvnw spring-boot:run

or from IDE run JobDashApplication.

3️⃣ Access API

Backend runs on:

http://localhost:8080

H2 Console (if enabled):

http://localhost:8080/h2-console 📦 Database

Currently using:

H2 (in-memory database for development)

Can be switched to:

PostgreSQL for production deployment

🌍 Deployment

Recommended deployment platforms:

Backend → Render

Frontend → Vercel / Netlify

🎯 Future Improvements

User authentication (Spring Security + JWT)

Pagination & sorting

Filtering by status

Dashboard statistics endpoint

PostgreSQL integration for production

Docker containerization

👨‍💻 Author

Built as part of backend development learning using Spring Boot.
