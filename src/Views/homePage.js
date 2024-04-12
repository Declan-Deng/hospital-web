import WorkBench from "../Components/personalInformation";
import ElderlyAlertCard from "../Components/homepage/ElderlyAlertCard";
import request from "../util/request";
import { useEffect, useState } from "react";


const alertData = {
    firstName: "Eawen",
    lastName: "Chao",
    roomNumber: "A410",
    residentId: 2,
    exceptionStartTime: "2024-04-11 19:06:45",
    exceptionInfo: "心率异常",
    exceptionEndTime: null,
    isCurrent: true,
};

const homePage = () => {
    return (
        <div>
            <WorkBench></WorkBench>
            <ElderlyAlertCard data={alertData}></ElderlyAlertCard>
        </div>
    );
}

export default homePage;
