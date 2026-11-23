
import { run } from '@openai/agents';

import { qaAnalyst } from './agents/qa-analyst.js';
import { automationEngineer } from './agents/automation-engineer.js';
import { qaReviewer } from './agents/qa-reviewer.js';

export async function runSwarm(requirement: string) {
  console.log('\n[1/3] QA Analyst is working...');

  const analysis = await run(
    qaAnalyst,
    requirement
  );

  if (!analysis.finalOutput) {
    throw new Error('QA Analyst returned no output');
  }

  console.log('\n[2/3] Automation Engineer is working...');

  const automation = await run(
    automationEngineer,
    `Requirement:\n${requirement}\n\nTest plan:\n${analysis.finalOutput}`
  );

  if (!automation.finalOutput) {
    throw new Error('Automation Engineer returned no output');
  }

  console.log('\n[3/3] QA Reviewer is working...');

  const review = await run(
    qaReviewer,
    `Requirement:\n${requirement}

    QA analysis:\n${analysis.finalOutput}

    Automation proposal:\n${automation.finalOutput}`
  );

  console.log('\n========== QA SWARM REPORT ==========');

  console.log('\nQA ANALYSIS:\n', analysis.finalOutput);
  console.log('\nAUTOMATION:\n', automation.finalOutput);
  console.log('\nREVIEW:\n', review.finalOutput);

  return {
    analysis: analysis.finalOutput,
    automation: automation.finalOutput,
    review: review.finalOutput,
  };
}