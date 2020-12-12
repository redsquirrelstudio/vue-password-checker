<template>
  <div class="strength-checker-wrapper" :style="`font-family: ${font}`">
    <slot class="strength-input"></slot>
    <div class="strength-bar">
      <div class="bar" :style="`width: ${strength}%; background-color: ${color};`"></div>
    </div>
    <p class="strength-message">
      Password Strength:
      <span v-if="strength === -1" :style="{ color: color }">Invalid</span>
      <span v-else-if="strength === 0" :style="{ color: color }">Very Weak</span>
      <span v-else-if="strength === 25" :style="{ color: color }">Weak</span>
      <span v-else-if="strength === 50" :style="{ color: color }">Medium</span>
      <span v-else-if="strength === 75" :style="{ color: color }">Strong</span>
      <span v-else-if="strength === 100" :style="{ color: color }">Very Strong</span>
    </p>
    <div v-if="showInstructions">
      <p>For a strong password:</p>
      <ul>
        <li :style="`color: ${!testSpaces() ? 'green' : 'red'};`">Do not include spaces</li>
        <li :style="`color: ${testLength() ? 'green' : 'red'};`">Use at least {{ length }} characters</li>
        <li :style="`color: ${testUpper() ? 'green' : 'red'};`">Use at least one uppercase letter</li>
        <li :style="`color: ${testNumber() ? 'green' : 'red'};`">Use at least one number</li>
        <li :style="`color: ${testSpecial() ? 'green' : 'red'};`">Use at least one special character</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordChecker",
  props: {
    font: {
      type: String,
      default: 'sans-serif',
    },
    colors: {
      type: Object,
      default() {
        return {
          invalid: '#000',
          very_weak: '#FFF',
          weak: '#d44137',
          good: '#e36e0e',
          strong: '#c4c934',
          very_strong: '#24ed09',
        }
      }
    },
    showInstructions: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      default: 6
    },
    password: {
      type: String,
      required: true,
    }
  }
  ,
  computed: {
    strength() {
      let strength = 0;
      if (this.password === '' || this.testSpaces()) {
        return -1;
      }
      strength += this.testLength() ? 25 : 0;
      strength += this.testUpper() ? 25 : 0;
      strength += this.testNumber() ? 25 : 0;
      strength += this.testSpecial() ? 25 : 0;
      return strength;
    }
    ,
    color() {
      switch (this.strength) {
        case -1:
          return this.colors.invalid;
        case 0:
          return this.colors.very_weak;
        case 25:
          return this.colors.weak;
        case 50:
          return this.colors.good;
        case 75:
          return this.colors.strong;
        case 100:
          return this.colors.very_strong;
        default:
          return '#FFF';
      }
    }
  },
  methods: {
    testLength() {
      return this.password.length > this.length;
    },
    testUpper() {
      const uppercase = /[A-Z]/;
      return uppercase.test(this.password)
    },
    testNumber() {
      const number = /[0-9]/;
      return number.test(this.password)
    },
    testSpecial() {
      const special = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      return special.test(this.password);
    },
    testSpaces() {
      const spaces = /\s/;
      return spaces.test(this.password);
    },
    getStrength() {
      return this.strength;
    }
  }
}
</script>

<style scoped>
.strength-checker-wrapper {
  width: 100%;
  color: #7a7a7a;
}

.strength-checker-wrapper .strength-input {
  width: 100%;
  display: block;
}

.strength-checker-wrapper ul {
  list-style: disc;
  padding-inline-start: 0;
}

.strength-checker-wrapper .strength-bar {
  width: 100%;
  position: relative;
  border-radius: 10px;
  height: 3px;
}

.strength-checker-wrapper .strength-bar .bar {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 10px;
  height: 100%;
  transition: width 0.3s;
}

</style>
