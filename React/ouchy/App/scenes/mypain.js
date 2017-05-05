import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import VasSlider from '../components/vasslider'
import DateSelector from "../components/dateSelector";
import firebaseHelper from './firebasehelpers'

const styles = StyleSheet.create({
    midpageTitle: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    paincontainer: {
        top:-40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A7DBD8',
    },
});

export default class MyPain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            painData:[],
            date: this.roundDate(new Date()),
            morning: 0,
            noon: 0,
            evening: 0,
        };
    }

    async getPainData(onDataReceived) {
        fetch('http://172.22.10.95:4000/paindata').then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('data', data)
            var painData = [];
            data.forEach(row => {
                painData[row.date] = {
                    morning: row.morning,
                    noon: row.noon,
                    evening: row.evening,
                }
            })
            onDataReceived(painData)

        }).catch(function(error) {
            console.log(error);
        });
    }
    componentWillMount(){
        var painData = this.getPainData((painData) => {
            this.setState({
                painData: painData,
            });
        });
    }


    roundDate(timeStamp){
        timeStamp -= timeStamp % (24 * 60 * 60 * 1000);//subtract amount of time since midnight
        return new Date(timeStamp);
    }

    onDateChanged(newDate) {
        this.setState({
            date: newDate,
        });
        if(this.state.painData[newDate.toISOString().split('T')[0]] != null){
            var tempPainData = this.state.painData[newDate.toISOString().split('T')[0]];
            this.setState({
                morning: tempPainData.morning,
                noon: tempPainData.noon,
                evening: tempPainData.evening,
            });
        }
        else{
            this.setState({
                morning: 0,
                noon: 0,
                evening: 0,
            })
        }
        console.log(this.state.painData)
        var tempPainData = [];
        this.state.painData.forEach(row => {
            console.log('row', row)

            tempPainData.push({
                date: row[0]
            })
        })
        console.log(tempPainData)
        fetch('http://172.22.10.95:4000/setpaindata', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tempPainData
            })
        })
    }

    updatePainData(){
        var tempPainData = this.state.painData;
        tempPainData[this.state.date.toISOString().split('T')[0]] = {
            morning: this.state.morning,
            noon: this.state.noon,
            evening: this.state.evening,
        };
        this.setState({
            painData: tempPainData
        })
    }

    render() {
        return (
            <View style={styles.paincontainer}>
                <DateSelector date={this.state.date}
                                onDateChanged={(newDate)=>{
                                    this.onDateChanged(newDate);
                                }}/>
                <View>

                    <Text style={styles.midpageTitle}>
                        כאב בוקר:
                    </Text>
                </View>
                <VasSlider value={this.state.morning}
                            onValueChanged={(newValue)=>{
                                this.setState({
                                    morning: newValue,
                                });
                                this.updatePainData();
                            }}/>
                <View>
                    <Text style={styles.midpageTitle}>
                        כאב צהריים:
                    </Text>
                </View>
                <VasSlider value={this.state.noon}
                           onValueChanged={(newValue)=>{
                               this.setState({
                                   noon: newValue,
                               });
                               this.updatePainData();

                           }}/>
                <View>
                    <Text style={styles.midpageTitle}>
                        כאב לילה:
                    </Text>
                </View>
                <VasSlider value={this.state.evening}
                           onValueChanged={(newValue)=>{
                               this.setState({
                                   evening: newValue,
                               });
                               this.updatePainData();
                           }}/>
            </View>
        );
    }
}
