import { useEffect, useMemo, useRef, useState } from 'react'
import { useExperience } from '../context/ExperienceContext'
import { AssetImage } from '../components/AssetImage'
import {
  acceleratorIcon,
  beaconIcon,
  compassIcon,
  dropDownBlue,
  profileIcon,
  protovitiLogo,
  reportFormBg,
  searchGraphIcon,
  shieldIcon,
  summeryIcon,
} from '../assets/mediaAssets'
import { QUESTIONS } from '../data/questions'
import { PERSONA_PROFILES, calculateScore, getPersonaKeyFromScore } from '../data/personaProfiles'

const ELOQUA_FORM_URL = 'https://s1967927849.t.eloqua.com/e/f2'
const ELOQUA_FORM_NAME = '2026GAAMBooth'
const ELOQUA_SITE_ID = '1967927849'

const COUNTRY_OPTIONS = [
  'Australia',
  'Canada',
  'France',
  'Germany',
  'Hong Kong S.A.R., China',
  'India',
  'Italy',
  'Japan',
  'The Netherlands',
  'Singapore',
  'United Kingdom',
  'United States',
  'Argentina',
  'Bahrain',
  'Bulgaria',
  'Brazil',
  'Chile',
  'Colombia',
  'Egypt',
  'Kuwait',
  'Mexico',
  'Oman',
  'Peru',
  'Qatar',
  'Saudi Arabia',
  'South Africa',
  'Switzerland',
  'United Arab Emirates',
  'Venezuela',
]

