import { passwordValidator } from '~src/services/userValidator'
import { t } from 'subscribers/i18next'
import { PASS_MAXLENGTH, PASS_MINlENGTH } from '~types/auth/user'

describe('user validators errors', () => {
  // password validation tests
  describe('password-validator error', () => {
    // if password format is not valid
    it('should be password format is not valid', async () => {
      const error = await passwordValidator('[]   ')
      expect(error).toBe(t('errors:user.password'))
    })

    // if password is less than min length
    it(`should be password should be min ${PASS_MINlENGTH} chars`, async () => {
      const pass = Array(PASS_MINlENGTH).join('a')
      const error = await passwordValidator(pass)
      expect(error).toBe(
        t('errors:user.password_minLength', { number: PASS_MINlENGTH })
      )
    })

    // if password is more than max length
    it(`should be password should be min ${PASS_MAXLENGTH} chars`, async () => {
      const pass = Array(PASS_MAXLENGTH + 2).join('a')
      const error = await passwordValidator(pass)
      expect(error).toBe(
        t('errors:user.password_maxLength', { number: PASS_MAXLENGTH })
      )
    })

    // if password is empty
    it('should be password is required', async () => {
      const error = await passwordValidator('')
      expect(error).toBe(t('errors:user.password_required'))
    })

    // if password is valid
    it('should be password is valid', async () => {
      const error = await passwordValidator('Amir123@#$%^.*&!~')
      expect(error).toBeNull()
    })

    // if password is valid
    it('should be password is valid', async () => {
      const error = await passwordValidator('123456')
      expect(error).toBeNull()
    })
  })
})
