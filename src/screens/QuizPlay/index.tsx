
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

export function QuizPlay({route}: any){
    const {questions} = route.params
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [correctCount, setCorrectCount] = useState(0)
    const [incorrectCount, setIncorrectCount] = useState(0)
    const [selectedOption, setSelectedOption] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(questions.length)
    const [answers, setAnswers] = useState([])
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

  useEffect(() => {
    if(questions){
      handleAnswer()
      
    }
  }, [currentIndex])

  function handleAnswers(answer: string) {
    if(answer === questions[currentIndex].correct_answer){
      setCorrectCount(correctCount + 1)
    } else {
      setIncorrectCount(incorrectCount + 1)
    }
    if(currentIndex < maxIndex - 1){
      setCurrentIndex(currentIndex + 1)
    } else {
      navigation.navigate('QuizResult' as never, {maxIndex: maxIndex, correctCount: correctCount} as never)
    }
  }

  function handleAnswer(){
    //console.log(questions)
    
    setError(false)
    let data = ''
    let quests: any = []
    if(questions != []){
      quests.push(questions[currentIndex].correct_answer)
      for (let index = 0; index < questions[currentIndex].incorrect_answers.length; index++) {
        quests.push(questions[currentIndex].incorrect_answers[index])
      }
      //console.log(quests)
      setAnswers(quests)
    }
    
    if(questions[currentIndex].question.toLowerCase().includes('&quot;')){
        data = questions[currentIndex].question.replace("&quot;", "'");
        if(data.toLowerCase().includes('&quot;')){
            data = data.replace("&quot;", "'");
            
            //console.log(data)
            //translate(data, {from: 'en', to: 'pt'}).then(res => {
            /*axios.request({
              method: 'POST',
              url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                'x-rapidapi-key': '6da53cc324msh8756f30b4139627p1d42bajsn5fe1983349c5'
              },
              data: qs.stringify({q: data, target: 'pt', source: 'en'})
            }).then(function (response) {
              */
              setTitle(data);
              /*console.log(response.data.translations.translatedText)
            }).catch(function (error) {
              console.error(error);
            });
            //})
            //setError(true)*/
        }
    } 
    else if(questions[currentIndex].question.toLowerCase().includes('&#039;')){
      data = questions[currentIndex].question.replace("&#039;", "'");
      if(data.toLowerCase().includes('&#039;')){
          data = data.replace("&#039;", "'");
          /*axios.request({
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'accept-encoding': 'application/gzip',
              'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
              'x-rapidapi-key': '6da53cc324msh8756f30b4139627p1d42bajsn5fe1983349c5'
            },
            data: qs.stringify({q: data, target: 'pt', source: 'en'})
          }).then(function (response) {
            */
           setTitle(data);
            //console.log(response.data.translations.translatedText)
          /*}).catch(function (error) {
            console.error(error);
          });*/
      }
    }
    else {
      //translate(questions[currentIndex].question, {from: 'en', to: 'pt'}).then(res => {
      /*axios.request({
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'accept-encoding': 'application/gzip',
          'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
          'x-rapidapi-key': '6da53cc324msh8756f30b4139627p1d42bajsn5fe1983349c5'
        },
        data: qs.stringify({q: questions[currentIndex].question, target: 'pt', source: 'en'})
      }).then(function (response) {*/
        setTitle(questions[currentIndex].question);
        //console.log(response.data.translations.translatedText)
      /*}).catch(function (error) {
        console.error(error);
      });*/
      //})
    }
    
  }
  
  
  const renderItem = (quiz: any) => {
    //console.log(quiz)
    return ( <>
      <CardQuiz title={quiz.item} onPress={() => handleAnswers(quiz.item)} />
    </>)
  }
    return(
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.scroll}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
              <View style={{marginTop: 60}} >
                <Text style={styles.img}>{title}</Text>
              </View>  
              <ScrollView style={styles.list} >
                <FlatList data={answers} renderItem={item => renderItem(item)} />
              </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}