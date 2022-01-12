

import React, { useContext, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground } from 'react-native'
import firebase from "../../config/firebase";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

import logoImg from '../../assets/logo.png'
import arrowBack from '../../assets/arrow-back.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


export function ServiceStatusReb(){
    const navigation = useNavigation()
    const {updateServicesStatusReb, currentClient} = useContext(AuthContext)
    const [assistanceRequest, setAssistanceRequest] = useState(currentClient?.assistanceRequest || '')
    const [pickup, setPickup] = useState(currentClient?.pickup|| '')
    const [mechanicalAssistance, setMechanicalAssistance] = useState(currentClient?.mechanicalAssistance || '')
    

    function handleUpdatesReb() {
        //função para modificar o estado de cada serviço
        updateServicesStatusReb(assistanceRequest, pickup, mechanicalAssistance)
    }

    function goBack() {
        //função para voltar uma tela atrás
        navigation.goBack()
    }

    

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.scroll}
        >
                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                        <View style={styles.header}>
                            <RectButton style={styles.goBack} onPress={goBack} >
                                <Image source={arrowBack} style={styles.arrowBack}  />
                            </RectButton>
                            <Image source={logoImg} style={styles.img} />
                        </View>
                        <ScrollView>
                            <View style={styles.login}>
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Pedido de Assistência</Text>
                                    <View style={styles.picker} >
                                        <Picker selectedValue={assistanceRequest} onValueChange={(text, index) => setAssistanceRequest(text)} >
                                            <Picker.Item label="Estado do serviço..." value="" style={styles.textInput} />                                           
                                            <Picker.Item label="Activo" value="yes" style={styles.textInput} />
                                            <Picker.Item label="Desactivado" value="no" style={styles.textInput} />
                                        </Picker>
                                    </View>
                                </View>   
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Serviço de Pick-up</Text>
                                    <View style={styles.picker} >
                                        <Picker selectedValue={pickup} onValueChange={(text, index) => setPickup(text)} >
                                            <Picker.Item label="Estado do serviço..." value="" style={styles.textInput} />                                           
                                            <Picker.Item label="Activo" value="yes" style={styles.textInput} />
                                            <Picker.Item label="Desactivado" value="no" style={styles.textInput} />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Assitência Mecância</Text>
                                    <View style={styles.picker} >
                                        <Picker selectedValue={mechanicalAssistance} onValueChange={(text, index) => setMechanicalAssistance(text)} >
                                            <Picker.Item label="Estado do serviço..." value="" style={styles.textInput} />                                           
                                            <Picker.Item label="Activo" value="yes" style={styles.textInput} />
                                            <Picker.Item label="Desactivado" value="no" style={styles.textInput} />
                                        </Picker>
                                    </View>
                                </View> 
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Salvar" onPress={handleUpdatesReb} />
                    </View>
            </KeyboardAvoidingView>
    )
}