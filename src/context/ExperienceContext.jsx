/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { QUESTIONS } from '../data/questions'

const ExperienceContext = createContext(null)

export function ExperienceProvider({ children }) {
  const [screen, setScreen] = useState('screen1')
  const [profile, setProfile] = useState({ firstName: '', lastName: '' })
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questionPhase, setQuestionPhase] = useState('intro')
  const [answers, setAnswers] = useState({})
  const [missingAssets, setMissingAssets] = useState({})

  const markAssetMissing = (key) => {
    setMissingAssets((prev) => ({ ...prev, [key]: true }))
  }

  const updateProfile = (nextProfile) => {
    setProfile(nextProfile)
  }

  const goToBefore = () => {
    setScreen('before')
  }

  const beginExperience = () => {
    setScreen('thankyou')
  }

  const continueFromThankYou = () => {
    setScreen('question')
    setQuestionIndex(0)
    setQuestionPhase('intro')
  }

  const moveToAnswerPhase = () => {
    setQuestionPhase('answer')
  }

  const selectAnswer = (choiceIndex) => {
    const currentQuestion = QUESTIONS[questionIndex]

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choiceIndex,
    }))

    if (questionIndex >= QUESTIONS.length - 1) {
      setScreen('complete')
      return
    }

    setQuestionIndex((prev) => prev + 1)
    setQuestionPhase('intro')
  }

  const restartFlow = () => {
    setScreen('screen1')
    setQuestionIndex(0)
    setQuestionPhase('intro')
    setAnswers({})
  }

  const value = {
    screen,
    profile,
    questionIndex,
    questionPhase,
    answers,
    missingAssets,
    markAssetMissing,
    updateProfile,
    goToBefore,
    beginExperience,
    continueFromThankYou,
    moveToAnswerPhase,
    selectAnswer,
    restartFlow,
  }

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience() {
  const context = useContext(ExperienceContext)
  if (!context) {
    throw new Error('useExperience must be used inside ExperienceProvider')
  }
  return context
}
