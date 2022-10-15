import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useTranslation} from "react-i18next";



const BookStats = (props) => {
    const { t } = useTranslation();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        interaction: {
            mode: 'index' ,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: t('Book Statistics'),
            },
        },
        scales: {
            y: {
                type: 'linear' ,
                display: true,
                position: 'left' ,
            },
            y1: {
                type: 'linear' ,
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const labels = [];
    const dataLabelsRead = [];
    const dataLabelsLikes = [];
    // const dataLabelsUnLikes = [];
    const dataLabelsView = [];
    const dataLabelsComments = [];
    const dataLabelsSold = [];
    const dataLabelsReceived = [];

    for (let key in props.stats.read) {
        // ключи
        labels.push(key)
        // значения ключей
        dataLabelsRead.push(props.stats.read[key]); // John, 30, true
        dataLabelsView.push(props.stats.views[key]); // John, 30, true
        dataLabelsLikes.push(props.stats.likes[key] - props.stats.unlikes[key]); // John, 30, true
        // dataLabelsUnLikes.push(props.stats.unlikes[key]); // John, 30, true
        dataLabelsComments.push(props.stats.comments[key]); // John, 30, true
        dataLabelsSold.push(props.stats.sold[key]); // John, 30, true
        dataLabelsReceived.push(props.stats.received[key]); // John, 30, true
    }



    const data = {
        labels,
        datasets: [
            {
                label: t('View'),
                data: dataLabelsView,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',

                yAxisID: 'y',
            },
            {
                label: t('Read'),
                data: dataLabelsRead,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
            }
            ,
            {
                label: t('Likes'),
                data: dataLabelsLikes,
                borderColor: 'red',
                backgroundColor: 'red',
                yAxisID: 'y1',
            },
            // {
            //     label: t('Unlikes'),
            //     data: dataLabelsUnLikes,
            //     borderColor: 'gray',
            //     backgroundColor: 'gray',
            //     yAxisID: 'y1',
            // },
            {
                label: t('Comments'),
                data: dataLabelsComments,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                yAxisID: 'y1',
            },
            {
                label: t('Sold'),
                data: dataLabelsSold,
                borderColor: 'blue',
                backgroundColor: 'blue',
                yAxisID: 'y1',
            },
            {
                label: t('Received'),
                data: dataLabelsReceived,
                borderColor: 'green',
                backgroundColor: 'green',
                yAxisID: 'y1',
            }
        ],
    };
    return (
        <div>
          <Line options={options} data={data} />

        </div>
    );
};

export default BookStats;