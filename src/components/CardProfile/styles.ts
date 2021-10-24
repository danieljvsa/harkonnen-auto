import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        width: 312,
        marginLeft: 30,
        marginRight: 30,
        height: 50,
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 19
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        //paddingTop: 18,
        //paddingBottom: 18,
        //paddingLeft: 30,
        textAlignVertical: 'center',
    },
    img:{
        marginRight: 10,
        height: 24,
        width: 24,
        //textAlignVertical: 'center',
    },
    title: {
        color: theme.colors.title,
        fontSize: 20,
        flex: 1,
        //textAlignVertical: 'center',
        fontFamily: theme.fonts.text,
        marginLeft: 16,
        marginTop: 5,
    }
})