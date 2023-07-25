import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
const TextInputComp = props => {
  let multiline = props.multiline
  console.log('multiline',props.multiline)
  return (
    // <View
    //   style={{
    //     flexDirection: "row",
    //     backgroundColor: colors.white,
    //     padding: 10,
    //     margin: 10
    //   }}
    // >
    //   <Text style={styles.text}>
    //     {props.name}
    //   </Text> 
   

    <TextInput
      label={props.label}
      mode="outlined"
      value={props.text}
      keyboardType={props.keyboardType}
      style={styles.textInput}
      onChangeText={props.onChangeText}
      theme={{
        colors: {primary: 'purple', underlineColor: 'transparent'},
      }}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 0.3,
    color: 'black',
    alignSelf: 'center',
    fontSize: 26,
    padding: '2%',
    //paddingRight: "7%",
    //paddingLeft: "7%",
  },
  textInput: {
    //flex: 1, 
    marginTop:-4,
    //marginLeft: '2%',
    alignSelf: 'center',
    // fontSize: 26,
    // fontWeight: "600",
    // color: "black",
    //  padding: "2%",
    //  paddingRight: "7%",
    //  paddingLeft: "7%",
    //marginTop:50,
    //flex: 0.4
    width: '100%',
    height: 40,
  },
});

export default TextInputComp;
