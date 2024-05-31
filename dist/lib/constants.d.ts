export declare const SESSION_STATES: {
    readonly OPEN: "open";
    readonly CLOSED: "closed";
    readonly STALE: "stale";
};
export type SessionState = (typeof SESSION_STATES)[keyof typeof SESSION_STATES];
export declare const SESSION_STATE_VALUES: ("closed" | "open" | "stale")[];
export declare const REQUIREMENT_CONDITIONS: {
    readonly MET: "met";
    readonly UNMET: "unmet";
    readonly PENDING: "pending";
};
export type RequirementCondition = (typeof REQUIREMENT_CONDITIONS)[keyof typeof REQUIREMENT_CONDITIONS];
export declare const REQUIREMENT_CONDITION_VALUES: ("pending" | "met" | "unmet")[];
//# sourceMappingURL=constants.d.ts.map