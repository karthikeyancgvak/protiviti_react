import { protovitiLogo, thankYouIcon1, thankYouIcon2, thankYouIcon3 } from '../assets/mediaAssets'
import { AssetImage } from '../components/AssetImage'
import { useExperience } from '../context/ExperienceContext'

export function ThankYouScreen() {
  const { continueFromThankYou, profile, missingAssets, markAssetMissing } = useExperience()
  const firstName = profile.firstName.trim()
  const lastInitial = profile.lastName.trim().charAt(0)
  const displayName = `${firstName}${lastInitial ? ` ${lastInitial}` : ''}`.trim()

  return (
    <section className="hero thank-you blue" onClick={continueFromThankYou}>
      <div className="overlay"></div>
      <div className="site-logo">
        <AssetImage
          src={protovitiLogo}
          alt="Protiviti logo"
          missing={missingAssets.logo}
          onMissing={() => markAssetMissing('logo')}
        />
      </div>

      <div className="profile-name">
        <p>{displayName || 'Guest'}</p>
      </div>

      <div className="content">
        <div className="content-wrap">
          <div className="container">
            <div className="row">
              <h1>There are four types of decision makers... which one are you?</h1>
              <p>Answer 5 breif questions to:</p>

              <div className="col-md-4">
                <div className="icon-con">
                  <AssetImage
                    src={thankYouIcon1}
                    alt="Thank you icon 1"
                    missing={missingAssets.ty1}
                    onMissing={() => markAssetMissing('ty1')}
                  />
                  <h3>Test how you make decisions under pressure and where you can sharpen your edge</h3>
                </div>
              </div>

              <div className="col-md-4">
                <div className="icon-con">
                  <AssetImage
                    src={thankYouIcon2}
                    alt="Thank you icon 2"
                    missing={missingAssets.ty2}
                    onMissing={() => markAssetMissing('ty2')}
                  />
                  <h3>Identify how your leadership style creates clarity for your team</h3>
                </div>
              </div>

              <div className="col-md-4">
                <div className="icon-con last">
                  <AssetImage
                    src={thankYouIcon3}
                    alt="Thank you icon 3"
                    missing={missingAssets.ty3}
                    onMissing={() => markAssetMissing('ty3')}
                  />
                  <h3>Receive a personalized leadership snapshot with clear, practical recommendations</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className="touch-next">
        <p>Touch anywhere to continue</p>
      </div>
    </section>
  )
}

