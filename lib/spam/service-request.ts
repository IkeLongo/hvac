/**
 * Anti-spam / bot mitigation utilities for the Service Request form.
 * Pure TypeScript — no UI or React dependencies.
 * Safe to import from both client components and API route handlers.
 */

/**
 * Minimum elapsed time (ms) that a real human needs to complete the form.
 * Submissions faster than this are flagged as suspicious.
 */
export const MIN_HUMAN_ELAPSED_MS = 5_000;

/** All spam/timing signals captured at submission time. */
export interface SpamMetadata {
  /** Unix ms timestamp recorded when the form component first mounted. */
  formStartedAt: number;
  /** Unix ms timestamp recorded at the moment "Submit Request" was clicked. */
  submittedAt: number;
  /** Derived: submittedAt − formStartedAt (ms). */
  elapsedMs: number;
  /** True when the honeypot trap field was filled in. */
  honeypotFilled: boolean;
  /**
   * True = high-confidence spam. The honeypot was triggered.
   * API route should silently accept (fake-200) and discard / quarantine.
   */
  isSpam: boolean;
  /**
   * True = timing was unrealistically fast (< MIN_HUMAN_ELAPSED_MS).
   * Not conclusive alone — flag for server-side review, do not auto-reject.
   */
  isSuspicious: boolean;
}

/**
 * Build a SpamMetadata record from the raw signals captured on the client.
 * Call this immediately before dispatching the form payload to the API.
 */
export function evaluateSpam(
  honeypotValue: string,
  formStartedAt: number,
  submittedAt: number,
): SpamMetadata {
  const elapsedMs = submittedAt - formStartedAt;
  const honeypotFilled = honeypotValue.trim().length > 0;

  return {
    formStartedAt,
    submittedAt,
    elapsedMs,
    honeypotFilled,
    // Honeypot filled → definite spam
    isSpam: honeypotFilled,
    // Unrealistically fast AND honeypot was clean → suspicious (not spam)
    isSuspicious: !honeypotFilled && elapsedMs < MIN_HUMAN_ELAPSED_MS,
  };
}
