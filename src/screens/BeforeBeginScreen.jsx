import { useState } from 'react'
import { protovitiLogo } from '../assets/mediaAssets'
import { AssetImage } from '../components/AssetImage'
import { useExperience } from '../context/ExperienceContext'

export function BeforeBeginScreen() {
  const { beginExperience, updateProfile, profile, missingAssets, markAssetMissing } = useExperience()
  const [firstName, setFirstName] = useState(profile.firstName)
  const [lastName, setLastName] = useState(profile.lastName)

  const onSubmit = (event) => {
    event.preventDefault()
    updateProfile({ firstName: firstName.trim(), lastName: lastName.trim() })
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
          <h1>Before we begin</h1>
        </div>
      </div>

      <form className="form-wrapper" onSubmit={onSubmit}>
        <div className="container">
          <div className="row g-5 mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn custom-btn w-100">
            Begin the Experience {'->'}
          </button>
        </div>
      </form>

      <div className="form-below-content text-center">
        <h3>We use this information to personalize your experience.</h3>
        <h4>Your information is handled in accordance with Protiviti&apos;s privacy standards.</h4>
      </div>
    </section>
  )
}
