import config from 'config'
export const send_verify_code = `https://api.kavenegar.com/v1/${config.get(
  'services.kavenegar.api_key'
)}/verify/lookup.json`
