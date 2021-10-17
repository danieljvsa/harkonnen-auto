
import React from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

import logoImg from '../../assets/logo.png'
import Wrench from '../../assets/wrench.png'
import Car from '../../assets/car.png'
import CheckMark from '../../assets/check-mark.png'
import { Card } from '../../components/Card'
import { Menu } from '../../components/Menu'

export function HomeUser(){
    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.img} ></Image>
            <View style={styles.menu} >
                <Text style={styles.title} >Agende os seus serviços</Text>
                <Card src={Wrench} title="Oficinas" />
                <Card src={Car} title="Assistência de Viagem" />
                <Card src={CheckMark} title="Quiz" />
            </View>
            <Menu />
        </View>
    )
}