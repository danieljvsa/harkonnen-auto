
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
    const {currentUser} = useContext(AuthContext)
    const navigation = useNavigation()

    function goToWorkshopSearch(){
        navigation.navigate('WorkshopSearch' as never)
    }

    function goToProfile() {
        navigation.navigate('Profile' as never)
    }

    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.img} ></Image>
            <View style={styles.menu} >
                <Text style={styles.title} >Agende os seus serviços</Text>
                { (currentUser?.account === "workshop" || currentUser?.account === "trailers") ? (
                    (currentUser.account === "workshop") ? ( <>
                        <Card src={Admin} title="Administrativo" />
                        <Card src={Car} title="Assistência de Viagem" />
                        <Card src={CheckMark} title="Quiz" />
                        </>
                    ) : (  <>
                        <Card src={Admin} title="Administrativo" />
                        <Card src={Wrench} title="Oficinas" />
                        <Card src={CheckMark} title="Quiz" />
                        </>
                    )
                )
                : (  <>
                    <Card src={Wrench} title="Oficinas" onPress={goToWorkshopSearch} />
                    <Card src={Car} title="Assistência de Viagem" />
                    <Card src={CheckMark} title="Quiz" />
                    </>
                )
                }
            </View>
            <Menu />
        </View>
    )
}