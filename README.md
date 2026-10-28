# Workly – Scalable Job Hiring Platform 

**Workly** is a full-stack job hiring platform designed to connect job seekers with employers through a centralized recruitment system. It streamlines the hiring process, enabling candidates to explore job opportunities and apply for positions while employers can manage job postings and applications efficiently.

## 🎯 Project Overview

The goal of Workly is to simplify recruitment by providing a platform where job seekers and employers can interact throughout the hiring lifecycle, from job discovery and application submission to candidate selection and offer generation.

##  Key Features

* **User Authentication:** Secure registration and login.
* **Job Management:** Create, view, update, and manage job postings.
* **Job Search:** Help candidates discover relevant job opportunities.
* **Job Applications:** Allow job seekers to apply for available positions.
* **Employer Dashboard:** Manage job listings and track applications.
* **Application Tracking:** Monitor the progress of submitted applications.
* **Recruitment Workflow:** Support the hiring process from application to offer generation.
* **Responsive Interface:** Provide a user-friendly experience across different screen sizes.

##  Technology Stack

### Frontend

* React.js
* TypeScript
* HTML5
* CSS3

### Backend

* Java
* Spring Boot
* Spring Security
* REST APIs

### Database

* MySQL

### Development Tools

* Git and GitHub
* Apache Maven
* Postman
* IntelliJ IDEA or Visual Studio Code

## 🏗️System Architecture

Workly follows a full-stack architecture in which the frontend communicates with the backend through REST APIs.

          Job Seeker / Employer
                   |
                   v
          React.js + TypeScript
                   |
                   v
             REST APIs
                   |
                   v
          Java + Spring Boot
                   |
                   v
               MySQL

## ⚙️ Application Workflow

1. Users register or log in to the platform.
2. Job seekers browse available job opportunities.
3. Candidates submit applications for suitable positions.
4. Employers create and manage job postings.
5. Employers review applications and update application statuses.
6. The recruitment workflow progresses toward candidate selection and offer generation.

## 🚀 Getting Started

### Prerequisites

Ensure the following tools are installed:

* Java Development Kit (JDK)
* Apache Maven
* Node.js and npm
* MySQL Server
* Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/rahulhattinagre/Job-Hiring-Platform.git
cd Job-Hiring-Platform
```

**2. Configure the database**

Create a MySQL database for the application.

```sql
CREATE DATABASE workly_db;
```

Configure the database connection in your Spring Boot `application.properties` file.

spring.datasource.url=jdbc:mysql://localhost:3306/workly_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

Configure the remaining database and application settings according to your project.

**3. Start the backend**

From the backend directory, run: 
mvn spring-boot:run

**4. Start the frontend**
From the frontend directory, run:
npm install
npm run dev

Open the local development URL displayed in your terminal.


## Security

The application can use Spring Security to protect backend resources and enforce access permissions. Authentication and role-based authorization should be configured according to the implemented security model.

##  Learning Outcomes

This project demonstrates practical experience with:

* Full-stack application development
* Java and Spring Boot
* REST API design and integration
* React.js and TypeScript
* MySQL database integration
* CRUD operations
* Authentication and authorization
* Git-based version control

##  Future Enhancements

* Email notifications for application status updates
* Advanced job search and filtering
* Resume upload and management
* Interview scheduling
* Recruitment analytics dashboard
* Automated offer letter generation
* Cloud deployment and CI/CD integration

##  Author

**Rahul Hattinagre**

Aspiring Full Stack Developer
