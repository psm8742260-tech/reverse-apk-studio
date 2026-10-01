/**
 * 🏛️ అడ్మిన్ గారు, DeepSeek API ని సులభంగా వాడుకోవడానికి ఈ సర్వీస్ లేయర్‌ని సిద్ధం చేశాను.
 * ఇది మన బ్యాకెండ్ ప్రాక్సీ ద్వారా కనెక్ట్ అవుతుంది.
 */

import axios from 'axios';

export interface DeepSeekResponse {
  success: boolean;
  text: string;
  agent: string;
  provider: string;
}

export async function callDeepSeek(prompt: string, fileContext?: { name: string, content: string }): Promise<DeepSeekResponse> {
  try {
    const response = await axios.post('/api/ai/generate', {
      prompt,
      agent: 'DeepSeek R1 Engineer',
      model: 'deepseek-chat',
      fileContext,
      systemInstructionCustom: "You are the DeepSeek R1 Master Engineer. Provide surgical code fixes in Telugu."
    });

    return response.data;
  } catch (error: any) {
    console.error('DeepSeek Service Error:', error);
    throw new Error(error.response?.data?.error || 'DeepSeek API కనెక్షన్ విఫలమైంది.');
  }
}
