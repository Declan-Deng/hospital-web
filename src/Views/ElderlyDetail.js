import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Avatar } from 'antd';
import ReactECharts from 'echarts-for-react';
import request from "../util/api";
import defaultAvatar from '../assets/default-avatar.png';
import moment from 'moment';  // 引入moment处理日期

const ElderlyDetail = () => {
  const elderlyId = useParams().id;
  console.log(elderlyId);
  const [healthData, setHealthData] = useState([]);
  const [elderlyInfo, setElderlyInfo] = useState({ fullName: "加载中...", avatarUrl: defaultAvatar });
  const [yesterdayInfo, setYesterdayInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 同时发起三个请求：健康数据和老人基本信息
        const [tempResponse, healthResponse, infoResponse, exceptionResponse, yesterdayInfoResponse] = await Promise.all([
          request.post(`/HealthData/getAvgTemperatureList/${elderlyId}`),
          request.post(`/HealthData/getAvgHealthDataList/${elderlyId}`),
          request.post(`Resident/getDetailInfo/${elderlyId}`),
          request.post(`Resident/getExceptionHistoryInfo/${elderlyId}`),
          request.post(`HealthData/getYesterdayHealthDataList/${elderlyId}`)
        ]);

        // console.log(tempResponse);
        // console.log(healthResponse);
        // console.log(infoResponse);
        console.log(yesterdayInfoResponse);

        // 处理健康数据
        const temperatureData = tempResponse.data;
        const healthData = healthResponse.data;
        const combinedData = temperatureData.map(temp => {
          const health = healthData.find(h => h.time === temp.time) || {};
          return {
            time: temp.time,
            bodyTemperature: temp.bodyTemperature,
            heartRate: health.heartRate || null,
            oxygenLevel: health.oxygenLevel || null
          };
        });

        setHealthData(combinedData);

        // 处理个人信息
        const infoData = infoResponse.data;
        setElderlyInfo({
          fullName: `${infoData.firstName} ${infoData.lastName}`,
          gender: infoData.gender,
          age: moment().diff(moment(infoData.dateOfBirth, "YYYY-MM-DD"), 'years'),  // 计算年龄
          roomNumber: infoData.roomNumber,
          medicalHistory: infoData.notes,
          livingHabits: infoData.habit,
          familyContact: `${infoData.relationship} - ${infoData.emergencyContactPhone}`,
          avatarUrl: infoData.avatarUrl || defaultAvatar  // 使用默认头像作为备选
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };




    fetchData();
  }, [elderlyId]);

  // 图表配置函数
  const getLineOption = () => ({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['体温', '心率', '血氧']
    },
    xAxis: {
      type: 'category',
      data: healthData.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      { name: '体温', type: 'line', data: healthData.map(item => item.bodyTemperature) },
      { name: '心率', type: 'line', data: healthData.map(item => item.heartRate) },
      { name: '血氧', type: 'line', data: healthData.map(item => item.oxygenLevel) }
    ]
  });

  const getLineOptionforYesterday = (yesterdayInfoResponse) => {

    const parsedData = yesterdayInfoResponse.data;

    // 提取每个条目的时间、心率和血氧
    const timeData = parsedData.map(entry => moment(entry.time).format('HH:mm'));
    const heartRateData = parsedData.map(entry => entry.heartRate);
    const oxygenLevelData = parsedData.map(entry => entry.oxygenLevel);

    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['心率', '血氧']
      },
      xAxis: {
        type: 'category',
        data: timeData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '心率',
          type: 'line',
          data: heartRateData,
          smooth: true,
          color: 'red'  // 红色用于表示心率线
        },
        {
          name: '血氧',
          type: 'line',
          data: oxygenLevelData,
          smooth: true,
          color: 'blue'  // 蓝色用于表示血氧线
        }
      ]
    };
  };


  return (
      <div>
        <Card title={`基本信息 - ${elderlyInfo.fullName}`} >
          <Row gutter={16}>
            <Col span={3}>
              <Avatar size={64} src={elderlyInfo.avatarUrl}/>
            </Col>
            <Col span={21}>
              <p><strong>姓名:</strong> {elderlyInfo.fullName}</p>
              <p><strong>性别:</strong> {elderlyInfo.gender}</p>
              <p><strong>年龄:</strong> {elderlyInfo.age}</p>
              <p><strong>房间号:</strong> {elderlyInfo.roomNumber}</p>
              <p><strong>病史:</strong> {elderlyInfo.medicalHistory}</p>
              <p><strong>食宿习惯:</strong> {elderlyInfo.livingHabits}</p>
              <p><strong>家属联系方式:</strong> {elderlyInfo.familyContact}</p>
            </Col>
          </Row>
        </Card>
        <Card title={'老人各指标统计图'}>
          <ReactECharts option={getLineOption()} style={{ height: 400 }}/>
        </Card>
        <Card title={'老人警报信息次数统计'}></Card>
        <Card title={'该老人昨日分时报警信息次数统计折线图'}>
          <ReactECharts option={getLineOption()} style={{ height: 400 }}/>
        </Card>
      </div>
  );
}

export default ElderlyDetail;
