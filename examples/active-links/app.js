import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div><h2>Home</h2></div>' }
const About = { template: '<div><h2>About</h2></div>' }

const Users = {
  template: `
    <div>
      <h2>Users</h2>
      <router-view></router-view>
    </div>
  `,
  // 给组件的路由的钩子函数
  beforeRouteEnter(...args) {
    console.log(args)
  }
}

const User = { template: '<div>{{ $route.params.username }}</div>' }

const Gallery = {
  template: `
    <div>
      <h2>Gallery</h2>
      <router-view></router-view>
    </div>
  `
}

const Image = { template: '<div>{{ $route.params.imageId }}</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior(...args) {
    return {
      selector: '#',
      offset: {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      component: Home
    },
    { path: '/users', component: About }
  ]
})

router.addRoutes([])

router.afterEach((...args) => {
  // console.log(args);
})

router.beforeEach(() => {
  //
})

new Vue({
  router,
  methods: {
    nav() {
      this.$router.push({ path: 'users' })
    }
  },
  template: `
    <div id="app">
      <h1>Active Links</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/" exact>/ (exact match)</router-link></li>

        <li @click="nav">/users</li>
        <li><router-link to="/users" exact>/users (exact match)</router-link></li>

        <li><router-link to="/users/evan">/users/evan</router-link></li>
        <li><router-link to="/users/evan#foo">/users/evan#foo</router-link></li>
        <li>
          <router-link :to="{ path: '/users/evan', query: { foo: 'bar' }}">
            /users/evan?foo=bar
          </router-link>
        </li>
        <li><!-- #635 -->
          <router-link :to="{ name: 'user', params: { username: 'evan' }, query: { foo: 'bar' }}" exact>
            /users/evan?foo=bar (named view + exact match)
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/users/evan', query: { foo: 'bar', baz: 'qux' }}">
            /users/evan?foo=bar&baz=qux
          </router-link>
        </li>

        <li><router-link to="/about">/about</router-link></li>

        <router-link tag="li" to="/about">
          <a>/about (active class on outer element)</a>
        </router-link>

        <li><router-link to="/gallery">/gallery (redirect to /gallery/image1)</router-link></li>
        <li><router-link :to="{ name: 'gallery' }">/gallery named link (redirect to /gallery/image1)</router-link></li>
        <li><router-link :to="{ name: 'image', params: {imageId: 'image2'} }">/gallery/image2</router-link></li>
        <li><router-link :to="{ name: 'image', params: {imageId: 'image1'} }">/gallery/image1</router-link></li>
        <li><router-link to="/redirect-gallery">/redirect-gallery (redirect to /gallery)</router-link></li>
        <li><router-link :to="{ name: 'redirect-gallery' }">/redirect-gallery named (redirect to /gallery)</router-link></li>
        <li><router-link to="/redirect-image">/redirect-image (redirect to /gallery/image1)</router-link></li>
        <li><router-link :to="{ name: 'redirect-image' }" >/redirect-image named (redirect to /gallery/image1)</router-link></li>

        <li><router-link to="/users?one" exact-path>/users?one</router-link></li>
        <li><router-link to="/users?two" exact-path>/users?two</router-link></li>
        <li><router-link to="/users/nested?two" exact-path>/users/nested?two</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
