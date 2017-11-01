import * as React from 'react'
import { IChatBarProps } from '../interfaces/chatroom'

export class ChatBar extends React.Component<IChatBarProps, any> {

    constructor(props: IChatBarProps) {
        super(props)

        this.state = {
            message:     "",
            currentUser: this.props.currentUser
        }
    }

    /**
     * Render component to virtual DOM
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <footer className="chatbar">
                <input className="chatbar-username"
                    placeholder="Your name (optional)"
                    defaultValue={this.state.currentUser}
                    onChange={this._inputNameChange}
                    onKeyPress={this._submitNameChange}
                />
                <input className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    value={this.state.message}
                    onChange={this._inputChange}
                    onKeyPress={this._submitChange}
                />
            </footer>
        )
    }

    /**
     * Mirror username field to state, to be redisplayed to user
     * @param  {[React.ChangeEvent]} e
     */
    _inputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentUser: (e.target as HTMLInputElement).value
        })
    }

    /**
     * On new username submission with ENTER key, call onUserChange() prop
     * to change the currentUser state of higher App component
     * @param  {[React.KeyboardEvent]} e
     */
    _submitNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.props.onUserChange(this.state.currentUser)
        }
    }

    /**
     * Mirror (chat) input field to state, to be redisplayed to user
     * @param  {[React.ChangeEvent]} e
     */
    _inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            message: (e.target as HTMLInputElement).value
        })
    }

    /**
     * On new message submission with ENTER key, call onSubmit() prop
     * to transmit the message to higher App component, then clear input field
     * @param  {[React.KeyboardEvent]} e
     */
    _submitChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.props.onSubmit(this.state.message)
            this.setState({
                message: ""
            })
        }
    }
}
