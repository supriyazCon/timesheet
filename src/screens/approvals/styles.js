import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
   // alignSelf: "center",
    //justifyContent: "center",
  },
  title: { fontWeight: "600", fontSize: 20, marginBottom: 16 },
  list: { fontSize: 26, marginBottom: 36, fontWeight: "500",},
  details: { fontSize: 20, marginBottom: 36 },
  renderStackButtonStyle: {
    //flex: 1,
    flexDirection: "row",
    top: 10,
    left:10,    
    //position:'absolute',
   // marginVertical: 20,
    //marginHorizontal: 8,
    height:'5%',
    justifyContent:'center',
    width:"100%",
    borderWidth: 0
    // shadowOffset: {width: 6, height: 6},
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    //  shadowColor: colors.shadowPrimary,
  },
  activeButtonStyle: {
    borderBottomColor: "#00dbba",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 3,
  },
  inactiveButtonStyle: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  activeTextStyle: {
    paddingVertical: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: "600",
  },
  inactiveTextStyle: {
    paddingVertical: 10,
    fontSize: 20,
    color: "black",
    fontWeight: "600",
    opacity: 0.5,
  },
  innerContainer:{
      flex:1, 
      alignSelf:'center',
      justifyContent:'center',
      marginTop:60
  }
});
export default styles;
