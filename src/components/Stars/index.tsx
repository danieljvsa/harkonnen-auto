import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType, ViewProps} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import FullStar from '../../assets/star.png';
import HalfStar from '../../assets/star_half.png';
import EmptyStar from '../../assets/star_empty.png';
import { theme } from '../../global/styles/theme';



type Props = ViewProps & {
    stars: any,
    showNumber: any,
}

export function Stars({stars, showNumber, ...rest}: Props){
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(parseFloat(stars));
    let left = stars - floor;

    for (var i = 0; i < floor; i++) {
        s[i] = 2
    }
    if (left > 0) {
        s[i] = 1;
    }

    return(
        <View style={{flexDirection: 'row', height: 40, width: 150, alignItems: 'center'}} {...rest}>
            {s.map((index, key) => (
                <View key={key} >
                {index === 0 && <Image source={EmptyStar} style={{height: 18, width: 18}}  />}
                {index === 1 && <Image source={HalfStar} style={{height: 18, width: 18}}  />}
                {index === 2 && <Image source={FullStar} style={{height: 18, width: 18}}  />}
                </View>
            ))}
            {showNumber && <Text style={{fontSize: 18, color: '#67686A', fontFamily: theme.fonts.text, paddingTop: 6}} >{stars}</Text>}
        </View>
    )
}

export default Stars