import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {HomeUser} from '../screens/HomeUser'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { ProfileProf } from '../screens/ProfileProf'
import { Profile } from '../screens/Profile'
import { GeneralInformation } from '../screens/GeneralInformation'
import { ChangePlans } from '../screens/ChangePlans'
import { ServiceStatus } from '../screens/ServiceStatus'

const {Navigator, Screen} = createStackNavigator()

export function AuthRoutes() {
    return(
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUp" component={SignUp} />
            <Screen name="HomeUser" component={HomeUser} />
            <Screen name="ProfileProf" component={ProfileProf} />
            <Screen name="Profile" component={Profile} />
            <Screen name="GeneralInformation" component={GeneralInformation} />
            <Screen name="ChangePlans" component={ChangePlans} />
            <Screen name="ServiceStatus" component={ServiceStatus} />
        </Navigator>
    )
}