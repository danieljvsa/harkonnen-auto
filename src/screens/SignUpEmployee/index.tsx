
import {Picker} from '@react-native-picker/picker'
import React, { useContext, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import firebase from "../../config/firebase";

import logoImg from '../../assets/logo.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';


export function SignUpEmployee(){
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const {handleSignUpEmployee, errorRegister, isDuplicated, currentUser} = useContext(AuthContext)

    function signUp() {
        if(currentUser){
            handleSignUpEmployee(email,password,name,currentUser?.id, currentUser.account, currentUser.username)
        }
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
                            <TextInput style={styles.input} autoCapitalize="none" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                            {(isDuplicated === true || errorRegister === true ) ? (
                                <View>
                                    <Text style={styles.errorMessage}>Verifique todos os campos ou se já tem conta</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text></Text>
                                </View>
                            )}
                            <ButtonIcon title="Criar" onPress={() => signUp()} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}