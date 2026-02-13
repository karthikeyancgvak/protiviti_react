export const SCORE_BANDS = [
  { key: 'compass', min: 18, max: 20 },
  { key: 'accelerator', min: 14, max: 17 },
  { key: 'beacon', min: 10, max: 13 },
  { key: 'shield', min: 5, max: 9 },
]

export const PERSONA_PROFILES = {
  compass: {
    title: 'Compass - See further ahead',
    subtitle: 'Clarity comes from movement; paired with discipline, momentum becomes an advantage.',
    sections: {
      summary:
        'You create clarity by moving decisively once direction is clear. Under pressure, you act quickly, favoring momentum over perfect information.',
      pressure:
        'You maintain momentum even in uncertainty, deferring reinforcement to avoid slowing down. Best in dynamic environments; benefits from guardrails.',
      clarity:
        'Clarity improves when decisions are made quickly and revisited. You commit early and adjust later; increases speed but risks instability.',
    },
  },
  accelerator: {
    title: 'Accelerator - Move faster',
    subtitle:
      'Clarity comes from knowing the organization can withstand pressure; paired with timely action, this builds lasting confidence.',
    sections: {
      summary:
        'You create clarity by reinforcing foundations before accelerating. Under pressure, you slow down to reduce volatility and strengthen system resilience.',
      pressure:
        'You prioritize directional clarity over competing demands, deferring short-term optimization to preserve coherence.',
      clarity:
        'Clarity improves when decisions are grounded in stability. You strengthen foundations before advancing.',
    },
  },
  beacon: {
    title: 'Beacon - Stay connected to your team',
    subtitle:
      'Clarity comes from shared understanding; paired with decisiveness, alignment becomes a force multiplier.',
    sections: {
      summary:
        'You create clarity by aligning people, systems, and priorities. Under pressure, you prioritize bringing the organization with you.',
      pressure:
        'You prioritize team alignment over short-term speed, deferring solo execution for coordinated movement.',
      clarity:
        'Clarity improves when decisions are socialized and shared. You invest in alignment before commitment.',
    },
  },
  shield: {
    title: 'Shield - Absorb hidden risk',
    subtitle:
      'Clarity comes from knowing what matters now vs. later; sequencing becomes a powerful advantage.',
    sections: {
      summary:
        'You create clarity by sequencing decisions deliberately. Under pressure, you pause to assess and preserve long-term direction.',
      pressure:
        'You prioritize risk reduction and durability over near-term speed. Builds long-term reliability and confidence.',
      clarity:
        'Clarity improves when decisions are intentionally sequenced. You commit to direction and adjust as information emerges.',
    },
  },
}

export function calculateScore(answers, questions) {
  return questions.reduce((total, question) => {
    const answerIndex = answers?.[question.id]
    if (typeof answerIndex !== 'number' || answerIndex < 0 || answerIndex > 3) {
      return total
    }
    return total + (4 - answerIndex)
  }, 0)
}

export function getPersonaKeyFromScore(score) {
  const band = SCORE_BANDS.find((item) => score >= item.min && score <= item.max)
  return band?.key ?? 'shield'
}
