import * as React from 'react'

export interface ChatBarProps extends React.Props<any> {
    currentUser: string,
    onSubmit: (input: string) => void 
    onUserChange: (input: string) => void
}

export class ChatBar extends React.Component<ChatBarProps, any> {
    constructor(props: ChatBarProps) {
        super(props)

        this.state = {
            message: "",
            currentUser: this.props.currentUser
        }
    }

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

    _inputNameChange = (e: any) => {
        this.setState({
            currentUser: e.target.value
        })
    }

    _submitNameChange = (e: any) => {
        if (e.key === 'Enter') {
            this.props.onUserChange(this.state.currentUser)
        } 
    }

    _inputChange = (e: any) => {
        this.setState({
            message: e.target.value
        })
    }

    _submitChange = (e: any) => {
        if (e.key === 'Enter') {
            this.props.onSubmit(this.state.message)
            this.setState({
                message: ""
            })
        } 
    }
}
