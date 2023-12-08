/** @odoo-module **/

import {Component, useSubEnv, onWillStart, useState} from "@odoo/owl";
import {getDefaultConfig} from "@web/views/view";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {Domain} from "@web/core/domain";
import {Card} from "@awesome_tshirt/card/card";

class AwesomeDashboard extends Component {
    setup() {
         useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.display = {
            controlPanel: {
                "top-right": false,
                "bottom-right": false
            }
        };
        this.action = useService("action");
        this.cards = useState([])
        this.statistics = useService("statistics")

        onWillStart(async () => {
            let descriptions = {
                average_quantity: "The average number of t-shirts by order.",
                average_time: "Average time to fill an order",
                nb_cancelled_orders: "Number of cancelled orders",
                nb_new_orders: "Number of new orders",
                orders_by_size: "Number of orders by size",
                total_amount: "Total amount of orders, this month",
            }
            for (let key in descriptions) {
                let card = {
                    id: key,
                    title: descriptions[key],
                    content: this.statistics[key],
                }
                this.cards.push(card)
                if (key ==='orders_by_size') {
                    card.chartData = this.statistics[key];
                    card.content = null;
                } else {
                    card.chartData = null;
                }
            }
        });
    }

    openCustomersView() {
        this.action.doAction("base.action_partner_form")
    }

    openOrders (title, domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: new Domain(domain).toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ]
        });
    }
    openLast7DaysOrders() {
        let domain = "[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders("Last 7 Days Orders", domain);
    }

    openCancelledOrdersLast7Days() {
        let domain = "[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state', '=', 'cancelled')]";
        this.openOrders("Last 7 Days Cancelled Orders", domain);
    }
}

AwesomeDashboard.components = {Layout, Card};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
