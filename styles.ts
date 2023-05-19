import EStyleSheet from "react-native-extended-stylesheet"
import { Dimensions } from "react-native"

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
		alignSelf: "center",
	},
	task: {
		borderRadius: 9,
		borderWidth: 2,
		marginVertical: 20,
		padding: 10,
		backgroundColor: "white",
		height: 90,
	},
	title: {
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
	buttonContainer: {
		flexDirection: "row",
		alignSelf: "center",
		gap: 5,
	},
	brownShapeStyle: {
		position: "absolute",
		left: -100,
		top: -100,
		height: 200,
		width: 200,
	},
	greenShapeStyle: {
		position: "absolute",
		left: -100,
		top: Dimensions.get("screen").height / 2 - 100,
		height: 200,
		width: 200,
	},
	greyShapeStyle: {
		position: "absolute",
		left: Dimensions.get("screen").width - 100,
		top: Dimensions.get("screen").height - 200,
		height: 200,
		width: 200,
	},
})
