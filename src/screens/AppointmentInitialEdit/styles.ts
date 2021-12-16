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
        //width: 312,
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
    inputDiv: {
        marginLeft: 34,
        marginRight: 34,
        marginBottom: 13
    },
    inputTitle: {
        fontSize: 20,
        color: theme.colors.title,
        fontFamily: theme.fonts.text,
        marginBottom: 8,
    },
    inputG:{
        marginLeft: 32,
        marginRight: 32
    },
    scroll:{
        flex: 1,
        //backgroundColor: theme.colors.background,
        marginTop: -20,
        alignSelf: 'stretch',
    },
    img:{
        marginBottom: 117,
        resizeMode: 'contain',
        height: 75,
    },
    text:{
        //textAlign: 'center',
        fontSize: 20,
        color: theme.colors.input,
        //marginTop: 18,
        fontFamily: theme.fonts.text,
    },
    monthText:{
        //textAlign: 'center',
        fontSize: 20,
        color: theme.colors.input,
        paddingTop: 8,
        marginBottom: 28,
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
        backgroundColor: theme.colors.background,
        height: 150,
        alignSelf: 'stretch',
        textAlign: 'center',
        margin: 0,
    },
    title:{
        fontFamily: theme.fonts.text,
        fontSize: 28,
        color: theme.colors.title,
        textAlign: 'center'
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
        marginTop: 38,
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
        textAlign: 'center',
        height: 190,
        
    },
    headerUploaded: {
        backgroundColor: '#FFFF',
        height: 190,
        alignSelf: 'stretch',
        textAlign: 'center',
        paddingTop: 20
    },
    picker:{
        //width: 300,
        height: 50,
        backgroundColor: theme.colors.card,
        borderRadius: 30,
        marginBottom: 20,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 6,
        paddingLeft: 16,
        color: theme.colors.input,
        fontFamily: theme.fonts.text,
    },
    textInput:{
        fontFamily: theme.fonts.text,
        color: theme.colors.input,
        backgroundColor: theme.colors.card,
        fontSize: 20,
    },
    calendarTitle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        textAlignVertical: 'center'
    },
    chevron: {
        height: 28,
        width: 28,
    },
    chevronD:{
        marginBottom: 24,
    },
})