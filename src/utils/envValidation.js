const requiredEnvVars = [
  'VITE_API_KEY',
  'VITE_AUTH_DOMAIN',
  'VITE_PROJECT_ID',
  'VITE_STORAGE_BUCKET',
  'VITE_MESSAGING_SENDER_ID',
  'VITE_APP_ID',
  'VITE_RECAPTCHA_SITE_KEY',
  'VITE_FORMSPREE_FORM_ID'
]

const missingEnvVars = requiredEnvVars.filter(key => !import.meta.env[key])

if (missingEnvVars.length > 0 && import.meta.env.MODE === 'production') {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
  console.error('Please configure these in your Vercel project settings.')
}

if (missingEnvVars.length > 0 && import.meta.env.MODE !== 'production') {
  console.warn(`Missing environment variables (dev mode): ${missingEnvVars.join(', ')}`)
}

export const checkEnvVariables = () => {
  return {
    allPresent: missingEnvVars.length === 0,
    missingVars: missingEnvVars
  }
}
