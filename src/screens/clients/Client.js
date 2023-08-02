import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Button from "../../components/Button";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { clientRecords } from "./dummyClients";
import { getAllClient } from "../../api/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Badge from "../../components/badge";

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
const Client = (props) => {
  const {
    setClientDetails,
    clientDetails,
    navigation,
    refresh,
    setClientFilter,
    clientFilter,
  } = props;
  //console.log("client item", clientRecords);
  const [clientInfo, setClientInfo] = useState([]);
  useEffect(() => {
    console.log("getData useffect");
    getData();
    setClientFilter([]);
  }, [refresh]);

  const getData = async () => {
    console.log("client filter client screen", clientFilter);

    if (clientFilter != "") {
      console.log("inside client filter", clientFilter.clientName);
      const clientDt = await getAllClient(clientFilter.clientName);
      console.log(clientDt,"clientDt")
      setClientInfo(clientDt.data);
      if (clientDt.data.errors != "") {
        alert(projectInfo.data.errors);
        setClientInfo(clientDt.data);
      }
    } else {
      const clientDt = await getAllClient();
      console.log(clientDt,"clientDt1")
      setClientInfo(clientDt.data);
    }
  };
  const clientList = ({ item, index }) => {
    console.log("client item1", item);
    return (
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <Text
          style={styles.list}
          numberOfLines={3}
          onPress={() => {
            clientRecords.map(async (record) => {
              console.log(item.firstName, record.firstName);

              console.log(
                "cli name match",
                item.clientId,
                String(item.clientId)
              );
              await AsyncStorage.setItem(
                "clientId",
                String(item.clientId)
                // item.clientId
              );
              setClientDetails(item);
              navigation.navigate("ClientDetails");
            });
          }}
        >
          {item.clientName}
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
      {/* <Text style={[styles.title, {alignSelf:'center'}]}> No Clients Found</Text> */}

      <FlatList
        data={clientInfo}
        renderItem={clientList}
        //style={{marginTop: 20}}
        // style={{ marginBottom: 100}}
        keyExtractor={(item, index) => `key${index}`}
      />

      {/* <Button
        title="Add Project"
        color="#007bff"
        onPress={() => props.navigation.navigate("AddProject")}
      /> */}
      {/* <Button
        title=" Details"
        color="#007bff"
        customClick={() => props.navigation.navigate("ClientDetails")}
      /> */}
      <MaterialCommunityIcons
        name="plus-circle"
        size={80}
        color={"#00dbba"} //23bfa5
        style={{
          alignSelf: "flex-end",
          bottom: 20,
          position: "absolute",
          shadowOffset: {
            width: 3,
            height: 2,
          },
          shadowRadius: 2,
          shadowOpacity: 0.35,
        }}
        onPress={() => {
          setClientDetails(null);
          props.navigation.navigate("AddClient");
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
    clientFilter: state.Reducers.clientFilter,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setClientFilter: (params) => dispatch(actions.setClientFilter(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Client);
