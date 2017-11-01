import * as React from 'react'
import { Message, MessageProps } from './Message'

export interface MessageListProps extends React.Props<any> {
    messages: Array<MessageProps>
}

export class MessageList extends React.Component<MessageListProps, any> {

    constructor(props: MessageListProps) {
        super(props)
    }

    renderMessages(): JSX.Element[] {
        const _arr = [];

        for (let message of this.props.messages) {
            _arr.push(<Message key={message.key}
                username={message.username}
                content={message.content}
                type={message.type}
                colour={message.colour} />)
        }
        
        return _arr
    }

    render() {
        return (
            <main className="messages">
                {...this.renderMessages()}
            </main>
        )
    }
}
