import { describe, it, expect } from 'vitest'
import { generateCodename } from '@/lib/generateCodename'

describe('generateCodename', () => {
  it('returns a string in PascalCase format', () => {
    const codename = generateCodename()
    expect(typeof codename).toBe('string')
    // Check that first letter is uppercase
    expect(codename[0]).toBe(codename[0].toUpperCase())
  })

  it('returns a string with three words concatenated', () => {
    const codename = generateCodename()
    // Should have pattern: CapitalizedWord + CapitalizedWord + CapitalizedWord
    // Each word is at least 3 characters, so minimum length is ~9
    expect(codename.length).toBeGreaterThan(8)
    // Verify it has capital letters (indicates word boundaries)
    const capitalLetters = (codename.match(/[A-Z]/g) || []).length
    expect(capitalLetters).toBeGreaterThanOrEqual(3)
  })

  it('generates different codenamesacross multiple calls', () => {
    const codenamesSet = new Set<string>()
    for (let i = 0; i < 50; i++) {
      codenamesSet.add(generateCodename())
    }
    // With 50 iterations and 20*20*20 = 8000 possible combinations,
    // we should get at least 30 different codenamesif randomness works
    expect(codenamesSet.size).toBeGreaterThan(25)
  })

  it('never returns the same value all 50 times (ensures randomness)', () => {
    const firstCodename = generateCodename()
    let allSame = true
    for (let i = 0; i < 50; i++) {
      if (generateCodename() !== firstCodename) {
        allSame = false
        break
      }
    }
    expect(allSame).toBe(false)
  })
})
