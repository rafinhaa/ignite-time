import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  Separator,
  TaskInput,
  MinutesAmountInput,
} from './styles'

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Dê um nome para seu projeto" />
          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
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

        <StartCountdownButton type="submit">
          Começar <Play size={24} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
