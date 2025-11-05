import React, { useState, useEffect } from 'react';
import { Search, Grid3X3, List, ShoppingCart, Settings, Plus, Minus, FileText, Filter, RefreshCw, AlertTriangle, CheckCircle, XCircle, Users, Calculator, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import * as XLSX from 'xlsx';

// Types for Cutting Tools
type Product = {
  id: string;
  name: string;
  brand: string;
  tool_type: string;
  material: string;
  coating: string;
  cutting_dia: string;
  shank_dia: string;
  overall_length: string;
  insert_size: string;
  workpiece_material: string;
  quantity: number;
  price: number;
  application_notes: string;
};

const ProductCatalog = () => {
  const navigate = useNavigate();
  const { addToCart, updateCartQuantity, getCartItemCount, getCartQuantity } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(true);
  const [bulkQuoteMode, setBulkQuoteMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const [filters, setFilters] = useState({
    search: '',
    tool_type: 'All',
    brand: 'All',
    material: 'All',
    coating: 'All',
    workpiece: 'All',
    inStockOnly: false,
    sortBy: 'name'
  });

  // Load cutting tools data directly from Excel file
  useEffect(() => {
    const loadProductsFromExcel = async () => {
      setLoading(true);
      setLoadingError(null);
      
      try {
        console.log('Attempting to load Excel file...');
        const response = await fetch('/cutting_tools_catalog.xlsx');
        
        if (!response.ok) {
          throw new Error(`Failed to load Excel file: ${response.status} ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        console.log('Excel file loaded, size:', arrayBuffer.byteLength);
        
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        console.log('Workbook sheets:', workbook.SheetNames);
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log('Raw data rows:', rawData.length);
        
        if (rawData.length < 2) {
          throw new Error('Excel file appears to be empty or has no data rows');
        }
        
        const headers = rawData[0] as string[];
        console.log('Headers:', headers);
        
        const jsonData = rawData.slice(1).map((row: any[]) => {
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
        
        const transformedData: Product[] = jsonData
          .filter(item => item['Tool ID']) 
          .map(item => ({
            id: String(item['Tool ID'] || '').trim(),
            name: String(item['Tool Name'] || '').trim(),
            brand: String(item['Brand'] || '').trim(),
            tool_type: String(item['Tool Type'] || '').trim(),
            material: String(item['Material'] || '').trim(),
            coating: String(item['Coating'] || '').trim(),
            cutting_dia: String(item['Cutting Dia (mm)'] || '').trim(),
            shank_dia: String(item['Shank Dia (mm)'] || '').trim(),
            overall_length: String(item['Overall Length (mm)'] || '').trim(),
            insert_size: String(item['Insert Size'] || '').trim(),
            workpiece_material: String(item['Workpiece Material'] || '').trim(),
            quantity: Number(item['Quantity'] || 0),
            price: Number(item['Unit Price (₹)'] || 0),
            application_notes: String(item['Application Notes'] || '').trim()
          }));
        
        console.log(`Successfully loaded ${transformedData.length} products`);
        console.log('First product:', transformedData[0]);
        
        setProducts(transformedData);
        setLoading(false);
        
      } catch (error) {
        console.error('Error loading Excel file:', error);
        setLoadingError(error instanceof Error ? error.message : 'Unknown error occurred');
        setLoading(false);
      }
    };

    loadProductsFromExcel();
  }, []);

  // Apply filters
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                           product.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                           product.application_notes.toLowerCase().includes(filters.search.toLowerCase());
      const matchesToolType = filters.tool_type === 'All' || product.tool_type === filters.tool_type;
      const matchesBrand = filters.brand === 'All' || product.brand === filters.brand;
      const matchesMaterial = filters.material === 'All' || product.material === filters.material;
      const matchesCoating = filters.coating === 'All' || product.coating === filters.coating;
      const matchesWorkpiece = filters.workpiece === 'All' || product.workpiece_material === filters.workpiece;
      const matchesStock = !filters.inStockOnly || product.quantity > 0;
      
      return matchesSearch && matchesToolType && matchesBrand && matchesMaterial && 
             matchesCoating && matchesWorkpiece && matchesStock;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low': return a.price - b.price;
        case 'price_high': return b.price - a.price;
        case 'stock': return b.quantity - a.quantity;
        case 'brand': return a.brand.localeCompare(b.brand);
        case 'id': return a.id.localeCompare(b.id);
        default: return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredProducts(filtered);
    console.log('Filtered products:', filtered.length);
  }, [products, filters]);

  // Function to handle quote request
  const handleQuoteRequest = (product: Product) => {
    localStorage.setItem('quoteProduct', JSON.stringify(product));
    navigate(`/ecommerce/quote-request?product=${product.id}&name=${encodeURIComponent(product.name)}`);
  };

  // Handle bulk product selection
  const handleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Handle select all/none
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  // Handle bulk quote request
  const handleBulkQuoteRequest = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product for bulk quote request.');
      return;
    }
    
    const productIds = selectedProducts.join(',');
    navigate(`/ecommerce/quote-request?products=${productIds}&type=bulk`);
  };

  // Get unique values for filters
  const toolTypes = ['All', ...Array.from(new Set(products.map(p => p.tool_type).filter(Boolean)))];
  const brands = ['All', ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];
  const materials = ['All', ...Array.from(new Set(products.map(p => p.material).filter(Boolean)))];
  const coatings = ['All', ...Array.from(new Set(products.map(p => p.coating).filter(Boolean)))];
  const workpieceMaterials = ['All', ...Array.from(new Set(products.map(p => p.workpiece_material).filter(Boolean)))];

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="pt-24 pb-16 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-600 mx-auto mb-4"></div>
              <p className="text-slate-700 text-lg font-medium">Loading cutting tools catalog...</p>
              <p className="text-slate-600 text-sm mt-2">Reading Excel file directly from server</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (loadingError) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="pt-24 pb-16 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">Error Loading Catalog</h3>
              <p className="text-slate-600 mb-6">{loadingError}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-sm font-semibold mb-2">Setup Instructions:</p>
                <ol className="text-yellow-700 text-sm text-left space-y-1">
                  <li>1. Place 'cutting_tools_catalog.xlsx' in the 'public' folder</li>
                  <li>2. Install xlsx: npm install xlsx</li>
                  <li>3. Restart your dev server</li>
                </ol>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Retry Loading
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Bulk Quote Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                <Settings className="w-3 h-3" />
                <span>Professional Cutting Tools</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">Cutting Tools Catalog</h1>
              <p className="text-lg text-slate-600">Precision cutting tools for all your machining requirements</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-600 font-medium bg-white/60 px-3 py-1 rounded-full">
                {products.length} tools loaded • {filteredProducts.length} showing
              </span>

              {/* Bulk Quote Toggle Button */}
              <button
                onClick={() => {
                  setBulkQuoteMode(!bulkQuoteMode);
                  setSelectedProducts([]);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  bulkQuoteMode 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm text-slate-700 border border-white/50 hover:bg-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{bulkQuoteMode ? 'Exit Bulk Quote' : 'Bulk Quote'}</span>
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white transition-colors"
              >
                <Filter className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white transition-colors"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => navigate('/ecommerce/cart')}
                className="relative p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bulk Quote Mode Indicator */}
          {bulkQuoteMode && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-green-800 font-bold text-lg">Bulk Quote Selection Mode</h3>
                    <p className="text-green-700">Select multiple products to get volume pricing. {selectedProducts.length} products selected.</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {selectedProducts.length > 0 && (
                    <button
                      onClick={handleBulkQuoteRequest}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold shadow-lg"
                    >
                      <Calculator className="w-5 h-5" />
                      <span>Request Bulk Quote ({selectedProducts.length})</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setBulkQuoteMode(false);
                      setSelectedProducts([]);
                    }}
                    className="flex items-center space-x-2 px-4 py-3 bg-slate-400 text-white rounded-xl hover:bg-slate-500 transition-colors font-bold"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search & Filters */}
          {showFilters && (
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 mb-6">
              <div className="max-w-2xl mx-auto mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by tool name, part number, brand, or application..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full px-5 py-3 text-base border-2 border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200/50 transition-all bg-white/70 backdrop-blur-sm"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tool Type</label>
                  <select
                    value={filters.tool_type}
                    onChange={(e) => setFilters(prev => ({ ...prev, tool_type: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white/70"
                  >
                    {toolTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white/70"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Material</label>
                  <select
                    value={filters.material}
                    onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white/70"
                  >
                    {materials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Coating</label>
                  <select
                    value={filters.coating}
                    onChange={(e) => setFilters(prev => ({ ...prev, coating: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white/70"
                  >
                    {coatings.map(coating => (
                      <option key={coating} value={coating}>{coating}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Workpiece</label>
                  <select
                    value={filters.workpiece}
                    onChange={(e) => setFilters(prev => ({ ...prev, workpiece: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white/70"
                  >
                    {workpieceMaterials.map(workpiece => (
                      <option key={workpiece} value={workpiece}>{workpiece}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white/70"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="id">Part Number</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="brand">Brand</option>
                    <option value="stock">Stock Quantity</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="rounded text-slate-600"
                  />
                  <span className="text-sm font-semibold text-slate-700">In Stock Only</span>
                </label>

                <button
                  onClick={() => setFilters({
                    search: '',
                    tool_type: 'All',
                    brand: 'All',
                    material: 'All',
                    coating: 'All',
                    workpiece: 'All',
                    inStockOnly: false,
                    sortBy: 'name'
                  })}
                  className="px-4 py-1.5 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* PRODUCTS TABLE - COMPLETE IMPLEMENTATION */}
          {viewMode === 'list' ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                    <tr>
                      {bulkQuoteMode && (
                        <th className="px-3 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onChange={handleSelectAll}
                            className="rounded text-blue-600 bg-white"
                          />
                        </th>
                      )}
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Tool ID</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Tool Details</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Brand</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Type</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Material</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Coating</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Workpiece</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Stock</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Price (₹)</th>
                      {!bulkQuoteMode && <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider min-w-[160px]">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white/95 backdrop-blur-sm divide-y divide-slate-200">
                    {filteredProducts.map((product, index) => {
                      const cartQuantity = getCartQuantity(product.id);
                      const isSelected = selectedProducts.includes(product.id);
                      return (
                        <tr 
                          key={product.id} 
                          className={`hover:bg-blue-50/80 transition-all duration-200 ${
                            isSelected && bulkQuoteMode ? 'bg-blue-50/60 border-l-4 border-blue-500' : ''
                          } ${index % 2 === 0 ? 'bg-slate-50/30' : 'bg-white/50'}`}
                        >
                          {/* Bulk Selection Checkbox */}
                          {bulkQuoteMode && (
                            <td className="px-3 py-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleProductSelection(product.id)}
                                className="rounded text-blue-600"
                              />
                            </td>
                          )}

                          {/* Tool ID */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="bg-slate-100 rounded px-2 py-1 inline-block">
                              <span className="text-xs font-mono font-bold text-slate-900">{product.id}</span>
                            </div>
                          </td>

                          {/* Tool Details */}
                          <td className="px-3 py-3 max-w-xs">
                            <div className="space-y-1">
                              <div className="font-semibold text-slate-900 text-sm line-clamp-1">{product.name}</div>
                              <div className="text-xs text-slate-600 bg-slate-100 rounded px-1 py-0.5 inline-block">
                                {product.application_notes}
                              </div>
                            </div>
                          </td>

                          {/* Brand */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="font-semibold text-slate-800 bg-gradient-to-r from-blue-100 to-blue-200 px-2 py-1 rounded text-center text-xs">
                              {product.brand}
                            </div>
                          </td>

                          {/* Type */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                              {product.tool_type}
                            </span>
                          </td>

                          {/* Material */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800">
                              {product.material}
                            </span>
                          </td>

                          {/* Coating */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                              {product.coating}
                            </span>
                          </td>

                          {/* Workpiece */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-800">
                              {product.workpiece_material}
                            </span>
                          </td>

                          {/* Stock Status */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="flex items-center space-x-1">
                              {product.quantity > 10 ? (
                                <>
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                  <span className="text-green-700 font-bold text-xs">{product.quantity}</span>
                                </>
                              ) : product.quantity > 0 ? (
                                <>
                                  <AlertTriangle className="w-3 h-3 text-yellow-600" />
                                  <span className="text-yellow-700 font-bold text-xs">{product.quantity}</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 text-red-600" />
                                  <span className="text-red-700 font-bold text-xs">0</span>
                                </>
                              )}
                            </div>
                          </td>

                          {/* Price */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="text-sm font-bold text-slate-900 bg-gradient-to-r from-green-100 to-green-200 px-2 py-1 rounded text-center">
                              ₹{product.price.toLocaleString()}
                            </div>
                          </td>

                          {/* Actions Column - Only in Normal Mode */}
                          {!bulkQuoteMode && (
                            <td className="px-3 py-3 whitespace-nowrap min-w-[160px]">
                              <div className="flex flex-col space-y-1">
                                {/* Cart Controls Row */}
                                <div className="flex items-center justify-center">
                                  {cartQuantity > 0 ? (
                                    <div className="flex items-center space-x-1 bg-slate-100 rounded p-1 border border-slate-300">
                                      <button
                                        onClick={() => updateCartQuantity(product.id, cartQuantity - 1)}
                                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                                      >
                                        <Minus className="w-3 h-3 text-slate-700" />
                                      </button>
                                      <span className="w-6 text-center font-bold text-slate-800 text-sm">
                                        {cartQuantity}
                                      </span>
                                      <button
                                        onClick={() => updateCartQuantity(product.id, cartQuantity + 1)}
                                        disabled={cartQuantity >= product.quantity}
                                        className="p-1 hover:bg-slate-200 rounded transition-colors disabled:opacity-50"
                                      >
                                        <Plus className="w-3 h-3 text-slate-700" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => addToCart(product)}
                                      disabled={product.quantity === 0}
                                      className="w-full px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs flex items-center justify-center space-x-1"
                                    >
                                      <Plus className="w-3 h-3" />
                                      <span>Add</span>
                                    </button>
                                  )}
                                </div>

                                {/* Quote Button Row */}
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => handleQuoteRequest(product)}
                                    className="w-full px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold text-xs flex items-center justify-center space-x-1"
                                    title={`Request Quote for ${product.name}`}
                                  >
                                    <FileText className="w-3 h-3" />
                                    <span>Quote</span>
                                  </button>
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {filteredProducts.map((product) => {
                const cartQuantity = getCartQuantity(product.id);
                const isSelected = selectedProducts.includes(product.id);
                return (
                  <div key={product.id} className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-white/50 ${isSelected && bulkQuoteMode ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex justify-between items-start mb-3">
                      {bulkQuoteMode && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleProductSelection(product.id)}
                          className="rounded text-blue-600"
                        />
                      )}
                      <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                        {product.tool_type}
                      </span>
                    </div>

                    <div className="mb-3">
                      <h3 className="font-bold text-slate-800 text-base mb-1">{product.name}</h3>
                      <p className="text-sm text-slate-600 font-medium">{product.brand}</p>
                      <p className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">{product.id}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-2 mb-3">
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div><strong>Material:</strong> {product.material}</div>
                        <div><strong>Coating:</strong> {product.coating}</div>
                        <div><strong>Workpiece:</strong> {product.workpiece_material}</div>
                        <div><strong>App:</strong> {product.application_notes}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xl font-bold text-slate-800 mb-1">
                        ₹{product.price.toLocaleString()}
                      </div>
                      <div className="text-sm">
                        {product.quantity > 10 ? (
                          <span className="text-green-600 font-semibold flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Stock: {product.quantity}
                          </span>
                        ) : product.quantity > 0 ? (
                          <span className="text-yellow-600 font-semibold flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Low: {product.quantity}
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold flex items-center">
                            <XCircle className="w-3 h-3 mr-1" />
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {!bulkQuoteMode && (
                      <div className="flex flex-col space-y-2">
                        {cartQuantity > 0 ? (
                          <div className="flex items-center justify-center space-x-2 bg-slate-100 rounded-lg p-2">
                            <button
                              onClick={() => updateCartQuantity(product.id, cartQuantity - 1)}
                              className="p-1 hover:bg-slate-200 rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-lg text-slate-800">
                              {cartQuantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(product.id, cartQuantity + 1)}
                              disabled={cartQuantity >= product.quantity}
                              className="p-1 hover:bg-slate-200 rounded transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            disabled={product.quantity === 0}
                            className="w-full px-3 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleQuoteRequest(product)}
                          className="w-full px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center space-x-1"
                          title={`Request Quote for ${product.name}`}
                        >
                          <FileText className="w-4 h-4" />
                          <span>Request Quote</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* No Products Found */}
          {filteredProducts.length === 0 && !loading && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/50">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-3">No Cutting Tools Found</h3>
                <p className="text-slate-600 mb-6">
                  We couldn't find any cutting tools matching your search criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={() => setFilters({
                    search: '',
                    tool_type: 'All',
                    brand: 'All',
                    material: 'All',
                    coating: 'All',
                    workpiece: 'All',
                    inStockOnly: false,
                    sortBy: 'name'
                  })}
                  className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono">
              Products: {products.length} | Filtered: {filteredProducts.length} | Selected: {selectedProducts.length}
            </div>
          )}

          {/* Floating Cart Button */}
          {getCartItemCount() > 0 && !bulkQuoteMode && (
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={() => navigate('/ecommerce/cart')}
                className="bg-slate-700 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-semibold text-sm">Cart ({getCartItemCount()})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProductCatalog;
