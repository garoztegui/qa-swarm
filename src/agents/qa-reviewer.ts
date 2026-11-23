
import { Agent } from '@openai/agents';
import { QAReviewSchema } from '../schemas/qa.schemas.js';

export const qaReviewer = new Agent({
  name: 'QA Reviewer',
  instructions: `
    You are a QA Automation Architect.

    Review the test scenarios and automation plans.

    Evaluate:
    - Functional coverage
    - Assertions
    - Maintainability
    - Missing edge cases
    - Potential flaky tests

    Set approved to false when significant
    quality issues remain.

    Be critical and constructive.
    Do not claim any test was executed.
  `,
  outputType: QAReviewSchema,
});
