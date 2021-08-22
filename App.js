import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import { firebaseConfig } from './config'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from './components/Login';
import { Signin } from './components/Signin';
import { HomePage } from './components/HomePage';
import { AddMovies } from './components/AddMovies';
import { MoviesList } from './components/MoviesList';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState()
  const db = firebase.firestore()


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setAuth(user)
    }
    else {
      setAuth(false)
    }
  })

  useEffect(() => {
    if (!data && auth) {
      readData()
    }
  }, [data, auth])

  const addData = (data) => {
    return new Promise((resolve, reject) => {
      console.log(auth.uid)
      const ref = db.collection('users').doc(auth.uid).collection('movies')
      ref.add(data)
        .then(() => { resolve(true) })
        .catch((error) => { reject(error) })
    })
  }


  const HandleLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
          // console.log(response)
          setAuth(true)
          resolve(true)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }

  const HandleSignin = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response)
          setAuth(true)
          resolve( true )
        })
        .catch((error) => {
          console.log(error)
          reject( error )
        })
    })
  }

  const HandleSignout = () => {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          setAuth(false)
          resolve(true)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })

  }
  const readData = (data) => {
    const ref = db.collection('users').doc(auth.uid)
    ref.collection('movies')
      .onSnapshot((snapshot) => {
        let dataArray = []
        snapshot.forEach((doc) => {
          let movie = doc.data()
          movie.id = doc.id
          dataArray.push(movie)
        })
        console.log( dataArray)
        setData(dataArray)
      })
  }


  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Login" >
          {(props) => <Login {...props} handler={HandleLogin} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Signin">
          {(props) => <Signin {...props} handler={HandleSignin} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Home"
          options={{ title: "Binge Time" }}>
          {(props) => <HomePage {...props} signout={HandleSignout} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen name="AddMovies"
          options={{ title: "Add Movies" }}>
          {(props) => <AddMovies {...props} signout={HandleSignout}
            listdata={data}
            auth={auth}
            add={addData} />}
        </Stack.Screen>
        <Stack.Screen name="MoviesList"
          options={{ title: "Movies List" }}>
          {(props) => <MoviesList {...props} signout={HandleSignout}
            listdata={data}
            read={readData}

            auth={auth} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82ffdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
