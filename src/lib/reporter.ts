import { trackEvent } from "./analytics";

const API_BASE = "http://localhost:3001/api"; // Adjust for production

export interface ReportPayload {
    event: "order_click" | "activation_request" | "error";
    details: string;
    metadata?: any;
}

export const reportEvent = async (payload: ReportPayload) => {
    try {
        console.log(`[Reporter] Sending event: ${payload.event}`, payload.details);

        // Google Analytics Event
        trackEvent(payload.event, {
            description: payload.details,
            ...payload.metadata
        });

        // Non-blocking report call
        fetch(`${API_BASE}/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...payload,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            })
        }).catch(err => console.error("[Reporter] Failed to send report:", err));

    } catch (e) {
        // Silently fail to not interrupt user flow
    }
};
