

import React, { useContext, useState } from 'react'
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
import * as Location from 'expo-location';


export function GeneralInformation(){
    const navigation = useNavigation()
    const {updateName, currentUser, updateEmail, updatePhone, updateImage, updateAddress, locations, updateLocation, currentClient} = useContext(AuthContext)
    const [email, setEmail] = useState(currentClient?.email || '')
    const [name, setName] = useState(currentClient?.username || '')
    const [phone, setPhone] = useState(currentClient?.phone || '')
    const [address, setAddress] = useState(currentClient?.address || '')
    const [image, setImage] = useState(currentClient?.image ||'')
    const [location, setLocation] = useState('')
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)

    async function GetCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();

        await Location.enableNetworkProviderAsync()
      
        if (status !== 'granted') {
          Alert.alert(
            'Permission not granted',
            'Allow the app to use location service.',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        }
      
        let resCode = await Location.geocodeAsync(address)
        let latitude = 0
        let longitude = 0
      
        if (resCode) {
            resCode.map((res) => {
                latitude = res.latitude
                longitude = res.longitude
            })
            console.log(latitude + ", " + longitude )
          let response = await Location.reverseGeocodeAsync({
            latitude ,
            longitude
          });
      
          for (let item of response) {
            let location = `${item.region}`;
            setLocation(location);
          }

          console.log(location)
        }
      };

    async function CheckIfLocationEnabled() {
        let enabled = await Location.hasServicesEnabledAsync();
    
        if (!enabled) {
          Alert.alert(
            'Location Service not enabled',
            'Please enable your location services to continue',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        } else {
          setLocationServiceEnabled(enabled);
        }
      };

    async function handleUpdates() {
        if(name != ""){
            updateName(name)
        }
        if(email != ""){
            updateEmail(email)
        }
        if(phone != ""){
            updatePhone(phone)
        }
        if(image != ""){
            updateImage(image)
        }
        if(address != ""){
            CheckIfLocationEnabled()
            GetCurrentLocation()
            if (location != ""){
                updateLocation(location)
            }
            updateAddress(address)
        }
    }

    function goBack() {
        navigation.goBack()
    }

    async function pickImage(){
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
            return;
        }
      
        const { uri } = pickerResult as unknown as ImageInfo
        setImage(uri);
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.scroll}
        >
                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                        <View style={styles.header}  >
                            {(image === "") ? (
                                <View style={styles.header}  >
                                    <RectButton style={styles.goBack} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                    <RectButton onPress={pickImage} >
                                        <Image source={uploadImg} style={styles.upload} />
                                    </RectButton>
                                </View>
                            ) : (
                                <View style={styles.headerUploaded} >
                                    <ImageBackground source={{uri: image}} style={styles.imageUploaded} >
                                    <RectButton style={styles.goBackUploaded} onPress={goBack} >
                                        <Image source={arrowBack} style={styles.arrowBack}  />
                                    </RectButton>
                                   </ImageBackground>
                                </View>
                            )}
                        </View>
                        <ScrollView>
                            <View style={styles.login}>
                                <View style={styles.inputG} >
                                    <Text style={styles.inputTitle} >Nome</Text>
                                    <TextInput style={styles.input} placeholder="ex: Paul Atreides" value={name} onChangeText={(text) => setName(text)} />
                                </View>
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Email</Text>
                                    <TextInput style={styles.input} autoCapitalize="none" placeholder="ex: example@gmail.com" value={email} onChangeText={(text) => setEmail(text)} />
                                </View>
                                <View style={styles.inputG}>
                                    <Text style={styles.inputTitle} >Nº de Telefone</Text>
                                    <TextInput style={styles.input} placeholder="ex: 912333222" value={phone} onChangeText={(text) => setPhone(text)} />
                                </View>
                                {(currentUser?.account === "workshop" || currentUser?.account === "trailers" || currentUser?.account === "employee") ? (
                                    <>
                                        <View style={styles.inputG}>
                                            <Text style={styles.inputTitle} >Morada</Text>
                                            <TextInput style={styles.input} placeholder="ex: Rua do Morro, 123, Porto" value={address} onChangeText={(text) => setAddress(text)} />
                                        </View>
                                    </>
                                ) : (
                                    <View style={styles.inputG}>
                                        <Text style={styles.inputTitle}></Text>
                                        <TextInput />
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                        <ButtonIcon title="Salvar" onPress={handleUpdates} />
                    </View>
            </KeyboardAvoidingView>
    )
}