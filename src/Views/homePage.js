import WorkBench from "../Components/personalInformation";
import ElderlyAlertCard from "../Components/homepage/ElderlyAlertCard";
import request from "../util/request";
import { useEffect, useState } from "react";
import "./homePage.scss";
import RoomAlertChart from "../Components/homepage/RoomAlertChart";
import AlertTypeRadarChart from "../Components/homepage/AlertTypeRadarChart";
import Statistics from "../Components/homepage/Statistics";

const alertData = [{
    "firstName": "果起已记",
    "exceptionEndTime": "2010-06-16 15:03:17",
    "exceptionInfo": "quis Excepteur",
    "exceptionStartTime": "2008-11-18 04:08:54",
    "residentId": 20,
    "roomNumber": "51",
    "lastName": "厂必列定近约",
    "isCurrent": true
},
    {
        "firstName": "所圆只",
        "exceptionEndTime": "1993-04-18 10:07:57",
        "exceptionInfo": "amet",
        "exceptionStartTime": "1979-10-12 10:22:39",
        "residentId": 90,
        "roomNumber": "10",
        "lastName": "点技龙程品",
        "isCurrent": false
    },
    {
        "firstName": "效各文头济",
        "exceptionEndTime": "2009-08-03 14:53:09",
        "exceptionInfo": "ut amet do ullamco esse",
        "exceptionStartTime": "1973-01-05 10:39:18",
        "residentId": 46,
        "roomNumber": "51",
        "lastName": "收响马电更",
        "isCurrent": true
    }]

const statisticsData = {
    all: 10,
    list: {
        "心率": 3,
        "体温": 4,
        "血氧": 6
    }
}

const homePage = () => {
    return (
        <div className={"container"}>
            <WorkBench></WorkBench>
            <div className={"alert"}>
                <Statistics data={statisticsData}></Statistics>
                {
                    alertData.map((data, index) => (
                        <ElderlyAlertCard key={index} data={data}></ElderlyAlertCard>
                    ))
                }
            </div>
            <div className={"charts"}>
                <RoomAlertChart></RoomAlertChart>
                <AlertTypeRadarChart></AlertTypeRadarChart>
            </div>

        </div>
    );
}

export default homePage;
