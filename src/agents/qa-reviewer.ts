
import { Agent } from '@openai/agents';

export const qaReviewer = new Agent({
  name: 'QA Reviewer',
  instructions: `
    You are a QA Automation Architect.

    Review the QA Analyst scenarios and
    Automation Engineer proposals.

    Evaluate:
    - Functional coverage
    - Missing edge cases
    - Assertion quality
    - Maintainability
    - Potential flaky tests

    Identify improvement opportunities.
    Clearly distinguish proposed tests
    from tests that have actually run.
    Return a final QA review.
  `,
});