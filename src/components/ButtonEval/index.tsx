import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

type Props = RectButtonProps & {
    title: string,
}

export function ButtonEval({title, ...rest}: Props){
    return(
        <RectButton style={styles.container} {...rest}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </RectButton>
    )
}