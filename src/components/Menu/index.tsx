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
    const {currentUser, getAppointmentsList, getClientUser} = useContext(AuthContext)

    function goToProfileProf() {
        navigation.navigate('ProfileProf' as never)
    }

    function goToProfile() {
        navigation.navigate('Profile' as never)
    }

    function handleHome(){
        getClientUser()
        navigation.navigate('HomeUser' as never)
    }

    function gotToAppoitments() {
        getAppointmentsList()
        navigation.navigate('Appointments' as never)
    }

    return(
        <View style={styles.container} >
            <RectButton onPress={handleHome} {...rest} >
                <Image source={home} />
            </RectButton>
            <RectButton onPress={gotToAppoitments} {...rest}>
                <Image source={calendar} />
            </RectButton>
            {(currentUser?.account === "workshop" || currentUser?.account === "trailers" || currentUser?.account === 'employee') ? (
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