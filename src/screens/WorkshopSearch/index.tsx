
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import logoImg from '../../assets/logo.png'
import arrowBack from '../../assets/arrow-back.png'

import target from '../../assets/target.png'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import { CardProfileProf } from '../../components/CardProfileProf'

export function WorkshopSearch(){
    const {getWorkshopList, workshopList, getProfUserbyId, location} = useContext(AuthContext)
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  
    
    useEffect(() => {
      CheckIfLocationEnabled();
      GetCurrentLocation();
      if(displayCurrentAddress != "Wait, we are fetching you location..."){
        getWorkshopList(displayCurrentAddress)
      }
  }, [displayCurrentAddress]);

  function goBack() {
    navigation.goBack()
  }

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
    
      let { coords } = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
      
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
        
        //console.log(response)

        for (let item of response) {
          let address = `${item.region}`;
          
          //console.log(address)
          setDisplayCurrentAddress(address);
          
          getWorkshopList(displayCurrentAddress)
          
        }
      }
    };

    //console.log(workshopList)

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

  function goToProfDetails(userId: string) {
    if(userId != ''){
      getProfUserbyId(userId)
      navigation.navigate('ProfDetails' as never)
    }
  }

  const renderItem = (workshop: any) => {
    return <CardProfileProf title={workshop.item.username} image={workshop.item.image} key={workshop.index} onPress={() => goToProfDetails(workshop.item.id)} />     
  } 

    return(
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.scroll}
      >
        <View style={styles.container}>
        <View style={styles.header}>
                <RectButton style={styles.goBack} onPress={goBack} >
                    <Image source={arrowBack} style={styles.arrowBack}  />
                </RectButton>
            </View>
            <Image source={logoImg} style={styles.img} />
            <View style={styles.search}>
              <TextInput style={styles.inputSearch} placeholder="Pesquisar oficinas" value={search} onChangeText={(text) => setSearch(text)} />
              <RectButton style={styles.geoCont} >
                <Image source={target} style={styles.geo} />
              </RectButton>
            </View>
            <ScrollView style={styles.list} >
              <FlatList data={workshopList} renderItem={item => renderItem(item)} keyExtractor={item => item.index} />
            </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
}