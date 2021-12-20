

import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground, FlatList } from 'react-native'
import firebase from "../../config/firebase";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { theme } from '../../global/styles/theme'

import uploadImg from '../../assets/upload.png'
import arrowBack from '../../assets/arrow-back.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';
import { RectButton } from 'react-native-gesture-handler';
import CheckMark from '../../assets/check-mark.png'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ButtonEval } from '../../components/ButtonEval';


export function ProfDetails(){
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const {getProfUser, evaluationsList, getEvaluationsList, currentWorkshopProf, handleExistEvaluation} = useContext(AuthContext)

    //console.log(currentWorkshopProf)
    useEffect(() => {
        if(currentWorkshopProf){
            getEvaluationsList(currentWorkshopProf?.id);
            console.log(evaluationsList)
        }
    }, [])

    function goBack() {
        navigation.goBack()
    }

    function goToAppointment(){
        navigation.navigate('AppointmentInitial' as never)
    }
    
    function goToEvaluation() {
        if(currentWorkshopProf){
            handleExistEvaluation(currentWorkshopProf?.id, currentWorkshopProf)
        }
    }

    function goToEvaluationList(){
        navigation.navigate('Evaluations' as never, {company: currentWorkshopProf} as never)
    }

    const renderItem = (evaluation: any) => {
        if (evaluation.index === 0) {
            return (
                <View>
                    <Text style={{color: theme.colors.heading, fontSize: 20, fontFamily: theme.fonts.text, paddingTop: 0, paddingLeft: 26}}>{evaluation.item.username}</Text>
                    <Text style={styles.secText}> Comentário: {evaluation.item.obs}</Text>
                </View>  
            )
        } else if (evaluation.index === 1){
            return (
                <View>
                    <Text style={{color: theme.colors.heading, fontSize: 20, fontFamily: theme.fonts.text, paddingTop: 0, paddingLeft: 26}}>{evaluation.item.username}</Text>
                    <Text style={styles.secText}> Comentário: {evaluation.item.obs}</Text>
                </View>  
            )
        } else {
            return <></>
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
                            {(currentWorkshopProf?.image === "") ? (
                                <View style={styles.header}  >
                                    <RectButton style={styles.goBack} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    <Image source={uploadImg} style={styles.upload} />
                                    
                                </View>
                            ) : (
                                <View style={styles.headerUploaded} >
                                    <ImageBackground source={{uri: currentWorkshopProf?.image }} style={styles.imageUploaded} >
                                    <RectButton style={styles.goBackUploaded} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    </ImageBackground>
                                </View>
                            )}
                        </View>
                        <ScrollView>
                            <View style={styles.login}>
                                <View style={styles.titleView}>
                                    <Text style={styles.title}>
                                        {currentWorkshopProf?.username}
                                    </Text>
                                    <Text style={styles.desc}>
                                        {currentWorkshopProf?.address}
                                    </Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.secHeading}>Serviços</Text>
                                    {(currentWorkshopProf?.fullReview) ? 
                                        <Text style={styles.secText}>Revisão Completa</Text>
                                    : <></>
                                    }
                                    {(currentWorkshopProf?.extraReview) ? 
                                        <Text style={styles.secText}>Revisão Extra</Text>
                                    : <></>
                                    }
                                    {(currentWorkshopProf?.serviceCollection) ? 
                                        <Text style={styles.secText}>Serviço de Pickup</Text>
                                    : <></>
                                    }
                                </View>
                                <View>
                                    <Text style={styles.secHeading}>Avaliações</Text>
                                    <RectButton onPress={goToEvaluationList}>
                                        <FlatList data={evaluationsList} renderItem={item => renderItem(item)} keyExtractor={item => item.index} />
                                    </RectButton>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.buttonDiv} >                
                            <View style={styles.eval}>
                                <RectButton onPress={goToEvaluation} >
                                    <Image source={CheckMark} style={styles.imgEval} />
                                </RectButton>
                            </View>
                            <View style={styles.button}>
                                <ButtonEval title="Marcar Reparação" onPress={goToAppointment}  />
                            </View>
                        </View>
                    </View>
            </KeyboardAvoidingView>
    )
}