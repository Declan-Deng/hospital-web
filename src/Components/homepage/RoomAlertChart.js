import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const RoomAlertChart = () => {
    // 假设的报警数据，每小时的报警次数
    const data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));

    // 使用ECharts配置图表
    const getOption = () => {
        return {
            title: {
                text: '24小时内房间报警统计',
                subtext: '随机生成的数据',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [...Array(24).keys()].map(hour => `${hour}:00`)
            },
            yAxis: {
                type: 'value',
                name: '报警次数',
                minInterval: 1
            },
            series: [{
                name: '报警次数',
                type: 'line',
                data: data,
                areaStyle: {}
            }]
        };
    };

    return (
        <ReactECharts option={getOption()} style={{ height: 400, width: '100%' }} />
    );
};

export default RoomAlertChart;
