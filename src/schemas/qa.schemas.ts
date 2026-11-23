
import { z } from 'zod';

export const TestCaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['positive', 'negative', 'boundary']),
  priority: z.enum(['high', 'medium', 'low']),
  preconditions: z.array(z.string()),
  steps: z.array(z.string()),
  expectedResult: z.string(),
});

export const QAAnalysisSchema = z.object({
  testCases: z.array(TestCaseSchema),
  assumptions: z.array(z.string()),
  clarifications: z.array(z.string()),
});

export const AutomationSchema = z.object({
  automationPlans: z.array(z.object({
    testCaseId: z.string(),
    approach: z.string(),
    playwrightCode: z.string(),
    assertions: z.array(z.string()),
    missingInformation: z.array(z.string()),
  })),
});

export const QAReviewSchema = z.object({
  approved: z.boolean(),
  strengths: z.array(z.string()),
  issues: z.array(z.string()),
  missingScenarios: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export type QAAnalysis = z.infer<typeof QAAnalysisSchema>;
export type Automation = z.infer<typeof AutomationSchema>;
export type QAReview = z.infer<typeof QAReviewSchema>;
