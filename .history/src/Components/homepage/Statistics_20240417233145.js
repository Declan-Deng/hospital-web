import React, { useEffect, useRef } from "react";
import _ from "lodash"; // 引入lodash
import "./Statistics.scss";

const Statistics = ({ data }) => {
  // 过滤出当前警报的数据
  const currentData = data.filter((item) => item.isCurrent);

  // 计算当前警报的总数
  const sum = currentData.length;

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
        <div className="left-counter">{sum}</div>
        <div className="left-footer">条</div>
      </div>
      <div className="right">
        {currentData.map((item, index) => {
          // 为了简化示例，这里我们只展示警报信息
          return (
            <div key={index} className="skill-box">
              <span className="title">{item.exceptionInfo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
