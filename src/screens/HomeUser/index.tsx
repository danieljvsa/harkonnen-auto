
import React, { useContext } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

import Admin from '../../assets/admin.png'
import logoImg from '../../assets/logo.png'
import Wrench from '../../assets/wrench.png'
import Car from '../../assets/car.png'
import CheckMark from '../../assets/check-mark.png'
import { Card } from '../../components/Card'
import { Menu } from '../../components/Menu'
import AuthContext from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'

export function HomeUser(){
    const {currentUser, getWorkshopList, getTrailersList, getEmployeeList} = useContext(AuthContext)
    const navigation = useNavigation()

    function goToWorkshopSearch(){
        //função para resgatar lista das oficinas
        getWorkshopList()
        navigation.navigate('WorkshopSearch' as never)
    }

    function gotToTrailersSearch(){
        //função para resgatar lista das empresas de reboque
        getTrailersList()
        navigation.navigate('TrailersSearch' as never)
    }

    function goToProfile() {
        navigation.navigate('Profile' as never)
    }
    function goToAdmin() {
        //função para resgatar lista dos empregados da empresa
        getEmployeeList()
        if(currentUser?.account === 'trailers' || currentUser?.account === 'workshop'){
            navigation.navigate('AdminScreen' as never)
        }
    }

    function goToQuiz(){
        navigation.navigate('QuizHome' as never)
    }

    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.img} ></Image>
            <View style={styles.menu} >
                <Text style={styles.title} >Agende os seus serviços</Text>
                { (currentUser?.account === "workshop" || currentUser?.account === "trailers" || currentUser?.account === 'employee') ? (
                    (currentUser.account === "workshop" || currentUser.services === 'workshop') ? ( <>
                        <Card src={Admin} title="Administrativo" onPress={goToAdmin} />
                        <Card src={Car} title="Assistência de Viagem" onPress={gotToTrailersSearch} />
                        <Card src={CheckMark} title="Quiz" onPress={goToQuiz} />
                        </>
                    ) : (  <>
                        <Card src={Admin} title="Administrativo" onPress={goToAdmin} />
                        <Card src={Wrench} title="Oficinas" onPress={goToWorkshopSearch} />
                        <Card src={CheckMark} title="Quiz" onPress={goToQuiz} />
                        </>
                    )
                )
                : (  <>
                    <Card src={Wrench} title="Oficinas" onPress={goToWorkshopSearch} />
                    <Card src={Car} title="Assistência de Viagem" onPress={gotToTrailersSearch} />
                    <Card src={CheckMark} title="Quiz" onPress={goToQuiz} />
                    </>
                )
                }
            </View>
            <Menu />
        </View>
    )
}