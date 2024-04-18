// ElderlyInfo.js
import React, {useEffect, useState} from 'react';
import { Input, List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import './ElderlyInfo.scss';
import request from "../util/api";


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
                                <span>护理师: {item.manager}</span>
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
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.post('/Resident/pageSelect');  // 直接使用 request.get 获取数据
                const transformedData = response.data.map(item => ({
                    id: item.residentId,
                    name: `${item.firstName} ${item.lastName}`,
                    manager: item.residentMedicalStaffVO.staffName,
                    phone: item.residentMedicalStaffVO.phone,
                    room: item.roomNumber
                }));
                setData(transformedData);  // 使用转换后的数据更新状态
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        fetchData().then(r => {});  // 组件挂载时立即执行一次
        const intervalId = setInterval(fetchData, 5000);  // 每5秒请求一次数据

        return () => clearInterval(intervalId);  // 清理定时器
    }, []);

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
            <SearchBar onSearch={handleSearch} className="search-container" />
            <ElderlyList data={filteredData} className="list-container" />
        </div>
    );
};

export default ElderlyInfo;


