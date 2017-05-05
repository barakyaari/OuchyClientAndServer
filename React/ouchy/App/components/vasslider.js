import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Slider,

} from 'react-native'

const styles = StyleSheet.create({
    painMeter: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default class VasSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    changeValue(newValue){
        this.props.onValueChanged(newValue)
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.painMeter}>
                        {this.props.value}
                    </Text>
                </View>
                <Slider style={{width: 300, height: 40}} maximumValue={10}

                        value={this.props.value}
                        onValueChange={(newValue) => this.changeValue(newValue)}
                        step={ 1 }/>
            </View>
        );
    }
}