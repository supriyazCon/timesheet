import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  FlatList,
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import Buttons from "../../components/Button";
import DropdownComp from "../../components/dropdown/Dropdown";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import MultiDropdownComp from "../../components/dropdown/multiSelect";
import { MultiSelect } from "react-native-element-dropdown";
import projectRecords from "./dummyProjects";
import {
  getAllClient,
  getByRoleDdl,
  postAddProject,
  updateProject,
} from "../../api/apis";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const AddProject = (props) => {
  const { projectDetails, setRefresh, refresh } = props;
  let dispatch = useDispatch();

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
      </View>
    );
  };

  const [errors, setErrors] = useState({
    projectName: "",
    clientName: "",
    projectCost: "",
    projectHead: "",
    projectManager: "",
    users:""
  });

  const navigation = useNavigation();

  const editedExpenseId = projectDetails;
  const isEditing = !!editedExpenseId;
  console.log("editing", editedExpenseId, isEditing, projectDetails);

  const [projectName, setProjectName] = useState(
    isEditing ? projectDetails.projectName : ""
  );
  const [clientName, setClientName] = useState(
    isEditing ? projectDetails.clientShortName : ""
  );
  const [projectCost, setProjectCost] = useState(
    isEditing ? String(projectDetails.projectCost) : ""
  );
  const [projectHead, setProjectHead] = useState(
    isEditing ? projectDetails.projectHeadName : ""
  );
  const [projectManager, setProjectManager] = useState(
    isEditing ? projectDetails.projectManagerName : ""
  );
  const [projectDesc, setProjectDesc] = useState(
    isEditing ? projectDetails.description : ""
  );
  const [selected, setSelected] = useState(
    isEditing ? projectDetails.projectUsers : []
  );
  const [selectedUserId, setSelectedUserId] = useState([]); //isEditing ? projectDetails.projectUsers :
  const [users, setUsers] = useState([]);
  const [mapUsers, setMapUsers] = useState(isEditing ? true : false);
  const [projectHeads, setProjectHeads] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Project" : "Add Project",
    });
  }, [navigation, isEditing]);
  useEffect(() => {
    console.log("getdata called project");
    getData();
  }, []);
  const getData = async () => {
    console.log("inside getData projects");
    const getUsers = await getByRoleDdl("devuser");
    // console.log("roles combine", getUsers);
    const options = getUsers.data.data.map((item) => ({
      label: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      value: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      id: `${item.id}`,
      roleId: `${item.roleId}`,
    }));
    console.log("users options", options);
    setUsers(options);
    const getHeads = await getByRoleDdl("projecthead");
    // console.log("heads are", getHeads.data.data);
    const optionsHead = getHeads.data.data.map((item) => ({
      label: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      value: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      id: `${item.id}`,
    }));
    setProjectHeads(optionsHead);
    const getManagers = await getByRoleDdl("projectmanager");
    const optionsManager = getManagers.data.data.map((item) => ({
      label: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      value: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      id: `${item.id}`,
    }));
    // console.log("managers are", optionsManager )
    setProjectManagers(optionsManager);
    const getClient = await getAllClient("");
    const optionsClient = getClient.data.data.map((item) => ({
      label: `${item.shortName}`,
      value: `${item.shortName}`,
      id: `${item.clientcontactdetailsdto[0].clientId}`,
    }));
    setClientNames(optionsClient);
  };
  const handleAddUser = () => {
    setVisible(true);
  };
  const toggleModal = () => {
    setVisible(false);
    setMapUsers(true);
    // usr.push(users);
    // console.log('visible', visible);
  };
  // const clientNames = [
  //   { label: "GlobalDigitalIT", value: "GlobalDigitalIT" },
  //   { label: "Client 2", value: "client2" },
  //   // Add more client options
  // ];
  // const projectHeads = [
  //   {
  //     label: "Ameya Gadre E151102 - 0 RPH",
  //     value: "Ameya Gadre E151102 - 0 RPH",
  //   },
  //   { label: "Head 2", value: "head2" },
  //   // Add more client options
  // ];
  // const projectManagers = [
  //   {
  //     label: "Supriya Lokhande E211202 - 0 RPH",
  //     value: "Supriya Lokhande E211202 - 0 RPH",
  //   },
  //   { label: "Project Managers 2", value: "projectManagers2" },
  //   // Add more client options
  // ];
  const handleCancel = () => {
    // Reset form values
    setProjectName("");
    setClientName("");
    setProjectCost("");
    setProjectHead("");
    setProjectManager("");
    setSelected([]);
    setErrors({
      projectName: "",
      projectCost: "",
      clientName: "",
      projectHead: "",
      projectManager: "",
      users:""
    });
    dispatch(actions.setRefresh(!refresh));
    //navigation.goBack();
  };

  const handleSubmit = async () => {
    // Validation

    const validationErrors = {};

    // Validate client name
    if (!projectName.trim()) {
      validationErrors.projectName = "Please enter the project name.";
    }

    // Validate currency
    if (projectCost != "" && !isNumeric(projectCost)) {
      validationErrors.projectCost =
        "Please enter only numeric characters for the project cost.";
    } else if (projectCost == "") {
      validationErrors.projectCost = "Please enter project cost";
    }
    if (!clientName) {
      validationErrors.clientName = "Please select the client name.";
    }
    if (!projectHead) {
      validationErrors.projectHead = "Please select the project head";
    }
    if (!projectManager) {
      validationErrors.projectManager = "Please select the project manager";
    }
    if(selected.length == 0){
      validationErrors.users = "Please select at least 1 user";
    }
    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    // Process form submission, e.g., send data to server
    console.log("Submitted data:", {
      projectName,
      clientName,
      projectCost,
      projectHead,
      projectManager,
      selectedUserId,
    });
    console.log("user IDs ", selectedUserId, selected);
    const idArray = selected.map(item => {
      if (typeof item === "object") {
        return item.id;
      } else {
        // Handle the case where the item is a string
        const idMatch = item.match(/(\d{2})\b/);
        return idMatch ? parseInt(idMatch[1]) : null;
      }
    });
    console.log("user ID array", idArray);
    if (isEditing) {
      console.log(
        "project fields",
        typeof projectHead,
        typeof projectManager,
        projectDetails.projectManagerId,
        projectDetails.projectHeadId
      );

      // const projectObj = {
      //   projectName: projectName,
      //   clientId: parseInt(clientName.value),
      //   projectCost: parseInt(projectCost),
      //   projectHeadId: parseInt(projectHead.value),
      //   projectManagerId: parseInt(projectManager.value),
      //   projectUserIds: selectedUserId,
      //   description: projectDesc,
      // };
      // console.log("client name, edit", clientName)
     
      const headType = typeof projectHead;
      const managerType = typeof projectManager;
      clientNames.map(async (obj) => {
        console.log("client name, edit", clientName, obj, clientName == obj);
        if (clientName == obj.label) {
          const projectObj = {
            id: projectDetails.id,
            projectName: projectName,
            projectCost: parseInt(projectCost),
            projectHeadId:
              headType == "object"
                ? parseInt(projectHead.id)
                : parseInt(projectDetails.projectHeadId),
            projectManagerId:
              managerType == "object"
                ? parseInt(projectManager.id)
                : parseInt(projectDetails.projectManagerId),
            clientId: parseInt(obj.id),
            projectUserIds: idArray,
            description: projectDesc,
          };
          console.log('updated project', projectObj);
          const updatePrj = await updateProject(projectObj);
          console.log("prj updt", updatePrj);
          dispatch(actions.setRefresh(!refresh));
          alert(updatePrj.data.message);
          navigation.navigate("Projects");
        }
      });
    } else {
      clientNames.map(async (obj) => {
        // console.log("client name, edit", clientName);
        if (clientName.label == obj.label) {
          const projectObj = {
            projectName: projectName,
            clientId: parseInt(obj.id),
            projectCost: parseInt(projectCost),
            projectHeadId: parseInt(projectHead.id),
            projectManagerId: parseInt(projectManager.id),
            projectUserIds: idArray,
            description: projectDesc,
          };
          console.log("obj prj", projectObj);
          const postProject = await postAddProject(projectObj);
          console.log("post prj", postProject);
          if (postProject.status == 200 || postProject.status == 201) {
            alert(postProject.data.message);
            // Reset form values
            handleCancel();
            dispatch(actions.setRefresh(!refresh));
            navigation.goBack();
          } else {
            alert("Something Went Wrong");
          }
        }
      });
    }
  };

  const isAlpha = (value) => {
    const alphaRegex = /^[A-Za-z]+$/;
    return alphaRegex.test(value);
  };
  const isNumeric = (value) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(value);
  };

  const renderUsers = (item) => {
    console.log("item...", item.item);
    const itemType = typeof item.item;
    return (
      <TouchableOpacity
        style={{
          justifyContent: "space-between",
          marginBottom: 25,
          marginLeft: -10,
        }}
        onPress={() => {
          let arr = selected.filter((val) => val !== item.item);
          setSelected(arr);
        }}
      >
        <View style={styles.selectedStyle}>
          {isEditing ? (
            <Text style={styles.textSelectedStyle}>
              {itemType == "object" ? item.item.name : item.item}
            </Text>
          ) : (
            <Text style={styles.textSelectedStyle}>{item.item}</Text>
          )}
          <AntDesign color="black" name="delete" size={17} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 32, marginBottom: 25 }]}>
          PROJECT CONFIGURATION DETAILS
        </Text>

        <Text style={styles.title}>
          PROJECT NAME <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.projectName ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={projectName}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setProjectName(text)}
        />
        {errors.projectName && (
          <Text style={styles.error}>{errors.projectName}</Text>
        )}

        <Text style={styles.title}>CLIENT NAME</Text>

        <DropdownComp
          data={clientNames}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={clientName}
          borderColor={errors.clientName ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            setClientName(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          styleContainer={0.4}
          // color={colors.primary}
        />
        {errors.clientName && (
          <Text style={styles.error}>{errors.clientName}</Text>
        )}
        <Text style={styles.title}>PROJECT COST</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.projectCost ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={projectCost}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setProjectCost(text)}
        />
        {errors.projectCost && (
          <Text style={styles.error}>{errors.projectCost}</Text>
        )}

        <Text style={styles.title}>PROJECT HEAD</Text>
        <DropdownComp
          data={projectHeads}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={projectHead}
          borderColor={errors.projectHead ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            console.log("prj head", text);
            setProjectHead(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          styleContainer={0.4}
          // color={colors.primary}
          error={errors.projectHead}
        />
        {/* <Picker
        selectedValue={projectHead}
        onValueChange={(itemValue) => setProjectHead(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select Client Name" value="" />
        {projectHeads.map((client) => (
          <Picker.Item
            key={client.value}
            label={client.label}
            value={client.value}
          />
        ))}
      </Picker> */}
        <Text style={styles.title}>PROJECT MANAGER</Text>
        <DropdownComp
          data={projectManagers}
          // maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={projectManager}
          borderColor={errors.projectManager ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            setProjectManager(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          styleContainer={0.4}
          // color={colors.primary}
          error={errors.projectManager}
        />
        {/* <View style={{  alignSelf: "flex-start" }}> */}
        <Text style={styles.title}>PROJECT USERS</Text>
        <Buttons
          // mode={'contained'}
          customClick={() => handleAddUser()}
          title={"+ Assign Users"}
          styles={[
            {
              // paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 15,
              width: "35%",
              height: "5%",
              alignSelf: "flex-start",
              fontSize: 7,
              borderWidth: 1,
              backgroundColor: "#FFD700",
              borderColor: "#FFD700",
              color: "black",
              justifyContent: "center",
              marginBottom: 14,
            },
          ]}
        />
        <Text style={styles.error}>{errors.users}</Text>
        {console.log("sele...", selected)}
        {mapUsers ? (
          <View>
            <FlatList
              data={selected}
              //horizontal={true}
              renderItem={renderUsers}
              // keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        ) : (
          ""
        )}
        <Text style={styles.title}>PROJECT DESCRIPTION</Text>
        <TextInput
          style={[styles.input, { borderColor: "#FFD700" }]}
          placeholder="Enter Value"
          value={projectDesc}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setProjectDesc(text)}
        />

        {/* <Button
          title="+ Assign Users"
          color="black"
          onPress={() => handleAddUser("User X")}
        /> */}
        {/* </View> */}
        {/* Display the selected users */}

        <View style={styles.buttonContainer}>
          <View
            style={{
              backgroundColor: "#f27074",
              width: "50%",
              height: "30%",
              justifyContent: "center",
              borderRadius: 15,
              marginRight: 10,
            }}
          >
            <Button title="CANCEL" color="white" onPress={handleCancel} />
          </View>
          <View
            style={{
              backgroundColor: "#00dbba",
              width: "50%",
              height: "30%",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Button
              title={isEditing ? "UPDATE" : "SUBMIT"}
              color="white"
              onPress={handleSubmit}
            />
          </View>
        </View>
        <View>
          <Modal isVisible={visible} style={{ alignSelf: "center" }}>
            <View style={styles.viewModal}>
              <View style={styles.viewMoadlCancel}>
                <MaterialCommunityIcons
                  name="close"
                  color={"white"}
                  size={42}
                  onPress={toggleModal}
                  style={{
                    marginTop: -3,
                    marginLeft: -2,
                    backgroundColor: "transparent",
                  }}
                />
              </View>
              {/* <Button title="Hide modal" onPress={toggleModal} style={{alignSelf:"flex-end"}} icon="delete" />  */}
              <Text style={styles.title}></Text>
              <MultiSelect
                style={[styles.dropdowns, { margin: 4 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={users}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={async (item) => {
                  console.log("selected user", item);
                  const itemType = typeof item;
                  const selectedIds = item.map((selectedItem) => {
                    const user = users.find(
                      (userItem) => userItem.label === selectedItem
                    );
                    return user ? user.id : null;
                  });
                  setSelectedUserId(selectedIds.filter((id) => id !== null));
                  console.log("selected ids are", selectedIds);
                  setSelected(item);
                }}
                //renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>{item.label}</Text>
                      <AntDesign color="black" name="delete" size={17} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              <Buttons
                //mode={'contained'}
                styles={[styles.buttonStyle, { backgroundColor: "#ffd700" }]}
                // color={colors.primary}
                customClick={toggleModal}
                title="Map Users"
                // onContentSizeChange={(e) =>
                //   setHeight(e.nativeEvent.contentSize.height)
                // }
              />
              {/* <Text style={styles.textStatus}>{I18n.t('ok')}</Text> */}
              {/* </Button> */}
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setRefresh: (params) => dispatch(actions.setRefresh(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
