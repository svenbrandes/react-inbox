const Toolbar = ({composeMsg, toggleSelectAll, markAsRead, unreadMsgCount, deleteMsg, updateLabel, selectedMsgState}) => {

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unreadMsgCount}</span>
                    unread messages
                </p>

                <a className="btn btn-danger" onClick={composeMsg}>
                    <i className="fa fa-plus"></i>
                </a>

                <button className="btn btn-default" onClick={toggleSelectAll}>
                    <i className={`fa fa-${selectedMsgState === "none" ? "" : selectedMsgState === "all" ? "check-" : "minus-"}square-o`}></i>
                </button>

                <button className="btn btn-default" disabled={selectedMsgState === "none"} onClick={() => markAsRead(true)}>
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled={selectedMsgState === "none"} onClick={() => markAsRead(false)}>
                    Mark As Unread
                </button>

                <select className="form-control label-select" disabled={selectedMsgState === "none"} onChange={(e) => updateLabel(e.target.value, true)}>
                    <option value="">Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" disabled={selectedMsgState === "none"} onChange={(e) => updateLabel(e.target.value, false)}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled={selectedMsgState === "none"} onClick={deleteMsg}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;