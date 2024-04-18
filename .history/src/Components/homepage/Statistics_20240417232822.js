import React, { useEffect, useRef } from "react";
import _ from "lodash"; // 引入lodash
import "./Statistics.scss";

const Statistics = ({ data }) => {
  // 首先，过滤掉 isCurrent 为 true 的记录，仅保留历史警报
  const historicalData = data.filter((item) => !item.isCurrent);

  // 计算历史警报的总数
  const sum = historicalData.length;

  const prevDataRef = useRef(); // 使用 useRef 来存储上一次的数据

  useEffect(() => {
    // 检查当前数据和前一次数据是否相同
    if (!_.isEqual(prevDataRef.current, historicalData)) {
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
      prevDataRef.current = historicalData; // 更新存储的数据为当前数据
    }
  }, [historicalData]); // 依赖项更新为 historicalData

  return (
    <div className="scontainer">
      <div className="left">
        <div className="left-header">当前共有历史警报</div>
        <div className="left-counter">{sum}</div>
        <div className="left-footer">条</div>
      </div>
      <div className="right">
        {/* 现在计算和展示的是历史警报数据 */}
        {historicalData.map((item, index) => {
          return (
            <div key={index} className="skill-box">
              <span className="title">{item.exceptionInfo}</span>
              <div className="skill-bar">
                {/* 由于没有细分统计，暂时不展示百分比 */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
