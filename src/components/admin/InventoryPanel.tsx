"use client";

import { useState, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X,
  MapPin,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Database,
  Cloud
} from "lucide-react";
import toast from "react-hot-toast";
import { useProductStore, Product } from "@/store/useProductStore";
import Image from "next/image";

export default function InventoryPanel() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Fresh Fruits",
    price: "",
    origin: "",
    description: "",
    image: "",
    stock: "100"
  });

  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Fresh Fruits",
      price: "",
      origin: "",
      description: "",
      image: "",
      stock: "100"
    });
    setImageUrlInput("");
    setShowModal(true);
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      origin: p.origin,
      description: p.description,
      image: p.image,
      stock: p.stock.toString()
    });
    // Check if the current image is a URL or a Base64/Relative path
    setImageUrlInput(p.image.startsWith('http') ? p.image : "");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error("Files must be under 5MB.");
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        setImageUrlInput(""); // Clear URL input when a file is uploaded to prevent ambiguity
        toast.success("Binary asset captured.");
      };
      reader.readAsDataURL(file);
    }
  };

  // Logic to determine which image to display/save
  const currentDisplayImage = imageUrlInput.startsWith('http') ? imageUrlInput : formData.image;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDisplayImage) {
       return toast.error("Catalogue entry requires a visual asset (Upload or URL).");
    }

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `p-${Date.now()}`,
      slug: (formData.name.toLowerCase().replace(/\s+/g, '-')),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      origin: formData.origin,
      description: formData.description,
      image: currentDisplayImage,
      stock: parseInt(formData.stock),
      features: editingProduct ? editingProduct.features : ["Premium Quality", "System Verified"]
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success("Consignment updated in master repository.");
    } else {
      addProduct(productData);
      toast.success("Product successfully committed to database.");
    }
    setShowModal(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
           <h2 className="text-2xl font-display font-black text-navy border-l-4 border-primary pl-4 uppercase tracking-tight">Active Node <span className="text-primary italic">Inventory</span></h2>
           <div className="flex items-center gap-2 ml-4">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-[9px] font-display font-black text-slate/40 uppercase tracking-widest flex items-center gap-1"><Database size={10}/> Persistence Layer Active (SQL-Sync)</p>
           </div>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
           <div className="h-12 bg-white border border-gray-100 rounded-xl px-4 flex items-center gap-3 shadow-sm flex-1">
              <Search size={16} className="text-slate/30" />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search global repository..." 
                className="bg-transparent text-xs font-body outline-none w-full text-navy placeholder:text-slate/20 font-medium" 
              />
           </div>
           <button 
             onClick={handleOpenAdd}
             className="h-12 px-6 bg-primary text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-primary/20"
           >
             <Plus size={16} /> New Asset
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
           <h3 className="font-display font-black text-sm text-navy uppercase tracking-[0.15em]">Distribution Master</h3>
           <div className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest">{products.length} Items Indexed</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30 pl-10">Consignment Info</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Category</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Landed Price</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">Fleet Stock</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate/30 text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6 pl-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-off-white rounded-xl relative shrink-0 overflow-hidden border border-gray-100 p-1">
                        {product.image ? (
                           <Image src={product.image} alt={product.name} fill className="object-contain" />
                        ) : (
                           <PackageIcon size={20} className="text-slate/20 m-auto" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-display font-black text-[13px] text-navy group-hover:text-primary transition-all">{product.name}</div>
                        <div className="flex items-center gap-1.5 text-[9px] font-display font-bold text-slate/30 uppercase tracking-widest">
                          <MapPin size={10} /> {product.origin}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-navy text-accent-gold rounded-lg text-[9px] font-display font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="font-display font-black text-[13px] text-navy">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? "bg-success" : "bg-error animate-pulse"}`} />
                      <span className={`text-[10px] font-display font-bold uppercase tracking-widest ${product.stock > 10 ? "text-success" : "text-error"}`}>
                        {product.stock} Units
                      </span>
                    </div>
                  </td>
                  <td className="p-6 pr-10 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      <button onClick={() => handleEdit(product)} title="Modify Registry" className="w-9 h-9 border border-gray-soft rounded-xl flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all"><Edit3 size={14}/></button>
                      <button onClick={() => deleteProduct(product.id)} title="Purge Asset" className="w-9 h-9 border border-gray-soft rounded-xl flex items-center justify-center text-error hover:bg-error hover:text-white transition-all"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-navy/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <div className="space-y-1">
                     <h2 className="text-3xl font-display font-black text-navy uppercase tracking-tight">{editingProduct ? "Modify" : "Initialize"} <span className="text-primary italic">Consignment</span></h2>
                     <p className="text-[10px] font-display font-bold text-slate/40 uppercase tracking-widest">Syncing to secure distribution database.</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-off-white rounded-full flex items-center justify-center text-slate/20 hover:text-navy transition-all"><X/></button>
               </div>

               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {/* Visual Asset Configuration */}
                  <div className="space-y-6">
                    <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1 flex items-center gap-2 text-primary">
                       <Cloud size={12}/> Visual Metadata
                    </label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square bg-off-white rounded-3xl border-4 border-dashed border-gray-soft flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all overflow-hidden group relative"
                    >
                       {currentDisplayImage ? (
                         <>
                            <Image src={currentDisplayImage} alt="asset-preview" fill className="object-contain p-4 transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                               <Upload className="text-white" size={32} />
                            </div>
                         </>
                       ) : (
                         <>
                            <ImageIcon size={48} className="text-slate/10" />
                            <div className="text-center space-y-1">
                               <p className="text-[10px] font-display font-black text-navy uppercase tracking-widest">Capture Asset</p>
                               <p className="text-[9px] font-body text-slate opacity-40">Local or Legacy file</p>
                            </div>
                         </>
                       )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      className="hidden" 
                      accept="image/*"
                    />

                    {/* Remote URI Entry */}
                    <div className="space-y-2 p-5 bg-navy/[0.03] rounded-2xl border border-gray-soft/50">
                       <label className="text-[9px] font-display font-black text-slate uppercase tracking-widest ml-1 flex items-center gap-2">
                          <LinkIcon size={12} className="text-primary"/> External Image URI 
                       </label>
                       <input 
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          placeholder="https://cdn.example.com/asset.jpg"
                          className="w-full h-10 bg-white border border-gray-soft rounded-xl px-4 text-[11px] font-body outline-none focus:border-primary transition-all shadow-sm"
                       />
                       <p className="text-[8px] font-body text-slate opacity-40 lowercase ml-1 leading-relaxed">System will store the URI if provided, enabling cloud-base sourcing.</p>
                    </div>
                  </div>

                  {/* Core Attribute Configuration */}
                  <div className="md:col-span-2 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1">Asset Nomenclature</label>
                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 outline-none focus:border-primary transition-all font-body text-sm font-bold" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1">Category Code</label>
                         <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 outline-none focus:border-primary transition-all font-display font-bold text-[11px] uppercase tracking-widest appearance-none">
                            <option>Fresh Fruits</option>
                            <option>Grains & Dals</option>
                            <option>Flours</option>
                            <option>Spices</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1">Geographic Provenance</label>
                        <input required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 outline-none focus:border-primary transition-all font-body text-sm" placeholder="e.g. Ontario, Canada" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1">Landed Cost ($)</label>
                          <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 outline-none focus:border-primary transition-all font-body text-sm font-bold" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1">Initial Quota</label>
                          <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full h-14 bg-off-white border border-gray-soft rounded-2xl px-6 outline-none focus:border-primary transition-all font-body text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-display font-black text-slate/40 uppercase tracking-widest ml-1 text-primary">Product Intelligence Description</label>
                      <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full h-24 bg-off-white border border-gray-soft rounded-2xl p-6 outline-none focus:border-primary transition-all font-body text-sm resize-none leading-relaxed" />
                    </div>

                    <button type="submit" className="w-full h-16 bg-navy text-white rounded-2xl font-display font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black transition-all shadow-xl shadow-navy/10 active:scale-95 flex items-center justify-center gap-3">
                      <CheckCircle2 size={18} className="text-primary"/> {editingProduct ? "Update Global Ledger" : "Commit Consignment to DB"}
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PackageIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
