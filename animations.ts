import { Animated, Dimensions } from "react-native"
const SHAPE_CENTER = 100

// BROWN ANIMATIONS
export const brownAnimatePosX = (posX: Animated.Value) => {
	return Animated.loop(
		Animated.sequence([
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
	)
}

export const brownAnimatePosY = (posY: Animated.Value) => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(posY, {
				toValue: Dimensions.get("screen").height / 2 - SHAPE_CENTER,
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(posY, {
				toValue: Dimensions.get("screen").height - SHAPE_CENTER,
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(posY, {
				toValue: Dimensions.get("screen").height / 2 - SHAPE_CENTER,
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(posY, {
				toValue: 0,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}

export const brownAnimateRot = (rot: Animated.Value, initAngle: number) => {
	return Animated.loop(
		Animated.sequence([
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
				toValue: initAngle,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}

// GREEN ANIMATIONS
export const greenAnimatePosX = (posX: Animated.Value) => {
	return Animated.loop(
		Animated.sequence([
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
	)
}

export const greenAnimatePosY = (posY: Animated.Value) => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(posY, {
				toValue: -Dimensions.get("screen").height / 2,
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(posY, {
				toValue: 0,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}

export const greenAnimateRot = (rot: Animated.Value, initAngle: number) => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(rot, {
				toValue: Math.random(),
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(rot, {
				toValue: initAngle,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}

// GREY ANIMATIONS
export const greyAnimatePosX = (posX: Animated.Value) => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(posX, {
				toValue: -Dimensions.get("screen").width,
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(posX, {
				toValue: 0,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}

export const greyAnimatePosY = (posY: Animated.Value) => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(posY, {
				toValue: -Dimensions.get('screen').height / 4 - 2 * SHAPE_CENTER - 10,
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(posY, {
				toValue: 0,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}

export const greyAnimateRot = (rot: Animated.Value, initAngle: number) => {
	return Animated.loop(
		Animated.sequence([
			Animated.timing(rot, {
				toValue: Math.random(),
				duration: 5000,
				useNativeDriver: false,
			}),
			Animated.timing(rot, {
				toValue: initAngle,
				duration: 5000,
				useNativeDriver: false,
			}),
		])
	)
}
