import * as React from 'react'
import { MessageList, MessageListProps } from './MessageList'
import { Nav } from './Nav'
import { ChatBar } from './ChatBar'

interface Message {
    id?:     string,
    user?:   string,
    content: string,
    type:    string,
    colour:  string
}

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

    _captureInputFromChat = (input: string) => {
        console.log(input)
        this.socket.send(JSON.stringify({
            user:    this.state.currentUser,
            content: input,
            type:    "user"
        }))
    }

    _changeUserName = (input: string): void => {
        this.socket.send(JSON.stringify({
            type: "system",
            content: `${this.state.currentUser} has changed their name to ${input}`
        }))

        this.setState({
            currentUser: input
        })
    }

    _parseMessageFromServer = (data: string) => {
        const input: Message = JSON.parse(data) 

        if (input.type === "count") {
            this._processUserCountChange(input)
        } else {
            this._processChatMessage(input)
        }
    }

    _processChatMessage  = (input: Message) => {
        this.setState((prevState: any) => {
            prevState.messages.push({
                username: input.user || "",
                content: input.content,
                key: input.id,
                type: input.type,
                colour: input.colour || "000000"
            })
        })
    }

    _processUserCountChange = (input: Message) => {
        this.setState({
            userCount: input.content
        })
    }
}
