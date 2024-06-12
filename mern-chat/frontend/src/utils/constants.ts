

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL
export const ENVIRONMENT_PROD = !(process.env.NODE_ENV === "development")
export const APP_NAME="Mern Chat"
export const VALIDITY_TYPES = [
  { key: "Day", value: "DAY" },
  { key: "Month", value: "MONTH" },
  { key: "Week", value: "WEEK" },
  { key: "Year", value: "YEAR" }
];

  