import * as React from 'react'

export interface NavProps extends React.Props<any> {
    users: string
}

export class Nav extends React.Component<NavProps, any> {

    constructor(props: NavProps) {
        super(props)
    }

    _userCountString() {
        let users
        this.props.users === "1" ? users = "user" : users = "users"
        
        return `${this.props.users} ${users} online`
    }

    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="navbar-user-counter">{this._userCountString()}</div>
            </nav>
        )
    }
}
