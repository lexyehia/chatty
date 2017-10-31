import * as React from 'react'

export interface ChatBarProps extends React.Props<any> {
    currentUser: string
}

export class ChatBar extends React.Component<ChatBarProps, any> {
    constructor(props: ChatBarProps) {
        super(props)
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your name (optional)" defaultValue={this.props.currentUser} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        )
    }
}
