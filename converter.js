// DOM Elements
const dropdowns = document.querySelectorAll(".dropdown select")
const fromCurr = document.querySelector("#from-currency")
const toCurr = document.querySelector("#to-currency")
const amountInput = document.querySelector("#amount-input")
const exchangeRateText = document.querySelector("#exchange-rate")
const convertButton = document.querySelector("#convert-button")
const loadingIndicator = document.querySelector("#loading-indicator")
const swapButton = document.querySelector("#swap-button")
const themeToggle = document.querySelector("#theme-toggle")

// Initialize theme from localStorage or default to light
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'
  }

  // Initialize currency dropdowns
  initializeCurrencyDropdowns()

  // Set initial exchange rate
  updateExchangeRate()
})

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'
    localStorage.setItem("theme", "dark")
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'
    localStorage.setItem("theme", "light")
  }
})

// Helper function to get country name from currency code
function getCountryName(currCode) {
  for (const currName in countryName) {
    if (currName === countryList[currCode]) {
      const name = countryName[currName]
      const name1 = name.split(",")
      return name1[0]
    }
  }
  return currCode
}

// Initialize currency dropdowns with options
function initializeCurrencyDropdowns() {
  for (const select of dropdowns) {
    for (const currCode in countryList) {
      const newOption = document.createElement("option")
      const countryName = getCountryName(currCode)
      newOption.innerText = `${currCode} - ${countryName}`
      newOption.value = currCode

      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected"
      }
      if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected"
      }

      select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target)
      updateExchangeRate()
    })
  }
}

// Update flag image when currency is changed
const updateFlag = (element) => {
  const currCode = element.value
  const countryCode = countryList[currCode]
  const newSource = `https://flagsapi.com/${countryCode}/flat/64.png`
  const img = element.parentElement.querySelector("img")
  img.src = newSource
  img.alt = `${countryCode} flag`
}

// Swap currencies
swapButton.addEventListener("click", () => {
  const tempCurr = fromCurr.value
  fromCurr.value = toCurr.value
  toCurr.value = tempCurr

  // Update flags
  updateFlag(fromCurr)
  updateFlag(toCurr)

  // Update exchange rate
  updateExchangeRate()

  // Add animation to swap button
  swapButton.classList.add("active")
  setTimeout(() => {
    swapButton.classList.remove("active")
  }, 300)
})

// Update exchange rate display
function updateExchangeRate() {
  const fromCurrency = fromCurr.value
  const toCurrency = toCurr.value

  // Get exchange rates from currList (assuming it's defined in currency.js)
  const fromRate = currList[fromCurrency] || 1
  const toRate = currList[toCurrency] || 1

  // Calculate the exchange rate
  const rate = toRate / fromRate

  // Format the rate with appropriate decimal places
  const formattedRate = rate.toFixed(rate >= 1 ? 2 : 4)

  // Update the exchange rate text
  exchangeRateText.textContent = `1 ${fromCurrency} = ${formattedRate} ${toCurrency}`

  // Add pulse animation
  exchangeRateText.classList.add("pulse")
  setTimeout(() => {
    exchangeRateText.classList.remove("pulse")
  }, 500)

  // If amount is entered, calculate and show the converted amount
  if (amountInput.value) {
    calculateConversion()
  }
}

// Calculate and display conversion
function calculateConversion() {
  const amount = Number.parseFloat(amountInput.value)
  if (isNaN(amount) || amount <= 0) {
    amountInput.value = 1
    return
  }

  // Show loading indicator
  loadingIndicator.style.display = "inline-block"
  convertButton.querySelector("span:last-child").textContent = "Converting..."

  // Simulate API call delay
  setTimeout(() => {
    const fromCurrency = fromCurr.value
    const toCurrency = toCurr.value

    // Get exchange rates
    const fromRate = currList[fromCurrency] || 1
    const toRate = currList[toCurrency] || 1

    // Calculate converted amount
    const convertedAmount = (amount / fromRate) * toRate

    // Format based on amount size
    const formattedAmount = convertedAmount >= 1 ? convertedAmount.toFixed(2) : convertedAmount.toFixed(4)

    // Update exchange rate text with conversion result
    exchangeRateText.textContent = `${amount} ${fromCurrency} = ${formattedAmount} ${toCurrency}`
    exchangeRateText.classList.add("pulse")

    // Hide loading indicator
    loadingIndicator.style.display = "none"
    convertButton.querySelector("span:last-child").textContent = "Get Exchange Rate"

    setTimeout(() => {
      exchangeRateText.classList.remove("pulse")
    }, 500)
  }, 600) // Simulate network delay
}

// Form submission handler
document.querySelector("#converter-form").addEventListener("submit", (evt) => {
  evt.preventDefault()
  calculateConversion()
})

// Update exchange rate when amount input changes
amountInput.addEventListener("input", () => {
  // Clear any non-numeric values
  amountInput.value = amountInput.value.replace(/[^0-9.]/g, "")
})

// Add input validation
amountInput.addEventListener("blur", () => {
  const amount = Number.parseFloat(amountInput.value)
  if (isNaN(amount) || amount <= 0) {
    amountInput.value = 1
  }
})

// Mock data for countryList and currList if not provided
// This ensures the code works even without the external JS files
if (typeof countryList === "undefined") {
  const countryList = {
    USD: "US",
    EUR: "EU",
    GBP: "GB",
    INR: "IN",
    JPY: "JP",
    CAD: "CA",
    AUD: "AU",
  }
  window.countryList = countryList
}

if (typeof currList === "undefined") {
  const currList = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 149.56,
    CAD: 1.35,
    AUD: 1.52,
  }
  window.currList = currList
}

if (typeof countryName === "undefined") {
  const countryName = {
    US: "United States",
    EU: "European Union",
    GB: "United Kingdom",
    IN: "India",
    JP: "Japan",
    CA: "Canada",
    AU: "Australia",
  }
  window.countryName = countryName
}
