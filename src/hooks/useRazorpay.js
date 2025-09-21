import { useState, useCallback } from 'react';
import { RazorpayService } from '../services/razorpayService';

/**
 * Simple hook for Razorpay payment integration
 */
export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  /**
   * Process payment using Razorpay
   */
  const processPayment = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      setPaymentData(null);

      const response = await RazorpayService.processPayment(orderData);
      
      setPaymentData(response);
      return response;

    } catch (err) {
      const errorMessage = err.message || 'Payment processing failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setPaymentData(null);
  }, []);

  return {
    // State
    loading,
    error,
    paymentData,

    // Methods
    processPayment,
    clearError,
    reset,

    // Computed state
    isProcessing: loading,
    hasError: !!error,
    isSuccess: !!paymentData && !error,
  };
};

export default useRazorpay;
