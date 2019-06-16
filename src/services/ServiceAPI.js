import AsyncStorage from '@react-native-community/async-storage';

export default class ServiceAPI {
    static get(resource) {
        let uri = 'https://instalura-api.herokuapp.com/api' + resource;

        return AsyncStorage.getItem('token')
          .then(token => {
            return {
              headers: new Headers({
                "X-AUTH-TOKEN": token
              })    
            }   
          })
          .then(requestInfo => fetch(uri, requestInfo))
          .then(res => res.json());
    }

    static post(resource, bodyData) {
        const uri = 'https://instalura-api.herokuapp.com/api/' + resource;

       return AsyncStorage.getItem('token')
        .then(token => {
            return {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: new Headers({
                    'Content-type': 'application/json',
                    "X-AUTH-TOKEN": token
                }),
            };
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(res => {
            if (res.ok) {
                return res.json();
            }            
            throw new Error("Não foi possível executar a operação !");
        });
    }
}