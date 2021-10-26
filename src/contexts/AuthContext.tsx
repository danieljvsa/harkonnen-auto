import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';


type User = {
    id: string,
    username: string,
    email: string,
    password : string,
    phone: string,
    account: string
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
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children}:any) {
    const navigation = useNavigation()
    const [errorLogin, setLoginError] = useState(false)
    const [errorRegister, setRegisterError] = useState(false)
    const [isDuplicated, setIsDuplicated] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [locations, setLocations] = useState([])

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

        let uuid = uuid4()

        const fileName = `${uuid}.${fileExtension}`
        let storageRef = firebase.storage().ref(`users/images/${fileName}`)
        storageRef.put(image).on(
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

    async function getLocations() {
        await firebase.database().ref("d").get().then((snapshot) => {
            //console.log(snapshot.val())
            setLocations(snapshot.val())
        })
    }



    return(
        <AuthContext.Provider value={{updateServicesStatus, updateLocation, locations, updateServicesCharges, updateAddress, updateImage, updatePhone, updateEmail, updateName, signOut, handleSignIn, handleSignUp, errorLogin, errorRegister, isDuplicated, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

