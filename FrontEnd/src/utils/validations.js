export const isValid = (regex, value) => new RegExp(regex).test(value);

export const validations = {
  register: {
    customer: {
      name: {
        regex: /[a-zA-Z]{1,}[a-zA-Z ]{1,20}/,
        message: 'Invalid name.',
      },
      email: {
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email.',
      },
      password: {
        regex: /[a-zA-Z0-9]{5,12}/,
        message: 'Invalid password.',
      },
    },
    restaurant: {},
  },
};
