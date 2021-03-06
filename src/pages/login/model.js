import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { loginUser } = api

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  namespace: 'login',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/banpu-mock')
          else history.push(from)
        } else {
          history.push('/banpu-mock')
        }
      } else {
        throw data
      }
    },
  },
}
