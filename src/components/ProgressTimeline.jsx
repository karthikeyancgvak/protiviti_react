export function ProgressTimeline({ total, currentIndex }) {
  const fillPercent = total > 1 ? (currentIndex / (total - 1)) * 100 : 0

  return (
    <div className="decision-progress-wrap">
      <div className="decision-progress">
        <div className="decision-progress-track" />
        <div className="decision-progress-fill" style={{ width: `${fillPercent}%` }} />

        {Array.from({ length: total }).map((_, index) => {
          const percent = total > 1 ? (index / (total - 1)) * 100 : 0
          const isComplete = index < currentIndex
          const isActive = index === currentIndex

          return (
            <div key={index} className="decision-step" style={{ left: `${percent}%` }}>
              <span className={`decision-dot ${isComplete || isActive ? 'is-complete' : ''}`} />
              <span className={`decision-label ${isActive ? 'is-active' : ''}`}>{index + 1}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
