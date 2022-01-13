

import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground, FlatList } from 'react-native'
import firebase from "../../config/firebase";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

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
import { theme } from '../../global/styles/theme';
import { Stars } from '../../components/Stars';


export function ViewProfileProf({route}: any){
    const navigation = useNavigation()
    const {currentUser, currentClient, getEvaluationsList, evaluationsList, handleExistEvaluation} = useContext(AuthContext)
    const {id} = route.params
    
    function goBack() {
        //função para voltar uma tela atrás
        navigation.goBack()
    }

    useEffect(() => {
        if(currentUser){
            if(currentUser.account === 'employee' && currentUser?.companyId){
                //função para resgatar lista de avaliações do perfil do utilizador
                getEvaluationsList(id);
                console.log(evaluationsList)
            } else {
                //função para resgatar lista de avaliações do perfil do utilizador
                getEvaluationsList(id);
                console.log(evaluationsList)
            }
        }
    }, [])

    function goToEvaluation() {
        if(currentClient){
            //função para veificar existência de avaliações 
            handleExistEvaluation(currentClient.id, currentClient)
        }
    }

    //função para navegar para a screens de avaliações desta empresa
    function goToEvaluationList(){
        navigation.navigate('Evaluations' as never, {company: currentClient} as never)
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
                            {(currentClient?.image === undefined) ? (
                                <View style={styles.header}  >
                                    <RectButton style={styles.goBack} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    <Image source={uploadImg} style={styles.upload} />
                                    
                                </View>
                            ) : (
                                <View style={styles.headerUploaded} >
                                    <ImageBackground source={{uri: (currentClient?.image != undefined) ? currentClient?.image : currentClient?.image }} style={styles.imageUploaded} >
                                    <RectButton style={styles.goBackUploaded} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    </ImageBackground>
                                </View>
                            )}
                        </View>
                        <ScrollView>
                            <View style={styles.login}>
                                {(currentClient?.account === 'user') ? 
                                    <View style={styles.titleView}>
                                        <Text style={styles.title}>
                                            {currentClient?.username}
                                        </Text>
                                    </View> : ((currentClient?.account === 'workshop') ? ( <>  
                                        <View style={styles.titleView}>                  
                                            <Text style={styles.title}>
                                                {currentClient?.username}
                                            </Text>
                                            <View style={{marginLeft: 26, marginTop: -20}}>
                                                <Stars stars={currentClient?.evaluationAgerage} showNumber={true}  />
                                            </View>
                                            <Text style={styles.desc}>
                                                {currentClient?.address}
                                            </Text>
                                        </View>
                                        <View style={{marginBottom: 10}}>
                                            <Text style={styles.secHeading}>Serviços</Text>
                                            {(currentClient?.fullReview) ? 
                                                <Text style={styles.secText}>Revisão Completa</Text>
                                            : <></>
                                            }
                                            {(currentClient?.extraReview) ? 
                                                <Text style={styles.secText}>Revisão Extra</Text>
                                            : <></>
                                            }
                                            {(currentClient?.serviceCollection) ? 
                                                <Text style={styles.secText}>Serviço de Pickup</Text>
                                            : <></>
                                            }
                                        </View>
                                        </>
                                    ) : ( <>
                                        <View style={styles.titleView}>
                                            <Text style={styles.title}>
                                                {currentClient?.username}
                                            </Text>
                                            <Text style={styles.desc}>
                                                {currentClient?.address}
                                            </Text>
                                        </View>
                                        <View style={{marginBottom: 10}}>
                                            <Text style={styles.secHeading}>Serviços</Text>
                                            {(currentClient?.assistanceRequest) ? 
                                                <Text style={styles.secText}>Pedido de Assistência</Text>
                                            : <></>
                                            }
                                            {(currentClient?.mechanicalAssistance) ? 
                                                <Text style={styles.secText}>Assitência Mecânica</Text>
                                            : <></>
                                            }
                                            {(currentClient?.pickup) ? 
                                                <Text style={styles.secText}>Serviço de Pickup</Text>
                                            : <></>
                                            }
                                        </View>
                                        </>
                                    ))
                                }
                                <View>
                                    <Text style={styles.secHeading}>Avaliações</Text>
                                    <RectButton onPress={goToEvaluationList}>
                                        <FlatList data={evaluationsList} renderItem={item => renderItem(item)} keyExtractor={item => item.index} />
                                    </RectButton>
                                </View>
                            </View>      
                        </ScrollView>
                        <View style={styles.buttonDiv} >
                            <View style={styles.button}>
                                <ButtonEval title="Avaliar" onPress={goToEvaluation} />
                            </View>
                        </View>
                    </View>
            </KeyboardAvoidingView>
    )
}