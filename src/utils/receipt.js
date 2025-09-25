// Utilities to generate, print, and email receipts without external deps

const escapeHtml = (str = '') => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

export const formatCurrency = (amount, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
  } catch {
    return `₹${Number(amount || 0).toFixed(2)}`;
  }
};

export const generateReceiptHtml = (orderData = {}, paymentData = {}) => {
  const orderId = orderData.id || 'N/A';
  const paymentId = paymentData?.payment?.id || 'N/A';
  const amount = paymentData?.payment?.amount ?? orderData?.totalINR ?? orderData?.total ?? 0;
  const currency = paymentData?.payment?.currency || 'INR';
  const restaurantName = orderData?.restaurant?.name || 'Restaurant';
  const createdAt = new Date().toLocaleString();
  const items = Array.isArray(orderData?.items) ? orderData.items : [];

  const address = orderData?.deliveryAddress
    ? `${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city} ${orderData.deliveryAddress.zipCode}`
    : '';

  const lineItems = items.map((it) => {
    const name = escapeHtml(it?.name ?? 'Item');
    const qty = it?.quantity ?? it?.qty ?? 1;
    const price = it?.price ?? 0;
    return `<tr>
      <td style="padding:8px 0; color:#0f172a;">${name}</td>
      <td style="padding:8px 0; text-align:center; color:#334155;">${qty}</td>
      <td style="padding:8px 0; text-align:right; color:#0f172a;">${formatCurrency(price, currency)}</td>
    </tr>`;
  }).join('');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Receipt - ${escapeHtml(orderId)}</title>
  <style>
    body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; background: #f8fafc; color: #0f172a; }
    .card { max-width: 640px; margin: 24px auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
    .muted { color: #475569; }
    .label { font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: #64748b; }
    .row { display:flex; justify-content:space-between; align-items:center; padding: 12px 0; border-top: 1px solid #f1f5f9; }
    .row:first-of-type { border-top: 0; }
    table { width:100%; border-collapse: collapse; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="font-size:20px; margin:0 0 4px;">Payment receipt</h1>
    <p class="muted" style="margin:0 0 16px;">${escapeHtml(restaurantName)}</p>

    <div class="row">
      <span class="label">Order ID</span>
      <span style="font-size:14px; font-weight:600;">${escapeHtml(orderId)}</span>
    </div>
    <div class="row">
      <span class="label">Payment ID</span>
      <span style="font-size:14px; font-weight:600;">${escapeHtml(paymentId)}</span>
    </div>
    <div class="row">
      <span class="label">Amount paid</span>
      <span style="font-size:14px; font-weight:700;">${formatCurrency(amount, currency)}</span>
    </div>
    <div class="row">
      <span class="label">Date</span>
      <span style="font-size:14px;">${escapeHtml(createdAt)}</span>
    </div>
    ${address ? `<div class="row">
      <span class="label">Delivery</span>
      <span style="font-size:14px; text-align:right; max-width:60%;">${escapeHtml(address)}</span>
    </div>` : ''}

    ${items.length ? `
    <div style="margin-top:16px;">
      <div class="label">Items</div>
      <table>
        <thead>
          <tr>
            <th style="text-align:left; padding:8px 0; font-size:12px; color:#64748b;">Item</th>
            <th style="text-align:center; padding:8px 0; font-size:12px; color:#64748b;">Qty</th>
            <th style="text-align:right; padding:8px 0; font-size:12px; color:#64748b;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${lineItems}
        </tbody>
      </table>
    </div>` : ''}

    <p class="muted" style="margin-top:24px; text-align:center; font-size:12px;">Secured by Razorpay • SSL encrypted</p>
  </div>
</body>
</html>`;
};

export const openPrintReceipt = (html) => {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
  // Give the browser a moment to render before printing
  setTimeout(() => {
    try { win.focus(); win.print(); } catch { /* no-op */ }
  }, 300);
};

export const downloadReceiptHtml = (html, filename = 'receipt.html') => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const openEmailClient = ({ to = '', subject = '', body = '' } = {}) => {
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
};

export const buildEmailContent = (orderData = {}, paymentData = {}) => {
  const orderId = orderData.id || 'N/A';
  const amount = paymentData?.payment?.amount ?? orderData?.totalINR ?? orderData?.total ?? 0;
  const currency = paymentData?.payment?.currency || 'INR';
  const restaurantName = orderData?.restaurant?.name || 'Restaurant';
  const items = Array.isArray(orderData?.items) ? orderData.items : [];

  const lines = items.slice(0, 6).map((it) => `• ${it?.name || 'Item'} × ${it?.quantity ?? it?.qty ?? 1}`).join('\n');

  const subject = `Your FoodKhoj receipt — Order ${orderId}`;
  const body = `Hi,\n\nThank you for your order from ${restaurantName}.\n\nOrder ID: ${orderId}\nAmount Paid: ${formatCurrency(amount, currency)}\n\nItems:\n${lines || '—'}\n\nYou can reply to this email if you have any questions.\n\n— FoodKhoj`;

  return { subject, body };
};
