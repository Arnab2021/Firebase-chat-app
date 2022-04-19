import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment'

import { CallCard } from '../../components';

export default class CallsHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCalls: [{
        id: 1,
        name: 'Jhon Smith',
        call_type: 'incoming',
        call_count: 2,
        calltime: moment(new Date()).format('HH:MM')
      },
      {
        id: 2,
        name: 'Jhon Smith',
        call_type: 'outgoing',
        call_count: 1,
        calltime: moment(new Date()).format('HH:MM')
      },
      {
        id: 3,
        name: 'Jhon Smith',
        call_type: 'missed_incoming',
        call_count: 1,
        calltime: moment(new Date()).format('HH:MM')
      },
      {
        id: 4,
        name: 'Jhon Smith',
        call_type: 'missed_outgoing',
        call_count: 1,
        calltime: moment(new Date()).format('HH:MM')
      }]
    };
  }


  renderItem = ({ item, index }) => {
    return (
      <CallCard item={item} />
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
        <FlatList
          data={this.state.allCalls}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          style={{ marginTop: 15 }}
          ItemSeparatorComponent={() => <View style={{marginTop: 15}} />}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
})
