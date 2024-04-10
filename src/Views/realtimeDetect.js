import  React from 'react';
import './realtimeDetect.scss';
import imageSrc1 from "../Images/wendu.png"
import imageSrc2 from "../Images/shidu.png"
import imageSrc3 from "../Images/xinshuai.png"
import imageSrc4 from "../Images/血氧.png"

import {
UserOutlined
} from "@ant-design/icons";


const realtimeDetect = () => {
    return (
        <>
            <h1 className="textBar">室内环境实时显示</h1>
            <div className="envoBar">
                <div className="envoDisplayPart">
                    <img src={imageSrc1}/>
                    <div className="envoText">
                        <p>当前室内温度：</p>
                        <p>28 度</p>
                    </div>
                </div>
                <div className="envoDisplayPart">
                    <img src={imageSrc2}/>
                    <div className="envoText">
                        <p>当前室内湿度：</p>
                        <p>50 %</p>
                    </div>
                </div>
            </div>
            <h1 className="textBar">该房间老人情况实时显示</h1>

            <div className="oldmanArea">
            <div className="oldmanDisplayPart">

                <UserOutlined  style={{ fontSize: '50px' }} />
                <p> x 号床</p>

                <div className="oldInfoDisplay">

                    <div className="oldInfoDisplayPart">
                        <p>体温</p>
                        <div className="oldInfoDisplayPart-sm">
                            <img src={imageSrc1}/>
                            <p>36.5度</p>
                        </div>
                    </div>

                    <div className="oldInfoDisplayPart">
                        <p>心率</p>
                        <div className="oldInfoDisplayPart-sm">
                            <img src={imageSrc3}/>
                            <p>36.5度</p>
                        </div>
                    </div>

                    <div className="oldInfoDisplayPart">
                        <p>血氧</p>
                        <div className="oldInfoDisplayPart-sm">
                            <img src={imageSrc4}/>
                            <p>36.5度</p>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </>
    );
}

export default realtimeDetect;
