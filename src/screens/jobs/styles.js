import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#f7f7f7",
    height:'100%'
  },
  title: { fontWeight: "600", fontSize: 26, marginBottom: 16 },
  list: { fontSize: 36, marginBottom: 56, fontWeight: "500" },
  details: {fontSize: 26, marginBottom: 36},
  input: {
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    height: 40,
    color: "black",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    height: 40,
    width: "100%",
  },
  selectedUsersContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  selectedUser: {
    fontSize:18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#faea93',
    color: '#000',
    borderRadius: 4,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    //justifyContent: 'space-between',
    marginTop: 75,
   // bottom: 0,
    // position:'absolute'
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  modalTextinput: {
    // alignSelf: 'center',
    // width: 400,
    // marginVertical: '3%',
  },
  buttonStyle: {
    alignSelf: 'center',
    height: 50,
    width: 200,
    marginTop: '4%',
    marginBottom: '5%',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ffd700',
    shadowOpacity: 0.1
  },
  viewModal: {
    backgroundColor: 'white',
    borderRadius: 40,
    height: 400,
    width: 600,
  },
  viewMoadlCancel: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    marginTop: -18,
    marginRight: -6,
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
  },
  dropdowns: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#faea93',
    shadowColor: '#000',
    marginTop: 8,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    height: 50
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default styles;
