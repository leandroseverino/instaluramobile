import React, { Component } from "react";
import { Platform,
         Dimensions,
         StyleSheet,
         FlatList, } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import Post from "./Post";

import ServiceAPI from "../services/ServiceAPI";
import Notify from "../api/Notify.ios";

const width = Dimensions.get("screen").width;

export default class Profile extends Component {
  static navigationOptions = {
    title: "Instalura Mobile - Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      fotos: [],
      loggedUser: ""
    };
    this.likeUnlikeFoto = this.likeUnlikeFoto.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'NO-ID');

    if (!user) {
      AsyncStorage.getItem("usuario").then(nome => {
        this.setState({ loggedUser: nome });
        uri = uri + "/" + nome;
      });
    } else {
      this.setState({ loggedUser: user });
    }

    ServiceAPI.get("/fotos").then(json => this.setState({ fotos: json }));
  }

  findFotoById(fotoId) {
    return this.state.fotos.find(foto => foto.id === fotoId);
  }

  updateFotoListOfState(updatedFoto) {
    const fotos = this.state.fotos.map(item =>
      item.id === updatedFoto.id ? updatedFoto : item
    );
    this.setState({ fotos });
  }

  likeUnlikeFoto(fotoId) {
    const originalList = this.state.fotos;
    const foundedFoto = this.findFotoById(fotoId);
    let newLista = [];

    if (!foundedFoto.likeada) {
      newLista = [...foundedFoto.likers, { login: this.state.loggedUser }];
    } else {
      newLista = foundedFoto.likers.filter(liker => {
        return liker.login !== this.state.loggedUser;
      });
    }

    const updatedFoto = {
      ...foundedFoto,
      likeada: !foundedFoto.likeada,
      likers: newLista
    };

    const path = `fotos/${fotoId}/like`;

    ServiceAPI.post(path, null).catch(e => {
      this.setState({fotos: originalList});
      Notify.showMessage("Ops...", "Algo deu errado !");
    });

    this.updateFotoListOfState(updatedFoto);
  }

  addComment(commentContent, commentInput, fotoId) {
    const originalList = this.state.fotos;
    if (commentContent === "") return;

    const newComment = {
      id: commentContent,
      login: this.state.loggedUser,
      texto: commentContent
    };

    const foundedFoto = this.findFotoById(fotoId);

    const path = `fotos/${fotoId}/comment`;
    const bodyData = {
      texto: commentContent
    };

    ServiceAPI.post(path, bodyData)
      .then(newComment => [...foundedFoto.comentarios, newComment])
      .then(newLista => {
        const updatedFoto = {
          ...foundedFoto,
          comentarios: newLista
        };
        this.updateFotoListOfState(updatedFoto);
        commentInput.clear();
      }).catch(e => {
        this.setState({fotos: originalList});
        Notify.showMessage("Ops...", "Algo deu errado no comentário !");
      });;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            foto={item}
            likeUnlikeCallback={this.likeUnlikeFoto.bind(this)}
            addCommentCallback={this.addComment.bind(this)}
          />
        )}
      />
    );
  }
}
