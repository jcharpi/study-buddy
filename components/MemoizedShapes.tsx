// REACT
import React, { memo, useEffect, useRef } from "react"
import { Animated } from "react-native"

// STYLES
import styles from "../styles"

// ANIMATIONS
import {
	brownAnimatePosX,
	brownAnimatePosY,
	brownAnimateRot,
	greenAnimatePosX,
	greenAnimatePosY,
	greenAnimateRot,
	greyAnimatePosX,
	greyAnimatePosY,
	greyAnimateRot,
} from "../animations"

// IMAGES
import brownShape from "../images/brownShape.png"
import greenShape from "../images/greenShape.png"
import greyShape from "../images/greyShape.png"

function MemoizedShapes() {
	const brownPosX = useRef(new Animated.Value(0)).current
	const brownPosY = useRef(new Animated.Value(0)).current
	const brownRot = useRef(new Animated.Value(0.8)).current

	const greenPosX = useRef(new Animated.Value(0)).current
	const greenPosY = useRef(new Animated.Value(0)).current
	const greenRot = useRef(new Animated.Value(0.3)).current

	const greyPosX = useRef(new Animated.Value(0)).current
	const greyPosY = useRef(new Animated.Value(0)).current
	const greyRot = useRef(new Animated.Value(0.5)).current

	const rotateData = (shapeRotate: Animated.Value) =>
		shapeRotate.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"],
		})

	const animateShapes = () =>
		Animated.parallel([
			brownAnimatePosX(brownPosX),
			brownAnimatePosY(brownPosY),
			brownAnimateRot(brownRot, 0.8),
			greenAnimatePosX(greenPosX),
			greenAnimatePosY(greenPosY),
			greenAnimateRot(greenRot, 0.3),
			greyAnimatePosX(greyPosX),
			greyAnimatePosY(greyPosY),
			greyAnimateRot(greyRot, 0.5),
		]).start()

	useEffect(() => {
		animateShapes()
	}, [])

	return (
		<Animated.View>
			<Animated.Image
				source={brownShape}
				resizeMode="contain"
				style={[
					styles.brownShapeStyle,
					{
						transform: [
							{
								translateX: brownPosX,
							},
							{
								translateY: brownPosY,
							},
							{
								rotateZ: rotateData(brownRot),
							},
						],
					},
				]}
			/>
			<Animated.Image
				source={greenShape}
				resizeMode="cover"
				style={[
					styles.greenShapeStyle,
					{
						transform: [
							{
								translateX: greenPosX,
							},
							{
								translateY: greenPosY,
							},
							{
								rotateZ: rotateData(greenRot),
							},
						],
					},
				]}
			/>
			<Animated.Image
				source={greyShape}
				resizeMode="cover"
				style={[
					styles.greyShapeStyle,
					{
						transform: [
							{
								translateX: greyPosX,
							},
							{
								translateY: greyPosY,
							},
							{
								rotateZ: rotateData(greyRot),
							},
						],
					},
				]}
			/>
		</Animated.View>
	)
}

export default memo(MemoizedShapes)
