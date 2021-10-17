import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import home from '../../assets/home.png'
import perfil from '../../assets/perfil.png'
import calendar from '../../assets/calendar.png'
import { useNavigation } from '@react-navigation/native'



export function Menu({...rest} : RectButtonProps){
    const navigation = useNavigation()

    function handleHome(){
        navigation.navigate('HomeUser' as never)
    }

    return(
        <View style={styles.container} >
            <RectButton onPress={handleHome} {...rest} >
                <Image source={home} />
            </RectButton>
            <RectButton {...rest}>
                <Image source={calendar} />
            </RectButton>
            <RectButton {...rest}>
                <Image source={perfil} />
            </RectButton>
        </View>
    )
}