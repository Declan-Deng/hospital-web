import React from 'react';
import { Card, Button, Avatar } from 'antd';
import defaultAvatar from '../../assets/default-avatar.png';
import styles from './ElderlyAlertCard.scss'; // Importing the CSS module

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
    const alertClass = () => isCurrent ? 'alertClass' : '';
    const alertCard = () => isCurrent ? 'alertCard' : '';
    const avatarUrl = avatar || defaultAvatar;

    return (
        <Card
            title={`警报信息 - ${fullName}`}
            extra={<Button type="primary" onClick={() => console.log('解除警报')}>解除警报</Button>}
            className={['elderly-alert-card', alertCard()]}
        >
            <div className='elderly-alert-card__details'>
                <Avatar size={64} src={avatarUrl} className='elderly-alert-card__avatar'/>
                <div>
                    <p className='elderly-alert-card__name'><strong>姓名:</strong> {fullName}</p>
                    <p className='elderly-alert-card__room'><strong>房间号:</strong> {roomNumber}</p>
                </div>
            </div>
            <p><strong>警报时间:</strong> {formattedTime}</p>
            <p><strong>警报信息:</strong> <span className={alertClass()}>{exceptionInfo}{isCurrent ? ' - 请及时处理' : ''}</span></p>
        </Card>
    );
};

export default ElderlyAlertCard;
