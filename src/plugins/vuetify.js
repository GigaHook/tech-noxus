import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

import { createVuetify } from 'vuetify'

const formFieldDefaults = {
  variant: "outlined",
  density: "comfortable",
  color: "amber-accent-3",
}

export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  defaults: {
    VTextField: formFieldDefaults,
    VSelect: formFieldDefaults,
    VTextarea: formFieldDefaults,
    VFileInput: formFieldDefaults,
    VCard: {
      elevation: 6,
    }
  },
})
