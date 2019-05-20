import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    Button,
    Dimensions,
    StyleSheet,
} from 'react-native'

import { createStackNavigator, createAppContainer } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor(){
      super()
      this.state = {
          usuario: '',
          senha: '',
          message: '',
      }
  }

  doLogin() {
    // https://instalura-api.herokuapp.com/api/public/fotos/rafael
    const uri = "https://instalura-api.herokuapp.com/api/public/login";
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.state.usuario,
        senha: this.state.senha,
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      }),
    };

    fetch(uri, requestInfo)
      .then(res => {
        if (res.ok) {
          this.setState({message: ''});
          return res.text(); 
        }
        throw new Error("Não foi possível efetuar login !");
      })
      .then( token => {
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('usuario', this.state.usuario);
        //return AsyncStorage.getItem('token');

        this.props.navigation.navigate('Feed');

      })
      .catch(e => this.setState({message: e.message}))
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>InstaluraMobile</Text>
        <View style={styles.form}>
          <TextInput 
            style={styles.input}
            placeholder="Usuário..."
            onChangeText={texto => this.setState({usuario: texto})}
            autoCapitalize="none" /> 
          <TextInput
            style={styles.input}
            placeholder="Senha...."
            onChangeText={texto => this.setState({senha: texto})} 
            secureTextEntry={true}/>
          <Button
            title="Login"
            onPress={this.doLogin.bind(this)} />
        </View>
        <Text style={styles.message}>
          { this.state.message }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  form: {
    width: width * 0.8, 
    
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  message: {
    color: '#e74c3c',
    marginTop: 15,
  }
})