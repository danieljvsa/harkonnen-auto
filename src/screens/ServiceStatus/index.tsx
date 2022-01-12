

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


export function ServiceStatus(){
    const navigation = useNavigation()
    const {currentClient, updateServicesStatus} = useContext(AuthContext)
    const [fullReview, setFullReview] = useState(currentClient?.fullReview || '')
    const [extraReview, setExtraReview] = useState(currentClient?.extraReview ||'')
    const [serviceCollection, setServiceCollection] = useState(currentClient?.serviceCollection ||'')

    function handleUpdates() {
        //função para modificar o estado de cada serviço
        updateServicesStatus(fullReview, extraReview, serviceCollection)
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
                                    <Text style={styles.inputTitle} >Revisão Completa</Text>
                                    <View style={styles.picker} >
                                        <Picker selectedValue={fullReview} onValueChange={(text, index) => setFullReview(text)} >
                                            <Picker.Item label="Estado do serviço..." value="" style={styles.textInput} />                                           
                                            <Picker.Item label="Activo" value="yes" style={styles.textInput} />
                                            <Picker.Item label="Desactivado" value="no" style={styles.textInput} />
                                        </Picker>
                                    </View>
                                </View>   
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Revisão Extra</Text>
                                    <View style={styles.picker} >
                                        <Picker selectedValue={extraReview} onValueChange={(text, index) => setExtraReview(text)} >
                                            <Picker.Item label="Estado do serviço..." value="" style={styles.textInput} />                                           
                                            <Picker.Item label="Activo" value="yes" style={styles.textInput} />
                                            <Picker.Item label="Desactivado" value="no" style={styles.textInput} />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Serviço de Coleta e Entrega</Text>
                                    <View style={styles.picker} >
                                        <Picker selectedValue={serviceCollection} onValueChange={(text, index) => setServiceCollection(text)} >
                                            <Picker.Item label="Estado do serviço..." value="" style={styles.textInput} />                                           
                                            <Picker.Item label="Activo" value="yes" style={styles.textInput} />
                                            <Picker.Item label="Desactivado" value="no" style={styles.textInput} />
                                        </Picker>
                                    </View>
                                </View> 
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Salvar" onPress={handleUpdates} />
                    </View>
            </KeyboardAvoidingView>
    )
}