export interface WeddingDateAnalysis {
  date: string
  numerologyNumber: number
  compatibility: string
  luckRating: number
  favorableColors: string[]
  favorableElements: string[]
  challenges: string[]
  recommendations: string[]
  lunarDate?: string
  chineseZodiacCompatibility?: string
}

export interface WeddingDateRequest {
  date: string
  brideDate?: string
  groomDate?: string
}

// Calculate the numerology number for a date (sum of all digits until single digit)
export function calculateDateNumerology(dateStr: string): number {
  // Format: YYYY-MM-DD
  const dateDigits = dateStr.replace(/-/g, "")
  let sum = 0

  for (const digit of dateDigits) {
    sum += Number.parseInt(digit)
  }

  // Reduce to a single digit (unless it's 11, 22, or 33 which are master numbers)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    let newSum = 0
    sum
      .toString()
      .split("")
      .forEach((digit) => {
        newSum += Number.parseInt(digit)
      })
    sum = newSum
  }

  return sum
}

// Get interpretation for wedding date number
export function getWeddingDateInterpretation(number: number): string {
  const interpretations: Record<number, string> = {
    1: "A date that signifies new beginnings and independence. Great for couples who value autonomy within their relationship.",
    2: "A date that emphasizes partnership and cooperation. Ideal for those who prioritize harmony and emotional connection.",
    3: "A date that brings creativity and joy. Perfect for expressive couples who want a marriage full of happiness and communication.",
    4: "A date that represents stability and foundation. Excellent for couples seeking to build a secure and lasting marriage.",
    5: "A date that embodies freedom and adventure. Great for couples who want an exciting and dynamic relationship.",
    6: "A date that symbolizes love and responsibility. Ideal for couples who value family and nurturing relationships.",
    7: "A date that represents spirituality and wisdom. Perfect for couples with deep spiritual connections and intellectual pursuits.",
    8: "A date that signifies abundance and power. Excellent for couples with ambitious goals and material aspirations.",
    9: "A date that embodies completion and humanitarianism. Great for couples who want to make a difference together.",
    11: "A master number that represents intuition and inspiration. Ideal for spiritually aware couples with a shared vision.",
    22: "A master number that symbolizes building and manifestation. Perfect for couples with grand dreams and practical abilities.",
    33: "A master number that represents healing and nurturing. Excellent for couples who want to serve others together.",
  }

  return interpretations[number] || "This date has unique energies that will shape your marriage in special ways."
}

// Get favorable colors based on numerology number
export function getFavorableColors(number: number): string[] {
  const colorMap: Record<number, string[]> = {
    1: ["Red", "Orange", "Yellow"],
    2: ["White", "Cream", "Silver"],
    3: ["Yellow", "Pink", "Light Blue"],
    4: ["Green", "Brown", "Blue"],
    5: ["Light Blue", "Silver", "Purple"],
    6: ["Pink", "Rose", "Turquoise"],
    7: ["Purple", "White", "Silver"],
    8: ["Gold", "Purple", "Red"],
    9: ["Purple", "White", "Gold"],
    11: ["White", "Silver", "Blue"],
    22: ["Gold", "Orange", "Brown"],
    33: ["Turquoise", "Pink", "White"],
  }

  return colorMap[number] || ["White", "Gold", "Silver"]
}

// Get favorable elements based on numerology number
export function getFavorableElements(number: number): string[] {
  const elementMap: Record<number, string[]> = {
    1: ["Fire", "Sun"],
    2: ["Water", "Moon"],
    3: ["Air", "Jupiter"],
    4: ["Earth", "Saturn"],
    5: ["Air", "Mercury"],
    6: ["Water", "Venus"],
    7: ["Air", "Neptune"],
    8: ["Earth", "Saturn"],
    9: ["Fire", "Mars"],
    11: ["Air", "Uranus"],
    22: ["Earth", "Neptune"],
    33: ["Water", "Venus"],
  }

  return elementMap[number] || ["All elements"]
}

// Calculate compatibility between wedding date and couple's birth dates
export function calculateDateCompatibility(weddingNumber: number, brideNumber?: number, groomNumber?: number): string {
  if (!brideNumber && !groomNumber) {
    return "No birth dates provided for compatibility analysis."
  }

  let compatibility = "Average"

  if (brideNumber && groomNumber) {
    const brideCompatibility = isCompatible(weddingNumber, brideNumber)
    const groomCompatibility = isCompatible(weddingNumber, groomNumber)

    if (brideCompatibility && groomCompatibility) {
      compatibility = "Excellent - This date harmonizes beautifully with both partners' energies."
    } else if (brideCompatibility || groomCompatibility) {
      compatibility = "Good - This date aligns well with one partner's energy and is acceptable for the other."
    } else {
      compatibility = "Challenging - Consider exploring other dates that may better align with your combined energies."
    }
  } else if (brideNumber) {
    compatibility = isCompatible(weddingNumber, brideNumber)
      ? "Good for the bride's energy"
      : "May present some challenges for the bride's energy"
  } else if (groomNumber) {
    compatibility = isCompatible(weddingNumber, groomNumber)
      ? "Good for the groom's energy"
      : "May present some challenges for the groom's energy"
  }

  return compatibility
}

