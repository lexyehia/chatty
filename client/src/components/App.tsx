import * as React from 'react'
import { MessageList } from './MessageList'
import { Nav } from './Nav'
import { ChatBar } from './ChatBar'
import { IMessage } from '../interfaces/chatroom'

export class App extends React.Component<any, any> {

    socket: WebSocket

    constructor(props: React.Props<any>) {
        super(props)

        this.state = {
            currentUser: "Bob",
            messages:    [],
            userCount:   "0"
        }
    }

    componentDidMount() {
        console.log("componentDidMount <App />")

        this.socket = new WebSocket("ws://localhost:3001")

        this.socket.onmessage = (event) => {
            this._parseMessageFromServer(event.data)
        }
    }

    render(): JSX.Element {
        return (
            <section>
                <Nav users={this.state.userCount} />
                <MessageList messages={this.state.messages} />
                <ChatBar
                    currentUser={this.state.currentUser}
                    onSubmit={this._captureInputFromChat}
                    onUserChange={this._changeUserName}
                />
            </section>
        )
    }

    _captureInputFromChat = (input: string): void => {
        const message: IMessage = {
            type:     "user",
            username: this.state.currentUser,
            content:  input
        }

        this.socket.send(JSON.stringify(message))
    }

    _changeUserName = (input: string): void => {
        const message: IMessage = {
            type: "system",
            content: `${this.state.currentUser} has changed their name to ${input}`
        }

        this.socket.send(JSON.stringify(message))

        this.setState({
            currentUser: input
        })
    }

    _parseMessageFromServer = (data: string): void => {
        const input: IMessage = JSON.parse(data)

        switch (input.type) {
            case "count":
                this._processUserCountChange(input)
                break
            case "user":
                this._processChatMessage(input)
                break
            case "system":
                this._processChatMessage(input)
                break
            default:
                break

        }
    }

    _processChatMessage = (input: IMessage) => {
        this.setState((prevState: any) => {
            prevState.messages.push(input)
        })
    }

    _processUserCountChange = (input: IMessage) => {
        this.setState({
            userCount: input.content
        })
    }
}
