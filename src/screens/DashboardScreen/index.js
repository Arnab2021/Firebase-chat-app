import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import {connect} from 'react-redux'

import {ChatCard} from '../../components'
import { _getUsersListAsync } from '../../redux/operations/dahsboardOperation';

const DashboardScreen = ({navigation, props, getUsersLists, usersList}) => {

    const [chats, setChats] = useState([{
        id: 1,
        name: 'Jhon',
        lastMessage: 'Hello...',
        profileImage: '',
        time:  moment(new Date()).format('HH:MM')
    },{
        id: 2,
        name: 'Jhon',
        lastMessage: 'Hello...',
        profileImage: '',
        time:  moment(new Date()).format('HH:MM')
    }])

  
    useEffect(() => {
        getUsersLists()
    },[])

    const renderItem = ({item, index}) => {
        return(
            <ChatCard item={item} />
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={(item , index) => index}
                style={{marginTop: 15}}
                ItemSeparatorComponent={() => <View style={{marginTop: 10}} />}
            />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        usersList: state
    }
}

const mapDispatchToProps = dispatch => ({
    getUsersLists: () => dispatch(_getUsersListAsync())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)

export default connectComponent(DashboardScreen)
