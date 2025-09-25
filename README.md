# 🎶 Tune-Talk

**Tune-Talk** is a demo web application for browsing albums, checking ratings, and reading reviews.  
It’s built with **React**, **Redux Toolkit**, **Tailwind CSS**, and a simple **Node.js** backend using mock data.  

The project is a **case study in state management with Redux**, highlighting how to organize slices for albums, reviews, and ratings.

---

## 🌐 Live Demo & Design

- **Live Site (Vercel):** [Tune-Talk Demo](https://tune-talk-theta.vercel.app)  
- **Figma Design:** [View on Figma](https://www.figma.com/proto/Foq6Sw9lVbLgtVp6LcuCz4/Tune-Talk?page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&t=3dvyw3O6RnKeVjsS-1) 

---

## 🚀 Features

- Browse albums with ratings & reviews  
- Centralized state management with **Redux Toolkit**  
- Responsive, modern UI with **Tailwind CSS**  
- Demo backend with **Node.js** (no real database yet)  
- Clean project structure separating frontend & backend  

---

## 📚 Purpose

This project is a **demo**, not a production-ready app.  
Its main goal is to **practice Redux state management** and demonstrate frontend design.  

Planned improvements:
- Connect to a real database (PostgreSQL / MongoDB)  
- Replace mock data with a real API  
- Authentication & user accounts  
- Advanced review features (edit, delete, likes)  

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS  
- **Backend:** Node.js + Express (mock API)  
- **Tooling:** Vite (or CRA, depending on setup), ESLint, Prettier  

---

## 🧪 Known Issues & TODOs

- **Database separation:** Currently using mock data; backend and frontend need proper DB integration and API endpoints.  
- **UI improvements:** Some pages/components could be refined for better responsiveness and UX.  
- **State management:** Some Redux slices can be further optimized or split for clarity.  
- **Error handling:** Minimal error handling on frontend and backend; needs improvement.  
- **Authentication:** Not implemented yet.  
- **Feature enhancements:** Edit/delete reviews, remove/edit rating without affecting the review, like/dislike reviews, user accounts, and search functionality.

---

## 🔧 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-username/tune-talk.git
cd tune-talk

cd tunetalk-frontend
npm install
npm run dev

cd ../tunetalk-backend
npm install
npm start
