/** @odoo-module **/

import {Component} from "@odoo/owl";
import {PieChart} from '@awesome_tshirt/pie_chart/pie_chart';

export class Card extends Component {
    static template = "awesome_tshirt.card";
    static components = {PieChart}
    static props = {
        slots: {
            type: Object,
            shape: {
                default: {type: Object, optional: true},
                title: {type: Object, optional: true},
                content: Object,
            }
        },
        classes: {type: String, optional: true},
        chartData: {optional: true},
    }

    setup() {}
}
