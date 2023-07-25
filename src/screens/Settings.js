import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Settings = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="person-circle"
          size={62}
          color={"lightgray"}
          style={{ marginRight: 32 }}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Name</Text>
          <Text style={{ fontSize: 20 }}>Email Id</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#ebebeb",
          borderRadius: 15,
          height: "15%",
          width: "90%",
          marginHorizontal: 30,
          marginVertical: 20,
          alignSelf: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            textAlign: "left",
            marginLeft: 30,
          }}
        >
          {" "}
          zCon Solutions Pvt Ltd
        </Text>
      </View>
      <Text style={styles.details}>Version: 230711.1.0</Text>
      <Text
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={[styles.details, { color: "red" }]}
      >
        Log Out
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 15,
  },
  title: { fontWeight: "600", fontSize: 26, marginBottom: 16 },
  list: { fontSize: 36, marginBottom: 56, fontWeight: "500" },
  details: { fontSize: 26, marginBottom: 36 },
});
export default Settings;
