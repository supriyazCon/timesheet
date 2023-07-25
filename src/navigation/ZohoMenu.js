import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ZohoMenu = (props) => {
  const { navigation } = props;
  const [showTimeTrackerMenu, setShowTimeTrackerMenu] = useState(false);
  const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);
  const [token, setToken] = useState([]);
  useEffect(() => {
    getRole();
  }, []);
  const handleMenuItemPress = (screenName) => {
    //   if (screenName == "Attendance") {
    //   //  setShowAttendanceMenu(!showAttendanceMenu);
    //     navigation.navigate(screenName);
    //   } else {
    //     navigation.navigate(screenName);
    //   }
  };

  const handleTimeTrackerPress = () => {
    setShowTimeTrackerMenu(!showTimeTrackerMenu);
  };

  const handleSubMenuItemPress = (screenName) => {
    // navigation.navigate("TimeTracker");
    navigation.navigate(screenName);
  };
  const getRole = async () => {
    let token = await AsyncStorage.getItem("token");
    token = JSON.parse(token);
    setToken(token);
  };
  return (
    <View style={{ flex: 1 }}>
       <ScrollView contentInsetAdjustmentBehavior="automatic">
      {/* <DrawerContentScrollView {...props}> */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress("Feeds")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#8fb2f9" }]}>
            <MaterialCommunityIcons
              name="card-text-outline"
              size={32}
              color="black"
            />
          </View>
          <Text style={styles.menuItemText}>FEEDS</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress("Attendance")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#f4ac64" }]}>
            <Feather name="calendar" size={32} color="black" />
          </View>
          <Text style={styles.menuItemText}>ATTENDANCE</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleMenuItemPress("Attendance")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#f4ac64" }]}>
            <Feather name="calendar" size={32} color="black" />
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={styles.menuItemText}>ATTENDANCE </Text>
            <Feather
              name={showTimeTrackerMenu ? "chevron-up" : "chevron-down"}
              size={32}
              color="gray"
              style={{
                right: 100,
                position: "absolute",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleTimeTrackerPress}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#f5bec3" }]}>
            <Ionicons name="time-outline" size={32} color="black" />
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={styles.menuItemText}>TIME TRACKER </Text>
            <Feather
              name={showTimeTrackerMenu ? "chevron-up" : "chevron-down"}
              size={32}
              color="gray"
              style={{
                right: 100,
                position: "absolute",
              }}
            />
          </View>
        </TouchableOpacity>
        {showTimeTrackerMenu && (
          <>
            <TouchableOpacity
              style={styles.subMenuItem}
              // onPress={() => handleSubMenuItemPress("TimeLogs")}
            >
              <Text style={styles.subMenuItemText}>Time Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subMenuItem}
              // onPress={() => handleSubMenuItemPress("Timesheets")}
            >
              <Text style={styles.subMenuItemText}>Timesheets</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subMenuItem}
               onPress={() => handleSubMenuItemPress("Jobs")}
            >
              <Text style={styles.subMenuItemText}>Jobs</Text>
            </TouchableOpacity>
            {/* {token.role != "ADMIN" ? ( */}
              <TouchableOpacity
                style={styles.subMenuItem}
                onPress={() => handleSubMenuItemPress("Projects")}
              >
                <Text style={styles.subMenuItemText}>Projects</Text>
              </TouchableOpacity>
            {/* // ) : (
            //   ""
            // )} */}
            {/* {token.role == "PROJECTHEAD" ? ( */}
              <TouchableOpacity
                style={styles.subMenuItem}
                onPress={() => handleSubMenuItemPress("Clients")}
              >
                <Text style={styles.subMenuItemText}>Clients</Text>
              </TouchableOpacity>
            {/* ) : (
              ""
            )} */}
          </>
        )}
        <TouchableOpacity
          style={styles.menuItem}
          // onPress={() => handleMenuItemPress("Announcements")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#e38d8e" }]}>
            <Feather name="file-minus" size={32} color="black" />
          </View>
          <Text style={styles.menuItemText}>ANNOUNCEMENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          // onPress={() => handleMenuItemPress("Tasks")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#d2b7ea" }]}>
            <MaterialCommunityIcons
              name="format-list-checks"
              size={32}
              color="black"
            />
          </View>
          <Text style={styles.menuItemText}>TASKS</Text>
        </TouchableOpacity>
        {/* {token.role == "ADMIN" ? ( */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("Registration")}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#a6e3ad" }]}
            >
              <Ionicons name="person-add-outline" size={32} color="black" />
            </View>
            <Text style={styles.menuItemText}>ADD USERS</Text>
          </TouchableOpacity>
        {/* ) : (
          ""
        )} */}
        </ScrollView>
      {/* </DrawerContentScrollView> */}
      {/* Render additional components or footer if needed */}
    </View>
  );
};

const styles = {
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  subMenuItem: {
    paddingLeft: 48,
    paddingVertical: 8,
    marginLeft: 35,
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  subMenuItemText: {
    fontSize: 24,
    color: "black",
  },
};

export default ZohoMenu;
