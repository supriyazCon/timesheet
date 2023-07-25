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
import { jobsRecords } from "./dummyJobs";
import {
  getAllClient,
  getByRoleDdl,
  postAddJob,
  updateJob,
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

const AddJob = (props) => {
  const { jobDetails, setRefresh, refresh } = props;
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
    jobName: "",
    clientName: "",
    jobCost: "",
    jobHead: "",
    jobManager: "",
    users:""
  });

  const navigation = useNavigation();

  const editedExpenseId = jobDetails;
  const isEditing = !!editedExpenseId;
  console.log("editing", editedExpenseId, isEditing, jobDetails);

  const [jobName, setJobName] = useState(
    isEditing ? jobDetails.jobName : ""
  );
  const [clientName, setClientName] = useState(
    isEditing ? jobDetails.clientShortName : ""
  );
  const [jobCost, setJobCost] = useState(
    isEditing ? String(jobDetails.jobCost) : ""
  );
  const [jobHead, setJobHead] = useState(
    isEditing ? jobDetails.jobHeadName : ""
  );
  const [jobManager, setJobManager] = useState(
    isEditing ? jobDetails.jobManagerName : ""
  );
  const [jobDesc, setJobDesc] = useState(
    isEditing ? jobDetails.description : ""
  );
  const [selected, setSelected] = useState(
    isEditing ? jobDetails.jobUsers : []
  );
  const [selectedUserId, setSelectedUserId] = useState([]); //isEditing ? jobDetails.jobUsers :
  const [users, setUsers] = useState([]);
  const [mapUsers, setMapUsers] = useState(isEditing ? true : false);
  const [jobHeads, setJobHeads] = useState([]);
  const [jobManagers, setJobManagers] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit job" : "Add job",
    });
  }, [navigation, isEditing]);
  useEffect(() => {
    console.log("getdata called Job");
    getData();
  }, []);
  const getData = async () => {
    console.log("inside getData job");
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
    const getHeads = await getByRoleDdl("jobhead");
    // console.log("heads are", getHeads.data.data);
    const optionsHead = getHeads.data.data.map((item) => ({
      label: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      value: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      id: `${item.id}`,
    }));
    setjobHeads(optionsHead);
    const getManagers = await getByRoleDdl("jobmanager");
    const optionsManager = getManagers.data.data.map((item) => ({
      label: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      value: `${item.firstName} ${item.lastName} ${item.empId} - ${item.ratePerHour}`,
      id: `${item.id}`,
    }));
    // console.log("managers are", optionsManager )
    setJobManagers(optionsManager);
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
  // const jobHeads = [
  //   {
  //     label: "Ameya Gadre E151102 - 0 RPH",
  //     value: "Ameya Gadre E151102 - 0 RPH",
  //   },
  //   { label: "Head 2", value: "head2" },
  //   // Add more client options
  // ];
  // const jobManagers = [
  //   {
  //     label: "Supriya Lokhande E211202 - 0 RPH",
  //     value: "Supriya Lokhande E211202 - 0 RPH",
  //   },
  //   { label: "job Managers 2", value: "jobManagers2" },
  //   // Add more client options
  // ];
  const handleCancel = () => {
    // Reset form values
    setJobName("");
    setClientName("");
    setJobCost("");
    setJobHead("");
    setJobManager("");
    setSelected([]);
    setErrors({
      jobName: "",
      jobCost: "",
      clientName: "",
      jobHead: "",
      jobManager: "",
      users:""
    });
    dispatch(actions.setRefresh(!refresh));
    //navigation.goBack();
  };

  const handleSubmit = async () => {
    // Validation

    const validationErrors = {};

    // Validate client name
    if (!jobName.trim()) {
      validationErrors.jobName = "Please enter the job name.";
    }

    // Validate currency
    if (jobCost != "" && !isNumeric(jobCost)) {
      validationErrors.jobCost =
        "Please enter only numeric characters for the job cost.";
    } else if (jobCost == "") {
      validationErrors.jobCost = "Please enter job cost";
    }
    if (!clientName) {
      validationErrors.clientName = "Please select the client name.";
    }
    if (!jobHead) {
      validationErrors.jobHead = "Please select the job head";
    }
    if (!jobManager) {
      validationErrors.jobManager = "Please select the job manager";
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
      jobName,
      clientName,
      jobCost,
      jobHead,
      jobManager,
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
        "job fields",
        typeof jobHead,
        typeof jobManager,
        jobDetails.jobManagerId,
        jobDetails.jobHeadId
      );

      // const jobObj = {
      //   jobName: jobName,
      //   clientId: parseInt(clientName.value),
      //   jobCost: parseInt(jobCost),
      //   jobHeadId: parseInt(jobHead.value),
      //   jobManagerId: parseInt(jobManager.value),
      //   jobUserIds: selectedUserId,
      //   description: jobDesc,
      // };
      // console.log("client name, edit", clientName)
     
      const headType = typeof jobHead;
      const managerType = typeof jobManager;
      clientNames.map(async (obj) => {
        console.log("client name, edit", clientName, obj, clientName == obj);
        if (clientName == obj.label) {
          const jobObj = {
            id: jobDetails.id,
            jobName: jobName,
            jobCost: parseInt(jobCost),
            jobHeadId:
              headType == "object"
                ? parseInt(jobHead.id)
                : parseInt(jobDetails.jobHeadId),
            jobManagerId:
              managerType == "object"
                ? parseInt(jobManager.id)
                : parseInt(jobDetails.jobManagerId),
            clientId: parseInt(obj.id),
            jobUserIds: idArray,
            description: jobDesc,
          };
          console.log('updated job', jobObj);
          const updatePrj = await updatejob(jobObj);
          console.log("prj updt", updatePrj);
          dispatch(actions.setRefresh(!refresh));
          alert(updatePrj.data.message);
          navigation.navigate("jobs");
        }
      });
    } else {
      clientNames.map(async (obj) => {
        // console.log("client name, edit", clientName);
        if (clientName.label == obj.label) {
          const jobObj = {
            jobName: jobName,
            clientId: parseInt(obj.id),
            jobCost: parseInt(jobCost),
            jobHeadId: parseInt(jobHead.id),
            jobManagerId: parseInt(jobManager.id),
            jobUserIds: idArray,
            description: jobDesc,
          };
          console.log("obj prj", jobObj);
          const postjob = await postAddjob(jobObj);
          console.log("post prj", postjob);
          if (postjob.status == 200 || postjob.status == 201) {
            alert(postjob.data.message);
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
          JOB CONFIGURATION DETAILS
        </Text>

        <Text style={styles.title}>
          JOB NAME <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.jobName ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={jobName}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setjobName(text)}
        />
        {errors.jobName && (
          <Text style={styles.error}>{errors.jobName}</Text>
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
        <Text style={styles.title}>JOB COST</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.jobCost ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={jobCost}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setjobCost(text)}
        />
        {errors.jobCost && (
          <Text style={styles.error}>{errors.jobCost}</Text>
        )}

        <Text style={styles.title}>JOB HEAD</Text>
        <DropdownComp
          data={jobHeads}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={jobHead}
          borderColor={errors.jobHead ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            console.log("prj head", text);
            setJobHead(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          styleContainer={0.4}
          // color={colors.primary}
          error={errors.jobHead}
        />
        {/* <Picker
        selectedValue={jobHead}
        onValueChange={(itemValue) => setjobHead(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select Client Name" value="" />
        {jobHeads.map((client) => (
          <Picker.Item
            key={client.value}
            label={client.label}
            value={client.value}
          />
        ))}
      </Picker> */}
        <Text style={styles.title}>JOB MANAGER</Text>
        <DropdownComp
          data={jobManagers}
          // maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={jobManager}
          borderColor={errors.jobManager ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            setJobManager(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          styleContainer={0.4}
          // color={colors.primary}
          error={errors.jobManager}
        />
        {/* <View style={{  alignSelf: "flex-start" }}> */}
        <Text style={styles.title}>job USERS</Text>
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
        <Text style={styles.title}>JOB DESCRIPTION</Text>
        <TextInput
          style={[styles.input, { borderColor: "#FFD700" }]}
          placeholder="Enter Value"
          value={jobDesc}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setJobDesc(text)}
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
    jobDetails: state.Reducers.jobDetails,
    clientDetails: state.Reducers.clientDetails,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setJobDetails: (params) => dispatch(actions.setJobDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setRefresh: (params) => dispatch(actions.setRefresh(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
