import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useInView } from 'react-intersection-observer';

// Đăng ký các thành phần của Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ progress, total }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = progress;
            const duration = 2000; // Duration of the animation in milliseconds
            const increment = end / (duration / 10); // Value to increment per step

            const animateProgress = () => {
                if (start < end) {
                    start += increment;
                    setCurrentProgress(Math.min(start, end));
                    setTimeout(animateProgress, 10);
                }
            };

            animateProgress();
        }
    }, [inView, progress]);

    const data = {
        datasets: [
            {
                data: [currentProgress, total - currentProgress],
                backgroundColor: ['#00e676', '#bbdefb'],
                hoverBackgroundColor: ['#00c853', '#90caf9'],
            },
        ],
    };

    const options = {
        cutout: '70%',
        plugins: {
            tooltip: {
                enabled: false,
            },
        },
        animation: {
            duration: 0, // Disable the default animation to use custom animation
        },
    };

    return (
        <div ref={ref} style={{ width: '200px', height: '200px', position: 'relative' }}>
            <Doughnut data={data} options={options} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {Math.round(currentProgress)}/{total}
            </div>
        </div>
    );
};

export default ProgressChart;
