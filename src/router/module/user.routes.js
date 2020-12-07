const path_ = '/user/'

const ctx = require.context(`@/views/user/`, true, /.vue$/)

const routes = []
const reg = /\/(.*)\.vue$/
ctx.keys().forEach((key) => {
  const component = ctx(key).default
  console.log('component_', component)
  const isLazyload = component.lazyload == false ? false : true
  const _path = `${path_}${component.customPath || reg.exec(key)[1].trim()}`
  const _component = isLazyload
    ? () => import(`@/views${path_}${key.replace('./', '')}`)
    : component
  const _name =
    component.name || component.customPath || reg.exec(key)[1].trim()

  const _currentRoute = {
    path: _path,
    name: _name,
    hidden: component.isMenu || false,
    meta: {
      title: component.title || _name,
      icon: component.icon || 'account-circle-fill',
      affix: component.affix || false,
    },
    children: [
      // _component
    ],
    component: _component,
    isLayout: component.isLayout || true,
    // fullPath: _path,
    // redirect: _path,
  }

  _currentRoute.children.push({
    path: _path,
    name: _name,
    meta: {
      title: component.title || _name,
      icon: component.icon || 'account-circle-fill',
      affix: component.affix || false,
    },
    component: _component,
  })

  routes.push(_currentRoute)
})

module.exports = routes
