
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
//import translate from 'google-translate-api'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import logoImg from '../../assets/logo.png'
import arrowBack from '../../assets/arrow-back.png'
import axios from "axios";
import qs from 'querystring'

import easy from '../../assets/easy.png'
import medium from '../../assets/medium.png'
import hard from '../../assets/hard.png'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import { CardProfileProf } from '../../components/CardProfileProf'
import { Card } from '../../components/Card'
import { CardEmployee } from '../../components/CardEmployee'
import { CardQuiz } from '../../components/CardQuiz'

export function QuizResult({route}: any){
    const {correctCount, maxIndex} = route.params
    const navigation = useNavigation()
    const [result, setResult] = useState(0)

  useEffect(() => {
    //cálculo do resultado do quiz
    let calc = correctCount / maxIndex
    setResult(calc*100)
  }, [])

  
  function goToHome() {
    //navegação para o menu principal
    navigation.navigate('HomeUser' as never)
  }
    
  
  
  
    return(
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.scroll}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
              <View style={{marginTop: 60}} >
                <Text style={styles.img}>Resultado</Text>
              </View>  
              <View style={styles.list} >
                  <Text style={styles.res} >{result}%</Text>    
              </View>
              <ButtonIcon title='Voltar' onPress={goToHome} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}