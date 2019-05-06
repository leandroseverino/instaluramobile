import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    Button,
    Dimensions,
    StyleSheet, 
} from 'react-native'

const width = Dimensions.get('screen').width;

export default class Login extends Component {

  constructor(){
      super()
      this.state = {
          usuario: '',
          senha: '',
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>InstaluraMobile</Text>
        <View style={styles.form}>
          <TextInput 
            style={styles.input}
            placeholder="Usuário..."
            onChangeText={texto => this.setState({usuario: texto})} /> 
          <TextInput
            style={styles.input}
            placeholder="Senha...."
            onChangeText={texto => this.setState({senha: texto})} />
          <Button
            title="Login"
            onPress={() => console.warn("Login")} />
        </View>
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
})
