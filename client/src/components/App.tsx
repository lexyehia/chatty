import * as React from 'react'
import { MessageList } from './MessageList'
import { Nav } from './Nav'
import { ChatBar } from './ChatBar'
import { IMessage } from '../interfaces/chatroom'

export class App extends React.Component<any, any> {

    /**
     * Instance Property to store the socket connection
     * @type {WebSocket}
     */
    socket: WebSocket

    constructor(props: React.Props<any>) {
        super(props)

        this.state = {
            currentUser: "Anonymous",
            messages:    [],
            userCount:   "0"
        }
    }

    /**
     * Connect to WebSocket server on mount, store connection
     * on this.socket property
     */
    componentDidMount(): void {
        const HOST = location.origin.replace(/^http/, 'ws')
        this.socket = new WebSocket(HOST)

        this.socket.onmessage = (e): void => {
            this._parseMessageFromServer(e.data)
        }
    }

    /**
     * Render component to virtual DOM
     * @return {JSX.Element}
     */
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

    /**
     * App method that is passed on to ChatBar component, to report back
     * on user chat input. Then send that input via WebSocket to server
     * @param {string} input string from chat field
     */
    _captureInputFromChat = (input: string): void => {
        const message: IMessage = {
            type:     "user",
            username: this.state.currentUser,
            content:  input
        }

        this.socket.send(JSON.stringify(message))
    }

    /**
     * App method that is passed on to ChatBar component, to report back
     * on username change input. Then send that input via WebSocket to server
     * and immediately change App state to reflect new username
     * @param {string} input string from username field
     */
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

    /**
     * Parse JSON received from server via WebSocket
     * @param  {string} data JSON
     */
    _parseMessageFromServer = (data: string): void => {
        const input: IMessage|Array<IMessage> = JSON.parse(data)

        if (Array.isArray(input)) {
            input.forEach(msg => this._sortMessageFromServer(msg))
        } else {
            this._sortMessageFromServer(input)
        }
    }

    /**
     * Triage server messages depending on type to the appropriate function
     * @param  {IMessage} msg
     */
    _sortMessageFromServer(msg: IMessage) {
        switch (msg.type) {
            case "count":
                this._processUserCountChange(msg)
                break
            case "user":
                this._processChatMessage(msg)
                break
            case "system":
                this._processChatMessage(msg)
                break
            default:
                break
        }
    }

    /**
     * Push messages (type 'user' and 'system') to the App's messages state
     * @param  {IMessage} input server message
     */
    _processChatMessage = (input: IMessage): void => {
        this.setState((prevState: any) => {
            prevState.messages.push(input)
        })
    }

    /**
     * Push messages (type 'count') to the App's userCount state
     * @param {IMessage} input server message
     */
    _processUserCountChange = (input: IMessage): void => {
        this.setState({
            userCount: input.content
        })
    }
}
