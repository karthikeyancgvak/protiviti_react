import { useMemo, useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { protovitiLogo, touchAnywhere } from '../assets/mediaAssets'
import { AssetImage } from '../components/AssetImage'
import { useExperience } from '../context/ExperienceContext'

export function IntroSwiperScreen() {
  const { goToBefore, missingAssets, markAssetMissing } = useExperience()
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef(null)

  const slides = useMemo(
    () => [
      {
        key: 's1',
        className: 'hero s1',
        content: (
          <h1>
            Over the next 24 months,
            <br />
            you will make more than 5,000 decisions.
          </h1>
        ),
      },
      {
        key: 's2',
        className: 'hero s2',
        content: (
          <h1>
            Most will be made under pressure.
            <br />
            This experience isn&apos;t about what you know.
          </h1>
        ),
      },
      {
        key: 's3',
        className: 'hero s3',
        content: (
          <h1>
            It&apos;s about how you move forward
            <br />
            when clarity is incomplete.
          </h1>
        ),
      },
      {
        key: 'path',
        className: 'hero path',
      },
    ],
    [],
  )

  const startJourney = () => {
    const swiper = swiperRef.current
    if (!swiper) return

    swiper.slideTo(1)
    swiper.allowTouchMove = true
    swiper.params.autoplay = {
      delay: 3500,
      disableOnInteraction: false,
    }
    swiper.autoplay.start()
  }

  const openBeforeBegin = () => {
    const swiper = swiperRef.current
    const atLastSlide = swiper ? swiper.isEnd : currentSlide === slides.length - 1
    if (atLastSlide) goToBefore()
  }

  return (
    <Swiper
      className="heroSwiper hero-swiper"
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      speed={1000}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={false}
      allowTouchMove={false}
      autoplay={false}
      pagination={{ clickable: true }}
      navigation
      onSwiper={(swiper) => {
        swiperRef.current = swiper
        setCurrentSlide(swiper.activeIndex)
      }}
      onSlideChange={(swiper) => {
        setCurrentSlide(swiper.activeIndex)
        if (swiper.isEnd) {
          swiper.autoplay.stop()
          swiper.allowTouchMove = false
        }
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.key}>
          <section className={slide.className} onClick={slide.key === 'path' ? openBeforeBegin : undefined}>
            <div className="overlay"></div>
            {slide.content ? <div className="content">{slide.content}</div> : null}

            {slide.key === 's1' ? (
              <>
                <div className="start-btn">
                  <button type="button" className="themeBtn themeBtn-reset" onClick={startJourney}>
                    Start your journey
                  </button>
                </div>
                <div className="site-logo">
                  <AssetImage
                    src={protovitiLogo}
                    alt="Protiviti logo"
                    missing={missingAssets.logo}
                    onMissing={() => markAssetMissing('logo')}
                  />
                </div>
              </>
            ) : null}

            {slide.key === 'path' ? (
              <>
                <div className="site-logo">
                  <AssetImage
                    src={protovitiLogo}
                    alt="Protiviti logo"
                    missing={missingAssets.logo}
                    onMissing={() => markAssetMissing('logo')}
                  />
                </div>
                <div className="bottom-text">
                  <div className="content-wrap">
                    <div className="container">
                      <div className="row">
                        <button type="button" className="touch-logo touch-logo-btn" onClick={openBeforeBegin}>
                          <AssetImage
                            src={touchAnywhere}
                            alt="Touch anywhere"
                            missing={missingAssets.touch}
                            onMissing={() => markAssetMissing('touch')}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
