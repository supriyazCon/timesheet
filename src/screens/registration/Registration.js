import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getAllClient, getRolesDdl, postAddUsers } from "../../api/apis";
import DropdownComp from "../../components/dropdown/Dropdown";

const Registration = () => {
  const [empid, setEmpid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rolesDdl, setRolesddl] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [bgColor, setBgColor] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const getRoles = await getRolesDdl();
    setRolesddl(getRoles.data.data);
  };
  const handleRegistration = async () => {
    setBgColor(true);
    console.log(bgColor);
    setTimeout(() => {
      setBgColor(false);
    }, 250);
    if (
      firstName === "" ||
      lastName === "" ||
      emailId === "" ||
      phoneNumber === "" ||
      password === "" ||
      roleId === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    } else if (!validateAlphabetsOnly(firstName)) {
      Alert.alert("Error", "First Name should contain only alphabets");
    } else if (!validateAlphabetsOnly(lastName)) {
      Alert.alert("Error", "Last Name should contain only alphabets");
    } else if (!validateEmail(emailId)) {
      Alert.alert("Error", "Please enter a valid email address");
    } else if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
      const isValid = passwordRegex.test(password);
      if (!isValid) {
        Alert.alert(
          "Error",
          "Please enter password with minimum 1 uppercase, 1 lowercase, 1 special character and 1 number"
        );
      } else {
        // Perform registration logic here
        const userDetails = {
          id: 0,
          empid: "",
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          mobileNumber: phoneNumber,
          password: password,
          roleId: roleId.id,
        };
        console.log(userDetails, "usr det");
        const users = await postAddUsers(userDetails);

        console.log("user added", users.data, users.status);
        if (users.status == 201 || users.status == 200) {
          alert(users.data.message);
          navigation.navigate("Home");
          // navigation.navigate("Login");
        }
        // else{
        //   alert(users.data.errors)
        // }

        //console.log('Registration');
      }
    }
  };
  const handleCancel = () => {
    // Reset form values
    setPassword("");
    setEmailId("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setRoleId("");

    //setRefresh(!refresh)

    //navigation.goBack();
  };
  const validateAlphabetsOnly = (text) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(text);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.box}> */}
      {/* <Text style={styles.title}>Registration</Text> */}
      {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Employee ID"
            value={empid}
            onChangeText={setEmpid}
          />
        </View> */}
      <View style={styles.inputContainer}>
        <Text style={styles.title}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={firstName}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={lastName}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={emailId}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={setEmailId}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Phone Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={phoneNumber}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Roles</Text>

        <DropdownComp
          data={rolesDdl}
          maxHeight={150}
          labelField="name"
          valueField="id"
          placeholder={"Roles"}
          searchPlaceholder="Search..."
          value={roleId}
          borderColor={"#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            console.log("text roles", text);
            setRoleId(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          // styleContainer={0.2}
          // color={colors.primary}
          // error={errors.roles}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          //secureTextEntry
          value={password}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={setPassword}
        />
      </View>
      {/* <TouchableOpacity
          style={[
            styles.button,
            bgColor
              ? { backgroundColor: "#ffd700" }
              : { backgroundColor: "#fff" },
          ]}
          onPress={handleRegistration}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity> */}
      <View style={styles.buttonContainer}>
        <View
          style={{
            backgroundColor: "#f27074",
            width: "50%",
            height: "100%",
            justifyContent: "center",
            marginRight: 10,
            borderRadius: 15,
          }}
        >
          <Button title="CANCEL" color="white" onPress={handleCancel} />
        </View>
        <View
          style={{
            backgroundColor: "#00dbba",
            width: "50%",
            height: "100%",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <Button title="ADD" color="white" onPress={handleRegistration} />
        </View>
      </View>
      {/* </View> */}
      {/* <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Already have an account?{" "}
        </Text>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#f7f7f7",
    height: "100%",
  },
  box: {
    width: "80%",
    backgroundColor: "#2b2b2b",
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  title: { fontWeight: "600", fontSize: 26, marginBottom: 16 },

  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    height: 40,
    color: "black",
  },
  button: {
    height: 48,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 24,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginTop: 24,
    bottom: 50,
    position: "absolute",
    height: "5%",
  },
  loginButton: {
    marginTop: 18,
    alignSelf: "center",
    flexDirection: "row",
  },
  loginButtonText: {
    fontSize: 22,
    color: "#00dbba",
    fontWeight: "500",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // marginBottom: 16,
    height: 40,
    width: "100%",
  },
});

export default Registration;
