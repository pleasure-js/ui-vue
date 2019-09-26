const jwtDecode = require('jwt-decode')
const CookieParser = require('cookieparser')
const Cookies = require('cookies')

module.exports = function (req, res, next) {
  let user = null
  req.$pleasure = {}
  // console.log(`load session`, { req, CookieParser })
  if (req.headers.cookie && CookieParser) {
    const cookies = CookieParser.parse(req.headers.cookie)
    // console.log(`cookie`, Object.keys(cookies))
    if (cookies.accessToken) {
      try {
        user = jwtDecode(cookies.accessToken)
        // console.log(user.sessionExpires, Date.now())
        if (user.sessionExpires > Date.now()) {
          console.log({ user }, req.url)
          Object.assign(req.$pleasure, { user, cookies })
        } else {
          // console.log(`session expired`, user)
          const reqCookies = new Cookies(req, res, {
            httpOnly: false,
            secure: false
          })
          reqCookies.set('accessToken', null)
        }
      } catch (err) {
        // console.log(`juhmmm...`, err)
        // No valid cookie found
      }
    }
  }
  // commit('setUser', user)
  next()
}
