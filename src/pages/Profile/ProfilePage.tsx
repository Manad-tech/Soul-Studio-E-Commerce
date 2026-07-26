import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, LogOut, Package, MapPin, User, Settings, ShieldAlert, Plus, Truck, Calendar, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/common/Container";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { useAuth } from "@/features/auth/hooks/useAuth";

type TabType = "info" | "orders" | "addresses" | "settings";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: number;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { data: response, isLoading, error } = useProfile();
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D]">
        <Loader2 className="animate-spin text-[#C58A5C]" size={40} />
      </div>
    );
  }

  if (error || !response?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Failed to load profile.</h2>
          <button onClick={logout} className="text-[#C58A5C] hover:underline">Log Out</button>
        </div>
      </div>
    );
  }

  const profile = response.data;

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings updated successfully (Mocked)");
  };

  // Stepper calculations based on order status
  const getStatusStepIndex = (status: Order["status"]) => {
    switch (status) {
      case "Processing": return 1;
      case "Shipped": return 2;
      case "Delivered": return 3;
      default: return 0;
    }
  };

  const trackingSteps = [
    { label: "Order Placed", desc: "Masterpiece transaction authenticated." },
    { label: "Artisan Verification", desc: "Condition inspection & certificate packaging." },
    { label: "Insured Transit", desc: "Dispatched in reinforced custom crate." },
    { label: "Delivered", desc: "Masterpiece dropped off at residence." }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-20 text-white">
      <Container>
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-5xl">My Account</h1>
            <p className="text-white/40 mt-2">Welcome back, {profile.name} ({user?.role})</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 transition hover:bg-white/5"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <SidebarLink 
              icon={<User size={18} />} 
              label="Personal Info" 
              active={activeTab === "info"} 
              onClick={() => {
                setActiveTab("info");
                setSelectedTrackOrder(null);
              }} 
            />
            <SidebarLink 
              icon={<Package size={18} />} 
              label="Order History" 
              active={activeTab === "orders"} 
              onClick={() => {
                setActiveTab("orders");
                setSelectedTrackOrder(null);
              }} 
            />
            <SidebarLink 
              icon={<MapPin size={18} />} 
              label="Addresses" 
              active={activeTab === "addresses"} 
              onClick={() => {
                setActiveTab("addresses");
                setSelectedTrackOrder(null);
              }} 
            />
            <SidebarLink 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={activeTab === "settings"} 
              onClick={() => {
                setActiveTab("settings");
                setSelectedTrackOrder(null);
              }} 
            />
            
            {user?.role === "admin" && (
              <Link 
                to="/admin" 
                className="mt-8 flex w-full items-center gap-3 rounded-lg border border-[#C58A5C] text-[#C58A5C] px-4 py-3 transition-all hover:bg-[#C58A5C] hover:text-black font-semibold"
              >
                <ShieldAlert size={18} /> Admin Dashboard
              </Link>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "info" && (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 space-y-6">
                <h2 className="font-serif text-2xl text-[#C58A5C]">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Name</p>
                    <p className="text-lg text-white font-medium">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email Address</p>
                    <p className="text-lg text-white font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Phone Number</p>
                    <p className="text-lg text-white font-medium">{profile.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Account Role</p>
                    <p className="text-lg text-[#C58A5C] capitalize font-medium">{user?.role || "Customer"}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && !selectedTrackOrder && (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-8">
                <h2 className="font-serif text-2xl text-[#C58A5C] mb-2">Order History</h2>
                <p className="text-xs text-white/40 mb-6">Click on any order to track its logistics status.</p>
                
                {profile.orders.length === 0 ? (
                  <p className="text-white/60">No orders placed yet.</p>
                ) : (
                  <div className="space-y-4">
                    {profile.orders.map((order) => (
                      <button 
                        key={order.id} 
                        onClick={() => setSelectedTrackOrder(order)}
                        className="w-full text-left flex flex-wrap items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 hover:border-[#C58A5C]/40 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-lg text-white">{order.id}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              order.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                              order.status === "Cancelled" ? "bg-red-500/20 text-red-400" : "bg-[#C58A5C]/20 text-[#C58A5C]"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-white/40">{order.date} • {order.items} items</p>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <p className="font-bold text-[#C58A5C] text-lg">₹ {order.total.toLocaleString("en-IN")}</p>
                            <p className="text-[10px] text-[#C58A5C] font-semibold tracking-wider uppercase mt-1 flex items-center gap-1">
                              Track Ship <ChevronRight size={10} />
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Shipment Tracker Details Subview */}
            {activeTab === "orders" && selectedTrackOrder && (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <button 
                      onClick={() => setSelectedTrackOrder(null)}
                      className="text-xs text-white/50 hover:text-white transition"
                    >
                      ← Back to History
                    </button>
                    <h2 className="font-serif text-2xl mt-1">Track Order: {selectedTrackOrder.id}</h2>
                  </div>
                  <span className="text-xs text-white/40">Placed: {selectedTrackOrder.date}</span>
                </div>

                {/* Courier info metadata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                  <div>
                    <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Courier Carrier</p>
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Truck size={14} className="text-[#C58A5C]" /> Delhivery Fine-Art Express
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">AWB Tracking Number</p>
                    <p className="font-semibold text-white">AWB-883719273</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Estimated Arrival</p>
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#C58A5C]" /> 3 - 5 Business Days
                    </p>
                  </div>
                </div>

                {/* Vertical Stepper Timeline */}
                <div className="space-y-8 pl-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {selectedTrackOrder.status === "Cancelled" ? (
                    <div className="flex gap-4 items-start relative z-10">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500 text-red-400 flex items-center justify-center font-bold text-xs shrink-0">
                        !
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-400">Order Cancelled</h4>
                        <p className="text-xs text-white/50">This order transaction was cancelled and refunded.</p>
                      </div>
                    </div>
                  ) : (
                    trackingSteps.map((step, idx) => {
                      const activeIndex = getStatusStepIndex(selectedTrackOrder.status);
                      const isCompleted = idx <= activeIndex;
                      const isActive = idx === activeIndex;

                      return (
                        <div key={idx} className="flex gap-4 items-start relative z-10">
                          {/* Stepper Circle */}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 border transition-all ${
                            isCompleted 
                              ? "bg-[#C58A5C] border-[#C58A5C] text-black" 
                              : "bg-[#111111] border-white/20 text-white/30"
                          } ${isActive ? "ring-4 ring-[#C58A5C]/20" : ""}`}>
                            {isCompleted ? <Check size={12} strokeWidth={3} /> : idx + 1}
                          </div>
                          <div>
                            <h4 className={`font-semibold text-sm ${isCompleted ? "text-white" : "text-white/30"}`}>
                              {step.label}
                            </h4>
                            <p className={`text-xs ${isCompleted ? "text-white/60" : "text-white/20"}`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-2xl text-[#C58A5C]">Addresses</h2>
                  <button 
                    onClick={() => toast.info("Add Address functionality is mocked.")}
                    className="flex items-center gap-2 rounded-full border border-[#C58A5C]/40 px-4 py-1.5 text-sm text-[#C58A5C] hover:bg-[#C58A5C]/10 transition-colors"
                  >
                    <Plus size={16} /> Add New
                  </button>
                </div>
                
                {profile.addresses.length === 0 ? (
                  <p className="text-white/60">No addresses saved yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.addresses.map((addr) => (
                      <div key={addr.id} className="rounded-xl border border-white/5 bg-white/5 p-5 relative">
                        <span className="absolute top-4 right-4 bg-[#C58A5C]/20 text-[#C58A5C] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                          {addr.type}
                        </span>
                        <p className="font-semibold text-white/80 mb-2">{addr.street}</p>
                        <p className="text-sm text-white/60">{addr.city}, {addr.zipCode}</p>
                        <p className="text-sm text-white/60">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-8">
                <h2 className="font-serif text-2xl text-[#C58A5C] mb-6">Account Settings</h2>
                <form onSubmit={handleUpdateSettings} className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={profile.name}
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 outline-none focus:border-[#C58A5C] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      defaultValue={profile.phone || ""}
                      placeholder="Enter phone number"
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 outline-none focus:border-[#C58A5C] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Change Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 outline-none focus:border-[#C58A5C] transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="rounded-full bg-[#C58A5C] px-8 py-3 text-black font-semibold hover:bg-[#b07850] transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarLink({ icon, label, active = false, onClick }: SidebarLinkProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
        active 
          ? "bg-[#C58A5C] text-black font-semibold shadow-lg shadow-[#C58A5C]/20" 
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon} {label}
    </button>
  );
}
