export default {
  async install(app) {
    const ymaps3Vue = await ymaps3.import('@yandex/ymaps3-vuefy')
    const vuefy = ymaps3Vue.vuefy.bindTo(app)
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = vuefy.module(ymaps3Vue)

    app.component(YMap)
    app.component(YMapDefaultSchemeLayer)
    app.component(YMapDefaultFeaturesLayer)
    app.component(YMapMarker)
  }
}