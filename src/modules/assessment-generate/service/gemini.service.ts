import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeminiService {

    private genAI: GoogleGenerativeAI;
    private logger = new Logger(GeminiService.name);
    private models = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0']; // fallback order

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    }

    async generateQuestions(prompt: string): Promise<any> {
        for (const modelName of this.models) {
            try {
                const model = this.genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                return result;
            } catch (err) {
                this.logger.warn(`Model ${modelName} failed: ${err.message}`);
                // Try next model in the list
            }
        }

        throw new Error('All models failed to generate content');
    }
}