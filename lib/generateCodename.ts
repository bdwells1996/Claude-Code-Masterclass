const adjectives1 = [
  'Swift',
  'Silent',
  'Shadow',
  'Phantom',
  'Stealth',
  'Blazing',
  'Thunder',
  'Mystic',
  'Crimson',
  'Frozen',
  'Golden',
  'Silver',
  'Dark',
  'Bright',
  'Wild',
  'Keen',
  'Bold',
  'Sharp',
  'Wise',
  'Clever',
]

const adjectives2 = [
  'Shadow',
  'Flame',
  'Storm',
  'Wind',
  'Fire',
  'Ice',
  'Viper',
  'Eagle',
  'Wolf',
  'Bear',
  'Tiger',
  'Phoenix',
  'Dragon',
  'Raven',
  'Falcon',
  'Smoke',
  'Frost',
  'Dust',
  'Rain',
  'Thunder',
]

const nouns = [
  'Stalker',
  'Prowler',
  'Hunter',
  'Striker',
  'Reaper',
  'Bandit',
  'Rogue',
  'Ghost',
  'Specter',
  'Phantom',
  'Ninja',
  'Sentinel',
  'Warrior',
  'Scout',
  'Ranger',
  'Thief',
  'Wraith',
  'Venom',
  'Blade',
  'Fang',
]

export function generateCodename(): string {
  const adj1 = adjectives1[Math.floor(Math.random() * adjectives1.length)]
  const adj2 = adjectives2[Math.floor(Math.random() * adjectives2.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adj1}${adj2}${noun}`
}
