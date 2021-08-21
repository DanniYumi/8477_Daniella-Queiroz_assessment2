import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Logo } from './Logo';

export function Login(props) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [showmodal, setShowModal] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        if (props.auth) {
        
            navigation.reset({ index: 0, routes: [{ name: "Home" }] })
        }
    }, [props.auth])


    const HandleEmail = (emailVal) => {
        if (emailVal.indexOf('@') > 0) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
        setEmail(emailVal)
    }
    const HandlePassword = (passwordVal) => {
        if (passwordVal.length >= 8) {
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
        setPassword(passwordVal)
    }

    const HandleSubmit = () => {
        props.handler(email, password)
        .then((response) => {
            if( response ) {
                console.log(response)
                setShowModal( true )
                
            }
        })
        .catch( (error) => {
            console.log(error)
        })
    }
    return (
        <View style={LoginStyles.page}>
            <Text style={LoginStyles.headTitle}>Log In</Text>
            <Logo />
            <Text style={LoginStyles.text}>Please insert your Email</Text>
            <TextInput style={LoginStyles.input}
                onChangeText={(val) => HandleEmail(val)} />
            <Text style={LoginStyles.text}>Please insert your Password</Text>
            <TextInput secureTextEntry={true}
                style={LoginStyles.input}
                onChangeText={(val) => HandlePassword(val)} />
            <Modal animationType="slide"
                transparent={true}
                visible={showmodal}
                onRequestClose={() => {
                    Alert.alert("Closed");
                    setShowModal(!showmodal);
                }}>
                <View style={LoginStyles.modalStyle}>
                    <Text style={LoginStyles.textModal}>User created successfully</Text>
                    <TouchableOpacity style={LoginStyles.buttonClose} onPress={() => setShowModal(!showmodal)}>
                        <Text> Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity style={(!validEmail || !validPassword) ? LoginStyles.buttonDisabled : LoginStyles.loginButton}
                onPress={HandleSubmit}
                disabled={(!validEmail && !validPassword) ? true : false}
            
            >
                <Text style={LoginStyles.textButton}> Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={LoginStyles.loginButton}>
                <Text onPress={() => navigation.navigate("Signin")} style={LoginStyles.textButton}> Sign In</Text>
            </TouchableOpacity>


        </View>
    )
}

const LoginStyles = StyleSheet.create({
    page: {
        fontSize: 26,
        backgroundColor: '#faf7c7',
        height: 1000,
    },
    headTitle: {
        fontSize: 26,
        textAlign: 'center',
        marginTop: 20,
        color: '#263e47',
    },
    input: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
    loginButton: {

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
    textButton: {
        color: '#263e47',
        textAlign: 'center',
        fontSize: 20

    },
    buttonDisabled: {
        color: '#263e47',
        textAlign: 'center',
        fontSize: 20,
        margin: 10
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