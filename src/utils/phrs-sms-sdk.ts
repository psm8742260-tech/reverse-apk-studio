/**
 * PHRS Crowd - Authoritative Secure SMS & OTP Gateway SDK
 * 
 * Usage in external projects:
 * import { sendOTP, verifyOTP, PHRS_CONFIG } from './phrs-sms-sdk';
 */

export const PHRS_CONFIG = {
  gatewayUrl: "https://phrscrowd.online",
  serverIdentity: "phrs-master-cloud",
  projectNumber: "398230688462",
  resourceIds: {
    sms: "phrs-svc-sms-01",
    otp: "phrs-svc-otp-01",
    auth: "phrs-svc-auth-01"
  },
  endpoints: {
    smsSend: "/api/sms/send",
    otpSend: "/api/otp/send",
    otpVerify: "/api/sms/verify-otp"
  }
};

const PROJECT_KEY = "6606.0k"; // Authorized Public Project Credential Scope

export async function sendOTP(phoneNumber: string): Promise<{ success: boolean; error?: string; [key: string]: any }> {
  try {
    const response = await fetch(`${PHRS_CONFIG.gatewayUrl}${PHRS_CONFIG.endpoints.otpSend}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PROJECT_KEY}`
      },
      body: JSON.stringify({ 
        phone: phoneNumber, 
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
        resourceId: PHRS_CONFIG.resourceIds.otp
      })
    });
    return await response.json();
  } catch (err: any) {
    console.error("SMS Send Error:", err);
    return { success: false, error: err.message || "Unknown error occurred" };
  }
}

export async function verifyOTP(phoneNumber: string, otpCode: string): Promise<{ success: boolean; error?: string; [key: string]: any }> {
  try {
    const response = await fetch(`${PHRS_CONFIG.gatewayUrl}${PHRS_CONFIG.endpoints.otpVerify}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PROJECT_KEY}`
      },
      body: JSON.stringify({ 
        phone: phoneNumber, 
        otp: otpCode,
        resourceId: PHRS_CONFIG.resourceIds.otp
      })
    });
    return await response.json();
  } catch (err: any) {
    console.error("OTP Verify Error:", err);
    return { success: false, error: err.message || "Unknown error occurred" };
  }
}
