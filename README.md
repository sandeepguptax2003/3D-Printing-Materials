# 3D Printing Materials API

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

This project implements a robust backend API for managing 3D printing materials. The API facilitates CRUD operations for 3D printing materials, including image uploads and retrievals.

## Project Overview

The project utilizes MongoDB for data storage and Firebase Storage for handling image uploads. The goal is to create a scalable and efficient backend system that supports the core functionalities of managing 3D printing materials data.

### Project Presentation Video
<div align="center">
  <a href="https://drive.google.com/file/d/10J8BfgND6XBuDjJSdj_hltdXKc0L3_Uy/preview">
    <img src="https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg" alt="Project Presentation Video" style="width: 80%; max-width: 600px;">
  </a>
</div>

## Features

The implemented features include:
- Material Management (CRUD operations)
- Image Upload and Storage
- Filtering and Retrieval of Materials
- Secure Image Handling
- Error Handling

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Firebase Storage for Image Handling
- Multer for File Upload Handling

## API Endpoints

- **GET /materials**: Fetch all materials from the database.
- **GET /materials/:id**: Retrieve a specific material by its ID, including its associated image.
- **POST /materials**: Add a new material to the database, including an image upload.
- [ Example fields for post method : name:FDA / technology:FDM / colors:Red, Black / pricePerGram:0.4 / applicationTypes:Educational / image:upload image from local system
- **PUT /materials/:id**: Update an existing material's details, optionally updating its associated image.
- **DELETE /materials/:id**: Remove a material from the database by its ID.

For detailed API usage, refer to the Models and Routes in the codebase.

## Installation

To get the 3D Printing Materials API up and running on your local machine, follow these steps:

1. **Clone the repository**: `git clone [Your Repository URL]`
2. **Install dependencies**: Navigate to the project directory and install the required dependencies using npm.
3. **Set up environment variables**: Create a `.env` file in the root directory of the project. Add the following environment variables to it:PORT=3000 MONGODB_URI=your_mongodb_uri FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

   Replace `your_mongodb_uri` and `your_firebase_storage_bucket` with your actual MongoDB connection string and Firebase storage bucket URL.
4. **Set up Firebase**:
   - Create a Firebase project and download the service account key JSON file.
   - Place this file in your project directory (ensure it's not in a public folder).
   - Update the path to this file in your `firebaseConfig.js`.
5. **Start the server**: With all dependencies installed and environment variables set, you can start the server by running:Nodemon Server.js

## Contributing

We welcome contributions to improve our project To contribute, please follow these guidelines:
1. Fork the repository and clone it to your local machine.
2. Install dependencies using `npm install`.
3. Set up the development environment as described in the Installation section.
4. Follow our coding standards.
5. Make your changes and test them thoroughly.
6. Submit a pull request with a detailed description of your changes.

## Contact

For any queries or suggestions, please feel free to contact [Your Name/Email/Contact Information].

