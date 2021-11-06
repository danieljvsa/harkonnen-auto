import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        width: 232,
        height: 50,
        backgroundColor: theme.colors.heading,
        borderRadius: 30,
        alignItems: 'center'
    },
    wrapper: {
        paddingTop: 5,
    },
    title: {
        color: theme.colors.background,
        fontSize: 20,
        flex: 1,
        textAlignVertical: 'center',
        fontFamily: theme.fonts.text,
    }
})