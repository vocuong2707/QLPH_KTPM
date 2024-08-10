import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const ResultChart = ({ dataPoints }) => {
    const labels = dataPoints.map((point) => point.subject);
    const yourScores = dataPoints.map((point) => point.yourScore);
    const avgScores = dataPoints.map((point) => point.avgScore);

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Điểm TB lớp học phần',
                data: avgScores,
                borderColor: '#ffcd56',
                backgroundColor: '#ffcd56',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y1',
            },
            {
                type: 'bar',
                label: 'Điểm của bạn',
                data: yourScores,
                backgroundColor: '#ff6384',
                borderColor: '#ff6384',
                borderWidth: 1,
                yAxisID: 'y2',
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Điểm TB lớp học phần',
                },
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Điểm của bạn',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Kết quả học tập',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ResultChart;
