import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building, CreditCard, FileText, AlertCircle } from 'lucide-react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
};

type CustomerInfo = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gst: string;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
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

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'bank_transfer' | 'purchase_order'>('online');
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      navigate('/ecommerce/cart');
    }
  }, [navigate]);

  const getCartTotals = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const shipping = subtotal > 1000000 ? 0 : 50000;
    const total = subtotal + gst + shipping;
    return { subtotal, gst, shipping, total };
  };

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!customerInfo.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Email is invalid';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(customerInfo.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const proceedToPayment = () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2);
      }
    } else {
      // Proceed to payment processing
      const orderData = {
        customerInfo,
        paymentMethod,
        cart,
        totals: getCartTotals()
      };
      
      localStorage.setItem('orderData', JSON.stringify(orderData));
      
      if (paymentMethod === 'online') {
        navigate('/ecommerce/payment');
      } else {
        navigate('/ecommerce/order-confirmation');
      }
    }
  };

  const { subtotal, gst, shipping, total } = getCartTotals();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Checkout</h1>
            <p className="text-xl text-slate-600">Complete your order in 2 simple steps</p>
          </div>
          
          <button
            onClick={() => navigate('/ecommerce/cart')}
            className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-xl border border-white/50 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-slate-700' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-slate-700 text-white' : 'bg-slate-200'}`}>
                1
              </div>
              <span className="font-semibold">Customer Information</span>
            </div>
            
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
            
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-slate-700' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-slate-700 text-white' : 'bg-slate-200'}`}>
                2
              </div>
              <span className="font-semibold">Payment Method</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              /* Step 1: Customer Information */
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Building className="w-8 h-8 text-slate-600" />
                  <h2 className="text-2xl font-bold text-slate-800">Company Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.companyName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, companyName: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.companyName ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400`}
                      placeholder="Enter your company name"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.contactName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, contactName: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.contactName ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400`}
                      placeholder="Your full name"
                    />
                    {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400`}
                      placeholder="your@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400`}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerInfo.gst}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, gst: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                      placeholder="GST registration number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.address ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 h-24`}
                      placeholder="Complete address with landmarks"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.city ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400`}
                      placeholder="City name"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State *
                    </label>
                    <select
                      value={customerInfo.state}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.pincode}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, pincode: e.target.value }))}
                      className={`w-full px-4 py-3 border ${errors.pincode ? 'border-red-300' : 'border-slate-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400`}
                      placeholder="6-digit pincode"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              /* Step 2: Payment Method */
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <CreditCard className="w-8 h-8 text-slate-600" />
                  <h2 className="text-2xl font-bold text-slate-800">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-4 p-4 border-2 border-slate-200 rounded-xl hover:border-slate-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-slate-600"
                    />
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-slate-600" />
                      <div>
                        <div className="font-semibold text-slate-800">Online Payment</div>
                        <div className="text-sm text-slate-500">Credit/Debit Card, UPI, Net Banking via Razorpay</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-4 p-4 border-2 border-slate-200 rounded-xl hover:border-slate-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-slate-600"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">₹</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Bank Transfer (NEFT/RTGS)</div>
                        <div className="text-sm text-slate-500">Direct bank transfer with detailed instructions</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-4 p-4 border-2 border-slate-200 rounded-xl hover:border-slate-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="purchase_order"
                      checked={paymentMethod === 'purchase_order'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-slate-600"
                    />
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-slate-600" />
                      <div>
                        <div className="font-semibold text-slate-800">Purchase Order</div>
                        <div className="text-sm text-slate-500">Generate PO for company procurement process</div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* High Value Notice */}
                {total > 1000000 && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-800 mb-1">High-Value Order Benefits</div>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Free installation and training included</li>
                          <li>• Extended warranty coverage</li>
                          <li>• Dedicated technical support</li>
                          <li>• Flexible payment terms available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h3>
              
              {/* Cart Items Preview */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-800 text-sm truncate">{item.name}</div>
                      <div className="text-slate-500 text-xs">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-slate-800 text-sm">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">GST (18%):</span>
                  <span className="font-semibold">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping:</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-800 pt-3 border-t">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                {currentStep === 2 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full py-3 bg-slate-300 text-slate-700 rounded-xl hover:bg-slate-400 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Information</span>
                  </button>
                )}
                
                <button
                  onClick={proceedToPayment}
                  className="w-full py-4 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <span>
                    {currentStep === 1 ? 'Continue to Payment' : 
                     paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Security Info */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 text-slate-600 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure & encrypted data transmission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
