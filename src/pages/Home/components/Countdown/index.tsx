import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setAmountSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const currentMinutes = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(currentMinutes).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const diferenceSeconds = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )

      if (diferenceSeconds > totalSeconds) {
        markCurrentCycleAsFinished()
        setAmountSecondsPassed(totalSeconds)
        clearInterval(interval)
      } else {
        setAmountSecondsPassed(diferenceSeconds)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setAmountSecondsPassed,
    totalSeconds,
  ])

  useEffect(() => {
    if (!activeCycle) return
    document.title = `${minutes}:${seconds}`
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
