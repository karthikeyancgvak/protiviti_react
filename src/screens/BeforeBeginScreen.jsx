import { useState } from 'react'
import { protovitiLogo } from '../assets/mediaAssets'
import { AssetImage } from '../components/AssetImage'
import { useExperience } from '../context/ExperienceContext'

export function BeforeBeginScreen() {
  const { beginExperience, updateProfile, profile, missingAssets, markAssetMissing } = useExperience()
  const [firstName, setFirstName] = useState(profile.firstName)
  const [lastName, setLastName] = useState(profile.lastName)
  const [errors, setErrors] = useState({ firstName: '', lastName: '' })
  const NAME_MAX_LENGTH = 30
  const isFirstNameLimitReached = firstName.length === NAME_MAX_LENGTH
  const isLastNameLimitReached = lastName.length === NAME_MAX_LENGTH

  // Allow international letters/diacritics and common separators in names.
  const namePattern = /^[\p{L}\p{M}]+(?:[ '\-\u2019][\p{L}\p{M}]+)*$/u

  const validateName = (value, fieldLabel) => {
    const trimmed = value.trim()
    if (!trimmed) return ''
    if (!namePattern.test(trimmed)) {
      return `Invalid Characters.`
    }
    return ''
  }

  const validateForm = () => {
    const nextErrors = {
      firstName: validateName(firstName, 'First name'),
      lastName: validateName(lastName, 'Last name'),
    }
    setErrors(nextErrors)
    return !nextErrors.firstName && !nextErrors.lastName
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const trimmedFirstName = firstName.trim().replace(/\s+/g, ' ')
    const trimmedLastName = lastName.trim().replace(/\s+/g, ' ')

    // Keep empty-field validation as native browser behavior, and show
    // custom inline errors only for non-letter characters.
    if (!trimmedFirstName || !trimmedLastName) {
      return
    }

    if (!validateForm()) {
      return
    }
    updateProfile({ firstName: trimmedFirstName, lastName: trimmedLastName })
    beginExperience()
  }

  return (
    <section className="hero thank-you you-pick form">
      <div className="overlay"></div>
      <div className="site-logo">
        <AssetImage
          src={protovitiLogo}
          alt="Protiviti logo"
          missing={missingAssets.logo}
          onMissing={() => markAssetMissing('logo')}
        />
      </div>

      <div className="title">
        <div className="row">
          <h1>Let’s personalize your experience​</h1>
        </div>
      </div>

      <form className="form-wrapper" onSubmit={onSubmit}>
        <div className="container">
          <div className="row g-5 mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className={`form-control custom-input ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value)
                  if (errors.firstName) {
                    setErrors((prev) => ({ ...prev, firstName: validateName(event.target.value, 'First name') }))
                  }
                }}
                onBlur={() => setErrors((prev) => ({ ...prev, firstName: validateName(firstName, 'First name') }))}
                maxLength={NAME_MAX_LENGTH}
                required
              />
              {errors.firstName ? <div className="invalid-feedback d-block">{errors.firstName}</div> : null}
              {!errors.firstName && isFirstNameLimitReached ? (
                <div className="invalid-feedback d-block">Character limit reached</div>
              ) : null}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className={`form-control custom-input ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value)
                  if (errors.lastName) {
                    setErrors((prev) => ({ ...prev, lastName: validateName(event.target.value, 'Last name') }))
                  }
                }}
                onBlur={() => setErrors((prev) => ({ ...prev, lastName: validateName(lastName, 'Last name') }))}
                maxLength={NAME_MAX_LENGTH}
                required
              />
              {errors.lastName ? <div className="invalid-feedback d-block">{errors.lastName}</div> : null}
              {!errors.lastName && isLastNameLimitReached ? (
                <div className="invalid-feedback d-block">Character limit reached</div>
              ) : null}
            </div>
          </div>

          <button type="submit" className="btn custom-btn w-100">
            Begin {'->'}
          </button>
        </div>
      </form>

      <div className="form-below-content text-center">
        <h4>Your information is handled in accordance with Protiviti&apos;s privacy standards.</h4>
      </div>
    </section>
  )
}
