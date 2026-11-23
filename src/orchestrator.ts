
import { run } from '@openai/agents';

import { qaAnalyst } from './agents/qa-analyst.js';
import { automationEngineer } from './agents/automation-engineer.js';
import { qaReviewer } from './agents/qa-reviewer.js';

export async function runSwarm(requirement: string) {
  console.log('\n[1/3] QA Analyst is working...');

  const analysis = (await run(
    qaAnalyst,
    requirement
  )).finalOutput;

  if (!analysis) {
    throw new Error('QA Analyst returned no output');
  }

  console.log(
    `QA Analyst identified ${analysis.testCases.length} scenarios`
  );

  console.log('\n[2/3] Automation Engineer is working...');

  const automation = (await run(
    automationEngineer,
    JSON.stringify({ requirement, analysis })
  )).finalOutput;

  if (!automation) {
    throw new Error('Automation Engineer returned no output');
  }

  console.log(
    `Automation Engineer proposed ${automation.automationPlans.length} tests`
  );

  console.log('\n[3/3] QA Reviewer is working...');

  const review = (await run(
    qaReviewer,
    JSON.stringify({ requirement, analysis, automation })
  )).finalOutput;

  if (!review) {
    throw new Error('QA Reviewer returned no output');
  }

  const report = {
    requirement,
    analysis,
    automation,
    review,
  };

  console.log('\n========== QA SWARM REPORT ==========');
  console.log(JSON.stringify(report, null, 2));

  return report;
}
