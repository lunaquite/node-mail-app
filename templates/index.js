/**
 * Template signature
 * @param {string} link - app address is required
 * @param {Object} params - optional user's params for templates
 */

export const userConfirmation = (link, { name, token }) => ({
  subject: 'Регистрация в системе',
  body: {
    greeting: 'Здравствуйте,',
    signature: 'C уважением',
    name: name,
    intro: 'Вы оставили заявку на регистрацию в нашей системе',
    action: {
      instructions: `Администрации необходимо проверить правильность информации в вашем проифле,
       перейдите по ссылке для подверждения почты и прохождения первого этапа верификации `,
      button: {
        text: 'Подтвердить почту',
        link: `${link}/email-confirmation/${token}`
      }
    }
  }
})

export const recoveryPassword = (link, { name, token }) => ({
  subject: 'Восстановление пароля',
  body: {
    greeting: 'Здравствуйте,',
    signature: 'C уважением',
    name: name,
    intro: 'Вы оставили заявку на восстановление пароля',
    action: {
      instructions: `Для завершения операции перейдите по ссылке`,
      button: {
        text: 'Изменить пароль',
        link: `${link}/password-recovery/${token}`
      }
    }
  }
})

export const adminRegistration = (link, { token }) => ({
  subject: 'Доступ к администрированию',
  body: {
    signature: 'C уважением',
    intro: 'Вам открыт доступ к администрированию',
    action: {
      instructions: `Для регистрации в системе перейдите по ссылке`,
      button: {
        text: 'Изменить пароль',
        link: `${link}/registration-by-invite/${token}`
      }
    }
  }
})
