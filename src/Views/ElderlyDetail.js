import React from 'react';
import { Card, Col, Row, Avatar } from 'antd';
import ReactECharts from 'echarts-for-react';
import defaultAvatar from '../assets/default-avatar.png';

const ElderlyDetail = () => {
  const fullName = "张 三";
  const avatarUrl = defaultAvatar;

  // 假设的数据生成
  const generateFakeData = () => {
    let data = [];
    for (let i = 0; i < 16; i++) {
      data.push({
        day: i,
        heartRate: 60 + Math.random() * 20,
        temperature: 36.5 + Math.random() * 1,
        oxygenLevel: 90 + Math.random() * 10,
      });
    }
    return data;
  };

  const healthData = generateFakeData();

  const getLineOption = () => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['心率', '体温', '血氧']
      },
      xAxis: {
        type: 'category',
        data: healthData.map(item => `第${item.day}天`)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '心率',
          type: 'line',
          data: healthData.map(item => item.heartRate)
        },
        {
          name: '体温',
          type: 'line',
          data: healthData.map(item => item.temperature)
        },
        {
          name: '血氧',
          type: 'line',
          data: healthData.map(item => item.oxygenLevel)
        }
      ]
    };
  };

  const getRadarOption = () => {
    return {
      radar: {
        indicator: [
          { name: '心率', max: 20 },
          { name: '体温', max: 20 },
          { name: '血氧', max: 20 }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: [12, 16, 14],
          name: '报警次数'
        }]
      }]
    };
  };

  return (
    <div>
      <Card title={`基本信息 - ${fullName}`}>
          <Row gutter={16}>
              <Col span={3}>
                  <Avatar size={64} src={avatarUrl}/>
              </Col>
              <Col span={21}>
                  <p><strong>姓名:</strong> {fullName}</p>
              </Col>
          </Row>
      </Card>
      <Card title={'老人各指标统计图'}>
          <ReactECharts option={getLineOption()} style={{ height: 400 }}/>
      </Card>
      <Card title={'老人报警信息统计'}>
          <ReactECharts option={getRadarOption()} style={{ height: 400 }}/>
      </Card>
    </div>
  );
}

export default ElderlyDetail;
