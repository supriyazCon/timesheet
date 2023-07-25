import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./styles";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";


const Details = (props) => {
  const { jobDetails, setJobDetails } = props;
  console.log("jobDetails", jobDetails);
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
          JOB CONFIGURATION DETAILS
        </Text>
        <Text style={styles.title}>JOB NAME</Text>
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

        <Text style={styles.title}>JOB DESCRIPTION</Text>
        <Text style={styles.details}>{projectDetails.description}</Text>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    jobDetails: state.Reducers.jobDetails,
    clientDetails: state.Reducers.clientDetails,
    // projectDetails: state.Reducers.projectDetails
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setJobDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);