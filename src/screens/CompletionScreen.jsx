import { useExperience } from '../context/ExperienceContext'
import { AssetImage } from '../components/AssetImage'
import { protovitiLogo } from '../assets/mediaAssets'

export function CompletionScreen() {
  const { restartFlow, profile, missingAssets, markAssetMissing } = useExperience()
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Guest User'

  return (
    <section className="executive-screen">
      <div className="executive-header">
        <div className="executive-title">
          <p>Executive summary for</p>
          <h1>{fullName.toUpperCase()}</h1>
        </div>
        <div className="executive-logo">
          <AssetImage
            src={protovitiLogo}
            alt="Protiviti logo"
            missing={missingAssets.logo}
            onMissing={() => markAssetMissing('logo')}
          />
        </div>
      </div>

      <div className="executive-body">
        <div className="executive-left">
          <div className="wip-area-bg"></div>
          <div className="wip-label">WIP AREA</div>
        </div>

        <div className="executive-right">
          <h2>Want the full report?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus arcu vel neque auctor pretium.
            Vivamus diam eros, placerat sed metus in, consectetur mollis nibh. Nullam sed vehicula nunc, et
            pellentesque lectus.
          </p>

          <div className="executive-form">
            <input type="email" placeholder="Business email address" />
            <select defaultValue="">
              <option value="" disabled>
                Country
              </option>
              <option>United States</option>
              <option>Canada</option>
              <option>India</option>
            </select>

            <label className="contact-check">
              <input type="checkbox" />
              Would you like to be contacted about future promotions or content?
            </label>

            <button type="button" className="themeBtn themeBtn-reset executive-submit" onClick={restartFlow}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
