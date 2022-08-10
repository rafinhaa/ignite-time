import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
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

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
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
    setCycles((oldCycles) => [...oldCycles, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    // reset()
  }

  const interruptCurrentCycle = () => {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptDate: new Date(),
          }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
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
