import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
    marginTop: "1.75rem",
	},
	taskContainer: {
    marginTop: "1rem",
		maxHeight: 200,
    width: 300,
    alignSelf: "center"
	},
	task: {
		borderRadius: 9,
		borderWidth: 2,
		marginVertical: 20,
		padding: 10,
		backgroundColor: "white",
		height: 90,
	},
	enterTaskTitle: {
		marginTop: "3rem",
		marginLeft: "1rem",
		marginBottom: "0.5rem",
		fontWeight: "600",
	},
	enterTaskInput: {
		fontSize: 20,
		width: 300,
	},
	enterTaskOutline: {
		borderRadius: 9,
		borderWidth: 2,
	},
})
