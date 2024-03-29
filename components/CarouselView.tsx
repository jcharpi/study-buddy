// REACT
import React, { useEffect } from "react"
import { InputModeOptions, View } from "react-native"
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"

// STYLES
import styles from "../styles"

// REDUX
import { selectTasks } from "../reducers/taskSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  selectAddTask,
  setTaskName,
  setTimeLimit,
} from "../reducers/addTaskSlice"

export interface Input {
  inputMode: InputModeOptions | undefined
  placeholder: string
  state: string
  setState: (value: string) => {}
}

export function CarouselView({
  taskRef,
  renderTask,
  inputRef,
  renderInput,
}: {
  taskRef: React.RefObject<ICarouselInstance>
  renderTask: ({ item }: any) => JSX.Element
  inputRef: React.RefObject<ICarouselInstance>
  renderInput: ({ item }: any) => JSX.Element
}) {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)
  const task = useAppSelector(selectAddTask)

  const input: Input[] = [
    {
      inputMode: "text",
      placeholder: "Enter task name",
      state: task.taskName,
      setState: (value: string) => dispatch(setTaskName(value)),
    },
    {
      inputMode: "numeric",
      placeholder: "Time limit in minutes",
      state: task.timeLimit.toString(),
      setState: (value: string) => dispatch(setTimeLimit(value)),
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      taskRef.current?.scrollTo({
        index: tasks.length - 1,
        animated: false,
      })
    }, 100)
  }, [tasks])

  return (
    <>
      <View style={styles.taskContainer}>
        <Carousel
          loop
          enabled={false}
          ref={taskRef}
          vertical={true}
          autoPlay={tasks.length > 1}
          autoPlayInterval={2100}
          height={130}
          data={tasks}
          pagingEnabled={true}
          overscrollEnabled={false}
          snapEnabled={true}
          renderItem={renderTask}
        />
      </View>
      <View style={styles.taskContainer}>
        <Carousel
          loop={false}
          ref={inputRef}
          vertical={false}
          height={70}
          width={320}
          data={input}
          pagingEnabled={true}
          overscrollEnabled={false}
          snapEnabled={true}
          renderItem={renderInput}
        />
      </View>
    </>
  )
}
