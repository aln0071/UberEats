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
    location: {
      country: {
        regex: /.+/,
        message: 'Country required',
      },
      state: {
        regex: /.+/,
        message: 'State required',
      },
      citycode: {
        regex: /.+/,
        message: 'City required',
      },
      location: {
        regex: /[a-zA-Z0-9]+[a-zA-Z0-9, ]*/,
        message: 'Invalid address',
      },
      zip: {
        regex: /[0-9]{5,6}/,
        message: 'Invalid zip code',
      },
    },
  },
  profile: {
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
      country: {
        regex: /.+/,
        message: 'Country required',
      },
      state: {
        regex: /.+/,
        message: 'State required',
      },
      citycode: {
        regex: /.+/,
        message: 'City required',
      },
      location: {
        regex: /[a-zA-Z0-9]+[a-zA-Z0-9, ]*/,
        message: 'Invalid address',
      },
      zip: {
        regex: /[0-9]{5,6}/,
        message: 'Invalid zip code',
      },
    },
  },
  dishes: {
    dishname: {
      regex: /[a-zA-Z ]+/,
      message: 'Invalid dish name',
    },
    // price: {
    //   regex: /^[1-9][0-9]*$/,
    //   message: 'Invalid price',
    // },
  },
  placeOrder: {
    location: {
      regex: /[a-zA-Z0-9]+[a-zA-Z0-9, ]*/,
      message: 'Invalid address',
    },
    zip: {
      regex: /[0-9]{5,6}/,
      message: 'Invalid zip code',
    },
    citycode: {
      regex: /.+/,
      message: 'City required',
    },
  },
};
