import { Animated, Dimensions } from "react-native"
const SHAPE_CENTER = 100

export const brownAnimatePosX = (posX: Animated.Value) => {
	return Animated.sequence([
		Animated.timing(posX, {
			toValue: Dimensions.get("screen").width,
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(posX, {
			toValue: 0,
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(posX, {
			toValue: Dimensions.get("screen").width,
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(posX, {
			toValue: 0,
			duration: 5000,
			useNativeDriver: false,
		}),
	])
}

export const brownAnimatePosY = (posY: Animated.Value) => {
	return Animated.sequence([
		Animated.timing(posY, {
			toValue: Dimensions.get("screen").height / 2 - SHAPE_CENTER * 2,
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(posY, {
			toValue: Dimensions.get("screen").height - SHAPE_CENTER * 2,
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(posY, {
			toValue: Dimensions.get("screen").height / 2 - SHAPE_CENTER * 2,
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(posY, {
			toValue: 0,
			duration: 5000,
			useNativeDriver: false,
		}),
	])
}

export const brownAnimateRot = (rot: Animated.Value) => {
	return Animated.sequence([
		Animated.timing(rot, {
			toValue: Math.random(),
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(rot, {
			toValue: Math.random(),
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(rot, {
			toValue: Math.random(),
			duration: 5000,
			useNativeDriver: false,
		}),
		Animated.timing(rot, {
			toValue: 0.8,
			duration: 5000,
			useNativeDriver: false,
		}),
	])
}
