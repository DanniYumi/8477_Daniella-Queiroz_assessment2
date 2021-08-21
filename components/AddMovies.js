import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Logout } from './Logout';
import { Logo } from './Logo';
import { Footer } from './Footer';

export function AddMovies(props) {
    const [user, setUser] = useState()
    const [title, setTitle] = useState()
    const [genre, setGenre] = useState()
    const [duration, setDuration] = useState()
    const [sinopse, setSinopse] = useState()
    const navigation = useNavigation()
    const [showmodal, setShowModal] = useState(false)

    const [validForm,setValidForm] = useState(false)



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

    useEffect( () => {
        // check if user has filled in all the fields
        if( title && genre && duration && sinopse ) {
            setValidForm(true)
        }
        else{
            setValidForm(false)
        }
    },[title,genre,duration,sinopse])


    const signOut = () => {
        props.signout().then((result) => {
            if (result === true) {
                navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
            }
        })
            .catch((error) => console.log(error))
    }
    const handleSubmit = () => {
        if (title && genre && duration && sinopse) {
            let movies = new Object()
            movies.title = title
            movies.genre = genre
            movies.duration = duration
            movies.sinopse = sinopse
            props.add(movies)
            .then((result) => {
                setShowModal(true)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else {
            console.log('no data')
        }
    }


    return (
        <View style={AddStyles.page} >

            <TouchableOpacity onPress={signOut}>
            </TouchableOpacity>
            <Text style={AddStyles.headTitle}> Add Movie</Text>
            <Logo />
            <Text style={AddStyles.headTitle}> Add your Movies to the list</Text>
            <Text style={AddStyles.text}> Insert the movie title</Text>
            <TextInput onChangeText={(val) => setTitle(val)} style={AddStyles.input} />
            <Text style={AddStyles.text}> Insert the genre</Text>
            <TextInput onChangeText={(val) => setGenre(val)} style={AddStyles.input} />
            <Text style={AddStyles.text}> Insert the duration</Text>
            <TextInput onChangeText={(val) => setDuration(val)} style={AddStyles.input} />
            <Text style={AddStyles.text}> Insert the sinopse</Text>
            <TextInput onChangeText={(val) => setSinopse(val)} style={AddStyles.input} />
            <Modal animationType="slide"
                transparent={true}
                visible={showmodal}
                onRequestClose={() => {
                    Alert.alert("Closed");
                    setShowModal(!showmodal);
                }}>
                <View style={AddStyles.modalStyle}>
                    <Text style={AddStyles.textModal}>Your movie was added</Text>
                    <TouchableOpacity 
                    style={AddStyles.buttonClose} 
                    onPress={() => {
                        setShowModal(!showmodal)
                        navigation.navigate("Home")
                    }}
                    >
                        <Text> Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity 
                onPress={handleSubmit} 
                style={ (!validForm) ? [AddStyles.addButton, AddStyles.addButtonDisabled] : AddStyles.addButton} 
                disabled={ (!validForm) ? true: false}
                // cannot have two onPress
                // onPress={() => handleSubmit}
            >
                <Text style={AddStyles.textButton}>Add</Text>
            </TouchableOpacity>
            <Footer />
        </View>
    )
}
const AddStyles = StyleSheet.create({
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
    input: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        marginLeft: 40,
        marginRight: 40,
        padding: 10,
        color: '#263e47',
        backgroundColor: '#f9e693',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#f9e693',

    },
    text: {
        fontSize: 20,
        padding: 5,
        color: '#263e47',
        textAlign: 'center'
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
    addButtonDisabled: {
        backgroundColor: "#ea96a1",
        opacity: 0.7,
    },
    textButton: {
        color: '#263e47',
        textAlign: 'center',
        fontSize: 20
    },
    modalStyle: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: "#ed344c",
        padding: 30,
        alignItems: 'center',
        marginTop: 500

    },
    textModal: {
        fontSize: 20,
        color: '#f9e693',
        padding: 10
    },
    buttonClose: {
        color: '#263e47',
        fontSize: 15
    }
})