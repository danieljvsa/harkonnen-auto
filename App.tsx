import React from 'react';
import {useFonts} from 'expo-font'
import {MeeraInimai_400Regular} from '@expo-google-fonts/meera-inimai'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { LogBox } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({MeeraInimai_400Regular})

  if(!fontsLoaded){
    return(
      <AppLoading />
    )
  }
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs

  return (
    <>
      <Routes />
    </>  
  );
}


