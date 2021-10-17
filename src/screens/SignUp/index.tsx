
import {Picker} from '@react-native-picker/picker'
import React from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'


import logoImg from '../../assets/logo.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'


export function SignUp(){
    const navigation = useNavigation()

    function handleSignIn() {
        navigation.navigate('HomeUser' as never)
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
                            <TextInput style={styles.input} placeholder="Nome" />
                            <TextInput style={styles.input} placeholder="Email" />
                            <TextInput style={styles.input} placeholder="Password" />
                            <TextInput style={styles.input} placeholder="Nº de telefone" />
                            <View style={styles.picker}>
                                <Picker mode="dropdown" >
                                    <Picker.Item label="Tipo de conta..." style={styles.textInput} />
                                    <Picker.Item label="Utilizador" style={styles.textInput} />
                                    <Picker.Item label="Oficina" style={styles.textInput} />
                                    <Picker.Item label="Empresa de Reboques" style={styles.textInput} />
                                </Picker>
                            </View>
                            <ButtonIcon title="Acessar" onPress={handleSignIn} />
                            <Text style={styles.text} onPress={handleLogin} >
                                Já tenho uma conta. Toque para entrar.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}