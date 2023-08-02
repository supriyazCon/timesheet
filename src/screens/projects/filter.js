import { Button, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { getProjectStatusesDdl } from "../../api/apis";
import DropdownComp from "../../components/dropdown/Dropdown";

const Filter = (props) => {
  const { navigation, setProjectFilter, refresh } = props;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [projectStatuses, setProjectStatuses] = useState([]);
  const [projectStatusId, setProjectStatusId] = useState([]);
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    // getData();
  }, []);
  // const getData = async () => {
  //   const projectStatus = await getProjectStatusesDdl();
  //   // console.log("prj status", projectStatus.data.data);
  //   setProjectStatuses(projectStatus.data.data);
  // };
  const handleFilter = () => {
    console.log("projectStatusid", projectStatusId.id);
    const filterObj = {
      projectName: projectName,
      projectStatusId: projectStatusId.id,
    };
    setProjectFilter(filterObj);
    dispatch(actions.setRefresh(!refresh));
    navigation.goBack();
  };
  const handleReset = () => {
    setProjectName("");
    setProjectStatusId([
      { id: 0, name: "", code: "", displaySequence: 0 },
    ]);
    dispatch(actions.setRefresh(!refresh));
    setProjectFilter([]);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginTop: 20 }]}>Project Name</Text>
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        placeholder="Enter Value"
        value={projectName}
        onChangeText={(text) => {
          setProjectName(text);
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => setSelected(!selected)}
      >
        <Text style={styles.title}>Project Status</Text>
        <MaterialIcons
          name={selected ? "keyboard-arrow-down" : "keyboard-arrow-right"}
          size={40}
          style={{
            alignSelf: "flex-end",
            marginBottom: 16,
            right: 5,
            position: "absolute",
          }}
          onPress={() => setSelected(!selected)}
        />
      </TouchableOpacity>
      {selected ? (
        <DropdownComp
          data={projectStatuses}
          // maxHeight={150}
          labelField="name"
          valueField="code"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={projectStatusId.code}
          borderColor={"#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            setProjectStatusId(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={{
            borderWidth: 1,
            borderColor: "#FFD700",
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 16,
            height: 50,
            width: "100%",
          }}
          // styleContainer={0.4}
          // color={colors.primary}
        />
      ) : (
        ""
      )}
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
            height: "30%",
            justifyContent: "center",
            marginRight: 10,
            borderRadius: 15
            // bottom: 150,
            // position: "absolute",
          }}
        >
          <Button title="HANDLE RESET" color="white" onPress={handleReset} />
        </View>
        <View
          style={{
            backgroundColor: "#00dbba",
            width: "50%",
            height: "30%",
            justifyContent: "center",
            borderRadius: 15
            // bottom: 150,
            // position: "absolute",
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
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
