/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { React } from "@webpack/common";

import { settings } from "./settings";

import { PingUnderConnection } from "./components/PingUnderConnection";
import { PingNearbyStatus } from "./components/PingNearbyStatus";

export default definePlugin({
    name: "ShowPing",
    description: "Displays your live ping.",
    authors: [{
        name: "nicola02nb",
        id: 257900031351193600n
    }],
    settings,
    patches: [
        {
            find: "#{intl::E2EE_VIDEO_DETAILS}",
            replacement: [
                {
                    match: /(children:\i}\):null,children:)(\(0,\i.jsx\)\(\i.\i,[^}]+}\))/,
                    replace: "$1[$2,$self.renderPing()]"
                },
                {
                    match: /(?<=children:)\(0,\i\.jsx\)\(\i,{quality:\i,largePing:\i}\)/,
                    replace: "$self.renderContainer($&)"
                },
            ]
        },
        /* There has to be a better way to do this */
        {
            find: /\[\i\.fontScaling\]:\i/,
            replacement: {
                match: /\[\i\.fontScaling\]:\i}[^)]+/,
                replace: "$&, \"vc-connection-container\""
            }
        },
    ],

    renderPing() {
        return <PingNearbyStatus />;
    },
    renderContainer(children: React.ReactNode) {
        return <PingUnderConnection>{children}</PingUnderConnection>;
    }
});
