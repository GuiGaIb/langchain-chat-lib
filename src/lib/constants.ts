export const SESSION_STATES = {
  OPEN: 'open',
  CLOSED: 'closed',
  STALE: 'stale',
} as const;
export type SessionState = (typeof SESSION_STATES)[keyof typeof SESSION_STATES];
export const SESSION_STATE_VALUES = Object.values(SESSION_STATES);

export const REQUIREMENT_CONDITIONS = {
  MET: 'met',
  UNMET: 'unmet',
  PENDING: 'pending',
} as const;
export type RequirementCondition =
  (typeof REQUIREMENT_CONDITIONS)[keyof typeof REQUIREMENT_CONDITIONS];
export const REQUIREMENT_CONDITION_VALUES = Object.values(
  REQUIREMENT_CONDITIONS
);
