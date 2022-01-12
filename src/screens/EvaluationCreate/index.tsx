

import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground } from 'react-native'
import firebase from "../../config/firebase";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

import chevronLeft from '../../assets/chevron-left.png'
import chevronRight from '../../assets/chevron.png'
import arrowBack from '../../assets/arrow-back.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { theme } from '../../global/styles/theme';


export function EvaluationCreate({route}: any){
    const navigation = useNavigation()
    const {company} = route.params
    const [stars, setStars] = useState('')
    const [obs, setObs] = useState('')
    const {handleCreateEvaluation, currentUser} = useContext(AuthContext)

    //função para guardar avaliação a utilizador ou empresa
    function handleFinishClick() {
        if(company.id != '' && stars != '' && obs != ''){
            handleCreateEvaluation(company.id, stars, obs)
            navigation.navigate('HomeUser' as never)
        }
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
                        <View style={styles.header}  >  
                            <View style={styles.header}  >
                                <RectButton style={styles.goBack} onPress={goBack} >
                                    <Image source={arrowBack} style={styles.arrowBack}  />
                                </RectButton>
                                <Text style={styles.title} >Sua Avaliação</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scroll} >
                            <View style={styles.inputG} >
                                <Text style={styles.text} >Qualidade do serviço?</Text>
                                <View style={styles.picker} >
                                    <Picker mode="dropdown" selectedValue={stars} onValueChange={(text, index) => setStars(text)} >
                                        <Picker.Item label="Avalie..." value="" style={styles.textInput} />  
                                        <Picker.Item label="1" value="1" style={styles.textInput} />
                                        <Picker.Item label="2" value="2" style={styles.textInput} />
                                        <Picker.Item label="3" value="3" style={styles.textInput} />
                                        <Picker.Item label="4" value="4" style={styles.textInput} />
                                        <Picker.Item label="5" value="5" style={styles.textInput} />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.inputDiv} >
                                <Text style={styles.textInputTitle} >Observações</Text>
                                <TextInput multiline={true} placeholder={'Deixe aqui algumas considerações sobre o problema do seu veículo...'} numberOfLines={8} value={obs} onChangeText={(text) => setObs(text)} style={styles.inputTextArea} />
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Marcar" onPress={handleFinishClick} />
                    </View>
            </KeyboardAvoidingView>
    )
}