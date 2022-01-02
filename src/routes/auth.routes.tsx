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
import { WorkshopSearch } from '../screens/WorkshopSearch'
import { ServiceStatusReb } from '../screens/ServiceStatusReb'
import { ChangePlansReb } from '../screens/ChangePlansReb'
import { ViewProfile } from '../screens/ViewProfile'
import { ViewProfileProf } from '../screens/ViewProfileProf'
import { TrailersSearch } from '../screens/TrailersSearch'
import { ProfDetails } from '../screens/ProfDetails'
import { ProfDetailsTrailers } from '../screens/ProfDetailsTrailers'
import { AppointmentInitial } from '../screens/AppointmentInitial'
import { AppointmentBreakMaintenance } from '../screens/AppointmentBreakMaintenance'
import { AppointmentPreventiveMaintenance } from '../screens/AppointmentPreventiveMaintenance'
import { AppointmentInitialTrailer } from '../screens/AppointmentInitialTrailer'
import { Appointments } from '../screens/Appointments'
import { AppointmentDetails } from '../screens/AppointmentDetails'
import { AppointmentInitialEdit } from '../screens/AppointmentInitialEdit'
import { AppointmentBreakMaintenanceEdit } from '../screens/AppointmentBreakMaintenanceEdit'
import { AppointmentInitialTrailerPickupEdit } from '../screens/AppointmentInitialTrailerPickupEdit'
import { AppointmentPreventiveMaintenanceEdit } from '../screens/AppointmentPreventiveMaintenanceEdit'
import { EvaluationCreate } from '../screens/EvaluationCreate'
import { EvaluationEdit } from '../screens/EvaluationEdit'
import { Evaluations } from '../screens/Evaluations'
import { AdminScreen } from '../screens/AdminScreen'
import { SignUpEmployee } from '../screens/SignUpEmployee'
import { QuizHome } from '../screens/QuizHome'
import { QuizPlay } from '../screens/QuizPlay'
import { QuizResult } from '../screens/QuizResult'

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
            <Screen name="ChangePlansReb" component={ChangePlansReb} />
            <Screen name="ServiceStatusReb" component={ServiceStatusReb} />
            <Screen name="WorkshopSearch" component={WorkshopSearch} />
            <Screen name="ViewProfile" component={ViewProfile} />
            <Screen name="ViewProfileProf" component={ViewProfileProf} />
            <Screen name="TrailersSearch" component={TrailersSearch} />
            <Screen name="ProfDetails" component={ProfDetails} />
            <Screen name="ProfDetailsTrailers" component={ProfDetailsTrailers} />
            <Screen name="Appointments" component={Appointments} />
            <Screen name="AppointmentInitial" component={AppointmentInitial} />
            <Screen name="AppointmentInitialTrailer" component={AppointmentInitialTrailer} />
            <Screen name="AppointmentBreakMaintenance" component={AppointmentBreakMaintenance} />
            <Screen name="AppointmentPreventiveMaintenance" component={AppointmentPreventiveMaintenance} />
            <Screen name="AppointmentDetails" component={AppointmentDetails} />
            <Screen name="AppointmentInitialEdit" component={AppointmentInitialEdit} />
            <Screen name="AppointmentPreventiveMaintenanceEdit" component={AppointmentPreventiveMaintenanceEdit} />
            <Screen name="AppointmentBreakMaintenanceEdit" component={AppointmentBreakMaintenanceEdit} />
            <Screen name="AppointmentInitialTrailerPickupEdit" component={AppointmentInitialTrailerPickupEdit} />
            <Screen name="EvaluationCreate" component={EvaluationCreate} />        
            <Screen name="EvaluationEdit" component={EvaluationEdit} />
            <Screen name="Evaluations" component={Evaluations} />
            <Screen name="AdminScreen" component={AdminScreen} />
            <Screen name="SignUpEmployee" component={SignUpEmployee} />
            <Screen name="QuizHome" component={QuizHome} />
            <Screen name="QuizPlay" component={QuizPlay} />
            <Screen name="QuizResult" component={QuizResult} />
        </Navigator>
    )
}