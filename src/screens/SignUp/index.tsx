
import {Picker} from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import firebase from "../../config/firebase";

import logoImg from '../../assets/logo.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'


export function SignUp(){
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [account, setAccount] = useState('')
    const [errorRegister, setRegisterError] = useState(false)
    const [isDuplicated, setIsDuplicated] = useState(false)

    async function handleError() {
        if(name == "" || email == "" || password == "" || phone == ""){
            setRegisterError(true)
        }else(
            setRegisterError(false)
        )
    }
    
    async function handleDuplicatedAccounts(){
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => {
            setIsDuplicated(true)
            navigation.navigate('SignIn' as never)
        })
    }

    async function handleSignUp() {
        handleError()
        handleDuplicatedAccounts()
        if(isDuplicated === false){
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                firebase.database().ref('users/' + user?.uid).set({
                    username: name,
                    email: email,
                    password : password,
                    phone: phone,
                    account: account
                });
                navigation.navigate('HomeUser' as never, {idUser: user?.uid} as never)
                // ...
            })
            .catch((error) => {
                setRegisterError(true)
                //var errorCode = error.code;
                //var errorMessage = error.message;
                // ..
            });
        }
    }

    function handleLogin() {
        navigation.navigate('SignIn' as never)
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.scroll}
        >
            <ScrollView>
                <View style={styles.container}>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                        <View style={styles.login}>
                            <Image source={logoImg} style={styles.img} />
                            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={(text) => setName(text)}/>
                            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                            <TextInput style={styles.input} placeholder="Nº de telefone" value={phone} onChangeText={(text) => setPhone(text)} />
                            <View style={styles.picker} >
                                <Picker mode="dropdown" selectedValue={account} onValueChange={(text, index) => setAccount(text)} >
                                    <Picker.Item label="Tipo de conta..." value="" style={styles.textInput} />
                                    <Picker.Item label="Utilizador" value="user" style={styles.textInput} />
                                    <Picker.Item label="Oficina" value="workshop" style={styles.textInput} />
                                    <Picker.Item label="Empresa de Reboques" value="trailers" style={styles.textInput} />
                                </Picker>
                            </View>
                            {(isDuplicated === true || errorRegister === true ) ? (
                                <View>
                                    <Text style={styles.errorMessage}>Verifique todos os campos ou se já tem conta</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text></Text>
                                </View>
                            )}
                            <ButtonIcon title="Acessar" onPress={handleSignUp} />
                            <Text style={styles.text} onPress={handleLogin} >
                                Já tenho uma conta. Toque para entrar.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}