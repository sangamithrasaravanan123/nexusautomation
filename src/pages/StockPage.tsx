import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import { Search, Grid3X3, List, Package, Trash2, ShoppingCart, X } from "lucide-react";

// Type definitions based on the Excel file structure
type Tool = {
  'Tool ID': string;
  'Tool Name': string;
  'Brand': string;
  'Tool Type': string;
  'Material': string;
  'Coating': string;
  'Cutting Dia (mm)': number | string;
  'Shank Dia (mm)': number | string;
  'Overall Length (mm)': number | string;
  'Insert Size': string;
  'Workpiece Material': string;
  'Quantity': number;
  'Unit Price (₹)': number;
  'Application Notes': string;
};

export default function StockPage() {
  const [data, setData] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [materialFilter, setMaterialFilter] = useState("All");
  const [workpieceFilter, setWorkpieceFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ 
    key: keyof Tool; 
    direction: "asc" | "desc" 
  } | null>(null);

  // Load data from Excel file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/cutting_tools_catalog.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          raw: false,
          defval: ''
        }) as Tool[];
        
        const processedData = jsonData.map((tool, index) => ({
          ...tool,
          'Tool ID': tool['Tool ID'] || `T${String(index + 1).padStart(3, '0')}`,
          'Tool Name': tool['Tool Name'] || '',
          'Brand': tool['Brand'] || '',
          'Tool Type': tool['Tool Type'] || '',
          'Material': tool['Material'] || '',
          'Coating': tool['Coating'] || '',
          'Cutting Dia (mm)': tool['Cutting Dia (mm)'] || '',
          'Shank Dia (mm)': tool['Shank Dia (mm)'] || '',
          'Overall Length (mm)': tool['Overall Length (mm)'] || '',
          'Insert Size': tool['Insert Size'] || '',
          'Workpiece Material': tool['Workpiece Material'] || '',
          'Quantity': Number(tool['Quantity']) || 0,
          'Unit Price (₹)': Number(tool['Unit Price (₹)']) || 0,
          'Application Notes': tool['Application Notes'] || '',
        }));

        setData(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading Excel data:", error);
        
        // Enhanced sample data from Excel structure
        const sampleData: Tool[] = [
          {
            'Tool ID': "T001",
            'Tool Name': "Solid End Mill - High Performance Carbide",
            'Brand': "Walter",
            'Tool Type': "Drilling",
            'Material': "HSS",
            'Coating': "TiN",
            'Cutting Dia (mm)': 5.0,
            'Shank Dia (mm)': '',
            'Overall Length (mm)': '',
            'Insert Size': '',
            'Workpiece Material': "Aluminum",
            'Quantity': 79,
            'Unit Price (₹)': 4368,
            'Application Notes': "High-speed roughing operations"
          },
          {
            'Tool ID': "T002",
            'Tool Name': "Precision Boring Bar - Advanced Threading",
            'Brand': "Mitsubishi",
            'Tool Type': "Threading",
            'Material': "PCD",
            'Coating': "AlTiN",
            'Cutting Dia (mm)': 25.0,
            'Shank Dia (mm)': '',
            'Overall Length (mm)': '',
            'Insert Size': '',
            'Workpiece Material': "Aluminum",
            'Quantity': 74,
            'Unit Price (₹)': 2832,
            'Application Notes': "High-speed roughing applications"
          },
          {
            'Tool ID': "T003",
            'Tool Name': "Solid End Mill - CBN Ultra Precision",
            'Brand': "Kennametal",
            'Tool Type': "Grooving",
            'Material': "CBN",
            'Coating': "Uncoated",
            'Cutting Dia (mm)': '',
            'Shank Dia (mm)': '',
            'Overall Length (mm)': '',
            'Insert Size': '',
            'Workpiece Material': "Stainless Steel",
            'Quantity': 200,
            'Unit Price (₹)': 3604,
            'Application Notes': "Thread cutting precision work"
          },
          {
            'Tool ID': "T004",
            'Tool Name': "Carbide Boring Bar - Heavy Duty",
            'Brand': "Kennametal",
            'Tool Type': "Turning",
            'Material': "Carbide",
            'Coating': "TiN",
            'Cutting Dia (mm)': '',
            'Shank Dia (mm)': 7.0,
            'Overall Length (mm)': '',
            'Insert Size': '',
            'Workpiece Material': "Titanium",
            'Quantity': 33,
            'Unit Price (₹)': 444,
            'Application Notes': "Precision grooving operations"
          },
          {
            'Tool ID': "T005",
            'Tool Name': "Threading End Mill - Multi-Purpose",
            'Brand': "YG-1",
            'Tool Type': "Threading",
            'Material': "Carbide",
            'Coating': "TiN",
            'Cutting Dia (mm)': '',
            'Shank Dia (mm)': '',
            'Overall Length (mm)': 192.0,
            'Insert Size': '',
            'Workpiece Material': "Plastics",
            'Quantity': 74,
            'Unit Price (₹)': 4430,
            'Application Notes': "General-purpose turning applications"
          },
          {
            'Tool ID': "T006",
            'Tool Name': "Ball Nose End Mill - Ceramic Coated",
            'Brand': "YG-1",
            'Tool Type': "Drilling",
            'Material': "Ceramic",
            'Coating': "TiAlN",
            'Cutting Dia (mm)': '',
            'Shank Dia (mm)': 16.0,
            'Overall Length (mm)': '',
            'Insert Size': '',
            'Workpiece Material': "Cast Iron",
            'Quantity': 170,
            'Unit Price (₹)': 2883,
            'Application Notes': "Thread cutting applications"
          }
        ];
        
        setData(sampleData);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Check if any filters are active
  const filtersActive = useMemo(() => {
    return searchTerm.trim() !== "" ||
           categoryFilter !== "All" ||
           brandFilter !== "All" ||
           materialFilter !== "All" ||
           workpieceFilter !== "All";
  }, [searchTerm, categoryFilter, brandFilter, materialFilter, workpieceFilter]);

  // Enhanced filtering logic - only show results if filters are active
  const filteredData = useMemo(() => {
    if (!filtersActive) return [];
    
    return data.filter((row) => {
      const matchesSearch = !searchTerm || Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = categoryFilter === "All" || row['Tool Type'] === categoryFilter;
      const matchesBrand = brandFilter === "All" || row['Brand'] === brandFilter;
      const matchesMaterial = materialFilter === "All" || row['Material'] === materialFilter;
      const matchesWorkpiece = workpieceFilter === "All" || row['Workpiece Material'] === workpieceFilter;

      return matchesSearch && matchesCategory && matchesBrand && matchesMaterial && matchesWorkpiece;
    });
  }, [data, filtersActive, searchTerm, categoryFilter, brandFilter, materialFilter, workpieceFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      
      if (sortConfig.key === 'Unit Price (₹)' || sortConfig.key === 'Quantity') {
        const numA = parseFloat(valA.toString()) || 0;
        const numB = parseFloat(valB.toString()) || 0;
        return sortConfig.direction === "asc" ? numA - numB : numB - numA;
      }
      
      const strA = valA.toString().toLowerCase();
      const strB = valB.toString().toLowerCase();
      if (strA < strB) return sortConfig.direction === "asc" ? -1 : 1;
      if (strA > strB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handle sorting
  const handleSort = (key: keyof Tool) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Get unique values for filters (without counts)
  const uniqueCategories = [...new Set(data.map((row) => row['Tool Type']))].filter(Boolean);
  const uniqueBrands = [...new Set(data.map((row) => row['Brand']))].filter(Boolean);
  const uniqueMaterials = [...new Set(data.map((row) => row['Material']))].filter(Boolean);
  const uniqueWorkpieces = [...new Set(data.map((row) => row['Workpiece Material']))].filter(Boolean);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setBrandFilter("All");
    setMaterialFilter("All");
    setWorkpieceFilter("All");
    setSortConfig(null);
    setCurrentPage(1);
  };

  // Handle order redirect
  const handleOrderRedirect = () => {
    // Replace '/ecommerce' with your actual ecommerce page route
    window.location.href = '/ecommerce';
    setShowOrderModal(false);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-slate-700 text-lg font-medium">Loading cutting tools inventory...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
            <span>Cutting Tools Inventory</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            <span className="text-slate-700 block">Browse Our Tool Collection</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive catalog of precision cutting tools and machining equipment
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Search & Filter Tools
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 font-semibold"
              >
                {viewMode === "table" ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                <span>{viewMode === "table" ? "Grid View" : "Table View"}</span>
              </button>
            </div>
          </div>
          
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools by name, brand, material, application, or any keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/50 transition-all bg-white/70 backdrop-blur-sm"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Smart Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tool Type</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                <option value="All">All Tool Types</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                <option value="All">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Material</label>
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                <option value="All">All Materials</option>
                {uniqueMaterials.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Workpiece Material</label>
              <select
                value={workpieceFilter}
                onChange={(e) => setWorkpieceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
              >
                <option value="All">All Workpiece Materials</option>
                {uniqueWorkpieces.map((workpiece) => (
                  <option key={workpiece} value={workpiece}>
                    {workpiece}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-xl hover:from-slate-500 hover:to-slate-600 transition-all duration-300 font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>

          {/* Results Info - only show when filters are active */}
          {filtersActive && (
            <div className="bg-slate-100/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
              <div className="flex items-center justify-between">
                <span className="text-slate-800 font-semibold">
                  {sortedData.length > 0 
                    ? `Showing ${sortedData.length} cutting tool${sortedData.length !== 1 ? 's' : ''}`
                    : 'No cutting tools found matching your criteria'
                  }
                </span>
                {sortedData.length > 0 && (
                  <div className="flex space-x-4 text-slate-600 text-sm font-medium">
                    <span>Total inventory: {sortedData.reduce((sum, item) => sum + Number(item['Quantity']), 0).toLocaleString()} units</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order CTA Section - Show prominently when tools are visible */}
        {filtersActive && sortedData.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-2xl border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:flex-1 mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Found the Perfect Tools?</h3>
                <p className="text-green-100 text-lg">
                  Browse our complete online catalog and order with instant checkout and fast delivery.
                </p>
              </div>
              <div className="md:ml-8">
                <button
                  onClick={() => setShowOrderModal(true)}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-green-600 rounded-2xl hover:bg-green-50 transform hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Order Online Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {filtersActive ? (
          sortedData.length > 0 ? (
            <div className="space-y-8">
              {viewMode === "table" ? (
                /* Improved Table View */
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                        <tr>
                          {[
                            { key: "Tool ID", label: "Tool ID" },
                            { key: "Tool Name", label: "Tool Name" },
                            { key: "Brand", label: "Brand" },
                            { key: "Tool Type", label: "Type" },
                            { key: "Material", label: "Material" },
                            { key: "Unit Price (₹)", label: "Price (₹)" },
                            { key: "Quantity", label: "Stock" }
                          ].map(({ key, label }) => (
                            <th
                              key={key}
                              onClick={() => handleSort(key as keyof Tool)}
                              className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-colors select-none"
                            >
                              <div className="flex items-center space-x-2">
                                <span>{label}</span>
                                {sortConfig?.key === key && (
                                  <span className="text-lg">
                                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                                  </span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {paginatedData.map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900 bg-slate-50 font-semibold">
                              {item['Tool ID']}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-900 max-w-sm">
                              <div className="font-semibold text-slate-800" title={item['Tool Name']}>
                                {item['Tool Name']}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 truncate" title={item['Application Notes']}>
                                {item['Application Notes']}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">
                              {item['Brand']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                item['Tool Type'] === 'Drilling' ? 'bg-blue-100 text-blue-800' :
                                item['Tool Type'] === 'Threading' ? 'bg-purple-100 text-purple-800' :
                                item['Tool Type'] === 'Grooving' ? 'bg-green-100 text-green-800' :
                                item['Tool Type'] === 'Turning' ? 'bg-yellow-100 text-yellow-800' :
                                item['Tool Type'] === 'Milling' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item['Tool Type']}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                              {item['Material']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700 text-lg">
                              ₹{Number(item['Unit Price (₹)']).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                Number(item['Quantity']) > 50 ? 'bg-green-100 text-green-800' :
                                Number(item['Quantity']) > 10 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {item['Quantity']} units
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedData.map((item, index) => (
                    <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/50 animate-float" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-sm font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-lg font-semibold">{item['Tool ID']}</span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          item['Tool Type'] === 'Drilling' ? 'bg-blue-100 text-blue-800' :
                          item['Tool Type'] === 'Threading' ? 'bg-purple-100 text-purple-800' :
                          item['Tool Type'] === 'Grooving' ? 'bg-green-100 text-green-800' :
                          item['Tool Type'] === 'Turning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item['Tool Type']}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 leading-tight">
                        {item['Tool Name']}
                      </h3>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
                          <span className="font-semibold text-slate-700">Price:</span>
                          <span className="font-bold text-green-700 text-lg">₹{Number(item['Unit Price (₹)']).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-600">Brand:</span>
                          <span className="text-right truncate ml-2 font-bold text-slate-800">{item['Brand']}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-600">Material:</span>
                          <span className="font-bold text-slate-800">{item['Material']}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-600">Stock:</span>
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            Number(item['Quantity']) > 50 ? 'bg-green-100 text-green-800' :
                            Number(item['Quantity']) > 10 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item['Quantity']} units
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-slate-600 font-medium">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
                      </span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="px-3 py-1 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/70 backdrop-blur-sm"
                      >
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-xl transition-all font-semibold ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
                                : 'border border-slate-300 hover:bg-slate-100/80'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* No Results State */
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/50">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto">
                    <Search className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">No Tools Found</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  No cutting tools match your current search and filter criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )
        ) : (
          /* Empty State - shown when no filters are active */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/50">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">Start Your Tool Search</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Use the search bar above or select any filter to view our cutting tools inventory.
              </p>
            </div>
          </div>
        )}

        

        {/* Simple Order Modal */}
        {showOrderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Order Online</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Ready to purchase these cutting tools? Visit our online store to place your order with detailed specifications and instant checkout.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleOrderRedirect}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold"
                >
                  Go to Online Store
                </button>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all duration-300 font-semibold"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS Animations */}
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
}
