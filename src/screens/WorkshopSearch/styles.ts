import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    img:{
        marginBottom: 40,
        resizeMode: 'contain',
        height: 75,
        marginTop: 60,
    },
    title:{
        textAlign: 'center',
        fontSize: 28,
        color: theme.colors.heading,
        marginBottom: 40,
        fontFamily: theme.fonts.text,
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    }

})