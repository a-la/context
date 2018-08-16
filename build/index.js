"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = context;

var _util = require("util");

const LOG = (0, _util.debuglog)('@a-la/context');
/**
 * A test context for @a-la packages.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */

async function context(config = {}) {
  const {
    type
  } = config;
  LOG('@a-la/context called with %s', type);
  return type;
}
/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
//# sourceMappingURL=index.js.map