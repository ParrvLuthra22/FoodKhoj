import { GoogleGenerativeAI } from '@google/generative-ai';
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

function getModel() {
  if (!apiKey) {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  if (!model) {
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
  return model;
}

/**
 * @param {Object} params
 * @param {string} params.userMessage 
 * @param {string|number} [params.orderId]
 * @param {Object} [params.driverInfo]
 * @returns {Promise<string>}
 */
export async function generateDriverReply({ userMessage, orderId, driverInfo }) {
  const fallbackResponses = [
    "I'm about 5 minutes away from your location.",
    "I've just picked up your order from the restaurant.",
    "I'm on my way to your address now.",
    "I'll ring the bell when I arrive.",
    "I'll leave it at the door as requested.",
  ];

  const trimmed = (userMessage || '').trim();
  if (!trimmed) {
    return 'Could you please repeat that?';
  }

  const model = getModel();
  if (!model) {
    const lower = trimmed.toLowerCase();
    if (lower.includes('where') || lower.includes('close')) return "I'm about 5 minutes away from your location.";
    if (lower.includes('ring') || lower.includes('bell')) return "I'll ring the bell when I arrive.";
    if (lower.includes('door') || lower.includes('leave')) return "I'll leave it at the door as requested.";
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  try {
    const system = `You are a courteous food delivery driver chatting with the customer. 
Keep replies short (1-2 sentences), specific, and helpful. Be realistic (traffic, route, ETA). 
Avoid making promises you cannot keep. If asked something unrelated to delivery, politely steer back.`;

    const prompt = [
      system,
      `Order ID: ${orderId ?? 'N/A'}`,
      `Driver: ${driverInfo?.name ?? 'Driver'}`,
      `Customer message: "${trimmed}"`,
      'Reply as the driver:',
    ].join('\n');

    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    const text = result?.response?.text?.() || '';
    const clean = (text || '').trim();
    if (!clean) {
      throw new Error('Empty response from model');
    }
    return clean;
  } catch (err) {
    console.error('Gemini generateDriverReply error:', err);
    const lower = trimmed.toLowerCase();
    if (lower.includes('where') || lower.includes('close')) return "I'm about 5 minutes away from your location.";
    if (lower.includes('ring') || lower.includes('bell')) return "I'll ring the bell when I arrive.";
    if (lower.includes('door') || lower.includes('leave')) return "I'll leave it at the door as requested.";
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}


