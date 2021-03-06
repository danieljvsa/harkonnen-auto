

import React, { useContext, useEffect, useState } from 'react'
import { View, Image, TextInput, Button, Alert, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ListView, ImageBackground } from 'react-native'
import firebase from "../../config/firebase";
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

import chevronLeft from '../../assets/chevron-left.png'
import chevronRight from '../../assets/chevron.png'
import arrowBack from '../../assets/arrow-back.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { theme } from '../../global/styles/theme';


//nomes de meses que serão usados no calendário
const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  
  //dias da semana que vão ser utilizados no calendário
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  //horas que vão ser utilizados no calendário
  const hoursList = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00']

export function AppointmentInitialTrailer(){
    const navigation = useNavigation()
    const [service, setService] = useState('')
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState<any>(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);
    const [finishButtonActive, setFinishButtonActive] = useState(false)
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [addressCollection, setAddressCollection] = useState('')
    const [addressDelivery, setAddressDelivery] = useState('')
    const [totalCharge, setTotalCharge] = useState(0)
    const [obs, setObs] = useState('')
    //const [show, setShow] = useState(true)
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const {handleAppointmentsTrailerPickup, handleAppointmentsTrailer, currentTrailerProf, currentUser} = useContext(AuthContext)

    //bloco de código para definir o preço guardado anteriormente
    useEffect(() => {
        if(service != ""){
            if(service === "assistanceRequest" && currentTrailerProf?.assistanceRequestCharge){
                setTotalCharge(parseFloat(currentTrailerProf?.assistanceRequestCharge))
            }
            if(service === "mechanicalAssistance" && currentTrailerProf?.mechanicalAssistanceCharge){
                setTotalCharge(parseFloat(currentTrailerProf?.mechanicalAssistanceCharge))
            }
            if(service === "pickup" && currentTrailerProf?.pickupCharge){
                setTotalCharge(parseFloat(currentTrailerProf?.pickupCharge))
            }
        } else {
            setTotalCharge(0)
        }
        //console.log(service)
    }, [service])

    useEffect(() => {
        //variável com a data atual do sistema
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
    }, [])

    //bloco de código que maném o mês e o ano atualizados pela data do sistema do dispositivo
    useEffect(() => {
        let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        let newListDays = [];

        let todayDate = new Date();
        let todayYear = todayDate.getFullYear();
        let todayMonth: any = todayDate.getMonth() + 1;
        let todayDay: any = todayDate.getDate();

        todayMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth;
        todayDay = todayDay < 10 ? '0' + todayDay : todayDay;

        let todayStringDate = `${todayYear}-${todayMonth}-${todayDay}`;

        setSelectedDay(0);

        for (let i = 1; i <= daysInMonth; i++) {
            let d = new Date(selectedYear, selectedMonth, i);

            let year = d.getFullYear();
            let month: any = d.getMonth() + 1;
            let day: any = d.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            let selDate = `${year}-${month}-${day}`;


            if (todayStringDate === selDate) {
            setSelectedDay(Number(todayDay));
            }

            if (todayMonth === month && todayDay <= day) {
            newListDays.push({
                status:  true,
                weekday: days[d.getDay()],
                number: i,
            });
            } else if (todayMonth !== month) {
            newListDays.push({
                status: true ,
                weekday: days[d.getDay()],
                number: i,
            });
            }}
            setListDays(newListDays as never);
            setListHours([]);
            setSelectedHour(0);
    }, [selectedMonth, selectedYear])
    
    //bloco que mantém o dias e as horas atualizadas
    useEffect(() => {
        if (selectedDay > 0) {
          let d = new Date(selectedYear, selectedMonth, selectedDay);
    
          let year = d.getFullYear();
          let month: any = d.getMonth() + 1;
          let day: any = d.getDate();
    
          month = month < 10 ? '0' + month : month
          day = day < 10 ? '0' + day : day
    
          let selDate = `${year}-${month}-${day}`
    
          let dToday = new Date();
          let nowYear = dToday.getFullYear();
          let nowMonth: any = dToday.getMonth() + 1;
          let nowDay: any = dToday.getDate();
    
          nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
          nowDay = nowDay < 10 ? '0' + nowDay : nowDay;
    
          let nowDate = `${nowYear}-${nowMonth}-${nowDay}`;
    
          let nowHour = dToday.getHours();
          let nowMinutes = dToday.getMinutes();

          let hours: string[] = []

          if (selDate === nowDate) {
            let maxTime = hoursList[hoursList.length - 1].split(':');

            let maxHour = Number(maxTime[0]);
            let maxMinutes = Number(maxTime[1]);

            if (
                nowHour < maxHour ||
                (nowHour === maxHour && nowMinutes < maxMinutes)
            ) {
                hoursList.map((item) => {
                let array = item.split(':');

                if (nowHour < Number(array[0])) {
                    hours.push(item);
                } else if (
                    nowHour === Number(array[0]) &&
                    nowMinutes < Number(array[1])
                ) {
                    hours.push(item);
                }
                });
            }

            if (hours.length === 0) {
                let newListDays: any = listDays;

                newListDays.map((item: any, key: any) => {
                if (item.number === Number(nowDay)) {
                    newListDays[key].status = false;
                }
                setSelectedDay(0);
                });

                setListDays(newListDays);
            }
            } else {
                hours = hoursList;
            }

                setListHours(hours as never);
                setSelectedHour(null);
            }
    }, [selectedDay, selectedMonth, selectedYear, listDays])

    //bloco que será utilizado numa atualização futura para resetar o calendário
    const handleCloseButton = () => {
        //setShow(false);
        setSelectedYear(0);
        setSelectedMonth(0);
        setSelectedDay(0);
        setSelectedHour(null);
      };
    
    //função para gravar os dados do agendamento relativos a esta screen
    const handleFinishClick = async () => {
        console.log(service)
        if (
          //user.public_id &&
          //serviceId !== null &&
          selectedYear > 0 &&
          selectedMonth >= 0 &&
          selectedDay > 0 &&
          selectedHour !== null &&
          service === 'pickup' &&
          brand != '' &&
          model != '' && 
          totalCharge > 0
        ) {
            console.log(service)
          let hour = selectedHour.split(':');
          let formattedHour = Number(hour[0]);
          let formattedMinutes = Number(hour[1]);
    
          let now: any = new Date();
          let nowYear: any = now.getFullYear();
          let nowMonth: any = now.getMonth() + 1;
          let nowDay: any = now.getDate();
          let nowHour: any = now.getHours();
          let nowMinutes: any = now.getMinutes();
          let nowSeconds: any = now.getSeconds();
    
          nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
          nowDay = nowDay < 10 ? '0' + nowDay : nowDay;
          nowHour = nowHour < 10 ? '0' + nowHour : nowHour;
          nowMinutes = nowMinutes < 10 ? '0' + nowMinutes : nowMinutes;
          nowSeconds = nowSeconds < 10 ? '0' + nowSeconds : nowSeconds;
    
          let formattedNow = `${nowYear}-${nowMonth}-${nowDay} ${nowHour}:${nowMinutes}:${nowSeconds}`;
          console.log(service)
            if(service === 'pickup'){
                if(currentTrailerProf?.username && currentUser?.username){
                    handleAppointmentsTrailerPickup(selectedDay, (selectedMonth+1), selectedYear, selectedHour, service, model, brand, obs, totalCharge, addressCollection, addressDelivery, currentTrailerProf?.username, currentUser?.username)
                    navigation.navigate('TrailersSearch' as never)
                }
            }
            
        } else{
            let now: any = new Date();
            let nowYear: any = now.getFullYear();
            let nowMonth: any = now.getMonth() + 1;
            let nowDay: any = now.getDate();
            let nowHour: any = now.getHours();
            let nowMinutes: any = now.getMinutes();
            let nowSeconds: any = now.getSeconds();
        
            nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
            nowDay = nowDay < 10 ? '0' + nowDay : nowDay;
            nowHour = nowHour < 10 ? '0' + nowHour : nowHour;
            nowMinutes = nowMinutes < 10 ? '0' + nowMinutes : nowMinutes;
            nowSeconds = nowSeconds < 10 ? '0' + nowSeconds : nowSeconds;
        
            let formattedNow = `${nowYear}-${nowMonth}-${nowDay} ${nowHour}:${nowMinutes}:${nowSeconds}`;
            if(currentTrailerProf?.username && currentUser?.username){
                if(currentUser.account === 'employee' && currentUser?.enterpriseName){
                    handleAppointmentsTrailer(formattedNow, brand, model, service, obs, totalCharge, currentTrailerProf?.username, currentUser?.enterpriseName)
                    navigation.navigate('TrailersSearch' as never)
                }else{
                    handleAppointmentsTrailer(formattedNow, brand, model, service, obs, totalCharge, currentTrailerProf?.username, currentUser?.username)
                    navigation.navigate('TrailersSearch' as never)
                }
            }
        }
      };
    
    //função para andar um mês para trás
    const handleLeftDateClick = () => {
        let today = new Date();
    
        let mountDate = new Date(selectedYear, selectedMonth);
    
        if (today < mountDate) {
          mountDate.setMonth(mountDate.getMonth() - 1);
          setSelectedYear(mountDate.getFullYear());
          setSelectedMonth(mountDate.getMonth());
          setSelectedDay(0);
          setFinishButtonActive(false);
        }
      };
    
    //função para andar um mês para frente
    const handleRightDateClick = () => {
        let maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 2);
    
        let mountDate = new Date(selectedYear, selectedMonth);
    
        if (mountDate < maxDate) {
          mountDate.setMonth(mountDate.getMonth() + 1);
          setSelectedYear(mountDate.getFullYear());
          setSelectedMonth(mountDate.getMonth());
          setSelectedDay(0);
          setFinishButtonActive(false);
        }
      };
    
    //verifica hora e data disponivel
    const handleDateItem = (item: any) => {
        if (item.status) {
          if (selectedDay !== item.number) {
            setSelectedDay(item.number);
            setFinishButtonActive(false);
          }
        }
      };
    
      const handleTimeItem = (item: any) => {
        setSelectedHour(item);
        setFinishButtonActive(true);
      };

    function goBack() {
        //função para voltar uma tela atrás
        navigation.goBack()
    }

    

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.scroll}
        >
                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                        <View style={styles.header}  >  
                            <View style={styles.header}  >
                                <RectButton style={styles.goBack} onPress={goBack} >
                                    <Image source={arrowBack} style={styles.arrowBack}  />
                                </RectButton>
                                <Text style={styles.title} >Agendamento</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scroll} >
                            <View style={styles.inputG} >
                                <Text style={styles.text} >Serviço</Text>
                                <View style={styles.picker} >
                                    <Picker mode="dropdown" selectedValue={service} onValueChange={(text, index) => setService(text)} >
                                        <Picker.Item label="Tipo de serviço..." value="" style={styles.textInput} />
                                        {(currentTrailerProf?.assistanceRequest) ? 
                                            <Picker.Item label="Pedido de Assistência" value="assistanceRequest" style={styles.textInput} />
                                        : <Picker.Item label="Pedido de Assistência" value="" style={styles.textInput} />
                                        }
                                        {(currentTrailerProf?.mechanicalAssistance) ? 
                                            <Picker.Item label="Assitência Mecânica" value="mechanicalAssistance" style={styles.textInput} />
                                        : <Picker.Item label="Assitência Mecânica" value="" style={styles.textInput} />
                                        }
                                        {(currentTrailerProf?.pickup) ? 
                                            <Picker.Item label="Serviço de Pickup" value="pickup" style={styles.textInput} />
                                        : <Picker.Item label="Serviço de Pickup" value="" style={styles.textInput} />
                                        }
                                    </Picker>
                                </View>
                            </View>
                            {(service === "pickup") ? <>
                                <View style={styles.inputG} >
                                    <View style={styles.calendarTitle}>
                                        <RectButton onPress={handleLeftDateClick} style={styles.chevronD} >
                                            <View>
                                                <Image source={chevronLeft} style={styles.chevron} />
                                            </View>
                                        </RectButton>
                                        <Text style={styles.monthText} >{months[selectedMonth]} {selectedYear}</Text>
                                        <RectButton onPress={handleRightDateClick} style={styles.chevronD} >
                                            <View>
                                                <Image source={chevronRight} style={styles.chevron} />
                                            </View>
                                        </RectButton>
                                    </View>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 27}} >
                                        {listDays.map((item: any, key) => (
                                            <RectButton
                                                key={key}
                                                onPress={() => handleDateItem(item)}
                                                // eslint-disable-next-line react-native/no-inline-styles
                                                style={{
                                                backgroundColor:
                                                    item.number === selectedDay ? '#040404' : '#fff',
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                paddingTop: 4,
                                                paddingLeft: 6,
                                                paddingRight: 8,
                                                paddingBottom: 8,
                                                marginRight: 11
                                                }}>
                                                <Text
                                                style={
                                                    item.number === selectedDay && listHours.length > 0
                                                    ? // eslint-disable-next-line react-native/no-inline-styles
                                                        {color: '#fff', fontFamily: theme.fonts.text, fontSize: 18 }
                                                    : item.status
                                                    ? // eslint-disable-next-line react-native/no-inline-styles
                                                        {color: '#040404', fontFamily: theme.fonts.text, fontSize: 18 }
                                                    : // eslint-disable-next-line react-native/no-inline-styles
                                                        {color: '#040404', fontFamily: theme.fonts.text, fontSize: 18 }
                                                }>
                                                {item.weekday}
                                                </Text>
                                                <Text style={
                                                    item.number === selectedDay
                                                    ? // eslint-disable-next-line react-native/no-inline-styles
                                                        {color: '#fff', fontFamily: theme.fonts.text, fontSize: 16 }
                                                    : item.status
                                                    ? // eslint-disable-next-line react-native/no-inline-styles
                                                        {color: '#040404', fontFamily: theme.fonts.text, fontSize: 16 }
                                                    : // eslint-disable-next-line react-native/no-inline-styles
                                                        {color: '#040404', fontFamily: theme.fonts.text, fontSize: 16 }
                                                }>
                                                {item.number}
                                                </Text>
                                            </RectButton>
                                        ))} 
                                    </ScrollView>
                                    {listHours.length > 0 ? (
                                        <View>
                                            <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            // eslint-disable-next-line react-native/no-inline-styles
                                            contentContainerStyle={{
                                                flexGrow: 1,
                                                justifyContent: 'center',
                                                marginBottom: 23
                                            }}>
                                            {listHours.map((item, key) => (
                                                <RectButton
                                                key={key}
                                                onPress={() => handleTimeItem(item)}
                                                // eslint-disable-next-line react-native/no-inline-styles
                                                style={{
                                                    backgroundColor:
                                                    item === selectedHour ? '#040404' : '#fff',
                                                    borderRadius: 8,
                                                    alignItems: 'center',
                                                    paddingTop: 8,
                                                    paddingLeft: 6,
                                                    paddingRight: 8,
                                                    paddingBottom: 6,
                                                    marginRight: 11
                                                }}>
                                                <Text
                                                    // eslint-disable-next-line react-native/no-inline-styles
                                                    style={{
                                                    color: item === selectedHour ? '#fff' : '#040404',
                                                    fontFamily: theme.fonts.text, fontSize: 16
                                                    }}>
                                                    {item}
                                                </Text>
                                                </RectButton>
                                            ))}
                                            </ScrollView>
                                        </View>
                                        ) : <></>}
                                </View>
                                <View style={styles.inputDiv} >
                                    <Text style={styles.text} >Morada (Recolha)</Text>
                                    <TextInput style={styles.input} value={addressCollection} onChangeText={(text) => setAddressCollection(text)} />
                                </View>
                                <View style={styles.inputDiv} >
                                    <Text style={styles.text} >Morada (Entrega)</Text>
                                    <TextInput style={styles.input} value={addressDelivery} onChangeText={(text) => setAddressDelivery(text)} />
                                </View>
                                </>
                            : <></>}
                            <View style={styles.inputDiv} >
                                <Text style={styles.text} >Modelo</Text>
                                <TextInput style={styles.input} value={model} onChangeText={(text) => setModel(text)} />
                            </View>
                            <View style={styles.inputDiv} >
                                <Text style={styles.text} >Marca</Text>
                                <TextInput style={styles.input} value={brand} onChangeText={(text) => setBrand(text)} />
                            </View>
                            <View style={styles.inputDiv} >
                                <Text style={styles.textInputTitle} >Observações</Text>
                                <TextInput multiline={true} placeholder={'Deixe aqui algumas considerações sobre o problema do seu veículo...'} numberOfLines={8} value={obs} onChangeText={(text) => setObs(text)} style={styles.inputTextArea} />
                            </View>
                        </ScrollView>
                        <Text style={styles.textInputTitle}>Orçamento: {totalCharge}€</Text>
                        <ButtonIcon title="Marcar" onPress={handleFinishClick} />
                    </View>
            </KeyboardAvoidingView>
    )
}