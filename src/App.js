import React, {Component} from 'react';
import './App.css';
import Toolbar from "./components/Toolbar";
import Messages from "./components/Messages";
import ComposeForm from "./components/ComposeForm";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            composing: false
        }
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:8082/api/messages");
        const messages = await response.json();
        this.setState({messages: messages});
    }

    updateMails = async (msgIdAsArray, command, val) => {
        fetch('http://localhost:8082/api/messages', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "messageIds": msgIdAsArray,
                "command": command,
                [command===("addLabel"||"removeLabel")?"label":
                    command]: val
            })
        });
    }

    sendMail = async (msgToSend) => {
        const response = await fetch('http://localhost:8082/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "subject": msgToSend.subject,
                "body": msgToSend.body
            })
        });
        const message = await response.json();
        this.setState({composing: false, messages: [...this.state.messages, message]});
    }


    toggleValue = (val, id) => {
        if(val==="starred") this.updateMails([id], "star");
        const indexOfMessage = this.state.messages.findIndex(message => message.id == id);
        const messages = [...this.state.messages];
        messages[indexOfMessage][val] = !messages[indexOfMessage][val];
        this.setState({messages: messages});
    }

    toggleSelectAll = () => {
        const messages = [...this.state.messages];
        messages.filter(msg => msg.selected).length === messages.length ?
            messages.forEach(msg => msg.selected = false) :
            messages.forEach(msg => msg.selected = true);
        this.setState({messages: messages});
    }

    toggleComposeMode = () => this.setState({composing: !this.state.composing});

    markAsRead = (isRead) => {
        const selectedMsgIds = [...this.state.messages.filter(msg => msg.selected)].reduce((acc, cur) => acc.concat(cur.id), []);
        this.updateMails(selectedMsgIds, "read", isRead);
        const messages = [...this.state.messages];
        messages.forEach(message => {
            if(message.selected) {
                message.read = isRead;
            }
        })
        this.setState({messages: messages});
    }

    countUnreadMessages = () => this.state.messages.filter(message => !message.read).length;


    deleteSelectedMessages = () => {
        const selectedMsgIds = [...this.state.messages.filter(msg => msg.selected)].reduce((acc, cur) => acc.concat(cur.id), []);
        this.updateMails(selectedMsgIds, "delete");
        this.setState({messages: [...this.state.messages.filter(message => !message.selected)]});
    }

    updateLabel = (val, isAdded) => {
        const messages = [...this.state.messages];
        messages.forEach(message => {
            if(message.selected && isAdded && !message.labels.includes(val)) {
                this.updateMails([message.id], "addLabel", val);
                message.labels = [...message.labels, val];
            } else if (message.selected && !isAdded && message.labels.includes(val)) {
                this.updateMails([message.id], "removeLabel", val);
                message.labels = message.labels.filter(label => label !== val);
            }
        })
        this.setState({messages: messages});
    }

    selectedMsgState = () => {
        const countOfSelectedMessages = this.state.messages.filter(message => message.selected).length;
        const countOfTotalMessages = this.state.messages.length;
        return countOfSelectedMessages === 0 ? "none" : countOfSelectedMessages === countOfTotalMessages ? "all" : "some";
    }

    render() {
        return (
            <div className="App">
                <Toolbar composeMsg={this.toggleComposeMode}
                         toggleSelectAll={this.toggleSelectAll}
                         markAsRead={this.markAsRead}
                         unreadMsgCount={this.countUnreadMessages()}
                         deleteMsg={this.deleteSelectedMessages}
                         updateLabel={this.updateLabel}
                         selectedMsgState={this.selectedMsgState()}/>
                {this.state.composing?<ComposeForm sendMsg={this.sendMail}/>:""}
                <Messages messages={this.state.messages} toggleValue={this.toggleValue}/>
            </div>
        )
    }
}

export default App;
