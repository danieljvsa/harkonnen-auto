

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
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


export function ViewProfile(){
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const {getClientUser, currentClient} = useContext(AuthContext)

    useEffect(() => {
        getClientUser()
    }, [currentClient])

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
                            {(currentClient?.image === "") ? (
                                <View style={styles.header}  >
                                    <RectButton style={styles.goBack} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    <Image source={uploadImg} style={styles.upload} />
                                    
                                </View>
                            ) : (
                                <View style={styles.headerUploaded} >
                                    <ImageBackground source={{uri: currentClient?.image}} style={styles.imageUploaded} >
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
                                        {currentClient?.username}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.button}>
                            <ButtonIcon title="Avaliar" />
                        </View>
                    </View>
            </KeyboardAvoidingView>
    )
}