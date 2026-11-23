
import { Agent } from '@openai/agents';
import { QAAnalysisSchema } from '../schemas/qa.schemas.js';

export const qaAnalyst = new Agent({
  name: 'QA Analyst',
  instructions: `
    You are a Senior QA Analyst.

    Analyze the provided requirements and generate
    positive, negative and boundary test scenarios.

    Prioritize by risk.
    Use unique test case IDs.
    Include clear steps and expected results.

    Identify assumptions and missing requirements.
    Do not invent unspecified business rules.
  `,
  outputType: QAAnalysisSchema,
});
