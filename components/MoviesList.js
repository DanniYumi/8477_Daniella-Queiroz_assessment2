import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Logout } from './Logout';
import { Logo } from './Logo';
import { Footer } from './Footer';


export function MoviesList(props) {
    const [user, setUser] = useState()
    const [data, setData] = useState()

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

    return (
        <View style={ListStyles.page}>

            <Text style={ListStyles.headTitle}>Movies List</Text>
            <Logo />
            <FlatList
                data={data}
                renderItem={Renderer}
                keyExtractor={item => item.id} 
            />
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

})