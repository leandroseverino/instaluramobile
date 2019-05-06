import React, { Component } from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class ComentarioInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentContent: '',
    }

    this.commentInput = '';
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          placeholder="Deixe sem comentário !"
          ref={input => this.commentInput = input}
          onChangeText={texto => this.setState({commentContent: texto})}
          underlineColorAndroid="transparent" />
        <TouchableOpacity onPress={() => {
          this.props.addCommentsCallback(this.state.commentContent, this.commentInput,this.props.fotoId);
          this.setState({commentContent: ''})
        }}>
          <Image 
            style={styles.sendButton}
            source={require('../../resources/img/send.png')} />
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: 40,
    flex: 1,
  },
  sendButton: {
    height: 25,
    width: 25,
  }   
})