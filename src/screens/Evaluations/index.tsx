
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

export function Evaluations({route}: any){
    const {getEvaluationsList, evaluationsList} = useContext(AuthContext)
    const navigation = useNavigation()
    const {company} = route.params
    const [isDetail, setIsDetail] = useState(false)

    useEffect(() => {
      if(company){
        if(company.account === 'employee'){
          getEvaluationsList(company.companyId);
          console.log(evaluationsList)
        }else{
          getEvaluationsList(company.id);
          console.log(evaluationsList)
        }
      }
  }, [])
    
  function goBack() {
    navigation.goBack()
  }

  const renderItem = (evaluation: any) => {  
    return (
      <View>
          <Text style={{color: theme.colors.heading, fontSize: 20, fontFamily: theme.fonts.text, paddingTop: 0, paddingLeft: 26}}>{evaluation.item.username}</Text>
          <Text style={styles.secText}> Avaliação: {evaluation.item.stars}</Text>
          <Text style={styles.secText}> Comentário: {evaluation.item.obs}</Text>
      </View>  
  )
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
              <Text style={styles.img}>Avaliações</Text>
            </View>
            <ScrollView style={styles.list} >
              <FlatList data={evaluationsList} renderItem={item => renderItem(item)} keyExtractor={item => item.index} />
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}