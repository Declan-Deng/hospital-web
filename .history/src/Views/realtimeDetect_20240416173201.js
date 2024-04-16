import React, { useState, useEffect } from "react";
import "./realtimeDetect.scss";
import { FaTemperatureFull } from "react-icons/fa6";
import { TbDroplets, TbClock } from "react-icons/tb";
import { RiHeartPulseFill } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineBloodtype } from "react-icons/md";
import { InputNumber, Tag, notification } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const RealtimeDetect = () => {
  // const [oldMen, setOldMen] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [residentsInfo, setResidentsInfo] = useState([]);
  const [WetisOn, setWetIsOn] = useState(false);
  const [temperatureTag, setTemperatureTag] = useState("");
  const [humidityTag, setHumidityTag] = useState("");
  const [temperature, setTemperature] = useState("28");
  const [humidity, setHumidity] = useState("50");
  const [residentsHealthData, setResidentsHealthData] = useState({});
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const toggleWetAC = () => {
    // 根据当前状态决定是打开还是关闭加湿器
    if (WetisOn) {
      handleHumidifierOff();
    } else {
      handleHumidifierOn();
    }
  };

  const handleHumidifierOn = async () => {
    try {
      const response = await fetch(
        "https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/HumidifierON",
        { method: "GET" }
      );
      const data = await response.json();
      if (data.code === 200) {
        notification.success({
          message: "加湿器已开启",
          duration: 2.5,
        });
        setWetIsOn(true); // 更新状态以反映加湿器已开启
      } else {
        throw new Error(data.message || "无法开启加湿器");
      }
    } catch (error) {
      notification.error({
        message: "请求错误",
        description: error.message || "网络错误",
        duration: 2.5,
      });
    }
  };

  const handleHumidifierOff = async () => {
    try {
      const response = await fetch(
        "https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/HumidifierOFF",
        { method: "GET" }
      );
      const data = await response.json();
      if (data.code === 200) {
        notification.success({
          message: "加湿器已关闭",
          duration: 2.5,
        });
        setWetIsOn(false); // 更新状态以反映加湿器已关闭
      } else {
        throw new Error(data.message || "无法关闭加湿器");
      }
    } catch (error) {
      notification.error({
        message: "请求错误",
        description: error.message || "网络错误",
        duration: 2.5,
      });
    }
  };

  const handleTemperatureChange = (value) => {
    const temperatureChangeUrl = `https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/TemperatureChange/${value}`;

    fetch(temperatureChangeUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          notification.success({
            message: `温度已更改为${value}度`,
            duration: 2.5,
          });
        } else {
          throw new Error("温度调节失败");
        }
      })
      .catch((error) => {
        notification.error({
          message: "请求错误",
          description: error.message || "网络错误",
          duration: 2.5,
        });
      });
  };

  const toggleAC = () => {
    setIsOn(!isOn);

    const acStateUrl = isOn
      ? "https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/SwitchAirConditionerOFF"
      : "https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/SwitchAirConditionerON";

    // 发送请求来切换空调状态
    fetch(acStateUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          notification.success({
            message: `空调已${isOn ? "关闭" : "打开"}`,
            duration: 2.5,
          });
        } else {
          throw new Error("切换空调状态失败");
        }
      })
      .catch((error) => {
        notification.error({
          message: "请求错误",
          description: error.message || "网络错误",
          duration: 2.5,
        });
        // 如果请求失败，恢复切换前的状态
        setIsOn(isOn);
      });
  };

  useEffect(() => {
    let staffId = localStorage.getItem("userId");
    // 检查 staffId 是否存在并转换为字符串
    if (!staffId) {
      notification.error({
        message: "错误",
        description: "未找到员工ID",
        duration: 2.5,
      });
      return;
    }

    staffId = staffId.toString();

    console.log("Converted staffId to string:", staffId);

    // 构造请求URL
    const url = `https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/getRoomEnvironment/${staffId}`;

    // 发送 POST 请求
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ staffId: staffId }), // 确保发送的数据体中 staffId 是字符串
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setTemperature(data.data.temperature.toFixed(2));
          setHumidity(data.data.humidity.toFixed(2));
        } else {
          throw new Error(data.message || "获取数据失败");
        }
      })
      .catch((error) => {
        notification.error({
          message: "请求错误",
          description: error.message || "网络错误",
          duration: 2.5,
        });
      });
  }, []);

  useEffect(() => {
    const staffId = localStorage.getItem("userId");
    if (!staffId) {
      notification.error({
        message: "错误",
        description: "未找到员工ID",
        duration: 2.5,
      });
      return;
    }

    const fetchEnvironmentData = () => {
      const url = `https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/getRoomEnvironment/${staffId}`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId: staffId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            setTemperature(data.data.temperature.toFixed(2));
            setHumidity(data.data.humidity.toFixed(2));
          } else {
            throw new Error(data.message || "获取数据失败");
          }
        })
        .catch((error) => {
          notification.error({
            message: "请求错误",
            description: error.message || "网络错误",
            duration: 2.5,
          });
        });
    };

    // Initial fetch
    fetchEnvironmentData();

    // Set up the interval
    const intervalId = setInterval(fetchEnvironmentData, 5000);

    // Clean-up function
    return () => clearInterval(intervalId);
  }, []); // Make sure the effect runs only once when the component mounts

  useEffect(() => {
    if (residentsInfo.length > 0) {
      const fetchHealthDataForAll = () => {
        residentsInfo.forEach((resident) => {
          const url = `https://n58mgwvs5a83.hk1.xiaomiqiu123.top/RoomData/getResidentHealthData/${resident.residentId}`;
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ residentId: resident.residentId }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.code === 200) {
                setResidentsHealthData((prevData) => ({
                  ...prevData,
                  [resident.residentId]: data.data,
                }));
              } else {
                throw new Error(data.message || "获取健康数据失败");
              }
            })
            .catch((error) => {
              notification.error({
                message: "请求错误",
                description: error.message || "网络错误",
                duration: 2.5,
              });
            });
        });
      };

      // Initial fetch
      fetchHealthDataForAll();

      // Set up the interval
      const intervalId = setInterval(fetchHealthDataForAll, 5000);

      // Clean-up function
      return () => clearInterval(intervalId);
    }
  }, [residentsInfo]); // React to changes in residentsInfo

  useEffect(() => {
    let tempTag = "";
    let humTag = "";

    // 计算温度适宜性标签
    const tempValue = parseFloat(temperature);
    if (tempValue >= 23 && tempValue <= 27) {
      tempTag = "温度适宜";
    } else if (tempValue < 23) {
      tempTag = "温度偏低";
    } else if (tempValue > 27) {
      tempTag = "温度偏高";
    }

    // 计算湿度适宜性标签
    const humValue = parseFloat(humidity);
    if (humValue >= 40 && humValue <= 70) {
      humTag = "湿度适宜";
    } else if (humValue < 40) {
      humTag = "湿度偏低";
    } else if (humValue > 70) {
      humTag = "湿度偏高";
    }

    setTemperatureTag(tempTag);
    setHumidityTag(humTag);
  }, [temperature, humidity]);

  useEffect(() => {
    // 模拟从后端获取数据
    // setOldMen(mockData);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // 每秒更新时间
    }, 1000);

    return () => clearInterval(timer); // 清除定时器
  }, []);

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
            <p className="time">
              <TbClock />
              当前时间：{currentTime}
            </p>
          </div>
        </h1>
        <div className="envoBar">
          <div className="envoDisplayPart">
            <FaTemperatureFull style={{ fontSize: "50px", color: "#8beb68" }} />
            <div className="envoText">
              <p>当前室内温度</p>
              <p>{temperature} 度</p>
              <Tag color={temperatureTag === "温度适宜" ? "success" : "error"}>
                {temperatureTag}
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
                  onChange={handleTemperatureChange}
                />
              </div>
            </div>
          </div>
          <div className="envoDisplayPart">
            <TbDroplets style={{ fontSize: "50px", color: "#2992ff" }} />
            <div className="envoText">
              <p>当前室内湿度</p>
              <p>{humidity} %</p>
              <Tag color={humidityTag === "湿度适宜" ? "success" : "error"}>
                {humidityTag}
              </Tag>
            </div>
            <div
              className={`switchButton humidifierButton ${
                WetisOn ? "on" : "off"
              }`}
              onClick={toggleWetAC}
            >
              <p>{WetisOn ? "加湿器已开启" : "加湿器已关闭"}</p>
            </div>
          </div>
        </div>
        <h1 className="textBar">该房间老人情况实时显示</h1>

        <div className="oldmanArea">
          {residentsInfo.map((resident) => (
            <div className="oldmanDisplayPart" key={resident.residentId}>
              <div className="bedPart">
                <div>
                  <LuUser2 style={{ fontSize: "20px", color: "gray" }} />
                </div>
                <p>{`${resident.firstName} ${resident.lastName}`}</p>
              </div>
              <div className="oldInfoDisplay">
                <div className="oldInfoDisplayPart">
                  <p>体温</p>
                  <div className="oldInfoDisplayPart-sm">
                    <FaTemperatureFull color="#c691ad" />
                    <p style={{ color: "#8e5b77" }}>
                      {residentsHealthData[resident.residentId]?.temperature}°C
                    </p>
                  </div>
                </div>

                <div className="oldInfoDisplayPart">
                  <p>心率</p>
                  <div className="oldInfoDisplayPart-sm">
                    <RiHeartPulseFill color="#fc8379" />
                    <p style={{ color: "#cf5553" }}>
                      {residentsHealthData[resident.residentId]?.heartRate}次
                    </p>
                  </div>
                </div>

                <div className="oldInfoDisplayPart">
                  <p>血氧</p>
                  <div className="oldInfoDisplayPart-sm">
                    <MdOutlineBloodtype color="#a6b8e1" />
                    <p style={{ color: "#5a7297" }}>
                      {residentsHealthData[resident.residentId]?.oxygenLevel}%
                    </p>
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
