# Task Manager / Kanban Board

A full-stack Kanban Task Manager application built using Next.js, NestJS, Prisma, and SQLite.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Project Management
- Task Management
- Kanban Board
- Drag and Drop Tasks
- Protected Routes
- Responsive UI


# Tech Stack

## Frontend
- Next.js
- TypeScript
- TailwindCSS
- dnd-kit

## Backend
- NestJS
- Prisma ORM
- SQLite
- JWT Authentication


# Project Structure

task-manager/
├── frontend/
├── backend/


# Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on:
http://localhost:3000

---

# Backend Setup

cd backend

npm install

npx prisma migrate dev

npm run start:dev

Backend runs on:
http://localhost:3001


# Authentication

Users can:
- Register
- Login
- Access only their own projects/tasks

JWT tokens are stored in localStorage.


# Kanban Features

- Create Tasks
- Delete Tasks
- Drag & Drop between columns
- To Do
- In Progress
- Done

