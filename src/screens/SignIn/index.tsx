

import React from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'


import logoImg from '../../assets/logo.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'


export function SignIn(){
    const navigation = useNavigation()

    function handleSignIn() {
        navigation.navigate('HomeUser' as never)
    }

    function handleSignUp() {
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
                            <TextInput style={styles.input} placeholder="Email" />
                            <TextInput style={styles.input} placeholder="Password" />
                            <ButtonIcon title="Acessar" onPress={handleSignIn} />
                            <Text style={styles.text} onPress={handleSignUp} >
                                Não tenho uma conta. Toque para criar uma agora.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}