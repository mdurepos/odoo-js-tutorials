/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Todo extends Component {
    onToggleDone(ev) {
        this.props.toggleDone(this.props.id);
    }

    onRemove(ev) {
        this.props.remove(this.props.id);
    }
}

Todo.template = "owl_playground.Todo"
Todo.props = {
    id: { type: Number },
    description: { type: String },
    done: { type: Boolean },
    toggleDone: { type: Function },
    remove: { type: Function },
}
