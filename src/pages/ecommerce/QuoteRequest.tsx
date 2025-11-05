import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FileText, ArrowLeft, CheckCircle, AlertCircle, Send, Package, User, Building, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

const QuoteRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get parameters from URL
  const productName = searchParams.get('name');
  const productId = searchParams.get('product');
  const productsParam = searchParams.get('products');
  const quoteType = searchParams.get('type');
  
  const [formData, setFormData] = useState({
    customerName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    quantity: '1',
    timeline: 'Within 2 weeks',
    applicationDetails: '',
    additionalRequirements: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);

  // Load product details when component mounts
  useEffect(() => {
    if (productName && productId) {
      // Try to get product details from localStorage
      const storedProduct = localStorage.getItem('quoteProduct');
      if (storedProduct) {
        const product = JSON.parse(storedProduct);
        setProductDetails(product);
        
        setFormData(prev => ({
          ...prev,
          message: `I am interested in requesting a quote for the following cutting tool:\n\nProduct: ${product.name}\nBrand: ${product.brand}\nPart Number: ${product.id}\nType: ${product.tool_type}\nMaterial: ${product.material}\nCoating: ${product.coating}\n\nPlease provide pricing information and availability.`
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          message: `I am interested in requesting a quote for: ${decodeURIComponent(productName)} (Part #${productId})\n\nPlease provide pricing information and availability.`
        }));
      }
    } else if (productsParam) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in requesting a bulk quote for multiple cutting tools.\n\nProduct IDs: ${productsParam}\n\nPlease provide detailed pricing for these items including volume discounts if applicable.`
      }));
    }
  }, [productName, productId, productsParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceID = 'service_0sxqfrs';
      const templateID = 'template_quote_request';
      const publicKey = '9u6eTpFMpQCVSGOs4';

      const templateParams = {
        to_email: 'sangamithrasaravanan2003@gmail.com',
        from_name: formData.customerName,
        from_email: formData.email,
        company_name: formData.companyName || 'Individual Customer',
        phone: formData.phone || 'Not provided',
        subject: `Quote Request - ${productName ? decodeURIComponent(productName) : 'Multiple Products'}`,
        customer_details: `
Name: ${formData.customerName}
Company: ${formData.companyName || 'Individual Customer'}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Address: ${formData.address || 'Not provided'}`,
        product_details: productDetails ? `
Product Name: ${productDetails.name}
Brand: ${productDetails.brand}
Part Number: ${productDetails.id}
Tool Type: ${productDetails.tool_type}
Material: ${productDetails.material}
Coating: ${productDetails.coating}
Current Price: ₹${productDetails.price.toLocaleString()}
Application: ${productDetails.application_notes}` : `Product: ${productName ? decodeURIComponent(productName) : 'Multiple Products'}`,
        quote_details: `
Requested Quantity: ${formData.quantity}
Timeline: ${formData.timeline}
Application Details: ${formData.applicationDetails || 'Not specified'}
Additional Requirements: ${formData.additionalRequirements || 'None'}`,
        message: formData.message,
        reply_to: formData.email,
        quote_type: quoteType === 'bulk' ? 'Bulk Quote Request' : 'Standard Quote Request'
      };

      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log('Quote request sent successfully:', result);
      setSubmitStatus('success');
      localStorage.removeItem('quoteProduct');
      setTimeout(() => navigate('/ecommerce'), 4000);

    } catch (error) {
      console.error('Error sending quote request:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header - Perfectly Centered */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-6 py-3 rounded-full text-base font-semibold mb-6">
              <FileText className="w-5 h-5" />
              <span>{quoteType === 'bulk' ? 'Bulk Quote Request' : 'Professional Quote Request'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Request Quote</h1>
            <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
              {productName 
                ? `Get competitive pricing for ${decodeURIComponent(productName)}` 
                : 'Get competitive pricing for your cutting tools requirements'
              }
            </p>
            <button
              onClick={() => navigate('/ecommerce')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-xl border border-white/50 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Catalog</span>
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-center space-x-3 max-w-4xl mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-green-800 font-bold text-lg">Quote Request Submitted Successfully!</h3>
                <p className="text-green-700">Our sales team will review your requirements and get back to you within 24 hours. You will be redirected to the catalog shortly.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex items-center space-x-3 max-w-4xl mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-bold text-lg">Error Sending Quote Request</h3>
                <p className="text-red-700">Please try again or contact us directly at sangamithrasaravanan2003@gmail.com</p>
              </div>
            </div>
          )}

          {/* Main Content Grid - Perfectly Aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Quote Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-10">
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Customer Information */}
                  <div>
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Customer Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name *</label>
                        <input
                          type="text"
                          name="customerName"
                          required
                          value={formData.customerName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                          placeholder="Enter your company name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Complete Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                          placeholder="Street address, city, state, PIN code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quote Requirements */}
                  <div>
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Quote Requirements</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Quantity Required</label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                          placeholder="Enter quantity"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Required Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                        >
                          <option value="Immediate">Immediate (Within 1 week)</option>
                          <option value="Within 2 weeks">Within 2 weeks</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="Within 2-3 months">Within 2-3 months</option>
                          <option value="Flexible">Flexible timeline</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Application Details</label>
                        <textarea
                          name="applicationDetails"
                          value={formData.applicationDetails}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all resize-none"
                          rows={4}
                          placeholder="Describe your application: What materials will you machine? What operations will you perform?"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Additional Requirements</label>
                        <textarea
                          name="additionalRequirements"
                          value={formData.additionalRequirements}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all resize-none"
                          rows={4}
                          placeholder="Any specific requirements, delivery preferences, payment terms, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <MessageCircle className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Your Message</h2>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Detailed Message *</label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all resize-none"
                        rows={6}
                        placeholder="Please provide any additional details about your requirements..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Submitting Quote Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                
                {/* Product Information */}
                {productDetails && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Product Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg mb-2">{productDetails.name}</h4>
                        <p className="text-slate-600">{productDetails.brand} • {productDetails.tool_type}</p>
                        <p className="text-slate-500 text-sm font-mono bg-slate-100 px-3 py-1 rounded mt-2 inline-block">{productDetails.id}</p>
                      </div>
                      
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="space-y-2 text-sm">
                          <div><span className="font-semibold">Material:</span> {productDetails.material}</div>
                          <div><span className="font-semibold">Coating:</span> {productDetails.coating}</div>
                          <div><span className="font-semibold">Workpiece:</span> {productDetails.workpiece_material}</div>
                          <div><span className="font-semibold">Application:</span> {productDetails.application_notes}</div>
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-slate-600 mb-1">Current Catalog Price</div>
                        <div className="text-2xl font-bold text-green-600">₹{productDetails.price.toLocaleString()}</div>
                        <div className="text-xs text-slate-500 mt-1">*Quote price may vary based on quantity and terms</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Need Help?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700">Sales Team</div>
                        <div className="text-slate-600">+91-99940 94443</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700">Email</div>
                        <div className="text-slate-600 text-sm break-all">sangamithrasaravanan2003@gmail.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700">Office</div>
                        <div className="text-slate-600 text-sm">23, 8th Street, Tatabad, Coimbatore - 641012</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={() => navigate('/contact')}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Contact Us Form</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-blue-800 font-semibold mb-1">Response Time</div>
                      <div className="text-blue-700">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
