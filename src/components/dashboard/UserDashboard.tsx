"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  MapPin, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  User,
  ShieldCheck,
  Plus,
  X,
  Lock,
  Eye,
  Trash2,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "settings">("orders");
  const { user, isAuthenticated, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const router = useRouter();

  // Local State for interactive features
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", street: "123 Surrey Central Mall", city: "Surrey", prov: "BC", zip: "V3T 5X5", default: true },
    { id: 2, label: "Office", street: "456 Georgia St.", city: "Vancouver", prov: "BC", zip: "V6B 1P1", default: false },
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", street: "", city: "", prov: "", zip: "" });
  const [showToast, setShowToast] = useState<string | null>(null);

  // Settings State
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  // Guard Clause for User Access
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.street) return;
    setAddresses([...addresses, { ...newAddress, id: Date.now(), default: false }]);
    setShowAddressModal(false);
    setNewAddress({ label: "", street: "", city: "", prov: "", zip: "" });
    setShowToast("New address added successfully!");
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    setShowToast("Address removed.");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setShowToast("Passwords do not match!");
      return;
    }
    // Simulate API call
    setShowToast("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Sidebar Nav */}
        <aside className="lg:w-64 space-y-6 shrink-0">
           <div className="bg-white border border-gray-soft rounded-[2rem] p-8 shadow-sm space-y-8 select-none">
              <div className="flex flex-col items-center text-center space-y-3">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary relative group">
                    <User size={36} />
                    <button onClick={() => setActiveTab("settings")} className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-soft rounded-full flex items-center justify-center text-navy shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Settings size={14}/></button>
                 </div>
                 <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-navy">{user?.first_name} {user?.last_name}</h3>
                    <div className="px-2 py-0.5 bg-success/10 text-success text-[9px] font-display font-bold uppercase tracking-widest rounded-full">Premium Member</div>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 {[
                   { id: "orders", label: "Order History", icon: Package },
                   { id: "addresses", label: "Address Book", icon: MapPin },
                   { id: "settings", label: "Account Settings", icon: Settings },
                 ].map(tab => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as "orders" | "addresses" | "settings")}
                     className={`flex items-center gap-4 px-5 py-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-navy text-white shadow-lg shadow-navy/20" : "text-slate/40 hover:text-navy hover:bg-off-white"}`}
                   >
                     <tab.icon size={16} />
                     {tab.label}
                   </button>
                 ))}
                 <button 
                    onClick={() => logout()}
                    className="flex items-center gap-4 px-5 py-4 text-error font-display font-bold text-xs uppercase tracking-widest mt-4 opacity-60 hover:opacity-100 transition-opacity"
                 >
                    <LogOut size={16} /> Logout
                 </button>
              </div>
           </div>

           <div className="bg-primary rounded-[2rem] p-8 text-white space-y-4 shadow-xl shadow-primary/20 group cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-slow" />
              <h5 className="font-display font-bold text-base leading-tight">Wholesale?</h5>
              <p className="text-xs font-body text-white/70 leading-relaxed">Upgrade your account for B2B pricing and bulk logistics.</p>
              <Link href="/wholesale" className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest hover:underline pt-2">Explore Portal <ArrowRight size={14}/></Link>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-[600px]">
           <AnimatePresence mode="wait">
              {activeTab === "orders" && (
                <motion.div 
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                   <div className="flex items-end justify-between border-b border-gray-soft pb-8">
                      <div className="space-y-1">
                         <h2 className="text-h2 text-navy leading-none">Your <span className="text-primary italic">Shipments</span></h2>
                         <p className="text-slate font-body text-sm opacity-60">Monitor and track your premium seasonal imports.</p>
                      </div>
                      <Link href="/products" className="hidden sm:flex items-center gap-2 px-6 py-3 bg-off-white border border-gray-soft rounded-xl text-navy font-display font-bold text-[10px] uppercase tracking-widest hover:bg-gray-soft transition-all">Quick Order</Link>
                   </div>

                   <div className="space-y-6">
                      {orders.length > 0 ? orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-soft rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg transition-all group overflow-hidden relative">
                           <div className="flex items-center gap-6">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${order.status === "delivered" ? "bg-success/10 text-success" : "bg-primary/10 text-primary animate-pulse"}`}>
                                 {order.status === "delivered" ? <CheckCircle2 size={24}/> : <Clock size={24}/>}
                              </div>
                              <div className="space-y-1">
                                 <div className="font-display font-bold text-lg text-navy flex items-center gap-2">{order.id} <span className="text-[10px] text-slate/40 tracking-widest uppercase ml-2">{order.date}</span></div>
                                 <div className="flex items-center gap-4 text-xs font-body text-slate">
                                    <span className="flex items-center gap-1.5"><ShoppingBag size={14}/> {order.items.length} items</span>
                                    <span className="font-display font-bold text-navy">${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</span>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-4 w-full md:w-auto">
                              <button onClick={() => setShowToast("Downloading Invoice...")} className="flex-1 md:flex-none px-6 py-3 border border-gray-soft rounded-xl text-navy font-display font-bold text-[10px] uppercase tracking-widest hover:bg-off-white flex items-center justify-center gap-2 transition-all active:scale-95">
                                 <FileText size={14} /> Invoice
                              </button>
                              <Link href={`/track/${order.id.replace('#', '')}`} className="flex-1 md:flex-none px-8 py-3 bg-navy text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2 group/btn active:scale-95">
                                 Track <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                           </div>
                        </div>
                      )) : (
                        <div className="py-20 text-center space-y-6 bg-off-white rounded-[2.5rem] border border-dashed border-gray-soft">
                           <ShoppingBag size={48} className="mx-auto text-slate/20" />
                           <div className="space-y-2">
                             <p className="font-display font-bold text-navy opacity-60">No orders found yet</p>
                             <p className="text-slate font-body text-sm opacity-40">Start shopping to see your history here.</p>
                           </div>
                           <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">Begin Selection <ArrowRight size={16}/></Link>
                        </div>
                      )}
                   </div>
                   
                   <div className="bg-off-white rounded-2xl p-6 border border-gray-soft flex items-start gap-4 italic text-xs font-body text-slate opacity-60 leading-relaxed">
                      <ShieldCheck size={18} className="text-primary mt-0.5 shrink-0" />
                      Orders under &apos;In Transit&apos; status maintain verified cold-chain logs which can be viewed via the Batch Traceability portal.
                   </div>
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div 
                  key="addresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                   <div className="flex items-end justify-between border-b border-gray-soft pb-8">
                      <div className="space-y-1">
                         <h2 className="text-h2 text-navy leading-none"><span className="text-primary italic">Saved</span> Locations</h2>
                         <p className="text-slate font-body text-sm opacity-60">Manage your shipping destinations for faster checkout.</p>
                      </div>
                      <button 
                        onClick={() => setShowAddressModal(true)}
                        className="hidden sm:flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-primary/20 active:scale-95"
                      >
                        <Plus size={16}/> New Address
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {addresses.map(addr => (
                        <div key={addr.id} className="bg-white border border-gray-soft rounded-3xl p-8 relative space-y-6 hover:shadow-lg transition-all group overflow-hidden">
                           {addr.default && <div className="absolute top-0 left-0 h-1 w-full bg-primary" />}
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-off-white rounded-xl flex items-center justify-center text-navy shrink-0"><MapPin size={18} /></div>
                                 <span className="font-display font-bold text-lg text-navy">{addr.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {addr.default && <span className="text-[9px] font-display font-bold uppercase tracking-widest bg-success/10 text-success px-2 py-0.5 rounded-full">Default</span>}
                                <button onClick={() => removeAddress(addr.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate/20 hover:text-error hover:bg-error/5 transition-all"><Trash2 size={16}/></button>
                              </div>
                           </div>
                           
                           <div className="space-y-1 text-slate font-body text-sm">
                              <p className="text-navy font-bold opacity-80">{addr.street}</p>
                              <p>{addr.city}, {addr.prov} {addr.zip}</p>
                              <p>Canada</p>
                           </div>

                           <div className="pt-4 flex items-center gap-4 text-[10px] font-display font-bold uppercase tracking-widest border-t border-gray-soft/50">
                              <button className="text-navy hover:text-primary transition-colors">Edit</button>
                              <div className="w-1 h-1 rounded-full bg-gray-soft" />
                              {!addr.default && (
                                <button 
                                  onClick={() => setAddresses(addresses.map(a => ({ ...a, default: a.id === addr.id })))}
                                  className="text-slate/40 hover:text-navy transition-colors"
                                >
                                  Set Default
                                </button>
                              )}
                           </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => setShowAddressModal(true)}
                        className="border-2 border-dashed border-gray-soft rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-slate/40 hover:text-primary hover:border-primary transition-all group"
                      >
                         <div className="w-12 h-12 rounded-full bg-off-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"><Plus size={24}/></div>
                         <span className="font-display font-bold text-[10px] uppercase tracking-widest">Add New Location</span>
                      </button>
                   </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                   <div className="flex items-end justify-between border-b border-gray-soft pb-8">
                      <div className="space-y-1">
                         <h2 className="text-h2 text-navy leading-none">Account <span className="text-primary italic">Settings</span></h2>
                         <p className="text-slate font-body text-sm opacity-60">Control your security and profile preferences.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="space-y-4">
                           <h4 className="font-display font-bold text-navy flex items-center gap-3">Personal Information <Settings size={14} className="text-primary"/></h4>
                           <div className="space-y-4 bg-white border border-gray-soft rounded-2xl p-6">
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1.5">
                                    <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest pl-1">First Name</label>
                                    <input defaultValue={user?.first_name} className="w-full h-12 bg-off-white px-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-body text-sm" />
                                 </div>
                                 <div className="space-y-1.5">
                                    <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest pl-1">Last Name</label>
                                    <input defaultValue={user?.last_name} className="w-full h-12 bg-off-white px-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-body text-sm" />
                                 </div>
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest pl-1">Email Address</label>
                                 <input defaultValue={user?.email} className="w-full h-12 bg-off-white px-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-body text-sm" />
                              </div>
                              <button onClick={() => setShowToast("Profile updated.")} className="w-full h-12 bg-navy text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-all">Save Changes</button>
                           </div>
                        </div>

                        <div className="p-6 bg-off-white rounded-2xl border border-gray-soft space-y-3">
                           <h5 className="font-display font-bold text-[11px] uppercase tracking-[0.2em] text-navy">Member Since</h5>
                           <div className="flex items-center justify-between">
                              <span className="text-xs font-body text-slate">Verified Premium Account</span>
                              <span className="font-display font-bold text-navy">Jan 2026</span>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                         <div className="space-y-4">
                            <h4 className="font-display font-bold text-navy flex items-center gap-3">Security <Lock size={14} className="text-primary"/></h4>
                            <form onSubmit={handlePasswordChange} className="space-y-4 bg-white border border-gray-soft rounded-2xl p-6">
                               <div className="space-y-1.5">
                                  <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest pl-1">Current Password</label>
                                  <div className="relative">
                                    <input 
                                      type="password"
                                      value={passwords.current}
                                      onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                      className="w-full h-12 bg-off-white px-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-body text-sm" 
                                    />
                                    <Eye size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate/20" />
                                  </div>
                               </div>
                               <div className="space-y-1.5">
                                  <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest pl-1">New Password</label>
                                  <input 
                                    type="password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                    className="w-full h-12 bg-off-white px-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-body text-sm" 
                                  />
                               </div>
                               <div className="space-y-1.5">
                                  <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest pl-1">Confirm Password</label>
                                  <input 
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                    className="w-full h-12 bg-off-white px-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-body text-sm" 
                                  />
                               </div>
                               <button type="submit" className="w-full h-12 bg-primary text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-primary/20">Update Password</button>
                            </form>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </main>
      </div>

      {/* Modals & Toasts */}
      <AnimatePresence>
        {showAddressModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAddressModal(false)}
               className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 space-y-8"
             >
                <button onClick={() => setShowAddressModal(false)} className="absolute top-8 right-8 text-slate/20 hover:text-navy transition-colors"><X/></button>
                <div className="space-y-2">
                   <h3 className="text-3xl font-display font-bold text-navy">Add <span className="text-primary italic">Address</span></h3>
                   <p className="text-slate font-body text-sm opacity-60">Store a new shipping destination for your next mango box.</p>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest ml-1">Label (e.g. Home, Cabin)</label>
                      <input 
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                        className="w-full h-14 bg-off-white rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body" 
                      />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest ml-1">Street Address</label>
                      <input 
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                        className="w-full h-14 bg-off-white rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest ml-1">City</label>
                        <input 
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                          className="w-full h-14 bg-off-white rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest ml-1">Province</label>
                        <input 
                          value={newAddress.prov}
                          onChange={(e) => setNewAddress({...newAddress, prov: e.target.value})}
                          className="w-full h-14 bg-off-white rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body" 
                        />
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button onClick={() => setShowAddressModal(false)} className="flex-1 h-14 border border-gray-soft rounded-2xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-off-white">Cancel</button>
                   <button onClick={handleAddAddress} className="flex-2 h-14 bg-navy text-white rounded-2xl font-display font-bold text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-navy/20 active:scale-95 transition-all">Save Location</button>
                </div>
             </motion.div>
          </div>
        )}

        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[200] bg-navy text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-display font-bold text-xs uppercase tracking-widest"
          >
             <CheckCircle2 className="text-primary" size={18} />
             {showToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
