const campaignData = {
  meta: {
    name: 'Tony James Marathon for MS',
    username: 'tonyjames',
    tags: ['ms', 'multiple', 'schlerosis', 'marathon', 'running', 'athletics'],
    currency: 'gbp'
  },

  stats: {
    goal: 3500,
    current: 2945,
    progress: 84
  },

  donations: [
    {
      user: {
        name: 'John',
        username: 'johnny_p',
        image: 'http://lorempixel.com/100/100/people/1'
      },
      donation: {
        id: 0,
        quantity: null,
        time: null
      }
    },

    {
      user: {
        name: 'Jane',
        username: 'jane08',
        image: 'http://lorempixel.com/100/100/people/2'
      },
      donation: {
        id: 1,
        quantity: 45,
        time: null
      }
    },

    {
      user: {
        name: 'Kia',
        username: 'xerox_hero',
        image: 'http://lorempixel.com/100/100/people/3'
      },
      donation: {
        id: 2,
        quantity: 3,
        time: null
      }
    },

    {
      user: {
        name: 'Damien',
        username: '666_666',
        image: 'http://lorempixel.com/100/100/people/4'
      },
      donation: {
        id: 3,
        quantity: 25,
        time: null
      }
    },

    {
      user: {
        name: 'Thom',
        username: 'yorkshire_pudding',
        image: 'http://lorempixel.com/100/100/people/5'
      },
      donation: {
        id: 4,
        quantity: 9,
        time: null
      }
    },

    {
      user: {
        name: 'Anders',
        username: 'svierj',
        image: 'http://lorempixel.com/100/100/people/6'
      },
      donation: {
        id: 5,
        quantity: 13.40,
        time: null
      }
    }
  ]
}

export { campaignData };
