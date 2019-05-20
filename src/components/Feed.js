import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './Post';

const width = Dimensions.get('screen').width;

export default class Feed extends Component {

  static navigationOptions = {
    title: 'Feed',
  };

  constructor(props) {
    super(props);
    this.state = {
     fotos : []
    }
    this.likeUnlikeFoto = this.likeUnlikeFoto.bind(this);
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(res => res.json())
      .then( json => this.setState({ fotos: json}));
  }

  findFotoById(fotoId) {
    return this.state.fotos
        .find(foto => foto.id === fotoId)
  }

  updateFotoListOfState(updatedFoto) {
    const fotos = this.state.fotos.map(item =>
      item.id === updatedFoto.id ? updatedFoto : item);
    this.setState({fotos});
  }

  likeUnlikeFoto(fotoId) {
    const foundedFoto = this.findFotoById(fotoId);
    let newLista = [];

    if (!foundedFoto.likeada) {
      newLista = [
        ...foundedFoto.likers,
        {login: 'meuUsuario'}
      ]
    } else { 
      newLista = foundedFoto.likers.filter(liker => {
        return liker.login !== 'meuUsuario';
      });
      
    }

    const updatedFoto = { 
      ...foundedFoto,
      likeada: !foundedFoto.likeada,
      likers: newLista
    }

    this.updateFotoListOfState(updatedFoto);
  }

  addComment(commentContent, commentInput, fotoId){

    if (commentContent === '') return;

    const newComment = {
      id: commentContent,
      login: 'meuUsuario',
      texto: commentContent
    };
    
    const foundedFoto = this.findFotoById(fotoId);

    const newLista = [...foundedFoto.comentarios, newComment];

    const updatedFoto = {
      ...foundedFoto,
      comentarios: newLista 
    }

    this.updateFotoListOfState(updatedFoto);

    commentInput.clear();
  }

  render() {
    const {navigate} = this.props.navigation;
      return (
      <FlatList style={styles.container}
        data={this.state.fotos}  
        keyExtractor={item => item.id.toString()}
        renderItem={ ({item}) =>
          <Post
            foto={item}
            likeUnlikeCallback={this.likeUnlikeFoto.bind(this)} 
            addCommentCallback={this.addComment.bind(this)} />
        }
      />
    );
  }
}

const margem = Platform.os == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margem
  },
})