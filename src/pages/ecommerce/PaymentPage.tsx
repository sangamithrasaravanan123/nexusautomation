import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, AlertCircle, CheckCircle, Loader } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load order data
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    } else {
      navigate('/ecommerce/cart');
      return;
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setError('Failed to load payment gateway');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  const processRazorpayPayment = async () => {
    if (!razorpayLoaded || !window.Razorpay) {
      setError('Payment gateway not loaded. Please refresh and try again.');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // In production, this would be an API call to your backend
      // For demo, we'll simulate order creation
      const orderId = `ORDER_${Date.now()}`;
      const amount = Math.round(orderData.totals.total * 100); // Convert to paise

      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: amount,
        currency: 'INR',
        name: 'NEXUS AUTOMATION',
        description: `Order #${orderId}`,
        order_id: orderId, // This should come from your backend
        handler: async (response: any) => {
          try {
            // Simulate payment verification
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Send confirmation email (simulated)
            await sendOrderConfirmation({
              orderId,
              customerInfo: orderData.customerInfo,
              paymentId: response.razorpay_payment_id,
              cart: orderData.cart,
              total: orderData.totals.total
            });

            // Clear cart and redirect
            localStorage.removeItem('cart');
            localStorage.removeItem('orderData');
            navigate(`/ecommerce/order-confirmation?orderId=${orderId}&paymentId=${response.razorpay_payment_id}`);
          } catch (error) {
            setError('Payment verification failed. Please contact support.');
            setProcessing(false);
          }
        },
        prefill: {
          name: orderData.customerInfo.contactName,
          email: orderData.customerInfo.email,
          contact: orderData.customerInfo.phone
        },
        notes: {
          company: orderData.customerInfo.companyName,
          gst: orderData.customerInfo.gst || 'Not provided'
        },
        theme: {
          color: '#475569'
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setError('Payment was cancelled. Please try again.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      setError('Failed to initiate payment. Please try again.');
      setProcessing(false);
    }
  };

  const sendOrderConfirmation = async (data: any) => {
    // Simulate sending confirmation email
    console.log('Sending confirmation email:', data);
    
    // In production, you would integrate with EmailJS or your backend email service
    // Example EmailJS integration:
    /*
    const templateParams = {
      to_email: data.customerInfo.email,
      customer_name: data.customerInfo.contactName,
      order_id: data.orderId,
      payment_id: data.paymentId,
      order_total: data.total,
      company_name: data.customerInfo.companyName
    };
    
    await emailjs.send('service_id', 'template_id', templateParams, 'public_key');
    */
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading payment details...</p>
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-slate-900">Secure Payment</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Payment Method</h2>
              
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <CreditCard className="w-8 h-8 text-slate-600" />
                  <div>
                    <h3 className="font-semibold text-slate-800">Razorpay Secure Payment</h3>
                    <p className="text-slate-600 text-sm">Pay with Credit/Debit Card, UPI, Net Banking</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <img src="https://cdn.razorpay.com/static/assets/logo/payment/visa.svg" alt="Visa" className="h-8" />
                  <img src="https://cdn.razorpay.com/static/assets/logo/payment/mastercard.svg" alt="Mastercard" className="h-8" />
                  <img src="https://cdn.razorpay.com/static/assets/logo/payment/upi.svg" alt="UPI" className="h-8" />
                  <img src="https://cdn.razorpay.com/static/assets/logo/payment/netbanking.svg" alt="Net Banking" className="h-8" />
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Your Payment is Secure</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS Level 1 compliant</li>
                  <li>• No card details stored on our servers</li>
                  <li>• Instant payment confirmation</li>
                  <li>• Refund protection</li>
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Order Summary</h3>
              
              {/* Customer Info */}
              <div className="mb-6 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Billing Information</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong>Company:</strong> {orderData.customerInfo.companyName}</p>
                  <p><strong>Contact:</strong> {orderData.customerInfo.contactName}</p>
                  <p><strong>Email:</strong> {orderData.customerInfo.email}</p>
                  <p><strong>Phone:</strong> {orderData.customerInfo.phone}</p>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {orderData.cart.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-medium text-slate-800 text-sm line-clamp-2">{item.name}</div>
                      <div className="text-slate-500 text-xs">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-slate-800">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium">₹{orderData.totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">GST (18%):</span>
                  <span className="font-medium">₹{orderData.totals.gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping:</span>
                  <span className={`font-medium ${orderData.totals.shipping === 0 ? 'text-green-600' : ''}`}>
                    {orderData.totals.shipping === 0 ? 'Free' : `₹${orderData.totals.shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span>₹{orderData.totals.total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={processRazorpayPayment}
                disabled={processing || !razorpayLoaded}
                className="w-full mt-6 py-4 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay ₹{orderData.totals.total.toLocaleString()}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                By clicking "Pay Now", you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
