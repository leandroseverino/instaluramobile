import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';


export default class ComentarioComponent extends Component {

  render() {
    const { usuario, texto } = this.props;
    return (
      <View style={styles.comments}>
        <Text style={styles.commentHeader}>{usuario}</Text>
        <Text>{texto}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  comments: {
    flexDirection: 'row',
  },
  commentHeader: {
    fontWeight: 'bold',
    marginRight: 5,
  },  
})