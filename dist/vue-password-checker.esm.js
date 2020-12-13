//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: "PasswordChecker",
  props: {
    font: {
      type: String,
      default: 'sans-serif',
    },
    colors: {
      type: Object,
      default: function default$1() {
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
    strength: function strength() {
      var strength = 0;
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
    color: function color() {
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
    testLength: function testLength() {
      return this.password.length > this.length;
    },
    testUpper: function testUpper() {
      var uppercase = /[A-Z]/;
      return uppercase.test(this.password)
    },
    testNumber: function testNumber() {
      var number = /[0-9]/;
      return number.test(this.password)
    },
    testSpecial: function testSpecial() {
      var special = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      return special.test(this.password);
    },
    testSpaces: function testSpaces() {
      var spaces = /\s/;
      return spaces.test(this.password);
    },
    getStrength: function getStrength() {
      return this.strength;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "strength-checker-wrapper",
      style: "font-family: " + _vm.font
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _c("div", { staticClass: "strength-bar" }, [
        _c("div", {
          staticClass: "bar",
          style:
            "width: " + _vm.strength + "%; background-color: " + _vm.color + ";"
        })
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "strength-message" }, [
        _vm._v("\n    Password Strength:\n    "),
        _vm.strength === -1
          ? _c("span", { style: { color: _vm.color } }, [_vm._v("Invalid")])
          : _vm.strength === 0
          ? _c("span", { style: { color: _vm.color } }, [_vm._v("Very Weak")])
          : _vm.strength === 25
          ? _c("span", { style: { color: _vm.color } }, [_vm._v("Weak")])
          : _vm.strength === 50
          ? _c("span", { style: { color: _vm.color } }, [_vm._v("Medium")])
          : _vm.strength === 75
          ? _c("span", { style: { color: _vm.color } }, [_vm._v("Strong")])
          : _vm.strength === 100
          ? _c("span", { style: { color: _vm.color } }, [_vm._v("Very Strong")])
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.showInstructions
        ? _c("div", [
            _c("p", [_vm._v("For a strong password:")]),
            _vm._v(" "),
            _c("ul", [
              _c(
                "li",
                {
                  style: "color: " + (!_vm.testSpaces() ? "green" : "red") + ";"
                },
                [_vm._v("Do not include spaces")]
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  style: "color: " + (_vm.testLength() ? "green" : "red") + ";"
                },
                [_vm._v("Use at least " + _vm._s(_vm.length) + " characters")]
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  style: "color: " + (_vm.testUpper() ? "green" : "red") + ";"
                },
                [_vm._v("Use at least one uppercase letter")]
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  style: "color: " + (_vm.testNumber() ? "green" : "red") + ";"
                },
                [_vm._v("Use at least one number")]
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  style: "color: " + (_vm.testSpecial() ? "green" : "red") + ";"
                },
                [_vm._v("Use at least one special character")]
              )
            ])
          ])
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-c963edbe_0", { source: "\n.strength-checker-wrapper[data-v-c963edbe] {\n  width: 100%;\n  color: #7a7a7a;\n}\n.strength-checker-wrapper .strength-input[data-v-c963edbe] {\n  width: 100%;\n  display: block;\n}\n.strength-checker-wrapper ul[data-v-c963edbe] {\n  list-style: disc;\n  padding-inline-start: 0;\n}\n.strength-checker-wrapper .strength-bar[data-v-c963edbe] {\n  width: 100%;\n  position: relative;\n  border-radius: 10px;\n  height: 3px;\n}\n.strength-checker-wrapper .strength-bar .bar[data-v-c963edbe] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-radius: 10px;\n  height: 100%;\n  transition: width 0.3s;\n}\n\n", map: {"version":3,"sources":["/srv/http/vue-password-checker/src/PasswordChecker.vue"],"names":[],"mappings":";AA2HA;EACA,WAAA;EACA,cAAA;AACA;AAEA;EACA,WAAA;EACA,cAAA;AACA;AAEA;EACA,gBAAA;EACA,uBAAA;AACA;AAEA;EACA,WAAA;EACA,kBAAA;EACA,mBAAA;EACA,WAAA;AACA;AAEA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,mBAAA;EACA,YAAA;EACA,sBAAA;AACA","file":"PasswordChecker.vue","sourcesContent":["<template>\n  <div class=\"strength-checker-wrapper\" :style=\"`font-family: ${font}`\">\n    <slot class=\"strength-input\"></slot>\n    <div class=\"strength-bar\">\n      <div class=\"bar\" :style=\"`width: ${strength}%; background-color: ${color};`\"></div>\n    </div>\n    <p class=\"strength-message\">\n      Password Strength:\n      <span v-if=\"strength === -1\" :style=\"{ color: color }\">Invalid</span>\n      <span v-else-if=\"strength === 0\" :style=\"{ color: color }\">Very Weak</span>\n      <span v-else-if=\"strength === 25\" :style=\"{ color: color }\">Weak</span>\n      <span v-else-if=\"strength === 50\" :style=\"{ color: color }\">Medium</span>\n      <span v-else-if=\"strength === 75\" :style=\"{ color: color }\">Strong</span>\n      <span v-else-if=\"strength === 100\" :style=\"{ color: color }\">Very Strong</span>\n    </p>\n    <div v-if=\"showInstructions\">\n      <p>For a strong password:</p>\n      <ul>\n        <li :style=\"`color: ${!testSpaces() ? 'green' : 'red'};`\">Do not include spaces</li>\n        <li :style=\"`color: ${testLength() ? 'green' : 'red'};`\">Use at least {{ length }} characters</li>\n        <li :style=\"`color: ${testUpper() ? 'green' : 'red'};`\">Use at least one uppercase letter</li>\n        <li :style=\"`color: ${testNumber() ? 'green' : 'red'};`\">Use at least one number</li>\n        <li :style=\"`color: ${testSpecial() ? 'green' : 'red'};`\">Use at least one special character</li>\n      </ul>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \"PasswordChecker\",\n  props: {\n    font: {\n      type: String,\n      default: 'sans-serif',\n    },\n    colors: {\n      type: Object,\n      default() {\n        return {\n          invalid: '#000',\n          very_weak: '#FFF',\n          weak: '#d44137',\n          good: '#e36e0e',\n          strong: '#c4c934',\n          very_strong: '#24ed09',\n        }\n      }\n    },\n    showInstructions: {\n      type: Boolean,\n      default: false,\n    },\n    length: {\n      type: Number,\n      default: 6\n    },\n    password: {\n      type: String,\n      required: true,\n    }\n  }\n  ,\n  computed: {\n    strength() {\n      let strength = 0;\n      if (this.password === '' || this.testSpaces()) {\n        return -1;\n      }\n      strength += this.testLength() ? 25 : 0;\n      strength += this.testUpper() ? 25 : 0;\n      strength += this.testNumber() ? 25 : 0;\n      strength += this.testSpecial() ? 25 : 0;\n      return strength;\n    }\n    ,\n    color() {\n      switch (this.strength) {\n        case -1:\n          return this.colors.invalid;\n        case 0:\n          return this.colors.very_weak;\n        case 25:\n          return this.colors.weak;\n        case 50:\n          return this.colors.good;\n        case 75:\n          return this.colors.strong;\n        case 100:\n          return this.colors.very_strong;\n        default:\n          return '#FFF';\n      }\n    }\n  },\n  methods: {\n    testLength() {\n      return this.password.length > this.length;\n    },\n    testUpper() {\n      const uppercase = /[A-Z]/;\n      return uppercase.test(this.password)\n    },\n    testNumber() {\n      const number = /[0-9]/;\n      return number.test(this.password)\n    },\n    testSpecial() {\n      const special = /[`!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?~]/;\n      return special.test(this.password);\n    },\n    testSpaces() {\n      const spaces = /\\s/;\n      return spaces.test(this.password);\n    },\n    getStrength() {\n      return this.strength;\n    }\n  }\n}\n</script>\n\n<style scoped>\n.strength-checker-wrapper {\n  width: 100%;\n  color: #7a7a7a;\n}\n\n.strength-checker-wrapper .strength-input {\n  width: 100%;\n  display: block;\n}\n\n.strength-checker-wrapper ul {\n  list-style: disc;\n  padding-inline-start: 0;\n}\n\n.strength-checker-wrapper .strength-bar {\n  width: 100%;\n  position: relative;\n  border-radius: 10px;\n  height: 3px;\n}\n\n.strength-checker-wrapper .strength-bar .bar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-radius: 10px;\n  height: 100%;\n  transition: width 0.3s;\n}\n\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-c963edbe";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('PasswordChecker', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
    install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
