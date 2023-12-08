/** @odoo-module **/

import {registry} from "@web/core/registry";
import {memoize} from "@web/core/utils/functions";

const statistics = {
    dependencies: ["rpc"],
    start(env, {rpc}) {
        this.rpc = memoize(rpc);
        return this.rpc("/awesome_tshirt/statistics")
    },
}

registry.category("services").add("statistics", statistics);