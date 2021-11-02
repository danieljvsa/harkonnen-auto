
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
import { CardProfile } from '../../components/CardProfile'
import { useNavigation } from '@react-navigation/native'

export function ProfileProf(){
    const {currentUser, signOut} = useContext(AuthContext)
    const navigation = useNavigation()
    
    function goToGeneralInformation() {
        navigation.navigate('GeneralInformation' as never)
    }

    function goToChangePlans() {
        if(currentUser?.account === "workshop"){
            navigation.navigate('ChangePlans' as never)
        }else{
            navigation.navigate('ChangePlansReb' as never)
        }
    }
    function goToServiceStatus() {
        if(currentUser?.account === "workshop"){
            navigation.navigate('ServiceStatus' as never)
        }else{
            navigation.navigate('ServiceStatusReb' as never)
        }
    }

    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.img} ></Image>
            <View style={styles.menu} >
                <CardProfile title="Informações Gerais" onPress={goToGeneralInformation} />
                <CardProfile title="Modificar Planos" onPress={goToChangePlans} />
                <CardProfile title="Ativar/Desativar Serviços" onPress={goToServiceStatus} />
                {(currentUser?.account === "workshop") ? (
                    <CardProfile title="Avaliações da Oficina" />
                ) : (
                    <CardProfile title="Avaliações da Assistência..." />
                )
                }
                <CardProfile title="Ver Perfil" />
                <CardProfile title="Sair" onPress={signOut} />
            </View>
            <Menu style={styles.footer} />
        </View>
    )
}