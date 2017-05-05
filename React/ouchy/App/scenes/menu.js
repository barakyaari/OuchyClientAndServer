const React = require('react');
const {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} = require('react-native');
const {Component} = React;

const window = Dimensions.get('window');
const uri = './reut.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#69D2E7',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 22,
        fontWeight: '300',
        paddingTop: 10,
    },
});

module.exports = class Menu extends Component {
    static propTypes = {
        onItemSelected: React.PropTypes.func.isRequired,
    };

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image source={require('../items/reut.png')}
                           style={{width: 80, height: 55}}/>
                </View>

                <Text
                    onPress={() => this.props.onItemSelected('MyDay')}
                    style={styles.item}>
                    My Day
                </Text>

                <Text
                    onPress={() => this.props.onItemSelected('Chat')}
                    style={styles.item}>
                    Online Chat
                </Text>
                <Text
                    onPress={() => this.props.onItemSelected('Logout')}
                    style={styles.item}>
                    Logout
                </Text>
            </ScrollView>
        );
    }
};
