import App from '@/App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { useAuth } from '@/scripts/api'
import { useStore } from '@/scripts/store'

const app = createApp(App)

registerPlugins(app)

const { user } = useAuth()
const store = useStore()

app.config.globalProperties.$user = user
app.config.globalProperties.$store = store

app.mount('#app')