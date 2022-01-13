

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

export function AppointmentBreakMaintenance(){
    const navigation = useNavigation()
    const [images, setImages] = useState<any[]>([])
    const [obs, setObs] = useState('')
    
    const {handleAppointmentWorkshopMark, currentUser, currentWorkshopProf} = useContext(AuthContext)

    useEffect(() => {}, [images])

    function goBack() {
        //função para voltar uma tela atrás
        navigation.goBack()
    }

    async function pickImage(){
        let imageList: any[] = []
        //loop para colocar as imagens esolhidas num estado
        for (let index = 0; index < images.length; index++) {
            imageList.push(images[index])        
        }
        //pedido de acesso à galeria do dispositivo
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        //acesso à galeria
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
            return;
        }
        
        //coloca os acessos das imagens escolhidas visiveis para utilização
        const { uri } = pickerResult as unknown as ImageInfo
        imageList.push(uri as never)
        if(imageList.length <= 6){
            setImages(imageList as never)
        }

        console.log(images)
    }

    //função para eliminar imagens expostas
    async function deleteImage(image: any) {
        let imageList = []
        for (let index = 0; index < images.length; index++) {
            imageList.push(images[index])        
        }
        const index = imageList.indexOf(image);
        imageList.splice(index, 1);
        setImages(imageList)
        console.log(images)
    }

    //item para regular como os elementos da lista irão se comportar
    const renderItem = (image: any) => {
        if(images.length > 0){
            return ( <>
                <ImageBackground source={{uri: image.item}} key={image.index} style={styles.imageUploaded} >
                    <RectButton onPress={() => deleteImage(image.item)} >
                        <Image source={cross} style={styles.cross} />
                    </RectButton>
                </ImageBackground>
                </>
            )
        }else{
            return <></>
        }

    }

    //função para guardar os dados do agendamento na base de dados e enviar de volta à screen de pesquisa
    function handleSave(images: any [], obs: string) {
        if(currentWorkshopProf?.username && currentUser?.username){
            if(currentUser.account === 'employee' && currentUser.enterpriseName){
                handleAppointmentWorkshopMark(images, obs, currentWorkshopProf?.username, currentUser?.enterpriseName)
                navigation.navigate('WorkshopSearch' as never)
            } else {
                handleAppointmentWorkshopMark(images, obs, currentWorkshopProf?.username, currentUser?.username)
                navigation.navigate('WorkshopSearch' as never)
            }
            
        }
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.scroll}
        >
            <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                        <View style={styles.header}  >  
                            <View>
                                <RectButton style={styles.goBack} onPress={goBack} >
                                    <Image source={arrowBack} style={styles.arrowBack}  />
                                </RectButton>
                                <Text style={styles.title} >Agendamento</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scroll} >
                            <View>
                                <Text style={styles.text} >Imagens do veículo</Text>
                                {console.log(images.length)} 
                                <View style={styles.imagesBox} >
                                {(typeof images !== undefined && images.length > 0) ? 
                                    (<>
                                    <FlatList data={images} renderItem={item => renderItem(item)} keyExtractor={item => item.index} numColumns={3} />
                                    <RectButton onPress={pickImage} >
                                        <Image source={uploadImg} style={styles.uploaded} />
                                    </RectButton> 
                                    </>)
                                : (
                                    <RectButton onPress={pickImage} >
                                        <Image source={uploadImg} style={styles.uploaded} />
                                    </RectButton>
                                )
                                }</View>
                            </View>
                            <View style={styles.inputDiv} >
                                <Text style={styles.textInputTitle} >Observações</Text>
                                <TextInput multiline={true} placeholder={'Deixe aqui algumas considerações sobre o problema do seu veículo...'} numberOfLines={8} value={obs} onChangeText={(text) => setObs(text)} style={styles.input} />
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Marcar" onPress={() => handleSave(images, obs)} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}