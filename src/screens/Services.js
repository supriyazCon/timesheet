import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const Services = () => {
  return (
    <View style={styles.container}>
      <View style={{marginLeft:55,  width: '100%',}}>
        <TextInput
          placeholder="Search Services"
          style={{
            backgroundColor: "lightgrey",
            height: 40,
            width: '70%',
            margin: 15,
            borderRadius: 15,
            padding: 10,
            // alignContent: "center",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        />
      </View>
      <View style={styles.gridItem}>
      <FontAwesome
        name="calendar-check-o"
        size={80}
        color={"#fcba03"} //23bfa5
        style={{ alignSelf: "center", }}
        onPress={() => {
         
          //props.navigation.navigate("AddClient");
        }}
      />
        <Text style={styles.label}>ATTENDANCE</Text>
      </View>
      <View style={styles.gridItem}>
      <MaterialCommunityIcons
        name="alarm"
        size={80}
        color={"#fcba03"} //23bfa5
        style={{ alignSelf: "center", }}
        onPress={() => {
         
          //props.navigation.navigate("AddClient");
        }}
      />
        <Text style={styles.label}>TIME TRACKER</Text>
      </View>
      <View style={styles.gridItem}>
      <Ionicons
        name="megaphone-sharp"
        size={80}
        color={"#00dbba"} //23bfa5
        style={{ alignSelf: "center",}}
        onPress={() => {
         //
         // props.navigation.navigate("AddClient");
        }}
      />
        <Text style={styles.label}>ANNOUNCEMENTS</Text>
      </View>
      <View style={styles.gridItem}>
      <MaterialCommunityIcons
        name="file"
        size={80}
        color={"#fcba03"} //23bfa5
        style={{ alignSelf: "center",}}
        onPress={() => {
         //
          //props.navigation.navigate("AddClient");
        }}
      />
        <Text style={styles.label}>TASKS</Text>
      </View>
    </View>
    // <View>
    //   {/* <Text>Services</Text> */}
    //   <TextInput placeholder='Search Services' style={{backgroundColor: 'lightgrey', height: 40, width: 500, margin: 15, borderRadius: 15, padding: 10}} />
    //   <View>

    //   </View>
    // </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "center",
    alignItems: "center",
    margin: 14,
  },
  gridItem: {
    flexDirection:'row',
    width: "42%",
    aspectRatio: 1, // Maintain square shape
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20, // Adjust roundness as needed
    margin: 14, // Adjust margin between grid items as needed
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    bottom: 25,
    position:'absolute'
  },
});
export default Services;
