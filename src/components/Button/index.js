import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.styles]} // Merge the default styles with custom styles (if provided)
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    width: '661%', // Increase the width to 80%
    alignSelf: 'center',
    // marginTop: '8%',
    borderRadius: 40,
    // shadowColor: '#4082ed',
    // shadowOffset: { width: 8, height: 8 },
    // shadowOpacity: 0.9,
    // shadowRadius: 5,
  },
  text: {
    alignSelf: 'center',
    fontSize: 26,
    color: 'white',
    padding: '2%',
    paddingRight: '7%',
    paddingLeft: '7%',
  },
});

export default Button;
