import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

interface MockOrder {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  items: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<MockOrder[]>([
    { id: "ORD-1234", customer: "John Doe", email: "john@example.com", total: 18500, status: "Processing", date: "2026-07-18", items: "Golden Horizon (1)" },
    { id: "ORD-1235", customer: "Jane Smith", email: "jane@example.com", total: 7800, status: "Shipped", date: "2026-07-17", items: "Clay Essence (1)" },
    { id: "ORD-1236", customer: "Michael Brown", email: "michael@example.com", total: 26500, status: "Delivered", date: "2026-07-15", items: "Silent Form (1)" }
  ]);

  const handleStatusChange = (id: string, newStatus: MockOrder["status"]) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl">Orders</h1>
        <p className="text-white/40 mt-1">Manage and track customer purchases.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
              <th className="p-5 font-semibold">Order ID</th>
              <th className="p-5 font-semibold">Customer</th>
              <th className="p-5 font-semibold">Items</th>
              <th className="p-5 font-semibold">Total</th>
              <th className="p-5 font-semibold">Date</th>
              <th className="p-5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-white/5 transition-colors">
                <td className="p-5 font-semibold text-[#C58A5C] flex items-center gap-1.5">
                  {o.id} <ShieldCheck size={14} className="text-[#C58A5C]" />
                </td>
                <td className="p-5">
                  <p className="font-medium text-white">{o.customer}</p>
                  <p className="text-xs text-white/40">{o.email}</p>
                </td>
                <td className="p-5 text-white/70">{o.items}</td>
                <td className="p-5 font-semibold text-white">₹ {o.total.toLocaleString("en-IN")}</td>
                <td className="p-5 text-white/50">{o.date}</td>
                <td className="p-5">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value as MockOrder["status"])}
                    className={`rounded-full px-3 py-1 text-xs font-semibold bg-black/40 text-white outline-none border border-white/10 focus:border-[#C58A5C] transition-colors cursor-pointer ${
                      o.status === "Delivered" ? "border-green-500/50 text-green-400" :
                      o.status === "Processing" ? "border-yellow-500/50 text-yellow-400" :
                      o.status === "Shipped" ? "border-blue-500/50 text-blue-400" : "border-red-500/50 text-red-400"
                    }`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
