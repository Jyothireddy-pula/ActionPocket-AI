import { ExtractionResultSchema, type ExtractionResult } from './types';
import { getDemoExtraction } from './demo-adapter';

const SYSTEM_PROMPT = `You are an action extraction assistant. Extract actionable tasks from the given text.
For each action, provide:
- title: clear, concise action title (required)
- description: additional context if available
- priority: low/medium/high/urgent based on language cues
- due_date: ISO date string if mentioned, null if not (NEVER invent dates)
- tags: relevant category tags
- confidence: 0-1 confidence score
- uncertain_fields: list fields you're unsure about

Return valid JSON matching: { "actions": [...], "summary": "..." }`;

export async function extractActions(text: string): Promise<ExtractionResult> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'gemini-1.5-flash';
  const provider = process.env.AI_PROVIDER || 'gemini';

  if (!apiKey || apiKey === 'your_gemini_api_key') {
    return getDemoExtraction(text);
  }

  try {
    if (provider === 'gemini') {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const geminiModel = genAI.getGenerativeModel({ model });

      const prompt = `${SYSTEM_PROMPT}\n\nText to analyze:\n${text}`;
      const result = await geminiModel.generateContent(prompt);
      const responseText = result.response.text();

      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in response');

      const parsed = JSON.parse(jsonMatch[0]);
      return ExtractionResultSchema.parse(parsed);
    }

    return getDemoExtraction(text);
  } catch (error) {
    console.error('AI extraction error:', error);
    return getDemoExtraction(text);
  }
}
