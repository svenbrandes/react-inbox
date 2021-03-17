import React, {Component} from 'react';
import './App.css';
import Toolbar from "./components/Toolbar";
import Messages from "./components/Messages";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    "id": 1,
                    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
                    "read": false,
                    "starred": true,
                    "labels": ["dev", "personal"]
                },
                    {
                        "id": 2,
                        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
                        "read": false,
                        "starred": false,
                        "selected": true,
                        "labels": []
                    },
                    {
                        "id": 3,
                        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
                        "read": false,
                        "starred": true,
                        "labels": ["dev"]
                    },
                    {
                        "id": 4,
                        "subject": "We need to program the primary TCP hard drive!",
                        "read": true,
                        "starred": false,
                        "selected": true,
                        "labels": []
                    },
                    {
                        "id": 5,
                        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
                        "read": false,
                        "starred": false,
                        "labels": ["personal"]
                    },
                    {
                        "id": 6,
                        "subject": "We need to back up the wireless GB driver!",
                        "read": true,
                        "starred": true,
                        "labels": []
                    },
                    {
                        "id": 7,
                        "subject": "We need to index the mobile PCI bus!",
                        "read": true,
                        "starred": false,
                        "labels": ["dev", "personal"]
                    },
                    {
                        "id": 8,
                        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
                        "read": true,
                        "starred": true,
                        "labels": []
                    }
                ]
        }
    }

    toggleValue = (val, id) => {
        const indexOfMessage = this.state.messages.findIndex(message => message.id == id);
        const updatedMessages = [...this.state.messages];
        updatedMessages[indexOfMessage][val] = !updatedMessages[indexOfMessage][val];
        this.setState({messages: updatedMessages});
    }

    toggleSelectAll = () => {
        let messages = [...this.state.messages];
        messages.filter(msg => msg.selected).length === messages.length ?
            messages.forEach(msg => msg.selected = false) :
            messages.forEach(msg => msg.selected = true);
        this.setState({messages: messages});
    }

    markAsRead = (isChecked) => {
        let selectedMessages = [...this.state.messages];
        selectedMessages.forEach(message => {
            if(message.selected) {
                message.read = isChecked;
            }
        })
        this.setState({messages: selectedMessages});
    }

    countUnreadMessages = () => this.state.messages.reduce((acc, cur) => acc + (cur.read === true ? 0 : 1), 0);

    deleteSelectedMessages = () => {
        const updatedMessages = [...this.state.messages.filter(message => !message.selected)];
        this.setState({messages: updatedMessages});
    }

    updateLabel = (val, isAdded) => {
        const updatedMessages = [...this.state.messages];
        updatedMessages.forEach(message => {
            if(message.selected && isAdded && !message.labels.includes(val)) {
                message.labels = [...message.labels, val];
            } else if (message.selected && !isAdded && message.labels.includes(val)) {
                message.labels = message.labels.filter(label => label !== val);
            }
        })
        this.setState({messages: updatedMessages});
    }

    selectedMsgState = () => {
        const countOfSelectedMessages = this.state.messages.filter(message => message.selected).length;
        const countOfTotalMessages = this.state.messages.length;
        return countOfSelectedMessages === 0 ? "none" : countOfSelectedMessages === countOfTotalMessages ? "all" : "some";
    }

    render() {
        return (
            <div className="App">
                <Toolbar toggleSelectAll={this.toggleSelectAll}
                         markAsRead={this.markAsRead}
                         unreadMsgCount={this.countUnreadMessages()}
                         deleteMsg={this.deleteSelectedMessages}
                         updateLabel={this.updateLabel}
                         selectedMsgState={this.selectedMsgState()}/>
                <Messages messages={this.state.messages} toggleValue={this.toggleValue}/>
            </div>
        )
    }
}

export default App;
