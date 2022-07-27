import { HistoryContainer, HistoryList } from './styles'

export const History = () => {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Desenvolver um site</td>
              <td>1:00</td>
              <td>há três dias</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Desenvolver um site</td>
              <td>1:00</td>
              <td>há três dias</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Desenvolver um site</td>
              <td>1:00</td>
              <td>há três dias</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
