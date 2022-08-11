import { differenceInSeconds } from 'date-fns'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { NewCycleFormData } from '../pages/Home'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer } from '../reducers/cycles/cycles'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
  createNewCycle: (newCycleFormData: NewCycleFormData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext<CyclesContextType>({
  cycles: [],
  activeCycle: undefined,
  activeCycleId: null,
  amountSecondsPassed: 0,
  markCurrentCycleAsFinished: () => {},
  setAmountSecondsPassed: () => {},
  createNewCycle: () => {},
  interruptCurrentCycle: () => {},
})

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle)
      return differenceInSeconds(new Date(), activeCycle.startDate)

    return 0
  })

  const createNewCycle = (data: NewCycleFormData) => {
    const id = crypto.randomUUID()
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCyclesAsFinishedAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setAmountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
