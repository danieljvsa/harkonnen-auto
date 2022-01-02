import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.colors.background,
    },
    title: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        color: theme.colors.heading,
        fontSize: 36,
        fontFamily: theme.fonts.text,
        paddingTop: 26,
        paddingLeft: 26
    },
    desc: {
        color: theme.colors.input,
        fontSize: 18,
        fontFamily: theme.fonts.text,
        marginTop: -10,
        paddingLeft: 26,
        marginBottom: 10,
    },
    secHeading:{
        color: theme.colors.heading,
        fontSize: 24,
        fontFamily: theme.fonts.text,
        paddingTop: 0,
        paddingLeft: 26,
        //marginBottom: 5
    },
    secText:{
        color: theme.colors.title,
        fontSize: 18,
        fontFamily: theme.fonts.text,
        paddingTop: 0,
        paddingLeft: 26
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
        borderRadius: 30,
        height: 375,        
        marginTop: 70,
        backgroundColor: theme.colors.background,
        alignSelf: 'stretch'
    },
    titleView:{
        alignSelf: 'stretch',
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
        margin: 0,
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
    goBackUploaded:{
        height: 50,
        width: 50,
        marginTop: 0,
        marginLeft: 17,
    },

    upload: {
        alignSelf: 'center',
        height: 91,
        width: 87,
        marginTop: 0,
        
    },
    imageUploaded:{
        alignSelf: 'stretch',
        height: 300,
        paddingTop: 23,
    },
    headerUploaded: {
        backgroundColor: '#FFFF',
        height: 300,
        alignSelf: 'stretch',
        textAlign: 'center',
        //paddingTop: 20
    },
    picker:{
        width: 312,
        height: 50,
        backgroundColor: theme.colors.card,
        borderRadius: 30,
        marginBottom: 28,
        fontSize: 20,
        color: theme.colors.input,
        paddingTop: 10,
        //paddingBottom: 6,
        paddingLeft: 20,
        fontFamily: theme.fonts.text,
        maxHeight: 50,
    },
    textInput:{
        fontFamily: theme.fonts.text,
        color: theme.colors.input,
        fontSize: 20,
    },
    button: {
        paddingTop: 50, 
        width: 240
    },
    buttonDiv: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    evalView: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    eval: {
        marginTop: 50,
        marginRight: 18,
        backgroundColor: theme.colors.background,
        borderRadius: 100,
        borderColor: theme.colors.heading,
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 3,
        maxWidth: 50,
        height: 50
    },
    imgEval: {
        width: 30,
        height: 30
    }
})