<template>
  <div id="app">
    <div v-if="!signedIn">
      <amplify-authenticator :authConfig="authConfig"></amplify-authenticator>
    </div>
    <div v-if="signedIn">
      <h3>Signed in!</h3>
      <amplify-sign-out></amplify-sign-out>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'app',
  data () {
    return {
      signedIn: false,
      authConfig: {
        signUpConfig: {
          header: 'My Customized Sign Up',
          hideAllDefaults: true,
          defaultCountryCode: '81',
          signUpFields: [
            {
              label: 'Email',
              key: 'username',
              required: true,
              displayOrder: 1,
              type: 'string',
              signUpWith: true
            },
            {
              label: 'Password',
              key: 'password',
              required: true,
              displayOrder: 2,
              type: 'string',
              signUpWith: true
            }
          ]
        }
      }
    }
  },
  async beforeCreate() {
    try {
      await Auth.currentAuthenticatedUser()
      this.signedIn = true
    } catch {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    }); 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
