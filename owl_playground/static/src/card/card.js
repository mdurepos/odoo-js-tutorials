/** @odoo-module alias=owl_playground.card**/

import {Component} from "@odoo/owl";

export class Card extends Component {
    static template = "owl_playground.card";
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
    }

    setup() {}

}
