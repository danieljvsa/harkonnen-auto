
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

export function AppointmentDetails({route}: any){
    const {appointmentBreakMaintenance, appointmentPreventiveMaintenance, appointmentTrailer, appointmentTrailerPickup, currentUser} = useContext(AuthContext)
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const {id, id_company} = route.params
    
  

  function goBack() {
    navigation.goBack()
  }

  useEffect(() => {
    
  }, [])

  

  function handleEdit() {
    if (appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company){
      navigation.navigate('AppointmentEdit' as never, {appointment: appointmentBreakMaintenance} as never)
    } else if (appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company){
      navigation.navigate('AppointmentEdit' as never, {appointment: appointmentPreventiveMaintenance} as never)
    } else if (appointmentTrailer?.id === id && appointmentTrailer?.id_company === id_company){
      navigation.navigate('AppointmentEdit' as never, {appointment: appointmentTrailer} as never)
    } else if (appointmentTrailerPickup?.id === id && appointmentTrailerPickup?.id_company === id_company){
      navigation.navigate('AppointmentEdit' as never, {appointment: appointmentTrailerPickup} as never)
    } else {

    }
  }

  

    return(
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.scroll}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.header}>
                <RectButton style={styles.goBack} onPress={goBack} >
                    <Image source={arrowBack} style={styles.arrowBack}  />
                </RectButton>
            </View>
            <View style={{marginTop: 60}} >
              <Text style={styles.img}>Agendamentos</Text>
            </View>
            <ScrollView style={styles.list} >
              {(appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company) ? 
                <View>
                  <Text>{appointmentBreakMaintenance?.serviceType}</Text>
                  <Text>{appointmentBreakMaintenance?.date}</Text>
                  <Text>{appointmentBreakMaintenance?.hour}</Text>
                  <Text>{appointmentBreakMaintenance?.model}</Text>
                  <Text>{appointmentBreakMaintenance?.brand}</Text>
                  <Text>{appointmentBreakMaintenance?.obs}</Text>
                  <Text>{appointmentBreakMaintenance?.username}</Text>
                </View> : <></>
              }
              {(appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company) ? 
                <View>
                  <Text>{appointmentPreventiveMaintenance?.serviceType}</Text>
                  <Text>{appointmentPreventiveMaintenance?.date}</Text>
                  <Text>{appointmentPreventiveMaintenance?.hour}</Text>
                  <Text>{appointmentPreventiveMaintenance?.model}</Text>
                  <Text>{appointmentPreventiveMaintenance?.brand}</Text>
                  <Text>{appointmentPreventiveMaintenance?.obs}</Text>
                  <Text>{appointmentPreventiveMaintenance?.totalCharge}</Text>
                  <Text>{appointmentPreventiveMaintenance?.username}</Text>
                </View> : <></>
              }
              {(appointmentTrailer?.id === id && appointmentTrailer?.id_company === id_company) ? 
                <View>
                  <Text>{appointmentTrailer?.serviceType}</Text>
                  <Text>{appointmentTrailer?.date}</Text>
                  <Text>{appointmentTrailer?.model}</Text>
                  <Text>{appointmentTrailer?.brand}</Text>
                  <Text>{appointmentTrailer?.obs}</Text>
                  <Text>{appointmentTrailer?.totalCharge}</Text>
                  <Text>{appointmentTrailer?.username}</Text>
                </View> : <></>
              }
              {(appointmentTrailerPickup?.id === id && appointmentTrailerPickup?.id_company === id_company) ? 
                <View>
                  <Text>{appointmentTrailerPickup?.serviceType}</Text>
                  <Text>{appointmentTrailerPickup?.date}</Text>
                  <Text>{appointmentTrailerPickup?.hour}</Text>
                  <Text>{appointmentTrailerPickup?.model}</Text>
                  <Text>{appointmentTrailerPickup?.brand}</Text>
                  <Text>{appointmentTrailerPickup?.obs}</Text>
                  <Text>{appointmentTrailerPickup?.totalCharge}</Text>
                  <Text>{appointmentTrailerPickup?.username}</Text>
                </View> : <></>
              }
              <View>
                <Text>
                </Text>
              </View>
            </ScrollView>
            {(currentUser?.account === 'user') ? <ButtonIcon title="Editar" onPress={() => handleEdit()} /> : <></> }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}