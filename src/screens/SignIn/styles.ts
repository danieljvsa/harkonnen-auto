import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        marginTop: 100,
    },
    input:{
        width: 270,
        height: 50,
        backgroundColor: theme.colors.card,
        borderRadius: 30,
        marginBottom: 28,
        fontSize: 20,
        color: theme.colors.input,
        paddingTop: 13,
        paddingBottom: 6,
        paddingLeft: 25,
        fontFamily: theme.fonts.text,
        maxHeight: 50,
    },
    scroll:{
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    img:{
        marginBottom: 117,
        resizeMode: 'contain',
        height: 75,
    },
    text:{
        textAlign: 'center',
        fontSize: 14,
        color: theme.colors.input,
        marginTop: 28,
        fontFamily: theme.fonts.text,
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})