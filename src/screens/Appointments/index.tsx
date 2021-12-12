
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

export function Appointments(){
    const {workshopList, getAppointmentById, getAppointmentsList, appoitmentsList, currentUser} = useContext(AuthContext)
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  
    
  

  function goBack() {
    navigation.goBack()
  }

  useEffect(() => {
    getAppointmentsList()
  }, [])

  

  function goToAppointmentDetails(id: string, companyId: string) {
    if(id != '' && companyId != ''){
      getAppointmentById(id, companyId)
      navigation.navigate('AppointmentDetails' as never, {id: id, id_company: companyId} as never)
    }
  }

  const renderItem = (appoitment: any) => {  
    if(appoitment){
        if(appoitment.item.serviceType === 'preventiveMaintenance'){
          return (
            <RectButton key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company)} >
              <Text>Manutenção Preventiva</Text>
              <Text>{appoitment.item.date} {appoitment.item.hour}</Text>
              <Text>{(currentUser?.account != 'user') ? `Marcado por ${appoitment.item.username}`: appoitment.item.username}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'breakMaintenance'){
          return (
            <RectButton key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company)}>
              <Text>Manutenção de Rutura</Text>
              <Text>{appoitment.item.date} {appoitment.item.hour}</Text>
              <Text>{(currentUser?.account != 'user') ? `Marcado por ${appoitment.item.username}`: appoitment.item.username}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'assistanceRequest'){
          return (
            <RectButton key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company)}>
              <Text>Pedido de Assistência</Text>
              <Text>Prioridade: Muito Alta</Text>
              <Text>{appoitment.item.date}</Text>
              <Text>{(currentUser?.account != 'user') ? `Marcado por ${appoitment.item.username}`: appoitment.item.username}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'mechanicalAssistance'){
          return (
            <RectButton key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company)}>
              <Text>Assitência Mecânica</Text>
              <Text>Prioridade: Alta</Text>
              <Text>{appoitment.item.date}</Text>
              <Text>{(currentUser?.account != 'user') ? `Marcado por ${appoitment.item.username}`: appoitment.item.username}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'pickup'){
          return (
            <RectButton key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company)}>
              <Text>Serviços de Pickup</Text>
              <Text>{appoitment.item.date} {appoitment.item.hour}</Text>
              <Text>{(currentUser?.account != 'user') ? `Marcado por ${appoitment.item.username}`: appoitment.item.username}</Text>
            </RectButton> 
            ) 
        } else{
        return (<></>)
      }
    } else {
      return (<></>)
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
              <FlatList data={appoitmentsList} renderItem={item => renderItem(item)} keyExtractor={item => item.index} />
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}