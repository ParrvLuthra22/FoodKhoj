import React from 'react';
import { CheckCircle2, Download, Mail, ArrowRight, MapPin, Clock } from 'lucide-react';
import { generateReceiptHtml, downloadReceiptHtml, buildEmailContent, openEmailClient } from '../../utils/receipt';

const PaymentSuccess = ({ 
  isVisible, 
  onClose, 
  paymentData, 
  orderData,
  onTrackOrder,
  onDownloadReceipt,
  className = ''
}) => {
  if (!isVisible) return null;

  const handleDownloadReceipt = () => {
    try {
      if (onDownloadReceipt) {
        onDownloadReceipt();
        return;
      }
      const html = generateReceiptHtml(orderData, paymentData);
      const filename = `FoodKhoj_Receipt_${orderData?.id || 'order'}.html`;
      downloadReceiptHtml(html, filename);
    } catch (e) {
      console.error('Failed to download receipt', e);
    }
  };

  const handleEmailReceipt = () => {
    try {
      const to = orderData?.customerEmail || orderData?.email || '';
      const { subject, body } = buildEmailContent(orderData, paymentData);
      openEmailClient({ to, subject, body });
    } catch (e) {
      console.error('Failed to open email client', e);
    }
  };

  return (
    <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white max-w-md w-full mx-4 rounded-xl border border-slate-200 shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">Payment successful</h2>
          <p className="mt-1 text-sm text-slate-600">Your order is confirmed and now being prepared.</p>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-lg border border-slate-200">
          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between p-4">
              <span className="text-xs uppercase tracking-wide text-slate-500">Order ID</span>
              <span className="text-sm font-medium text-slate-900">{orderData?.id || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-xs uppercase tracking-wide text-slate-500">Payment ID</span>
              <span className="text-sm font-medium text-slate-900">{paymentData?.payment?.id || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-xs uppercase tracking-wide text-slate-500">Amount paid</span>
              <span className="text-sm font-semibold text-slate-900">₹{paymentData?.payment?.amount || orderData?.totalINR}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-xs uppercase tracking-wide text-slate-500">Method</span>
              <span className="text-sm font-medium text-slate-900 capitalize">{paymentData?.payment?.method || 'Card'}</span>
            </div>
          </div>
        </div>

        {/* Restaurant & Delivery */}
        <div className="mt-6 space-y-4">
          {orderData?.restaurant && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-semibold">
                {orderData.restaurant.name?.charAt(0) || 'R'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{orderData.restaurant.name}</p>
                <div className="mt-0.5 flex items-center text-xs text-slate-600">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>25–30 min estimated delivery</span>
                </div>
              </div>
            </div>
          )}

          {orderData?.deliveryAddress && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Delivery address</p>
                <p className="mt-1 text-sm text-slate-700">
                  {orderData.deliveryAddress.street}, {orderData.deliveryAddress.city} {orderData.deliveryAddress.zipCode}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={onTrackOrder}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/50"
          >
            <span>Track your order</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              <span>Download receipt</span>
            </button>

            <button
              onClick={handleEmailReceipt}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Mail className="h-4 w-4" />
              <span>Email receipt</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Continue shopping
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-200 pt-4">
          <p className="text-center text-xs text-slate-500">Secured by Razorpay • SSL encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;