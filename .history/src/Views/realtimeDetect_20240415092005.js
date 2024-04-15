import React, { useState, useEffect } from "react";
import "./realtimeDetect.scss";
import { FaTemperatureFull } from "react-icons/fa6";
import { TbDroplets, TbClock } from "react-icons/tb";
import { RiHeartPulseFill } from "react-icons/ri";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBloodtype } from "react-icons/md";
import { InputNumber, tag } from "antd";

const mockData = [
  {
    id: 1,
    bedNumber: "1号床",
    temperature: "36.5度",
    heartRate: "75次",
    bloodOxygen: "98%",
  },
  {
    id: 2,
    bedNumber: "1号床",
    temperature: "36.5度",
    heartRate: "75次",
    bloodOxygen: "98%",
  },
  {
    id: 3,
    bedNumber: "1号床",
    temperature: "36.5度",
    heartRate: "75次",
    bloodOxygen: "98%",
  },
  {
    id: 4,
    bedNumber: "1号床",
    temperature: "36.5度",
    heartRate: "75次",
    bloodOxygen: "98%",
  },
  {
    id: 5,
    bedNumber: "1号床",
    temperature: "36.5度",
    heartRate: "75次",
    bloodOxygen: "98%",
  },
  {
    id: 6,
    bedNumber: "1号床",
    temperature: "36.5度",
    heartRate: "75次",
    bloodOxygen: "98%",
  },
  // 添加更多老人的信息...
];

const RealtimeDetect = () => {
  const [oldMen, setOldMen] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [WetisOn, setWetIsOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    // 模拟从后端获取数据
    setOldMen(mockData);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // 每秒更新时间
    }, 1000);

    return () => clearInterval(timer); // 清除定时器
  }, []);

  const toggleAC = () => {
    setIsOn(!isOn);
  };

  const toggleWetAC = () => {
    setWetIsOn(!WetisOn);
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="background">
        <h1 className="textBar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>室内环境实时显示</p>{" "}
            <p className="time">当前时间：{currentTime}</p>
          </div>
        </h1>
        <div className="envoBar">
          <div className="envoDisplayPart">
            <FaTemperatureFull style={{ fontSize: "50px", color: "#8beb68" }} />
            <div className="envoText">
              <p>当前室内温度</p>

              <p>28 度</p>
              <Tag icon={<CheckCircleOutlined />} color="success">
                success
              </Tag>
            </div>
            <div
              className={`switchButton ${isOn ? "on" : "off"}`}
              onClick={toggleAC}
            >
              <p>{isOn ? "空调已开启" : "空调已关闭"}</p>
              <div onClick={handleInputClick}>
                <InputNumber
                  size="large"
                  min={20}
                  max={30}
                  defaultValue={26}
                  disabled={!isOn}
                />
              </div>
            </div>
          </div>
          <div className="envoDisplayPart">
            <TbDroplets style={{ fontSize: "50px", color: "#2992ff" }} />
            <div className="envoText">
              <p>当前室内湿度</p>
              <p>50 %</p>
            </div>
            <div
              className={`switchButton humidifierButton ${
                WetisOn ? "on" : "off"
              }`}
              onClick={toggleWetAC}
            >
              <p>{WetisOn ? "加湿器已开启" : "加湿器已关闭"}</p>
              <div onClick={handleInputClick}>
                <InputNumber
                  size="large"
                  min={0}
                  max={100}
                  step={10}
                  defaultValue={50}
                  disabled={!WetisOn}
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="textBar">该房间老人情况实时显示</h1>

        <div className="oldmanArea">
          {oldMen.map((oldMan) => (
            <div className="oldmanDisplayPart" key={oldMan.id}>
              <div className="bedPart">
                <div>
                  <LuBedSingle style={{ fontSize: "20px" }} />
                </div>
                <p>{oldMan.bedNumber}</p>
              </div>
              <div className="oldInfoDisplay">
                <div className="oldInfoDisplayPart">
                  <p>体温</p>
                  <div className="oldInfoDisplayPart-sm">
                    <FaTemperatureFull color="#c691ad" />
                    <p style={{ color: "#8e5b77" }}>{oldMan.temperature}</p>
                  </div>
                </div>

                <div className="oldInfoDisplayPart">
                  <p>心率</p>
                  <div className="oldInfoDisplayPart-sm">
                    <RiHeartPulseFill color="#fc8379" />
                    <p style={{ color: "#cf5553" }}>{oldMan.heartRate}</p>
                  </div>
                </div>

                <div className="oldInfoDisplayPart">
                  <p>血氧</p>
                  <div className="oldInfoDisplayPart-sm">
                    <MdOutlineBloodtype color="#a6b8e1" />
                    <p style={{ color: "#5a7297" }}>{oldMan.bloodOxygen}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RealtimeDetect;
