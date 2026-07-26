import { Loader2 } from "lucide-react";
import { useAdminStats } from "@/features/admin/hooks/useAdmin";

export default function DashboardPage() {
  const { data: response, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-[#C58A5C]" size={40} />
      </div>
    );
  }

  if (error || !response?.data) {
    return <div className="text-red-400">Failed to load admin stats.</div>;
  }

  const stats = response.data;

  return (
    <div>
      <h1 className="font-serif text-4xl mb-8">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Revenue" value={`₹ ${stats.totalRevenue.toLocaleString("en-IN")}`} />
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-[#111111] p-6">
        <h2 className="font-serif text-2xl mb-6">Recent Activity</h2>
        <p className="text-white/60">The backend developer can integrate charts and real-time feeds here by expanding the AdminRepository.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
      <h3 className="text-white/60 text-sm uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
