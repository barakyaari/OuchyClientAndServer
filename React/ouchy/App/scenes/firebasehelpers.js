import * as firebase from "firebase";
class firebaseHelper {
    constructor(props) {
        var config = {
            apiKey: "AIzaSyBXrm-vb5EsGaCzkDCQpXjb7xU6v7kq8VQ",
            authDomain: "ouchy-ee864.firebaseapp.com",
            databaseURL: "https://ouchy-ee864.firebaseio.com",
            projectId: "ouchy-ee864",
            storageBucket: "ouchy-ee864.appspot.com",
            messagingSenderId: "204534284659"
        };
        firebase.initializeApp(config);
    }

    async login(username, password, logUser) {

        firebase.auth().signInWithEmailAndPassword(username, password).then(function(user) {
            logUser(user); // Optional
        }, function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    async updatePainData(painData){
        var db = firebase.database();
        var ref = db.ref("users/");
        var usersRef = ref.child('barakyaari');
        usersRef.set({
            painData: painData
        });
    }

    getDatabaseRef(){
        return firebase.database().ref('users/barakyaari/painData');
    }

    async sendMessage(messages){
        var db = firebase.database();

        var ref = db.ref("users/");
        var userRef = ref.child('barakyaari');
        var chatRef = userRef.child('messages');

        for(let i = 0; i < messages.length; i++){
            chatRef.push({
                text: messages[i].text,
                user: messages[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    async getMessages(onMessagesReceived){
        var db = firebase.database();

        var ref = db.ref("users")
        ref.once("value", function(data) {
            alert('data');
        });
    }

    async getPainData(onDataReceived){
        var db = firebase.database();

        var ref = db.ref("/users/barakyaari/painData")
        ref.once("value", function(data) {
        });
    }
}


export default new firebaseHelper();