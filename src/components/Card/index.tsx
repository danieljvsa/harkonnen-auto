import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import logoImg from '../../assets/logo.png'

type Props = RectButtonProps & {
    title: string,
    src: ImageSourcePropType,
}

export function Card({title, src, ...res}: Props){
    return(
        <RectButton {...res} style={styles.container} >
            <View style={styles.content}>
                <Image source={src} style={styles.img} />
                <Text style={styles.title} >
                    {title}
                </Text>
            </View>
        </RectButton>
    )
}