import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
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
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa se de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

export const Home = () => {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })
  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: any) => {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          Começar <Play size={24} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
