// ElderlyInfo.js
import React, { useState } from 'react';
import { Input, List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import './ElderlyInfo.scss';

const { Search } = Input;

// 搜索框组件
const SearchBar = ({ onSearch }) => {
    return (
        <Search
            placeholder="搜索老人姓名、管理员或房间号"
            onSearch={onSearch}
            className="search-bar"
        />
    );
};

// 老人列表组件
const ElderlyList = ({ data }) => {
    return (
        <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    key={item.id}
                    className={"list-item hover-item"}
                    actions={[<Link to={`/elderly/${item.id}`}>详情</Link>]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} size={64} />}
                        title={
                            <div className="elderly-info">
                                <span>{item.name}</span>
                                <span>管理员: {item.manager}</span>
                            </div>
                        }
                        description={
                            <div className="manager-info">
                                <span>房间: {item.room}</span>
                                <span>电话: {item.phone}</span>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

// 老人信息页面组件
const ElderlyInfo = () => {
    const [searchText, setSearchText] = useState('');

    // 构造10条假数据
    const data = [
        {
            id: 1,
            name: '张三',
            manager: '李四',
            phone: '13812345678',
            room: '101',
            description: '张三是一位和蔼可亲的老人,喜欢下棋和看报。'
        },
        {
            id: 2,
            name: '王五',
            manager: '赵六',
            phone: '13912345678',
            room: '102',
            description: '王五老人性格开朗,喜欢与人聊天。'
        },
        {
            id: 3,
            name: '钱七',
            manager: '孙八',
            phone: '13712345678',
            room: '103',
            description: '钱七老人喜欢养花和散步。'
        },
        {
            id: 4,
            name: '周九',
            manager: '吴十',
            phone: '13612345678',
            room: '104',
            description: '周九老人喜欢打太极拳。'
        },
        {
            id: 5,
            name: '郑一',
            manager: '王二',
            phone: '13512345678',
            room: '105',
            description: '郑一老人喜欢看电视剧。'
        },
        {
            id: 6,
            name: '刘三',
            manager: '李四',
            phone: '13412345678',
            room: '106',
            description: '刘三老人喜欢听戏曲。'
        },
        {
            id: 7,
            name: '陈五',
            manager: '赵六',
            phone: '13312345678',
            room: '107',
            description: '陈五老人喜欢和小孩玩耍。'
        },
        {
            id: 8,
            name: '黄七',
            manager: '孙八',
            phone: '13212345678',
            room: '108',
            description: '黄七老人喜欢画画。'
        },
        {
            id: 9,
            name: '曹九',
            manager: '吴十',
            phone: '13112345678',
            room: '109',
            description: '曹九老人喜欢唱歌。'
        },
        {
            id: 10,
            name: '袁一',
            manager: '王二',
            phone: '13012345678',
            room: '110',
            description: '袁一老人喜欢读书写字。'
        },
    ];

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredData = data.filter(item =>
        item.name.includes(searchText) ||
        item.manager.includes(searchText) ||
        item.room.includes(searchText)
    );

    return (
        <div className="elderly-info-page">
            <SearchBar onSearch={handleSearch}  className="search-container"/>
            <ElderlyList data={filteredData} className="list-container"/>
        </div>
    );
};

export default ElderlyInfo;
