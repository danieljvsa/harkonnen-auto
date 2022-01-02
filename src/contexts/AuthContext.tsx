import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';
import * as Location from 'expo-location';
import { Alert } from "react-native";
import axios from 'axios'


type Evaluation = {
    id: string,
    stars: string,
    obs: string,
    username: string,
}

type AppointmentBreakMaintenance = {
    id: string,
    id_company: string,
    currentUserId: string,
    currentWorkshopProf: string, 
    serviceType: string,
    date: string,
    hour: string,
    brand: string,
    model: string,
    obs: string,
    username: string,
    images: string[],
    totalCharge?: string
}

type AppointmentPreventiveMaintenance = {
    id: string,
    id_company: string,
    currentUserId: string,
    currentWorkshopProf: string, 
    serviceType: string,
    date: string,
    hour: string,
    brand: string,
    model: string,
    obs: string,
    username: string,
    isAirConditioning: boolean,
    isBattery: boolean,
    isDamper: boolean,
    isBrakes: boolean,
    isEngine: boolean,
    isExtraReview: boolean,
    isFullReview: boolean,
    isOil: boolean,
    isServiceCollection: boolean,
    isTires: boolean,
    totalCharge: number,
    address: string,
}

type AppointmentTrailerPickup = {
    id: string,
    id_company: string,
    currentUserId: string,
    currentWorkshopProf: string, 
    serviceType: string,
    date: string,
    hour: string,
    brand: string,
    model: string,
    obs: string,
    username: string,
    totalCharge: number,
    addressCollection: string, 
    addressDelivery: string,
}

type AppointmentTrailer = {
    id: string,
    id_company: string,
    currentUserId: string,
    currentWorkshopProf: string, 
    serviceType: string,
    date: string,
    brand: string,
    model: string,
    obs: string,
    username: string,
    totalCharge: number,
}

type AppointmentWorkshopInitial = {
    serviceType: string,
    date: string,
    hour: string,
    model: string,
    brand: string,
    address?: string,
    totalPrice?: string,
    time_stamp?: string
}


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
    tires?: string,
    engine?: string,
    evaluationAgerage?: any     
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
    mechanicalAssistanceCharge?: string,
    evaluationAgerage?: any   
}

type User = {
    id: string,
    username: string,
    email: string,
    password : string,
    phone?: string,
    account: string,
    companyId?: string,
    services?: string,
    enterpriseName?: string,
    evaluationAgerage?: any   
}

type Client = {
    id: string,
    username: string,
    email: string,
    phone: string,
    account: string,
    image: string,
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
    tires?: string,
    engine?: string,
    assistanceRequest?: string, 
    pickup?: string, 
    mechanicalAssistance?: string,
    assistanceRequestCharge?: string, 
    pickupCharge?: string, 
    mechanicalAssistanceCharge?: string,
    evaluationAgerage?: any   
}

