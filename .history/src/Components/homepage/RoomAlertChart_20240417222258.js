import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const RoomAlertChart = ({ data, roomNumber, targetDate }) => {
  // 日期格式化辅助函数
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  // 获取昨天的日期字符串
  const yesterday = formatDate(
    new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate() - 1
    )
  );

  // 数据转换：按小时统计
  const hourlyData = useMemo(() => {
    const hourlyCounts = Array(24).fill(0); // 创建一个长度为24，初始值为0的数组
    data.forEach((item) => {
      if (
        item.roomNumber === roomNumber &&
        formatDate(item.exceptionStartTime) === yesterday
      ) {
        const hour = new Date(item.exceptionStartTime).getHours(); // 获取事件的小时部分
        hourlyCounts[hour]++; // 对应小时的计数加一
      }
    });
    return hourlyCounts;
  }, [data, roomNumber, yesterday]);

  // 准备图表配置
  const getOption = () => {
    return {
      title: {
        text: `${roomNumber} 房间 - 昨天每小时的异常统计`,
        subtext: "数据按小时显示",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      xAxis: {
        type: "category",
        data: [...Array(24).keys()].map((hour) => `${hour}:00`),
        axisLabel: {
          interval: 0,
          rotate: 45,
        },
      },
      yAxis: {
        type: "value",
        name: "异常次数",
      },
      series: [
        {
          name: "异常次数",
          type: "line",
          data: hourlyData,
          smooth: true, // 可以设置为 true 以平滑显示折线
          areaStyle: {}, // 如果需要，可以添加 areaStyle 以填充区域
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3, // 设置线宽
              },
            },
          },
        },
      ],
    };
  };

  return (
    <ReactECharts
      option={getOption()}
      style={{ height: 350, width: "60%", display: "inline-flex" }}
    />
  );
};

export default RoomAlertChart;
