import React, { useContext } from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import home from '../../assets/home.png'
import perfil from '../../assets/perfil.png'
import calendar from '../../assets/calendar.png'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../contexts/AuthContext'



export function Menu({...rest} : RectButtonProps){
    const navigation = useNavigation()
    const {currentUser} = useContext(AuthContext)

    function goToProfileProf() {
        navigation.navigate('ProfileProf' as never)
    }

    function goToProfile() {
        navigation.navigate('Profile' as never)
    }

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
            {(currentUser?.account === "workshop" || currentUser?.account === "trailers") ? (
                <RectButton {...rest} onPress={goToProfileProf} >
                    <Image source={perfil}  />
                </RectButton>
            ) : (
                <RectButton {...rest} onPress={goToProfile} >
                    <Image source={perfil}  />
                </RectButton>
            )}
        </View>
    )
}