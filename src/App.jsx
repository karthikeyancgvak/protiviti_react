import './App.css'
import { ExperienceProvider, useExperience } from './context/ExperienceContext'
import { BeforeBeginScreen } from './screens/BeforeBeginScreen'
import { CompletionScreen } from './screens/CompletionScreen'
import { IntroSwiperScreen } from './screens/IntroSwiperScreen'
import { QuestionExperienceScreen } from './screens/QuestionExperienceScreen'
import { ThankYouScreen } from './screens/ThankYouScreen'

function AppRouter() {
  const { screen } = useExperience()

  return (
    <main className="pageContent">
      {screen === 'screen1' ? <IntroSwiperScreen /> : null}
      {screen === 'before' ? <BeforeBeginScreen /> : null}
      {screen === 'thankyou' ? <ThankYouScreen /> : null}
      {screen === 'question' ? <QuestionExperienceScreen /> : null}
      {screen === 'complete' ? <CompletionScreen /> : null}
    </main>
  )
}

function App() {
  return (
    <ExperienceProvider>
      <AppRouter />
    </ExperienceProvider>
  )
}

export default App

