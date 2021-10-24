import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
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
    inputTitle: {
        fontSize: 20,
        color: theme.colors.title,
        fontFamily: theme.fonts.text,
        marginBottom: 8,
    },
    inputG:{
        alignSelf: 'center',
        marginBottom: 22,
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
        marginTop: 18,
        fontFamily: theme.fonts.text,
    },
    login: {
        alignSelf: 'stretch',
        textAlign: 'center',
        paddingTop: 18,
    },
    errorMessage: {
        marginBottom: 5,
        color: theme.colors.errorMessage,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: theme.fonts.text,
    },
    header: {
        backgroundColor: theme.colors.card,
        height: 204,
        alignSelf: 'stretch',
        textAlign: 'center',
        margin: 0
    },

    arrowBack: {
        height: 32,
        width: 32,
        alignSelf: 'center',
        marginTop: 10
    },
    goBack:{
        height: 50,
        width: 50,
        marginTop: 23,
        marginLeft: 17,
    },

    upload: {
        alignSelf: 'center',
        height: 91,
        width: 87,
        marginTop: 0,
        
    }
    
})