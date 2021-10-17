import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import { AuthRoutes } from './auth.routes'
import { SignIn } from "../screens/SignIn";
import { HomeUser } from "../screens/HomeUser";

export function Routes() {
    return(
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
}