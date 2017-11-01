import * as React from 'react'
import { INavProps } from '../interfaces/chatroom'

export class Nav extends React.Component<INavProps, any> {

    constructor(props: INavProps) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="navbar-user-counter">{this._userCountString()}</div>
            </nav>
        )
    }

    _userCountString() {
        let users
        this.props.users === "1" ? users = "user" : users = "users"

        return `${this.props.users} ${users} online`
    }
}
