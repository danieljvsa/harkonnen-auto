
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import cross from '../../assets/cross.png'
import arrowBack from '../../assets/arrow-back.png'

import target from '../../assets/target.png'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import { CardProfileProf } from '../../components/CardProfileProf'

export function AppointmentDetails({route}: any){
    const {handleTotalCharge, appointmentBreakMaintenance, appointmentPreventiveMaintenance, appointmentTrailer, appointmentTrailerPickup, currentUser} = useContext(AuthContext)
    const navigation = useNavigation()
    const {id, id_company, currentUserId, currentWorkshopProf, appointment} = route.params
    const [isOption, setOption] = useState(false)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [totalCharge, setTotalCharge] = useState('')
    const {deleteAppointment} = useContext(AuthContext)
  

    useEffect(() => {
      if(appointment.serviceType === 'breakMaintenance'){
        if(appointment.totalCharge){
          setTotalCharge(appointment?.totalCharge)
        }
      } else {
        if(appointment.totalCharge){
          setTotalCharge(appointment.totalCharge.toString())
        }
      }
    }, [])

  function goBack() {
    navigation.goBack()
  }

  useEffect(() => {
    
  }, [])

  function deleteAppointmentById() {
    deleteAppointment(id_company, id, currentUserId, currentWorkshopProf)
    navigation.navigate('HomeUser' as never)
  }
  

  function handleEdit() {
    if (appointment.serviceType === 'breakMaintenance'){
      navigation.navigate('AppointmentInitialEdit' as never, {appointment: appointment} as never)
    } else if (appointment.serviceType === 'preventiveMaintenance'){
      navigation.navigate('AppointmentInitialEdit' as never, {appointment: appointment} as never)
    } else if (appointment.serviceType === 'pickup'){
      navigation.navigate('AppointmentInitialTrailerPickupEdit' as never, {appointment: appointment} as never)
    } else {

    }
  }

  function handlePrice() {
    handleOption()
    if(appointment.serviceType === 'breakMaintenance'){
      handleTotalCharge(appointment.id_company, appointment.id, totalCharge, appointment.currentUserId, appointment.currentWorkshopProf)
    }
    else if(appointment.serviceType === 'preventiveMaintenance'){
      handleTotalCharge(appointment.id_company, appointment.id, parseFloat(totalCharge), appointment.currentUserId, appointment.currentWorkshopProf)
    }
  }

  function handleOption(){
    if(!isOption){
      setOption(true)
    }else if(isOption){
      setOption(false)
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
            <View style={{marginTop: 50}} >
            </View>
            <ScrollView style={styles.list} >
              {(appointment.serviceType === 'breakMaintenance') ? 
                <View>
                  <Text style={styles.cardTitle} >Manutenção de Rutura</Text>
                  <Text style={styles.cardText}>Data: {appointment.date}</Text>
                  <Text style={styles.cardText}>Hora: {appointment.hour}</Text>
                  <Text style={styles.cardText}>Modelo: {appointment.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointment?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text>
                  <Text style={styles.cardText}>{(appointment?.obs != '') ? appointment?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>{(appointment?.totalCharge !== undefined) ? `Orçamento: ${appointment?.totalCharge}€` : 'Orçamento: Não existe ainda valor acordado.' }</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user' && currentUser?.id != appointment?.currentUserId) ? `Marcado por ${appointment?.username}`: `Empresa: ${appointment?.username}`}</Text></RectButton>
                </View> : <></>
              }
              {(appointment.serviceType === 'preventiveMaintenance') ? 
                <View>
                  <Text style={styles.cardTitle}>Manutenção Preventiva</Text>
                  <Text style={styles.cardText}>Data: {appointment?.date}</Text>
                  <Text style={styles.cardText}>Hora: {appointment?.hour}</Text>
                  <Text style={styles.cardText}>Modelo: {appointment?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointment?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text> 
                  <Text style={styles.cardText}>{(appointment?.obs != '') ? appointment?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>Orçamento: {appointment?.totalCharge}€</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user' && currentUser?.id != appointment?.currentUserId) ? `Marcado por ${appointment?.username}`: `Empresa: ${appointment?.username}`}</Text></RectButton>
                </View> : <></>
              }
              {(appointment.serviceType === 'assistanceRequest' || appointment.serviceType === 'mechanicalAssistance') ? 
                <View>
                  {console.log(appointment)}
                  <Text style={styles.cardTitle}>{(appointment?.serviceType === 'assistanceRequest') ? 'Pedido de Assistência' : 'Assistência Mecânica'}</Text>
                  <Text style={styles.cardText}>Data e Hora: {appointment?.date}</Text>
                  <Text style={styles.cardText}>Modelo: {appointment?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointment?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text>
                  <Text style={styles.cardText}>{(appointment?.obs != '') ? appointment?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>Preço: {appointment?.totalCharge}€</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user' && currentUser?.id != appointment?.currentUserId) ? `Marcado por ${appointment?.username}`: `Empresa: ${appointment?.username}`}</Text></RectButton>       
                </View> : <></>
              }
              {(appointment.serviceType === 'pickup') ? 
                <View>
                  <Text style={styles.cardTitle}>Serviço de Pickup</Text>
                  <Text style={styles.cardText}>Data: {appointment?.date}</Text>
                  <Text style={styles.cardText}>Hora: {appointment?.hour}</Text>
                  <Text style={styles.cardText}>Modelo: {appointment?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointment?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text>
                  <Text style={styles.cardText}>{(appointment?.obs != '') ? appointment?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>Orçamento: {appointment?.totalCharge}€</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user' && currentUser?.id != appointment?.currentUserId) ? `Marcado por ${appointment?.username}`: `Empresa: ${appointment?.username}`}</Text></RectButton>
                </View> : <></>
              }
              {((currentUser?.account === 'workshop'|| currentUser?.services === 'workshop') && isOption) ? (
                (appointment.serviceType === 'breakMaintenance' || appointment.serviceType === 'preventiveMaintenance' ) ? ( <>
                  <View style={styles.inputG}>
                    <Text style={styles.inputTitle}>
                      Preço Total
                    </Text>
                    <TextInput style={styles.input} placeholder="ex: 90.00" value={totalCharge} onChangeText={(text) => setTotalCharge(text)} />
                  </View>
                </>) : <></>
              ) : <></> }
              <View>
                <Text>
                </Text>
              </View>
            </ScrollView>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: (isOption) ? 120 : 150}}>
              {(currentUser?.account === 'user' && (appointment.item.serviceType != 'assistanceRequest' || appointment.item.serviceType != 'mechanicalAssistance')) ? ( <>
                  <ButtonIcon title="Editar" onPress={() => handleEdit()} /> 
                </>
              ) : <></> }
              {(currentUser?.account === 'workshop' || currentUser?.services === 'workshop') ? (
                (appointment.serviceType === 'breakMaintenance' || appointment.serviceType === 'preventiveMaintenance') ? <>
                  <ButtonIcon title="Editar" onPress={() => handlePrice()} /> 
                </> : <></>
              ) : <></> }
              {((currentUser?.account === 'workshop' || currentUser?.services === 'workshop') && appointment.serviceType === 'pickup') ? ( <>
                  <ButtonIcon title="Editar" onPress={() => handleEdit()} /> 
                </>
              ) : <></> }
              {((currentUser?.account === 'trailers' || currentUser?.services === 'trailers') && appointment.serviceType === 'breakMaintenance' ) ? ( <>
                  <ButtonIcon title="Editar" onPress={() => handleEdit()} /> 
                </>
              ) : <></> }
              <RectButton style={{}} onPress={() => deleteAppointmentById()}>
                <Image style={{width: 50, height: 50}} source={cross} />
              </RectButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}