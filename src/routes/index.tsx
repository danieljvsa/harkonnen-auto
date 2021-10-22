import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import { AuthRoutes } from './auth.routes'
import { SignIn } from "../screens/SignIn";
import { HomeUser } from "../screens/HomeUser";
import { AuthProvider } from "../contexts/AuthContext";

export function Routes() {
    return(
        <NavigationContainer>
            <AuthProvider>
                <AuthRoutes />
            </AuthProvider>
        </NavigationContainer>
    )
}