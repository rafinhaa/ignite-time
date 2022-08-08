import { useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  Separator,
  TaskInput,
  MinutesAmountInput,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa se de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const task = watch('task')
  const isSubmitDisabled = !task
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const currentMinutes = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(currentMinutes).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const handleCreateNewCycle = (data: NewCycleFormData) => {
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
    reset()
  }

  const handleInterruptCycle = () => {
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

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const diferenceSeconds = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (diferenceSeconds > totalSeconds) {
        setCycles((oldCycles) =>
          oldCycles.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return {
                ...cycle,
                finishedDate: new Date(),
              }
            }
            return cycle
          }),
        )
        setAmountSecondsPassed(totalSeconds)
        clearInterval(interval)
      } else {
        setAmountSecondsPassed(diferenceSeconds)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [activeCycle, activeCycleId, cycles, totalSeconds])

  useEffect(() => {
    if (!activeCycle) return
    document.title = `${minutes}:${seconds}`
  }, [activeCycle, minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Desenvolver um site" />
            <option value="Desenvolver um aplicativo" />
            <option value="Desenvolver um aplicativo mobile" />
            <option value="Desenvolver um aplicativo desktop" />
            <option value="Desenvolver um aplicativo web" />
          </datalist>
          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            max={60}
            min={5}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Iniciar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
