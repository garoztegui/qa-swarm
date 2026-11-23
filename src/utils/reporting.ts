
import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

import type {
  QAAnalysis,
  Automation,
  QAReview,
} from '../schemas/qa.schemas.js';

export interface SwarmReport {
  requirement: string;
  analysis: QAAnalysis;
  automation: Automation;
  review: QAReview;
}

export function validateReport(report: SwarmReport) {
  const errors: string[] = [];

  const testCaseIds = report.analysis.testCases.map(
    (tc) => tc.id
  );

  const knownIds = new Set(testCaseIds);
  const referencedIds = new Set<string>();

  if (knownIds.size !== testCaseIds.length) {
    errors.push('Duplicate test case IDs found');
  }

  for (const plan of report.automation.automationPlans) {
    if (!knownIds.has(plan.testCaseId)) {
      errors.push(
        `Unknown test case ID: ${plan.testCaseId}`
      );
    }

    if (referencedIds.has(plan.testCaseId)) {
      errors.push(
        `Duplicate automation plan: ${plan.testCaseId}`
      );
    }

    referencedIds.add(plan.testCaseId);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function calculateMetrics(report: SwarmReport) {
  const testCases = report.analysis.testCases;
  const plans = report.automation.automationPlans;

  const total = testCases.length;
  const knownIds = new Set(testCases.map((tc) => tc.id));

  const automatedIds = new Set(
    plans
      .map((plan) => plan.testCaseId)
      .filter((id) => knownIds.has(id))
  );

  const priorityCount = {
    high: testCases.filter((tc) => tc.priority === 'high').length,
    medium: testCases.filter((tc) => tc.priority === 'medium').length,
    low: testCases.filter((tc) => tc.priority === 'low').length,
  };

  return {
    totalTestCases: total,
    automationPlans: plans.length,
    proposedCoveragePercent:
      total === 0
        ? 0
        : Number(
            ((automatedIds.size / total) * 100).toFixed(2)
          ),
    priorities: priorityCount,
    reviewApproved: report.review.approved,
    reviewIssues: report.review.issues.length,
  };
}

export async function saveReport(data: object) {
  const directory = join(process.cwd(), 'reports');

  await mkdir(directory, { recursive: true });

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-');

  const filename = `swarm-${timestamp}-${randomUUID().slice(0, 8)}.json`;
  const filepath = join(directory, filename);

  await writeFile(
    filepath,
    JSON.stringify(data, null, 2),
    'utf8'
  );

  return filepath;
}
