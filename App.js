/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {PureComponent} from 'react'
 import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator} from 'react-native'

 export default class App extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.getDataFromAPI()
    }

    getDataFromAPI = async () => {
        const endpoint = 'https://simplifiedcoding.net/demos/view-flipper/heroes.php'
        const res = await fetch(endpoint)
        const data = await res.json()
        this.setState({items: data.heroes})
    }

    _renderItem = ({item, index}) => {
        let {cardText, card, cardImage} = styles
        return (
            <TouchableOpacity style={card}>
                <Image style={cardImage} source={{uri: item.imageurl}} />
                <Text style={cardText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let {container, loader} = styles
        let {items} = this.state
        if (items.length === 0) {
            return (
                <View style={loader}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <FlatList
                style={container}
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
            />
        )
    }
 }

 const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    cardText: {
        fontSize: 16,
        padding: 10
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
 })