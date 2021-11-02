
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

import target from '../../assets/target.png'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location';

export function WorkshopSearch(){
    const {currentUser} = useContext(AuthContext)
    const navigation = useNavigation()
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
      'Wait, we are fetching you location...'
    );
  
    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
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
      
          for (let item of response) {
            let address = `${item.region}`;
      
            setDisplayCurrentAddress(address);
          }
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

    function goToProfile() {
        navigation.navigate('Profile' as never)
    }

    return(
        <View style={styles.container}>
            {console.log(displayCurrentAddress)}
            <RectButton onPress={CheckIfLocationEnabled} >
                <Image source={target} />
            </RectButton>
        </View>
    )
}