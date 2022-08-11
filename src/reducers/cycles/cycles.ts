import { Cycle } from '../../contexts/CyclesContext'
import { produce } from 'immer'
import { ActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: null | string
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  const currentCycleIndex = state.cycles.findIndex((cycle) => {
    return cycle.id === state.activeCycleId
  })

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptDate = new Date()
        draft.activeCycleId = null
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    default:
      return state
  }
}
