
import React, { useContext, useEffect } from 'react'
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
import { CardProfile } from '../../components/CardProfile'
import { useNavigation } from '@react-navigation/native'

export function Profile(){
    const {currentUser, signOut, getClientUser} = useContext(AuthContext)
    const navigation = useNavigation()

    useEffect(() => {
        //função para resgatar informações especificas do utilizador
        getClientUser()
    }, [])
    
    function goToGeneralInformation() {
        //navegação para a screen de configurações gerais
        navigation.navigate('GeneralInformation' as never)
    }

    function goToProfile() {
        //navegação para a screen para ver estado do proprio perfil
        navigation.navigate('ViewProfile' as never)
    }

    function goToEvaluationList(){
        //navegação para visualizar as avaliações feitas à sua pessoa
        navigation.navigate('Evaluations' as never, {company: currentUser} as never)
    }

    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.img} ></Image>
            <View style={styles.menu} >
                <CardProfile title="Informações Gerais" onPress={goToGeneralInformation} />
                <CardProfile title="Avaliações do Perfil" onPress={goToEvaluationList} />
                <CardProfile title="Ver Perfil" onPress={goToProfile} />
                <CardProfile title="Sair" onPress={signOut} />
            </View>
            <Menu style={styles.footer} />
        </View>
    )
}