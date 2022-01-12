
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { theme } from '../../global/styles/theme'
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
    const [isDetail, setIsDetail] = useState(false)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const[app, setApp] = useState<Object | null>(null)
    
  

  function goBack() {
    //função para voltar uma tela atrás
    navigation.goBack()
  }

  useEffect(() => {
    //função para resgatar a lista deagendamentos do utiliazdor ou empresa
    getAppointmentsList()
  }, [isDetail])

  
  //função para o utilizador ir de encontro à screen de detalhes do«e um agendamento
  function goToAppointmentDetails(id: string, companyId: string, currentUserId: string, currentWorkshopProf: string, appointment: any) {
    if(id != '' && companyId != '' && appointment){
      getAppointmentById(id, companyId, currentUserId)
      setIsDetail(true)
      navigation.navigate('AppointmentDetails' as never, {id: id, id_company: companyId, currentUserId: currentUserId, currentWorkshopProf: currentWorkshopProf, appointment: appointment.item} as never)
    }
  }

  //Bloco para controlar comportamento de cada tipo de agendamento na lista
  const renderItem = (appoitment: any) => {  
    if(appoitment){
        if(appoitment.item.serviceType === 'preventiveMaintenance'){

          return (
            <RectButton style={styles.containerCard} key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company, appoitment.item.currentUserId, appoitment.item.currentWorkshopProf, appoitment)} >
              <Text style={styles.cardTitle} >Manutenção Preventiva</Text>
              <Text style={styles.cardText}>Data e Hora: {appoitment.item.date} {appoitment.item.hour}</Text>
              <Text style={{color: theme.colors.input, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginBottom: 8, marginLeft: 20}}>{(currentUser?.account != 'user' && currentUser?.id != appoitment.item.currentUserId) ? `Marcado por ${appoitment.item.username}`: `Empresa: ${appoitment.item.username}`}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'breakMaintenance'){
         
          return (
            <RectButton style={styles.containerCard} key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company, appoitment.item.currentUserId, appoitment.item.currentWorkshopProf, appoitment)}>
              <Text style={styles.cardTitle} >Manutenção de Rutura</Text>
              <Text style={styles.cardText}>Data e Hora: {appoitment.item.date} {appoitment.item.hour}</Text>
              <Text style={{color: theme.colors.input, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginBottom: 8, marginLeft: 20}}>{(currentUser?.account != 'user' && currentUser?.id != appoitment.item.currentUserId) ? `Marcado por ${appoitment.item.username}`: `Empresa: ${appoitment.item.username}`}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'assistanceRequest'){
          
          return (
            <RectButton style={styles.containerCard} key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company, appoitment.item.currentUserId, appoitment.item.currentWorkshopProf, appoitment)}>
              <Text style={styles.cardTitle} >Pedido de Assistência</Text>
              <Text style={{color: theme.colors.errorMessage, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginLeft: 20}} >Prioridade: Muito Alta</Text>
              <Text style={styles.cardText}>Data e Hora: {appoitment.item.date} {appoitment.item.hour}</Text>
              <Text style={{color: theme.colors.input, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginBottom: 8, marginLeft: 20}}>{(currentUser?.account != 'user' && currentUser?.id != appoitment.item.currentUserId) ? `Marcado por ${appoitment.item.username}`: `Empresa: ${appoitment.item.username}`}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'mechanicalAssistance'){
          
          return (
            <RectButton style={styles.containerCard} key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company, appoitment.item.currentUserId, appoitment.item.currentWorkshopProf, appoitment)}>
              <Text style={styles.cardTitle} >Assitência Mecânica</Text>
              <Text style={{color: theme.colors.errorMessage, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginLeft: 20}} >Prioridade: Alta</Text>
              <Text style={styles.cardText}>Data e Hora: {appoitment.item.date}</Text>
              <Text style={{color: theme.colors.input, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginBottom: 8, marginLeft: 20}}>{(currentUser?.account != 'user' && currentUser?.id != appoitment.item.currentUserId) ? `Marcado por ${appoitment.item.username}`: `Empresa: ${appoitment.item.username}`}</Text>
            </RectButton> 
            ) 
        }
        else if(appoitment.item.serviceType === 'pickup'){
          
          return (
            <RectButton style={styles.containerCard} key={appoitment.index} onPress={() => goToAppointmentDetails(appoitment.item.id, appoitment.item.id_company, appoitment.item.currentUserId, appoitment.item.currentWorkshopProf, appoitment)}>
              <Text style={styles.cardTitle} >Serviços de Pickup</Text>
              <Text style={styles.cardText}>Data e Hora: {appoitment.item.date} {appoitment.item.hour}</Text>
              <Text style={{color: theme.colors.input, fontSize: 18, flex: 1, fontFamily: theme.fonts.text, marginBottom: 8, marginLeft: 20}}>{(currentUser?.account != 'user' && currentUser?.id != appoitment.item.currentUserId) ? `Marcado por ${appoitment.item.username}`: `Empresa: ${appoitment.item.username}`}</Text>
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