import React, { memo, useEffect } from "react"
import { Animated } from "react-native"
import styles from "../styles"
function MemoizedShapes({
	brownShape,
	brownPosX,
	brownPosY,
	brownRot,
	greenShape,
	greenPosX,
	greenPosY,
	greenRot,
	greyShape,
	greyPosX,
	greyPosY,
	greyRot,
	rotateData,
}: {
	brownShape: Animated.Value
	brownPosX: Animated.Value
	brownPosY: Animated.Value
	brownRot: Animated.Value
	greenShape: Animated.Value
	greenPosX: Animated.Value
	greenPosY: Animated.Value
	greenRot: Animated.Value
	greyShape: Animated.Value
	greyPosX: Animated.Value
	greyPosY: Animated.Value
	greyRot: Animated.Value
	rotateData: (
		value: Animated.Value
	) => Animated.AnimatedInterpolation<string | number>
}) {
	useEffect(() => {
		console.log("rendered")
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
