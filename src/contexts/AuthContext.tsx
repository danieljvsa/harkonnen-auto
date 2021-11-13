import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';
import * as Location from 'expo-location';
import { Alert } from "react-native";





type WorkshopProf = {
    id: string,
    username: string,
    phone?: string,
    account: string,
    image?: string,
    address?: string,
    fullReview?: string, 
    extraReview?: string,
    serviceCollection?: string,
    airConditioning?: string,
    battery?: string,
    brakes?: string,
    damper?: string,
    extraReviewCharge?: string,
    fullReviewCharge?: string,
    oil?: string,
    serviceCollectionCharge?: string,
    tires?: string    
}

type TrailerProf = {
    id: string,
    username: string,
    phone?: string,
    account: string,
    image?: string,
    address?: string,
    assistanceRequest?: string, 
    pickup: string, 
    mechanicalAssistance: string,
    assistanceRequestCharge?: string, 
    pickupCharge?: string, 
    mechanicalAssistanceCharge?: string
}

type User = {
    id: string,
    username: string,
    email: string,
    password : string,
    phone: string,
    account: string
}

type Client = {
    id: string,
    username: string,
    phone: string,
    account: string,
    image: string
}

type AuthContextData = {
    handleSignIn: (email: string, password: string) => void,
    handleSignUp: (email: string, password: string, name: string, phone: string, account: string) => void,
    errorLogin: boolean,
    errorRegister: boolean,
    isDuplicated: boolean,
    currentUser: User | null,
    signOut: () => void,
    updateName: (name: string) => void,
    updateEmail: (email: string) => void,
    updatePhone: (phone: string) => void,
    updateImage: (image: string) => void,
    updateAddress: (address: string) => void,
    updateLocation: (location: string) => void,
    updateServicesCharges: (fullReview: string, extraReview: string, oil: string, damper: string, battery: string, airConditioning: string, tires: string, brakes: string, serviceCollection: string) => void,
    locations: Object[],
    updateServicesStatus: (fullReview: string, extraReview: string, serviceCollection: string) => void,
    updateServicesChargesReb: (assistanceRequest: string, pickup: string, mechanicalAssistance: string) => void,
    updateServicesStatusReb: (assistanceRequest: string, pickup: string, mechanicalAssistance: string) => void,
    getClientUser: () => void,
    currentClient: Client | null,
    getProfUser: () => void,
    currentWorkshopProf: WorkshopProf | null,
    currentTrailerProf: TrailerProf | null,
    getProfUserbyId: (userId: string) => void,
    location: string,
    getWorkshopList: () => void,
    getTrailersList: () => void,
    workshopList: Object[],
    trailersList: Object[],
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children}:any) {
    const navigation = useNavigation()
    const [errorLogin, setLoginError] = useState(false)
    const [errorRegister, setRegisterError] = useState(false)
    const [isDuplicated, setIsDuplicated] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [locations, setLocations] = useState([])
    const [currentClient, setCurrentClient] = useState<Client | null>(null)
    const [currentWorkshopProf, setCurrentWorkshopProf] = useState<WorkshopProf | null>(null)
    const [currentTrailerProf, setCurrentTrailerProf] = useState<TrailerProf | null>(null)
    const [workshopList, setWorkshopList] = useState([])
    const [trailersList, setTrailersList] = useState([])
    const [location, setLocation] = useState('')

    useEffect(() => {
        getLocations()
        
        
        
    },[])
    
    async function handleErrorSignUp(email: string, password: string, name: string, phone: string, account: string) {
        if(name == "" || email == "" || password == "" || phone == "" || account == ""){
            setRegisterError(true)
        }else(
            setRegisterError(false)
        )
    }

    async function handleErrorSignIn(email: string, password: string) {
        if(email == "" || password == "" ){
            setLoginError(true)
        }else(
            setLoginError(false)
        )
    }

    async function handleDuplicatedAccounts(email: string, password: string){
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => {
            setIsDuplicated(true)
            navigation.navigate('SignIn' as never)
        })
    }

    async function signOut() {
        firebase.auth().signOut().then(() => {
            navigation.navigate('SignIn' as never)
        }).catch((error) => {
        // An error happened.
        });
          
    }

    async function signIn(email: string, password: string) {
        if(errorLogin === false){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                let userId = user?.uid
                if(userId){
                    firebase.database().ref("users").child(userId).get().then((snapshot) => {
                        if (snapshot.exists()) {
                            setCurrentUser({
                                id: (userId) ? (userId) : ("7777"),
                                username: snapshot.val().username,
                                email: snapshot.val().email,
                                password: snapshot.val().password,
                                phone: snapshot.val().phone,
                                account: snapshot.val().account,
                            });
                            //console.log(currentUser)
                        } else {
                        console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
                navigation.navigate('HomeUser' as never, {idUser: user?.uid} as never)
                // ...
            })
            .catch((error) => {
                setLoginError(true)
                //var errorCode = error.code;
                //var errorMessage = error.message;
                // ..
            });
        }
    }

    async function signUp(email: string, password: string, name: string, phone: string, account: string){
        if(isDuplicated === false){
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                let userId = user?.uid
                firebase.database().ref('users/' + user?.uid).set({
                    username: name,
                    email: email,
                    password : password,
                    phone: phone,
                    account: account
                });
                setCurrentUser({
                    id: (userId) ? (userId) : ("7777"),
                    username: name,
                    email: email,
                    password : password,
                    phone: phone,
                    account: account
                });
                navigation.navigate('HomeUser' as never, {idUser: user?.uid} as never)
                // ...
            })
            .catch((error) => {
                setRegisterError(true)
                //var errorCode = error.code;
                //var errorMessage = error.message;
                // ..
            });
        }
    }   

    function handleSignIn(email: string, password: string) {
        handleErrorSignIn(email,password)
        signIn(email,password)
    }

    function handleSignUp(email: string, password: string, name: string, phone: string, account: string){
        handleErrorSignUp(email, password, name, phone, account)
        handleDuplicatedAccounts(email,password)
        signUp(email, password, name, phone, account)
    }

    async function updateName(name: string){
        await firebase.database().ref('/users/' + currentUser?.id).update({username: name})
    }

    async function updateEmail(email: string){
        await firebase.database().ref('/users/' + currentUser?.id).update({email: email})
    }

    async function updatePhone(phone: string){
        await firebase.database().ref('/users/' + currentUser?.id).update({phone: phone})
    }

    async function updateImage(image: any){
        const fileExtension = image.split('.').pop()
        let response = await fetch(image)
        let uuid = uuid4()

        const fileName = `${uuid}.${fileExtension}`
        let storageRef = firebase.storage().ref(`users/images/${fileName}`)
        let blob = await response.blob()
        storageRef.put(blob).on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log("snapshot:" + snapshot.state)

                if(snapshot.state === firebase.storage.TaskState.SUCCESS){
                    console.log('success')
                }
            },
            error => {
                console.log("Error image: " + error.message)
            },
            () => {
                storageRef.getDownloadURL().then( downloadUrl => {
                    console.log("File avaiable at: " + downloadUrl)
                    firebase.database().ref('/users/' + currentUser?.id).update({image: downloadUrl})
                })
            }
        )
    }
    
    async function updateAddress(address: string){
        await firebase.database().ref('/users/' + currentUser?.id).update({address: address})
    }

    async function updateLocation(location: string){
        await firebase.database().ref('/users/' + currentUser?.id).update({location: location})
    }

    async function updateServicesCharges(fullReview: string, extraReview: string, oil: string, damper: string, battery: string, airConditioning: string, tires: string, brakes: string, serviceCollection: string){
        if (fullReview != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({fullReview: fullReview})
        }
        if (extraReview != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({extraReview: extraReview})
        }
        if (oil != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({oil: oil})
        }
        if (damper != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({damper: damper})
        }
        if (battery != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({battery: battery})
        }
        if (airConditioning != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({airConditioning: airConditioning})
        }
        if (tires != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({tires: tires})
        }
        if (brakes != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({brakes: brakes})
        }
        if (serviceCollection != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({serviceCollection: serviceCollection})
        }
    }

    async function updateServicesStatus(fullReview: string, extraReview: string, serviceCollection: string){
        if (fullReview != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/status/').update({fullReview: fullReview})
        }
        if (extraReview != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/status/').update({extraReview: extraReview})
        }
        if (serviceCollection != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/status/').update({serviceCollection: serviceCollection})
        }
    }

    async function updateServicesChargesReb(assistanceRequest: string, pickup: string, mechanicalAssistance: string){
        if (assistanceRequest != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({assistanceRequest: assistanceRequest})
        }
        if (pickup != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({pickup: pickup})
        }
        if (mechanicalAssistance != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({mechanicalAssistance: mechanicalAssistance})
        }
        
    }

    async function updateServicesStatusReb(assistanceRequest: string, pickup: string, mechanicalAssistance: string){
        if (assistanceRequest != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/status/').update({assistanceRequest: assistanceRequest})
        }
        if (pickup != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/status/').update({pickup: pickup})
        }
        if (mechanicalAssistance != "") {
            await firebase.database().ref('/users/' + currentUser?.id + '/services/status/').update({mechanicalAssistance: mechanicalAssistance})
        }
    }

    async function getLocations() {
        await firebase.database().ref("d").get().then((snapshot) => {
            //console.log(snapshot.val())
            setLocations(snapshot.val())
        })
    }

    async function getClientUser(){
        await firebase.database().ref("/users/" + currentUser?.id).get().then((snapshot) =>{
            if (snapshot.exists()) {
                setCurrentClient({  
                    id: (currentUser?.id) ? currentUser?.id : "777",
                    username: snapshot.val().username,
                    phone: snapshot.val().phone,
                    account: snapshot.val().account,
                    image: snapshot.val().image
                    
                })
            }else{
                console.log("No data avaiable")
            }
        })
    }

    async function getProfUser() {
        if(currentUser?.account === "workshop"){
            await firebase.database().ref("/users/" + currentUser?.id).get().then((snapshot) =>{
                if (snapshot.exists()) {
                    setCurrentWorkshopProf({  
                        id: (currentUser?.id) ? currentUser?.id : "777",
                        username: snapshot.val().username,
                        phone: snapshot.val().phone,
                        account: snapshot.val().account,
                        image: snapshot.val().image,
                        address: snapshot.val().address,
                        fullReview: snapshot.child("services").child("status").val().fullReview,
                        extraReview: snapshot.child("services").child("status").val().extraReview,
                        serviceCollection: snapshot.child("services").child("status").val().serviceCollection
                    })
                }else{
                    console.log("No data avaiable")
                }
            })
        }else{
            await firebase.database().ref("/users/" + currentUser?.id).get().then((snapshot) =>{
                if (snapshot.exists()) {
                    setCurrentTrailerProf({  
                        id: (currentUser?.id) ? currentUser?.id : "777",
                        username: snapshot.val().username,
                        phone: snapshot.val().phone,
                        account: snapshot.val().account,
                        image: snapshot.val().image,
                        address: snapshot.val().address,
                        assistanceRequest: snapshot.child("services").child("status").val().assistanceRequest,
                        pickup: snapshot.child("services").child("status").val().pickup,
                        mechanicalAssistance: snapshot.child("services").child("status").val().mechanicalAssistance
                    })
                }else{
                    console.log("No data avaiable")
                }
            })
        }
    }



    async function getWorkshopList() {
     
            await firebase.database().ref('/users').on('value', (snapshot) =>{
                let workshops: any[] = []
                snapshot.forEach((snap) => {
                    let userObject = snap.val()
                    userObject['id'] = snap.key
                    let account = userObject['account']
                    if(account === 'workshop'){
                        workshops.push(userObject)
                    }
                    
                
                    setWorkshopList(workshops as never)
                    
                })
                //console.log(workshopList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
        
    }

    async function getTrailersList() {
        
            await firebase.database().ref('/users').on('value', (snapshot) =>{
                let trailers: any[] = []
                snapshot.forEach((snap) => {
                    let userObject = snap.val()
                    userObject['id'] = snap.key
                    let account = userObject['account']
                    //console.log(location)
                    if(account === 'trailers'){
                        trailers.push(userObject)
                    }
                    
                
                    setTrailersList(trailers as never)
                    
                })
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
        
    }

    async function getProfUserbyId(userId: string) {
            await firebase.database().ref("/users/" + userId).get().then((snapshot) =>{
                if (snapshot.exists()) {
                    if(snapshot.val().account === "workshop"){
                        setCurrentWorkshopProf({  
                            id: (userId) ? userId : "777",
                            username: snapshot.val().username,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,
                            address: snapshot.val().address,
                            fullReview: snapshot.child("services").child("status").val().fullReview,
                            extraReview: snapshot.child("services").child("status").val().extraReview,
                            serviceCollection: snapshot.child("services").child("status").val().serviceCollection,
                            airConditioning: snapshot.child("services").child("charges").val().airConditioning,
                            battery: snapshot.child("services").child("charges").val().battery,
                            brakes: snapshot.child("services").child("charges").val().brakes,
                            damper: snapshot.child("services").child("charges").val().damper,
                            extraReviewCharge: snapshot.child("services").child("charges").val().extraReview,
                            fullReviewCharge: snapshot.child("services").child("charges").val().fullReviewCharge,
                            oil: snapshot.child("services").child("charges").val().oil,
                            serviceCollectionCharge: snapshot.child("services").child("charges").val().serviceCollection,
                            tires: snapshot.child("services").child("charges").val().tires
                        })
                    }else{
                        setCurrentTrailerProf({  
                            id: (userId) ? userId : "777",
                            username: snapshot.val().username,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,
                            address: snapshot.val().address,
                            assistanceRequest: snapshot.child("services").child("status").val().assistanceRequest,
                            pickup: snapshot.child("services").child("status").val().pickup,
                            mechanicalAssistance: snapshot.child("services").child("status").val().mechanicalAssistance,
                            assistanceRequestCharge: snapshot.child("services").child("charges").val().assistanceRequest,
                            pickupCharge: snapshot.child("services").child("charges").val().pickup,
                            mechanicalAssistanceCharge: snapshot.child("services").child("charges").val().mechanicalAssistance
                        })
                    }
                }else{
                    console.log("No data avaiable")
                }
            })
    }

    return(
        <AuthContext.Provider value={{ getTrailersList, getWorkshopList, location, getProfUserbyId, trailersList, workshopList, getProfUser, currentWorkshopProf, currentTrailerProf, currentClient, getClientUser, updateServicesStatusReb, updateServicesChargesReb, updateServicesStatus, updateLocation, locations, updateServicesCharges, updateAddress, updateImage, updatePhone, updateEmail, updateName, signOut, handleSignIn, handleSignUp, errorLogin, errorRegister, isDuplicated, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

