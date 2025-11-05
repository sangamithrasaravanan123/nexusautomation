import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Package, Truck, Clock, Plus, Minus, X, Check, 
  CreditCard, DollarSign, FileText, Phone, Mail, MapPin, Filter, Search,
  Star, Shield, Zap, Award, Users, ArrowRight, Building, Calculator
} from 'lucide-react';

// Types
type Product = {
  transaction_id: string;
  transaction_date: string;
  raw_description: string;
  amount: number;
  raw_vendor: string;
  true_category: string;
  currency: string;
  stock_quantity: number;
  image_url: string;
  specifications: string[];
  warranty: string;
  rating: number;
  reviews_count: number;
  min_order_qty: number;
};

type CartItem = Product & {
  quantity: number;
};

type PaymentMethod = 'card' | 'bank_transfer' | 'purchase_order' | 'emi' | 'quote_request';

const ECommercePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Checkout form states
  const [customerInfo, setCustomerInfo] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    gst: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const sampleProducts: Product[] = [
          {
            transaction_id: "PRD001",
            transaction_date: "2024-01-15",
            raw_description: "Precision CNC Machining Center - 5-Axis VMC-850",
            amount: 149999.99,
            raw_vendor: "DMG MORI",
            true_category: "machinery",
            currency: "USD",
            stock_quantity: 2,
            image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            specifications: ["5-Axis Capability", "850mm Travel", "15,000 RPM Spindle", "40-Tool Changer"],
            warranty: "2 Years",
            rating: 4.8,
            reviews_count: 24,
            min_order_qty: 1
          },
          {
            transaction_id: "PRD002",
            transaction_date: "2024-01-16",
            raw_description: "Industrial PLC Automation System - S7-1500 Series",
            amount: 28750.50,
            raw_vendor: "Siemens AG",
            true_category: "automation",
            currency: "USD",
            stock_quantity: 15,
            image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
            specifications: ["CPU 1516F-3", "Failsafe Technology", "Ethernet Interface", "TIA Portal Ready"],
            warranty: "3 Years",
            rating: 4.9,
            reviews_count: 67,
            min_order_qty: 1
          },
          {
            transaction_id: "PRD003",
            transaction_date: "2024-01-17",
            raw_description: "High-Precision CMM Coordinate Measuring Machine",
            amount: 89900.00,
            raw_vendor: "Carl Zeiss",
            true_category: "measurement",
            currency: "USD",
            stock_quantity: 5,
            image_url: "https://images.unsplash.com/photo-1581092335878-9c10c59d29d1?w=400",
            specifications: ["Working Range: 700x1000x600mm", "±1.5µm Accuracy", "CALYPSO Software", "Air Bearing Technology"],
            warranty: "1 Year",
            rating: 4.7,
            reviews_count: 18,
            min_order_qty: 1
          },
          {
            transaction_id: "PRD004",
            transaction_date: "2024-01-18",
            raw_description: "Hydraulic Press Machine - 200 Ton Capacity",
            amount: 65000.00,
            raw_vendor: "Schuler Group",
            true_category: "machinery",
            currency: "USD",
            stock_quantity: 3,
            image_url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
            specifications: ["200 Ton Force", "1200x800mm Bed", "Variable Speed Control", "Safety Light Curtains"],
            warranty: "2 Years",
            rating: 4.6,
            reviews_count: 31,
            min_order_qty: 1
          },
          {
            transaction_id: "PRD005",
            transaction_date: "2024-01-19",
            raw_description: "6-DOF Industrial Robotic Welding System",
            amount: 156800.00,
            raw_vendor: "KUKA Robotics",
            true_category: "automation",
            currency: "USD",
            stock_quantity: 4,
            image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
            specifications: ["6kg Payload", "1611mm Reach", "±0.06mm Repeatability", "KR C4 Controller"],
            warranty: "2 Years",
            rating: 4.9,
            reviews_count: 42,
            min_order_qty: 1
          },
          {
            transaction_id: "PRD006",
            transaction_date: "2024-01-20",
            raw_description: "Quality Control Software Suite - Manufacturing Analytics",
            amount: 19999.99,
            raw_vendor: "Hexagon Manufacturing",
            true_category: "software",
            currency: "USD",
            stock_quantity: 50,
            image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
            specifications: ["Real-time Analytics", "SPC Integration", "Cloud-based", "Multi-site Support"],
            warranty: "1 Year Support",
            rating: 4.5,
            reviews_count: 89,
            min_order_qty: 1
          }
        ];
        
        setProducts(sampleProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.raw_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.raw_vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.true_category === selectedCategory;
    const matchesVendor = selectedVendor === 'All' || product.raw_vendor === selectedVendor;
    
    const price = product.amount;
    const matchesMinPrice = !priceRange.min || price >= parseFloat(priceRange.min);
    const matchesMaxPrice = !priceRange.max || price <= parseFloat(priceRange.max);
    
    return matchesSearch && matchesCategory && matchesVendor && matchesMinPrice && matchesMaxPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.amount - b.amount;
      case 'price_high': return b.amount - a.amount;
      case 'rating': return b.rating - a.rating;
      case 'stock': return b.stock_quantity - a.stock_quantity;
      default: return a.raw_description.localeCompare(b.raw_description);
    }
  });

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.transaction_id === product.transaction_id);
      if (existingItem) {
        return prevCart.map(item =>
          item.transaction_id === product.transaction_id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock_quantity) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: Math.max(quantity, product.min_order_qty) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.transaction_id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const product = products.find(p => p.transaction_id === productId);
    if (quantity < (product?.min_order_qty || 1)) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.transaction_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.amount * item.quantity), 0);
    const gst = subtotal * 0.18; // 18% GST
    return { subtotal, gst, total: subtotal + gst };
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get unique values for filters
  const categories = ['All', ...Array.from(new Set(products.map(p => p.true_category)))];
  const vendors = ['All', ...Array.from(new Set(products.map(p => p.raw_vendor)))];

  // Handle checkout
  const handleCheckout = () => {
    const { total } = getCartTotal();
    
    if (total > 100000) {
      setPaymentMethod('quote_request');
    }
    
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  // Process payment
  const processPayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowCheckoutModal(false);
    setShowSuccessModal(true);
    setCart([]);
  };

  const generateQuote = () => {
    // Generate quote logic
    alert('Quote request sent! Our sales team will contact you within 24 hours.');
    setShowCheckoutModal(false);
    setCart([]);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-slate-700 text-lg font-medium">Loading manufacturing equipment catalog...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-4 py-2 rounded-full text-base font-semibold mb-4">
            <Package className="w-4 h-4" />
            <span>Manufacturing Equipment Store</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Advanced Manufacturing
            <span className="text-slate-700 block">Equipment Catalog</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse and purchase precision machinery, automation systems, and manufacturing equipment with instant pricing and fast delivery
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                <Package className="w-6 h-6 text-slate-600" />
              </div>
            </div>
            <h4 className="text-3xl font-bold text-slate-700 mb-1">{filteredProducts.length}</h4>
            <p className="text-slate-600 font-medium">Equipment Available</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                <Truck className="w-6 h-6 text-slate-600" />
              </div>
            </div>
            <h4 className="text-3xl font-bold text-slate-700 mb-1">Fast</h4>
            <p className="text-slate-600 font-medium">Delivery</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                <Shield className="w-6 h-6 text-slate-600" />
              </div>
            </div>
            <h4 className="text-3xl font-bold text-slate-700 mb-1">2-3 Yr</h4>
            <p className="text-slate-600 font-medium">Warranty</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300 relative">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                <ShoppingCart className="w-6 h-6 text-slate-600" />
              </div>
            </div>
            <h4 className="text-3xl font-bold text-slate-700 mb-1">{getCartItemCount()}</h4>
            <p className="text-slate-600 font-medium">Items in Cart</p>
            
            <button
              onClick={() => setShowCartModal(true)}
              className="absolute top-4 right-4 p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Find Your Equipment</h2>
            <div className="text-sm text-slate-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by equipment name, model, or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/50 transition-all bg-white/70 backdrop-blur-sm"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Manufacturer</label>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Min Price ($)</label>
              <input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Max Price ($)</label>
              <input
                type="number"
                placeholder="999999"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                <option value="name">Name A-Z</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="stock">Stock Availability</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedVendor('All');
                setPriceRange({ min: '', max: '' });
                setSortBy('name');
              }}
              className="px-6 py-2 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product, index) => (
            <div key={product.transaction_id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/50 animate-float" style={{animationDelay: `${index * 0.1}s`}}>
              {/* Product Image */}
              <div className="aspect-video bg-slate-100 rounded-xl mb-4 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.raw_description}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-slate-800 line-clamp-2 text-lg leading-tight">
                    {product.raw_description}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ml-2 ${
                    product.true_category === 'machinery' ? 'bg-slate-100 text-slate-800' :
                    product.true_category === 'automation' ? 'bg-blue-100 text-blue-800' :
                    product.true_category === 'measurement' ? 'bg-green-100 text-green-800' :
                    product.true_category === 'software' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.true_category}
                  </span>
                </div>

                {/* Manufacturer & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">{product.raw_vendor}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    <span className="text-sm text-slate-500">({product.reviews_count})</span>
                  </div>
                </div>

                {/* Key Specifications */}
                <div className="bg-slate-50 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Specifications:</h4>
                  <div className="space-y-1">
                    {product.specifications.slice(0, 3).map((spec, i) => (
                      <div key={i} className="text-xs text-slate-600 flex items-center">
                        <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">
                      ${product.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">
                      {product.stock_quantity > 0 ? (
                        <span className="text-green-600 font-medium">✓ In Stock ({product.stock_quantity})</span>
                      ) : (
                        <span className="text-red-600 font-medium">✗ Out of Stock</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      Min Order: {product.min_order_qty} unit{product.min_order_qty > 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    
                    {product.amount > 50000 && (
                      <button
                        onClick={() => {
                          addToCart(product);
                          setPaymentMethod('quote_request');
                          setShowCartModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-semibold"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Get Quote</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Warranty */}
                <div className="flex items-center justify-between text-sm text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Warranty: {product.warranty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="w-4 h-4" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/50">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No Equipment Found</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We couldn't find any equipment matching your search criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/50">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Shopping Cart ({getCartItemCount()} items)</h2>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[50vh] p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 text-lg">Your cart is empty</p>
                  <p className="text-slate-500">Add some equipment to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.transaction_id} className="bg-slate-50 rounded-xl p-4 flex items-center space-x-4">
                      <img
                        src={item.image_url}
                        alt={item.raw_description}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-1">
                          {item.raw_description}
                        </h3>
                        <p className="text-slate-600 text-sm mb-2">{item.raw_vendor}</p>
                        <p className="text-lg font-bold text-slate-800">${item.amount.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateCartQuantity(item.transaction_id, item.quantity - 1)}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.transaction_id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock_quantity}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg text-slate-800">
                          ${(item.amount * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.transaction_id)}
                          className="text-red-500 hover:text-red-700 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-slate-700">Subtotal:</span>
                    <span className="font-semibold text-slate-800">${getCartTotal().subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">GST (18%):</span>
                    <span className="text-slate-700">${getCartTotal().gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-800 pt-3 border-t">
                    <span>Total:</span>
                    <span>${getCartTotal().total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/50">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Checkout</h2>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[70vh] p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>Company Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name *"
                      value={customerInfo.companyName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                      required
                    />
                    
                    <input
                      type="text"
                      placeholder="Contact Person Name *"
                      value={customerInfo.contactName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                        required
                      />
                      
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                        required
                      />
                    </div>
                    
                    <textarea
                      placeholder="Delivery Address *"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 h-20"
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City *"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                        required
                      />
                      
                      <select
                        value={customerInfo.state}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                      >
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                      </select>
                      
                      <input
                        type="text"
                        placeholder="Pincode *"
                        value={customerInfo.pincode}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, pincode: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                        required
                      />
                    </div>
                    
                    <input
                      type="text"
                      placeholder="GST Number (Optional)"
                      value={customerInfo.gst}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, gst: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Method</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {getCartTotal().total > 100000 ? (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Quote Request (Recommended)</span>
                        </div>
                        <p className="text-blue-700 text-sm">
                          For orders above $100,000, we recommend requesting a quote for better pricing and financing options.
                        </p>
                      </div>
                    ) : null}

                    <div className="grid grid-cols-1 gap-3">
                      <label className="flex items-center space-x-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="text-slate-600"
                        />
                        <CreditCard className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="bank_transfer"
                          checked={paymentMethod === 'bank_transfer'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="text-slate-600"
                        />
                        <DollarSign className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Bank Transfer</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="purchase_order"
                          checked={paymentMethod === 'purchase_order'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="text-slate-600"
                        />
                        <FileText className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Purchase Order</span>
                      </label>
                      
                      {getCartTotal().total > 50000 && (
                        <label className="flex items-center space-x-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            value="emi"
                            checked={paymentMethod === 'emi'}
                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                            className="text-slate-600"
                          />
                          <Calculator className="w-5 h-5 text-slate-600" />
                          <span className="font-medium">EMI (12-36 months)</span>
                        </label>
                      )}
                      
                      <label className="flex items-center space-x-3 p-4 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="quote_request"
                          checked={paymentMethod === 'quote_request'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="text-slate-600"
                        />
                        <FileText className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Request Quote</span>
                      </label>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal:</span>
                        <span className="font-medium">${getCartTotal().subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">GST (18%):</span>
                        <span className="font-medium">${getCartTotal().gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery:</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-200">
                        <span>Total:</span>
                        <span>${getCartTotal().total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 py-3 bg-slate-300 text-slate-700 rounded-xl hover:bg-slate-400 transition-colors font-semibold"
                >
                  Back to Cart
                </button>
                
                {paymentMethod === 'quote_request' ? (
                  <button
                    onClick={generateQuote}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Request Quote</span>
                  </button>
                ) : (
                  <button
                    onClick={processPayment}
                    disabled={!customerInfo.companyName || !customerInfo.email || !customerInfo.phone}
                    className="flex-1 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Complete Order</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-md w-full p-8 text-center border border-white/50">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Order Confirmed!</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Thank you for your order. You will receive a confirmation email shortly with tracking details.
            </p>
            
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ECommercePage;
