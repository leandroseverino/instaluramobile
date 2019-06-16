import { AlertIOS } from 'react-native';

export default class Notify {

    static showMessage(title, message) {
        AlertIOS.alert(title, message);
    }
}