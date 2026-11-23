
import { run } from '@openai/agents';

import { qaAnalyst } from './agents/qa-analyst.js';
import { automationEngineer } from './agents/automation-engineer.js';
import { qaReviewer } from './agents/qa-reviewer.js';

import {
  validateReport,
  calculateMetrics,
  saveReport,
  type SwarmReport,
} from './utils/reporting.js';

export async function runSwarm(requirement: string) {
  const startedAt = Date.now();
  const durations: Record<string, number> = {};

  // AGENT 1: QA Analyst
  console.log('\n[1/3] QA Analyst is working...');

  let start = Date.now();

  const analysis = (await run(
    qaAnalyst,
    requirement
  )).finalOutput;

  durations.qaAnalyst = Date.now() - start;

  if (!analysis) {
    throw new Error('QA Analyst returned no output');
  }

  console.log(
    `Identified ${analysis.testCases.length} scenarios`
  );

  // AGENT 2: Automation Engineer
  console.log('\n[2/3] Automation Engineer is working...');

  start = Date.now();

  const automation = (await run(
    automationEngineer,
    JSON.stringify({ requirement, analysis })
  )).finalOutput;

  durations.automationEngineer = Date.now() - start;

  if (!automation) {
    throw new Error('Automation Engineer returned no output');
  }

  console.log(
    `Proposed ${automation.automationPlans.length} tests`
  );

  // AGENT 3: QA Reviewer
  console.log('\n[3/3] QA Reviewer is working...');

  start = Date.now();

  const review = (await run(
    qaReviewer,
    JSON.stringify({ requirement, analysis, automation })
  )).finalOutput;

  durations.qaReviewer = Date.now() - start;

  if (!review) {
    throw new Error('QA Reviewer returned no output');
  }

  // CONSOLIDATE RESULTS
  const report: SwarmReport = {
    requirement,
    analysis,
    automation,
    review,
  };

  // VALIDATE AND MEASURE
  const validation = validateReport(report);
  const metrics = calculateMetrics(report);

  const result = {
    timestamp: new Date().toISOString(),
    report,
    validation,
    metrics,
    durationMs: {
      ...durations,
      total: Date.now() - startedAt,
    },
  };

  // PERSIST RESULTS
  const filepath = await saveReport(result);

  // SUMMARY
  console.log('\n========== QA SWARM SUMMARY ==========');

  console.log('Validation:', validation.valid ? 'PASS' : 'FAIL');
  console.log('Metrics:', JSON.stringify(metrics, null, 2));
  console.log('Duration (ms):', result.durationMs);
  console.log('Report saved:', filepath);

  if (!validation.valid) {
    console.error('Validation errors:', validation.errors);
    throw new Error('Swarm report validation failed');
  }

  return result;
}
