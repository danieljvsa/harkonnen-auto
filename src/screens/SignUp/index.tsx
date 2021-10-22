
import {Picker} from '@react-native-picker/picker'
import React, { useContext, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import firebase from "../../config/firebase";

import logoImg from '../../assets/logo.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';


export function SignUp(){
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [account, setAccount] = useState('')
    const {handleSignUp, errorRegister, isDuplicated} = useContext(AuthContext)

    function signUp() {
        handleSignUp(email,password,name,phone,account)
    }

    function goToLogin() {
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
                            <ButtonIcon title="Acessar" onPress={signUp} />
                            <Text style={styles.text} onPress={goToLogin} >
                                Já tenho uma conta. Toque para entrar.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}