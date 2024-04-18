import React, { useEffect, useState } from "react";
import request from "../util/api";
import WorkBench from "../Components/personalInformation";
import ElderlyAlertCard from "../Components/homepage/ElderlyAlertCard";
import RoomAlertChart from "../Components/homepage/RoomAlertChart";
import AlertTypeRadarChart from "../Components/homepage/AlertTypeRadarChart";
import Statistics from "../Components/homepage/Statistics";
import "./homePage.scss";

const HomePage = () => {
  const [alertData, setAlertData] = useState([]); // 初始状态为空数组
  const [staffName, setStaffName] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        localStorage.setItem("userId", 2);
        console.log("Fetching data");
        console.log("Fetched userId: " + localStorage.getItem("userId"));
        const staffId = localStorage.getItem("userId"); // 从 localStorage 中获取用户 ID
        const staffName = localStorage.getItem("staffName");
        const level = localStorage.getItem("level");
        setStaffName(staffName);
        setLevel(level);
        console.log("Retrieved level:", level);
        if (!staffId) {
          console.error("No staff ID found");
          return;
        }
        const response = await request.get(
          `/MedicalStaff/exception/${staffId}`
        );
        console.log(response.data);
        setAlertData(response.data); // 假设后端返回的数据格式是直接可用的
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData(); // 组件加载时立即获取一次数据

    const intervalId = setInterval(fetchData, 5000); // 每五秒获取一次数据

    return () => clearInterval(intervalId); // 组件卸载时清理定时器
  }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

  const currentAlerts = alertData.filter((alert) => alert.isCurrent);

  const countTypes = alertData.reduce((acc, alert) => {
    const type = alert.exceptionInfo;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const roomNumber = "A410";
  const targetDate = new Date("2024-04-11"); // 默认今天，计算昨天的数据

  return (
    <div className={"container"}>
      <WorkBench staffName={staffName} level={level} />
      <p className="titleAlert">实时报警</p>
      <div className={"alert"}>
        <Statistics
          data={{ all: currentAlerts.length, list: countTypes }}
        ></Statistics>

        {alertData
          .filter((data) => data.isCurrent)
          .map((data, index) => (
            <ElderlyAlertCard
              key={index}
              data={data}
              className="current" // 因为我们只渲染 isCurrent 为 true 的，所以可以直接设置为 "current"
            ></ElderlyAlertCard>
          ))}
      </div>
      <p className="titleAlertX">历史预警</p>
      <div className="alert-history">
        {alertData
          .filter((data) => !data.isCurrent)
          .map((data, index) => (
            <ElderlyAlertCard
              key={index}
              data={data}
              className="not-current" // 因为我们只渲染 isCurrent 为 true 的，所以可以直接设置为 "current"
            ></ElderlyAlertCard>
          ))}
      </div>
      <p className="titleAlertY">统计数据显示</p>
      <div className={"charts"}>
        <RoomAlertChart
          data={alertData}
          roomNumber={roomNumber}
          targetDate={targetDate}
        />
        <AlertTypeRadarChart data={alertData} roomNumber={roomNumber} />
      </div>
    </div>
  );
};

export default HomePage;
