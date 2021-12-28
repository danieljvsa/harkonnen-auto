
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

export function ProfileProf(){
    const {currentUser, signOut, getClientUser} = useContext(AuthContext)
    const navigation = useNavigation()

    useEffect(() => {
        getClientUser()
    }, [])
    
    function goToGeneralInformation() {
        navigation.navigate('GeneralInformation' as never)
    }

    function goToChangePlans() {
        if(currentUser?.account === "workshop" || currentUser?.services === 'workshop'){
            navigation.navigate('ChangePlans' as never)
        }else{
            navigation.navigate('ChangePlansReb' as never)
        }
    }
    function goToServiceStatus() {
        if(currentUser?.account === "workshop" || currentUser?.services === 'workshop'){
            navigation.navigate('ServiceStatus' as never)
        }else{
            navigation.navigate('ServiceStatusReb' as never)
        }
    }

    function goToProfile(){
        navigation.navigate('ViewProfile' as never)
    }

    function goToEvaluationList(){
        navigation.navigate('Evaluations' as never, {company: currentUser} as never)
    }

    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.img} ></Image>
            <View style={styles.menu} >
                <CardProfile title="Informações Gerais" onPress={goToGeneralInformation} />
                <CardProfile title="Modificar Planos" onPress={goToChangePlans} />
                <CardProfile title="Ativar/Desativar Serviços" onPress={goToServiceStatus} />
                {(currentUser?.account === "workshop" || currentUser?.services === "workshop") ? (
                    <CardProfile title="Avaliações da Oficina" onPress={goToEvaluationList} />
                ) : (
                    <CardProfile title="Avaliações da Assistência" onPress={goToEvaluationList} />
                )
                }
                <CardProfile title="Ver Perfil" onPress={goToProfile} />
                <CardProfile title="Sair" onPress={signOut} />
            </View>
            <Menu style={styles.footer} />
        </View>
    )
}