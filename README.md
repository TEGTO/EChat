# EChat - Real-Time Chat Application with Sentiment Analysis

## Overview

EChat is a real-time chat application leveraging Azure services, including Azure SignalR, Azure SQL, and Azure Cognitive Services (Text Analytics). It provides seamless real-time messaging and optional sentiment analysis for enriched user experience.

> **Note:** Azure SQL (serverless) may take ~1-2 minutes to load on the first request if the server has been idle.

This application utilizes:
- **Azure SignalR** for real-time communication.
- **Azure SQL** (serverless) for storing chat messages and sentiment analysis results.
- **Azure Cognitive Services (Text Analytics)** for analyzing message sentiments (optional).
- **Angular 18** as the frontend framework.
- **ASP.NET Core 8** for the backend.
- **GitHub Actions** for CI/CD, ensuring streamlined deployments, testing, and code coverage reports.

## Web Application

- **Live Application**:  
  [https://kind-tree-075070103.4.azurestaticapps.net/](https://kind-tree-075070103.4.azurestaticapps.net/)

## Installation Guide

### 1. **Clone the Repository**
   Run the following command to clone the repository:
   ```bash
   git clone https://github.com/TEGTO/EChat
   ```

### 2. **Navigate to the Backend Directory**
   Move to the backend directory and open the solution file:
   ```bash
   cd src/EChat.Backend
   ```
   Open the `.sln` file in your preferred IDE (e.g., Visual Studio).

### 3. **Set Up the Environment**
   - Download and configure the [.env file](https://drive.google.com/file/d/1s3wSQ2Ty5lrF0wOcIV8UsRKc7uXhkYWY/view?usp=sharing).  
   - Or create one manually with the required environment variables.

### 4. **Run the Project**
   Run the Docker Compose project directly from Visual Studio.

### 5. **Navigate to the Frontend Directory**
   Navigate to the frontend directory:
   ```bash
   cd src/EChat.Frontend
   ```
### 6. **Install Dependencies**
   Install the required Angular packages:
   ```bash
   npm install
   ```
### 7. **Run the Project**
   Start the Angular development server:
   ```bash
   ng s
   ```
### 7. **Open the site**
   Visit the local development site:
   [http://localhost:4200/](http://localhost:4200/)

