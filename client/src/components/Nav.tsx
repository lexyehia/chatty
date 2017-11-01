import * as React from 'react'
import { INavProps } from '../interfaces/chatroom'

export class Nav extends React.Component<INavProps, any> {

    constructor(props: INavProps) {
        super(props)
    }

    /**
     * Render component to virtual DOM
     * @return {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="navbar-user-counter">{this._userCountString()}</div>
            </nav>
        )
    }

    /**
     * Create user count string to be displayed on 
     * the right side of the navbar
     * @return {[string]}
     */
    _userCountString(): string {
        let users
        this.props.users === "1" ? users = "user" : users = "users"

        return `${this.props.users} ${users} online`
    }
}
