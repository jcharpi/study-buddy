import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  task: {
    borderWidth: 2,
  },
  enterTaskTitle: {
    marginTop: '3rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  enterTaskInput: {
    fontSize: 20,
  },
  enterTaskLayout: {
    marginHorizontal: "10%"
  },
  enterTaskOutline: {
    borderRadius: 9,
    borderWidth: 2,
  }

})