export function CompletionScreen() {
  const { restartFlow, profile, answers, missingAssets, markAssetMissing } = useExperience()
  const [formState, setFormState] = useState({
    emailAddress: '',
    country: '',
    followUp: false,
  })
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const redirectTimerRef = useRef(null)
  const countryDropdownRef = useRef(null)
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Guest User'
  const score = useMemo(() => calculateScore(answers, QUESTIONS), [answers])
  const personaKey = useMemo(() => getPersonaKeyFromScore(score), [score])
  const persona = PERSONA_PROFILES[personaKey]
  const answerSummary = useMemo(
    () =>
      QUESTIONS.map((question) => {
        const selectedIndex = answers?.[question.id]
        const hasAnswer = typeof selectedIndex === 'number' && selectedIndex >= 0 && selectedIndex < question.options.length

        return {
          questionId: question.id,
          question: question.prompt,
          selectedOptionIndex: hasAnswer ? selectedIndex : null,
          selectedOptionText: hasAnswer ? question.options[selectedIndex] : null,
        }
      }),
    [answers],
  )

  useEffect(() => {
    const completionPayload = {
      participantName: fullName,
      totalScore: score,
      maxScore: 20,
      personaKey,
      responses: answerSummary,
    }

    console.log('Completion payload (ready for API):', completionPayload)
  }, [answerSummary, fullName, personaKey, score])

  const personaIconMap = {
    compass: compassIcon,
    accelerator: acceleratorIcon,
    beacon: beaconIcon,
    shield: shieldIcon,
  }

  const iconMissingKey = `persona_${personaKey}`

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  const handleReportSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setIsSubmitted(false)

    if (!formState.country) {
      setSubmitError('Please select a country.')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = new URLSearchParams({
        elqFormName: ELOQUA_FORM_NAME,
        elqSiteId: ELOQUA_SITE_ID,
        elqCampaignId: '',
        emailAddress: formState.emailAddress,
        country: formState.country,
        Firstname: profile.firstName,
        lastname: profile.lastName,
        type: persona.title,
      })

      if (formState.followUp) {
        payload.set('singleCheckbox2', 'on')
      }

      await fetch(ELOQUA_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })

      setIsSubmitted(true)
      redirectTimerRef.current = setTimeout(() => {
        restartFlow()
      }, 2000)
    } catch (error) {
      console.error('Failed to submit report form:', error)
      setSubmitError('Unable to submit right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="completion-result">
      <section className="hero result">
        <div className="overlay"></div>
        <div className="site-logo">
          <AssetImage
            src={protovitiLogo}
            alt="Protiviti logo"
            missing={missingAssets.logo}
            onMissing={() => markAssetMissing('logo')}
          />
        </div>
        <div className="content">
          <div className="content-wrap">
            <div className="container">
              <div className="row">
                <p className="designation">Executive summary for</p>
                <h1 className="name">{fullName.toUpperCase()}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="result-contents">
        <div className="container">
          <div className="row content-row">
            <div className="col-lg-8">
              <div className="shield-section text-center">
                <div className="container">
                  <h2 className="main-title mb-4">{persona.title}</h2>
                  <div className="shield-icon">
                    <div className="icon">
                      <AssetImage
                        src={personaIconMap[personaKey]}
                        alt={`${personaKey} icon`}
                        missing={missingAssets[iconMissingKey]}
                        onMissing={() => markAssetMissing(iconMissingKey)}
                      />
                    </div>
                  </div>
                  <p className="subtitle mx-auto mb-5">{persona.subtitle}</p>

                  <div className="row g-5 three-icon-content">
                    <div className="col-md-4">
                      <div className="feature-box">
                        <div className="feature-icon mb-3">
                          <div className="icon">
                            <img src={summeryIcon} alt="Executive summary icon" />
                          </div>
                        </div>
                        <h4 className="feature-title">Executive Summary</h4>
                        <p className="feature-text">{persona.sections.summary}</p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="feature-box">
                        <div className="feature-icon mb-3">
                          <div className="icon">
                            <img src={profileIcon} alt="Pressure profile icon" />
                          </div>
                        </div>
                        <h4 className="feature-title">Your Pressure Profile</h4>
                        <p className="feature-text">{persona.sections.pressure}</p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="feature-box">
                        <div className="feature-icon mb-3">
                          <div className="icon">
                            <img src={searchGraphIcon} alt="Clarity icon" />
                          </div>
                        </div>
                        <h4 className="feature-title">How You Create or Lose Clarity</h4>
                        <p className="feature-text">{persona.sections.clarity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 p-0">
              <div className="report-section d-flex align-items-center" style={{ backgroundImage: `url(${reportFormBg})` }}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1 className="report-title">Want the full report?</h1>

                      <p className="report-desc">
                        Please provide your details below to receive your automated Transformation type response and full
                        report follow-up.
                      </p>

                      <form className="report-form mt-5" onSubmit={handleReportSubmit}>
                        <div className="mb-4">
                          <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Email Address"
                            value={formState.emailAddress}
                            onChange={(event) => setFormState((prev) => ({ ...prev, emailAddress: event.target.value }))}
                            required
                          />
                        </div>

                        <div className="mb-4 position-relative country-dropdown" ref={countryDropdownRef}>
                          <button
                            type="button"
                            className={`custom-input country-trigger ${isCountryMenuOpen ? 'is-open' : ''}`}
                            onClick={() => setIsCountryMenuOpen((prev) => !prev)}
                            style={{ backgroundImage: `url(${dropDownBlue})` }}
                            aria-haspopup="listbox"
                            aria-expanded={isCountryMenuOpen}
                          >
                            <span className={formState.country ? '' : 'is-placeholder'}>
                              {formState.country || 'Please Select'}
                            </span>
                          </button>

                          {isCountryMenuOpen ? (
                            <div className="country-menu" role="listbox" aria-label="Country">
                              {COUNTRY_OPTIONS.map((country) => (
                                <button
                                  key={country}
                                  type="button"
                                  className={`country-option ${formState.country === country ? 'is-selected' : ''}`}
                                  onClick={() => {
                                    setFormState((prev) => ({ ...prev, country }))
                                    setIsCountryMenuOpen(false)
                                  }}
                                >
                                  {country}
                                </button>
                              ))}
                            </div>
                          ) : null}

                        </div>

                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input custom-checkbox"
                            type="checkbox"
                            id="promo"
                            checked={formState.followUp}
                            onChange={(event) => setFormState((prev) => ({ ...prev, followUp: event.target.checked }))}
                          />
                          <label className="form-check-label" htmlFor="promo">
                            Would you like to be contacted for a follow up
                          </label>
                        </div>

                        <button type="submit" className="themeBtn themeBtn-reset" disabled={isSubmitting || isSubmitted}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </form>

                      <p className="small-note mt-4">
                        By submitting this form, I understand that I will receive an automated response with my
                        Transformation type.
                      </p>
                      {isSubmitting ? <p className="small-note mt-2">Please wait, submitting your response...</p> : null}
                      {isSubmitted ? <p className="small-note mt-2">Thank You For your response</p> : null}
                      {submitError ? <p className="small-note mt-2">{submitError}</p> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}