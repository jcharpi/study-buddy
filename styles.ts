import EStyleSheet from "react-native-extended-stylesheet"
import { Dimensions } from "react-native"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen")
const CARD_WIDTH = "6rem"
export default EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		marginTop: "1.75rem",
	},
	task: {
		backgroundColor: "white",
		borderRadius: 9,
		borderWidth: 2,
		height: 90,
		marginVertical: 20,
		padding: 10,
	},
	title: {
		fontWeight: "600",
		marginTop: "2rem",
		marginLeft: "1rem",
		marginBottom: "0.5rem",
	},
	label: {
		fontWeight: "400",
		marginTop: 20,
		marginBottom: 10,
		marginLeft: "1rem",
	},
	taskContainer: {
		alignSelf: "center",
		marginTop: "1rem",
		maxHeight: 200,
		width: 300,
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
		alignSelf: "center",

		flexDirection: "row",
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
		top: SCREEN_HEIGHT / 2 - 100,
		height: 200,
		width: 200,
	},
	greyShapeStyle: {
		position: "absolute",
		left: SCREEN_WIDTH - 100,
		top: SCREEN_WIDTH - 200,
		height: 200,
		width: 200,
	},

	// OVERVIEW PAGE
	overviewScroll: {
		width: "100%",
	},
	overviewScrollContainer: {
		height: 150,
		paddingHorizontal: "1rem",
	},
	overviewCardText: {
		alignItems: "baseline",
		justifyContent: "center",
		width: CARD_WIDTH,
		zIndex: 1,
	},
	overviewCard: {
		backgroundColor: "white",
		borderWidth: 2,
		display: "flex",
		flexDirection: "row",
		height: "100%",
		marginRight: "0.6rem",
		overflow: "hidden",
		width: CARD_WIDTH,
	},
	cardContent: {
		borderRadius: 9,
		flex: 1,
		overflow: "hidden",
		position: "relative",
	},
	progressOverlay: {
		backgroundColor: "#ABBEA5",
		bottom: 0,
		position: "absolute",
		width: CARD_WIDTH,
	},
  totalProgressOverlay: {
		backgroundColor: "#D4DFCA",
		bottom: 0,
		position: "absolute",
		width: SCREEN_WIDTH,
    zIndex: -1
	},
})
