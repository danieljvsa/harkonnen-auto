import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import cross from '../../assets/cross.png'
import chevron from '../../assets/chevron.png'

type Props = RectButtonProps & {
    title: string
}

export function CardQuiz({title, ...res}: Props){
    return(
        <RectButton {...res} style={styles.container} >
            <View style={styles.content}>
                <Text style={styles.title} >
                    {title}
                </Text>
                <RectButton  >
                    <Image source={chevron} style={styles.img} />
                </RectButton>
            </View>
        </RectButton>
    )
}