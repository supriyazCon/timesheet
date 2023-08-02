import { View, TextInput, Button, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Badge from "../../components/badge";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { projectsRecords } from "./dummyProjects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllProjects, postGetAllProject } from "../../api/apis";

export const stockData = [
  {
    name: "Abhyasika",
  },
  {
    name: "Akara Support",
  },
  {
    name: "CloudKitch",
  },
  {
    name: "EXL FNBO",
  },
  {
    name: "Fibar",
  },
  {
    name: "zCon Leaves",
  },
  {
    name: "zCon Project",
  },
];
//console.log(projectsRecords)
const Project = (props) => {
  const {
    navigation,
    projectDetails,
    setProjectDetails,
    refresh,
    projectFilter,
    setProjectFilter,
  } = props;
  // console.log("prj dtls", projectDetails);
  const isFocused = useIsFocused();
  const [projectsRecords, setProjectRecords] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    getData();
    // getRole();
    setProjectFilter([]);
  }, [refresh]);
  // const getRole = async () => {

  // };
  const getData = async () => {
    console.log("filters", projectFilter);
    let token = await AsyncStorage.getItem("token");
    token = JSON.parse(token);
    console.log("token project", token);
    setToken(token);
    if (projectFilter != "") {
      const projObj = {
        projectStatusId: projectFilter.projectStatusId,
        projectSearchKey: projectFilter.projectName,
        pageIndex: 0,
        pageSize: 0,
      };
      console.log("project filter obj", projObj);
      const projectInfo = await getAllProjects(projObj);
      console.log("project filter", projectInfo.data.errors);
      if (projectInfo.data.errors != "") {
        alert(projectInfo.data.errors);
        setProjectRecords(projectInfo.data);
      } else {
        setProjectRecords(projectInfo.data);
      }
      console.log("prj info after filter", projectInfo);
    } else {
      const projObj = {
        projectStatusId: 0,
        projectSearchKey: "",
        pageIndex: 0,
        pageSize: 0,
      };

      const projectInfo = await getAllProjects(projObj);
      console.log("prj info", projectInfo.data.projects);
      setProjectRecords(projectInfo.data);
    }
  };
  const projectList = ({ item, index }) => {
    // console.log('project item', item);
    // console.log('prj rcds',projectsRecords)

    return (
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <Text
          style={styles.list}
          onPress={() => {
            projectsRecords.map(async (record) => {
              console.log("match", item.projectName, record.projectName);
              if (item.projectName == record.projectName) {
                console.log("match", item.name, record);
                setProjectDetails(record);
                console.log("project dtls", projectDetails);
                await AsyncStorage.setItem("projectId", String(item.id));
                navigation.navigate("ProjectDetails");
              }
            });
          }}
        >
          {item.projectName}
        </Text>
        <View
          style={{
            right: 20,
            justifyContent: "flex-end",
            flexDirection: "row",
            position: "absolute",
          }}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={34}
            color={item.projectStatusId == 100 ? "grey" : "#00dbba"}
            style={{ marginRight: 30 }}
          />
          <View style={{ flexDirection: "row" }}>
            <Feather name="briefcase" size={34} color="black" />
            <Badge jobCount={item.jobCount} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={projectsRecords}
        renderItem={projectList}
        //style={{marginTop: 20}}
        // style={{ marginBottom: 100}}
        keyExtractor={(item, index) => `key${index}`}
      />

      {/* <Button
        title=" Details"
        color="#007bff"
        onPress={() => props.navigation.navigate("ProjectDetails")}
      /> */}
      {token.role == "PROJECTHEAD" || token.role == "PROJECTMANAGER" ? (
        <MaterialCommunityIcons
          name="plus-circle"
          size={80}
          color={"#00dbba"} //23bfa5
          style={{
            alignSelf: "flex-end",
            shadowOffset: {
              width: 3,
              height: 2,
            },
            shadowRadius: 2,
            shadowOpacity: 0.35,
          }}
          onPress={() => {
            setProjectDetails(null);
            props.navigation.navigate("AddProject");
          }}
        />
      ) : (
        ""
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
    projectFilter: state.Reducers.projectFilter,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setProjectFilter: (params) => dispatch(actions.setProjectFilter(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Project);
