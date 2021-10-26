

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


export function ChangePlans(){
    const navigation = useNavigation()
    const [fullReview, setFullReview] = useState('')
    const [extraReview, setExtraReview] = useState('')
    const [oil, setOil] = useState('')
    const [damper, setDamper] = useState('')
    const [battery, setBattery] = useState('')
    const [airConditioning, setAirConditioning] = useState('')
    const [tires, setTires] = useState('')
    const [brakes, setBrakes] = useState('')
    const [serviceCollection, setServiceCollection] = useState('')
    const {updateServicesCharges} = useContext(AuthContext)

    function goBack() {
        navigation.goBack()
    }

    function updateReviewPrices(){
        updateServicesCharges(fullReview, extraReview, oil, damper, battery, airConditioning, tires, brakes, serviceCollection)
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
                                    <Text style={styles.inputTitle} >Revisão Completa</Text>
                                    <TextInput style={styles.input} placeholder="ex: 29.00" value={fullReview} onChangeText={(text) => setFullReview(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Revisão Extra</Text>
                                    <TextInput style={styles.input} placeholder="ex: 25.00" value={extraReview} onChangeText={(text) => setExtraReview(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Mudança de Óleo</Text>
                                    <TextInput style={styles.input} placeholder="ex: 27.00" value={oil} onChangeText={(text) => setOil(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Amortecedores</Text>
                                    <TextInput style={styles.input} placeholder="ex: 21.00" value={damper} onChangeText={(text) => setDamper(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Bateria</Text>
                                    <TextInput style={styles.input} placeholder="ex: 49.00" value={battery} onChangeText={(text) => setBattery(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Ar Condicionado</Text>
                                    <TextInput style={styles.input} placeholder="ex: 50.00" value={airConditioning} onChangeText={(text) => setAirConditioning(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Pneus</Text>
                                    <TextInput style={styles.input} placeholder="ex: 19.00" value={tires} onChangeText={(text) => setTires(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Travões</Text>
                                    <TextInput style={styles.input} placeholder="ex: 87.00" value={brakes} onChangeText={(text) => setBrakes(text)} />
                                </View>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Recolha e Entrega</Text>
                                    <TextInput style={styles.input} placeholder="ex: 57.90" value={serviceCollection} onChangeText={(text) => setServiceCollection(text)} />
                                </View>
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Salvar" onPress={updateReviewPrices} />
                    </View>
            </KeyboardAvoidingView>
    )
}