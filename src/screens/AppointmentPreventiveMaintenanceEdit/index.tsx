
import Checkbox from 'expo-checkbox';
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground, FlatList } from 'react-native'
import firebase from "../../config/firebase";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'


import uploadImg from '../../assets/upload.png'
import cross from '../../assets/cross.png'
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

export function AppointmentPreventiveMaintenanceEdit({route}: any){
    const navigation = useNavigation()
    const {appointment, commitment} = route.params
    const [isFullReview, setFullReview] = useState(appointment.isFullReview || false)
    const [isExtraReview, setExtraReview] = useState(appointment.isExtraReview || false)
    const [obs, setObs] = useState(appointment.obs || '')
    const [address, setAddress] = useState(appointment.isFullReview || '')
    const [isServiceCollection, setServiceCollection] = useState(appointment.isServiceCollection || false)
    const [isOil, setOil] = useState(appointment.isOil || false)
    const [isDamper, setDamper] = useState(appointment.isDamper || false)
    const [isBattery, setBattery] = useState(appointment.isBattery || false)
    const [isAirConditioning, setAirConditioning] = useState(appointment.isAirConditioning || false)
    const [isTires, setTires] = useState(appointment.isTires || false)
    const [isBrakes, setBrakes] = useState(appointment.isBrakes || false)
    const [isEngine, setEngine] = useState(appointment.isEngine || false)
    const [totalCharge, setTotalCharge] = useState(appointment.totalCharge || 0)
    const [countFullReview, setCountFullReview] = useState(0)
    const [countExtraReview, setCountExtraReview] = useState(0)
    const [countServiceCollection, setCountServiceCollection] = useState(0)
    const [countOil, setCountOil] = useState(0)
    const [countDamper, setCountDamper] = useState(0)
    const [countBattery, setCountBattery] = useState(0)
    const [countAirConditioning, setCountAirConditioning] = useState(0)
    const [countTires, setCountTires] = useState(0)
    const [countBrakes, setCountBrakes] = useState(0)
    const [countEngine, setCountEngine] = useState(0)
    
    const {handleUpdatePreventiveMaintenance, currentWorkshopProf, handlePreventiveAppoitment, currentUser, getProfUserbyId} = useContext(AuthContext)

    useEffect(() => {
        getProfUserbyId(appointment.currentWorkshopProf)
        totaAmount()
    }, [isServiceCollection, isOil, isDamper, isBattery, isAirConditioning, isTires, isBrakes, isEngine, isFullReview, isExtraReview])
   
    function goBack() {
        navigation.goBack()
    }

    function handleSave(obs: string) {
        if(currentWorkshopProf?.username && currentUser?.username && totalCharge != 0){
            handleUpdatePreventiveMaintenance(appointment.id_company, appointment.id, commitment.day, commitment.month, commitment.year, commitment.hour, commitment.service, commitment.model, commitment.brand, appointment.currentUserId, obs, appointment.currentWorkshopProf, isFullReview, isExtraReview, isServiceCollection, isOil, isDamper, isBattery, isAirConditioning, isTires, isBrakes, isEngine, totalCharge, address)
            navigation.navigate('HomeUser' as never)
        }
    }

    async function totaAmount(){
        
        //let fullReviewCharge = currentWorkshopProf?.fullReviewCharge
        if(isFullReview){
            setBrakes(false)
            setDamper(false)
            setEngine(false)
            setOil(false)
            
            console.log(currentWorkshopProf?.fullReviewCharge)
            if (currentWorkshopProf?.fullReviewCharge  && countFullReview === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.fullReviewCharge) )
                setCountFullReview(1)
                //console.log(totalCharge)
            }
            
        } else {
            if(countFullReview === 1){
                if (currentWorkshopProf?.fullReviewCharge) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.fullReviewCharge) )
                    setCountFullReview(0)
                }
            }
        }

        if(isBrakes){
            if (currentWorkshopProf?.brakes  && countBrakes === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.brakes) )
                setCountBrakes(1)
                //console.log(totalCharge)
            }
        } else {
            if(countBrakes === 1){
                if (currentWorkshopProf?.brakes) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.brakes) )
                    setCountBrakes(0)
                }
            }
        }

        if(isDamper){
            if (currentWorkshopProf?.damper  && countDamper === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.damper) )
                setCountDamper(1)
                //console.log(totalCharge)
            }
        } else {
            if(countDamper === 1){
                if (currentWorkshopProf?.damper) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.damper) )
                    setCountDamper(0)
                }
            }
        }

        if(isEngine){
            
            if (currentWorkshopProf?.engine && countEngine === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.engine) )
                setCountEngine(1)
                //console.log(totalCharge)
            }
        } else {
            if(countEngine === 1){
                if (currentWorkshopProf?.engine) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.engine) )
                    setCountEngine(0)
                }
            }
        }

        if(isOil){
            if (currentWorkshopProf?.oil && countOil === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.oil) )
                setCountOil(1)
                //console.log(totalCharge)
            }
        } else {
            if(countOil === 1){
                if (currentWorkshopProf?.oil) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.oil) )
                    setCountOil(0)
                }
            }
        }

        if(isExtraReview){
            setAirConditioning(false)
            setBattery(false)
            setTires(false)
            if (currentWorkshopProf?.extraReviewCharge  && countExtraReview === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.extraReviewCharge) )
                setCountExtraReview(1)
                //console.log(totalCharge)
            }
        } else {
            if(countExtraReview === 1){
                if (currentWorkshopProf?.extraReviewCharge) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.extraReviewCharge) )
                    setCountExtraReview(0)
                }
            }
        }

        if(isAirConditioning){
            
            if (currentWorkshopProf?.airConditioning  && countAirConditioning === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.airConditioning) )
                setCountAirConditioning(1)
                console.log(totalCharge)
            }
        } else {
            if(countAirConditioning === 1){
                if (currentWorkshopProf?.airConditioning) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.airConditioning) )
                    setCountAirConditioning(0)
                }
            }
        }

        if(isBattery){
            if (currentWorkshopProf?.battery  && countBattery === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.battery) )
                setCountBattery(1)
                console.log(totalCharge)
            }
        } else {
            if(countBattery === 1){
                if (currentWorkshopProf?.battery) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.battery) )
                    setCountBattery(0)
                }
            }
        }

        if(isTires){
            if (currentWorkshopProf?.tires && countTires === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.tires) )
                setCountTires(1)
                console.log(totalCharge)
            }
        } else {
            if(countTires === 1){
                if (currentWorkshopProf?.tires) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.tires) )
                    setCountTires(0)
                }
            }
        }

        if(!isServiceCollection){
            setAddress('')
            if(countServiceCollection === 1){
                if (currentWorkshopProf?.serviceCollectionCharge) {
                    setTotalCharge(totalCharge - parseFloat(currentWorkshopProf?.serviceCollectionCharge) )
                    setCountServiceCollection(0)
                }
            }
           
        } else {
            if (currentWorkshopProf?.serviceCollectionCharge  && countServiceCollection === 0) {
                setTotalCharge(totalCharge + parseFloat(currentWorkshopProf?.serviceCollectionCharge) )
                setCountServiceCollection(1)
                console.log(totalCharge)
            }
        }

        if(totalCharge < 0){ 
            setTotalCharge(0)
        }

        if(!isServiceCollection && !isOil && !isDamper && !isBattery && !isAirConditioning && !isTires && !isBrakes && !isEngine && !isFullReview && !isExtraReview){
            setTotalCharge(0)
        }
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
                                <Text style={styles.title} >Agendamento</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scroll} >
                            <View style={styles.inputDiv}>
                                <Text style={styles.textInputTitle} >Serviços</Text>
                            </View>
                            { (currentWorkshopProf?.fullReview === "yes" || currentWorkshopProf?.fullReview === undefined) ? (<>
                            
                                <View style={styles.checkboxDiv} >
                                    <Checkbox
                                        value={isFullReview}
                                        onValueChange={setFullReview}
                                        style={styles.checkbox}
                                        
                                    />                       
                                    <Text style={styles.textCheck} >Revisão Completa</Text>                                   
                                </View>
                            
                            {(isFullReview === false) ? ( <>
                                <View style={styles.checkboxDivCh}>
                                    <Checkbox
                                        value={isOil}
                                        onValueChange={setOil}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.textCheck}>Mudança de Óleo</Text>
                                </View>
                                <View style={styles.checkboxDivCh}>
                                    <Checkbox
                                        value={isDamper}
                                        onValueChange={setDamper}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.textCheck}>Amortecedores</Text>
                                </View>
                                <View style={styles.checkboxDivCh}>
                                    <Checkbox
                                        value={isBrakes}
                                        onValueChange={setBrakes}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.textCheck}>Travões</Text>
                                </View>
                                <View style={styles.checkboxDivCh}>
                                    <Checkbox
                                        value={isEngine}
                                        onValueChange={setEngine}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.textCheck}>Motor</Text>
                                </View>
                            </>
                            ) : (<></>)}
                            </>
                            ) : (<></>)
                            }
                            { (currentWorkshopProf?.extraReview === "yes" || currentWorkshopProf?.extraReview === undefined) ? (<>
                            <View style={styles.checkboxDiv}>
                                <Checkbox
                                    value={isExtraReview}
                                    onValueChange={setExtraReview}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.textCheck}>Revisão Extra</Text>
                            </View>
                            {(isExtraReview === false) ? ( <>
                            <View style={styles.checkboxDivCh}>
                                <Checkbox
                                    value={isBattery}
                                    onValueChange={setBattery}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.textCheck}>Bateria</Text>
                            </View>
                            <View style={styles.checkboxDivCh}>
                                <Checkbox
                                    value={isTires}
                                    onValueChange={setTires}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.textCheck}>Pneus</Text>
                            </View>
                            <View style={styles.checkboxDivCh}>
                                <Checkbox
                                    value={isAirConditioning}
                                    onValueChange={setAirConditioning}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.textCheck}>Ar Condicionado</Text>
                            </View>
                            </>
                            ) : (<></>)}
                            </>
                            ) : (<></>)
                            }
                            { (currentWorkshopProf?.serviceCollection === "yes" || currentWorkshopProf?.serviceCollection === undefined) ? (<>
                                <View style={styles.checkboxDiv}>
                                    <Checkbox
                                        value={isServiceCollection}
                                        onValueChange={setServiceCollection}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.textCheck}>Recolha e Entrega</Text>
                                </View>
                                {(isServiceCollection) ?
                                    <View style={styles.inputDiv}>
                                        <Text style={styles.inputModText} >Morada</Text>
                                        <TextInput style={styles.inputMod} placeholder="ex: Rua do Morro, 123, Porto" value={address} onChangeText={(text) => setAddress(text)} />
                                    </View>
                                    : <></>
                                }
                            </>
                            ) : (<></>)
                            }
                            <View style={styles.inputDiv} >
                                <Text style={styles.textInputTitle} >Observações</Text>
                                <TextInput multiline={true} placeholder={'Deixe aqui algumas considerações sobre o problema do seu veículo...'} numberOfLines={8} value={obs} onChangeText={(text) => setObs(text)} style={styles.input} />
                            </View>
                        </ScrollView>
                        <Text style={styles.textInputTitle}>Orçamento: {totalCharge}€</Text>
                        <ButtonIcon title="Marcar" onPress={() => handleSave(obs)} />
                    </View>
            </KeyboardAvoidingView>
    )
}