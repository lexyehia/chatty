import * as React from 'react'

export interface MessageProps extends React.Props<any> {
    username: string,
    content:  string,
    key:      number
}

export class Message extends React.Component<MessageProps, any> {

    constructor(props: MessageProps) {
        super(props)
    }

    render() {
        return (
            <div className="message">
                <span className="message-username">{this.props.username}</span>
                <span className="message-content">{this.props.content}</span>
            </div>
        )
    }
}
