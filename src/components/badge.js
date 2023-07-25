import { View, Text } from "react-native";
import React from "react";

const badge = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        top: -4,
        right: -8,
        borderRadius: 40,
        backgroundColor: "red",
        height: 26,
        width: 26,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>
        {props.jobCount}
      </Text>
    </View>
  );
};

export default badge;
