import { settings } from "../settings";
import { PingElement } from "./Ping";

export function PingNearbyStatus() {
    const { showNearbyConnectionStatus } = settings.use(["showNearbyConnectionStatus"]);

    if (!showNearbyConnectionStatus) return null;

    return <PingElement size="sm" />
}
