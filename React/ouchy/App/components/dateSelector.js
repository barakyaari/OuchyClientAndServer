import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Slider,
    TouchableOpacity,

} from 'react-native'
import Icon from "react-native-vector-icons/Foundation";

const styles = StyleSheet.create({
    date: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: 200,
    },
    dateContainer: {
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrow:{

    }
});

export default class DateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: props.date,
            onDateChanged: props.onDateChanged,
        };
    }
    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    changeDate(days){
        var currentDate = this.state.selectedDate;
        var newDate = this.addDays(currentDate, days)
        this.setState({
            selectedDate: newDate
        });
        this.state.onDateChanged(newDate);
    }

    render() {
        return (
            <View style={styles.dateContainer}>
                <TouchableOpacity
                    onPress={() => this.changeDate(-1)}>
                <Icon
                    style={styles.arrow}
                    name="arrow-left"
                    size={30}
                />
                </TouchableOpacity>
                <Text style={styles.date}>
                    {this.state.selectedDate.toDateString()}
                </Text>
                <TouchableOpacity
                    onPress={() => this.changeDate(1)}>

                    <Icon
                    name="arrow-right"
                    size={30}
                />
                </TouchableOpacity>

            </View>
        );
    }
}