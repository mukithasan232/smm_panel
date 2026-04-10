import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Dashboard Views
import NewOrder from './views/NewOrder';
import OrderHistory from './views/OrderHistory';
import AddFunds from './views/AddFunds';
import Support from './views/Support';
import Services from './views/Services';

// Admin Views
import AdminOverview from './views/admin/AdminOverview';
import ManageUsers from './views/admin/ManageUsers';
import AdminPayments from './views/admin/AdminPayments';
import OrderHistoryView from './views/OrderHistory'; // Reusing for now or create a dedicated one

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />

      {/* Protected Dashboard Routes (UI Only for now) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<NewOrder />} />
        <Route path="mass-order" element={<NewOrder />} /> {/* Reusing NewOrder for now */}
        <Route path="orders" element={<OrderHistory />} />
        <Route path="services" element={<Services />} />
        <Route path="add-funds" element={<AddFunds />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Admin Routes (UI Only for now) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="orders" element={<OrderHistoryView />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
