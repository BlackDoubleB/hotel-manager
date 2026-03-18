import "/resources/js/components/styles/styles.css";

export function getStatusColors(status: string | undefined | null): string {
    if (!status) return "pending";

    const s = status.toLowerCase().trim();

    if (s === "paid" || s === "confirmed" || s === "checked-in" || s === "active" || s === "completed" || s === "success") return "paid";
    if (s === "pending" || s === "pendinng" || s === "processing" || s === "unpaid" || s === "waiting") return "pending";
    if (s === "cancelled" ||s === "canceled" || s === "failed" || s === "no-show" || s === "rejected") return "cancelled";
    if (s === "in progress" || s === "inprogress") return "inProgress";

    return "";
}