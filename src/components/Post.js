import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';

import ComentarioInput from './ComentarioInput';
import LikeComponent from './LikeComponent';
import ComentarioComponent from './ComentarioComponent';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

  /**
   * <p>Show the legend from a foto.</p>
   * @param {foto} foto 
   */
  showLegend(foto) {
    
    if (foto.comentario === '') return;
    
    return (
      <View style={styles.comments}>
        <Text style={styles.commentHeader}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}.</Text>
      </View>
    )      
  }

  render() {
    const { foto, likeUnlikeCallback, addCommentCallback } = this.props;
    return (
        <View>
            <View style={styles.containerHeader}>
              <Image source={{uri: foto.urlPerfil}} style={styles.fotoPerfil} />
              <Text>{foto.loginUsuario}</Text>
            </View>
            
            <Image source={{uri: foto.urlFoto}} style={styles.fotoPost}/>
            
            <View style={styles.rodape}>

              <LikeComponent
                foto={foto}
                addLikeUnlikeCallback={likeUnlikeCallback} />

              {this.showLegend(foto)}

              <FlatList 
                data={foto.comentarios}
                keyExtractor={item => item.id.toString()}
                renderItem={ ({item}) =>
                  <ComentarioComponent usuario={item.login} texto={item.texto} />
                }
              />

              <ComentarioInput
                fotoId={foto.id}
                addCommentsCallback={addCommentCallback} />

            </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  containerHeader: {
    margin: 10, flexDirection: 'row', alignItems: 'center'
  },
  fotoPerfil: {
    marginRight: 10, borderRadius: 20, width: 40, height: 40
  },
  fotoPost: {
    width: width,
    height: width
  },
  rodape: {
    margin: 10,
  },
 
})