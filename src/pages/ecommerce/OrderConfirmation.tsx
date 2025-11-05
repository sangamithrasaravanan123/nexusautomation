import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, Download, ArrowRight, Mail, Phone } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Load order details (in production, fetch from API)
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderDetails(JSON.parse(savedOrderData));
    }

    // Clear order data after confirmation
    setTimeout(() => {
      localStorage.removeItem('orderData');
    }, 5000);
  }, []);

  const downloadInvoice = () => {
    // Simulate invoice download
    alert('Invoice download will be implemented with PDF generation');
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-slate-600">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Thank you for your order. We've received your payment and will begin processing your equipment immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Order ID:</span>
                <span className="font-mono font-semibold text-slate-800">{orderId}</span>
              </div>
              {paymentId && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment ID:</span>
                  <span className="font-mono font-semibold text-slate-800">{paymentId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Order Date:</span>
                <span className="font-semibold text-slate-800">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Amount:</span>
                <span className="font-bold text-slate-800 text-lg">₹{orderDetails.totals.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-slate-800 mb-4">Delivery Information</h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p><strong>Company:</strong> {orderDetails.customerInfo.companyName}</p>
                <p><strong>Contact:</strong> {orderDetails.customerInfo.contactName}</p>
                <p><strong>Email:</strong> {orderDetails.customerInfo.email}</p>
                <p><strong>Phone:</strong> {orderDetails.customerInfo.phone}</p>
                <p><strong>Address:</strong> {orderDetails.customerInfo.address}, {orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} - {orderDetails.customerInfo.pincode}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={downloadInvoice}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold"
              >
                <Download className="w-5 h-5" />
                <span>Download Invoice</span>
              </button>
              
              <button
                onClick={() => navigate('/ecommerce')}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* What's Next & Ordered Items */}
          <div className="space-y-6">
            {/* Next Steps */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">What Happens Next?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email Confirmation</h4>
                    <p className="text-sm text-slate-600">You'll receive an order confirmation email within 5 minutes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Order Processing</h4>
                    <p className="text-sm text-slate-600">Our team will prepare your equipment within 2-3 business days</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Delivery</h4>
                    <p className="text-sm text-slate-600">Free delivery and installation within Tamil Nadu & Kerala</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Support</h4>
                    <p className="text-sm text-slate-600">Our technical team will contact you for installation scheduling</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Ordered Items</h3>
              
              <div className="space-y-4">
                {orderDetails.cart.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                      <p className="text-slate-600 text-xs">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-slate-100/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Need Help?</h3>
          <p className="text-slate-600 mb-6">
            Our customer support team is here to help with your order
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="mailto:support@nexusautomation.com" className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors">
              <Mail className="w-5 h-5" />
              <span>support@nexusautomation.com</span>
            </a>
            <a href="tel:+919876543210" className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors">
              <Phone className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
