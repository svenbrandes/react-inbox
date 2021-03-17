const Message = ({id, subject, read, starred, selected, labels, toggleValue}) => {
    return (
        <div className={`row message ${read?"read":"unread"} ${selected?"selected":""}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" checked={selected?"checked":""} onClick={() => toggleValue("selected", id)}/>
                    </div>
                    <div className="col-xs-2">
                        <i className={`star fa fa-star${starred?"":"-o"}`} onClick={() => toggleValue("starred", id)}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {labels.map((label, i) => <span className="label label-warning" key={i}>{label}</span> )}
                <a href="#">
                    {subject}
                </a>
            </div>
        </div>
    )
}

export default Message;