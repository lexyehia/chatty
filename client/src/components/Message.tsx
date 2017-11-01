import * as React from 'react'
import * as request from 'superagent'
import { IMessageProps } from '../interfaces/chatroom'

export class Message extends React.Component<IMessageProps, any> {

    constructor(props: IMessageProps) {
        super(props)

        this.state = {
            content: this.props.content
        }

    }

    componentDidMount() {
        this.props.type === "user" && this._pluckImagesFromContent()
    }

    render() {
        if (this.props.type === "system") {
            return this._renderSystemMessage()
        } else if (this.props.type === "user") {
            return this._renderUserMessage()
        }
    }

    _renderSystemMessage() {
        return (
            <div className="message system">
                <span className="message-content">{this.state.content}</span>
            </div>
        )
    }

    _renderUserMessage() {
        const styles = {
            color: `#${this.props.colour}`
        } 

        return (
            <div className="message">
                <span className="message-username" style={styles}>{this.props.username}</span>
                <span className="message-content">{this.state.content}{...this._renderImages()}</span> 
            </div>
        )
    }

    _pluckImagesFromContent() {
        const regex = /(http|ftp|https):\/\/([\w_ -]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?(.jpg|.png|.gif)/gi
        const images: Array<string> = this.props.content.match(regex)
        this.setState({
            content: this.props.content.replace(regex, ''),
            images: images || null
        })
    }

    _renderImages() {
        if (!this.state.images || this.state.images.length === 0) {
            return
        }

        const styles = {
            maxWidth: '60%',
            maxHeight: '60%'
        }

        let _elems: JSX.Element[] = []

        this.state.images.forEach((image: string, i: number) => {
            const key = i.toString()

            _elems.push(
                <p key={key}><img src={image} style={styles} /></p>
            )
        })

        return _elems
    }
}
