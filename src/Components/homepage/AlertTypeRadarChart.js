import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const AlertTypeRadarChart = ({ data, roomNumber }) => {
    // 处理传入的数据，计算每种异常类型的发生次数
    const processData = useMemo(() => {
        const counts = {
            '心率异常': 0,
            '血氧异常': 0,
            '体温异常': 0
        };

        // 只考虑昨天的数据
        const yesterday = new Date("2024-04-11");
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        data.forEach(item => {
            if (item.roomNumber === roomNumber && item.exceptionStartTime.slice(0, 10) === yesterdayStr) {
                if (counts.hasOwnProperty(item.exceptionInfo)) {
                    counts[item.exceptionInfo]++;
                }
            }
        });

        return [
            {
                value: [counts['心率异常'], counts['血氧异常'], counts['体温异常']],
                name: '昨日报警统计'
            }
        ];
    }, [data, roomNumber]);

    const getOption = () => {
        return {
            title: {
                text: `${roomNumber} 房间 - 昨日报警类型统计`,
                left: 'center'
            },
            tooltip: {},
            // legend: {
            //     data: ['昨日报警统计'],
            //     left: 'right'
            // },
            radar: {
                indicator: [
                    { name: '心率异常', max: Math.max(10, processData[0].value[0]) },
                    { name: '血氧异常', max: Math.max(10, processData[0].value[1]) },
                    { name: '体温异常', max: Math.max(10, processData[0].value[2]) }
                ]
            },
            series: [{
                name: '报警类型',
                type: 'radar',
                data: processData
            }]
        };
    };

    return (
        <ReactECharts option={getOption()} style={{ height: 400, width: '40%', display: "inline-flex", position: "relative", top: "25px" }} />
    );
};

export default AlertTypeRadarChart;
