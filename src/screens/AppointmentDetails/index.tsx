
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
    const [isOption, setOption] = useState(false)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [totalCharge, setTotalCharge] = useState(appointmentPreventiveMaintenance?.totalCharge.toString() || appointmentBreakMaintenance?.totalCharge || '')
    const {id, id_company, currentUserId, currentWorkshopProf} = route.params
    const {deleteAppointment} = useContext(AuthContext)
  

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
    if (appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company){
      navigation.navigate('AppointmentInitialEdit' as never, {appointment: appointmentBreakMaintenance} as never)
    } else if (appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company){
      navigation.navigate('AppointmentInitialEdit' as never, {appointment: appointmentPreventiveMaintenance} as never)
    } else if (appointmentTrailer?.id === id && appointmentTrailer?.id_company === id_company){

    } else if (appointmentTrailerPickup?.id === id && appointmentTrailerPickup?.id_company === id_company){
      navigation.navigate('AppointmentInitialTrailerPickupEdit' as never, {appointment: appointmentTrailerPickup} as never)
    } else {

    }
  }

  function handlePrice() {
    handleOption()
    if(appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company && appointmentBreakMaintenance){
      handleTotalCharge(appointmentBreakMaintenance?.id_company, appointmentBreakMaintenance?.id, totalCharge, appointmentBreakMaintenance?.currentUserId, appointmentBreakMaintenance?.currentWorkshopProf)
    }
    else if(appointmentPreventiveMaintenance && appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company){
      handleTotalCharge(appointmentPreventiveMaintenance?.id_company, appointmentPreventiveMaintenance?.id, parseFloat(totalCharge), appointmentPreventiveMaintenance?.currentUserId, appointmentPreventiveMaintenance?.currentWorkshopProf)
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
              {(appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company) ? 
                <View>
                  <Text style={styles.cardTitle} >Manutenção de Rutura</Text>
                  <Text style={styles.cardText}>Data: {appointmentBreakMaintenance?.date}</Text>
                  <Text style={styles.cardText}>Hora: {appointmentBreakMaintenance?.hour}</Text>
                  <Text style={styles.cardText}>Modelo: {appointmentBreakMaintenance?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointmentBreakMaintenance?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text>
                  <Text style={styles.cardText}>{(appointmentBreakMaintenance?.obs != '') ? appointmentBreakMaintenance?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>{(appointmentBreakMaintenance?.totalCharge !== undefined) ? `Orçamento: ${appointmentBreakMaintenance?.totalCharge}€` : 'Não existe ainda valor acordado.' }</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user') ? `Marcado por ${appointmentBreakMaintenance?.username}`: `Empresa: ${appointmentBreakMaintenance?.username}`}</Text></RectButton>
                </View> : <></>
              }
              {(appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company) ? 
                <View>
                  <Text style={styles.cardTitle}>Manutenção Preventiva</Text>
                  <Text style={styles.cardText}>Data: {appointmentPreventiveMaintenance?.date}</Text>
                  <Text style={styles.cardText}>Hora: {appointmentPreventiveMaintenance?.hour}</Text>
                  <Text style={styles.cardText}>Modelo: {appointmentPreventiveMaintenance?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointmentPreventiveMaintenance?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text> 
                  <Text style={styles.cardText}>{(appointmentPreventiveMaintenance?.obs != '') ? appointmentPreventiveMaintenance?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>Orçamento: {appointmentPreventiveMaintenance?.totalCharge}€</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user') ? `Marcado por ${appointmentPreventiveMaintenance?.username}`: `Empresa: ${appointmentPreventiveMaintenance?.username}`}</Text></RectButton>
                </View> : <></>
              }
              {(appointmentTrailer?.id === id && appointmentTrailer?.id_company === id_company) ? 
                <View>
                  <Text style={styles.cardTitle}>{(appointmentTrailer?.serviceType === 'assistanceRequest') ? 'Pedido de Assitência' : 'Assistência Mecânica'}</Text>
                  <Text style={styles.cardText}>Data e Hora: {appointmentTrailer?.date}</Text>
                  <Text style={styles.cardText}>Modelo: {appointmentTrailer?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointmentTrailer?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text>
                  <Text style={styles.cardText}>{(appointmentTrailer?.obs != '') ? appointmentTrailer?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>Preço: {appointmentTrailer?.totalCharge}€</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user') ? `Marcado por ${appointmentTrailer?.username}`: `Empresa: ${appointmentTrailer?.username}`}</Text></RectButton>       
                </View> : <></>
              }
              {(appointmentTrailerPickup?.id === id && appointmentTrailerPickup?.id_company === id_company) ? 
                <View>
                  <Text style={styles.cardTitle}>Serviço de Pickup</Text>
                  <Text style={styles.cardText}>Data: {appointmentTrailerPickup?.date}</Text>
                  <Text style={styles.cardText}>Hora: {appointmentTrailerPickup?.hour}</Text>
                  <Text style={styles.cardText}>Modelo: {appointmentTrailerPickup?.model}</Text>
                  <Text style={styles.cardText}>Marca: {appointmentTrailerPickup?.brand}</Text>
                  <Text style={styles.cardText}>Observações: </Text>
                  <Text style={styles.cardText}>{(appointmentTrailerPickup?.obs != '') ? appointmentTrailerPickup?.obs : 'Não existem observações...'}</Text>
                  <Text style={styles.cardText}>Orçamento: {appointmentTrailerPickup?.totalCharge}€</Text>
                  <RectButton><Text style={styles.cardText}>{(currentUser?.account != 'user') ? `Marcado por ${appointmentTrailerPickup?.username}`: `Empresa: ${appointmentTrailerPickup?.username}`}</Text></RectButton>
                </View> : <></>
              }
              {(currentUser?.account === 'workshop' && isOption) ? (
                (appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company || (appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company ) ? ( <>
                  <View style={styles.inputG}>
                    <Text style={styles.inputTitle}>
                      Preço Total
                    </Text>
                    <TextInput style={styles.input} placeholder="ex: 90.00" value={totalCharge} onChangeText={(text) => setTotalCharge(text)} />
                  </View>
                </>) : <></>
              )) : <></> }
              <View>
                <Text>
                </Text>
              </View>
            </ScrollView>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: (isOption) ? 120 : 150}}>
              {(currentUser?.account === 'user' && appointmentTrailer?.id != id && appointmentTrailer?.id_company != id_company) ? ( <>
                  <ButtonIcon title="Editar" onPress={() => handleEdit()} /> 
                </>
              ) : <></> }
              {(currentUser?.account === 'workshop') ? (
                (appointmentBreakMaintenance?.id === id && appointmentBreakMaintenance?.id_company === id_company || appointmentPreventiveMaintenance?.id === id && appointmentPreventiveMaintenance?.id_company === id_company) ? <>
                  <ButtonIcon title="Editar" onPress={() => handlePrice()} /> 
                </> : <></>
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