# Vue Password Checker

A configurable password strength checker for Vue js

#### <a href="https://github.com/redsquirrelstudio/vue-password-checker">Github Repo</a> <img width=20 src="https://devicon.dev/devicon.git/icons/github/github-original.svg" >

#### <a href="https://www.npmjs.com/package/vue-password-checker">NPM</a> <img width=20 src="https://devicon.dev/devicon.git/icons/npm/npm-original-wordmark.svg" >

## Installation

Vue password checker can be installed with both npm and yarn as usual.

```bash
npm install vue-password-checker

yarn add vue-password-checker
```

And then can be imported into your project.

```js
import 'PasswordChecker' from "vue-password-checker";
```

## Configuration

Vue Password checker takes the following props for configuration:

### password

Type: String
The variable to be checked.

required  

### font

Type: Boolean  
Used to define the font the text will use.

default: false

### colors

Type: Object
Used to define the colors the strength bar and text will use.

default:
 ```js
 {
    invalid: '#d6847e',
    very_weak: '#FFF',
    weak: '#d44137',
    good: '#e36e0e',
    strong: '#c4c934',
    very_strong: '#24ed09',
}
```

### show-instructions

Type: Boolean
When true, a list will be shown instructing what counts as strong password.

default: false

### length

Type: Number  
The minimum length the password checker should look for.

default: 6

## Example

The password checker has a slot for inputs to sit in so can be used in this way:

```js
<template>
  <div>
    <password-checker :password="password" show-instructions>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password">
    </password-checker>
  </div>
</template>

<script>
import PasswordChecker from "vue-password-checker";
export default {
  name: "App",
  data(){
    return{
      password: '',
    }
  },
  components: {
    PasswordChecker,
  }
}
</script>
```

Or separately 

```js
<template>
  <div>
    <password-checker :password="password" show-instructions></password-checker>

    <label for="password">Password</label>
    <input id="password" type="password" v-model="password">
  </div>
</template>

<script>
import PasswordChecker from "./src/PasswordChecker";
export default {
  name: "App",
  data(){
    return{
      password: '',
    }
  },
  components: {
    PasswordChecker,
  }
}
</script>

```