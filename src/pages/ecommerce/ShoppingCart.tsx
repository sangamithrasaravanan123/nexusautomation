import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, X, ArrowRight, ArrowLeft, Trash2, Package, CheckCircle, AlertTriangle, XCircle, Settings } from 'lucide-react';
import { useCart } from './CartContext'; // Import cart context

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, clearCart, getCartTotals } = useCart();

  const { subtotal, gst, shipping, total } = getCartTotals();

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    navigate('/ecommerce/checkout');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full text-base font-semibold mb-4">
              <ShoppingCart className="w-4 h-4" />
              <span>Shopping Cart</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
            <p className="text-xl text-slate-600">Review your selected cutting tools</p>
          </div>
          
          <button
            onClick={() => navigate('/ecommerce')}
            className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-xl border border-white/50 hover:bg-white transition-colors shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          /* Enhanced Empty Cart */
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/50">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingCart className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-700 mb-4">Your Cart is Empty</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Explore our comprehensive range of cutting tools and add items to your cart.
              </p>
              <button
                onClick={() => navigate('/ecommerce')}
                className="px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 font-semibold flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
              >
                <Package className="w-5 h-5" />
                <span>Start Shopping</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Summary Banner */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-blue-900 font-bold text-lg">{cart.length} Items in Cart</h3>
                      <p className="text-blue-700">Total Value: ₹{subtotal.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={clearCart}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-slate-600" />
                  <span>Cart Items ({cart.length})</span>
                </h2>

                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start space-x-6">
                        {/* Enhanced Product Visual */}
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                          <div className="text-center">
                            <Package className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                            <span className="text-blue-700 font-mono text-xs font-bold block">{item.id}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Enhanced Product Info */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-slate-900 text-xl mb-2 line-clamp-2">
                                {item.name}
                              </h3>
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                  {item.brand}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                  {item.tool_type}
                                </span>
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove from cart"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          
                          {/* Enhanced Technical Specifications */}
                          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Technical Specifications</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                <span className="font-medium text-slate-600">Material:</span>
                                <span className="text-slate-800">{item.material}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                <span className="font-medium text-slate-600">Coating:</span>
                                <span className="text-slate-800">{item.coating}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                <span className="font-medium text-slate-600">Type:</span>
                                <span className="text-slate-800">{item.tool_type}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                <span className="font-medium text-slate-600">Workpiece:</span>
                                <span className="text-slate-800">{item.workpiece_material}</span>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                <span className="font-medium text-slate-600">Application:</span>
                                <span className="text-slate-800 text-sm">{item.application_notes}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced Price and Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              {/* Enhanced Quantity Controls */}
                              <div className="flex items-center space-x-2 bg-white rounded-lg border-2 border-slate-300 p-1 shadow-sm">
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.cart_quantity - 1)}
                                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-slate-700" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg text-slate-800 px-2">
                                  {item.cart_quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.cart_quantity + 1)}
                                  disabled={item.cart_quantity >= item.quantity}
                                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                                >
                                  <Plus className="w-4 h-4 text-slate-700" />
                                </button>
                              </div>
                              
                              {/* Enhanced Stock Status */}
                              <div className="flex items-center space-x-2">
                                {item.quantity > 10 ? (
                                  <>
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-green-700 font-medium">
                                      Stock: {item.quantity} pcs
                                    </span>
                                  </>
                                ) : item.quantity > 0 ? (
                                  <>
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                    <span className="text-yellow-700 font-medium">
                                      Low Stock: {item.quantity} pcs
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-5 h-5 text-red-600" />
                                    <span className="text-red-700 font-medium">Out of Stock</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            {/* Enhanced Pricing Display */}
                            <div className="text-right">
                              <div className="text-sm text-slate-600 mb-1">₹{item.price.toLocaleString()} each</div>
                              <div className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-lg">
                                ₹{(item.price * item.cart_quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">Order Summary</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Subtotal:</span>
                    <span className="font-bold text-slate-800 text-lg">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">GST (18%):</span>
                    <span className="font-bold text-slate-800 text-lg">₹{gst.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Shipping:</span>
                    <span className={`font-bold text-lg ${shipping === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-green-600 font-semibold text-sm flex items-center justify-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>🎉 Free shipping on orders above ₹10,00,000</span>
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t-2 border-slate-200 pt-6">
                    <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                      <span className="text-xl font-bold text-slate-800">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced High Value Order Notice */}
                {total > 1000000 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                      <div className="text-blue-800 font-bold text-lg">High-Value Order Benefits</div>
                    </div>
                    <ul className="text-blue-700 space-y-2">
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>Free installation & training</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>Extended warranty</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>Priority technical support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>Flexible payment terms</span>
                      </li>
                    </ul>
                  </div>
                )}

                <button
                  onClick={proceedToCheckout}
                  className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Enhanced Security Badge */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-slate-600 text-sm bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
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

export default ShoppingCartPage;
