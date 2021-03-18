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
        const response = await fetch('http://localhost:8082/api/messages', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "messageIds": msgIdAsArray,
                "command": command,
                [command==="removeLabel"||command==="addLabel"?"label":command]: val
            })
        });
        const messages = await response.json();
        this.setState({messages: messages});
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

    getSelectedMsgIds = () => [...this.state.messages.filter(msg => msg.selected)].reduce((acc, cur) => acc.concat(cur.id), []);


    toggleValue = (val, id) => {
        if(val==="starred") {
            this.updateMails([id], "star");
        } else if(val=="selected") {
            const indexOfMessage = this.state.messages.findIndex(message => message.id == id);
            const messages = [...this.state.messages];
            messages[indexOfMessage][val] = !messages[indexOfMessage][val];
            this.setState({messages: messages});
        }
    }

    toggleSelectAll = () => {
        const messages = [...this.state.messages];
        messages.filter(msg => msg.selected).length === messages.length ?
            messages.forEach(msg => msg.selected = false) :
            messages.forEach(msg => msg.selected = true);
        this.setState({messages: messages});
    }

    toggleComposeMode = () => this.setState({composing: !this.state.composing});

    markAsRead = (isRead) => this.updateMails(this.getSelectedMsgIds(), "read", isRead);

    countUnreadMessages = () => this.state.messages.filter(message => !message.read).length;

    deleteSelectedMessages = () => this.updateMails(this.getSelectedMsgIds(), "delete");

    updateLabel = (val, isAdded) => this.updateMails(this.getSelectedMsgIds(), isAdded?"addLabel":"removeLabel", val);


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
