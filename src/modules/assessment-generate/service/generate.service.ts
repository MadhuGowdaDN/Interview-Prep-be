import { Injectable, Logger } from '@nestjs/common';
import { GenerateAssessmentDto } from '../dto/generate-assessment.dto';
import { GeminiService, } from './gemini.service';

export interface Question {
  id: number; // add this
  skill: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'coding';
  question: string;
  options?: string[];
  correctAnswer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  explanation?: string;
  source?: string;
  year?: string;
  duration: number,
}

@Injectable()
export class AssessmentAIService {
  private readonly logger = new Logger(AssessmentAIService.name);

  constructor(private geminiService: GeminiService) { }

  private buildPrompt(dto: GenerateAssessmentDto): string {
    const { skill, topic, questionType, numberOfQuestions, difficulty, duration } = dto;
    const currentYear = new Date().getFullYear();

    return `
You are an expert question generator. Generate EXACTLY ${numberOfQuestions} ${difficulty || 'medium'} level ${questionType} questions about ${topic}.

Rules:
1. If type is mcq:
   - provide 4 options
   - include correctAnswer
2. If type is short:
   - include question
   - include shortAnswer
3. If type is coding:
   - include problem statement
   - include input/output examples
   - include constraints

Return ONLY a valid JSON object:
{
  "questions": [
    {
      "skill": "${skill}",
      "topic": "${topic}",
      "duration": "${duration}",
      "type": "${questionType}",
      "question": "question text",
      ${questionType === 'mcq' ? '"options": ["A", "B", "C", "D"],' : ''}
      "correctAnswer": "correct answer",
      "difficulty": "${difficulty || 'medium'}",
      "explanation": "brief explanation",
      "year": "${currentYear}",
    }
  ]
}`;
  }

  private parseResponse(text: string, dto: GenerateAssessmentDto): Object {
    try {
      // Clean the response
      const cleanedText = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      console.log("cleanedText ", cleanedText)
      // Match the JSON object
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No valid JSON found in AI response');
      console.log("jsonMatch ", jsonMatch)

      const parsed = JSON.parse(jsonMatch[0]);
      console.log("parsed ", parsed)

      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('Missing questions array');
      }

      console.log("parsed ", parsed)
      // Map questions to internal format
      let totalDuration = 0;
      return {
        questions: parsed.questions.map((q, index) => {
          totalDuration = parseInt(q.duration) + totalDuration;
          const question: Question = {
            id: q?.id,
            skill: q.skill || dto.topic,
            type: q.type || dto.questionType,
            question: q.question || q.shortAnswer || q.problemStatement,
            options: q.options,
            correctAnswer: q.correctAnswer,
            difficulty: (q.difficulty || dto.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
            duration: q.duration,
            // explanation: q.explanation || '',
            // source: 'Gemini AI',
            // year: q.year || new Date().getFullYear().toString(),
          };
          return question;
        }),
        totalDuration: totalDuration,
      };
    } catch (error) {
      this.logger.error('Failed to parse AI response', error);
      throw error;
    }
  }

  private getMockQuestions(dto: GenerateAssessmentDto): Question[] {
    const questions: Question[] = [];
    for (let i = 0; i < dto.numberOfQuestions; i++) {
      questions.push({
        id: i + 1,
        skill: dto.topic,
        type: dto.questionType as any,
        question: `Sample question ${i + 1} for ${dto.topic}`,
        ...(dto.questionType === 'mcq' && {
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
        }),
        correctAnswer:
          dto.questionType === 'mcq' ? 'Option A' : 'Sample answer',
        difficulty: (dto.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
        duration: dto.duration,
        // explanation: 'This is a sample explanation',
        // source: 'Mock Data',
        // year: new Date().getFullYear().toString(),
      });
    }
    return questions;
  }

  async generateQuestions(dto: GenerateAssessmentDto): Promise<Object> {

    let lastError: any = null;
    try {
      const prompt = this.buildPrompt(dto);
      const questions = await this.geminiService.generateQuestions(
        prompt,
      );
      const candidate = questions.response.candidates[0];
      const rawText = candidate.content.parts[0].text;
      return this.parseResponse(rawText, dto);
    } catch (error) {
      lastError = error;
    }
    if (process.env.NODE_ENV !== 'production') {
      this.logger.warn('All models failed. Returning mock questions.');
      return this.getMockQuestions(dto);
    }

    throw new Error(`All models failed. Last error: ${lastError?.message}`);
  }
}