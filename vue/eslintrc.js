module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended", // propojení s Prettier
  ],
  rules: {
    "vue/multi-word-component-names": "off", // vypne povinnost víceslovných názvů komponent
  },
};
