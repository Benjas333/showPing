import { React } from "@webpack/common";
import { settings } from "../settings";
import { PingElement } from "./Ping";

export function PingUnderConnection({ children }: { children: React.ReactNode; }) {
    const { showUnderConnectionIcon } = settings.use(["showUnderConnectionIcon"]);

    if (!showUnderConnectionIcon) return children;

    return <div className="pingContainer">
        {children}
        <PingElement size="xxs" parenthesis={false} color="var(--text-feedback-positive)" />
    </div>;
}
