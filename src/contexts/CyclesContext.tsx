import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useReducer,
  useState,
} from 'react'
import { NewCycleFormData } from '../pages/Home'

interface Cycle {
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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: null | string
}

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptDate: new Date(),
                }
              }
              return cycle
            }),
            activeCycleId: null,
          }

        default:
          return state
      }
    },
    { cycles: [], activeCycleId: null },
  )
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
    dispatch({ type: 'ADD_NEW_CYCLE', payload: { newCycle } })
    // setCycles((oldCycles) => [...oldCycles, newCycle])
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch({ type: 'INTERRUPT_CURRENT_CYCLE', payload: { activeCycleId } })
  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
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
