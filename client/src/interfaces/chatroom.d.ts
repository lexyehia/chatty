import * as React from 'react'

export interface IMessage {
    username?:     string,
    colour?:       string,
    content:       string,
    key?:          string,
    type:          string
}

export interface INavProps extends React.Props<any> {
    users: string
}

export interface IChatBarProps extends React.Props<any> {
    currentUser: string,
    onSubmit: (input: string) => void
    onUserChange: (input: string) => void
}

export interface IMessageListProps extends React.Props<any> {
    messages: Array<IMessageProps>
}

export interface IMessageProps extends React.Props<any> {
    username?: string,
    colour?:   string,
    content:   string,
    key:       string,
    type:      string
}
