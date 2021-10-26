import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";
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
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children}:any) {
    const navigation = useNavigation()
    const [errorLogin, setLoginError] = useState(false)
    const [errorRegister, setRegisterError] = useState(false)
    const [isDuplicated, setIsDuplicated] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    
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

    return(
        <AuthContext.Provider value={{ updateAddress, updateImage, updatePhone, updateEmail, updateName, signOut, handleSignIn, handleSignUp, errorLogin, errorRegister, isDuplicated, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

