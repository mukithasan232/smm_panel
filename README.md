# 🚀 SMMGen - Premium SMM Reseller Panel

SMMGen is a high-performance, production-ready SMM (Social Media Marketing) reseller platform. Built with a modern SaaS aesthetic, it provides a seamless experience for both users and administrators to manage social growth services.

**Live Demo:** [https://www.smmgrows.com](https://www.smmgrows.com)

---

## ✨ Key Features

### 👤 User Interface
- **Elite Dashboard**: Premium glassmorphism UI with real-time stats (Balance, Total Spend, Order Count).
- **Service Catalogue**: Instant access to SMMGen API services with automated category filtering.
- **Smart Order System**: 1-click order placement with automatic charge calculation in BDT.
- **Real-Time Sync**: Manual "Sync Status" button to fetch live order progress from the provider.
- **Wallet System**: Support for bKash, Nagad, and Rocket with automated invoice generation (PDF/Print).

### 🛠️ Administration
- **Global Financial Control**: Built-in 30% profit margin logic applied automatically to all API services.
- **Payment Verification**: Dedicated Super-Admin panel for approving/rejecting funding requests.
- **Provider Management**: Real-time monitoring of SMMGen API wallet balance (USD/BDT).
- **Security**: Specific email-gated authentication for high-privilege financial actions.

---

## 💻 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Deployment**: Vercel (Frontend), Render (Backend/Database).

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/mukithasan232/smm_panel.git
cd smm_panel
```

### 2. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
SMMGEN_API_KEY=your_smmgen_key
SMMGEN_API_URL=https://smmgen.com/api/v2
```

### 4. Run Development Server
```bash
# Root directory (Vite)
npm run dev

# Server directory
cd server
npm run dev
```

---

## 📈 Business Logic
- **Currency**: The platform operates in BDT (Bangladeshi Taka).
- **Exchange Rate**: Hardcoded at **1 USD = 120 BDT**.
- **Profit Margin**: Fixed at **30% markup** from the provider price.

---

## 🛡️ License & Support
Distributed under the MIT License. For support, contact your Administrator via the Support Center in the dashboard.

---
*Built for excellence by the SMM Elite BD Team.*
