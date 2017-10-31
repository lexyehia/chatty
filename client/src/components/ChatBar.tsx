import * as React from 'react'

export interface ChatBarProps extends React.Props<any> {
    currentUser: string,
    onSubmit: (input: string) => void 
}

export class ChatBar extends React.Component<ChatBarProps, any> {
    constructor(props: ChatBarProps) {
        super(props)

        this.state = {
            message: ""
        }
    }

    render(): JSX.Element {
        return (
            <footer className="chatbar">
                <input className="chatbar-username"
                    placeholder="Your name (optional)"
                    defaultValue={this.props.currentUser}
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
        } else {
            return
        }
    }
}
