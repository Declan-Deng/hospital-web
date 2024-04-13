import React from 'react';
import { Avatar, Typography, Button } from 'antd';
import './WorkBench.scss';

const { Text } = Typography;

const WorkBench = () => {
    const user = {
        name: '张三',
        title: '前端开发工程师',
        lastLoginTime: '2023-04-10 14:30:00',
    };

    const handleSwitchAccount = () => {
        // 切换账号的逻辑
    };

    const handleLogout = () => {
        // 退出登录的逻辑
    };

    return (
        <div className="workbench">
            <div className="workbench-left">
                <Avatar size={64} src={user.avatar} />
            </div>
            <div className="workbench-center">
                <Text>欢迎回来,{user.name}!</Text>
                <Text type="secondary">
                    最近登录时间:{user.lastLoginTime}
                </Text>
                <Text type="secondary">职称:{user.title}</Text>
            </div>
            <div className="workbench-right">
                <Button type="link" onClick={handleSwitchAccount}>
                    切换账号
                </Button>
                <Button type="link" onClick={handleLogout}>
                    退出登录
                </Button>
            </div>
        </div>
    );
};

export default WorkBench;
