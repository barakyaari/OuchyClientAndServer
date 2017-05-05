import React, {Component, PropTypes} from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native'

import MainScreen from './mainscreen';
import firebaseLogin from './firebasehelpers';

const styles = StyleSheet.create({
    button: {
        color: '#ffffff',
        marginTop: 10,
        fontSize: 16,
    },
    login: {
        flex: 1,
        backgroundColor: '#8edfff',
        alignItems: 'center',
    },
    input: {
        width: 200,
        marginTop: 15,
    },

    logo: {
        width: 150,
        height: 100,
        marginTop: 100,
        marginBottom: 20
    }
});

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: null,
            password: null,
            behavior: 'padding',
            modalOpen: false,
            user: null,
        }
    };

    loginPressed() {
        firebaseLogin.login(this.state.username, this.state.password, (user) => {
            this.setState({
                user: user,
                loggedIn: true,
            })
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <View style={styles.login}>
                    <Image style={styles.logo}
                           source={require('../items/reut.png')}

                    />

                    <KeyboardAvoidingView
                        behavior={this.state.behavior}>
                        <TextInput style={styles.input}
                                   placeholder={"UserName"}
                                   onChangeText={(username) => this.setState({username})}
                                   value={this.state.username}>
                        </TextInput>
                        <TextInput style={styles.input}
                                   placeholder={"Password"}
                                   secureTextEntry={ true }
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}>
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => this.loginPressed(this.state.username)}>
                            <Text style={styles.button}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            );
        }
        else {
            return (
                <MainScreen/>
            )
        }
    }
}