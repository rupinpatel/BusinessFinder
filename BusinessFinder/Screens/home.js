import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import {StyleSheet, View, Image, Text, Button, TextInput, ToastAndroid, Dimensions, StatusBar,} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Home({navigation}) {

    // Used to store user entered string values for location and keywords
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    // Condition to check if the user has entered a location
    // Displays a toast message if the user leaves location empty
    const pressHandler = () => {
        if (location.length == 0) {
            showToast();
        } else {
            navigation.navigate('BusinessList', {keyword, location});
        }
    }

    // Displays a toast message
    const showToast = () => {
        ToastAndroid.showWithGravityAndOffset("Please enter a location!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    };

    return (
        <View style ={styles.container}>

            <View style = {styles.image_area}>
                <Animatable.Image animation="bounce" iterationCount="infinite" source={require('../assets/food_image.jpeg')} style={styles.logo} resizeMode="stretch" />
                <Text style={styles.title}>Business Finder</Text>
            </View> 

            <Animatable.View animation="fadeInUpBig" style = {styles.search_area}>

                <Text style = {styles.text}>Enter your location (required):</Text>
                <TextInput style={styles.input} placeholder='e.g. New York City, NY 10118' onChangeText={(value) => setLocation(value)}/>

                <Text style = {styles.text}>Enter keywords (optional):</Text>
                <TextInput style={styles.input} placeholder='e.g. Starbucks, food, grocery' onChangeText={(value) => setKeyword(value)}/>
                
                <Text style = {styles.text2}>-------------------------------</Text>
                <Button style={styles.button} color="#841584" title='Search businesses' onPress = { () => {pressHandler()}}/> 
                <Text style = {styles.text2}>-------------------------------</Text>

            </Animatable.View>          
        </View>
    )
}

// Creates a value for height for the image based on screen size.
const {height} = Dimensions.get("screen");
const image_height = height * 0.30;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
    },
    image_area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: image_height,
        height: image_height
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    search_area: {
        flex: 1,
        backgroundColor: '#A9CBE8',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    text: {
        color: '#3F283B',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5
    },
    input: {
        borderWidth: 3,
        borderColor: '#841584',
        padding: 8,
        margin: 8,
        backgroundColor: "#FFF",
    },
    text2: {
        color: '#3F283B',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        textAlign: 'center',
    },
    button: {
        alignItems: 'flex-end',
        
        paddingTop: 30,
        marginTop: 30,
        backgroundColor: 'blue',
        color: 'white',
    },
});