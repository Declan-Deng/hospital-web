import React from 'react';
import ReactECharts from 'echarts-for-react';

const AlertTypeRadarChart = () => {
    // 构造假数据
    const data = [
        {
            value: [80, 40, 60],
            name: '处理统计'
        }
    ];

    const getOption = () => {
        return {
            title: {
                text: '报警类型处理统计',
                left: 'center'
            },
            tooltip: {},
            legend: {
                data: ['处理统计'],
                left: 'right'
            },
            radar: {
                // 定义雷达图的指示器，表示多个变量（维度）
                indicator: [
                    { name: '心率异常', max: 100 },
                    { name: '血氧异常', max: 100 },
                    { name: '体温异常', max: 100 }
                ]
            },
            series: [{
                name: '报警类型',
                type: 'radar',
                data: data
            }]
        };
    };

    return (
        <ReactECharts option={getOption()} style={{ height: 400, width: '100%' }} />
    );
};

export default AlertTypeRadarChart;
