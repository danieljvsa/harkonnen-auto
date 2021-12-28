

import React, { useContext, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import firebase from "../../config/firebase";

import logoImg from '../../assets/logo.png'
import arrowBack from '../../assets/arrow-back.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';
import { RectButton } from 'react-native-gesture-handler';


export function ChangePlansReb(){
    const navigation = useNavigation()
    const {updateServicesChargesReb, currentClient} = useContext(AuthContext)
    const [assistanceRequest, setAssistanceRequest] = useState(currentClient?.assistanceRequestCharge || '')
    const [pickup, setPickup] = useState(currentClient?.pickupCharge || '')
    const [mechanicalAssistance, setMechanicalAssistance] = useState(currentClient?.mechanicalAssistanceCharge || '')

    function goBack() {
        navigation.goBack()
    }

    function updateAssistancePrices(){
        updateServicesChargesReb(assistanceRequest, pickup, mechanicalAssistance)
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
                        <ScrollView style={styles.list} >
                            <View style={styles.changes}>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Pedido de Assistência</Text>
                                    <TextInput style={styles.input} placeholder="ex: 29.00" value={assistanceRequest} onChangeText={(text) => setAssistanceRequest(text)} keyboardType="numeric"/>
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Serviços de Pick-up</Text>
                                    <TextInput style={styles.input} placeholder="ex: 25.00" value={pickup} onChangeText={(text) => setPickup(text)} keyboardType="numeric"/>
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Auxílio Mecânico Móvel</Text>
                                    <TextInput style={styles.input} placeholder="ex: 27.00" value={mechanicalAssistance} onChangeText={(text) => setMechanicalAssistance(text)} keyboardType="numeric"/>
                                </View>
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Salvar" onPress={updateAssistancePrices} />
                    </View>
            </KeyboardAvoidingView>
    )
}