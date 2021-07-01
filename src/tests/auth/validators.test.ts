import {
  mailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from 'services/auth/validators'
import {t} from 'subscribers/i18next'
import {
  NAME_MAXLENGTH,
  NAME_MINLENGTH,
  PASS_MAXLENGTH,
  PASS_MINlENGTH,
} from '~types/auth/user'

describe('user validators errors', () => {
  // phone validation tests
  describe('phone-validator error', () => {
    // if phone pattern is not valid
    it('should be phone format is not valid', async () => {
      const error = await phoneValidator('12345678901')
      expect(error).toBe(t('errors:user.phone_number'))
    })

    // if phone is empty
    it('should be phone is required', async () => {
      const error = await phoneValidator('')
      expect(error).toBe(t('errors:user.phone_required'))
    })

    // if phone is empty with white spaces
    it('should be phone is required', async () => {
      const error = await phoneValidator('  ')
      expect(error).toBe(t('errors:user.phone_required'))
    })

    // if phone is valid
    it('should be phone is valid', async () => {
      const error = await phoneValidator('09124690677')
      expect(error).toBeNull()
    })
  })

  // name validation tests
  describe('name-validator error', () => {
    // if name is empty
    it('should be name is required', async () => {
      const error = await nameValidator('')
      expect(error).toBe(t('errors:user.name_required'))
    })

    // if name is empty with white spaces
    it('should be name is required', async () => {
      const error = await nameValidator('  ')
      expect(error).toBe(t('errors:user.name_required'))
    })

    // if name pattern is not valid
    it('should be name format is not valid', async () => {
      const error = await nameValidator('12afs')
      expect(error).toBe(t('errors:user.name'))
    })

    // if name is less than min chars
    it(`should be name should be min ${NAME_MINLENGTH} chars`, async () => {
      const name = Array(NAME_MINLENGTH).join('a')
      const error = await nameValidator(name)
      expect(error).toBe(
        t('errors:user.name_minLength', {number: NAME_MINLENGTH})
      )
    })

    // if name is more than max chars
    it(`should be name should be max ${NAME_MAXLENGTH} chars`, async () => {
      const name = new Array(NAME_MAXLENGTH + 2).join('a')
      const error = await nameValidator(name)
      expect(error).toBe(
        t('errors:user.name_maxLength', {number: NAME_MAXLENGTH})
      )
    })

    // english name is valid
    it('should be english name is valid', async () => {
      const error = await nameValidator('amir askari')
      expect(error).toBeNull()
    })

    // persian name is valid
    it('should be persian name is valid', async () => {
      const error = await nameValidator('امیر حسین')
      expect(error).toBeNull()
    })
  })

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
        t('errors:user.password_minLength', {number: PASS_MINlENGTH})
      )
    })

    // if password is more than max length
    it(`should be password should be min ${PASS_MAXLENGTH} chars`, async () => {
      const pass = Array(PASS_MAXLENGTH + 2).join('a')
      const error = await passwordValidator(pass)
      expect(error).toBe(
        t('errors:user.password_maxLength', {number: PASS_MAXLENGTH})
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
  })

  // mail validation tests
  describe('mail-validator error', () => {
    // if mail is empty
    it('should be mail is required', async () => {
      const error = await mailValidator('')
      expect(error).toBe(t('errors:user.mail_required'))
    })

    // if mail is empty with white spaces
    it('should be mail is required', async () => {
      const error = await mailValidator('  ')
      expect(error).toBe(t('errors:user.mail_required'))
    })

    // if mail format is not valid
    it('should be mail format is not valid', async () => {
      const error = await mailValidator('amir.com')
      expect(error).toBe(t('errors:user.mail'))
    })

    // if mail is valid
    it('should be mail is valid', async () => {
      const error = await mailValidator('amir@amir.com')
      expect(error).toBeNull()
    })
  })
})
