import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Package } from 'lucide-react';

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black font-heading text-slate-900 mb-1">My Orders</h2>
          <p className="text-slate-500 font-medium">Track your recent pharmacy orders and history.</p>
        </div>
      </div>
      
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
        <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No orders yet</h3>
        <p className="text-slate-500">Your medicine and pharmacy orders will appear here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
