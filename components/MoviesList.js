import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, LayoutAnimation, UIManager, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Logout } from './Logout';
import { Logo } from './Logo';
import { Footer } from './Footer';


export function MoviesList(props) {
    const [user, setUser] = useState()
    const [data, setData] = useState()
    const [expanded, setExpanded] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        if (props.auth) {
            setUser(props.auth)
        }
        else {
            setUser(null)
        }
        navigation.setOptions({
            headerRight: props => <Logout {...props} handler={signOut} />
        })
    })

    useEffect(() => {
        setData(props.listdata)
    }, [props.listdata])

    const signOut = () => {
        props.signout()
            .then((result) => {
                if (result === true) {
                    navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
                }
            })
            .catch((error) => console.log(error))
    }

    const Renderer = ({ item }) => (
        <View>
            <Text style={ListStyles.listText}>{item.title}</Text>
        </View>
    )
    const info =({item}) => (
      <View>
      <Text style={ListStyles.listText}>Genre: {item.genre} {'\n'} Duration: {item.duration} {'\n'} Sinopse: {item.sinopse} </Text>

  </View>
    )

    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    

    return (
        <View style={ListStyles.page}>

            <Text style={ListStyles.headTitle}>Movies List</Text>
            <Logo />
            <TouchableOpacity onPress ={() =>{
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
              setExpanded(!expanded)

            }}
            >
              
            <FlatList
                data={data}
                renderItem={Renderer}
                keyExtractor={item => item.id} 
            />
            
      
            {expanded && (
                          <FlatList
                          data={data}
                          renderItem={info}
                          keyExtractor={item => item.id} 
                      />
            )}
             </TouchableOpacity>
            <Footer />
        </View>
    )
}

const ListStyles = StyleSheet.create({

    page: {
        fontSize: 26,
        backgroundColor: '#faf7c7',
        height: 1000,
    },
    headTitle: {
        fontSize: 26,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: '#263e47',
    },
    listText:{
      fontSize:20,
      color:'#faf7c7',
      backgroundColor: "#ed344c",
      padding:15,
      margin:5,
      borderRadius:5,
      textAlign: 'center'
    }

})