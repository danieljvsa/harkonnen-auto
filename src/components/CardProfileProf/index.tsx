import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import chevron from '../../assets/chevron.png'

type Props = RectButtonProps & {
    title: string,
    image: string
}

export function CardProfileProf({title, image, ...res}: Props){
    return(
        <RectButton {...res} style={styles.container} >
            <View style={styles.content}>
                <Image source={{uri: image}} style={styles.imgUp} />
                <Text style={styles.title} >
                    {title}
                </Text>
                <Image source={chevron} style={styles.img} />
            </View>
        </RectButton>
    )
}