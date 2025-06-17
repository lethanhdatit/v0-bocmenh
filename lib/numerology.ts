// Numerology calculation utilities

export interface NumerologyResult {
  lifePathNumber: number
  destinyNumber: number
  soulUrgeNumber: number
  personalityNumber: number
  birthdayNumber: number
  maturityNumber: number
  luckyNumbers: number[]
  challenges: {
    first: number
    second: number
    third: number
    fourth: number
  }
  pinnacles: {
    first: { number: number; period: string }
    second: { number: number; period: string }
    third: { number: number; period: string }
    fourth: { number: number; period: string }
  }
  personalYear: number
  personalMonth: number
  personalDay: number
}

// Letter to number mapping for Pythagorean system
const letterValues: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
}

// Vowels for Soul Urge calculation
const vowels = ["A", "E", "I", "O", "U", "Y"]

// Consonants for Personality calculation
const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]

export function reduceToSingleDigit(num: number): number {
  // Master numbers (11, 22, 33) are not reduced
  if (num === 11 || num === 22 || num === 33) {
    return num
  }

  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
  }

  return num
}

export function calculateLifePathNumber(birthDate: string): number {
  const date = new Date(birthDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const daySum = reduceToSingleDigit(day)
  const monthSum = reduceToSingleDigit(month)
  const yearSum = reduceToSingleDigit(year)

  return reduceToSingleDigit(daySum + monthSum + yearSum)
}

export function calculateDestinyNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    sum += letterValues[letter] || 0
  }

  return reduceToSingleDigit(sum)
}

