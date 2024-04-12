import React from 'react';
import { Card, Button } from 'antd';

const ElderlyAlertCard = ({ data }) => {
    const {
        firstName,
        lastName,
        roomNumber,
        exceptionInfo,
        exceptionStartTime,
        isCurrent,
        avatar
    } = data;

    const fullName = `${firstName} ${lastName}`;
    const formattedTime = exceptionStartTime;

    const alertStyle = {
        color: isCurrent ? 'red' : 'black',
        fontWeight: isCurrent ? 'bold' : 'normal'
    };

    // 处理头像URL，如果没有提供则使用默认图片
    let defaultAvatar = import ('../../assets/default-avatar.png');
    const avatarUrl = avatar || defaultAvatar;

    return (
        <Card
            title={`警报信息 - ${fullName}`}
            extra={<Button type="primary" onClick={() => console.log('解除警报')}>解除警报</Button>}
            style={{ width: 300, margin: '20px' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={avatarUrl} alt="头像" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>
                    <p><strong>姓名:</strong> {fullName}</p>
                    <p><strong>房间号:</strong> {roomNumber}</p>
                </div>
            </div>
            <p><strong>警报时间:</strong> {formattedTime}</p>
            <p><strong>警报信息:</strong> <span style={alertStyle}>{exceptionInfo}{isCurrent ? ' - 请及时处理' : ''}</span></p>
        </Card>
    );
};

export default ElderlyAlertCard;
