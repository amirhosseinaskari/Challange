import Joi from 'joi'
import { t } from 'subscribers/i18next'

// deposit validator
export const depositValidator = async (deposit: string) => {
  const schema = Joi.object({
    mail: Joi.string()
      .required()
      .regex(/(5|10|20|50|100)/)
      .messages({
        'any.required': t('errors:user.deposit_required'),
        'string.pattern.base': t('errors:user.deposit'),
        'string.empty': t('errors:user.deposit_required'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ deposit: deposit.trim() })
    return details[0]?.message
  } catch (error) {
    return null
  }
}
