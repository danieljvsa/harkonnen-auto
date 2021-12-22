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
        width: 312,
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
        marginRight: 20,
        marginLeft: 20,
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
        height: 450,
    },
    header: {
        height: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        //margin: 0,
    },

})