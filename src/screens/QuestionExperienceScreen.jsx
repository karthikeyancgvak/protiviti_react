import { useEffect, useState } from 'react'
import { earthquakeVideo, protovitiLogo } from '../assets/mediaAssets'
import { AssetImage } from '../components/AssetImage'
import { ProgressTimeline } from '../components/ProgressTimeline'
import { useExperience } from '../context/ExperienceContext'
import { QUESTIONS } from '../data/questions'

function AnswerPhase({ question, onSelect }) {
  const [timeLeft, setTimeLeft] = useState(question.timerSeconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      return undefined
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft])

  const formattedTime = `00:${String(timeLeft).padStart(2, '0')}`

  return (
    <div className="answer-screen">
      <div className="hero thank-you you-pick moment-one moment-two">
        <div className="overlay"></div>
        <div className="question">
          <h1>{question.title}</h1>
          <span>{formattedTime}</span>
        </div>
        <div className="three-opt">
          <div className="container">
            <div className="row content-box">
              {question.options.map((option, optionIndex) => (
                <div className="col-md-6 content" key={option}>
                  <button
                    type="button"
                    className="choice-btn"
                    onClick={() => {
                      onSelect(optionIndex)
                    }}
                  >
                    <h2 className="content-wrap">{option}</h2>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuestionExperienceScreen() {
  const { questionIndex, questionPhase, moveToAnswerPhase, selectAnswer, profile, missingAssets, markAssetMissing } =
    useExperience()
  const question = QUESTIONS[questionIndex]
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Guest'

  return (
    <section className="hero thank-you you-pick moment-one">
      {!missingAssets.video ? (
        <video autoPlay muted loop playsInline onError={() => markAssetMissing('video')}>
          <source src={earthquakeVideo} type="video/mp4" />
        </video>
      ) : (
        <div className="asset-placeholder video-placeholder">Video placeholder</div>
      )}

      <div className="progress-timeline">
        <ProgressTimeline total={QUESTIONS.length} currentIndex={questionIndex} />
      </div>

      <div className="profile-name">
        <p>{fullName}</p>
      </div>

      {questionPhase === 'intro' ? (
        <div className="question-screen question-stage">
          <div className="overlay"></div>
          <div className="content">
            <div className="content-wrap">
              <div className="container">
                <div className="row">
                  <h1>{question.prompt}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="start-btn">
            <button type="button" className="themeBtn themeBtn-reset" onClick={moveToAnswerPhase}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <AnswerPhase key={question.id} question={question} onSelect={selectAnswer} />
      )}

      <div className="site-logo">
        <AssetImage
          src={protovitiLogo}
          alt="Protiviti logo"
          missing={missingAssets.logo}
          onMissing={() => markAssetMissing('logo')}
        />
      </div>
    </section>
  )
}
