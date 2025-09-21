// Simple Razorpay service for frontend-only integration

export class RazorpayService {
  /**
   * Load Razorpay script dynamically
   */
  static loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ Razorpay script loaded successfully');
        resolve(true);
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay script');
        reject(new Error('Failed to load Razorpay script'));
      };

      document.body.appendChild(script);
    });
  }

  /**
   * Open Razorpay checkout modal
   */
  static async openCheckout(options) {
    try {
      // Ensure Razorpay script is loaded
      await this.loadRazorpayScript();

      return new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          ...options,
          handler: (response) => {
            console.log('✅ Payment successful:', response);
            resolve(response);
          },
          modal: {
            ondismiss: () => {
              console.log('❌ Payment modal dismissed');
              reject(new Error('Payment cancelled by user'));
            },
          },
        });

        razorpay.open();
      });
    } catch (error) {
      console.error('Error opening Razorpay checkout:', error);
      throw error;
    }
  }

  /**
   * Process payment (frontend-only for testing)
   */
  static async processPayment(orderData) {
    try {
      console.log('🔄 Processing payment for order:', orderData.id);
      console.log('💰 Amount:', orderData.total);
      console.log('🔑 Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID);

      // Convert amount to paisa (smallest currency unit)
      const amountInPaisa = Math.round(orderData.total * 83 * 100); // Convert USD to INR to Paisa
      
      console.log('💰 Amount in Paisa:', amountInPaisa);

      // For frontend-only testing, we don't create a server order
      // We'll use Razorpay's payment-only mode
      const checkoutOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amountInPaisa,
        currency: 'INR',
        name: 'FoodKhoj',
        description: `Food delivery order from ${orderData.restaurant?.name || 'Restaurant'}`,
        image: 'https://your-logo-url.com/logo.png', // Optional logo
        prefill: {
          name: orderData.customerName || '',
          email: orderData.customerEmail || '',
          contact: orderData.customerPhone || '',
        },
        notes: {
          order_id: orderData.id,
          customer_id: orderData.customerId || 'guest',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function() {
            console.log('❌ Payment modal dismissed');
          }
        }
      };

      console.log('🔄 Opening Razorpay checkout with options:', checkoutOptions);
      
      // Open Razorpay checkout
      const paymentResponse = await this.openCheckout(checkoutOptions);

      console.log('✅ Payment completed:', paymentResponse);
      
      // Return success response
      return {
        success: true,
        order: {
          ...orderData,
          status: 'paid',
          paymentId: paymentResponse.razorpay_payment_id,
          paidAt: new Date().toISOString(),
        },
        payment: {
          id: paymentResponse.razorpay_payment_id,
          amount: amountInPaisa / 100,
          currency: 'INR',
          method: 'test',
          status: 'captured',
        },
      };

    } catch (error) {
      console.error('❌ Payment process failed:', error);
      throw error;
    }
  }
}

export default RazorpayService;