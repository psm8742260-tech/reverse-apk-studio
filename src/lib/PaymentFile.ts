export const PAYMENT_METHODS = {
  UPI: 'UPI',
  CARD: 'Card',
  WALLET: 'Wallet'
};

export const API_CONTROLS = {
  DAILY_BUDGET_CAP: 5000,
  DEFAULT_PROVIDER: 'gemini'
};

export const NORMAL_STUDIO_PACKS = [
  { id: 'free', name: 'Free', price: 0, min: 0 },
  { id: 'pro', name: 'Pro', price: 999, min: 10 }
];

export const PAYMENT_CONFIG = {
  PLAN_NAME: 'Studio Pro',
  SUBSCRIPTION_PRICE: 999,
  VALIDITY_DAYS: 30,
  FEATURES: ['AI Brahmastram', 'APK Builder', 'Cloud Sync']
};

export function processPayment(amount: number) {
  return Promise.resolve({ success: true, transactionId: 'TXN_' + Date.now() });
}
