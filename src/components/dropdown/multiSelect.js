import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
// import {Text} from 'react-native-paper';
import { MultiSelect } from "react-native-element-dropdown";

const MultiDropdownComp = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  if (props.disable == undefined) {
    props.disable = false;
  }
  //alert('Dropdown called')
  //console.log("drpComp", props.value);
  return (
    <View
      style={{
        // alignSelf: 'center',
        backgroundColor: "#F8F8F8",
        marginVertical: 10,
       // marginHorizontal: 6,
        borderRadius: 20,
        flex: props.styleContainer,
      }}
    >
      <MultiSelect
        style={[
          props.style,
          { borderColor: props.borderColor },
          { flex: props.styleContainer },
        ]}
        placeholderStyle={styles.placeholderStyle}
        //selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        search={props.search}
        showsVerticalScrollIndicator={true}
        maxHeight={props.maxHeight}
        labelField={props.labelField}
        valueField={props.valueField}
        placeholder={props.placeholder}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={props.onfocus}
        onBlur={props.onblur}
        onChange={props.onchange}
        disable={props.disable}
        renderSelectedItem= {(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
                <AntDesign color="black" name="delete" size={17} />
              </View>
            </TouchableOpacity>
          )}
        //containerStyle={{borderColor:'purple'}}
      />
      {props.value != "" && (
        <Text
          style={{
            color: "black", //props.color,
            position: "absolute",
            top: -8,
            left: 10,
            backgroundColor: "#f8f8f8",
            //paddingHorizontal: 2,
            fontSize: 13,
          }}
        >
          {props.title}
        </Text>
      )}

      {props.error && (
        <Text
          style={{
            color: "red",
            fontSize: 16,
            marginTop: 5,
            marginBottom: 10
          }}
        >
          {props.error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    width: 90,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "black",
  },
});

export default MultiDropdownComp;
