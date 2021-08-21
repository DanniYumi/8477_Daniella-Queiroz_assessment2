import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Logo } from './Logo';

export function Signin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const navigation = useNavigation()


    useEffect(() => {
        const emailNoSpaces = email.split(' ').join('').length
        if (email.length >= 5 && email.length === emailNoSpaces) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
        if (password.length >= 6) {
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
    }, [email, password])


    useEffect(() => {
        if (props.auth !== false) {
            navigation.reset({ index: 0, routes: [{ name: "Home" }] })
        }
    }, [props.auth])

    const SignIn = () => {
        props.handler(email, password)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <View style={SigninStyles.page}>
            <Text style={SigninStyles.headTitle}>Sign In</Text>
            <Logo />
            <Text style={SigninStyles.text}>Please Insert your Email</Text>
            <TextInput style={SigninStyles.input}
                onChangeText={(val) => setEmail(val)} />
            <Text style={SigninStyles.text}>Please insert your Password</Text>
            <TextInput secureTextEntry={true}
                style={SigninStyles.input}
                onChangeText={(val) => setPassword(val)} />
            <TouchableOpacity
                style={(!validEmail || !validPassword) ? SigninStyles.buttonDisabled : SigninStyles.signinButton}
                onPress={SignIn}
                disabled={(!validEmail && !validPassword) ? true : false}
            >
                <Text style={SigninStyles.textButton}> Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text onPress={() => navigation.navigate("Login")} style={SigninStyles.textButton}> New here? Log in</Text>
            </TouchableOpacity>
        </View>
    )
}

const SigninStyles = StyleSheet.create({
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
    signinButton: {

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
    }
})