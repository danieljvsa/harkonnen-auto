import React from 'react'
import { Text, View, TouchableOpacity, TouchableOpacityProps, ButtonProps, Image, ImageSourcePropType} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'
import chevron from '../../assets/chevron.png'
import FullStar from '../../assets/star.png';
import HalfStar from '../../assets/star_half.png';
import EmptyStar from '../../assets/star_empty.png';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
    title: string,
    image: string,
    stars?: any,
    showNumber?: any
}

export function CardProfileProf({title, image, stars, showNumber, ...res}: Props){
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
        <RectButton {...res} style={styles.container} >
            <View style={styles.content}>
                <Image source={{uri: image}} style={styles.imgUp} />
                <View>
                    <Text style={styles.title} >
                        {title}
                    </Text>
                    <View style={{flexDirection: 'row', height: 40, width: 150, alignItems: 'center', paddingBottom: 35}}>
                        {s.map((index, key) => (
                            <View key={key} >
                            {index === 0 && <Image source={EmptyStar} style={{height: 18, width: 18}}  />}
                            {index === 1 && <Image source={HalfStar} style={{height: 18, width: 18}}  />}
                            {index === 2 && <Image source={FullStar} style={{height: 18, width: 18}}  />}
                            </View>
                        ))}
                        {showNumber && <Text style={{fontSize: 18, color: '#67686A', fontFamily: theme.fonts.text, paddingTop: 6}} >{stars}</Text>}
                    </View>
                </View>
                <Image source={chevron} style={styles.img} />
            </View>
        </RectButton>
    )
}