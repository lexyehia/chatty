import * as React from 'react'

export class Nav extends React.Component<{}, null> {


    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
            </nav>
        )
    }
}
