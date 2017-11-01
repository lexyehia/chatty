import * as React from 'react'
import { IMessageListProps, IMessage } from '../interfaces/chatroom'
import { Message } from './Message'

export class MessageList extends React.Component<IMessageListProps, any> {

    constructor(props: IMessageListProps) {
        super(props)
    }

    /**
     * Iterate through messages props, converting them to <Message />
     * components
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <main className="messages">
                {this.props.messages.map((msg: IMessage) => (
                    <Message key={msg.key} username={msg.username}
                        content={msg.content} type={msg.type}
                        colour={msg.colour} />
                ))}
            </main>
        )
    }
}
