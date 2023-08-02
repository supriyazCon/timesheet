import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getAllClient, getAllUsers, postLogin } from "../../api/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [bgColor, setBgColor] = useState(false);
  const [borderColor, setBorderColor] = useState("#ffd700");

  const navigation = useNavigation();

  useEffect(() => {
    setPassword("");
    setUserName("");
    setBorderColor("#ffd700");
  }, []);
  const handleLogin = async () => {
    // setBgColor(true);
    // console.log(bgColor);
    // setTimeout(() => {
    //   setBgColor(false);
    // }, 250);
    // Perform login logic here
    if (userName === "") {
      Alert.alert("Error", "Please enter userName");
      setBorderColor("#FF0000");
    } else if (password === "") {
      Alert.alert("Error", "Please enter password");
      setBorderColor("#FF0000");
    } else {
      console.log(navigation);
      // console.log("bg col", bgColor);
      const loginDetails = {
        userName: userName,
        password: password,
      };
      const login = await postLogin(loginDetails);

      console.log("login dtl", login.data);
      if (login.status === 200) {
        await AsyncStorage.setItem("token", JSON.stringify(login.data.jwtToken));
        Alert.alert("Success", login.data.message);
        navigation.navigate("Service");
        setUserName("");
        setPassword("");
        setBorderColor("#ffd700");
      }
      // else{
      //   alert(users.data.errors)
      // }
      ///console.log("Login");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>ZOHO</Text> */}
      <Image
        style={styles.image}
        source={require("../../../assets/images/zoho-logo.png")}
      />
      <View style={styles.headingConatiner}>
        <Text style={styles.heading}>Sign in</Text>
        <Text style={{fontSize:30, fontWeight:'300'}}>to access People</Text>
      </View>
      <View style={{width: '100%', marginTop: "90%"}}>
        {/* <Text style={styles.title}>LOGIN</Text> */}
        <TextInput
          style={[styles.input, { borderColor: borderColor }]}
          placeholder="Email"
          placeholderTextColor={"#2b2b2b"}
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={[styles.input, { borderColor: borderColor }]}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={"#2b2b2b"}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00dbba" }]}
          onPress={handleLogin}
          
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems:'center', marginTop: 30}}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Don't have an account?{" "}
        </Text>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 70
  },
  heading: {
    // top: 70,
    // position: "absolute",
    // fontSize: 45,
    // fontFamily: "Times New Roman",
    //textDecorationLine: "underline",
    fontWeight: "bold",
    //marginBottom: 44,
    // marginTop: 144,
    // color: "#00dbba",
    textAlign: "center",
  },
  headingConatiner:{
    top: 250,
    position: "absolute",
  },
  image: {
    top: 20,
    position: "absolute",
    width: 220,
    height: 220,
  },
  box: {
    width: "60%",
    backgroundColor: "#2b2b2b",
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  title: {
    // fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    height: 48,
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: 8,
    backgroundColor: "#fff",
    // fontSize: 16,
  },
  button: {
    height: 48,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 24,
    //borderWidth: 2,
    //borderColor: "#FFD700",
  },
  buttonText: {
    // fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  forgot:{
    // fontSize:'25',
    color: "#00dbba"
  },
  registerButton: {
    marginTop: 18,
    alignSelf: "center",
    flexDirection: "row",
  },
  registerButtonText: {
    // fontSize: 22,
    color: "#00dbba",
    fontWeight: "500",
  },
});

export default Login;
