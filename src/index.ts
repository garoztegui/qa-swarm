
import 'dotenv/config';
import { runSwarm } from './orchestrator.js';

const requirement = `
A booking application allows users to book
60-minute appointments.

Rules:
- Users cannot book occupied slots.
- Users cannot book past dates.
- Users can cancel appointments.
- Cancellation requires 24 hours notice.
`;

runSwarm(requirement).catch((error) => {
  console.error('Swarm execution failed:', error);
  process.exitCode = 1;
});