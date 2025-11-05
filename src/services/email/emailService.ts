import emailjs from '@emailjs/browser';

export class EmailService {
  private serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
  private templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
  private publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

  async sendOrderConfirmation(data: {
    customerEmail: string;
    orderDetails: any;
    paymentDetails: any;
  }) {
    try {
      const templateParams = {
        to_email: data.customerEmail,
        customer_name: data.orderDetails.customerInfo.contactName,
        order_id: data.orderDetails.id,
        order_total: data.orderDetails.total,
        payment_id: data.paymentDetails.razorpay_payment_id,
        company_name: data.orderDetails.customerInfo.companyName,
        order_items: data.orderDetails.items.map((item: any) => 
          `${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
        ).join('\n'),
        delivery_address: data.orderDetails.customerInfo.address
      };

      const result = await emailjs.send(
        this.serviceId,
        'order_confirmation',
        templateParams,
        this.publicKey
      );

      // Also send internal notification
      await this.sendInternalOrderNotification(data.orderDetails);

      return { success: true, result };
    } catch (error) {
      console.error('Failed to send order confirmation:', error);
      throw new Error('Failed to send confirmation email');
    }
  }

  async sendQuoteRequest(data: {
    customerEmail: string;
    customerInfo: any;
    requestedItems: any[];
    message: string;
  }) {
    try {
      const templateParams = {
        customer_email: data.customerEmail,
        customer_name: data.customerInfo.contactName,
        company_name: data.customerInfo.companyName,
        phone: data.customerInfo.phone,
        requested_items: data.requestedItems.map(item => 
          `${item.name} - Qty: ${item.quantity}`
        ).join('\n'),
        message: data.message,
        quote_id: `QT${Date.now()}`
      };

      await emailjs.send(
        this.serviceId,
        'quote_request',
        templateParams,
        this.publicKey
      );

      // Send auto-reply to customer
      await emailjs.send(
        this.serviceId,
        'quote_request_auto_reply',
        {
          to_email: data.customerEmail,
          customer_name: data.customerInfo.contactName,
          quote_id: templateParams.quote_id
        },
        this.publicKey
      );

      return { success: true, quoteId: templateParams.quote_id };
    } catch (error) {
      console.error('Failed to send quote request:', error);
      throw new Error('Failed to send quote request');
    }
  }

  private async sendInternalOrderNotification(orderDetails: any) {
    const templateParams = {
      to_email: 'sales@nexusautomation.com',
      order_id: orderDetails.id,
      customer_name: orderDetails.customerInfo.contactName,
      company_name: orderDetails.customerInfo.companyName,
      order_total: orderDetails.total,
      order_items: orderDetails.items.map((item: any) => 
        `${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
      ).join('\n')
    };

    await emailjs.send(
      this.serviceId,
      'internal_order_notification',
      templateParams,
      this.publicKey
    );
  }
}

export const emailService = new EmailService();
