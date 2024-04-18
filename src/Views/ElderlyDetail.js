import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Card, Col, Row} from 'antd';
import ReactECharts from 'echarts-for-react';
import request from "../util/api";
import defaultAvatar from '../assets/default-avatar.png';
import moment from 'moment';
import * as heartRateTimesResponse from "browserslist"; // 引入moment处理日期

const ElderlyDetail = () => {
  const elderlyId = useParams().id;
  console.log(elderlyId);
  const [healthData, setHealthData] = useState([]);
  const [elderlyInfo, setElderlyInfo] = useState({ fullName: "加载中...", avatarUrl: defaultAvatar });
  const [heartRateTimes, setHeartRateTimes] = useState([]);
  const [exceptionStats, setExceptionStats] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 同时发起多个请求
        const [tempResponse, healthResponse, infoResponse, exceptionResponse, heartRateTimesResponse] = await Promise.all([
          request.post(`/HealthData/getAvgTemperatureList/${elderlyId}`),
          request.post(`/HealthData/getAvgHealthDataList/${elderlyId}`),
          request.post(`/Resident/getDetailInfo/${elderlyId}`),
          request.post(`/Resident/getExceptionHistoryInfo/${elderlyId}`),
          request.post(`/HealthData/getHeartRateTimes/${elderlyId}`)
        ]);

        // console.log(heartRateTimesResponse);

        // 处理个人和健康数据
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

        const infoData = infoResponse.data;
        setElderlyInfo({
          fullName: `${infoData.firstName} ${infoData.lastName}`,
          gender: infoData.gender,
          age: moment().diff(moment(infoData.dateOfBirth, "YYYY-MM-DD"), 'years'),
          roomNumber: infoData.roomNumber,
          medicalHistory: infoData.notes,
          livingHabits: infoData.habit,
          familyContact: `${infoData.relationship} - ${infoData.emergencyContactPhone}`,
          avatarUrl: infoData.avatarUrl || defaultAvatar
        });

        // 检查心率数据的有效性并更新状态
        if (heartRateTimesResponse.data && Array.isArray(heartRateTimesResponse.data)) {
          setHeartRateTimes(heartRateTimesResponse.data);
        } else {
          console.error('Invalid heart rate times data:', heartRateTimesResponse);
          setHeartRateTimes([]); // 设置为空数组，避免无效数据导致错误
        }

        //设置雷达图数据（老人警报信息次数统计）
        setExceptionStats(exceptionResponse.data);

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
      { name: '体温', type: 'line', data: healthData.map(item => item.bodyTemperature), smooth: true },
      { name: '心率', type: 'line', data: healthData.map(item => item.heartRate) , smooth: true},
      { name: '血氧', type: 'line', data: healthData.map(item => item.oxygenLevel) , smooth: true},
    ]
  });


  const getHeartRateOption = () => {
    // 首先对心率数据进行排序
    const sortedHeartRateTimes = [...heartRateTimes].sort((a, b) => a.heartRate - b.heartRate);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        // 使用已排序的数据来设置x轴
        data: sortedHeartRateTimes.map(item => item.heartRate)
      },
      yAxis: {
        type: 'value',
        name: '次数'
      },
      series: [
        {
          name: '心率出现次数',
          type: 'line',
          smooth:'true',
          // 使用已排序的数据来设置系列数据
          data: sortedHeartRateTimes.map(item => item.times)
        }
      ]
    };
  };


  const getRadarOption = () => {
    const indicators = [
      { name: '心率异常', max: 50 }, // max值根据实际情况调整
      { name: '氧气水平异常', max: 50 },
      { name: '体温异常', max: 50 }
    ];

    return {
      tooltip: {},
      radar: {
        // 指标定义
        indicator: indicators,
        shape: 'circle',
        name: {
          formatter: '【{value}】',
          textStyle: {
            color:'#72ACD1'
          }
        }
      },
      series: [{
        name: '警报统计',
        type: 'radar',
        data: [
          {
            value: [
              exceptionStats.heartExceptionCnt,
              exceptionStats.oxygenLevelExceptionCnt,
              exceptionStats.temperatureExceptionCnt
            ],
            name: '警报次数'
          }
        ],
        areaStyle: {}
      }]
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
        <Card title={'老人警报信息次数统计'}>
          <ReactECharts option={getRadarOption()} style={{ height: 400 }} />
        </Card>
        <Card title={'老人夜间心率情况统计(睡眠反馈)'}>
          <ReactECharts option={getHeartRateOption()} style={{ height: 400 }}/>
        </Card>
      </div>
  );
}

export default ElderlyDetail;
