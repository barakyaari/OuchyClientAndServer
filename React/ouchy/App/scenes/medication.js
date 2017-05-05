import React, {Component, PropTypes} from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    TimePickerAndroid,
} from 'react-native'

import {TimePicker} from 'react-native-wheel-picker-android'

import MainScreen from './mainscreen';
import firebaseLogin from './firebasehelpers';

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    paincontainer: {
        top: -40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A7DBD8',
    },
    input: {
        width: 200,
        marginTop: 15,
    },
    activity: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

import DateSelector from '../components/dateSelector'

export default class Medication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.roundDate(new Date()),
            activities: [],
        };
    }

    roundDate(timeStamp) {
        timeStamp -= timeStamp % (24 * 60 * 60 * 1000);//subtract amount of time since midnight
        return new Date(timeStamp);
    }

    onDateChanged(newDate) {
        this.setState({
            date: newDate,
        });
    }

    addActivity(activity) {
        var activities = this.state.activities;
        activities.push(activity);
        this.setState({
            activities: activities,
        })
    }

    addLine() {

    }

    render() {
        return (
            <View style={styles.paincontainer}>
                <DateSelector date={this.state.date}
                              onDateChanged={(newDate) => {
                                  this.onDateChanged(newDate);
                              }}/>
                <View>
                    <TextInput style={styles.input}
                               placeholder={"שם התרופה"}
                               onChangeText={(activity) => this.addActivity(activity)}>
                    </TextInput>
                    <TextInput style={styles.input}
                               placeholder={"שם התרופה"}
                               onChangeText={(activity) => this.addActivity(activity)}>
                    </TextInput>
                    <TextInput style={styles.input}
                               placeholder={"שם התרופה"}
                               onChangeText={(activity) => this.addActivity(activity)}>
                    </TextInput>
                    <TextInput style={styles.input}
                               placeholder={"שם התרופה"}
                               onChangeText={(activity) => this.addActivity(activity)}>
                    </TextInput>
                    <TextInput style={styles.input}
                               placeholder={"שם התרופה"}
                               onChangeText={(activity) => this.addActivity(activity)}>
                    </TextInput>



                </View>
                <Text style={styles.instructions}>

                </Text>
            </View>
        );
    }
}
;