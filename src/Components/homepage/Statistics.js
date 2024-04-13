import "./Statistics.scss"

const Statistics = ({ data }) => {
    // 计算总和
    const sum = Object.values(data.list).reduce((acc, currentValue) => acc + currentValue, 0);
    return (
        <div className="scontainer">
            <div className="left">
                <div className="left-header">实时报警</div>
                <div className="left-counter">{data.all}</div>
                <div className="left-footer">位</div>
            </div>
            <div className="right">
            {Object.entries(data.list).map(([key, value], index) => {
                    // 计算当前值占总和的百分比
                    const widthPercent = (value / sum * 100).toFixed(2); // 保留两位小数
                    return (
                        <div key={index} className="skill-box">
                            <span className="title">{key}</span>
                            <div className="skill-bar">
                                <span className="skill-per" style={{ width: `${widthPercent}%` }}>
                                    <span className="tooltip">{`${value}位 (占${widthPercent}%)`}</span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default Statistics;
