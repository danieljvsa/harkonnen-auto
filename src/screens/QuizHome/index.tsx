
import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import logoImg from '../../assets/logo.png'
import arrowBack from '../../assets/arrow-back.png'

import easy from '../../assets/easy.png'
import medium from '../../assets/medium.png'
import hard from '../../assets/hard.png'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location';
import { CardProfileProf } from '../../components/CardProfileProf'
import { Card } from '../../components/Card'

export function QuizHome(){
    const {getQuiz, getQuizHard, getQuizMedium} = useContext(AuthContext)
    const navigation = useNavigation()
  
    
  useEffect(() => {
    
  }, []);

  function goBack() {
    //função para voltar uma tela atrás
    navigation.goBack()
  }

  async function goToEasyQuiz() {
    //função para gerar um quiz do nivel fácil
    getQuiz()
  }

  async function goToMediumQuiz() {
    //função para gerar um quiz do nivel médio
    getQuizMedium()
  }
  
  async function goToHardQuiz() {
    //função para gerar um quiz do nivel difícil
    getQuizHard()
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
              <Text style={styles.img}>Nivel</Text>
            </View>
            <ScrollView style={styles.list} >
              <Card src={easy} title="Fácil" onPress={goToEasyQuiz} />
              <Card src={medium} title="Médio" onPress={goToMediumQuiz} />
              <Card src={hard} title="Difícil" onPress={goToHardQuiz} />
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}