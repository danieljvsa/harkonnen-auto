import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        width: 312,
        height: 30,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: 200,
    },
    
})