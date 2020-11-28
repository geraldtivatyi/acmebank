<template>
  <div class="hello">
    <h2>Accounts List</h2>
    <div class="labels">
      <h3>Account Number</h3>
      <h3>Account Type</h3>
      <h3>Balance</h3>
    </div>
    <div class="list" v-for="(account, index) in accounts" :key="index">
      <li class="account_number">{{account.account_number}}</li>
      <li class="account_type">{{account.account_type}}</li>
      <li class="balance">ZAR {{account.balance}}</li>
      <input type="button" value="Withdraw" class="withdraw" :class="{active: isActive(index)}" @click="appendroute(index, account.account_type)" :disabled="isDisabled(index)" />
    </div>
    <div class="balance">
      <h3>Balance</h3><h3>ZAR {{totalbalance}}</h3>
    </div>
    <div class="modal-box" v-if="visible">
      <div class="content">
        <svg v-on:click="close_modal" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
        </svg>
        <input class="withdrawalamount" type="number" placeholder="ZAR 00.00" v-model="withdrawalamount" autofocus>
        <button class="submit" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  prop: ['index'],
  data () {
    return {
      withdraw: 'withdraw/',
      visible: false,
      msg: 'Welcome to ACME Bank',
      withdrawalamount: '',
      newbalance: ''
    }
  },
  computed: {
    accounts () { return this.$store.state.accounts },
    totalbalance () {
      var sum = 0
      for (var i = 0; i < this.$store.state.accounts.length; i++) {
        sum = sum + parseFloat(this.$store.state.accounts[i].balance)
      }
      return sum
    }
  },
  methods: {
    isActive: function (index) {
      if (this.$store.state.accounts[index].account_type === 'cheque') {
        if (this.$store.state.accounts[index].balance <= -500) {
          return true
        } else {
          return false
        }
      } else if (this.$store.state.accounts[index].account_type === 'savings') {
        if (this.$store.state.accounts[index].balance <= 0) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    isDisabled: function (index) {
      if (this.$store.state.accounts[index].account_type === 'cheque') {
        if (this.$store.state.accounts[index].balance <= -500) {
          return true
        } else {
          return false
        }
      } else if (this.$store.state.accounts[index].account_type === 'savings') {
        if (this.$store.state.accounts[index].balance <= 0) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    close_modal: function () {
      this.visible = false
      this.$router.go(-1)
    },
    appendroute: function (accountnumber, accounttype) {
      let v = this.withdraw + accountnumber + '/' + accounttype
      this.$router.push(v)
      this.visible = true
    },
    submit: function () {
      let d = this.$store.state.accounts[this.$route.params.index].balance
      this.newbalance = d - this.withdrawalamount
      this.$store.dispatch('updateBalance', {
        index: this.$route.params.index,
        accounttype: this.accounttype,
        newbalance: this.newbalance
      })
      this.withdrawalamount = ''
      this.newbalance = ''
      this.$router.go(-1)
      this.visible = false
      alert('Success')
    }
  },
  created () {
    this.$store.dispatch('loadData')
  }
}
</script>

<style>
h2 {
  padding: 10px;
  color: #c1144f;
}

h3 {
  font-size: 20px;
}

li {
  display: inline-block;
}

.hello {
  position: relative;
  padding: 0px;
  margin: 50px 100px 50px 100px;
  border-style: solid;
  border-width: thin;
  border-color: #cfcfcf;
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 10px 15px 10px 10px;
}

.list:nth-child(even) {
  background: rgb(226, 226, 226); 
}

.list:nth-child(odd) { 
  background: rgb(255, 255, 255); 
}

.withdraw {
  grid-column: 4;
  color: #ffffff;
  border-style: none;
  border-radius: 5px;
  background-color: #62b84e;
  padding: 5px;
  outline: none;
  cursor: pointer;
}

.withdraw:hover {
  background: #23a506;
}

.withdraw:active {
  transform: translateY(4px);
}

.withdraw.active {
  color: #0000004f;
  background: #ffffff;
  cursor: default;
  border-style: solid;
  border-width: thin;
}

.hello .modal-box {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #0000002e;
  z-index: 1;
}

.hello .modal-box .content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  padding: 10px;
  background: #c7c7c7;
}

.hello .modal-box .content .withdrawalamount {
  text-align: center;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  outline: none;
}

.hello .modal-box .content .submit {
  color: #ffffff;
  border-style: none;
  border-radius: 5px;
  background-color: #62b84e;
  padding: 5px;
  outline: none;
  cursor: pointer;
}

.hello .modal-box .content svg {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 24px;
  fill: rgb(82, 82, 82);
  cursor: pointer;
}

.labels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: 10px;
}

.balance {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px 0px 0px 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
