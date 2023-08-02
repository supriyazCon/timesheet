import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Buttons from "../components/Button";
const Home = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridItem}>
        <View style={[styles.container, { flexDirection: "row" }]}>
          <View style={styles.box}>
            <Text style={styles.time}>{formatTime(time).split(":")[0]}</Text>
            {/* <Text style={styles.label}>Hours</Text> */}
          </View>
          <Text style={styles.label}>:</Text>
          <View style={styles.box}>
            <Text style={styles.time}>{formatTime(time).split(":")[1]}</Text>
            {/* <Text style={styles.label}>Minutes</Text> */}
          </View>
          <Text style={styles.label}>:</Text>
          <View style={styles.box}>
            <Text style={styles.time}>{formatTime(time).split(":")[2]}</Text>
            {/* <Text style={styles.label}>Seconds</Text> */}
          </View>
        </View>
        {!isRunning ? (
           <Buttons
           // mode={'contained'}
           customClick={() => handleStart()}
           title={"CHECK IN"}
           styles={[
             {
               marginTop: 40,
               // paddingVertical: 8,
               paddingHorizontal: 15,
               borderRadius: 15,
               width: "35%",
               height: "10%",
               alignSelf: "center",
               fontSize: 7,
               //borderWidth: 1,
               backgroundColor: "#00dbba",
               //borderColor: "#00dbba",
               color: "white",
               justifyContent: "center",
               marginBottom: 14,
             },
           ]}
         />
          // <Button title="Start" onPress={handleStart} />
        ) : (
          <Buttons
           // mode={'contained'}
           customClick={() => handleStop()}
           title={"CHECK OUT"}
           styles={[
             {
               marginTop: 40,
               // paddingVertical: 8,
               paddingHorizontal: 15,
               borderRadius: 15,
               width: "35%",
               height: "10%",
               alignSelf: "center",
               fontSize: 7,
               //borderWidth: 1,
               backgroundColor: "#f27074",
               //borderColor: "#f27074",
               color: "white",
               justifyContent: "center",
               marginBottom: 14,
             },
           ]}
         />
        )}
        {/* <Button title="Reset" onPress={handleReset} /> */}
      </View>
      <View style={[styles.gridItem,{height: "40%",}]}>
          <Text style={{fontSize:26, fontWeight:'600', top: 30, position:'absolute'}}>Announcements</Text>
          <Text style={{fontSize: 20}}>No Records Found</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcefeb",//#faea93
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  time: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
    marginTop: 4,
  },
  gridItem: {
    width: "85%",
    height: "53%",
   // aspectRatio: 1, // Maintain square shape
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20, // Adjust roundness as needed
    margin: 15, // Adjust margin between grid items as needed
  },
});
export default Home;
