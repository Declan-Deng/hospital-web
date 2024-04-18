import React, { useEffect, useRef } from "react";
import _ from "lodash"; // 引入lodash
import "./Statistics.scss";

const Statistics = ({ data }) => {
  const currentAlerts = data.filter((item) => item.isCurrent);

  const sum = Object.values(data.list).reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );
  const prevDataRef = useRef(); // 使用 useRef 来存储上一次的数据

  useEffect(() => {
    // 检查当前数据和前一次数据是否相同
    if (!_.isEqual(prevDataRef.current, data)) {
      const tooltips = document.querySelectorAll(".tooltip");
      tooltips.forEach((tooltip) => {
        const rect = tooltip.getBoundingClientRect();
        if (rect.left < 210) {
          const currentTop = tooltip.style.top
            ? parseInt(tooltip.style.top, 10)
            : -28; // 使用初始top值或者默认值
          tooltip.style.top = `${currentTop - 20}px`; // 上浮20px
        }
      });
      prevDataRef.current = data; // 更新存储的数据为当前数据
    }
  }, [data]); // 依赖项仍然是 data，但是实际触发条件已经变更为数据内容的改变

  return (
    <div className="scontainer">
      <div className="left">
        <div className="left-header">当前共有实时报警</div>
        <div className="left-counter">{data.all}</div>
        <div className="left-footer">条</div>
      </div>
      <div className="right">
        {Object.entries(data.list).map(([key, value], index) => {
          // 计算当前值占总和的百分比
          const widthPercent = ((value / sum) * 100).toFixed(2); // 保留两位小数
          return (
            <div key={index} className="skill-box">
              <span className="title">{key}</span>
              <div className="skill-bar">
                <span
                  className="skill-per"
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="tooltip">{`${value}条 (占${widthPercent}%)`}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
