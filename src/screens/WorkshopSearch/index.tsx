
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

import target from '../../assets/target.png'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import { CardProfileProf } from '../../components/CardProfileProf'

export function WorkshopSearch(){
    const {getWorkshopList, workshopList} = useContext(AuthContext)
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
  }, []);

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

    function goToProfile() {
        navigation.navigate('Profile' as never)
    }

    return(
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.scroll}
      >
        <View style={styles.container}>
            <View>
              <TextInput style={styles.input} placeholder="ex: Paul Atreides" value={search} onChangeText={(text) => setSearch(text)} />
              <RectButton >
                <Image source={target} />
              </RectButton>
            </View>
            <ScrollView>
              {workshopList.map((workshop: any) => {
                return <CardProfileProf title={workshop.username} image={workshop.image} key={workshop.id} />
              })}
            </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
}