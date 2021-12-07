import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    checkboxDiv:{
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    checkboxDivCh:{
        marginLeft: 50,
        marginRight: 24,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 16,
        borderRadius: 8
    },
    textCheck: {
        paddingTop: 1.5,
        fontSize: 18,
        fontFamily: theme.fonts.text,
    },
    input:{
        //width: 312,
        height: 170,
        backgroundColor: theme.colors.card,
        borderRadius: 30,
        fontSize: 20,
        color: theme.colors.input,
        paddingTop: 13,
        paddingBottom: 6,
        paddingRight: 25,
        paddingLeft: 25,
        fontFamily: theme.fonts.text,
        maxHeight: 170,
        //marginBottom: 10
    },
    inputMod:{
        height: 50,
        backgroundColor: theme.colors.card,
        borderRadius: 30,
        fontSize: 20,
        color: theme.colors.input,
        paddingTop: 13,
        paddingBottom: 6,
        paddingRight: 25,
        paddingLeft: 25,
        fontFamily: theme.fonts.text,
        maxHeight: 170,
    },
    inputModText: {
        fontSize: 18,
        fontFamily: theme.fonts.text,
        marginBottom: 10,
    },
    inputDiv: {
        marginLeft: 24,
        marginRight: 24,
        //marginBottom: 13
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
        marginTop: 0,
        alignSelf: 'stretch',
        height: 3000
    },
    img:{
        marginBottom: 117,
        resizeMode: 'contain',
        height: 75,
    },
    text:{
        //textAlign: 'center',
        fontSize: 20,
        color: theme.colors.heading,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 25,
        fontFamily: theme.fonts.text,
    },
    textInputTitle:{
        //textAlign: 'center',
        fontSize: 20,
        color: theme.colors.heading,
        marginTop: 15,
        marginBottom: 10,
        //marginLeft: 25,
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
        width: 80,
        height: 80,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 12,
    },
    imagesBox: {
        width: 312,
        height: 240,
        backgroundColor: theme.colors.card,
        alignSelf: 'center',
        borderRadius: 8,
    },
    cross:{
        width: 24,
        height: 24,
        alignSelf: 'flex-end'
    },
    uploaded:{
        width: 40,
        height: 40,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5
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