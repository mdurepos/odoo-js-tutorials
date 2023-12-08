/** @odoo-module **/

import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { Todo } from "../todo/todo"
import { Card } from "../card/card";

export class TodoList extends Component {
    static template = "owl_playground.TodoList";
    static components = { Todo };

    setup() {
        this.nextId = 0;
        this.todoList = useState([]);
        this.input = useRef("todoListInput");
        onMounted(() => {
            this.input.el.focus();
        });
    }

    addTodo(ev) {
        if(ev.keyCode === 13 && ev.target.value !== "") {
            let description = ev.target.value;
            let id = this.nextId;
            this.todoList.push({
                id: id,
                description: description,
                done: false,
            });
            this.input.el.value = ""
            this.nextId++;
        }
    }
    toggleTodo(todoId) {
        const todo = this.todoList.find((todo) => todo.id === todoId);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    removeTodo(todoId) {
        const index = this.todoList.find((todo) => todo.id === todoId);
        if (index) {
            this.todoList.splice(index, 1)
            for (let i = 0; i < this.todoList.length; i++) {
                this.todoList[i].id = i;
            }
            this.nextId--;
        }
    }

}

