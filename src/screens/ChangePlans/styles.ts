import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        
    },
    inputG:{
        alignSelf: 'center',
        marginBottom: 22,
    },
    inputTitle: {
        fontSize: 20,
        color: theme.colors.title,
        fontFamily: theme.fonts.text,
        marginBottom: 8,
    },
    input:{
        width: 312,
        height: 50,
        backgroundColor: theme.colors.card,
        borderRadius: 30,
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
        alignSelf: 'center',
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
    changes: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    errorMessage: {
        marginBottom: 5,
        color: theme.colors.errorMessage,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: theme.fonts.text,
    },
    arrowBack: {
        height: 32,
        width: 32,
        alignSelf: 'center',
        marginTop: 10,
    },
    goBack:{
        height: 50,
        width: 50,
        marginTop: 28,
        marginLeft: 17,
    },
    list: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        height: 170,
        alignSelf: 'stretch',
        textAlign: 'center',
        margin: 0,
    },
})