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
import { jobsRecords } from "./dummyJobs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postGetAllProject } from "../../api/apis";

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
console.log(jobsRecords)
const Job = (props) => {
  const {
    navigation,
    jobDetails,
    setJobDetails,
    refresh,
    jobFilter,
    setJobFilter,
  } = props;
  // console.log("prj dtls", jobDetails);
  const isFocused = useIsFocused();
  const [jobsRecords, setJobRecords] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    getData();
    // getRole();
    setJobFilter([]);
  }, [refresh]);
  // const getRole = async () => {

  // };
  const getData = async () => {
    console.log("filters", jobFilter);
    let token = await AsyncStorage.getItem("token");
    token = JSON.parse(token);
    console.log("token project", token);
    setToken(token);
    if (jobFilter != "") {
      const projObj = {
        jobStatusId: jobFilter.jobStatusId,
        jobSearchKey: jobFilter.jobName,
        pageIndex: 0,
        pageSize: 0,
      };
      console.log("Job filter obj", jobObj);
      const jobInfo = await postGetAllProject(jobObj);
      console.log("project filter", jobInfo.data.errors);
      if (jobInfo.data.errors != "") {
        alert(jobInfo.data.errors);
        setProjectRecords(jobInfo.data.data);
      } else {
        setProjectRecords(jobInfo.data.data.jobs);
      }
      console.log("job info after filter", jobInfo);
    } else {
      const jobObj = {
        projectStatusId: 0,
        projectSearchKey: "",
        pageIndex: 0,
        pageSize: 0,
      };

      const jobInfo = await postGetAllProject(jobObj);
      console.log("job info", jobInfo.data.data.jobs);
      setJobRecords(jobInfo.data.data.jobs);
    }
  };
  const jobList = ({ item, index }) => {
    // console.log('project item', item);
    // console.log('prj rcds',jobssRecords)

    return (
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <Text
          style={styles.list}
          onPress={() => {
            jobsRecords.map(async (record) => {
              console.log("match", item.projectName, record.projectName);
              if (item.jobName == record.jobName) {
                console.log("match", item.name, record);
                setJobDetails(record);
                console.log("job dtls", jobDetails);
                await AsyncStorage.setItem("jobId", String(item.id));
                navigation.navigate("jobDetails");
              }
            });
          }}
        >
          {item.jobName}
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
        data={jobsRecords}
        renderItem={jobList}
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
            setJobDetails(null);
            props.navigation.navigate("AddJob");
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
    jobDetails: state.Reducers.jobDetails,
    clientDetails: state.Reducers.clientDetails,
    jobFilter: state.Reducers.jobFilter,
    refresh: state.Reducers.refresh,
    projectDetails: state.Reducers.projectDetails
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setJobDetails: (params) => dispatch(actions.setJobDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setJobFilter: (params) => dispatch(actions.setJobFilter(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Job);
