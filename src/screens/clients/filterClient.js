import { Button, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { getProjectStatusesDdl } from "../../api/apis";
import DropdownComp from "../../components/dropdown/Dropdown";

const FilterClient = (props) => {
  const { navigation, setProjectFilter, setClientFilter, refresh } = props;
  const dispatch = useDispatch();
  const [clientName, setClientName] = useState("");
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   const projectStatus = await getProjectStatusesDdl();
  //   // console.log("prj status", projectStatus.data.data);
  //   setProjectStatuses(projectStatus.data.data);
  // };
  const handleFilter = () => {
    const filterObj = {
      clientName: clientName,
    };
    setClientFilter(filterObj);
    dispatch(actions.setRefresh(!refresh));
    navigation.goBack();
  };
  const handleReset = () => {
    setClientName("");
    setClientFilter([]);
    dispatch(actions.setRefresh(!refresh));
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginTop: 20 }]}>Client Name</Text>
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        placeholder="Enter Value"
        value={clientName}
        onChangeText={(text) => {
          setClientName(text);
        }}
      />
      <View
        style={[
          styles.buttonContainer,
          {
            bottom: 0,
            position: "absolute",
            marginLeft: 15,
            height: 150,
            marginBottom: -30,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: "#f27074",
            width: "50%",
            height: "27%",
            justifyContent: "center",
            marginRight: 10,
            borderRadius: 15,
          }}
        >
          <Button title="HANDLE RESET" color="white" onPress={handleReset} />
        </View>
        <View
          style={{
            backgroundColor: "#00dbba",
            width: "50%",
            height: "27%",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <Button title="APPLY FILTER" color="white" onPress={handleFilter} />
        </View>
      </View>
      {/* <View
        style={{
          backgroundColor: "#53dfa0",
          width: "100%",
          height: "5%",
          justifyContent: "center",
          borderRadius: 15,
          bottom: 50,
          position: "absolute",
          marginLeft: 15,
        }}
      >
        <Button title={"APPLY FILTER"} color="white" onPress={handleFilter} />
      </View> */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
    projectFilter: state.Reducers.projectFilter,
    clientFilter: state.Reducers.clientFilter,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setProjectFilter: (params) => dispatch(actions.setProjectFilter(params)),
    setClientFilter: (params) => dispatch(actions.setClientFilter(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterClient);
