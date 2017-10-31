import * as React from 'react'
import { MessageList, MessageListProps } from './MessageList'
import { Nav } from './Nav'
import { ChatBar } from './ChatBar'

export class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.state = {
            currentUser: "bob",
            messages: [
                {
                    username: "Bob",
                    content:  "Has anyone seen my marbles?",
                    key:      1
                },
                {
                    username: "Anonymous",
                    content:  "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
                    key:      2
                }
            ]
        }
    }

    componentDidMount() {
        console.log("componentDidMount <App />");

        setTimeout(() => {
            console.log("Simulating incoming message");
            // Add a new message to the list of messages in the data store
            const newMessage = {
                key:      3,
                username: "Michelle",
                content:  "Hello there!"
            }

            const messages = this.state.messages.concat(newMessage)
            // Update the state of the app component.
            // Calling setState will trigger a call to render() in App and all child components.
            this.setState({ messages })

        }, 3000);
    }

    render() {
        return (
            <section>
            <Nav />
            <MessageList messages={this.state.messages} />
            <ChatBar currentUser={this.state.currentUser} />
            </section>
        );
    }
}
