import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Cards/cards'
import {StyleSheet, View, Text, Button, TextInput, TouchableOpacity, FlatList, Image, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function BusinessList({navigation}) {

    // Retreives the values of location and keyword
    const [keyword, setKeyword] = useState(navigation.getParam('keyword'));
    const [location, setLocation] = useState(navigation.getParam('location'));

    // Creates array to store response data
    const [responseData, setResponseData] = useState([]);

    // API call to retreive a list of businesses near the location requested by the user
    const getListApiCall = () => {
        axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {'Authorization': 'Bearer ZGGMMlGg-O1YGhfB_p2r3pS48nTntxjwvyzffXC3ArhZ8NuzAlvdrFLJp93iOJBi8nmXG8fAEgJ-4TSZL3xSvV0zaiciYhSKp-9ACcz8vO9jBy0Qqk29-zl0GasVYHYx'},
            params: {
            term: keyword,
            location: location
        }
    })
    .then(function (response) {
        setResponseData(response.data);}, (error) => {console.log(error);})
    .catch(function (error) {console.log(error) });

    if (!responseData) {
        return null
    }
    }

    useEffect(() => {
        getListApiCall();
    }, [])

    return (
        <View style ={styles.container}>

            <View style = {styles.title_area}>
            <Text style={styles.title}>{responseData.total} results found!</Text> 
            </View>

            <Animatable.View animation="fadeInUpBig" style = {styles.list_area}>
            <View> 
                <FlatList data={responseData.businesses} renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.push('BusinessDetails', {businessId: item.id})}}>
                        <Card>
                            <Text style={styles.text}>{ item.name }</Text>
                            <Image source={{uri: item.image_url}} style={styles.image_type}/>
                        </Card>
                    </TouchableOpacity>
                )} /> 
            </View>
            </Animatable.View>

        </View>
    );
}

const {height} = Dimensions.get("screen");
const image_height = height * 0.28;

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    title_area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#05375a',
        fontSize: 35,
        fontStyle:'italic',
        fontWeight: 'bold'
    },
    list_area: {
        flex: 8,
        backgroundColor: '#A193E6',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    text: {
        color: '#3F283B',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5
    },
    image_type: {
        width: '100%',
        height: image_height
    },
});