import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accounts: []
  },
  mutations: {
    setAccounts (state, data) { state.accounts = data },
    setNewBalance (state, data) { state.accounts[data.index].balance = data.newbalance }
  },
  actions: {
    loadData (context) {
      request('http://localhost:8086/api/accounts', 'get', null, function (r) {
        let d = {}
        try {
          d = JSON.parse(r)
        } catch (err) {
          console.log(err)
          return
        }
        context.commit('setAccounts', d)
      }
      )
    },
    updateBalance (context, p) {
      let index = p.index
      let newbalance = p.newbalance
      context.commit('setNewBalance', { index, newbalance })
    }
  }
})

// The MIT License (MIT)

// Copyright © 2020 Oligoden Pty(Ltd) <info@oligoden.com>, South Africa

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// end

function request (action, method, params, callback) {
  var x = new XMLHttpRequest()
  x.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(this.responseText)
    }
  }
  switch (method.toLowerCase()) {
    case 'get':
      x.open(method, action, true)
      x.send()
      break
    case 'post':
      x.open(method, action, true)
      x.send()
      break
    case 'put':
      x.open(method, action, true)
      x.send()
      break
    case 'delete':
      x.open(method, action, true)
      x.send()
      break
  }
}
