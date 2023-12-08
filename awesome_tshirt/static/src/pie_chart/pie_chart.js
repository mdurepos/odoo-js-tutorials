/** @odoo-module **/

import {Component, onWillStart, useRef, useEffect} from '@odoo/owl';
import {loadJS} from '@web/core/assets';
import {getColor} from '@web/views/graph/colors';

export class PieChart extends Component {
    static template = "awesome_tshirt.pie_chart";
    static props = {
        data: {type: Object},
    }
    setup() {
        this.canvasRef = useRef("canvas")
        this.chart = null
        this.data = Object.values(this.props.data);
        this.labels = Object.keys(this.props.data);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });

        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"])
        });
        useEffect(
            () => this.renderChart()
        );
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        let chart_data = {
            datasets: [{
                data: this.data,
                backgroundColor: this.color,
            }],
            labels: this.labels,
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: chart_data,
        })
        Chart.animationService.advance()
    }
}
