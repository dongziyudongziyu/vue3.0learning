
const path_ = '/user/';

const ctx = require.context(`@/views/user/`, true, /.vue$/);

const routes = [];
const reg = /\/(.*)\.vue$/;
ctx.keys().forEach(key => {
    const component = ctx(key).default;
    console.log('component_', component);
    const isLazyload = component.lazyload == false ? false : true;
    routes.push({
        path: `${path_}${component.customPath ||reg.exec(key)[1].trim()}`,
        name:component.name || component.customPath || reg.exec(key)[1].trim(), 
        hide:component.hide || true,
        meta: {
            title: component.name || component.customPath || reg.exec(key)[1].trim(),
            icon: 'account-circle-fill',
        },
        children: [],
        component: isLazyload ? ()=>import(`@/views${path_}${key.replace('./', '')}`) : component
    });
});

module.exports = routes