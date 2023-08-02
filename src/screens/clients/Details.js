import { View, Text, ScrollView } from "react-native";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import styles from "./styles";

const ClientDetails = ( props ) => {
  const { clientDetails } = props;
 
    let dtls= clientDetails;
    console.log('details screen333',clientDetails)
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
       scrollEnabled={true}
       nestedScrollEnabled={true}
      >
      <Text style={[styles.title, { fontSize: 30, marginBottom:35, textDecorationLine:'underline', textDecorationStyle:'double' }]}>
        CLIENT CONFIGURATION DETAILS
      </Text>
      <Text style={[styles.title, { marginTop: 20, fontWeight:'700', textDecorationStyle:'solid', textDecorationLine:'underline' }]}>CLIENT</Text>
      <Text style={styles.title}>CLIENT NAME</Text>
      <Text style={styles.details}>{clientDetails.clientName}</Text>

      <Text style={styles.title}>CURRENCY</Text>
      <Text style={styles.details}>{clientDetails.currencyId}</Text>

      <Text style={styles.title}>BILLING METHOD</Text>
      <Text style={styles.details}>{clientDetails.billingMethodId}</Text>

      <Text style={[styles.title, { marginTop: 20, fontWeight:'700', textDecorationLine:'underline'}]}>CONTACTS</Text>
      <Text style={styles.title}>EMAIL ID</Text>
      <Text style={styles.details}>{clientDetails.emailId}</Text>

      <Text style={styles.title}>FIRST NAME</Text>
      <Text style={styles.details}>{clientDetails.firstName}</Text>

      <Text style={styles.title}>LAST NAME</Text>
      <Text style={styles.details}>{clientDetails.lastName}</Text>

      <Text style={styles.title}>FAX</Text>
      <Text style={styles.details}>{clientDetails.fax}</Text>

      <Text style={styles.title}>PHONE</Text>
      <Text style={styles.details}>{clientDetails.phone}</Text>

      <Text style={styles.title}>MOBILE</Text>
      <Text style={styles.details}>{clientDetails.mobile}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails);