// Helper function to check compatibility between numbers
function isCompatible(num1: number, num2: number): boolean {
  // Compatible pairs
  const compatiblePairs = [
    [1, 3],
    [1, 5],
    [1, 9],
    [2, 4],
    [2, 6],
    [2, 8],
    [3, 5],
    [3, 9],
    [4, 6],
    [4, 8],
    [5, 7],
    [5, 9],
    [6, 8],
    [7, 9],
  ]

  return compatiblePairs.some(
    (pair) => (pair[0] === num1 && pair[1] === num2) || (pair[0] === num2 && pair[1] === num1) || num1 === num2,
  )
}

// Calculate luck rating based on numerology number and other factors
export function calculateLuckRating(number: number): number {
  // Base rating from 1-10
  const baseRatings: Record<number, number> = {
    1: 7,
    2: 8,
    3: 9,
    4: 6,
    5: 7,
    6: 10,
    7: 7,
    8: 8,
    9: 9,
    11: 10,
    22: 10,
    33: 10,
  }

  return baseRatings[number] || 7
}

// Get challenges based on numerology number
export function getChallenges(number: number): string[] {
  const challengeMap: Record<number, string[]> = {
    1: ["May need to balance independence with togetherness", "Potential for ego conflicts"],
    2: ["May be overly sensitive at times", "Decision-making might be slow"],
    3: ["May need to focus on practical matters", "Could be scattered energies"],
    4: ["Might be too rigid or traditional", "Could lack spontaneity"],
    5: ["May struggle with commitment", "Could face restlessness"],
    6: ["Might become too responsible for others", "Potential for perfectionism"],
    7: ["May be too introspective", "Could be perceived as distant"],
    8: ["Might focus too much on material success", "Potential for power struggles"],
    9: ["May be too idealistic", "Could struggle with letting go"],
    11: ["Might face high expectations", "Could experience nervous tension"],
    22: ["May take on too much responsibility", "Potential for burnout"],
    33: ["Might sacrifice too much for others", "Could neglect self-care"],
  }

  return challengeMap[number] || ["May face unique challenges specific to your relationship"]
}

// Get recommendations based on numerology number
export function getRecommendations(number: number): string[] {
  const recommendationMap: Record<number, string[]> = {
    1: [
      "Incorporate red or gold accents in your ceremony",
      "Choose bold, unique wedding elements",
      "Consider a sunrise ceremony",
    ],
    2: [
      "Include moon symbols in your decor",
      "Choose a waterfront venue if possible",
      "Consider a sunset or evening ceremony",
    ],
    3: [
      "Incorporate creative expressions like music or dance",
      "Choose bright, cheerful colors",
      "Consider an outdoor garden ceremony",
    ],
    4: [
      "Include traditional elements that honor family",
      "Choose stable, earthy colors",
      "Consider a historic venue with character",
    ],
    5: [
      "Incorporate elements of travel or adventure",
      "Choose varied and dynamic decor",
      "Consider a destination wedding",
    ],
    6: [
      "Incorporate heart symbols and romantic elements",
      "Choose soft, harmonious colors",
      "Consider a venue with natural beauty",
    ],
    7: [
      "Incorporate spiritual or philosophical elements",
      "Choose serene, calming colors",
      "Consider a ceremony near water or in nature",
    ],
    8: [
      "Incorporate abundant flowers and luxurious elements",
      "Choose rich, opulent colors",
      "Consider a prestigious or significant venue",
    ],
    9: [
      "Incorporate humanitarian or charitable elements",
      "Choose purple or gold accents",
      "Consider a venue with cultural significance",
    ],
    11: [
      "Incorporate candles and illumination",
      "Choose white or silver accents",
      "Consider a ceremony that honors intuition and connection",
    ],
    22: [
      "Incorporate architectural elements",
      "Choose earthy tones with gold accents",
      "Consider a venue that feels grand and significant",
    ],
    33: [
      "Incorporate healing elements like crystals",
      "Choose pink or turquoise accents",
      "Consider a ceremony that honors love and service",
    ],
  }

  return recommendationMap[number] || ["Choose elements that feel personally meaningful to both of you"]
}

// Main function to analyze a wedding date
export function analyzeWeddingDate(request: WeddingDateRequest): WeddingDateAnalysis {
  const { date, brideDate, groomDate } = request

  // Calculate numerology number for the wedding date
  const numerologyNumber = calculateDateNumerology(date)

  // Calculate bride and groom numerology if birth dates provided
  const brideNumber = brideDate ? calculateDateNumerology(brideDate) : undefined
  const groomNumber = groomDate ? calculateDateNumerology(groomDate) : undefined

  // Get compatibility analysis
  const compatibility = calculateDateCompatibility(numerologyNumber, brideNumber, groomNumber)

  // Calculate luck rating
  const luckRating = calculateLuckRating(numerologyNumber)

  // Get favorable colors and elements
  const favorableColors = getFavorableColors(numerologyNumber)
  const favorableElements = getFavorableElements(numerologyNumber)

  // Get challenges and recommendations
  const challenges = getChallenges(numerologyNumber)
  const recommendations = getRecommendations(numerologyNumber)

  return {
    date,
    numerologyNumber,
    compatibility,
    luckRating,
    favorableColors,
    favorableElements,
    challenges,
    recommendations,
  }
}
