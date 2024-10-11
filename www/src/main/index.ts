import {createApp} from 'vue'
import Main from './index.vue'

async function bootstrap() {
    const app = createApp(Main)
    app.mount('#app')
    return app
}

bootstrap().then(() => {
    console.log("bootstrap")
})
