
import { Agent } from '@openai/agents';
import { AutomationSchema } from '../schemas/qa.schemas.js';

export const automationEngineer = new Agent({
  name: 'Automation Engineer',
  instructions: `
    You are a Senior SDET specializing in
    Playwright and TypeScript.

    Receive structured test scenarios.

    Generate automation proposals for
    high-priority test cases.

    Include Playwright code examples and assertions.
    Keep original test case IDs.

    Never invent verified API endpoints or selectors.
    Mark missing information explicitly.
    Do not claim to have executed tests.
  `,
  outputType: AutomationSchema,
});
