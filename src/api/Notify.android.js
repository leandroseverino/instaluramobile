import { ToastAndroid } from 'react-native';

export default class Notify {

    static showMessage(title, message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}