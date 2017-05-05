const React = require('react');
import Login from './scenes/login'
import MyPain from './scenes/mypain'
import MainScreen from './scenes/mainscreen'
const {Component} = React;

module.exports = class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }

    render() {
        return (
            <MainScreen/>
        );
    }
};
