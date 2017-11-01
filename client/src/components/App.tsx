import * as React from 'react'
import { MessageList, MessageListProps } from './MessageList'
import { Nav } from './Nav'
import { ChatBar } from './ChatBar'

export class App extends React.Component<any, any> {

    socket: WebSocket

    constructor(props: any) {
        super(props)

        this.state = {
            currentUser: "bob",
            messages: []
        }
    }

    componentDidMount() {
        console.log("componentDidMount <App />")

        this.socket = new WebSocket("ws://localhost:3001")

        this.socket.addEventListener('message', (event) => {
            this._processMessageFromServer(event.data)
        })
    }

    render(): JSX.Element {
        return (
            <section>
            <Nav />
            <MessageList messages={this.state.messages} />
            <ChatBar currentUser={this.state.currentUser} onSubmit={this._captureInputFromChat} />
            </section>
        );
    }

    _captureInputFromChat = (input: string) => {
        this.socket.send(JSON.stringify({
            user:    this.state.currentUser,
            message: input
        }))
    }

    _processMessageFromServer(data: string) {
        const input: any = JSON.parse(data) 

        this.setState((prevState: any) => {
            prevState.messages.push({
                username: input.user,
                content:  input.message,
                key:      input.id
            })
        })
    }
}