type AuthContextData = {
    handleSignIn: (email: string, password: string) => void,
    handleSignUp: (email: string, password: string, name: string, phone: string, account: string) => void,
    handleSignUpEmployee: (email: string, password: string, name: string, companyId: string, account: string, enterpriseName: string) => void,
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
    updateServicesCharges: (fullReview: string, extraReview: string, oil: string, damper: string, battery: string, airConditioning: string, tires: string, brakes: string, serviceCollection: string, engine: string) => void,
    locations: Object[],
    appointment: any | null,
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
    getEmployeeList: () => void,
    getWorkshopList: () => void,
    getTrailersList: () => void,
    employeeList: Object[],
    workshopList: Object[],
    trailersList: Object[],
    appoitmentsList: Object[],
    evaluationsList: any[],
    appointmentWorkshop: AppointmentWorkshopInitial | null
    handleAppoitmentWorkshop: (day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string) => void
    handleAppointmentWorkshopMark: (images: any[], obs: string, companyName: string, userName: string) => void,
    handlePreventiveAppoitment: (isFullReview: any, isExtraReview: any, isServiceCollection: any, isOil: any, isDamper: any, isBattery: any, isAirConditioning: any, isTires: any, isBrakes: any, isEngine: any, totalCharge: any, obs: any, address: any, companyName: string, userName: string) => void,
    handleAppointmentsTrailerPickup: (day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, obs: string, totalCharge: any, addressCollection: string, addressDelivery:string, companyName: string, userName: string) => void,
    handleAppointmentsTrailer: (date: string, brand: string, model: string, service: string, obs: string, totalCharge: any, companyName: string, userName: string) => void,
    getAppointmentsList: () => void,
    getAppointmentById: (id: string, id_company: string, currentUserId: string) => void,
    appointmentBreakMaintenance: AppointmentBreakMaintenance | null,
    appointmentPreventiveMaintenance: AppointmentPreventiveMaintenance | null,
    appointmentTrailerPickup: AppointmentTrailerPickup | null,
    appointmentTrailer: AppointmentTrailer | null,
    handleUpdateBreakMaintenance: (id_company: string, id: string, day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, currentUserId: string, obs: string, images: string[], currentWorkshopProf: string) => void
    deleteAppointment: (id_company: string, id: string, currentUserId: string, currentWorkshopProf: string) => void
    handleUpdatePreventiveMaintenance: (id_company: string, id: string, day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, currentUserId: string, obs: string, currentWorkshopProf: string, isFullReview: any, isExtraReview: any, isServiceCollection: any, isOil: any, isDamper: any, isBattery: any, isAirConditioning: any, isTires: any, isBrakes: any, isEngine: any, totalCharge: any, address: any) => void
    handleUpdatePickup: (id_company: string, id: string, day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, currentUserId: string, obs: string, currentWorkshopProf: string, totalCharge: any, addressCollection: string, addressDelivery:string) => void,
    handleTotalCharge: (id_company: string, id: string, totalCharge: any,currentUserId: string, currentWorkshopProf: string) => void,
    handleExistEvaluation: (companyId: string, company: any) => void,
    handleUpdateEvaluation: (companyId: string, stars: string, obs: string) => void,
    handleCreateEvaluation: (companyId: string, stars: string, obs: string) => void,
    getEvaluationsList: (companyId: string) => void,
    evaluation: Evaluation | null,
    deleteEmployee: (id: string) => void,
    getClientById: (id: string) => void,
    getQuiz: () => void,
    questions: any[],
    getQuizMedium: () => void,
    getQuizHard: () => void,
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
    const [employeeList, setEmployeeList] = useState([])
    const [workshopList, setWorkshopList] = useState([])
    const [trailersList, setTrailersList] = useState([])
    const [appoitmentsList, setAppoitmentsList] = useState([])
    const [evaluationsList, setEvaluationsList] = useState([])
    const [location, setLocation] = useState('')
    const [appointmentWorkshop, setAppoitmentWorkshop] = useState<AppointmentWorkshopInitial | null>(null)
    const [appointmentBreakMaintenance, setAppointmentBreakMaintenance] = useState<AppointmentBreakMaintenance | null>(null)
    const [appointmentPreventiveMaintenance, setAppointmentPreventiveMaintenance] = useState<AppointmentPreventiveMaintenance | null>(null)
    const [appointmentTrailerPickup, setAppointmentTrailerPickup] = useState<AppointmentTrailerPickup | null>(null)
    const [appointmentTrailer, setAppointmentTrailer] = useState<AppointmentTrailer | null>(null)
    const [evaluationAverage, setEvaluationAverage] = useState(0)
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
    const [deleteUser, setDeleteUser] = useState<User | null>(null)
    const [appointment, setAppointment] = useState<any | null>(null)
    const [questions, setQuestions] = useState([])

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

    async function handleErrorSignUpEmployee(email: string, password: string, name: string, companyId: string) {
        if(name == "" || email == "" || password == "" || companyId == "" ){
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
                            if(snapshot.val().account === 'employee'){
                                setCurrentUser({
                                    id: (userId) ? (userId) : ("7777"),
                                    username: snapshot.val().username,
                                    email: snapshot.val().email,
                                    password: snapshot.val().password,
                                    account: snapshot.val().account,
                                    companyId: snapshot.val().companyId,
                                    services: snapshot.val().services,
                                    enterpriseName: snapshot.val().enterpriseName
                                });
                                navigation.navigate('HomeUser' as never, {idUser: user?.uid} as never)
                            }else{
                                setCurrentUser({
                                    id: (userId) ? (userId) : ("7777"),
                                    username: snapshot.val().username,
                                    email: snapshot.val().email,
                                    password: snapshot.val().password,
                                    phone: snapshot.val().phone,
                                    account: snapshot.val().account,
                                });
                                navigation.navigate('HomeUser' as never, {idUser: user?.uid} as never)
                            }
                            //console.log(currentUser)
                        } else {
                            console.log("No data available");
                            setLoginError(true)
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
                
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
                console.log(email, password)
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
                console.log(error)
                //var errorCode = error.code;
                //var errorMessage = error.message;
                // ..
            });
        }
    }   

    async function signUpEmployee(email: string, password: string, name: string, companyId: string, account: string, enterpriseName: string){
        if(isDuplicated === false){
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(email, password)
                // Signed in
                var user = userCredential.user;
                let userId = user?.uid
                firebase.database().ref('users/' + user?.uid).set({
                    id: userId,
                    username: name,
                    email: email,
                    password : password,
                    account: 'employee',
                    companyId: companyId,
                    services: account,
                    enterpriseName: enterpriseName
                });
                navigation.navigate('AdminScreen' as never)
                // ...
            })
            .catch((error) => {
                setRegisterError(true)
                console.log(error)
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

    function handleSignUpEmployee(email: string, password: string, name: string, companyId: string, account: string, enterpriseName: string){
        handleErrorSignUpEmployee(email, password, name, companyId)
        signUpEmployee(email, password, name, companyId, account, enterpriseName)
    }

    async function updateName(name: string){
        if(currentUser?.account === 'employee'){
            await firebase.database().ref('/users/' + currentUser?.companyId).update({username: name})
        } else {
            await firebase.database().ref('/users/' + currentUser?.id).update({username: name})
        }
    }

    async function updateEmail(email: string){
        if(currentUser?.account === 'employee'){
            await firebase.database().ref('/users/' + currentUser?.companyId).update({email: email})
        } else {
            await firebase.database().ref('/users/' + currentUser?.id).update({email: email})
        }
    }

    async function updatePhone(phone: string){
        if(currentUser?.account === 'employee'){
            await firebase.database().ref('/users/' + currentUser?.companyId).update({phone: phone})
        } else {
            await firebase.database().ref('/users/' + currentUser?.id).update({phone: phone})
        }
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
                    if(currentUser?.account === 'employee'){
                        firebase.database().ref('/users/' + currentUser?.companyId).update({image: downloadUrl})
                    } else {
                        firebase.database().ref('/users/' + currentUser?.id).update({image: downloadUrl})
                    }
                })
            }
        )
    }
    
    async function updateAddress(address: string){
        if(currentUser?.account === 'employee'){
            await firebase.database().ref('/users/' + currentUser?.companyId).update({address: address})
        }else {
            await firebase.database().ref('/users/' + currentUser?.id).update({address: address})
        }
    }

    async function updateLocation(location: string){
        if(currentUser?.account === 'employee'){
            await firebase.database().ref('/users/' + currentUser?.companyId).update({location: location})
        }else {
            await firebase.database().ref('/users/' + currentUser?.id).update({location: location})
        }
    }

    async function updateServicesCharges(fullReview: string, extraReview: string, oil: string, damper: string, battery: string, airConditioning: string, tires: string, brakes: string, serviceCollection: string, engine: string){
        if(currentUser?.account === 'employee'){
            if (fullReview != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({fullReview: fullReview})
            }
            if (extraReview != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({extraReview: extraReview})
            }
            if (oil != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({oil: oil})
            }
            if (damper != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({damper: damper})
            }
            if (battery != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({battery: battery})
            }
            if (airConditioning != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({airConditioning: airConditioning})
            }
            if (tires != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({tires: tires})
            }
            if (brakes != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({brakes: brakes})
            }
            if (serviceCollection != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({serviceCollection: serviceCollection})
            }
            if (engine != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({engine: engine})
            }
        } else {
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
            if (engine != "") {
                await firebase.database().ref('/users/' + currentUser?.id + '/services/charges/').update({engine: engine})
            }
        }
    }

    async function updateServicesStatus(fullReview: string, extraReview: string, serviceCollection: string){
        if(currentUser?.account === 'employee'){
            if (fullReview != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/status/').update({fullReview: fullReview})
            }
            if (extraReview != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/status/').update({extraReview: extraReview})
            }
            if (serviceCollection != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/status/').update({serviceCollection: serviceCollection})
            }
        } else {
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
    }

    async function updateServicesChargesReb(assistanceRequest: string, pickup: string, mechanicalAssistance: string){
        if(currentUser?.account === 'employee'){
            if (assistanceRequest != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({assistanceRequest: assistanceRequest})
            }
            if (pickup != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({pickup: pickup})
            }
            if (mechanicalAssistance != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/charges/').update({mechanicalAssistance: mechanicalAssistance})
            }
        } else {
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
    }

    async function updateServicesStatusReb(assistanceRequest: string, pickup: string, mechanicalAssistance: string){
        if(currentUser?.account === 'employee'){
            if (assistanceRequest != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/status/').update({assistanceRequest: assistanceRequest})
            }
            if (pickup != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/status/').update({pickup: pickup})
            }
            if (mechanicalAssistance != "") {
                await firebase.database().ref('/users/' + currentUser?.companyId + '/services/status/').update({mechanicalAssistance: mechanicalAssistance})
            }
        } else {
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
    }

    async function getLocations() {
        await firebase.database().ref("d").get().then((snapshot) => {
            //console.log(snapshot.val())
            setLocations(snapshot.val())
        })
    }

    async function getClientById(id: string){
            await firebase.database().ref("/users/" + id).get().then((snapshot) =>{
                if (snapshot.exists()) {
                    if(snapshot.val().account === 'user'){
                        setCurrentClient({  
                            id: (id) ? id : "777",
                            username: snapshot.val().username,
                            email: snapshot.val().email,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,  
                            evaluationAgerage: snapshot.val().evaluationAgerage               
                        })   
                    } else if (snapshot.val().account === 'workshop'){
                        setCurrentClient({  
                            id: (id) ? id : "777",
                            username: snapshot.val().username,
                            email: snapshot.val().email,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,  
                            address: snapshot.val().address,
                            fullReview: snapshot.child("services").child("status").val().fullReview,
                            extraReview: snapshot.child("services").child("status").val().extraReview,
                            serviceCollection: snapshot.child("services").child("status").val().serviceCollection,
                            extraReviewCharge: snapshot.child("services").child("charges").val().extraReview,
                            fullReviewCharge: snapshot.child("services").child("charges").val().fullReview,
                            serviceCollectionCharge: snapshot.child("services").child("charges").val().serviceCollection,
                            airConditioning: snapshot.child("services").child("charges").val().airConditioning,
                            battery: snapshot.child("services").child("charges").val().battery,
                            brakes: snapshot.child("services").child("charges").val().brakes,
                            damper: snapshot.child("services").child("charges").val().damper,
                            oil: snapshot.child("services").child("charges").val().oil,
                            tires: snapshot.child("services").child("charges").val().tires,
                            engine: snapshot.child("services").child("charges").val().engine, 
                            evaluationAgerage: snapshot.val().evaluationAgerage              
                        })
                    } else {
                        setCurrentClient({
                            id: (id) ? id : "777",
                            username: snapshot.val().username,
                            email: snapshot.val().email,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,
                            address: snapshot.val().address,
                            assistanceRequest: snapshot.child("services").child("status").val().assistanceRequest,
                            pickup: snapshot.child("services").child("status").val().pickup,
                            mechanicalAssistance: snapshot.child("services").child("status").val().mechanicalAssistance,
                            assistanceRequestCharge: snapshot.child("services").child("charges").val().assistanceRequest, 
                            pickupCharge: snapshot.child("services").child("charges").val().pickup, 
                            mechanicalAssistanceCharge: snapshot.child("services").child("charges").val().mechanicalAssistance,
                            evaluationAgerage: snapshot.val().evaluationAgerage
                        })
                    }
                }else{
                    console.log("No data avaiable")
                }
            })
        
    }

    async function getClientUser(){
        if(currentUser?.account === 'employee'){
            await firebase.database().ref("/users/" + currentUser?.companyId).get().then((snapshot) =>{
                if (snapshot.exists()) {
                    if (snapshot.val().account === 'workshop'){
                        setCurrentClient({  
                            id: (currentUser?.companyId) ? currentUser?.companyId : "777",
                            username: snapshot.val().username,
                            email: snapshot.val().email,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,  
                            address: snapshot.val().address,
                            fullReview: snapshot.child("services").child("status").val().fullReview,
                            extraReview: snapshot.child("services").child("status").val().extraReview,
                            serviceCollection: snapshot.child("services").child("status").val().serviceCollection,
                            extraReviewCharge: snapshot.child("services").child("charges").val().extraReview,
                            fullReviewCharge: snapshot.child("services").child("charges").val().fullReview,
                            serviceCollectionCharge: snapshot.child("services").child("charges").val().serviceCollection,
                            airConditioning: snapshot.child("services").child("charges").val().airConditioning,
                            battery: snapshot.child("services").child("charges").val().battery,
                            brakes: snapshot.child("services").child("charges").val().brakes,
                            damper: snapshot.child("services").child("charges").val().damper,
                            oil: snapshot.child("services").child("charges").val().oil,
                            tires: snapshot.child("services").child("charges").val().tires,
                            engine: snapshot.child("services").child("charges").val().engine,
                            evaluationAgerage: snapshot.val().evaluationAgerage               
                        })
                    } else {
                        setCurrentClient({
                            id: (currentUser?.companyId) ? currentUser?.companyId : "777",
                            username: snapshot.val().username,
                            email: snapshot.val().email,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,
                            address: snapshot.val().address,
                            assistanceRequest: snapshot.child("services").child("status").val().assistanceRequest,
                            pickup: snapshot.child("services").child("status").val().pickup,
                            mechanicalAssistance: snapshot.child("services").child("status").val().mechanicalAssistance,
                            assistanceRequestCharge: snapshot.child("services").child("charges").val().assistanceRequest, 
                            pickupCharge: snapshot.child("services").child("charges").val().pickup, 
                            mechanicalAssistanceCharge: snapshot.child("services").child("charges").val().mechanicalAssistance,
                            evaluationAgerage: snapshot.val().evaluationAgerage
                        })
                    }
                }else{
                    console.log("No data avaiable")
                }
            })
        } else {
            await firebase.database().ref("/users/" + currentUser?.id).get().then((snapshot) =>{
                if (snapshot.exists()) {
                    if(snapshot.val().account === 'user'){
                        setCurrentClient({  
                            id: (currentUser?.id) ? currentUser?.id : "777",
                            email: snapshot.val().email,
                            username: snapshot.val().username,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,   
                            evaluationAgerage: snapshot.val().evaluationAgerage             
                        })   
                    } else if (snapshot.val().account === 'workshop'){
                        setCurrentClient({  
                            id: (currentUser?.id) ? currentUser?.id : "777",
                            username: snapshot.val().username,
                            email: snapshot.val().email,
                            phone: snapshot.val().phone,
                            account: snapshot.val().account,
                            image: snapshot.val().image,  
                            address: snapshot.val().address,
                            fullReview: snapshot.child("services").child("status").val().fullReview,
                            extraReview: snapshot.child("services").child("status").val().extraReview,
                            serviceCollection: snapshot.child("services").child("status").val().serviceCollection,
                            extraReviewCharge: snapshot.child("services").child("charges").val().extraReview,
                            fullReviewCharge: snapshot.child("services").child("charges").val().fullReview,
                            serviceCollectionCharge: snapshot.child("services").child("charges").val().serviceCollection,
                            airConditioning: snapshot.child("services").child("charges").val().airConditioning,
                            battery: snapshot.child("services").child("charges").val().battery,
                            brakes: snapshot.child("services").child("charges").val().brakes,
                            damper: snapshot.child("services").child("charges").val().damper,
                            oil: snapshot.child("services").child("charges").val().oil,
                            tires: snapshot.child("services").child("charges").val().tires,
                            engine: snapshot.child("services").child("charges").val().engine, 
                            evaluationAgerage: snapshot.val().evaluationAgerage              
                        })
                    } else {
                        setCurrentClient({
                            id: (currentUser?.id) ? currentUser?.id : "777",
                            email: snapshot.val().email,
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
                            mechanicalAssistanceCharge: snapshot.child("services").child("charges").val().mechanicalAssistance,
                            evaluationAgerage: snapshot.val().evaluationAgerage
                        })
                    }
                }else{
                    console.log("No data avaiable")
                }
            })
        }
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
                        serviceCollection: snapshot.child("services").child("status").val().serviceCollection,
                        extraReviewCharge: snapshot.child("services").child("charges").val().extraReview,
                        fullReviewCharge: snapshot.child("services").child("charges").val().fullReview,
                        serviceCollectionCharge: snapshot.child("services").child("charges").val().serviceCollection,
                        airConditioning: snapshot.child("services").child("charges").val().airConditioning,
                        battery: snapshot.child("services").child("charges").val().battery,
                        brakes: snapshot.child("services").child("charges").val().brakes,
                        damper: snapshot.child("services").child("charges").val().damper,
                        oil: snapshot.child("services").child("charges").val().oil,
                        tires: snapshot.child("services").child("charges").val().tires,
                        engine: snapshot.child("services").child("charges").val().engine,  
                        evaluationAgerage: snapshot.val().evaluationAgerage  
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
                        mechanicalAssistance: snapshot.child("services").child("status").val().mechanicalAssistance,
                        assistanceRequestCharge: snapshot.child("services").child("charges").val().assistanceRequest, 
                        pickupCharge: snapshot.child("services").child("charges").val().pickup, 
                        mechanicalAssistanceCharge: snapshot.child("services").child("charges").val().mechanicalAssistance,
                        evaluationAgerage: snapshot.val().evaluationAgerage
                    })
                }else{
                    console.log("No data avaiable")
                }
            })
        }
    }

    async function getEmployeeList() {
     
        await firebase.database().ref('/users').on('value', (snapshot) =>{
            let employee: any[] = []
            snapshot.forEach((snap) => {
                let userObject = snap.val()
                userObject['id'] = snap.key
                let account = userObject['account']
                if(account === 'employee'){
                    employee.push(userObject)
                    //console.log(employee)
                }
                
            
                setEmployeeList(employee as never)
                //console.log(employeeList)
            })
            //console.log(employeeList)
            /*for (let index = 0; index < array.length; index++) {
                if(account === "workshop" && region === location ){
                
            }*/
        })
    
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

    async function getAppointmentsList() {
        if (currentUser?.account === 'employee') {
            await firebase.database().ref('/appointments/' + currentUser?.companyId).on('value', (snapshot) =>{
                let appoitments: any[] = []
                snapshot.forEach((snap) => {
                    let userObject = snap.val()
                    
                    //console.log(location)
                    
                    appoitments.push(userObject)
                    
                    
                
                    setAppoitmentsList(appoitments as never)
                    
                })
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
            //console.log(appoitmentsList)
        } else {
            await firebase.database().ref('/appointments/' + currentUser?.id).on('value', (snapshot) =>{
                let appoitments: any[] = []
                snapshot.forEach((snap) => {
                    let userObject = snap.val()
                    
                    //console.log(location)
                    
                    appoitments.push(userObject)
                    
                    
                
                    setAppoitmentsList(appoitments as never)
                    
                })
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
        }
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
                            fullReviewCharge: snapshot.child("services").child("charges").val().fullReview,
                            oil: snapshot.child("services").child("charges").val().oil,
                            serviceCollectionCharge: snapshot.child("services").child("charges").val().serviceCollection,
                            tires: snapshot.child("services").child("charges").val().tires,
                            evaluationAgerage: snapshot.val().evaluationAgerage
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
                            mechanicalAssistanceCharge: snapshot.child("services").child("charges").val().mechanicalAssistance,
                            evaluationAgerage: snapshot.val().evaluationAgerage
                        })
                    }
                }else{
                    console.log("No data avaiable")
                }
            })
    }

    async function handleAppoitmentWorkshop(day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string) {
        let formattedDate = day + '/' + month + '/' + year
        setAppoitmentWorkshop({
            serviceType: serviceType,
            date: formattedDate,
            hour: hour,
            brand: brand,
            model: model
        })
        console.log(appointmentWorkshop)
    }

    async function handleAppointmentWorkshopMark(images: any[], obs: string, companyName: string, userName: string){
        if(currentUser?.account === 'employee'){
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.companyId).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentWorkshopProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                username: companyName
            })
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                username: userName
            })
            //console.log(currentUser?.username)
            for (let index = 0; index < images.length; index++) {
                const fileExtension = images[index].split('.').pop()
                let response = await fetch(images[index])
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
                            if(clientKey != null && companyKey != null){
                                firebase.database().ref("/appointments/" + currentUser?.companyId).child(clientKey).child('images').child('' + index + '').set({
                                    downloadUrl
                                })
                                firebase.database().ref("/appointments/" + currentWorkshopProf?.id).child(companyKey).child('images').child('' + index + '').set({
                                    downloadUrl
                                })
                            }
                        })
                    }
                )
            }
        } else {
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.id).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentWorkshopProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                username: companyName
            })
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                username: userName
            })
            //console.log(currentUser?.username)
            for (let index = 0; index < images.length; index++) {
                const fileExtension = images[index].split('.').pop()
                let response = await fetch(images[index])
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
                            if(clientKey != null && companyKey != null){
                                firebase.database().ref("/appointments/" + currentUser?.id).child(clientKey).child('images').child('' + index + '').set({
                                    downloadUrl
                                })
                                firebase.database().ref("/appointments/" + currentWorkshopProf?.id).child(companyKey).child('images').child('' + index + '').set({
                                    downloadUrl
                                })
                            }
                        })
                    }
                )
            }
        }
    }

    async function handlePreventiveAppoitment(isFullReview: any, isExtraReview: any, isServiceCollection: any, isOil: any, isDamper: any, isBattery: any, isAirConditioning: any, isTires: any, isBrakes: any, isEngine: any, totalCharge: any, obs: any, address: any, companyName: string, userName: string) {
        if(currentUser?.account === 'employee'){
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.companyId).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentWorkshopProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                isAirConditioning: isAirConditioning,
                isBattery: isBattery,
                isDamper: isDamper,
                isBrakes: isBrakes,
                isEngine: isEngine,
                isExtraReview: isExtraReview,
                isFullReview: isFullReview,
                isOil: isOil,
                isServiceCollection: isServiceCollection,
                isTires: isTires,
                totalCharge: totalCharge,
                address: address,
                username: companyName
            })
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                isAirConditioning: isAirConditioning,
                isBattery: isBattery,
                isDamper: isDamper,
                isBrakes: isBrakes,
                isEngine: isEngine,
                isExtraReview: isExtraReview,
                isFullReview: isFullReview,
                isOil: isOil,
                isServiceCollection: isServiceCollection,
                isTires: isTires,
                totalCharge: totalCharge,
                address: address,
                username: userName
            })
        } else {
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.id).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentWorkshopProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                isAirConditioning: isAirConditioning,
                isBattery: isBattery,
                isDamper: isDamper,
                isBrakes: isBrakes,
                isEngine: isEngine,
                isExtraReview: isExtraReview,
                isFullReview: isFullReview,
                isOil: isOil,
                isServiceCollection: isServiceCollection,
                isTires: isTires,
                totalCharge: totalCharge,
                address: address,
                username: companyName
            })
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentWorkshopProf?.id, 
                serviceType: appointmentWorkshop?.serviceType,
                date: appointmentWorkshop?.date,
                hour: appointmentWorkshop?.hour,
                brand: appointmentWorkshop?.brand,
                model: appointmentWorkshop?.model,
                obs: obs,
                isAirConditioning: isAirConditioning,
                isBattery: isBattery,
                isDamper: isDamper,
                isBrakes: isBrakes,
                isEngine: isEngine,
                isExtraReview: isExtraReview,
                isFullReview: isFullReview,
                isOil: isOil,
                isServiceCollection: isServiceCollection,
                isTires: isTires,
                totalCharge: totalCharge,
                address: address,
                username: userName
            })
        }
    }

    async function handleAppointmentsTrailerPickup(day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, obs: string, totalCharge: any, addressCollection: string, addressDelivery:string, companyName: string, userName: string) {
        if(currentUser?.account === 'employee'){
            let formattedDate = day + '/' + month + '/' + year
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.companyId).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentTrailerProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: serviceType,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                addressCollection: addressCollection, 
                addressDelivery: addressDelivery,
                username: companyName
            })        
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: serviceType,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                addressCollection: addressCollection, 
                addressDelivery: addressDelivery,
                username: userName
            })
        } else {
            let formattedDate = day + '/' + month + '/' + year
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.id).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentTrailerProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: serviceType,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                addressCollection: addressCollection, 
                addressDelivery: addressDelivery,
                username: companyName
            })        
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: serviceType,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                addressCollection: addressCollection, 
                addressDelivery: addressDelivery,
                username: userName
            })
        }
    }

    async function handleAppointmentsTrailer(date: any, brand: string, model: string, service: string, obs: string, totalCharge: any, companyName: string, userName: string) {
        if(currentUser?.account === 'employee'){
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.companyId).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentTrailerProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: service,
                date: date,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                username: companyName
            })
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.companyId,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: service,
                date: date,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                username: userName
            })
        } else {
            let clientRef = await firebase.database().ref("/appointments/" + currentUser?.id).push()
            let clientKey = clientRef.key
            let companyRef = await firebase.database().ref("/appointments/" + currentTrailerProf?.id).push()
            let companyKey = companyRef.key
            clientRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: service,
                date: date,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                username: companyName
            })
            companyRef.set({
                id: clientKey,
                id_company: companyKey,
                currentUserId: currentUser?.id,
                currentWorkshopProf: currentTrailerProf?.id, 
                serviceType: service,
                date: date,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                username: userName
            })
        }
    }

    async function getAppointmentById(id: string, id_company: string, currentUserId: string) {
        let images: string[] = []
        if(currentUser?.account === 'user' || currentUser?.id === currentUserId){
            await firebase.database().ref('/appointments/' + currentUser?.id).child(id).on('value', (snapshot) =>{
                if(snapshot.exists()){
                    if(snapshot.val().serviceType === 'preventiveMaintenance'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            isAirConditioning: snapshot.val().isAirConditioning,
                            isBattery: snapshot.val().isBattery,
                            isDamper: snapshot.val().isDamper,
                            isBrakes: snapshot.val().isBrakes,
                            isEngine: snapshot.val().isEngine,
                            isExtraReview: snapshot.val().isExtraReview,
                            isFullReview: snapshot.val().isFullReview,
                            isOil: snapshot.val().isOil,
                            isServiceCollection: snapshot.val().isServiceCollection,
                            isTires: snapshot.val().isTires,
                            totalCharge: snapshot.val().totalCharge,
                            address: snapshot.val().address,
                        })
                    }
                    else if(snapshot.val().serviceType === 'breakMaintenance'){
                        /*for (let index = 0; index < 6; index++) {
                            firebase.database().ref('/appointments/' + currentUser?.id).child(id).child('images').child('' + index + '').get().then((snapshot) => {
                                images[index] = snapshot.val().downloadUrl
                                //console.log(images[index])
                            })
                            
                        }*/
                        //console.log(images)
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            images: snapshot.val().images,
                            totalCharge: snapshot.val().totalCharge,
                        })
                        images = []
                    }
                    else if(snapshot.val().serviceType === 'assistanceRequest' || snapshot.val().serviceType === 'mechanicalAssistance'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            totalCharge: snapshot.val().totalCharge,
                        })
                    }
                    else if(snapshot.val().serviceType === 'pickup'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            totalCharge: snapshot.val().totalCharge,
                            addressCollection: snapshot.val().addressCollection,
                            addressDelivery: snapshot.val().addressDelivery
                        })
                    }
                }else{

                }
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
        }else if (currentUser?.account === 'employee') {
            await firebase.database().ref('/appointments/' + currentUser?.companyId).child(id_company).on('value', (snapshot) =>{
                if(snapshot.exists()){
                    if(snapshot.val().serviceType === 'preventiveMaintenance'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            isAirConditioning: snapshot.val().isAirConditioning,
                            isBattery: snapshot.val().isBattery,
                            isDamper: snapshot.val().isDamper,
                            isBrakes: snapshot.val().isBrakes,
                            isEngine: snapshot.val().isEngine,
                            isExtraReview: snapshot.val().isExtraReview,
                            isFullReview: snapshot.val().isFullReview,
                            isOil: snapshot.val().isOil,
                            isServiceCollection: snapshot.val().isServiceCollection,
                            isTires: snapshot.val().isTires,
                            totalCharge: snapshot.val().totalCharge,
                            address: snapshot.val().address,
                        })
                    }
                    else if(snapshot.val().serviceType === 'breakMaintenance'){
                        /*for (let index = 0; index < 6; index++) {
                            firebase.database().ref('/appointments/' + currentUser?.id + id + 'images').child('' + index + '').get().then((snapshot) => {
                                images[index] = snapshot.val().downloadUrl
                            })
                            
                        }*/
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            images: snapshot.val().images,
                            totalCharge: snapshot.val().totalCharge,
                        })
                        images = []
                    }
                    else if(snapshot.val().serviceType === 'assistanceRequest' || snapshot.val().serviceType === 'mechanicalAssistance'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            totalCharge: snapshot.val().totalCharge,
                        })
                    }
                    else if(snapshot.val().serviceType === 'pickup'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            totalCharge: snapshot.val().totalCharge,
                            addressCollection: snapshot.val().addressCollection,
                            addressDelivery: snapshot.val().addressDelivery
                        })
                    }
                }
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
        } else {
            await firebase.database().ref('/appointments/' + currentUser?.id).child(id_company).on('value', (snapshot) =>{
                if(snapshot.exists()){
                    if(snapshot.val().serviceType === 'preventiveMaintenance'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            isAirConditioning: snapshot.val().isAirConditioning,
                            isBattery: snapshot.val().isBattery,
                            isDamper: snapshot.val().isDamper,
                            isBrakes: snapshot.val().isBrakes,
                            isEngine: snapshot.val().isEngine,
                            isExtraReview: snapshot.val().isExtraReview,
                            isFullReview: snapshot.val().isFullReview,
                            isOil: snapshot.val().isOil,
                            isServiceCollection: snapshot.val().isServiceCollection,
                            isTires: snapshot.val().isTires,
                            totalCharge: snapshot.val().totalCharge,
                            address: snapshot.val().address,
                        })
                    }
                    else if(snapshot.val().serviceType === 'breakMaintenance'){
                        /*for (let index = 0; index < 6; index++) {
                            firebase.database().ref('/appointments/' + currentUser?.id + id + 'images').child('' + index + '').get().then((snapshot) => {
                                images[index] = snapshot.val().downloadUrl
                            })
                            
                        }*/
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            images: snapshot.val().images,
                            totalCharge: snapshot.val().totalCharge,
                        })
                        images = []
                    }
                    else if(snapshot.val().serviceType === 'assistanceRequest' || snapshot.val().serviceType === 'mechanicalAssistance'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            totalCharge: snapshot.val().totalCharge,
                        })
                    }
                    else if(snapshot.val().serviceType === 'pickup'){
                        setAppointment({
                            id: snapshot.val().id,
                            id_company: snapshot.val().id_company,
                            serviceType: snapshot.val().serviceType,
                            currentUserId: snapshot.val().currentUserId,
                            currentWorkshopProf: snapshot.val().currentWorkshopProf,
                            date: snapshot.val().date,
                            hour: snapshot.val().hour,
                            brand: snapshot.val().brand,
                            model: snapshot.val().model,
                            obs: snapshot.val().obs,
                            username: snapshot.val().username,
                            totalCharge: snapshot.val().totalCharge,
                            addressCollection: snapshot.val().addressCollection,
                            addressDelivery: snapshot.val().addressDelivery
                        })
                    }
                }
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })
        }
    }

    async function handleUpdateBreakMaintenance(id_company: string, id: string, day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, currentUserId: string, obs: string, images: string[], currentWorkshopProf: string) {
        console.log(images)
        let formattedDate = day + '/' + month + '/' + year
        await firebase.database().ref('/appointments/' + currentUserId).child(id).update({
                id: id,
                id_company: id_company,
                serviceType: serviceType,
                currentUserId: currentUserId,
                currentWorkshopProf: currentWorkshopProf,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs
        })
        await firebase.database().ref('/appointments/' + currentWorkshopProf).child(id_company).update({
            id: id,
            id_company: id_company,
            serviceType: serviceType,
            currentUserId: currentUserId,
            currentWorkshopProf: currentWorkshopProf,
            date: formattedDate,
            hour: hour,
            brand: brand,
            model: model,
            obs: obs
        })

        for (let index = 0; index < images.length; index++) {
            if(typeof images[index] === "object" ){
                if(currentUserId != null && currentWorkshopProf != null){
                    let image: any = images[index]
                    firebase.database().ref("/appointments/" + currentUserId).child(id).child('images').child('' + index + '').update({
                        downloadUrl: image.downloadUrl,
                    })
                    firebase.database().ref("/appointments/" + currentWorkshopProf).child(id_company).child('images').child('' + index + '').update({
                        downloadUrl: image.downloadUrl
                    })
                }
            } else if (images[index] != undefined){
                const fileExtension = images[index].split('.').pop()
                let response = await fetch(images[index])
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
                            if(currentUserId != null && currentWorkshopProf != null){
                                firebase.database().ref("/appointments/" + currentUserId).child(id).child('images').child('' + index + '').update({
                                    downloadUrl
                                })
                                firebase.database().ref("/appointments/" + currentWorkshopProf).child(id_company).child('images').child('' + index + '').update({
                                    downloadUrl
                                })
                            }
                        })
                    }
                )
            }
        }
    }

    async function deleteAppointment(id_company: string, id: string, currentUserId: string, currentWorkshopProf: string) {
        await firebase.database().ref("/appointments/" + currentUserId).child(id).remove()
        await firebase.database().ref("/appointments/" + currentWorkshopProf).child(id_company).remove()
        let app: any[] = appoitmentsList
        for (let index = 0; index < appoitmentsList.length; index++) {
            if(app[index].id === id && app[index].id_company === id_company){
              app.splice(index, 1)
            } 
            setAppoitmentsList(app as never)  
        }
        console.log(appoitmentsList)
    }

    async function deleteEmployee(id: string) {
        await firebase.database().ref('/users/').child(id).remove()
        let app: any[] = employeeList
        for (let index = 0; index < appoitmentsList.length; index++) {
            if(app[index].id === id){
              app.splice(index, 1)
            } 
            setEmployeeList(app as never)  
        }
    }

    async function handleUpdatePreventiveMaintenance(id_company: string, id: string, day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, currentUserId: string, obs: string, currentWorkshopProf: string, isFullReview: any, isExtraReview: any, isServiceCollection: any, isOil: any, isDamper: any, isBattery: any, isAirConditioning: any, isTires: any, isBrakes: any, isEngine: any, totalCharge: any, address: any) {
        let formattedDate = day + '/' + month + '/' + year
        await firebase.database().ref('/appointments/' + currentUserId).child(id).update({
                id: id,
                id_company: id_company,
                serviceType: serviceType,
                currentUserId: currentUserId,
                currentWorkshopProf: currentWorkshopProf,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                isAirConditioning: isAirConditioning,
                isBattery: isBattery,
                isDamper: isDamper,
                isBrakes: isBrakes,
                isEngine: isEngine,
                isExtraReview: isExtraReview,
                isFullReview: isFullReview,
                isOil: isOil,
                isServiceCollection: isServiceCollection,
                isTires: isTires,
                totalCharge: totalCharge,
                address: address,
        })
        await firebase.database().ref('/appointments/' + currentWorkshopProf).child(id_company).update({
            id: id,
            id_company: id_company,
            serviceType: serviceType,
            currentUserId: currentUserId,
            currentWorkshopProf: currentWorkshopProf,
            date: formattedDate,
            hour: hour,
            brand: brand,
            model: model,
            obs: obs,
            isAirConditioning: isAirConditioning,
            isBattery: isBattery,
            isDamper: isDamper,
            isBrakes: isBrakes,
            isEngine: isEngine,
            isExtraReview: isExtraReview,
            isFullReview: isFullReview,
            isOil: isOil,
            isServiceCollection: isServiceCollection,
            isTires: isTires,
            totalCharge: totalCharge,
            address: address,
        })
    }

    async function handleUpdatePickup(id_company: string, id: string, day: number, month: number, year: number, hour: string, serviceType: string, model: string, brand: string, currentUserId: string, obs: string, currentWorkshopProf: string, totalCharge: any, addressCollection: string, addressDelivery:string) {
            let formattedDate = day + '/' + month + '/' + year
            await firebase.database().ref("/appointments/" + currentUserId).child(id).update({
                id: id,
                id_company: id_company,
                serviceType: serviceType,
                currentUserId: currentUserId,
                currentWorkshopProf: currentWorkshopProf,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                addressCollection: addressCollection, 
                addressDelivery: addressDelivery,
            })        
            await firebase.database().ref("/appointments/" + currentWorkshopProf).child(id_company).update({
                id: id,
                id_company: id_company,
                serviceType: serviceType,
                currentUserId: currentUserId,
                currentWorkshopProf: currentWorkshopProf,
                date: formattedDate,
                hour: hour,
                brand: brand,
                model: model,
                obs: obs,
                totalCharge: totalCharge,
                addressCollection: addressCollection, 
                addressDelivery: addressDelivery,
            })
    }

   async function handleTotalCharge(id_company: string, id: string, totalCharge: any, currentUserId: string, currentWorkshopProf: string) {
    await firebase.database().ref("/appointments/" + currentUserId).child(id).update({
        totalCharge: totalCharge
    })        
    await firebase.database().ref("/appointments/" + currentWorkshopProf).child(id_company).update({
        totalCharge: totalCharge
    })
   }

   async function handleExistEvaluation(companyId: string, company: any) {
        if(currentUser){
            await firebase.database().ref("/evaluations/" + companyId).get().then((snapshoot) => {
                if (snapshoot.hasChild(currentUser.id)) {
                    setEvaluation({
                        id: snapshoot.child(currentUser.id).val().id,
                        stars: snapshoot.child(currentUser.id).val().stars,
                        obs: snapshoot.child(currentUser.id).val().obs,
                        username: snapshoot.child(currentUser.id).val().username
                    })
                    navigation.navigate('EvaluationEdit' as never, {company: company} as never)
                } else {
                    navigation.navigate('EvaluationCreate' as never, {company: company} as never)
                }
            })
        }
   }

   async function handleUpdateEvaluation(companyId: string, stars: string, obs: string){
        if(currentUser){
            await firebase.database().ref("/evaluations/" + companyId).child(currentUser.id).update({
                stars: stars,
                obs: obs
            })

            await firebase.database().ref('/evaluations/' + companyId).on('value', (snapshot) =>{
                let evalTotal = 0
                let evalCount = 0
                snapshot.forEach((snap) => {
                    let userObject = snap.val()
                    
                    //console.log(location)
                    evalTotal = evalTotal + parseInt(userObject['stars'])
                    evalCount = evalCount + 1
                    
                })

                setEvaluationAverage(evalTotal / evalCount)
                
                
                //console.log(trailersList)
                /*for (let index = 0; index < array.length; index++) {
                    if(account === "workshop" && region === location ){
                    
                }*/
            })

            await firebase.database().ref('/users/' + companyId).update({
                evaluationAgerage: evaluationAverage
            })
        }
   }

   async function handleCreateEvaluation(companyId: string, stars: string, obs: string) {
        if(currentUser){
            if(currentUser.account === 'employee' && currentUser?.companyId){
                let evaluationRef = await firebase.database().ref("/evaluations/" + companyId).child(currentUser?.companyId)
                await evaluationRef.set({
                    id: currentUser.id,
                    stars: stars,
                    obs: obs,
                    username: currentUser.username
                })
    
                await firebase.database().ref('/evaluations/' + companyId).on('value', (snapshot) =>{
                    let evalTotal = 0
                    let evalCount = 0
                    snapshot.forEach((snap) => {
                        let userObject = snap.val()
                        
                        //console.log(location)
                        evalTotal = evalTotal + parseInt(userObject['stars'])
                        evalCount = evalCount + 1
                        
                    })
    
                    setEvaluationAverage(evalTotal / evalCount)
                    
                    
                    //console.log(trailersList)
                    /*for (let index = 0; index < array.length; index++) {
                        if(account === "workshop" && region === location ){
                        
                    }*/
                })
    
                await firebase.database().ref('/users/' + companyId).update({
                    evaluationAgerage: evaluationAverage
                })
            } else {
                let evaluationRef = await firebase.database().ref("/evaluations/" + companyId).child(currentUser?.id)
                await evaluationRef.set({
                    id: currentUser.id,
                    stars: stars,
                    obs: obs,
                    username: currentUser.username
                })
    
                await firebase.database().ref('/evaluations/' + companyId).on('value', (snapshot) =>{
                    let evalTotal = 0
                    let evalCount = 0
                    snapshot.forEach((snap) => {
                        let userObject = snap.val()
                        
                        //console.log(location)
                        evalTotal = evalTotal + parseInt(userObject['stars'])
                        evalCount = evalCount + 1
                        
                    })
    
                    setEvaluationAverage(evalTotal / evalCount)
                    
                    
                    //console.log(trailersList)
                    /*for (let index = 0; index < array.length; index++) {
                        if(account === "workshop" && region === location ){
                        
                    }*/
                })
    
                await firebase.database().ref('/users/' + companyId).update({
                    evaluationAgerage: evaluationAverage
                })
            }
        }
   }

   async function getEvaluationsList(companyId: string) {
    await firebase.database().ref('/evaluations/' + companyId).on('value', (snapshot) =>{
        //console.log(snapshot.val())
        let evaluations: any[] = []
        snapshot.forEach((snap) => {
            let userObject = snap.val()
            
            //console.log(location)
            evaluations.push(userObject)
            //console.log(userObject)

            setEvaluationsList(evaluations as never)
            
        })

        //console.log(evaluationsList)
        
        
        
        //console.log(trailersList)
        /*for (let index = 0; index < array.length; index++) {
            if(account === "workshop" && region === location ){
            
        }*/
    })
   }

   async function getQuiz() {
       let data = ''
       await axios.get('https://opentdb.com/api.php?amount=5&category=28&difficulty=easy&type=multiple').then(
        res => {
            const response = res.data.results
            navigation.navigate('QuizPlay' as never, {questions: response} as never)
            setQuestions(response)
            //console.log(questions)
        }
       )
   }
   
   async function getQuizMedium() {
        let data = ''
        await axios.get('https://opentdb.com/api.php?amount=5&category=28&difficulty=medium&type=multiple').then(
        res => {
            const response = res.data.results
            navigation.navigate('QuizPlay' as never, {questions: response} as never)
            setQuestions(response)
            //console.log(questions)
        }
        )
    }

    async function getQuizHard() {
        let data = ''
        await axios.get('https://opentdb.com/api.php?amount=5&category=28&difficulty=hard&type=multiple').then(
        res => {
            const response = res.data.results
            navigation.navigate('QuizPlay' as never, {questions: response} as never)
            setQuestions(response)
            //console.log(questions)
        }
        )
    }


    return(
        <AuthContext.Provider value={{getQuizMedium, getQuizHard, questions, getQuiz, appointment, getClientById, deleteEmployee, employeeList, getEmployeeList, handleSignUpEmployee, evaluationsList, evaluation, getEvaluationsList, handleUpdateEvaluation, handleExistEvaluation, handleCreateEvaluation, handleTotalCharge, handleUpdatePickup, handleUpdatePreventiveMaintenance, deleteAppointment, handleUpdateBreakMaintenance, getAppointmentById, appointmentTrailerPickup,appointmentTrailer, appointmentPreventiveMaintenance, appointmentBreakMaintenance, getAppointmentsList, appoitmentsList, handleAppointmentsTrailer, handleAppointmentsTrailerPickup, handlePreventiveAppoitment, handleAppointmentWorkshopMark, handleAppoitmentWorkshop, appointmentWorkshop, getTrailersList, getWorkshopList, location, getProfUserbyId, trailersList, workshopList, getProfUser, currentWorkshopProf, currentTrailerProf, currentClient, getClientUser, updateServicesStatusReb, updateServicesChargesReb, updateServicesStatus, updateLocation, locations, updateServicesCharges, updateAddress, updateImage, updatePhone, updateEmail, updateName, signOut, handleSignIn, handleSignUp, errorLogin, errorRegister, isDuplicated, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

