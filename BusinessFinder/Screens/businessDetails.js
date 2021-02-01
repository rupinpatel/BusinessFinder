import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import {Linking, StyleSheet, View, Text, Image, Dimensions, Button} from 'react-native';
import { set } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

export default function BusinessDetails({navigation}) {

    // Retreives the business ID from the previous screen
    const [id, setId] = useState(navigation.getParam('businessId'));
    
    // Array to store the response data
    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
        getDetailApiCall();
    }, [])

    // API request to get the details of any selected business
    function getDetailApiCall() {
        axios.get('https://api.yelp.com/v3/businesses/' + id, {
        headers: {'Authorization': 'Bearer ZGGMMlGg-O1YGhfB_p2r3pS48nTntxjwvyzffXC3ArhZ8NuzAlvdrFLJp93iOJBi8nmXG8fAEgJ-4TSZL3xSvV0zaiciYhSKp-9ACcz8vO9jBy0Qqk29-zl0GasVYHYx'},
    })
    .then(function (response) {setResponseData(response.data);},
    (error) => {console.log(error);})
    .catch(function (error) {console.log(error) });
    if (!responseData) {
        return null 
    }
    }

    // Creates 5 new views which allows animations to be conducted seperately
    return (
        <View style ={styles.container}>

            <Animatable.View 
            animation="slideInLeft"
            style = {styles.titleSlide}>
            <Text style={styles.title}>{responseData.name}</Text>
            </Animatable.View>

            <Animatable.View 
            animation="slideInRight"
            style = {styles.photoSlide}>
            <Image source={{uri: responseData.image_url}} style={styles.image_type}/>
            </Animatable.View>

            <Animatable.View 
            animation="slideInLeft"
            style = {styles.extraSlide}>
            <Text style={styles.text}>{'Rating:- ' + responseData.rating + '/5'}</Text>
            <Text style={styles.text}>{'Total reviews: ' + responseData.review_count}</Text>
            <Text style={styles.text}>{'Price:- ' + responseData.price}</Text>
            </Animatable.View>

            <Animatable.View 
            animation="slideInRight"
            style = {styles.phoneNumberSlide}>
            <Text style={styles.text}>{responseData.display_phone}</Text>
            </Animatable.View>

            <Animatable.View 
            animation="slideInLeft"
            style = {styles.moreSlide}>
            <Button style={styles.button} color="#841584" title='More information'  onPress={() => Linking.openURL(responseData.url)}/>
            </Animatable.View>

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
    },
    titleSlide: {
        height: "10%",
        backgroundColor: '#841584',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
    },
    title: {
        color: '#FFF',
        fontSize: 35,
        fontStyle:'italic',
        fontWeight: 'bold'
    },
    photoSlide: {
        height: "40%",
        backgroundColor: '#A193E6',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    image_type: {
        width: '100%',
        height: '100%'
    },
    extraSlide: {
        height: "18%",
        backgroundColor: '#ABF5B3',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    text: {
        color: '#3F283B',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5
    },
    phoneNumberSlide: {
        height: "10%",
        backgroundColor: '#F5502F',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    moreSlide: {
        height: "8%",
        backgroundColor: '#A9CBE8',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});