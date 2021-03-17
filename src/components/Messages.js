import Message from "./Message";

const Messages = ({messages, toggleValue}) => {
    return (
        messages.map(message =>
            <Message key={message.id}
                     id={message.id}
                     subject={message.subject}
                     read={message.read}
                     starred={message.starred}
                     selected={message.selected}
                     labels={message.labels}
                     toggleValue={toggleValue}/>)
    )
}

export default Messages;