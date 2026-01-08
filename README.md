# Twitter Clone - Internship Assignment

Hi! 👋 
This is my submission for the **Product Engineering Intern** practical assignment. I've built a full-stack, mobile-responsive application that mimics the core functionality of Twitter (X).

My goal was not just to make it "work", but to build it with a structure that is clean, readable, and easy to build upon—trying to think like a product engineer.

## 📱 The Project
A social feed application where users can sign up, post updates, like, retweet, and follow other users in real-time.

### Tech Stack Choices
I chose these technologies to align with your company's stack and modern best practices:
- **Frontend**: **Next.js** (App Router). I largely focused on component modularity (breaking down the feed into reusable parts like `TweetCard`). I used **TailwindCSS** for styling because it's fast and handles Dark Mode naturally.
- **Backend**: **NestJS**. I really appreciate its opinionated structure. It helped me keep my Auth, User, and Tweet logic separated and organized.
- **Database**: **SQLite** with **Prisma**. I chose SQLite for simplicity for this local demo, but Prisma makes it easy to switch to Postgres or MySQL later.

## 🏗️ Architecture Overview
I organized the project into two distinct parts:
- **`backend/`**: Contains the API, authentication logic (JWT), and database models.
- **`frontend/`**: The Next.js client.

I tried to write clean, self-documenting code. For example, instead of large files, I broke the frontend into smaller components (`NewTweetForm`, `TweetCard`) and the backend into specific Modules.

## � How to Run It

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init  # Creates the database
npm run start:dev
```
Runs on: `http://localhost:3000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs on: `http://localhost:3001` 

## ✅ Features Implemented
I managed to complete all mandatory requirements and several bonus features:
- [x] **User Auth**: Secure Registration & Login with JWT.
- [x] **Core Actions**: Create Tweets, Like, and Retweet.
- [x] **Social**: Follow/Unfollow other users.
- [x] **Profiles**: View user stats (Followers/Following) and their tweets.


## 💡 What I Learned
- **Authentication**: Implementing JWT Guard from scratch was a good challenge. It gave me a better understanding of how backend security works.
- **State Management**: I learned the importance of keeping the UI in sync with the backend, especially when handling "Likes" and "Follows" to make the app feel snappy.

Thank you for reviewing my work! I'm eager to learn and improve, so any feedback is welcome.
