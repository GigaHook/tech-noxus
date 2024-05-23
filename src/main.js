import App from '@/App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { useAuth } from '@/scripts/api'
import { useState } from '@/scripts/store'

const app = createApp(App)

registerPlugins(app)

const { user } = useAuth()
app.config.globalProperties.$user = user

const state = useState()
app.config.globalProperties.$state = state

app.mount('#app')
