import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#f7f7f7",
    marginRight: 15,
  },
  list: { fontSize: 36, marginBottom: 56, fontWeight: "500",width:"60%" },
  title: { fontWeight: "500", fontSize: 26, marginBottom: 12 },
  details: { fontSize: 26, marginBottom: 36 },
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
    marginBottom: 12,
     height: 40,
     width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    //justifyContent: 'space-between',
    marginTop: 75,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default styles;
