import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, X, AlertCircle, Upload, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { productStorage } from "@/utils/productStorage";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Painting");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // Drag and Drop States
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProducts = () => {
    setProducts(productStorage.getProducts());
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener("products-updated", loadProducts);
    return () => window.removeEventListener("products-updated", loadProducts);
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName("");
    setCategory("Painting");
    setPrice(0);
    setStock(1);
    setImage("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80"); // default aesthetic placeholder
    setDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setStock(p.stock);
    setImage(p.image);
    setDescription(p.description || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      productStorage.deleteProduct(id);
      toast.success("Product deleted successfully");
    }
  };

  // Drag Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return toast.error("Only image files are allowed");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        toast.success("Image loaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        name,
        slug,
        category,
        price,
        stock,
        inStock: stock > 0,
        image,
        description,
      };
      productStorage.updateProduct(updatedProduct);
      toast.success("Product updated successfully");
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name,
        slug,
        category,
        price,
        featured: false,
        bestseller: false,
        inStock: stock > 0,
        stock,
        rating: 4.8,
        reviews: 0,
        image,
        images: [image],
        shortDescription: `Handcrafted ${category.toLowerCase()} from Soul Studio.`,
        description,
        artist: "Soul Studio",
        medium: category === "Painting" ? "Acrylic on Canvas" : "Composite",
        dimensions: '24" x 36"',
        year: 2026,
        specifications: [
          { label: "Finish", value: "Premium" },
          { label: "Certificate", value: "Included" }
        ],
        features: ["Handcrafted", "Signed by artist"],
        reviewList: []
      };
      productStorage.createProduct(newProduct);
      toast.success("Product created successfully");
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-4xl">Products</h1>
          <p className="text-white/40 mt-1">Manage, edit, or append to your shop inventory.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-full bg-[#C58A5C] px-5 py-2.5 text-black font-semibold hover:bg-[#b07850] transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product List Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
              <th className="p-5 font-semibold">Product</th>
              <th className="p-5 font-semibold">Category</th>
              <th className="p-5 font-semibold">Price</th>
              <th className="p-5 font-semibold">Stock</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="p-5 flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                  <div>
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-xs text-white/40">slug: {p.slug}</p>
                  </div>
                </td>
                <td className="p-5 text-white/70">{p.category}</td>
                <td className="p-5 font-semibold text-[#C58A5C]">₹ {p.price.toLocaleString("en-IN")}</td>
                <td className="p-5">
                  {p.stock > 0 ? (
                    <span className="text-green-400 text-sm font-medium">{p.stock} in stock</span>
                  ) : (
                    <span className="text-red-400 text-sm font-medium flex items-center gap-1">
                      <AlertCircle size={14} /> Out of stock
                    </span>
                  )}
                </td>
                <td className="p-5 text-right space-x-3">
                  <button
                    onClick={() => openEditModal(p)}
                    className="inline-flex p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="inline-flex p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Create/Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-serif text-2xl text-white">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors"
                  placeholder="e.g. Clay Essence"
                />
              </div>

              {/* Drag & Drop Image Zone */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Product Image</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`h-40 rounded-xl border border-dashed flex flex-col items-center justify-center cursor-pointer p-4 transition-all ${
                    dragActive
                      ? "border-[#C58A5C] bg-[#C58A5C]/10"
                      : "border-white/20 bg-black/30 hover:border-white/40"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {image ? (
                    <div className="flex items-center gap-4 w-full">
                      <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/40 truncate">Image loaded successfully</p>
                        <p className="text-xs text-[#C58A5C] hover:underline mt-1">Click to replace</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-white/40 mb-2" size={28} />
                      <p className="text-sm font-medium">Drag & drop image here or click to browse</p>
                      <p className="text-xs text-white/40 mt-1">Supports PNG, JPG, JPEG, WEBP</p>
                    </>
                  )}
                </div>
              </div>

              {/* Alternative: Image URL Input */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 flex items-center gap-1.5">
                  <LinkIcon size={12} /> Or Paste Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors"
                  >
                    <option value="Painting">Painting</option>
                    <option value="Sculpture">Sculpture</option>
                    <option value="Ceramic">Ceramic</option>
                    <option value="Resin Art">Resin Art</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Art Kits">Art Kits</option>
                    <option value="Art Materials">Art Materials</option>
                    <option value="Monthly Snail Mail Club">Monthly Snail Mail Club</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Price (INR)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Stock Level</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-[#C58A5C] transition-colors resize-none"
                  placeholder="Provide rich history or details about the product..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-12 rounded-full border border-white/20 text-white hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-full bg-[#C58A5C] text-black font-semibold hover:bg-[#b07850] transition"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
