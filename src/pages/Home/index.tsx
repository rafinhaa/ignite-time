import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from './styles'

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <input id="task" />
          <label htmlFor="">durante</label>
          <input type="number" id="minutesAmount" />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          Começar <Play size={24} />
        </button>
      </form>
    </HomeContainer>
  )
}
