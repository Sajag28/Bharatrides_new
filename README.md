
# Bharatrides 🚗

**Bharatrides** is a full-stack vehicle commerce and inspection platform for buying, selling, and recommending new or used cars. The system includes both a user-facing frontend and a robust backend that powers car listings, inspection bookings, and an ML-based car recommendation engine.

---

## 🌐 Live Stack Overview

- **Frontend**: Next.js + Material UI + Vanta.js for animated UI
- **Auth**: Firebase Authentication
- **Backend**: Django + Django ORM (PostgreSQL or SQLite)
- **Machine Learning**: Linear Regression for new car recommendation
- **Booking System**: Pre-owned car inspection scheduling and management

---

## 🚀 Features

### 🧾 General
- Firebase-powered authentication system
- Smooth, animated frontend using Vanta.js
- Clean UI built with Material UI

### 🚗 Used Cars
- Used car listing with detailed specs
- Pre-owned car inspection booking system
- Option to sell your used car via form submission

### 🚙 New Cars
- Personalized new car recommendation using Linear Regression
- Display of best-fit models based on user preferences

---

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Sajag28/Bharatrides_new.git
cd Bharatrides_new
cd frontend
npm install
npm run dev
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver


```
🧠 ML Integration

Uses Linear Regression to recommend cars based on budget and preferences.
Future scope includes more advanced ML models for better recommendations.
🔐 Authentication

Firebase Authentication handles user login/signup securely.
Protected routes are managed on the frontend with token checks.
### 👥 Contributors

- Sajag Agrawal–Integration of Frontend + Backend + Django Models + Inspection Booking + Data Structuring
- Manul Rastogi–Machine Learning Models + Data Structuring
- Asad Aziz–Frontend + UI/UX Design
🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

📄 License

This project is licensed under the MIT License.

