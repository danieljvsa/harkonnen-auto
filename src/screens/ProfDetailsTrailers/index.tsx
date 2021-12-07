

import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground } from 'react-native'
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


export function ProfDetailsTrailers(){
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const {getProfUser, currentTrailerProf, currentWorkshopProf, currentUser} = useContext(AuthContext)

    console.log(currentTrailerProf)

    function goBack() {
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
                            {(currentTrailerProf?.image === "") ? (
                                <View style={styles.header}  >
                                    <RectButton style={styles.goBack} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    <Image source={uploadImg} style={styles.upload} />
                                    
                                </View>
                            ) : (
                                <View style={styles.headerUploaded} >
                                    <ImageBackground source={{uri: currentTrailerProf?.image }} style={styles.imageUploaded} >
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
                                        {currentTrailerProf?.username}
                                    </Text>
                                    <Text style={styles.desc}>
                                        {currentTrailerProf?.address}
                                    </Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.secHeading}>Serviços</Text>
                                    {(currentTrailerProf?.assistanceRequest) ? 
                                        <Text style={styles.secText}>Pedido de Assistência</Text>
                                    : <></>
                                    }
                                    {(currentTrailerProf?.mechanicalAssistance) ? 
                                        <Text style={styles.secText}>Assitência Mecânica</Text>
                                    : <></>
                                    }
                                    {(currentTrailerProf?.pickup) ? 
                                        <Text style={styles.secText}>Serviço de Pickup</Text>
                                    : <></>
                                    }
                                </View>
                                <View>
                                    <Text style={styles.secHeading}>Avaliações</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.buttonDiv} >
                        
                                <View style={styles.eval}>
                                    <RectButton >
                                        <Image source={CheckMark} style={styles.imgEval} />
                                    </RectButton>
                                </View>
                                <View style={styles.button}>
                                    <ButtonEval title="Pedir Reboque" />
                                </View>
                        </View>
                    </View>
            </KeyboardAvoidingView>
    )
}