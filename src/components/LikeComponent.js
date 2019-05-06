import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';


export default class LikeComponent extends Component {

  showLikeButtonState(isLiked) {
    return isLiked ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
  }

  showLikesAmount(likers) {
    if (likers.length <= 0) return;
    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}.
      </Text>
    );
  }
  
  render() {
    const { foto, addLikeUnlikeCallback } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={ () => {
          addLikeUnlikeCallback(foto.id);
        }}>
          <Image style={styles.likeButton} 
            source={this.showLikeButtonState(foto.likeada)} />
        </TouchableOpacity>

        {this.showLikesAmount(foto.likers)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  likeButton: {
    marginBottom: 10,
    width: 40,
    height: 40,    
  },
  likes: {
    fontWeight: 'bold',

  },  
})