export function calculateSoulUrgeNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    if (vowels.includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

export function calculatePersonalityNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    if (consonants.includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

export function calculateBirthdayNumber(birthDate: string): number {
  const date = new Date(birthDate)
  return reduceToSingleDigit(date.getDate())
}

export function calculateMaturityNumber(lifePathNumber: number, destinyNumber: number): number {
  return reduceToSingleDigit(lifePathNumber + destinyNumber)
}

export function calculateChallenges(birthDate: string): {
  first: number
  second: number
  third: number
  fourth: number
} {
  const date = new Date(birthDate)
  const day = reduceToSingleDigit(date.getDate())
  const month = reduceToSingleDigit(date.getMonth() + 1)
  const year = reduceToSingleDigit(date.getFullYear())

  const first = Math.abs(month - day)
  const second = Math.abs(day - year)
  const third = Math.abs(first - second)
  const fourth = Math.abs(month - year)

  return { first, second, third, fourth }
}

export function calculatePinnacles(birthDate: string): {
  first: { number: number; period: string }
  second: { number: number; period: string }
  third: { number: number; period: string }
  fourth: { number: number; period: string }
} {
  const date = new Date(birthDate)
  const day = reduceToSingleDigit(date.getDate())
  const month = reduceToSingleDigit(date.getMonth() + 1)
  const year = reduceToSingleDigit(date.getFullYear())

  const lifePathNumber = calculateLifePathNumber(birthDate)
  const currentYear = new Date().getFullYear()
  const birthYear = date.getFullYear()
  const age = currentYear - birthYear

  const firstPinnacleEnd = 36 - lifePathNumber
  const secondPinnacleEnd = firstPinnacleEnd + 9
  const thirdPinnacleEnd = secondPinnacleEnd + 9

  return {
    first: {
      number: reduceToSingleDigit(month + day),
      period: `Từ sinh đến ${firstPinnacleEnd} tuổi`,
    },
    second: {
      number: reduceToSingleDigit(day + year),
      period: `Từ ${firstPinnacleEnd + 1} đến ${secondPinnacleEnd} tuổi`,
    },
    third: {
      number: reduceToSingleDigit(reduceToSingleDigit(month + day) + reduceToSingleDigit(day + year)),
      period: `Từ ${secondPinnacleEnd + 1} đến ${thirdPinnacleEnd} tuổi`,
    },
    fourth: {
      number: reduceToSingleDigit(month + year),
      period: `Từ ${thirdPinnacleEnd + 1} tuổi trở đi`,
    },
  }
}

export function calculatePersonalYear(birthDate: string, targetYear?: number): number {
  const date = new Date(birthDate)
  const day = reduceToSingleDigit(date.getDate())
  const month = reduceToSingleDigit(date.getMonth() + 1)
  const year = reduceToSingleDigit(targetYear || new Date().getFullYear())

  return reduceToSingleDigit(day + month + year)
}

export function calculatePersonalMonth(birthDate: string, targetMonth?: number, targetYear?: number): number {
  const personalYear = calculatePersonalYear(birthDate, targetYear)
  const month = reduceToSingleDigit(targetMonth || new Date().getMonth() + 1)

  return reduceToSingleDigit(personalYear + month)
}

export function calculatePersonalDay(birthDate: string, targetDate?: Date): number {
  const date = targetDate || new Date()
  const personalMonth = calculatePersonalMonth(birthDate, date.getMonth() + 1, date.getFullYear())
  const day = reduceToSingleDigit(date.getDate())

  return reduceToSingleDigit(personalMonth + day)
}

export function generateLuckyNumbers(lifePathNumber: number, destinyNumber: number, birthdayNumber: number): number[] {
  const baseNumbers = [lifePathNumber, destinyNumber, birthdayNumber]
  const luckyNumbers: Set<number> = new Set()

  // Add base numbers
  baseNumbers.forEach((num) => luckyNumbers.add(num))

  // Add combinations
  luckyNumbers.add(reduceToSingleDigit(lifePathNumber + destinyNumber))
  luckyNumbers.add(reduceToSingleDigit(lifePathNumber + birthdayNumber))
  luckyNumbers.add(reduceToSingleDigit(destinyNumber + birthdayNumber))

  // Add multiples (up to 99)
  baseNumbers.forEach((num) => {
    if (num <= 9) {
      luckyNumbers.add(num * 11) // 11, 22, 33, etc.
      if (num * 11 <= 99) luckyNumbers.add(num * 11)
    }
  })

  return Array.from(luckyNumbers)
    .sort((a, b) => a - b)
    .slice(0, 8)
}

export function calculateCompleteNumerology(fullName: string, birthDate: string): NumerologyResult {
  const lifePathNumber = calculateLifePathNumber(birthDate)
  const destinyNumber = calculateDestinyNumber(fullName)
  const soulUrgeNumber = calculateSoulUrgeNumber(fullName)
  const personalityNumber = calculatePersonalityNumber(fullName)
  const birthdayNumber = calculateBirthdayNumber(birthDate)
  const maturityNumber = calculateMaturityNumber(lifePathNumber, destinyNumber)
  const challenges = calculateChallenges(birthDate)
  const pinnacles = calculatePinnacles(birthDate)
  const personalYear = calculatePersonalYear(birthDate)
  const personalMonth = calculatePersonalMonth(birthDate)
  const personalDay = calculatePersonalDay(birthDate)
  const luckyNumbers = generateLuckyNumbers(lifePathNumber, destinyNumber, birthdayNumber)

  return {
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    birthdayNumber,
    maturityNumber,
    luckyNumbers,
    challenges,
    pinnacles,
    personalYear,
    personalMonth,
    personalDay,
  }
}

// Calculate Kua number for Feng Shui
export function calculateKuaNumber(birthYear: number, gender: "male" | "female"): number {
  // Sum the last two digits of birth year
  const lastTwoDigits = birthYear % 100
  let sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10)

  // Reduce to single digit
  while (sum > 9) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }

  let kuaNumber: number

  if (gender === "male") {
    kuaNumber = 10 - sum
    if (kuaNumber === 10) kuaNumber = 1
    if (kuaNumber === 5) kuaNumber = 2 // Male Kua 5 becomes 2
  } else {
    kuaNumber = sum + 5
    if (kuaNumber > 9) kuaNumber -= 9
    if (kuaNumber === 5) kuaNumber = 8 // Female Kua 5 becomes 8
  }

  return kuaNumber
}
