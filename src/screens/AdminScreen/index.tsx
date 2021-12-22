
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
import { CardEmployee } from '../../components/CardEmployee'

export function AdminScreen(){
    const {employeeList, currentUser, getEmployeeList, deleteEmployee} = useContext(AuthContext)
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Wait, we are fetching you location...');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

    
  useEffect(() => {
    getEmployeeList()
  }, []);

  function goBack() {
    navigation.goBack()
  }

  

    //console.log(workshopList)
  function onDelete(id: any){
    deleteEmployee(id)
  }
  

  const renderItem = (employee: any) => {
    //console.log(employee)
    if(employee.item.companyId === currentUser?.id){
      if (search != ""){
        if(employee.item.username.toLowerCase().includes(search.toLowerCase())){
          return <CardEmployee title={employee.item.username} onDelete={() => onDelete(employee.item.id)} key={employee.index} />
        } else{
          return <></>
        }
      }else{
        return <CardEmployee title={employee.item.username} onDelete={() => onDelete(employee.item.id)} key={employee.index} />
      }   
    }else{
      return <></>
    } 
  } 

  function goToCreateUser() {
    navigation.navigate('SignUpEmployee' as never)
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
              <Text style={styles.img}>Oficinas</Text>
            </View>
            <View style={styles.search}>
              <TextInput style={styles.inputSearch} placeholder="Pesquisar funcionários..." value={search} onChangeText={(text) => setSearch(text)} />
            </View>
            <ScrollView style={styles.list} >
              <FlatList data={employeeList} renderItem={item => renderItem(item)} keyExtractor={item => item.index} />
            </ScrollView>
            <ButtonIcon title={'Adicionar'} onPress={goToCreateUser} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}