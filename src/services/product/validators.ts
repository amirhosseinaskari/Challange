import Joi from 'joi'
import { t } from 'subscribers/i18next'
import { TITLE_MAXLENGTH, TITLE_MINLENGTH } from '~src/types/product'

export const titleValidator = async (title?: string | null) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .min(TITLE_MINLENGTH)
      .max(TITLE_MAXLENGTH)
      .messages({
        'any.required': t('errors:product.title_required'),
        'string.empty': t('errors:product.title_required'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ title: title?.trim() })
    return details[0]?.message
  } catch (error) {
    return null
  }
}

export const rateValidator = async (rate: number) => {
  const schema = Joi.object({
    rate: Joi.number()
      .min(0)
      .max(10)
      .messages({
        'number.min': t('errors:product.rate'),
        'number.max': t('errors:product.rate'),
      }),
  })

  try {
    const {
      error: { details = [] },
    } = schema.validate({ rate })
    return details[0]?.message
  } catch (error) {
    return null
  }
}
