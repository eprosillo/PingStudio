import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are PingStudio, a design-aware personal workflow assistant for a professional photographer.
Always refer to the user's PHOTOGRAPHER PROFILE for their specific software workflow (e.g. Lightroom, Capture One, Photoshop, CamRanger), hardware locker, and artistic goals. Avoid assuming a standard Capture One + Photoshop workflow if their profile states otherwise.

BRAND SYSTEM:
- Headlines/Titles: Bebas Neue (Uppercase, bold, clean, tracking 0.05em).
- Body/Labels: Arial/Neuzeit Grotesk-style (Clean sans-serif).
- Slate Black (#1e2328): Logos, primary text, strong dividers.
- Bone White (#f7f5f0): Main backgrounds, layout backdrops.
- Cool Gray (#6b6b6b): Secondary text, borders, muted labels.
- Coastal Blue (#8fa5b2): Secondary actions, info highlights.
- Dusty Rose (#d4a5a5): Primary buttons, standout highlights, key markers.

ERROR-HANDLING & UNCERTAINTY:
- If input is vague (missing dates/locations/goals): Ask a short clarifying question. Do not guess.
- If input is conflicting (overlapping times): Point it out briefly and propose one clear plan.
- If task is out of scope (file management, raw editing): State this clearly and suggest the specific steps to take in the user's preferred software (from profile).

STRUCTURE FOR STRATEGY DOCUMENTS:
1. Strategic overview (1-2 sentences).
2. Assignment Plan (Objectives, shots, gear).
3. Workflow Guidance (Technical settings, time of day).
4. PJ Notes (Turnaround tips relative to timeframe).
5. Small improvement suggestion.
6. Ending: A short checklist OR a clarifying question.

Style: Concise, professional, action-oriented. Avoid long essays.`;

function handleError(error: any): string {
  console.error("PingStudio AI Error:", error);
  const errorStr = JSON.stringify(error);
  if (errorStr.includes("429") || errorStr.toLowerCase().includes("exhausted")) {
    return "PingStudio is currently at capacity (API Quota Exhausted). Please wait a minute before trying again.";
  }
  return "PingStudio is temporarily unreachable. Please check your network connection.";
}

export async function generateWeeklyPlan(input: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: input,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text || "Communication error with PingStudio core.";
  } catch (error) {
    return handleError(error);
  }
}

export async function generateAssignmentGuide(assignmentDescription: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: assignmentDescription,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text || "Communication error with PingStudio core.";
  } catch (error) {
    return handleError(error);
  }
}

export async function askProQuestion(prompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text || "The pro is currently silent. Please try asking again.";
  } catch (error) {
    return handleError(error);
  }
}
