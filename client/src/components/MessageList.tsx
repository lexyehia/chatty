import * as React from 'react'
import { IMessageListProps } from '../interfaces/chatroom'
import { Message } from './Message'

export class MessageList extends React.Component<IMessageListProps, any> {

    constructor(props: IMessageListProps) {
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
