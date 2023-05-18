import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  task: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "center",
    maxHeight: 200
  },
  enterTaskTitle: {
    marginTop: '3rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  enterTaskInput: {
    fontSize: 20,
    marginHorizontal: "10%",
  },
  enterTaskLimitInput: {
    marginTop: "-12.5%", 
  },
  enterTaskLimitInputOutline: {
    borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
  },
  enterTaskLimitContainer: {
    flexDirection: "row",
    alignItems: "space-around",
    alignContent:"center",
    marginTop: "-11%"
  },
  enterTaskLayout: {
    height: 200, 
    width: "80%"
  },
  enterTaskOutline: {
    borderRadius: 9,
    borderWidth: 2,
  },
})
