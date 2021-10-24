

import React, { useContext, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import firebase from "../../config/firebase";

import logoImg from '../../assets/logo.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';


export function SignIn(){
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {handleSignIn, errorLogin} = useContext(AuthContext)

    function signIn() {
        handleSignIn(email,password)
    }

    function goToSignUp() {
        navigation.navigate('SignUp' as never)
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
                            <TextInput style={styles.input} autoCapitalize="none" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                            {(errorLogin === true ) ? (
                                <View>
                                    <Text style={styles.errorMessage} >Verifique todos os campos ou tem conta</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text></Text>
                                </View>
                            )}
                            <ButtonIcon title="Acessar" onPress={signIn} />
                            <Text style={styles.text} onPress={goToSignUp} >
                                Não tenho uma conta. Toque para criar uma agora.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}