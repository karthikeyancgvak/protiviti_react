import { useMemo } from 'react'
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

export function CompletionScreen() {
  const { restartFlow, profile, answers, missingAssets, markAssetMissing } = useExperience()
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Guest User'
  const score = useMemo(() => calculateScore(answers, QUESTIONS), [answers])
  const personaKey = useMemo(() => getPersonaKeyFromScore(score), [score])
  const persona = PERSONA_PROFILES[personaKey]

  const personaIconMap = {
    compass: compassIcon,
    accelerator: acceleratorIcon,
    beacon: beaconIcon,
    shield: shieldIcon,
  }

  const iconMissingKey = `persona_${personaKey}`

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus arcu vel neque auctor
                        pretium. Vivamus diam eros, placerat sed metus in, consectetur mollis nibh. Nullam sed vehicula
                        nunc, et pellentesque lectus. Integer placerat imperdiet tincidunt. Quisque accumsan, sapien a
                        sodales lacinia, purus massa pretium tellus, vitae varius nulla nisl vel magna. Morbi molestie nec
                        ipsum eu faucibus. In sollicitudin nibh vitae cursus tristique.
                      </p>

                      <form
                        className="report-form mt-5"
                        onSubmit={(event) => {
                          event.preventDefault()
                          restartFlow()
                        }}
                      >
                        <div className="mb-4">
                          <input type="email" className="form-control custom-input" placeholder="Business email address" />
                        </div>

                        <div className="mb-4 position-relative">
                          <select
                            className="form-select custom-input"
                            defaultValue="Country"
                            style={{ backgroundImage: `url(${dropDownBlue})` }}
                          >
                            <option value="Country">
                              Country
                            </option>
                            <option>India</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                          </select>
                        </div>

                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input custom-checkbox" type="checkbox" id="promo" />
                          <label className="form-check-label" htmlFor="promo">
                            Would you like to be contacted about future promotions or content?
                          </label>
                        </div>

                        <button type="submit" className="themeBtn themeBtn-reset">
                          Submit
                        </button>
                      </form>

                      <p className="small-note mt-4">
                        It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look
                        like readable English.
                      </p>
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
