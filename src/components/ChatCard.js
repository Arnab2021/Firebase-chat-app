import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AvatarIcon, ChatCardUserData } from '.';

export default class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount(){
 
  }

  shouldComponentUpdate(nextProps){  
    
    if(this.props === nextProps){
      //console.log('ChatCard not render');
      return false      
    }
    //console.log('ChatCard should render');
    return true    
  }
  
  render() {
    //console.log('ChatCard render', this.props);
    const { name, lastMessage, time, profileImage } = this.props.item
    return (
      <View style={styles.container}>
        <AvatarIcon profileImage={profileImage} avatarContainer={{ width: 50,height: 50,}}  />
        <ChatCardUserData name={name} lastMessage={lastMessage} time={time} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 8
  }
})