import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import Menu from './menu'
import MyPain from './mypain'
import ChatView from './chatview'
import Activities from './activities'
import Medication from './medication'


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    mydaycontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A7DBD8',
    },

    painMeter: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    midpageTitle: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    chat: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


import SideMenu from 'react-native-side-menu'
import NavigationBar from 'react-native-navbar';
import MultiSlider from 'react-native-multi-slider';
import Tabs from 'react-native-tabs';


class MyDayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: 'pain'};
    }

    onItemSelected = (item) => {
        this.setState({
            selectedTab: item.props.name,
        });
    }

    render() {
        var currentTab;
        if (this.state.selectedTab === 'pain') {
            currentTab = <MyPain/>;
        }
        else if (this.state.selectedTab === 'activities') {
            currentTab = <Activities/>;
        }
        else {
            currentTab = <Medication/>;
        }
        return (

            <View style={styles.mydaycontainer}>
                {currentTab}
                <Tabs selected={this.state.selectedTab} style={{backgroundColor: 'white'}}
                      selectedStyle={{color: 'red'}} onSelect={this.onItemSelected}>
                    <Text name="pain" selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>רישום כאב</Text>
                    <Text name="activities"
                          selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>פעילות יומית</Text>
                    <Text name="medication"
                          selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>תרופות</Text>
                </Tabs>

            </View>
        );
    }
}
;

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'MyDay',
            selectedTab: 'first'
        };
    }

    toggleMenu() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({isOpen,});
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,

        });
    }

    openMenu() {
        alert('menu open!');
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;

        var fragment;
        if (this.state.selectedItem === 'MyDay') {
            fragment = <MyDayView/>;
        } else {
            fragment = <ChatView/>;
        }
        const leftButtonConfig = {
            title: 'Menu',
            tintColor: 'black',
            handler: () => this.toggleMenu(),
        };

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <NavigationBar
                        title={{title: 'Ouchy', style: {color: '#034464', fontSize: 24, fontFamily: 'Helvetica'}}}
                        leftButton={leftButtonConfig}
                        tintColor={ '#14A8F1' }/>
                    <View style={{flex: 1}}>

                        <SideMenu
                            menu={menu}
                            openMenuOffset={180}
                            isOpen={this.state.isOpen}>

                            {fragment}
                        </SideMenu>
                    </View>
                </View>

            </View>

        );
    }

}