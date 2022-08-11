import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useReducer,
  useState,
} from 'react'
import { NewCycleFormData } from '../pages/Home'
import { ActionTypes, cyclesReducer } from '../reducers/cycles'

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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const { cycles, activeCycleId } = cyclesState
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const createNewCycle = (data: NewCycleFormData) => {
    const id = crypto.randomUUID()
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({ type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } })
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: { activeCycleId },
    })
  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
  }

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
