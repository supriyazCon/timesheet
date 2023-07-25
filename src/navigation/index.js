import {
  View,
  Text,
  CommonActions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
  DrawerActions,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import Login from "../screens/login/Login";
import Registration from "../screens/registration/Registration";
import Services from "../screens/Services";
import Home from "../screens/Home";
import Approvals from "../screens/approvals/Approvals";
import Projects from "../screens/projects/Project";
import Clients from "../screens/clients/Client";
import ZohoMenu from "./ZohoMenu";
import AddProject from "../screens/projects/AddProject";
import Details from "../screens/projects/Details";
import AddClient from "../screens/clients/AddClient";
import ClientDetails from "../screens/clients/Details";
import ProjectFilter from "../screens/projects/filter";
import ClientFilter from "../screens/clients/filterClient";
import Attendance from "../screens/attendance/Attendance";
import Settings from "../screens/Settings";
import { deleteClient, deleteProject } from "../api/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Job from "../screens/jobs/Job";
import AddJob from "../screens/jobs/AddJob";
import filterJob from "../screens/jobs/filterJob";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerToggleButton = () => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity onPress={toggleDrawer}>
      <MaterialCommunityIcons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
};
const renderMoreHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
      <MaterialCommunityIcons
        name="cog-outline"
        size={32}
        color={"black"}
        onPress={() => {
          navigation.navigate("Settings");
        }}
        style={{ marginRight: 32 }}
      />
    </View>
  );
};
const renderMoreHeaderLeft = () => {
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
      <Ionicons
        name="person-circle"
        size={52}
        color={"lightgray"}
        style={{ marginRight: 32 }}
      />
    </View>
  );
};

function TabRoutes() {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "black", height: 80 },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "#FFD700", //bfb23c
        headerTitleStyle: {
          fontSize: 24,
        },

        tabBarLabelStyle: {
          fontSize: 16,
          height: 20,
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      })}
    >
      <Tab.Screen
        name="Services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" size={size} color={color} />
          ),
        }}
        component={Services}
      />
      <Tab.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Approvals"
        options={{
          title: "Approvals",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="check" size={size} color={color} />
          ),
          headerRight: () => renderProjectHeader(),
        }}
        component={Approvals}
      />
      <Tab.Screen
        name="More"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notes" size={size} color={color} />
          ),
          headerRight: () => renderMoreHeader(),
          headerLeft: () => renderMoreHeaderLeft(),
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
        component={ZohoMenu}

        // listeners={({navigation}) => ({
        //   tabPress: (e) => {
        //     // Prevent default tab behavior
        //     e.preventDefault();
        //     // Open the drawer
        //     navigation.openDrawer();
        //   },
        // })}
      />
    </Tab.Navigator>
  );
}

const renderProjectHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
      <MaterialIcons
        name="filter-list"
        size={32}
        color={"black"}
        style={{ marginRight: 32 }}
        onPress={() => {
          // console.log('routes filter',route)
          if (route.name == "Projects") {
            navigation.navigate("ProjectFilter");
          } else if (route.name == "Clients") {
            navigation.navigate("ClientFilter");
          }else if(route.name == "Approvals"){
            navigation.navigate("");
          }
          
          // navigation.navigate("ProjectFilter");
        }}
      />
    </View>
  );
};

const renderJobHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
      <MaterialIcons
        name="filter-list"
        size={32}
        color={"black"}
        style={{ marginRight: 32 }}
        onPress={() => {
          // console.log('routes filter',route)
          if (route.name == "Jobs") {
            navigation.navigate("JobFilter");
          } else if (route.name == "Clients") {
            navigation.navigate("ClientFilter");
          }else if(route.name == "Approvals"){
            navigation.navigate("");
          }
          
          // navigation.navigate("ProjectFilter");
        }}
      />
    </View>
  );
};
const renderSettingsHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
      <AntDesign
        name="poweroff"
        size={32}
        color={"red"}
        style={{ marginRight: 32 }}
        onPress={() => {
          // console.log('routes filter',route)
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Projects"
      // drawerContent={(props) => <ZohoMenu {...props} />}
    >
      <Drawer.Screen
        name="Projects"
        component={Projects}
        options={{
          headerShown: true,
          headerRight: () => renderProjectHeader(),
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <Drawer.Screen name="Clients" component={Clients} />
    </Drawer.Navigator>
  );
};

const renderHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [token, setToken] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      // console.log("User access token", userIn);
      setToken(JSON.parse(token));
    });
  }, []);
  //console.log('header token', token);
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
      {token.role == "PROJECTHEAD" || token.role == "PROJECTMANAGER" ? (
        <MaterialIcons
          name="edit"
          size={32}
          color={"black"}
          style={{ marginRight: 32 }}
          onPress={async () => {
            if (route.name == "ProjectDetails") {
              navigation.navigate("AddProject");
            } else if (route.name == "ClientDetails") {
              navigation.navigate("AddClient");
            }
          }}
        />
      ) : (
        ""
      )}
      {token.role == "PROJECTHEAD" || token.role == "PROJECTMANAGER" ? (
        <FontAwesome5
          name="trash"
          size={30}
          color={"black"}
          onPress={async () => {
            if (route.name == "ProjectDetails") {
              Alert.alert("Are you sure you want to delete?", "", [
                {
                  text: "Cancel",
                  onPress: async () => {
                    navigation.navigate("ProjectDetails");
                  },
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: async () => {
                    let projectId = await AsyncStorage.getItem("projectId");
                    console.log(projectId, "id is");
                    projectId = parseInt(projectId);
                    console.log("projectId", projectId);
                    let delProject = await deleteProject(projectId);
                    console.log("project delete", delProject);
                    Alert.alert("Success", "Project deleted successfully!");
                    navigation.goBack();
                  },
                },
              ]);
              //delete project
            } else if (route.name == "ClientDetails") {
              //delete client
              Alert.alert("Are you sure you want to delete?", "", [
                {
                  text: "Cancel",
                  onPress: async () => {
                    navigation.navigate("ClientDetails");
                  },
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: async () => {
                    let clientId = await AsyncStorage.getItem("clientId");
                    console.log(clientId, "id is");
                    // clientId = parseInt(clientId);
                    console.log("clientId", clientId);
                    let delClient = await deleteClient(clientId);
                    console.log("client delete", delClient);
                    Alert.alert("Success", "Client deleted successfully!");
                    navigation.goBack();
                  },
                },
              ]);
            }
          }}
        />
      ) : (
        ""
      )}
    </View>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer ignoreSerializableWarnings={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Registration"
          options={{ title: "Add User", headerShown: true }}
          component={Registration}
        />
        <Stack.Screen name="Service" component={TabRoutes} />
        <Stack.Screen
          name="AddProject"
          options={{ title: "Add Project", headerShown: true }}
          component={AddProject}
        />
         <Stack.Screen
          name="AddJob"
          options={{ title: "Add Project", headerShown: true }}
          component={AddJob}
        />
        <Stack.Screen
          name="ProjectDetails"
          options={{
            title: "Details",
            headerShown: true,
            headerRight: () => renderHeader(),
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
          component={Details}
        />
        <Stack.Screen
          name="ProjectFilter"
          options={{ title: "Filter by", headerShown: true }}
          component={ProjectFilter}
        />
        <Stack.Screen
          name="ClientFilter"
          options={{ title: "Filter by", headerShown: true }}
          component={ClientFilter}
        />
         <Stack.Screen
          name="JobFilter"
          options={{ title: "Filter by", headerShown: true }}
          component={filterJob}
        />
        <Stack.Screen
          name="AddClient"
          options={{ title: "Add Client", headerShown: true }}
          component={AddClient}
        />
        <Stack.Screen
          name="ClientDetails"
          options={{
            title: "Details",
            headerShown: true,
            headerRight: () => renderHeader(),
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
          component={ClientDetails}
        />
        <Stack.Screen
          name="Projects"
          component={Projects}
          options={{
            headerShown: true,
            headerRight: () => renderProjectHeader(),
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
         <Stack.Screen
          name="Jobs"
          component={Job}
          options={{
            headerShown: true,
            headerRight: () => renderJobHeader(),
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="Clients"
          options={{
            headerShown: true,
            headerRight: () => renderProjectHeader(),
          }}
          component={Clients}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerShown: true,
            headerRight: () => renderSettingsHeader(),
          }}
          component={Settings}
        />
        <Stack.Screen
          name="Attendance"
          options={{
            headerShown: true,
          }}
          component={Attendance}
        />
        {/* <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ gestureEnabled: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
