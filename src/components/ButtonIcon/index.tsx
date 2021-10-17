import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { styles } from './styles'

type Props = TouchableOpacityProps & {
    title: string,
}

export function ButtonIcon({title, ...rest}: Props){
    return(
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}