import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useSelector } from 'react-redux';
import { store } from '../store/store';

export function HomePage() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    ChartJS.register(ArcElement, Tooltip, Legend)

    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    const array = [5, 5, 5, 5, 6, 8, 9]
    // const res = Array.from(toys.reduce(
    //     (m, { name, value }) => m.set(name, (m.get(name) || 0) + value), new Map
    // ), ([name, value]) => ({ name, value }));
    // console.log(res)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'count of toys',
                data: array,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(273, 264, 64, 0.2)',
                    'rgba(255, 360, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(273, 264, 64, 0.2)',
                    'rgba(255, 360, 64, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const data2 = {
        labels: labels,
        datasets: [
            {
                label: 'count of toys',
                data: array,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(273, 264, 64, 0.2)',
                    'rgba(255, 360, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(273, 264, 64, 0.2)',
                    'rgba(255, 360, 64, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    }
    return <section className="home-page">
        <h1>apps is life</h1>
        <div style={{ width: '300px' }} className="chart">
            <Doughnut data={data} />

        </div>
        <div style={{ width: '300px' }} className="chart">
            <Doughnut data={data2} />

        </div>
    </section >
}