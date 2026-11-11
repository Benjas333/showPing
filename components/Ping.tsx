/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./Ping.css";

import { Text, TextSize, TextWeight } from "@components/Text";
import { FluxEvent } from "@vencord/discord-types";
import { FluxDispatcher, useEffect, useState } from "@webpack/common";


import { RTCConnectionStore } from "../stores";
import ErrorBoundary from "@components/ErrorBoundary";

export function PingElement({ size, weight = "medium", parenthesis = true, color }: { size: TextSize; weight?: TextWeight; parenthesis?: boolean; color?: string; }) {
    const [ping, setPing] = useState(() => RTCConnectionStore.getLastPing());

    const formatPing = (ping: number | undefined) => {
        if (ping === undefined) return "N/A";
        return parenthesis ? `(${ping} ms)` : `${ping} ms`;
    };

    useEffect(() => {
        const updatePing = (_: FluxEvent) => {
            setPing(RTCConnectionStore.getLastPing());
        };
        FluxDispatcher.subscribe("RTC_CONNECTION_PING", updatePing);
        return () => {
            FluxDispatcher.unsubscribe("RTC_CONNECTION_PING", updatePing);
        };
    }, []);

    return <ErrorBoundary>
        <Text
            size={size}
            weight={weight}
            className="pingDisplay"
            style={{ color: color ?? "inherit" }}
        >
            {formatPing(ping)}
        </Text>
    </ErrorBoundary>;
}
