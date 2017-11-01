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

    /**
     * If message is from a user, pass it through _pluckImagesFromContent()
     */
    componentDidMount() {
        this.props.type === "user" && this._pluckImagesFromContent()
    }

    /**
     * Render component to virtual DOM
     * @return {JSX.Element} [description]
     */
    render() {
        if (this.props.type === "system") {
            return this._renderSystemMessage()
        } else if (this.props.type === "user") {
            return this._renderUserMessage()
        }
    }

    /**
     * Render system message element to virtual DOM
     * @return {JSX.Element}
     */
    _renderSystemMessage() {
        return (
            <div className="message system">
                <span className="message-content">{this.state.content}</span>
            </div>
        )
    }

    /**
     * Render user message element to virtual DOM
     * @return {JSX.Element}
     */
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

    /**
     * Sweep message content for image urls, removing them from content string
     * and adding them to images state (to be rendered by _renderImages())
     */
    _pluckImagesFromContent(): void {
        const regex = /(http|https):\/\/([\w_ -]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?(.jpg|.png|.gif)/gi
        const images: Array<string> = this.props.content.match(regex)
        this.setState({
            content: this.props.content.replace(regex, ''),
            images
        })
    }

    /**
     * Renders each image url in the images state array as a separate <img />
     * element right after the content string output
     * @return {JSX.Element[]}
     */
    _renderImages(): JSX.Element[] {
        if (!this.state.images || this.state.images.length === 0) {
            return
        }

        const _elems: JSX.Element[] = []

        const styles = {
            maxWidth:  '60%',
            maxHeight: '60%'
        }

        this.state.images.forEach((image: string, index: number): void => {
            _elems.push(
                <p key={index.toString()}><img src={image} style={styles} /></p>
            )
        })

        return _elems
    }
}
