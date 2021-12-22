import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import cross from '../../assets/cross.png'

type Props = RectButtonProps & {
    title: string,
    onDelete: Function
}

export function CardEmployee({title, onDelete, ...res}: Props){
    return(
        <RectButton {...res} style={styles.container} >
            <View style={styles.content}>
                <Text style={styles.title} >
                    {title}
                </Text>
                <RectButton {...res}  onPress={() => onDelete()} >
                    <Image source={cross} style={styles.img} />
                </RectButton>
            </View>
        </RectButton>
    )
}