import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import React,{useState, useEffect, useRef } from 'react';
import Feather from 'react-native-vector-icons/Feather'
import { actuatedNormalize } from '../services/actuatedNormalizeFont';

export default function CustomTextInput(props) {
  const [isfoused, setIsFoused] = useState(false)
  let _animatedIsFocused = useRef (new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(_animatedIsFocused, {
      toValue: (isfoused )? 1: 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }, [isfoused])
  
  const labelFontStyle = {
    fontSize: _animatedIsFocused.interpolate({
      inputRange: [0,1],
      outputRange: [12,12]
    }),
    color: _animatedIsFocused.interpolate({
      inputRange: [0,1],
      outputRange: ['#8B8787','#ccc']
    }),
    position: 'absolute',
    left: 0,
    top: _animatedIsFocused.interpolate({
      inputRange: [0,1],
      outputRange:[30,0]
    })
  }

  const boxShadow={
    elevation: _animatedIsFocused.interpolate({
      inputRange: [0,1],
      outputRange: [0,6]
    })
  }
    
  return (
    <Animated.View style={[styles.inputContainer,boxShadow]}>
      <Feather name={props.iconName} size={actuatedNormalize(22)} style={styles.icon} color={(isfoused)?'#000': '#ccc'} />
      <View style={{ flex: 1 }}>
        <Animated.Text style={[styles.labelText, (props.value == '')&& labelFontStyle]}>{props.label}</Animated.Text>
        <TextInput
          style={[styles.textInput]}
          placeholder={props.placeholder}
          onFocus={() => setIsFoused(true)}
          onBlur={() => setIsFoused(false)}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    paddingHorizontal:6,  
    backgroundColor:'#fff'
  },
  icon:{
    marginBottom: 8
  },
  labelText: {       
    fontWeight: 'bold',
    color: '#BFBFBF',
    letterSpacing: 0.2,
    paddingLeft: 10,
    fontSize: 12
  },
  textInput: {
    fontWeight: 'bold',
    flex: 1,
    color: '#000',
    paddingLeft: 10,
    fontSize: actuatedNormalize(16),
    textAlignVertical: 'bottom'
    //backgroundColor:'red'
  }
})