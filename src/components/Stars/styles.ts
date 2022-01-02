import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        width: 312,
        marginLeft: 30,
        marginRight: 30,
        height: 94,
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 33
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 30
    },
    img:{
        marginRight: 22,
        height: 64,
        width: 64
    },
    title: {
        color: theme.colors.title,
        fontSize: 20,
        flex: 1,
        textAlignVertical: 'center',
        fontFamily: theme.fonts.text,
        paddingRight: 20,
    }
})