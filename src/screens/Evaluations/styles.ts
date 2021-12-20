import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        //height: 1000
    },
    img:{
        textAlign: 'center',
        fontSize: 36,
        fontFamily: theme.fonts.text,
        color: theme.colors.title,
        height: 75,
        //marginTop: 40,
    },
    secText:{
        color: theme.colors.title,
        fontSize: 18,
        fontFamily: theme.fonts.text,
        paddingTop: 0,
        paddingLeft: 26
    },
    title:{
        textAlign: 'center',
        fontSize: 28,
        color: theme.colors.heading,
        //marginBottom: 40,
        fontFamily: theme.fonts.text,
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 200,
    },
    scroll:{
        flex: 1,
        backgroundColor: theme.colors.background,
        //height: 1000
    },
    inputSearch: {
        width: 238,
        height: 50,
        backgroundColor: theme.colors.card,
        fontFamily: theme.fonts.text,
        fontSize: 20,
        color: theme.colors.input,
        borderRadius: 31,
        paddingLeft: 18,
        paddingTop: 8,
        marginRight: 10
    },
    search:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 0,
    },
    geoCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        width: 24,
        height: 50,
        borderRadius: 100
    },
    geo: {
        width: 24,
        height: 24,

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
        marginTop: 20,
        //height: 900,
    },
    header: {
        height: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        //margin: 0,
    },
    containerCard:{
        width: 300,
        marginLeft: 30,
        marginRight: 30,
        height: 150,
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        //alignItems: 'center',
        marginBottom: 33
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
       // paddingTop: 18,
        //paddingBottom: 18,
       // paddingLeft: 30
    },
    cardTitle: {
        color: theme.colors.title,
        fontSize: 20,
        flex: 1,
        
        fontFamily: theme.fonts.text,
        marginTop: 20,
        marginLeft: 20
    },
    cardText: {
        color: theme.colors.input,
        fontSize: 18,
        flex: 1,
        
        fontFamily: theme.fonts.text,
        marginLeft: 20
    },
})