import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./styles";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";


const Details = (props) => {
  const { projectDetails, setProjectDetails } = props;
  console.log("projectDetails", projectDetails);
  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text
          style={[
            styles.title,
            {
              fontSize: 30,
              marginBottom: 35,
              textDecorationLine: "underline",
              textDecorationStyle: "double",
            },
          ]}
        >
          PROJECT CONFIGURATION DETAILS
        </Text>
        <Text style={styles.title}>PROJECT NAME</Text>
        <Text style={styles.details}>{projectDetails.projectName}</Text>

        <Text style={styles.title}>CLIENT NAME</Text>
        <Text style={styles.details}>{projectDetails.clientName}</Text>

        <Text style={styles.title}>PROJECT COST</Text>
        <Text style={styles.details}>{projectDetails.projectCost}</Text>

        <Text style={styles.title}>PROJECT HEAD</Text>
        <Text style={styles.details}>{projectDetails.projectHeadName}</Text>

        <Text style={styles.title}>PROJECT MANAGER</Text>
        <Text style={styles.details}>{projectDetails.projectManagerName}</Text>

        <Text style={styles.title}>PROJECT USERS</Text>
        <Text style={styles.details}>
          {projectDetails.projectUsers.map((obj) => {
            return (
              <Text>
                {obj.name}
                {"\n"}
              </Text>
            );
          })}
        </Text>

        <Text style={styles.title}>PROJECT DESCRIPTION</Text>
        <Text style={styles.details}>{projectDetails.description}</Text>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
