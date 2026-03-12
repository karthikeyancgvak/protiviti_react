import { useEffect, useState } from 'react'
import { introVideo } from '../assets/mediaAssets'
import { useExperience } from '../context/ExperienceContext'

function renderStatementLine(line, lineIndex, slideKey) {
  if (slideKey === 'decisions' && lineIndex === 0) {
    return (
      <>
        Over the next <span className="statement-emphasis">24 months</span>, you will make more than
      </>
    )
  }

  if (slideKey === 'decisions' && lineIndex === 1) {
    return (
      <>
        <span className="statement-emphasis">5,000 decisions</span>.
      </>
    )
  }

  if (slideKey === 'pressure' && lineIndex === 1) {
    return <span className="statement-emphasis">This experience isn't about what you know.</span>
  }

  if (slideKey === 'clarity' && lineIndex === 1) {
    return <span className="statement-emphasis">when clarity is incomplete.</span>
  }

  return line
}

const INTRO_TEXT_SLIDES = [
  {
    key: 'path',
    kind: 'path',
    lines: ['THE PATH', 'TO TRANSFORMATION'],
  },
  {
    key: 'decisions',
    kind: 'statement',
    lines: ['Over the next 24 months, you will make more than', '5,000 decisions.'],
  },
  {
    key: 'pressure',
    kind: 'statement',
    lines: ['Most will be made under pressure.', "This experience isn't about what you know."],
  },
  {
    key: 'clarity',
    kind: 'statement',
    lines: ["It's about how you move forward", 'when clarity is incomplete.'],
  },
]

const ROTATION_INTERVAL_MS = 15000

export function IntroSwiperScreen() {
  const { goToBefore } = useExperience()
  const [activeTextIndex, setActiveTextIndex] = useState(0)
  const activeSlide = INTRO_TEXT_SLIDES[activeTextIndex]

  useEffect(() => {
    const textTimer = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % INTRO_TEXT_SLIDES.length)
    }, ROTATION_INTERVAL_MS)

    return () => clearInterval(textTimer)
  }, [])

  return (
    <section
      className="hero intro-rotator"
      role="button"
      tabIndex={0}
      onClick={goToBefore}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          goToBefore()
        }
      }}
      aria-label="Touch anywhere to begin"
    >
      <video className="intro-video" autoPlay muted loop playsInline src={introVideo} />

      <div className="intro-video-overlay" />

      <div className="intro-rotating-copy" aria-live="polite">
        <div key={activeSlide.key} className="intro-copy-slide is-active">
          {activeSlide.kind === 'path' ? (
            <h1 className="path-copy">
              <span className="path-copy-top">{activeSlide.lines[0]}</span>
              <span className="path-copy-bottom">{activeSlide.lines[1]}</span>
            </h1>
          ) : (
            <h1 className={`statement-copy statement-copy-${activeSlide.key}`}>
              {activeSlide.lines.map((line, index) => (
                <span
                  key={`${activeSlide.key}-${index}`}
                  className={`statement-line statement-line-${activeSlide.key} statement-line-${index}`}
                >
                  {renderStatementLine(line, index, activeSlide.key)}
                </span>
              ))}
            </h1>
          )}
        </div>
      </div>

      <p className="intro-touch-hint">Start your Journey</p>
    </section>
  )
}
