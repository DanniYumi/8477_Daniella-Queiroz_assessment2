import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Logout } from './Logout';
import { AddMovies } from './AddMovies';
import { Logo } from './Logo';
import { Footer } from './Footer';

export function HomePage(props) {
    const [user, setUser] = useState()
    const navigation = useNavigation()

    // navigation.setOptions({
    //     headerRight: () => (
    //         <Logout handler={signOut} />
    //     )
    // })

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


    const signOut = () => {
        props.signout().then((result) => {
            if (result === true) {
                navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
            }
        })
            .catch((error) => console.log(error))
    }

    return (
        <View style={HomeStyles.page}>
            <Logo />

            <TouchableOpacity onPress={signOut} >
            </TouchableOpacity>
            <Text style={HomeStyles.title}>Select the option you are looking for!</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddMovies")} style={HomeStyles.addButton} >
                <Text style={HomeStyles.addButtonText}>Add Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MoviesList")} style={HomeStyles.listButton}>
                <Text style={HomeStyles.listButtonText}>Check yor list</Text>
            </TouchableOpacity>
            <Footer />
        </View>
    )
}
const HomeStyles = StyleSheet.create({

    page: {
        fontSize: 26,
        backgroundColor: '#faf7c7',
        height: 1000,
    },
    title: {
        fontSize: 22,
        color: '#263e47',
        padding: 25
    },
    addButton: {

        backgroundColor: "#ed344c",
        padding: 15,
        margin: 10,
        marginLeft: 40,
        marginHorizontal: 40,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#ed344c"
    },
    addButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#faf7c7',
    },
    listButton: {
        backgroundColor: "#ed344c",
        padding: 15,
        margin: 10,
        marginLeft: 40,
        marginHorizontal: 40,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#ed344c"
    },
    listButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#faf7c7',
    },
})