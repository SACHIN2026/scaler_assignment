// Email notification service (simulation for demo)
// In production, use services like SendGrid, Mailgun, or AWS SES

class EmailService {
  static async sendOrderConfirmation(orderData) {
    try {
      // Simulate email sending
      console.log('📧 EMAIL NOTIFICATION SENT:');
      console.log('============================');
      console.log(`To: ${orderData.customerEmail || 'customer@example.com'}`);
      console.log(`Subject: Order Confirmation - ${orderData.orderNumber}`);
      console.log('');
      console.log('Dear Customer,');
      console.log('');
      console.log(`Your order ${orderData.orderNumber} has been placed successfully!`);
      console.log('');
      console.log('Order Details:');
      console.log(`Total Amount: ₹${orderData.totalAmount}`);
      console.log(`Items: ${orderData.itemCount} item(s)`);
      console.log(`Delivery Address: ${orderData.shippingAddress}`);
      console.log('');
      console.log('Thank you for shopping with us!');
      console.log('============================');

      // In production, replace with actual email service:
      /*
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransporter({
        service: 'gmail', // or your email service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: orderData.customerEmail,
        subject: `Order Confirmation - ${orderData.orderNumber}`,
        html: this.generateOrderEmail(orderData)
      };

      await transporter.sendMail(mailOptions);
      */

      return { success: true, message: 'Email sent successfully (simulated)' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  static generateOrderEmail(orderData) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2874f0;">Order Confirmation</h2>
        <p>Dear Customer,</p>
        <p>Your order <strong>${orderData.orderNumber}</strong> has been placed successfully!</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
          <p><strong>Items:</strong> ${orderData.itemCount} item(s)</p>
          <p><strong>Delivery Address:</strong> ${orderData.shippingAddress}</p>
        </div>

        <div style="background: #e8f5e9; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #388e3c;">
            <strong>Free Delivery!</strong> Your order will be delivered within 3-5 business days.
          </p>
        </div>

        <p>Thank you for shopping with us!</p>
        <p style="color: #666; font-size: 12px;">
          This is an automated email. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  static async sendWelcomeEmail(userData) {
    try {
      console.log('📧 WELCOME EMAIL SENT:');
      console.log('======================');
      console.log(`To: ${userData.email}`);
      console.log(`Subject: Welcome to Flipkart Clone!`);
      console.log('');
      console.log(`Dear ${userData.name},`);
      console.log('');
      console.log('Welcome to Flipkart Clone! Your account has been created successfully.');
      console.log('Start shopping for amazing deals and products.');
      console.log('');
      console.log('Happy Shopping!');
      console.log('======================');

      return { success: true, message: 'Welcome email sent (simulated)' };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailService;