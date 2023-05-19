import { Animated, Dimensions } from "react-native"

const SHAPE_CENTER = 100
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen")

const animationConfig = {
	duration: 5000,
	useNativeDriver: true,
}

const createLoopedAnimationSequence = (
	values: Animated.CompositeAnimation[]
) => {
	const sequence = Animated.sequence(values)
	return Animated.loop(sequence)
}

const randomValue = Math.random()

export const brownAnimatePosX = (posX: Animated.Value) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(posX, {
			toValue: SCREEN_WIDTH,
			...animationConfig,
		}),
		Animated.timing(posX, {
			toValue: 0,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const brownAnimatePosY = (posY: Animated.Value) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(posY, {
			toValue: SCREEN_HEIGHT / 2 - SHAPE_CENTER,
			...animationConfig,
		}),
		Animated.timing(posY, {
			toValue: SCREEN_HEIGHT - SHAPE_CENTER,
			...animationConfig,
		}),
		Animated.timing(posY, {
			toValue: SCREEN_HEIGHT / 2 - SHAPE_CENTER,
			...animationConfig,
		}),
		Animated.timing(posY, {
			toValue: 0,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const brownAnimateRot = (rot: Animated.Value, initAngle: number) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(rot, {
			toValue: randomValue,
			...animationConfig,
		}),
		Animated.timing(rot, {
			toValue: randomValue,
			...animationConfig,
		}),
		Animated.timing(rot, {
			toValue: randomValue,
			...animationConfig,
		}),
		Animated.timing(rot, {
			toValue: initAngle,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const greenAnimatePosX = (posX: Animated.Value) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(posX, {
			toValue: SCREEN_WIDTH,
			...animationConfig,
		}),
		Animated.timing(posX, {
			toValue: 0,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const greenAnimatePosY = (posY: Animated.Value) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(posY, {
			toValue: -SCREEN_HEIGHT / 2,
			...animationConfig,
		}),
		Animated.timing(posY, {
			toValue: 0,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const greenAnimateRot = (rot: Animated.Value, initAngle: number) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(rot, {
			toValue: randomValue,
			...animationConfig,
		}),
		Animated.timing(rot, {
			toValue: initAngle,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const greyAnimatePosX = (posX: Animated.Value) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(posX, {
			toValue: -SCREEN_WIDTH,
			...animationConfig,
		}),
		Animated.timing(posX, {
			toValue: 0,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const greyAnimatePosY = (posY: Animated.Value) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(posY, {
			toValue: -SCREEN_HEIGHT / 4 - 2 * SHAPE_CENTER - 10,
			...animationConfig,
		}),
		Animated.timing(posY, {
			toValue: 0,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}

export const greyAnimateRot = (rot: Animated.Value, initAngle: number) => {
	const animationSequence: Animated.CompositeAnimation[] = []
	animationSequence.push(
		Animated.timing(rot, {
			toValue: randomValue,
			...animationConfig,
		}),
		Animated.timing(rot, {
			toValue: initAngle,
			...animationConfig,
		})
	)
	return createLoopedAnimationSequence(animationSequence)
}


