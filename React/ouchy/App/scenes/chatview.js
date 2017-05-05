import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
    chatcontainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#96E3E3',
    },
});
import {GiftedChat} from 'react-native-gifted-chat';
import firebaseHelper from './firebasehelpers'

export default class ChatView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {messages: []};
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount(){
        let image = '../items/reut.png'
        this.setState({
            messages: [
                {
                    _id: 3,
                    text: 'כן, אני רואה לפי הדיווח ששלחת. אני ממליץ להימנע מפעילות ספורטיבית היום. אתה רוצה שנקבע לנו תור?',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'Reut',
                    },
                },
                {
                    _id: 2,
                    text: 'קצת כואב לי למען האמת...',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 21, 5)),
                    user: {
                        _id: 1,
                        name: 'user',

                    },
                },
                {
                    _id: 1,
                    text: 'היי, איך אתה מרגיש היום?',
                    createdAt: new Date(Date.UTC(2017, 5, 5, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'Reut',
                    },
                },
    ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        firebaseHelper.sendMessage(messages);
        console.log(messages)
    }

    render() {

        return (
            <View style={styles.chatcontainer}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }
}
