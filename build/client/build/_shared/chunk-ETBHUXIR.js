import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts
} from "/build/_shared/chunk-KIFWDNN3.js";
import {
  createHotContext
} from "/build/_shared/chunk-2SFEX3OF.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-F4KNNEUR.js";
import {
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/tailwind.css?url
var tailwind_default = "/build/_assets/tailwind-W5OZGJJX.css?url";

// node_modules/@firebase/util/dist/index.esm2017.js
var CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,
  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,
  /**
   * Firebase SDK Version
   */
  SDK_VERSION: "${JSCORE_VERSION}"
};
var assert = function(assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
var assertionError = function(message) {
  return new Error("Firebase Database (" + CONSTANTS.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + message);
};
var stringToByteArray$1 = function(str) {
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
var byteArrayToString = function(bytes) {
  const out = [];
  let pos = 0, c = 0;
  while (pos < bytes.length) {
    const c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
      out[c++] = String.fromCharCode(55296 + (u >> 10));
      out[c++] = String.fromCharCode(56320 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join("");
};
var base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error("encodeByteArray takes an array as a parameter");
    }
    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];
    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 63;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];
    for (let i = 0; i < input.length; ) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw new DecodeBase64StringError();
      }
      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 192 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
var DecodeBase64StringError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "DecodeBase64StringError";
  }
};
var base64Encode = function(str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
var base64urlEncodeWithoutPadding = function(str) {
  return base64Encode(str).replace(/\./g, "");
};
var base64Decode = function(str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
function deepCopy(value) {
  return deepExtend(void 0, value);
}
function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }
  switch (source.constructor) {
    case Date:
      const dateValue = source;
      return new Date(dateValue.getTime());
    case Object:
      if (target === void 0) {
        target = {};
      }
      break;
    case Array:
      target = [];
      break;
    default:
      return source;
  }
  for (const prop in source) {
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }
    target[prop] = deepExtend(target[prop], source[prop]);
  }
  return target;
}
function isValidKey(key) {
  return key !== "__proto__";
}
function getGlobal() {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  throw new Error("Unable to locate global object.");
}
var getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
var getDefaultsFromEnvVariable = () => {
  if (typeof process === "undefined" || typeof process.env === "undefined") {
    return;
  }
  const defaultsJsonString = process.env.__FIREBASE_DEFAULTS__;
  if (defaultsJsonString) {
    return JSON.parse(defaultsJsonString);
  }
};
var getDefaultsFromCookie = () => {
  if (typeof document === "undefined") {
    return;
  }
  let match;
  try {
    match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch (e) {
    return;
  }
  const decoded = match && base64Decode(match[1]);
  return decoded && JSON.parse(decoded);
};
var getDefaults = () => {
  try {
    return getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
  } catch (e) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
};
var getDefaultEmulatorHost = (productName) => {
  var _a, _b;
  return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
var getDefaultEmulatorHostnameAndPort = (productName) => {
  const host = getDefaultEmulatorHost(productName);
  if (!host) {
    return void 0;
  }
  const separatorIndex = host.lastIndexOf(":");
  if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
    throw new Error(`Invalid host ${host} with no separate hostname and port!`);
  }
  const port = parseInt(host.substring(separatorIndex + 1), 10);
  if (host[0] === "[") {
    return [host.substring(1, separatorIndex - 1), port];
  } else {
    return [host.substring(0, separatorIndex), port];
  }
};
var getDefaultAppConfig = () => {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
};
var Deferred = class {
  constructor() {
    this.reject = () => {
    };
    this.resolve = () => {
    };
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(callback) {
    return (error2, value) => {
      if (error2) {
        this.reject(error2);
      } else {
        this.resolve(value);
      }
      if (typeof callback === "function") {
        this.promise.catch(() => {
        });
        if (callback.length === 1) {
          callback(error2);
        } else {
          callback(error2, value);
        }
      }
    };
  }
};
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  const header = {
    alg: "none",
    type: "JWT"
  };
  const project = projectId || "demo-project";
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    }
  }, token);
  const signature = "";
  return [
    base64urlEncodeWithoutPadding(JSON.stringify(header)),
    base64urlEncodeWithoutPadding(JSON.stringify(payload)),
    signature
  ].join(".");
}
function getUA() {
  if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
    return navigator["userAgent"];
  } else {
    return "";
  }
}
function isMobileCordova() {
  return typeof window !== "undefined" && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
function isReactNative() {
  return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
function isIndexedDBAvailable() {
  try {
    return typeof indexedDB === "object";
  } catch (e) {
    return false;
  }
}
function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };
      request.onerror = () => {
        var _a;
        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || "");
      };
    } catch (error2) {
      reject(error2);
    }
  });
}
var ERROR_NAME = "FirebaseError";
var FirebaseError = class extends Error {
  constructor(code, message, customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    this.name = ERROR_NAME;
    Object.setPrototypeOf(this, FirebaseError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }
};
var ErrorFactory = class {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }
  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : "Error";
    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error2 = new FirebaseError(fullCode, fullMessage, customData);
    return error2;
  }
};
function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}
var PATTERN = /\{\$([^}]+)}/g;
function jsonEval(str) {
  return JSON.parse(str);
}
function stringify(data) {
  return JSON.stringify(data);
}
var decode = function(token) {
  let header = {}, claims = {}, data = {}, signature = "";
  try {
    const parts = token.split(".");
    header = jsonEval(base64Decode(parts[0]) || "");
    claims = jsonEval(base64Decode(parts[1]) || "");
    signature = parts[2];
    data = claims["d"] || {};
    delete claims["d"];
  } catch (e) {
  }
  return {
    header,
    claims,
    data,
    signature
  };
};
var isValidFormat = function(token) {
  const decoded = decode(token), claims = decoded.claims;
  return !!claims && typeof claims === "object" && claims.hasOwnProperty("iat");
};
var isAdmin = function(token) {
  const claims = decode(token).claims;
  return typeof claims === "object" && claims["admin"] === true;
};
function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return void 0;
  }
}
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function map(obj, fn, contextObj) {
  const res = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }
  return res;
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }
    const aProp = a[k];
    const bProp = b[k];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && typeof thing === "object";
}
function querystring(querystringParams) {
  const params = [];
  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach((arrayVal) => {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
  }
  return params.length ? "&" + params.join("&") : "";
}
var Sha1 = class {
  constructor() {
    this.chain_ = [];
    this.buf_ = [];
    this.W_ = [];
    this.pad_ = [];
    this.inbuf_ = 0;
    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;
    for (let i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }
    this.reset();
  }
  reset() {
    this.chain_[0] = 1732584193;
    this.chain_[1] = 4023233417;
    this.chain_[2] = 2562383102;
    this.chain_[3] = 271733878;
    this.chain_[4] = 3285377520;
    this.inbuf_ = 0;
    this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */
  compress_(buf, offset) {
    if (!offset) {
      offset = 0;
    }
    const W = this.W_;
    if (typeof buf === "string") {
      for (let i = 0; i < 16; i++) {
        W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
        offset += 4;
      }
    } else {
      for (let i = 0; i < 16; i++) {
        W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
        offset += 4;
      }
    }
    for (let i = 16; i < 80; i++) {
      const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      W[i] = (t << 1 | t >>> 31) & 4294967295;
    }
    let a = this.chain_[0];
    let b = this.chain_[1];
    let c = this.chain_[2];
    let d = this.chain_[3];
    let e = this.chain_[4];
    let f, k;
    for (let i = 0; i < 80; i++) {
      if (i < 40) {
        if (i < 20) {
          f = d ^ b & (c ^ d);
          k = 1518500249;
        } else {
          f = b ^ c ^ d;
          k = 1859775393;
        }
      } else {
        if (i < 60) {
          f = b & c | d & (b | c);
          k = 2400959708;
        } else {
          f = b ^ c ^ d;
          k = 3395469782;
        }
      }
      const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 4294967295;
      e = d;
      d = c;
      c = (b << 30 | b >>> 2) & 4294967295;
      b = a;
      a = t;
    }
    this.chain_[0] = this.chain_[0] + a & 4294967295;
    this.chain_[1] = this.chain_[1] + b & 4294967295;
    this.chain_[2] = this.chain_[2] + c & 4294967295;
    this.chain_[3] = this.chain_[3] + d & 4294967295;
    this.chain_[4] = this.chain_[4] + e & 4294967295;
  }
  update(bytes, length) {
    if (bytes == null) {
      return;
    }
    if (length === void 0) {
      length = bytes.length;
    }
    const lengthMinusBlock = length - this.blockSize;
    let n = 0;
    const buf = this.buf_;
    let inbuf = this.inbuf_;
    while (n < length) {
      if (inbuf === 0) {
        while (n <= lengthMinusBlock) {
          this.compress_(bytes, n);
          n += this.blockSize;
        }
      }
      if (typeof bytes === "string") {
        while (n < length) {
          buf[inbuf] = bytes.charCodeAt(n);
          ++inbuf;
          ++n;
          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0;
            break;
          }
        }
      } else {
        while (n < length) {
          buf[inbuf] = bytes[n];
          ++inbuf;
          ++n;
          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0;
            break;
          }
        }
      }
    }
    this.inbuf_ = inbuf;
    this.total_ += length;
  }
  /** @override */
  digest() {
    const digest = [];
    let totalBits = this.total_ * 8;
    if (this.inbuf_ < 56) {
      this.update(this.pad_, 56 - this.inbuf_);
    } else {
      this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    }
    for (let i = this.blockSize - 1; i >= 56; i--) {
      this.buf_[i] = totalBits & 255;
      totalBits /= 256;
    }
    this.compress_(this.buf_);
    let n = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 24; j >= 0; j -= 8) {
        digest[n] = this.chain_[i] >> j & 255;
        ++n;
      }
    }
    return digest;
  }
};
function errorPrefix(fnName, argName) {
  return `${fnName} failed: ${argName} argument `;
}
var stringToByteArray = function(str) {
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c >= 55296 && c <= 56319) {
      const high = c - 55296;
      i++;
      assert(i < str.length, "Surrogate pair missing trail surrogate.");
      const low = str.charCodeAt(i) - 56320;
      c = 65536 + (high << 10) + low;
    }
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
var stringLength = function(str) {
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 55296 && c <= 56319) {
      p += 4;
      i++;
    } else {
      p += 3;
    }
  }
  return p;
};
var MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}

// node_modules/@firebase/component/dist/esm/index.esm2017.js
var Component = class {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name4, instanceFactory, type) {
    this.name = name4;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    this.serviceProps = {};
    this.instantiationMode = "LAZY";
    this.onInstanceCreated = null;
  }
  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }
  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }
  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }
  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }
};
var DEFAULT_ENTRY_NAME = "[DEFAULT]";
var Provider = class {
  constructor(name4, container) {
    this.name = name4;
    this.container = container;
    this.component = null;
    this.instances = /* @__PURE__ */ new Map();
    this.instancesDeferred = /* @__PURE__ */ new Map();
    this.instancesOptions = /* @__PURE__ */ new Map();
    this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(identifier) {
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {
        }
      }
    }
    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }
  getImmediate(options) {
    var _a;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }
    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }
    this.component = component;
    if (!this.shouldAutoInitialize()) {
      return;
    }
    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
      } catch (e) {
      }
    }
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      try {
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {
      }
    }
  }
  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([
      ...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()),
      ...services.filter((service) => "_delete" in service).map((service) => service._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }
  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }
  initialize(opts = {}) {
    const { options = {} } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }
    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }
    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    });
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }
    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(callback, identifier) {
    var _a;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);
    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }
    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);
    if (!callbacks) {
      return;
    }
    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {
      }
    }
  }
  getOrInitializeService({ instanceIdentifier, options = {} }) {
    let instance = this.instances.get(instanceIdentifier);
    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {
        }
      }
    }
    return instance || null;
  }
  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier;
    }
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
};
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER";
}
var ComponentContainer = class {
  constructor(name4) {
    this.name = name4;
    this.providers = /* @__PURE__ */ new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(name4) {
    if (this.providers.has(name4)) {
      return this.providers.get(name4);
    }
    const provider = new Provider(name4, this);
    this.providers.set(name4, provider);
    return provider;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
};

// node_modules/@firebase/logger/dist/esm/index.esm2017.js
var instances = [];
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
  LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
  LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
var levelStringToEnum = {
  "debug": LogLevel.DEBUG,
  "verbose": LogLevel.VERBOSE,
  "info": LogLevel.INFO,
  "warn": LogLevel.WARN,
  "error": LogLevel.ERROR,
  "silent": LogLevel.SILENT
};
var defaultLogLevel = LogLevel.INFO;
var ConsoleMethod = {
  [LogLevel.DEBUG]: "log",
  [LogLevel.VERBOSE]: "log",
  [LogLevel.INFO]: "info",
  [LogLevel.WARN]: "warn",
  [LogLevel.ERROR]: "error"
};
var defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const method = ConsoleMethod[logType];
  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};
var Logger = class {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name4) {
    this.name = name4;
    this._logLevel = defaultLogLevel;
    this._logHandler = defaultLogHandler;
    this._userLogHandler = null;
    instances.push(this);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(val) {
    this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(val) {
    if (typeof val !== "function") {
      throw new TypeError("Value assigned to `logHandler` must be a function");
    }
    this._logHandler = val;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
    this._logHandler(this, LogLevel.DEBUG, ...args);
  }
  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }
  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
    this._logHandler(this, LogLevel.INFO, ...args);
  }
  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
    this._logHandler(this, LogLevel.WARN, ...args);
  }
  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
    this._logHandler(this, LogLevel.ERROR, ...args);
  }
};

// node_modules/idb/build/wrap-idb-value.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
var cursorRequestMap = /* @__PURE__ */ new WeakMap();
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error2);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error2 = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error2);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error2);
      tx.removeEventListener("abort", error2);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error2 = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error2);
    tx.addEventListener("abort", error2);
  });
  transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);

// node_modules/idb/build/index.js
function openDB(name4, version4, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name4, version4);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db2) => {
    if (terminated)
      db2.addEventListener("close", () => terminated());
    if (blocking) {
      db2.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
var writeMethods = ["put", "add", "delete", "clear"];
var cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));

// node_modules/@firebase/app/dist/esm/index.esm2017.js
var PlatformLoggerServiceImpl = class {
  constructor(container) {
    this.container = container;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    return providers.map((provider) => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter((logString) => logString).join(" ");
  }
};
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
var name$q = "@firebase/app";
var version$1 = "0.10.15";
var logger = new Logger("@firebase/app");
var name$p = "@firebase/app-compat";
var name$o = "@firebase/analytics-compat";
var name$n = "@firebase/analytics";
var name$m = "@firebase/app-check-compat";
var name$l = "@firebase/app-check";
var name$k = "@firebase/auth";
var name$j = "@firebase/auth-compat";
var name$i = "@firebase/database";
var name$h = "@firebase/data-connect";
var name$g = "@firebase/database-compat";
var name$f = "@firebase/functions";
var name$e = "@firebase/functions-compat";
var name$d = "@firebase/installations";
var name$c = "@firebase/installations-compat";
var name$b = "@firebase/messaging";
var name$a = "@firebase/messaging-compat";
var name$9 = "@firebase/performance";
var name$8 = "@firebase/performance-compat";
var name$7 = "@firebase/remote-config";
var name$6 = "@firebase/remote-config-compat";
var name$5 = "@firebase/storage";
var name$4 = "@firebase/storage-compat";
var name$3 = "@firebase/firestore";
var name$2 = "@firebase/vertexai";
var name$1 = "@firebase/firestore-compat";
var name = "firebase";
var version = "11.0.1";
var DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
var PLATFORM_LOG_STRING = {
  [name$q]: "fire-core",
  [name$p]: "fire-core-compat",
  [name$n]: "fire-analytics",
  [name$o]: "fire-analytics-compat",
  [name$l]: "fire-app-check",
  [name$m]: "fire-app-check-compat",
  [name$k]: "fire-auth",
  [name$j]: "fire-auth-compat",
  [name$i]: "fire-rtdb",
  [name$h]: "fire-data-connect",
  [name$g]: "fire-rtdb-compat",
  [name$f]: "fire-fn",
  [name$e]: "fire-fn-compat",
  [name$d]: "fire-iid",
  [name$c]: "fire-iid-compat",
  [name$b]: "fire-fcm",
  [name$a]: "fire-fcm-compat",
  [name$9]: "fire-perf",
  [name$8]: "fire-perf-compat",
  [name$7]: "fire-rc",
  [name$6]: "fire-rc-compat",
  [name$5]: "fire-gcs",
  [name$4]: "fire-gcs-compat",
  [name$3]: "fire-fst",
  [name$1]: "fire-fst-compat",
  [name$2]: "fire-vertex",
  "fire-js": "fire-js",
  [name]: "fire-js-all"
};
var _apps = /* @__PURE__ */ new Map();
var _serverApps = /* @__PURE__ */ new Map();
var _components = /* @__PURE__ */ new Map();
function _addComponent(app2, component) {
  try {
    app2.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app2.name}`, e);
  }
}
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  for (const app2 of _apps.values()) {
    _addComponent(app2, component);
  }
  for (const serverApp of _serverApps.values()) {
    _addComponent(serverApp, component);
  }
  return true;
}
function _getProvider(app2, name4) {
  const heartbeatController = app2.container.getProvider("heartbeat").getImmediate({ optional: true });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app2.container.getProvider(name4);
}
var ERRORS = {
  [
    "no-app"
    /* AppError.NO_APP */
  ]: "No Firebase App '{$appName}' has been created - call initializeApp() first",
  [
    "bad-app-name"
    /* AppError.BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}'",
  [
    "duplicate-app"
    /* AppError.DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  [
    "app-deleted"
    /* AppError.APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  [
    "server-app-deleted"
    /* AppError.SERVER_APP_DELETED */
  ]: "Firebase Server App has been deleted",
  [
    "no-options"
    /* AppError.NO_OPTIONS */
  ]: "Need to provide options, when not being deployed to hosting via source.",
  [
    "invalid-app-argument"
    /* AppError.INVALID_APP_ARGUMENT */
  ]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  [
    "invalid-log-argument"
    /* AppError.INVALID_LOG_ARGUMENT */
  ]: "First argument to `onLog` must be null or a function.",
  [
    "idb-open"
    /* AppError.IDB_OPEN */
  ]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-get"
    /* AppError.IDB_GET */
  ]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-set"
    /* AppError.IDB_WRITE */
  ]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-delete"
    /* AppError.IDB_DELETE */
  ]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "finalization-registry-not-supported"
    /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */
  ]: "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
  [
    "invalid-server-app-environment"
    /* AppError.INVALID_SERVER_APP_ENVIRONMENT */
  ]: "FirebaseServerApp is not for use in browser environments."
};
var ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
var FirebaseAppImpl = class {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new Component(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
    }
  }
};
var SDK_VERSION = version;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== "object") {
    const name5 = rawConfig;
    rawConfig = { name: name5 };
  }
  const config = Object.assign({ name: DEFAULT_ENTRY_NAME2, automaticDataCollectionEnabled: false }, rawConfig);
  const name4 = config.name;
  if (typeof name4 !== "string" || !name4) {
    throw ERROR_FACTORY.create("bad-app-name", {
      appName: String(name4)
    });
  }
  options || (options = getDefaultAppConfig());
  if (!options) {
    throw ERROR_FACTORY.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  }
  const existingApp = _apps.get(name4);
  if (existingApp) {
    if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app", { appName: name4 });
    }
  }
  const container = new ComponentContainer(name4);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name4, newApp);
  return newApp;
}
function getApp(name4 = DEFAULT_ENTRY_NAME2) {
  const app2 = _apps.get(name4);
  if (!app2 && name4 === DEFAULT_ENTRY_NAME2 && getDefaultAppConfig()) {
    return initializeApp();
  }
  if (!app2) {
    throw ERROR_FACTORY.create("no-app", { appName: name4 });
  }
  return app2;
}
function registerVersion(libraryKeyOrName, version4, variant) {
  var _a;
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version4.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [
      `Unable to register library "${library}" with version "${version4}":`
    ];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push("and");
    }
    if (versionMismatch) {
      warning.push(`version name "${version4}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(" "));
    return;
  }
  _registerComponent(new Component(
    `${library}-version`,
    () => ({ library, version: version4 }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
var DB_NAME = "firebase-heartbeat-database";
var DB_VERSION = 1;
var STORE_NAME = "firebase-heartbeat-store";
var dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade: (db2, oldVersion) => {
        switch (oldVersion) {
          case 0:
            try {
              db2.createObjectStore(STORE_NAME);
            } catch (e) {
              console.warn(e);
            }
        }
      }
    }).catch((e) => {
      throw ERROR_FACTORY.create("idb-open", {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app2) {
  try {
    const db2 = await getDbPromise();
    const tx = db2.transaction(STORE_NAME);
    const result = await tx.objectStore(STORE_NAME).get(computeKey(app2));
    await tx.done;
    return result;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app2, heartbeatObject) {
  try {
    const db2 = await getDbPromise();
    const tx = db2.transaction(STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app2));
    await tx.done;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app2) {
  return `${app2.name}!${app2.options.appId}`;
}
var MAX_HEADER_BYTES = 1024;
var STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1e3;
var HeartbeatServiceImpl = class {
  constructor(container) {
    this.container = container;
    this._heartbeatsCache = null;
    const app2 = this.container.getProvider("app").getImmediate();
    this._storage = new HeartbeatStorageImpl(app2);
    this._heartbeatsCachePromise = this._storage.read().then((result) => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var _a, _b;
    try {
      const platformLogger = this.container.getProvider("platform-logger").getImmediate();
      const agent = platformLogger.getPlatformInfoString();
      const date = getUTCDateString();
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
        this._heartbeatsCache = await this._heartbeatsCachePromise;
        if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) {
          return;
        }
      }
      if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
        return;
      } else {
        this._heartbeatsCache.heartbeats.push({ date, agent });
      }
      this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((singleDateHeartbeat) => {
        const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
        const now = Date.now();
        return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
      });
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (e) {
      logger.warn(e);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var _a;
    try {
      if (this._heartbeatsCache === null) {
        await this._heartbeatsCachePromise;
      }
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) {
        return "";
      }
      const date = getUTCDateString();
      const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
      const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
      this._heartbeatsCache.lastSentHeartbeatDate = date;
      if (unsentEntries.length > 0) {
        this._heartbeatsCache.heartbeats = unsentEntries;
        await this._storage.overwrite(this._heartbeatsCache);
      } else {
        this._heartbeatsCache.heartbeats = [];
        void this._storage.overwrite(this._heartbeatsCache);
      }
      return headerString;
    } catch (e) {
      logger.warn(e);
      return "";
    }
  }
};
function getUTCDateString() {
  const today = /* @__PURE__ */ new Date();
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  const heartbeatsToSend = [];
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    const heartbeatEntry = heartbeatsToSend.find((hb) => hb.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
var HeartbeatStorageImpl = class {
  constructor(app2) {
    this.app = app2;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!isIndexedDBAvailable()) {
      return false;
    } else {
      return validateIndexedDBOpenable().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return { heartbeats: [] };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) {
        return idbHeartbeatObject;
      } else {
        return { heartbeats: [] };
      }
    }
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  // add heartbeats
  async add(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [
          ...existingHeartbeatsObject.heartbeats,
          ...heartbeatsObject.heartbeats
        ]
      });
    }
  }
};
function countBytes(heartbeatsCache) {
  return base64urlEncodeWithoutPadding(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: heartbeatsCache })
  ).length;
}
function registerCoreComponents(variant) {
  _registerComponent(new Component(
    "platform-logger",
    (container) => new PlatformLoggerServiceImpl(container),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  _registerComponent(new Component(
    "heartbeat",
    (container) => new HeartbeatServiceImpl(container),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  registerVersion(name$q, version$1, variant);
  registerVersion(name$q, version$1, "esm2017");
  registerVersion("fire-js", "");
}
registerCoreComponents("");

// node_modules/firebase/app/dist/esm/index.esm.js
var name2 = "firebase";
var version2 = "11.0.1";
registerVersion(name2, version2, "app");

// node_modules/@firebase/database/dist/index.esm2017.js
var name3 = "@firebase/database";
var version3 = "1.0.9";
var SDK_VERSION2 = "";
function setSDKVersion(version4) {
  SDK_VERSION2 = version4;
}
var DOMStorageWrapper = class {
  /**
   * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
   */
  constructor(domStorage_) {
    this.domStorage_ = domStorage_;
    this.prefix_ = "firebase:";
  }
  /**
   * @param key - The key to save the value under
   * @param value - The value being stored, or null to remove the key.
   */
  set(key, value) {
    if (value == null) {
      this.domStorage_.removeItem(this.prefixedName_(key));
    } else {
      this.domStorage_.setItem(this.prefixedName_(key), stringify(value));
    }
  }
  /**
   * @returns The value that was stored under this key, or null
   */
  get(key) {
    const storedVal = this.domStorage_.getItem(this.prefixedName_(key));
    if (storedVal == null) {
      return null;
    } else {
      return jsonEval(storedVal);
    }
  }
  remove(key) {
    this.domStorage_.removeItem(this.prefixedName_(key));
  }
  prefixedName_(name4) {
    return this.prefix_ + name4;
  }
  toString() {
    return this.domStorage_.toString();
  }
};
var MemoryStorage = class {
  constructor() {
    this.cache_ = {};
    this.isInMemoryStorage = true;
  }
  set(key, value) {
    if (value == null) {
      delete this.cache_[key];
    } else {
      this.cache_[key] = value;
    }
  }
  get(key) {
    if (contains(this.cache_, key)) {
      return this.cache_[key];
    }
    return null;
  }
  remove(key) {
    delete this.cache_[key];
  }
};
var createStoragefor = function(domStorageName) {
  try {
    if (typeof window !== "undefined" && typeof window[domStorageName] !== "undefined") {
      const domStorage = window[domStorageName];
      domStorage.setItem("firebase:sentinel", "cache");
      domStorage.removeItem("firebase:sentinel");
      return new DOMStorageWrapper(domStorage);
    }
  } catch (e) {
  }
  return new MemoryStorage();
};
var PersistentStorage = createStoragefor("localStorage");
var SessionStorage = createStoragefor("sessionStorage");
var logClient = new Logger("@firebase/database");
var LUIDGenerator = function() {
  let id = 1;
  return function() {
    return id++;
  };
}();
var sha1 = function(str) {
  const utf8Bytes = stringToByteArray(str);
  const sha12 = new Sha1();
  sha12.update(utf8Bytes);
  const sha1Bytes = sha12.digest();
  return base64.encodeByteArray(sha1Bytes);
};
var buildLogMessage_ = function(...varArgs) {
  let message = "";
  for (let i = 0; i < varArgs.length; i++) {
    const arg = varArgs[i];
    if (Array.isArray(arg) || arg && typeof arg === "object" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof arg.length === "number") {
      message += buildLogMessage_.apply(null, arg);
    } else if (typeof arg === "object") {
      message += stringify(arg);
    } else {
      message += arg;
    }
    message += " ";
  }
  return message;
};
var logger2 = null;
var firstLog_ = true;
var enableLogging$1 = function(logger_, persistent) {
  assert(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
  if (logger_ === true) {
    logClient.logLevel = LogLevel.VERBOSE;
    logger2 = logClient.log.bind(logClient);
    if (persistent) {
      SessionStorage.set("logging_enabled", true);
    }
  } else if (typeof logger_ === "function") {
    logger2 = logger_;
  } else {
    logger2 = null;
    SessionStorage.remove("logging_enabled");
  }
};
var log = function(...varArgs) {
  if (firstLog_ === true) {
    firstLog_ = false;
    if (logger2 === null && SessionStorage.get("logging_enabled") === true) {
      enableLogging$1(true);
    }
  }
  if (logger2) {
    const message = buildLogMessage_.apply(null, varArgs);
    logger2(message);
  }
};
var logWrapper = function(prefix) {
  return function(...varArgs) {
    log(prefix, ...varArgs);
  };
};
var error = function(...varArgs) {
  const message = "FIREBASE INTERNAL ERROR: " + buildLogMessage_(...varArgs);
  logClient.error(message);
};
var fatal = function(...varArgs) {
  const message = `FIREBASE FATAL ERROR: ${buildLogMessage_(...varArgs)}`;
  logClient.error(message);
  throw new Error(message);
};
var warn = function(...varArgs) {
  const message = "FIREBASE WARNING: " + buildLogMessage_(...varArgs);
  logClient.warn(message);
};
var warnIfPageIsSecure = function() {
  if (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1) {
    warn("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
  }
};
var isInvalidJSONNumber = function(data) {
  return typeof data === "number" && (data !== data || // NaN
  data === Number.POSITIVE_INFINITY || data === Number.NEGATIVE_INFINITY);
};
var executeWhenDOMReady = function(fn) {
  if (isNodeSdk() || document.readyState === "complete") {
    fn();
  } else {
    let called = false;
    const wrappedFn = function() {
      if (!document.body) {
        setTimeout(wrappedFn, Math.floor(10));
        return;
      }
      if (!called) {
        called = true;
        fn();
      }
    };
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", wrappedFn, false);
      window.addEventListener("load", wrappedFn, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", () => {
        if (document.readyState === "complete") {
          wrappedFn();
        }
      });
      window.attachEvent("onload", wrappedFn);
    }
  }
};
var MIN_NAME = "[MIN_NAME]";
var MAX_NAME = "[MAX_NAME]";
var nameCompare = function(a, b) {
  if (a === b) {
    return 0;
  } else if (a === MIN_NAME || b === MAX_NAME) {
    return -1;
  } else if (b === MIN_NAME || a === MAX_NAME) {
    return 1;
  } else {
    const aAsInt = tryParseInt(a), bAsInt = tryParseInt(b);
    if (aAsInt !== null) {
      if (bAsInt !== null) {
        return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
      } else {
        return -1;
      }
    } else if (bAsInt !== null) {
      return 1;
    } else {
      return a < b ? -1 : 1;
    }
  }
};
var stringCompare = function(a, b) {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
};
var requireKey = function(key, obj) {
  if (obj && key in obj) {
    return obj[key];
  } else {
    throw new Error("Missing required key (" + key + ") in object: " + stringify(obj));
  }
};
var ObjectToUniqueKey = function(obj) {
  if (typeof obj !== "object" || obj === null) {
    return stringify(obj);
  }
  const keys = [];
  for (const k in obj) {
    keys.push(k);
  }
  keys.sort();
  let key = "{";
  for (let i = 0; i < keys.length; i++) {
    if (i !== 0) {
      key += ",";
    }
    key += stringify(keys[i]);
    key += ":";
    key += ObjectToUniqueKey(obj[keys[i]]);
  }
  key += "}";
  return key;
};
var splitStringBySize = function(str, segsize) {
  const len = str.length;
  if (len <= segsize) {
    return [str];
  }
  const dataSegs = [];
  for (let c = 0; c < len; c += segsize) {
    if (c + segsize > len) {
      dataSegs.push(str.substring(c, len));
    } else {
      dataSegs.push(str.substring(c, c + segsize));
    }
  }
  return dataSegs;
};
function each(obj, fn) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(key, obj[key]);
    }
  }
}
var doubleToIEEE754String = function(v) {
  assert(!isInvalidJSONNumber(v), "Invalid JSON number");
  const ebits = 11, fbits = 52;
  const bias = (1 << ebits - 1) - 1;
  let s, e, f, ln, i;
  if (v === 0) {
    e = 0;
    f = 0;
    s = 1 / v === -Infinity ? 1 : 0;
  } else {
    s = v < 0;
    v = Math.abs(v);
    if (v >= Math.pow(2, 1 - bias)) {
      ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
      e = ln + bias;
      f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
    } else {
      e = 0;
      f = Math.round(v / Math.pow(2, 1 - bias - fbits));
    }
  }
  const bits = [];
  for (i = fbits; i; i -= 1) {
    bits.push(f % 2 ? 1 : 0);
    f = Math.floor(f / 2);
  }
  for (i = ebits; i; i -= 1) {
    bits.push(e % 2 ? 1 : 0);
    e = Math.floor(e / 2);
  }
  bits.push(s ? 1 : 0);
  bits.reverse();
  const str = bits.join("");
  let hexByteString = "";
  for (i = 0; i < 64; i += 8) {
    let hexByte = parseInt(str.substr(i, 8), 2).toString(16);
    if (hexByte.length === 1) {
      hexByte = "0" + hexByte;
    }
    hexByteString = hexByteString + hexByte;
  }
  return hexByteString.toLowerCase();
};
var isChromeExtensionContentScript = function() {
  return !!(typeof window === "object" && window["chrome"] && window["chrome"]["extension"] && !/^chrome/.test(window.location.href));
};
var isWindowsStoreApp = function() {
  return typeof Windows === "object" && typeof Windows.UI === "object";
};
function errorForServerCode(code, query) {
  let reason = "Unknown Error";
  if (code === "too_big") {
    reason = "The data requested exceeds the maximum size that can be accessed with a single request.";
  } else if (code === "permission_denied") {
    reason = "Client doesn't have permission to access the desired data.";
  } else if (code === "unavailable") {
    reason = "The service is unavailable";
  }
  const error2 = new Error(code + " at " + query._path.toString() + ": " + reason);
  error2.code = code.toUpperCase();
  return error2;
}
var INTEGER_REGEXP_ = new RegExp("^-?(0*)\\d{1,10}$");
var INTEGER_32_MIN = -2147483648;
var INTEGER_32_MAX = 2147483647;
var tryParseInt = function(str) {
  if (INTEGER_REGEXP_.test(str)) {
    const intVal = Number(str);
    if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) {
      return intVal;
    }
  }
  return null;
};
var exceptionGuard = function(fn) {
  try {
    fn();
  } catch (e) {
    setTimeout(() => {
      const stack = e.stack || "";
      warn("Exception was thrown by user callback.", stack);
      throw e;
    }, Math.floor(0));
  }
};
var beingCrawled = function() {
  const userAgent = typeof window === "object" && window["navigator"] && window["navigator"]["userAgent"] || "";
  return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
};
var setTimeoutNonBlocking = function(fn, time) {
  const timeout = setTimeout(fn, time);
  if (typeof timeout === "number" && // @ts-ignore Is only defined in Deno environments.
  typeof Deno !== "undefined" && // @ts-ignore Deno and unrefTimer are only defined in Deno environments.
  Deno["unrefTimer"]) {
    Deno.unrefTimer(timeout);
  } else if (typeof timeout === "object" && timeout["unref"]) {
    timeout["unref"]();
  }
  return timeout;
};
var AppCheckTokenProvider = class {
  constructor(appName_, appCheckProvider) {
    this.appName_ = appName_;
    this.appCheckProvider = appCheckProvider;
    this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
    if (!this.appCheck) {
      appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then((appCheck) => this.appCheck = appCheck);
    }
  }
  getToken(forceRefresh) {
    if (!this.appCheck) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.appCheck) {
            this.getToken(forceRefresh).then(resolve, reject);
          } else {
            resolve(null);
          }
        }, 0);
      });
    }
    return this.appCheck.getToken(forceRefresh);
  }
  addTokenChangeListener(listener) {
    var _a;
    (_a = this.appCheckProvider) === null || _a === void 0 ? void 0 : _a.get().then((appCheck) => appCheck.addTokenListener(listener));
  }
  notifyForInvalidToken() {
    warn(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`);
  }
};
var FirebaseAuthTokenProvider = class {
  constructor(appName_, firebaseOptions_, authProvider_) {
    this.appName_ = appName_;
    this.firebaseOptions_ = firebaseOptions_;
    this.authProvider_ = authProvider_;
    this.auth_ = null;
    this.auth_ = authProvider_.getImmediate({ optional: true });
    if (!this.auth_) {
      authProvider_.onInit((auth) => this.auth_ = auth);
    }
  }
  getToken(forceRefresh) {
    if (!this.auth_) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.auth_) {
            this.getToken(forceRefresh).then(resolve, reject);
          } else {
            resolve(null);
          }
        }, 0);
      });
    }
    return this.auth_.getToken(forceRefresh).catch((error2) => {
      if (error2 && error2.code === "auth/token-not-initialized") {
        log("Got auth/token-not-initialized error.  Treating as null token.");
        return null;
      } else {
        return Promise.reject(error2);
      }
    });
  }
  addTokenChangeListener(listener) {
    if (this.auth_) {
      this.auth_.addAuthTokenListener(listener);
    } else {
      this.authProvider_.get().then((auth) => auth.addAuthTokenListener(listener));
    }
  }
  removeTokenChangeListener(listener) {
    this.authProvider_.get().then((auth) => auth.removeAuthTokenListener(listener));
  }
  notifyForInvalidToken() {
    let errorMessage = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
    if ("credential" in this.firebaseOptions_) {
      errorMessage += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.';
    } else if ("serviceAccount" in this.firebaseOptions_) {
      errorMessage += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.';
    } else {
      errorMessage += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.';
    }
    warn(errorMessage);
  }
};
var EmulatorTokenProvider = class {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }
  getToken(forceRefresh) {
    return Promise.resolve({
      accessToken: this.accessToken
    });
  }
  addTokenChangeListener(listener) {
    listener(this.accessToken);
  }
  removeTokenChangeListener(listener) {
  }
  notifyForInvalidToken() {
  }
};
EmulatorTokenProvider.OWNER = "owner";
var PROTOCOL_VERSION = "5";
var VERSION_PARAM = "v";
var TRANSPORT_SESSION_PARAM = "s";
var REFERER_PARAM = "r";
var FORGE_REF = "f";
var FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
var LAST_SESSION_PARAM = "ls";
var APPLICATION_ID_PARAM = "p";
var APP_CHECK_TOKEN_PARAM = "ac";
var WEBSOCKET = "websocket";
var LONG_POLLING = "long_polling";
var RepoInfo = class {
  /**
   * @param host - Hostname portion of the url for the repo
   * @param secure - Whether or not this repo is accessed over ssl
   * @param namespace - The namespace represented by the repo
   * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
   * @param nodeAdmin - Whether this instance uses Admin SDK credentials
   * @param persistenceKey - Override the default session persistence storage key
   */
  constructor(host, secure, namespace, webSocketOnly, nodeAdmin = false, persistenceKey = "", includeNamespaceInQueryParams = false, isUsingEmulator = false) {
    this.secure = secure;
    this.namespace = namespace;
    this.webSocketOnly = webSocketOnly;
    this.nodeAdmin = nodeAdmin;
    this.persistenceKey = persistenceKey;
    this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
    this.isUsingEmulator = isUsingEmulator;
    this._host = host.toLowerCase();
    this._domain = this._host.substr(this._host.indexOf(".") + 1);
    this.internalHost = PersistentStorage.get("host:" + host) || this._host;
  }
  isCacheableHost() {
    return this.internalHost.substr(0, 2) === "s-";
  }
  isCustomHost() {
    return this._domain !== "firebaseio.com" && this._domain !== "firebaseio-demo.com";
  }
  get host() {
    return this._host;
  }
  set host(newHost) {
    if (newHost !== this.internalHost) {
      this.internalHost = newHost;
      if (this.isCacheableHost()) {
        PersistentStorage.set("host:" + this._host, this.internalHost);
      }
    }
  }
  toString() {
    let str = this.toURLString();
    if (this.persistenceKey) {
      str += "<" + this.persistenceKey + ">";
    }
    return str;
  }
  toURLString() {
    const protocol = this.secure ? "https://" : "http://";
    const query = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
    return `${protocol}${this.host}/${query}`;
  }
};
function repoInfoNeedsQueryParam(repoInfo) {
  return repoInfo.host !== repoInfo.internalHost || repoInfo.isCustomHost() || repoInfo.includeNamespaceInQueryParams;
}
function repoInfoConnectionURL(repoInfo, type, params) {
  assert(typeof type === "string", "typeof type must == string");
  assert(typeof params === "object", "typeof params must == object");
  let connURL;
  if (type === WEBSOCKET) {
    connURL = (repoInfo.secure ? "wss://" : "ws://") + repoInfo.internalHost + "/.ws?";
  } else if (type === LONG_POLLING) {
    connURL = (repoInfo.secure ? "https://" : "http://") + repoInfo.internalHost + "/.lp?";
  } else {
    throw new Error("Unknown connection type: " + type);
  }
  if (repoInfoNeedsQueryParam(repoInfo)) {
    params["ns"] = repoInfo.namespace;
  }
  const pairs = [];
  each(params, (key, value) => {
    pairs.push(key + "=" + value);
  });
  return connURL + pairs.join("&");
}
var StatsCollection = class {
  constructor() {
    this.counters_ = {};
  }
  incrementCounter(name4, amount = 1) {
    if (!contains(this.counters_, name4)) {
      this.counters_[name4] = 0;
    }
    this.counters_[name4] += amount;
  }
  get() {
    return deepCopy(this.counters_);
  }
};
var collections = {};
var reporters = {};
function statsManagerGetCollection(repoInfo) {
  const hashString = repoInfo.toString();
  if (!collections[hashString]) {
    collections[hashString] = new StatsCollection();
  }
  return collections[hashString];
}
function statsManagerGetOrCreateReporter(repoInfo, creatorFunction) {
  const hashString = repoInfo.toString();
  if (!reporters[hashString]) {
    reporters[hashString] = creatorFunction();
  }
  return reporters[hashString];
}
var PacketReceiver = class {
  /**
   * @param onMessage_
   */
  constructor(onMessage_) {
    this.onMessage_ = onMessage_;
    this.pendingResponses = [];
    this.currentResponseNum = 0;
    this.closeAfterResponse = -1;
    this.onClose = null;
  }
  closeAfter(responseNum, callback) {
    this.closeAfterResponse = responseNum;
    this.onClose = callback;
    if (this.closeAfterResponse < this.currentResponseNum) {
      this.onClose();
      this.onClose = null;
    }
  }
  /**
   * Each message from the server comes with a response number, and an array of data. The responseNumber
   * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
   * browsers will respond in the same order as the requests we sent
   */
  handleResponse(requestNum, data) {
    this.pendingResponses[requestNum] = data;
    while (this.pendingResponses[this.currentResponseNum]) {
      const toProcess = this.pendingResponses[this.currentResponseNum];
      delete this.pendingResponses[this.currentResponseNum];
      for (let i = 0; i < toProcess.length; ++i) {
        if (toProcess[i]) {
          exceptionGuard(() => {
            this.onMessage_(toProcess[i]);
          });
        }
      }
      if (this.currentResponseNum === this.closeAfterResponse) {
        if (this.onClose) {
          this.onClose();
          this.onClose = null;
        }
        break;
      }
      this.currentResponseNum++;
    }
  }
};
var FIREBASE_LONGPOLL_START_PARAM = "start";
var FIREBASE_LONGPOLL_CLOSE_COMMAND = "close";
var FIREBASE_LONGPOLL_COMMAND_CB_NAME = "pLPCommand";
var FIREBASE_LONGPOLL_DATA_CB_NAME = "pRTLPCB";
var FIREBASE_LONGPOLL_ID_PARAM = "id";
var FIREBASE_LONGPOLL_PW_PARAM = "pw";
var FIREBASE_LONGPOLL_SERIAL_PARAM = "ser";
var FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = "cb";
var FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = "seg";
var FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = "ts";
var FIREBASE_LONGPOLL_DATA_PARAM = "d";
var FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = "dframe";
var MAX_URL_DATA_SIZE = 1870;
var SEG_HEADER_SIZE = 30;
var MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
var KEEPALIVE_REQUEST_INTERVAL = 25e3;
var LP_CONNECT_TIMEOUT = 3e4;
var BrowserPollConnection = class {
  /**
   * @param connId An identifier for this connection, used for logging
   * @param repoInfo The info for the endpoint to send data to.
   * @param applicationId The Firebase App ID for this project.
   * @param appCheckToken The AppCheck token for this client.
   * @param authToken The AuthToken to use for this connection.
   * @param transportSessionId Optional transportSessionid if we are
   * reconnecting for an existing transport session
   * @param lastSessionId Optional lastSessionId if the PersistentConnection has
   * already created a connection previously
   */
  constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
    this.connId = connId;
    this.repoInfo = repoInfo;
    this.applicationId = applicationId;
    this.appCheckToken = appCheckToken;
    this.authToken = authToken;
    this.transportSessionId = transportSessionId;
    this.lastSessionId = lastSessionId;
    this.bytesSent = 0;
    this.bytesReceived = 0;
    this.everConnected_ = false;
    this.log_ = logWrapper(connId);
    this.stats_ = statsManagerGetCollection(repoInfo);
    this.urlFn = (params) => {
      if (this.appCheckToken) {
        params[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
      }
      return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
    };
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  open(onMessage, onDisconnect) {
    this.curSegmentNum = 0;
    this.onDisconnect_ = onDisconnect;
    this.myPacketOrderer = new PacketReceiver(onMessage);
    this.isClosed_ = false;
    this.connectTimeoutTimer_ = setTimeout(() => {
      this.log_("Timed out trying to connect.");
      this.onClosed_();
      this.connectTimeoutTimer_ = null;
    }, Math.floor(LP_CONNECT_TIMEOUT));
    executeWhenDOMReady(() => {
      if (this.isClosed_) {
        return;
      }
      this.scriptTagHolder = new FirebaseIFrameScriptHolder((...args) => {
        const [command, arg1, arg2, arg3, arg4] = args;
        this.incrementIncomingBytes_(args);
        if (!this.scriptTagHolder) {
          return;
        }
        if (this.connectTimeoutTimer_) {
          clearTimeout(this.connectTimeoutTimer_);
          this.connectTimeoutTimer_ = null;
        }
        this.everConnected_ = true;
        if (command === FIREBASE_LONGPOLL_START_PARAM) {
          this.id = arg1;
          this.password = arg2;
        } else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
          if (arg1) {
            this.scriptTagHolder.sendNewPolls = false;
            this.myPacketOrderer.closeAfter(arg1, () => {
              this.onClosed_();
            });
          } else {
            this.onClosed_();
          }
        } else {
          throw new Error("Unrecognized command received: " + command);
        }
      }, (...args) => {
        const [pN, data] = args;
        this.incrementIncomingBytes_(args);
        this.myPacketOrderer.handleResponse(pN, data);
      }, () => {
        this.onClosed_();
      }, this.urlFn);
      const urlParams = {};
      urlParams[FIREBASE_LONGPOLL_START_PARAM] = "t";
      urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 1e8);
      if (this.scriptTagHolder.uniqueCallbackIdentifier) {
        urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] = this.scriptTagHolder.uniqueCallbackIdentifier;
      }
      urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
      if (this.transportSessionId) {
        urlParams[TRANSPORT_SESSION_PARAM] = this.transportSessionId;
      }
      if (this.lastSessionId) {
        urlParams[LAST_SESSION_PARAM] = this.lastSessionId;
      }
      if (this.applicationId) {
        urlParams[APPLICATION_ID_PARAM] = this.applicationId;
      }
      if (this.appCheckToken) {
        urlParams[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
      }
      if (typeof location !== "undefined" && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) {
        urlParams[REFERER_PARAM] = FORGE_REF;
      }
      const connectURL = this.urlFn(urlParams);
      this.log_("Connecting via long-poll to " + connectURL);
      this.scriptTagHolder.addTag(connectURL, () => {
      });
    });
  }
  /**
   * Call this when a handshake has completed successfully and we want to consider the connection established
   */
  start() {
    this.scriptTagHolder.startLongPoll(this.id, this.password);
    this.addDisconnectPingFrame(this.id, this.password);
  }
  /**
   * Forces long polling to be considered as a potential transport
   */
  static forceAllow() {
    BrowserPollConnection.forceAllow_ = true;
  }
  /**
   * Forces longpolling to not be considered as a potential transport
   */
  static forceDisallow() {
    BrowserPollConnection.forceDisallow_ = true;
  }
  // Static method, use string literal so it can be accessed in a generic way
  static isAvailable() {
    if (isNodeSdk()) {
      return false;
    } else if (BrowserPollConnection.forceAllow_) {
      return true;
    } else {
      return !BrowserPollConnection.forceDisallow_ && typeof document !== "undefined" && document.createElement != null && !isChromeExtensionContentScript() && !isWindowsStoreApp();
    }
  }
  /**
   * No-op for polling
   */
  markConnectionHealthy() {
  }
  /**
   * Stops polling and cleans up the iframe
   */
  shutdown_() {
    this.isClosed_ = true;
    if (this.scriptTagHolder) {
      this.scriptTagHolder.close();
      this.scriptTagHolder = null;
    }
    if (this.myDisconnFrame) {
      document.body.removeChild(this.myDisconnFrame);
      this.myDisconnFrame = null;
    }
    if (this.connectTimeoutTimer_) {
      clearTimeout(this.connectTimeoutTimer_);
      this.connectTimeoutTimer_ = null;
    }
  }
  /**
   * Triggered when this transport is closed
   */
  onClosed_() {
    if (!this.isClosed_) {
      this.log_("Longpoll is closing itself");
      this.shutdown_();
      if (this.onDisconnect_) {
        this.onDisconnect_(this.everConnected_);
        this.onDisconnect_ = null;
      }
    }
  }
  /**
   * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
   * that we've left.
   */
  close() {
    if (!this.isClosed_) {
      this.log_("Longpoll is being closed.");
      this.shutdown_();
    }
  }
  /**
   * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
   * broken into chunks (since URLs have a small maximum length).
   * @param data - The JSON data to transmit.
   */
  send(data) {
    const dataStr = stringify(data);
    this.bytesSent += dataStr.length;
    this.stats_.incrementCounter("bytes_sent", dataStr.length);
    const base64data = base64Encode(dataStr);
    const dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
    for (let i = 0; i < dataSegs.length; i++) {
      this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
      this.curSegmentNum++;
    }
  }
  /**
   * This is how we notify the server that we're leaving.
   * We aren't able to send requests with DHTML on a window close event, but we can
   * trigger XHR requests in some browsers (everything but Opera basically).
   */
  addDisconnectPingFrame(id, pw) {
    if (isNodeSdk()) {
      return;
    }
    this.myDisconnFrame = document.createElement("iframe");
    const urlParams = {};
    urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = "t";
    urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
    urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
    this.myDisconnFrame.src = this.urlFn(urlParams);
    this.myDisconnFrame.style.display = "none";
    document.body.appendChild(this.myDisconnFrame);
  }
  /**
   * Used to track the bytes received by this client
   */
  incrementIncomingBytes_(args) {
    const bytesReceived = stringify(args).length;
    this.bytesReceived += bytesReceived;
    this.stats_.incrementCounter("bytes_received", bytesReceived);
  }
};
var FirebaseIFrameScriptHolder = class {
  /**
   * @param commandCB - The callback to be called when control commands are received from the server.
   * @param onMessageCB - The callback to be triggered when responses arrive from the server.
   * @param onDisconnect - The callback to be triggered when this tag holder is closed
   * @param urlFn - A function that provides the URL of the endpoint to send data to.
   */
  constructor(commandCB, onMessageCB, onDisconnect, urlFn) {
    this.onDisconnect = onDisconnect;
    this.urlFn = urlFn;
    this.outstandingRequests = /* @__PURE__ */ new Set();
    this.pendingSegs = [];
    this.currentSerial = Math.floor(Math.random() * 1e8);
    this.sendNewPolls = true;
    if (!isNodeSdk()) {
      this.uniqueCallbackIdentifier = LUIDGenerator();
      window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
      window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] = onMessageCB;
      this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
      let script = "";
      if (this.myIFrame.src && this.myIFrame.src.substr(0, "javascript:".length) === "javascript:") {
        const currentDomain = document.domain;
        script = '<script>document.domain="' + currentDomain + '";<\/script>';
      }
      const iframeContents = "<html><body>" + script + "</body></html>";
      try {
        this.myIFrame.doc.open();
        this.myIFrame.doc.write(iframeContents);
        this.myIFrame.doc.close();
      } catch (e) {
        log("frame writing exception");
        if (e.stack) {
          log(e.stack);
        }
        log(e);
      }
    } else {
      this.commandCB = commandCB;
      this.onMessageCB = onMessageCB;
    }
  }
  /**
   * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
   * actually use.
   */
  static createIFrame_() {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    if (document.body) {
      document.body.appendChild(iframe);
      try {
        const a = iframe.contentWindow.document;
        if (!a) {
          log("No IE domain setting required");
        }
      } catch (e) {
        const domain = document.domain;
        iframe.src = "javascript:void((function(){document.open();document.domain='" + domain + "';document.close();})())";
      }
    } else {
      throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
    }
    if (iframe.contentDocument) {
      iframe.doc = iframe.contentDocument;
    } else if (iframe.contentWindow) {
      iframe.doc = iframe.contentWindow.document;
    } else if (iframe.document) {
      iframe.doc = iframe.document;
    }
    return iframe;
  }
  /**
   * Cancel all outstanding queries and remove the frame.
   */
  close() {
    this.alive = false;
    if (this.myIFrame) {
      this.myIFrame.doc.body.textContent = "";
      setTimeout(() => {
        if (this.myIFrame !== null) {
          document.body.removeChild(this.myIFrame);
          this.myIFrame = null;
        }
      }, Math.floor(0));
    }
    const onDisconnect = this.onDisconnect;
    if (onDisconnect) {
      this.onDisconnect = null;
      onDisconnect();
    }
  }
  /**
   * Actually start the long-polling session by adding the first script tag(s) to the iframe.
   * @param id - The ID of this connection
   * @param pw - The password for this connection
   */
  startLongPoll(id, pw) {
    this.myID = id;
    this.myPW = pw;
    this.alive = true;
    while (this.newRequest_()) {
    }
  }
  /**
   * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
   * too many outstanding requests and we are still alive.
   *
   * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
   * needed.
   */
  newRequest_() {
    if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
      this.currentSerial++;
      const urlParams = {};
      urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
      urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
      urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
      let theURL = this.urlFn(urlParams);
      let curDataString = "";
      let i = 0;
      while (this.pendingSegs.length > 0) {
        const nextSeg = this.pendingSegs[0];
        if (nextSeg.d.length + SEG_HEADER_SIZE + curDataString.length <= MAX_URL_DATA_SIZE) {
          const theSeg = this.pendingSegs.shift();
          curDataString = curDataString + "&" + FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM + i + "=" + theSeg.seg + "&" + FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET + i + "=" + theSeg.ts + "&" + FIREBASE_LONGPOLL_DATA_PARAM + i + "=" + theSeg.d;
          i++;
        } else {
          break;
        }
      }
      theURL = theURL + curDataString;
      this.addLongPollTag_(theURL, this.currentSerial);
      return true;
    } else {
      return false;
    }
  }
  /**
   * Queue a packet for transmission to the server.
   * @param segnum - A sequential id for this packet segment used for reassembly
   * @param totalsegs - The total number of segments in this packet
   * @param data - The data for this segment.
   */
  enqueueSegment(segnum, totalsegs, data) {
    this.pendingSegs.push({ seg: segnum, ts: totalsegs, d: data });
    if (this.alive) {
      this.newRequest_();
    }
  }
  /**
   * Add a script tag for a regular long-poll request.
   * @param url - The URL of the script tag.
   * @param serial - The serial number of the request.
   */
  addLongPollTag_(url, serial) {
    this.outstandingRequests.add(serial);
    const doNewRequest = () => {
      this.outstandingRequests.delete(serial);
      this.newRequest_();
    };
    const keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
    const readyStateCB = () => {
      clearTimeout(keepaliveTimeout);
      doNewRequest();
    };
    this.addTag(url, readyStateCB);
  }
  /**
   * Add an arbitrary script tag to the iframe.
   * @param url - The URL for the script tag source.
   * @param loadCB - A callback to be triggered once the script has loaded.
   */
  addTag(url, loadCB) {
    if (isNodeSdk()) {
      this.doNodeLongPoll(url, loadCB);
    } else {
      setTimeout(() => {
        try {
          if (!this.sendNewPolls) {
            return;
          }
          const newScript = this.myIFrame.doc.createElement("script");
          newScript.type = "text/javascript";
          newScript.async = true;
          newScript.src = url;
          newScript.onload = newScript.onreadystatechange = function() {
            const rstate = newScript.readyState;
            if (!rstate || rstate === "loaded" || rstate === "complete") {
              newScript.onload = newScript.onreadystatechange = null;
              if (newScript.parentNode) {
                newScript.parentNode.removeChild(newScript);
              }
              loadCB();
            }
          };
          newScript.onerror = () => {
            log("Long-poll script failed to load: " + url);
            this.sendNewPolls = false;
            this.close();
          };
          this.myIFrame.doc.body.appendChild(newScript);
        } catch (e) {
        }
      }, Math.floor(1));
    }
  }
};
var WEBSOCKET_MAX_FRAME_SIZE = 16384;
var WEBSOCKET_KEEPALIVE_INTERVAL = 45e3;
var WebSocketImpl = null;
if (typeof MozWebSocket !== "undefined") {
  WebSocketImpl = MozWebSocket;
} else if (typeof WebSocket !== "undefined") {
  WebSocketImpl = WebSocket;
}
var WebSocketConnection = class {
  /**
   * @param connId identifier for this transport
   * @param repoInfo The info for the websocket endpoint.
   * @param applicationId The Firebase App ID for this project.
   * @param appCheckToken The App Check Token for this client.
   * @param authToken The Auth Token for this client.
   * @param transportSessionId Optional transportSessionId if this is connecting
   * to an existing transport session
   * @param lastSessionId Optional lastSessionId if there was a previous
   * connection
   */
  constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
    this.connId = connId;
    this.applicationId = applicationId;
    this.appCheckToken = appCheckToken;
    this.authToken = authToken;
    this.keepaliveTimer = null;
    this.frames = null;
    this.totalFrames = 0;
    this.bytesSent = 0;
    this.bytesReceived = 0;
    this.log_ = logWrapper(this.connId);
    this.stats_ = statsManagerGetCollection(repoInfo);
    this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId);
    this.nodeAdmin = repoInfo.nodeAdmin;
  }
  /**
   * @param repoInfo - The info for the websocket endpoint.
   * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
   *                                         session
   * @param lastSessionId - Optional lastSessionId if there was a previous connection
   * @returns connection url
   */
  static connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId) {
    const urlParams = {};
    urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
    if (!isNodeSdk() && typeof location !== "undefined" && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) {
      urlParams[REFERER_PARAM] = FORGE_REF;
    }
    if (transportSessionId) {
      urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
    }
    if (lastSessionId) {
      urlParams[LAST_SESSION_PARAM] = lastSessionId;
    }
    if (appCheckToken) {
      urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
    }
    if (applicationId) {
      urlParams[APPLICATION_ID_PARAM] = applicationId;
    }
    return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  open(onMessage, onDisconnect) {
    this.onDisconnect = onDisconnect;
    this.onMessage = onMessage;
    this.log_("Websocket connecting to " + this.connURL);
    this.everConnected_ = false;
    PersistentStorage.set("previous_websocket_failure", true);
    try {
      let options;
      if (isNodeSdk()) {
        const device = this.nodeAdmin ? "AdminNode" : "Node";
        options = {
          headers: {
            "User-Agent": `Firebase/${PROTOCOL_VERSION}/${SDK_VERSION2}/${process.platform}/${device}`,
            "X-Firebase-GMPID": this.applicationId || ""
          }
        };
        if (this.authToken) {
          options.headers["Authorization"] = `Bearer ${this.authToken}`;
        }
        if (this.appCheckToken) {
          options.headers["X-Firebase-AppCheck"] = this.appCheckToken;
        }
        const env = process["env"];
        const proxy = this.connURL.indexOf("wss://") === 0 ? env["HTTPS_PROXY"] || env["https_proxy"] : env["HTTP_PROXY"] || env["http_proxy"];
        if (proxy) {
          options["proxy"] = { origin: proxy };
        }
      }
      this.mySock = new WebSocketImpl(this.connURL, [], options);
    } catch (e) {
      this.log_("Error instantiating WebSocket.");
      const error2 = e.message || e.data;
      if (error2) {
        this.log_(error2);
      }
      this.onClosed_();
      return;
    }
    this.mySock.onopen = () => {
      this.log_("Websocket connected.");
      this.everConnected_ = true;
    };
    this.mySock.onclose = () => {
      this.log_("Websocket connection was disconnected.");
      this.mySock = null;
      this.onClosed_();
    };
    this.mySock.onmessage = (m) => {
      this.handleIncomingFrame(m);
    };
    this.mySock.onerror = (e) => {
      this.log_("WebSocket error.  Closing connection.");
      const error2 = e.message || e.data;
      if (error2) {
        this.log_(error2);
      }
      this.onClosed_();
    };
  }
  /**
   * No-op for websockets, we don't need to do anything once the connection is confirmed as open
   */
  start() {
  }
  static forceDisallow() {
    WebSocketConnection.forceDisallow_ = true;
  }
  static isAvailable() {
    let isOldAndroid = false;
    if (typeof navigator !== "undefined" && navigator.userAgent) {
      const oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
      const oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
      if (oldAndroidMatch && oldAndroidMatch.length > 1) {
        if (parseFloat(oldAndroidMatch[1]) < 4.4) {
          isOldAndroid = true;
        }
      }
    }
    return !isOldAndroid && WebSocketImpl !== null && !WebSocketConnection.forceDisallow_;
  }
  /**
   * Returns true if we previously failed to connect with this transport.
   */
  static previouslyFailed() {
    return PersistentStorage.isInMemoryStorage || PersistentStorage.get("previous_websocket_failure") === true;
  }
  markConnectionHealthy() {
    PersistentStorage.remove("previous_websocket_failure");
  }
  appendFrame_(data) {
    this.frames.push(data);
    if (this.frames.length === this.totalFrames) {
      const fullMess = this.frames.join("");
      this.frames = null;
      const jsonMess = jsonEval(fullMess);
      this.onMessage(jsonMess);
    }
  }
  /**
   * @param frameCount - The number of frames we are expecting from the server
   */
  handleNewFrameCount_(frameCount) {
    this.totalFrames = frameCount;
    this.frames = [];
  }
  /**
   * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
   * @returns Any remaining data to be process, or null if there is none
   */
  extractFrameCount_(data) {
    assert(this.frames === null, "We already have a frame buffer");
    if (data.length <= 6) {
      const frameCount = Number(data);
      if (!isNaN(frameCount)) {
        this.handleNewFrameCount_(frameCount);
        return null;
      }
    }
    this.handleNewFrameCount_(1);
    return data;
  }
  /**
   * Process a websocket frame that has arrived from the server.
   * @param mess - The frame data
   */
  handleIncomingFrame(mess) {
    if (this.mySock === null) {
      return;
    }
    const data = mess["data"];
    this.bytesReceived += data.length;
    this.stats_.incrementCounter("bytes_received", data.length);
    this.resetKeepAlive();
    if (this.frames !== null) {
      this.appendFrame_(data);
    } else {
      const remainingData = this.extractFrameCount_(data);
      if (remainingData !== null) {
        this.appendFrame_(remainingData);
      }
    }
  }
  /**
   * Send a message to the server
   * @param data - The JSON object to transmit
   */
  send(data) {
    this.resetKeepAlive();
    const dataStr = stringify(data);
    this.bytesSent += dataStr.length;
    this.stats_.incrementCounter("bytes_sent", dataStr.length);
    const dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
    if (dataSegs.length > 1) {
      this.sendString_(String(dataSegs.length));
    }
    for (let i = 0; i < dataSegs.length; i++) {
      this.sendString_(dataSegs[i]);
    }
  }
  shutdown_() {
    this.isClosed_ = true;
    if (this.keepaliveTimer) {
      clearInterval(this.keepaliveTimer);
      this.keepaliveTimer = null;
    }
    if (this.mySock) {
      this.mySock.close();
      this.mySock = null;
    }
  }
  onClosed_() {
    if (!this.isClosed_) {
      this.log_("WebSocket is closing itself");
      this.shutdown_();
      if (this.onDisconnect) {
        this.onDisconnect(this.everConnected_);
        this.onDisconnect = null;
      }
    }
  }
  /**
   * External-facing close handler.
   * Close the websocket and kill the connection.
   */
  close() {
    if (!this.isClosed_) {
      this.log_("WebSocket is being closed");
      this.shutdown_();
    }
  }
  /**
   * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
   * the last activity.
   */
  resetKeepAlive() {
    clearInterval(this.keepaliveTimer);
    this.keepaliveTimer = setInterval(() => {
      if (this.mySock) {
        this.sendString_("0");
      }
      this.resetKeepAlive();
    }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
  }
  /**
   * Send a string over the websocket.
   *
   * @param str - String to send.
   */
  sendString_(str) {
    try {
      this.mySock.send(str);
    } catch (e) {
      this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection.");
      setTimeout(this.onClosed_.bind(this), 0);
    }
  }
};
WebSocketConnection.responsesRequiredToBeHealthy = 2;
WebSocketConnection.healthyTimeout = 3e4;
var TransportManager = class {
  /**
   * @param repoInfo - Metadata around the namespace we're connecting to
   */
  constructor(repoInfo) {
    this.initTransports_(repoInfo);
  }
  static get ALL_TRANSPORTS() {
    return [BrowserPollConnection, WebSocketConnection];
  }
  /**
   * Returns whether transport has been selected to ensure WebSocketConnection or BrowserPollConnection are not called after
   * TransportManager has already set up transports_
   */
  static get IS_TRANSPORT_INITIALIZED() {
    return this.globalTransportInitialized_;
  }
  initTransports_(repoInfo) {
    const isWebSocketsAvailable = WebSocketConnection && WebSocketConnection["isAvailable"]();
    let isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
    if (repoInfo.webSocketOnly) {
      if (!isWebSocketsAvailable) {
        warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
      }
      isSkipPollConnection = true;
    }
    if (isSkipPollConnection) {
      this.transports_ = [WebSocketConnection];
    } else {
      const transports = this.transports_ = [];
      for (const transport of TransportManager.ALL_TRANSPORTS) {
        if (transport && transport["isAvailable"]()) {
          transports.push(transport);
        }
      }
      TransportManager.globalTransportInitialized_ = true;
    }
  }
  /**
   * @returns The constructor for the initial transport to use
   */
  initialTransport() {
    if (this.transports_.length > 0) {
      return this.transports_[0];
    } else {
      throw new Error("No transports available");
    }
  }
  /**
   * @returns The constructor for the next transport, or null
   */
  upgradeTransport() {
    if (this.transports_.length > 1) {
      return this.transports_[1];
    } else {
      return null;
    }
  }
};
TransportManager.globalTransportInitialized_ = false;
var UPGRADE_TIMEOUT = 6e4;
var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5e3;
var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
var MESSAGE_TYPE = "t";
var MESSAGE_DATA = "d";
var CONTROL_SHUTDOWN = "s";
var CONTROL_RESET = "r";
var CONTROL_ERROR = "e";
var CONTROL_PONG = "o";
var SWITCH_ACK = "a";
var END_TRANSMISSION = "n";
var PING = "p";
var SERVER_HELLO = "h";
var Connection = class {
  /**
   * @param id - an id for this connection
   * @param repoInfo_ - the info for the endpoint to connect to
   * @param applicationId_ - the Firebase App ID for this project
   * @param appCheckToken_ - The App Check Token for this device.
   * @param authToken_ - The auth token for this session.
   * @param onMessage_ - the callback to be triggered when a server-push message arrives
   * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
   * @param onDisconnect_ - the callback to be triggered when a connection was lost
   * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
   * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
   */
  constructor(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
    this.id = id;
    this.repoInfo_ = repoInfo_;
    this.applicationId_ = applicationId_;
    this.appCheckToken_ = appCheckToken_;
    this.authToken_ = authToken_;
    this.onMessage_ = onMessage_;
    this.onReady_ = onReady_;
    this.onDisconnect_ = onDisconnect_;
    this.onKill_ = onKill_;
    this.lastSessionId = lastSessionId;
    this.connectionCount = 0;
    this.pendingDataMessages = [];
    this.state_ = 0;
    this.log_ = logWrapper("c:" + this.id + ":");
    this.transportManager_ = new TransportManager(repoInfo_);
    this.log_("Connection created");
    this.start_();
  }
  /**
   * Starts a connection attempt
   */
  start_() {
    const conn = this.transportManager_.initialTransport();
    this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
    this.primaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
    const onMessageReceived = this.connReceiver_(this.conn_);
    const onConnectionLost = this.disconnReceiver_(this.conn_);
    this.tx_ = this.conn_;
    this.rx_ = this.conn_;
    this.secondaryConn_ = null;
    this.isHealthy_ = false;
    setTimeout(() => {
      this.conn_ && this.conn_.open(onMessageReceived, onConnectionLost);
    }, Math.floor(0));
    const healthyTimeoutMS = conn["healthyTimeout"] || 0;
    if (healthyTimeoutMS > 0) {
      this.healthyTimeout_ = setTimeoutNonBlocking(() => {
        this.healthyTimeout_ = null;
        if (!this.isHealthy_) {
          if (this.conn_ && this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
            this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy.");
            this.isHealthy_ = true;
            this.conn_.markConnectionHealthy();
          } else if (this.conn_ && this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
            this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.");
          } else {
            this.log_("Closing unhealthy connection after timeout.");
            this.close();
          }
        }
      }, Math.floor(healthyTimeoutMS));
    }
  }
  nextTransportId_() {
    return "c:" + this.id + ":" + this.connectionCount++;
  }
  disconnReceiver_(conn) {
    return (everConnected) => {
      if (conn === this.conn_) {
        this.onConnectionLost_(everConnected);
      } else if (conn === this.secondaryConn_) {
        this.log_("Secondary connection lost.");
        this.onSecondaryConnectionLost_();
      } else {
        this.log_("closing an old connection");
      }
    };
  }
  connReceiver_(conn) {
    return (message) => {
      if (this.state_ !== 2) {
        if (conn === this.rx_) {
          this.onPrimaryMessageReceived_(message);
        } else if (conn === this.secondaryConn_) {
          this.onSecondaryMessageReceived_(message);
        } else {
          this.log_("message on old connection");
        }
      }
    };
  }
  /**
   * @param dataMsg - An arbitrary data message to be sent to the server
   */
  sendRequest(dataMsg) {
    const msg = { t: "d", d: dataMsg };
    this.sendData_(msg);
  }
  tryCleanupConnection() {
    if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
      this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId);
      this.conn_ = this.secondaryConn_;
      this.secondaryConn_ = null;
    }
  }
  onSecondaryControl_(controlData) {
    if (MESSAGE_TYPE in controlData) {
      const cmd = controlData[MESSAGE_TYPE];
      if (cmd === SWITCH_ACK) {
        this.upgradeIfSecondaryHealthy_();
      } else if (cmd === CONTROL_RESET) {
        this.log_("Got a reset on secondary, closing it");
        this.secondaryConn_.close();
        if (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) {
          this.close();
        }
      } else if (cmd === CONTROL_PONG) {
        this.log_("got pong on secondary.");
        this.secondaryResponsesRequired_--;
        this.upgradeIfSecondaryHealthy_();
      }
    }
  }
  onSecondaryMessageReceived_(parsedData) {
    const layer = requireKey("t", parsedData);
    const data = requireKey("d", parsedData);
    if (layer === "c") {
      this.onSecondaryControl_(data);
    } else if (layer === "d") {
      this.pendingDataMessages.push(data);
    } else {
      throw new Error("Unknown protocol layer: " + layer);
    }
  }
  upgradeIfSecondaryHealthy_() {
    if (this.secondaryResponsesRequired_ <= 0) {
      this.log_("Secondary connection is healthy.");
      this.isHealthy_ = true;
      this.secondaryConn_.markConnectionHealthy();
      this.proceedWithUpgrade_();
    } else {
      this.log_("sending ping on secondary.");
      this.secondaryConn_.send({ t: "c", d: { t: PING, d: {} } });
    }
  }
  proceedWithUpgrade_() {
    this.secondaryConn_.start();
    this.log_("sending client ack on secondary");
    this.secondaryConn_.send({ t: "c", d: { t: SWITCH_ACK, d: {} } });
    this.log_("Ending transmission on primary");
    this.conn_.send({ t: "c", d: { t: END_TRANSMISSION, d: {} } });
    this.tx_ = this.secondaryConn_;
    this.tryCleanupConnection();
  }
  onPrimaryMessageReceived_(parsedData) {
    const layer = requireKey("t", parsedData);
    const data = requireKey("d", parsedData);
    if (layer === "c") {
      this.onControl_(data);
    } else if (layer === "d") {
      this.onDataMessage_(data);
    }
  }
  onDataMessage_(message) {
    this.onPrimaryResponse_();
    this.onMessage_(message);
  }
  onPrimaryResponse_() {
    if (!this.isHealthy_) {
      this.primaryResponsesRequired_--;
      if (this.primaryResponsesRequired_ <= 0) {
        this.log_("Primary connection is healthy.");
        this.isHealthy_ = true;
        this.conn_.markConnectionHealthy();
      }
    }
  }
  onControl_(controlData) {
    const cmd = requireKey(MESSAGE_TYPE, controlData);
    if (MESSAGE_DATA in controlData) {
      const payload = controlData[MESSAGE_DATA];
      if (cmd === SERVER_HELLO) {
        const handshakePayload = Object.assign({}, payload);
        if (this.repoInfo_.isUsingEmulator) {
          handshakePayload.h = this.repoInfo_.host;
        }
        this.onHandshake_(handshakePayload);
      } else if (cmd === END_TRANSMISSION) {
        this.log_("recvd end transmission on primary");
        this.rx_ = this.secondaryConn_;
        for (let i = 0; i < this.pendingDataMessages.length; ++i) {
          this.onDataMessage_(this.pendingDataMessages[i]);
        }
        this.pendingDataMessages = [];
        this.tryCleanupConnection();
      } else if (cmd === CONTROL_SHUTDOWN) {
        this.onConnectionShutdown_(payload);
      } else if (cmd === CONTROL_RESET) {
        this.onReset_(payload);
      } else if (cmd === CONTROL_ERROR) {
        error("Server Error: " + payload);
      } else if (cmd === CONTROL_PONG) {
        this.log_("got pong on primary.");
        this.onPrimaryResponse_();
        this.sendPingOnPrimaryIfNecessary_();
      } else {
        error("Unknown control packet command: " + cmd);
      }
    }
  }
  /**
   * @param handshake - The handshake data returned from the server
   */
  onHandshake_(handshake) {
    const timestamp = handshake.ts;
    const version4 = handshake.v;
    const host = handshake.h;
    this.sessionId = handshake.s;
    this.repoInfo_.host = host;
    if (this.state_ === 0) {
      this.conn_.start();
      this.onConnectionEstablished_(this.conn_, timestamp);
      if (PROTOCOL_VERSION !== version4) {
        warn("Protocol version mismatch detected");
      }
      this.tryStartUpgrade_();
    }
  }
  tryStartUpgrade_() {
    const conn = this.transportManager_.upgradeTransport();
    if (conn) {
      this.startUpgrade_(conn);
    }
  }
  startUpgrade_(conn) {
    this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
    this.secondaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
    const onMessage = this.connReceiver_(this.secondaryConn_);
    const onDisconnect = this.disconnReceiver_(this.secondaryConn_);
    this.secondaryConn_.open(onMessage, onDisconnect);
    setTimeoutNonBlocking(() => {
      if (this.secondaryConn_) {
        this.log_("Timed out trying to upgrade.");
        this.secondaryConn_.close();
      }
    }, Math.floor(UPGRADE_TIMEOUT));
  }
  onReset_(host) {
    this.log_("Reset packet received.  New host: " + host);
    this.repoInfo_.host = host;
    if (this.state_ === 1) {
      this.close();
    } else {
      this.closeConnections_();
      this.start_();
    }
  }
  onConnectionEstablished_(conn, timestamp) {
    this.log_("Realtime connection established.");
    this.conn_ = conn;
    this.state_ = 1;
    if (this.onReady_) {
      this.onReady_(timestamp, this.sessionId);
      this.onReady_ = null;
    }
    if (this.primaryResponsesRequired_ === 0) {
      this.log_("Primary connection is healthy.");
      this.isHealthy_ = true;
    } else {
      setTimeoutNonBlocking(() => {
        this.sendPingOnPrimaryIfNecessary_();
      }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
    }
  }
  sendPingOnPrimaryIfNecessary_() {
    if (!this.isHealthy_ && this.state_ === 1) {
      this.log_("sending ping on primary.");
      this.sendData_({ t: "c", d: { t: PING, d: {} } });
    }
  }
  onSecondaryConnectionLost_() {
    const conn = this.secondaryConn_;
    this.secondaryConn_ = null;
    if (this.tx_ === conn || this.rx_ === conn) {
      this.close();
    }
  }
  /**
   * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
   * we should flush the host cache
   */
  onConnectionLost_(everConnected) {
    this.conn_ = null;
    if (!everConnected && this.state_ === 0) {
      this.log_("Realtime connection failed.");
      if (this.repoInfo_.isCacheableHost()) {
        PersistentStorage.remove("host:" + this.repoInfo_.host);
        this.repoInfo_.internalHost = this.repoInfo_.host;
      }
    } else if (this.state_ === 1) {
      this.log_("Realtime connection lost.");
    }
    this.close();
  }
  onConnectionShutdown_(reason) {
    this.log_("Connection shutdown command received. Shutting down...");
    if (this.onKill_) {
      this.onKill_(reason);
      this.onKill_ = null;
    }
    this.onDisconnect_ = null;
    this.close();
  }
  sendData_(data) {
    if (this.state_ !== 1) {
      throw "Connection is not connected";
    } else {
      this.tx_.send(data);
    }
  }
  /**
   * Cleans up this connection, calling the appropriate callbacks
   */
  close() {
    if (this.state_ !== 2) {
      this.log_("Closing realtime connection.");
      this.state_ = 2;
      this.closeConnections_();
      if (this.onDisconnect_) {
        this.onDisconnect_();
        this.onDisconnect_ = null;
      }
    }
  }
  closeConnections_() {
    this.log_("Shutting down all connections");
    if (this.conn_) {
      this.conn_.close();
      this.conn_ = null;
    }
    if (this.secondaryConn_) {
      this.secondaryConn_.close();
      this.secondaryConn_ = null;
    }
    if (this.healthyTimeout_) {
      clearTimeout(this.healthyTimeout_);
      this.healthyTimeout_ = null;
    }
  }
};
var ServerActions = class {
  put(pathString, data, onComplete, hash) {
  }
  merge(pathString, data, onComplete, hash) {
  }
  /**
   * Refreshes the auth token for the current connection.
   * @param token - The authentication token
   */
  refreshAuthToken(token) {
  }
  /**
   * Refreshes the app check token for the current connection.
   * @param token The app check token
   */
  refreshAppCheckToken(token) {
  }
  onDisconnectPut(pathString, data, onComplete) {
  }
  onDisconnectMerge(pathString, data, onComplete) {
  }
  onDisconnectCancel(pathString, onComplete) {
  }
  reportStats(stats) {
  }
};
var EventEmitter = class {
  constructor(allowedEvents_) {
    this.allowedEvents_ = allowedEvents_;
    this.listeners_ = {};
    assert(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, "Requires a non-empty array");
  }
  /**
   * To be called by derived classes to trigger events.
   */
  trigger(eventType, ...varArgs) {
    if (Array.isArray(this.listeners_[eventType])) {
      const listeners = [...this.listeners_[eventType]];
      for (let i = 0; i < listeners.length; i++) {
        listeners[i].callback.apply(listeners[i].context, varArgs);
      }
    }
  }
  on(eventType, callback, context) {
    this.validateEventType_(eventType);
    this.listeners_[eventType] = this.listeners_[eventType] || [];
    this.listeners_[eventType].push({ callback, context });
    const eventData = this.getInitialEvent(eventType);
    if (eventData) {
      callback.apply(context, eventData);
    }
  }
  off(eventType, callback, context) {
    this.validateEventType_(eventType);
    const listeners = this.listeners_[eventType] || [];
    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i].callback === callback && (!context || context === listeners[i].context)) {
        listeners.splice(i, 1);
        return;
      }
    }
  }
  validateEventType_(eventType) {
    assert(this.allowedEvents_.find((et) => {
      return et === eventType;
    }), "Unknown event: " + eventType);
  }
};
var OnlineMonitor = class extends EventEmitter {
  constructor() {
    super(["online"]);
    this.online_ = true;
    if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined" && !isMobileCordova()) {
      window.addEventListener("online", () => {
        if (!this.online_) {
          this.online_ = true;
          this.trigger("online", true);
        }
      }, false);
      window.addEventListener("offline", () => {
        if (this.online_) {
          this.online_ = false;
          this.trigger("online", false);
        }
      }, false);
    }
  }
  static getInstance() {
    return new OnlineMonitor();
  }
  getInitialEvent(eventType) {
    assert(eventType === "online", "Unknown event type: " + eventType);
    return [this.online_];
  }
  currentlyOnline() {
    return this.online_;
  }
};
var MAX_PATH_DEPTH = 32;
var MAX_PATH_LENGTH_BYTES = 768;
var Path = class {
  /**
   * @param pathOrString - Path string to parse, or another path, or the raw
   * tokens array
   */
  constructor(pathOrString, pieceNum) {
    if (pieceNum === void 0) {
      this.pieces_ = pathOrString.split("/");
      let copyTo = 0;
      for (let i = 0; i < this.pieces_.length; i++) {
        if (this.pieces_[i].length > 0) {
          this.pieces_[copyTo] = this.pieces_[i];
          copyTo++;
        }
      }
      this.pieces_.length = copyTo;
      this.pieceNum_ = 0;
    } else {
      this.pieces_ = pathOrString;
      this.pieceNum_ = pieceNum;
    }
  }
  toString() {
    let pathString = "";
    for (let i = this.pieceNum_; i < this.pieces_.length; i++) {
      if (this.pieces_[i] !== "") {
        pathString += "/" + this.pieces_[i];
      }
    }
    return pathString || "/";
  }
};
function newEmptyPath() {
  return new Path("");
}
function pathGetFront(path) {
  if (path.pieceNum_ >= path.pieces_.length) {
    return null;
  }
  return path.pieces_[path.pieceNum_];
}
function pathGetLength(path) {
  return path.pieces_.length - path.pieceNum_;
}
function pathPopFront(path) {
  let pieceNum = path.pieceNum_;
  if (pieceNum < path.pieces_.length) {
    pieceNum++;
  }
  return new Path(path.pieces_, pieceNum);
}
function pathGetBack(path) {
  if (path.pieceNum_ < path.pieces_.length) {
    return path.pieces_[path.pieces_.length - 1];
  }
  return null;
}
function pathToUrlEncodedString(path) {
  let pathString = "";
  for (let i = path.pieceNum_; i < path.pieces_.length; i++) {
    if (path.pieces_[i] !== "") {
      pathString += "/" + encodeURIComponent(String(path.pieces_[i]));
    }
  }
  return pathString || "/";
}
function pathSlice(path, begin = 0) {
  return path.pieces_.slice(path.pieceNum_ + begin);
}
function pathParent(path) {
  if (path.pieceNum_ >= path.pieces_.length) {
    return null;
  }
  const pieces = [];
  for (let i = path.pieceNum_; i < path.pieces_.length - 1; i++) {
    pieces.push(path.pieces_[i]);
  }
  return new Path(pieces, 0);
}
function pathChild(path, childPathObj) {
  const pieces = [];
  for (let i = path.pieceNum_; i < path.pieces_.length; i++) {
    pieces.push(path.pieces_[i]);
  }
  if (childPathObj instanceof Path) {
    for (let i = childPathObj.pieceNum_; i < childPathObj.pieces_.length; i++) {
      pieces.push(childPathObj.pieces_[i]);
    }
  } else {
    const childPieces = childPathObj.split("/");
    for (let i = 0; i < childPieces.length; i++) {
      if (childPieces[i].length > 0) {
        pieces.push(childPieces[i]);
      }
    }
  }
  return new Path(pieces, 0);
}
function pathIsEmpty(path) {
  return path.pieceNum_ >= path.pieces_.length;
}
function newRelativePath(outerPath, innerPath) {
  const outer = pathGetFront(outerPath), inner = pathGetFront(innerPath);
  if (outer === null) {
    return innerPath;
  } else if (outer === inner) {
    return newRelativePath(pathPopFront(outerPath), pathPopFront(innerPath));
  } else {
    throw new Error("INTERNAL ERROR: innerPath (" + innerPath + ") is not within outerPath (" + outerPath + ")");
  }
}
function pathCompare(left, right) {
  const leftKeys = pathSlice(left, 0);
  const rightKeys = pathSlice(right, 0);
  for (let i = 0; i < leftKeys.length && i < rightKeys.length; i++) {
    const cmp = nameCompare(leftKeys[i], rightKeys[i]);
    if (cmp !== 0) {
      return cmp;
    }
  }
  if (leftKeys.length === rightKeys.length) {
    return 0;
  }
  return leftKeys.length < rightKeys.length ? -1 : 1;
}
function pathEquals(path, other) {
  if (pathGetLength(path) !== pathGetLength(other)) {
    return false;
  }
  for (let i = path.pieceNum_, j = other.pieceNum_; i <= path.pieces_.length; i++, j++) {
    if (path.pieces_[i] !== other.pieces_[j]) {
      return false;
    }
  }
  return true;
}
function pathContains(path, other) {
  let i = path.pieceNum_;
  let j = other.pieceNum_;
  if (pathGetLength(path) > pathGetLength(other)) {
    return false;
  }
  while (i < path.pieces_.length) {
    if (path.pieces_[i] !== other.pieces_[j]) {
      return false;
    }
    ++i;
    ++j;
  }
  return true;
}
var ValidationPath = class {
  /**
   * @param path - Initial Path.
   * @param errorPrefix_ - Prefix for any error messages.
   */
  constructor(path, errorPrefix_) {
    this.errorPrefix_ = errorPrefix_;
    this.parts_ = pathSlice(path, 0);
    this.byteLength_ = Math.max(1, this.parts_.length);
    for (let i = 0; i < this.parts_.length; i++) {
      this.byteLength_ += stringLength(this.parts_[i]);
    }
    validationPathCheckValid(this);
  }
};
function validationPathPush(validationPath, child2) {
  if (validationPath.parts_.length > 0) {
    validationPath.byteLength_ += 1;
  }
  validationPath.parts_.push(child2);
  validationPath.byteLength_ += stringLength(child2);
  validationPathCheckValid(validationPath);
}
function validationPathPop(validationPath) {
  const last = validationPath.parts_.pop();
  validationPath.byteLength_ -= stringLength(last);
  if (validationPath.parts_.length > 0) {
    validationPath.byteLength_ -= 1;
  }
}
function validationPathCheckValid(validationPath) {
  if (validationPath.byteLength_ > MAX_PATH_LENGTH_BYTES) {
    throw new Error(validationPath.errorPrefix_ + "has a key path longer than " + MAX_PATH_LENGTH_BYTES + " bytes (" + validationPath.byteLength_ + ").");
  }
  if (validationPath.parts_.length > MAX_PATH_DEPTH) {
    throw new Error(validationPath.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + MAX_PATH_DEPTH + ") or object contains a cycle " + validationPathToErrorString(validationPath));
  }
}
function validationPathToErrorString(validationPath) {
  if (validationPath.parts_.length === 0) {
    return "";
  }
  return "in property '" + validationPath.parts_.join(".") + "'";
}
var VisibilityMonitor = class extends EventEmitter {
  constructor() {
    super(["visible"]);
    let hidden;
    let visibilityChange;
    if (typeof document !== "undefined" && typeof document.addEventListener !== "undefined") {
      if (typeof document["hidden"] !== "undefined") {
        visibilityChange = "visibilitychange";
        hidden = "hidden";
      } else if (typeof document["mozHidden"] !== "undefined") {
        visibilityChange = "mozvisibilitychange";
        hidden = "mozHidden";
      } else if (typeof document["msHidden"] !== "undefined") {
        visibilityChange = "msvisibilitychange";
        hidden = "msHidden";
      } else if (typeof document["webkitHidden"] !== "undefined") {
        visibilityChange = "webkitvisibilitychange";
        hidden = "webkitHidden";
      }
    }
    this.visible_ = true;
    if (visibilityChange) {
      document.addEventListener(visibilityChange, () => {
        const visible = !document[hidden];
        if (visible !== this.visible_) {
          this.visible_ = visible;
          this.trigger("visible", visible);
        }
      }, false);
    }
  }
  static getInstance() {
    return new VisibilityMonitor();
  }
  getInitialEvent(eventType) {
    assert(eventType === "visible", "Unknown event type: " + eventType);
    return [this.visible_];
  }
};
var RECONNECT_MIN_DELAY = 1e3;
var RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1e3;
var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1e3;
var RECONNECT_DELAY_MULTIPLIER = 1.3;
var RECONNECT_DELAY_RESET_TIMEOUT = 3e4;
var SERVER_KILL_INTERRUPT_REASON = "server_kill";
var INVALID_TOKEN_THRESHOLD = 3;
var PersistentConnection = class extends ServerActions {
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param applicationId_ - The Firebase App ID for this project
   * @param onDataUpdate_ - A callback for new data from the server
   */
  constructor(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
    super();
    this.repoInfo_ = repoInfo_;
    this.applicationId_ = applicationId_;
    this.onDataUpdate_ = onDataUpdate_;
    this.onConnectStatus_ = onConnectStatus_;
    this.onServerInfoUpdate_ = onServerInfoUpdate_;
    this.authTokenProvider_ = authTokenProvider_;
    this.appCheckTokenProvider_ = appCheckTokenProvider_;
    this.authOverride_ = authOverride_;
    this.id = PersistentConnection.nextPersistentConnectionId_++;
    this.log_ = logWrapper("p:" + this.id + ":");
    this.interruptReasons_ = {};
    this.listens = /* @__PURE__ */ new Map();
    this.outstandingPuts_ = [];
    this.outstandingGets_ = [];
    this.outstandingPutCount_ = 0;
    this.outstandingGetCount_ = 0;
    this.onDisconnectRequestQueue_ = [];
    this.connected_ = false;
    this.reconnectDelay_ = RECONNECT_MIN_DELAY;
    this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
    this.securityDebugCallback_ = null;
    this.lastSessionId = null;
    this.establishConnectionTimer_ = null;
    this.visible_ = false;
    this.requestCBHash_ = {};
    this.requestNumber_ = 0;
    this.realtime_ = null;
    this.authToken_ = null;
    this.appCheckToken_ = null;
    this.forceTokenRefresh_ = false;
    this.invalidAuthTokenCount_ = 0;
    this.invalidAppCheckTokenCount_ = 0;
    this.firstConnection_ = true;
    this.lastConnectionAttemptTime_ = null;
    this.lastConnectionEstablishedTime_ = null;
    if (authOverride_ && !isNodeSdk()) {
      throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
    }
    VisibilityMonitor.getInstance().on("visible", this.onVisible_, this);
    if (repoInfo_.host.indexOf("fblocal") === -1) {
      OnlineMonitor.getInstance().on("online", this.onOnline_, this);
    }
  }
  sendRequest(action, body, onResponse) {
    const curReqNum = ++this.requestNumber_;
    const msg = { r: curReqNum, a: action, b: body };
    this.log_(stringify(msg));
    assert(this.connected_, "sendRequest call when we're not connected not allowed.");
    this.realtime_.sendRequest(msg);
    if (onResponse) {
      this.requestCBHash_[curReqNum] = onResponse;
    }
  }
  get(query) {
    this.initConnection_();
    const deferred = new Deferred();
    const request = {
      p: query._path.toString(),
      q: query._queryObject
    };
    const outstandingGet = {
      action: "g",
      request,
      onComplete: (message) => {
        const payload = message["d"];
        if (message["s"] === "ok") {
          deferred.resolve(payload);
        } else {
          deferred.reject(payload);
        }
      }
    };
    this.outstandingGets_.push(outstandingGet);
    this.outstandingGetCount_++;
    const index = this.outstandingGets_.length - 1;
    if (this.connected_) {
      this.sendGet_(index);
    }
    return deferred.promise;
  }
  listen(query, currentHashFn, tag, onComplete) {
    this.initConnection_();
    const queryId = query._queryIdentifier;
    const pathString = query._path.toString();
    this.log_("Listen called for " + pathString + " " + queryId);
    if (!this.listens.has(pathString)) {
      this.listens.set(pathString, /* @__PURE__ */ new Map());
    }
    assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), "listen() called for non-default but complete query");
    assert(!this.listens.get(pathString).has(queryId), `listen() called twice for same path/queryId.`);
    const listenSpec = {
      onComplete,
      hashFn: currentHashFn,
      query,
      tag
    };
    this.listens.get(pathString).set(queryId, listenSpec);
    if (this.connected_) {
      this.sendListen_(listenSpec);
    }
  }
  sendGet_(index) {
    const get = this.outstandingGets_[index];
    this.sendRequest("g", get.request, (message) => {
      delete this.outstandingGets_[index];
      this.outstandingGetCount_--;
      if (this.outstandingGetCount_ === 0) {
        this.outstandingGets_ = [];
      }
      if (get.onComplete) {
        get.onComplete(message);
      }
    });
  }
  sendListen_(listenSpec) {
    const query = listenSpec.query;
    const pathString = query._path.toString();
    const queryId = query._queryIdentifier;
    this.log_("Listen on " + pathString + " for " + queryId);
    const req = {
      /*path*/
      p: pathString
    };
    const action = "q";
    if (listenSpec.tag) {
      req["q"] = query._queryObject;
      req["t"] = listenSpec.tag;
    }
    req[
      /*hash*/
      "h"
    ] = listenSpec.hashFn();
    this.sendRequest(action, req, (message) => {
      const payload = message[
        /*data*/
        "d"
      ];
      const status = message[
        /*status*/
        "s"
      ];
      PersistentConnection.warnOnListenWarnings_(payload, query);
      const currentListenSpec = this.listens.get(pathString) && this.listens.get(pathString).get(queryId);
      if (currentListenSpec === listenSpec) {
        this.log_("listen response", message);
        if (status !== "ok") {
          this.removeListen_(pathString, queryId);
        }
        if (listenSpec.onComplete) {
          listenSpec.onComplete(status, payload);
        }
      }
    });
  }
  static warnOnListenWarnings_(payload, query) {
    if (payload && typeof payload === "object" && contains(payload, "w")) {
      const warnings = safeGet(payload, "w");
      if (Array.isArray(warnings) && ~warnings.indexOf("no_index")) {
        const indexSpec = '".indexOn": "' + query._queryParams.getIndex().toString() + '"';
        const indexPath = query._path.toString();
        warn(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${indexSpec} at ${indexPath} to your security rules for better performance.`);
      }
    }
  }
  refreshAuthToken(token) {
    this.authToken_ = token;
    this.log_("Auth token refreshed");
    if (this.authToken_) {
      this.tryAuth();
    } else {
      if (this.connected_) {
        this.sendRequest("unauth", {}, () => {
        });
      }
    }
    this.reduceReconnectDelayIfAdminCredential_(token);
  }
  reduceReconnectDelayIfAdminCredential_(credential) {
    const isFirebaseSecret = credential && credential.length === 40;
    if (isFirebaseSecret || isAdmin(credential)) {
      this.log_("Admin auth credential detected.  Reducing max reconnect time.");
      this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
    }
  }
  refreshAppCheckToken(token) {
    this.appCheckToken_ = token;
    this.log_("App check token refreshed");
    if (this.appCheckToken_) {
      this.tryAppCheck();
    } else {
      if (this.connected_) {
        this.sendRequest("unappeck", {}, () => {
        });
      }
    }
  }
  /**
   * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
   * a auth revoked (the connection is closed).
   */
  tryAuth() {
    if (this.connected_ && this.authToken_) {
      const token = this.authToken_;
      const authMethod = isValidFormat(token) ? "auth" : "gauth";
      const requestData = { cred: token };
      if (this.authOverride_ === null) {
        requestData["noauth"] = true;
      } else if (typeof this.authOverride_ === "object") {
        requestData["authvar"] = this.authOverride_;
      }
      this.sendRequest(authMethod, requestData, (res) => {
        const status = res[
          /*status*/
          "s"
        ];
        const data = res[
          /*data*/
          "d"
        ] || "error";
        if (this.authToken_ === token) {
          if (status === "ok") {
            this.invalidAuthTokenCount_ = 0;
          } else {
            this.onAuthRevoked_(status, data);
          }
        }
      });
    }
  }
  /**
   * Attempts to authenticate with the given token. If the authentication
   * attempt fails, it's triggered like the token was revoked (the connection is
   * closed).
   */
  tryAppCheck() {
    if (this.connected_ && this.appCheckToken_) {
      this.sendRequest("appcheck", { "token": this.appCheckToken_ }, (res) => {
        const status = res[
          /*status*/
          "s"
        ];
        const data = res[
          /*data*/
          "d"
        ] || "error";
        if (status === "ok") {
          this.invalidAppCheckTokenCount_ = 0;
        } else {
          this.onAppCheckRevoked_(status, data);
        }
      });
    }
  }
  /**
   * @inheritDoc
   */
  unlisten(query, tag) {
    const pathString = query._path.toString();
    const queryId = query._queryIdentifier;
    this.log_("Unlisten called for " + pathString + " " + queryId);
    assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), "unlisten() called for non-default but complete query");
    const listen = this.removeListen_(pathString, queryId);
    if (listen && this.connected_) {
      this.sendUnlisten_(pathString, queryId, query._queryObject, tag);
    }
  }
  sendUnlisten_(pathString, queryId, queryObj, tag) {
    this.log_("Unlisten on " + pathString + " for " + queryId);
    const req = {
      /*path*/
      p: pathString
    };
    const action = "n";
    if (tag) {
      req["q"] = queryObj;
      req["t"] = tag;
    }
    this.sendRequest(action, req);
  }
  onDisconnectPut(pathString, data, onComplete) {
    this.initConnection_();
    if (this.connected_) {
      this.sendOnDisconnect_("o", pathString, data, onComplete);
    } else {
      this.onDisconnectRequestQueue_.push({
        pathString,
        action: "o",
        data,
        onComplete
      });
    }
  }
  onDisconnectMerge(pathString, data, onComplete) {
    this.initConnection_();
    if (this.connected_) {
      this.sendOnDisconnect_("om", pathString, data, onComplete);
    } else {
      this.onDisconnectRequestQueue_.push({
        pathString,
        action: "om",
        data,
        onComplete
      });
    }
  }
  onDisconnectCancel(pathString, onComplete) {
    this.initConnection_();
    if (this.connected_) {
      this.sendOnDisconnect_("oc", pathString, null, onComplete);
    } else {
      this.onDisconnectRequestQueue_.push({
        pathString,
        action: "oc",
        data: null,
        onComplete
      });
    }
  }
  sendOnDisconnect_(action, pathString, data, onComplete) {
    const request = {
      /*path*/
      p: pathString,
      /*data*/
      d: data
    };
    this.log_("onDisconnect " + action, request);
    this.sendRequest(action, request, (response) => {
      if (onComplete) {
        setTimeout(() => {
          onComplete(response[
            /*status*/
            "s"
          ], response[
            /* data */
            "d"
          ]);
        }, Math.floor(0));
      }
    });
  }
  put(pathString, data, onComplete, hash) {
    this.putInternal("p", pathString, data, onComplete, hash);
  }
  merge(pathString, data, onComplete, hash) {
    this.putInternal("m", pathString, data, onComplete, hash);
  }
  putInternal(action, pathString, data, onComplete, hash) {
    this.initConnection_();
    const request = {
      /*path*/
      p: pathString,
      /*data*/
      d: data
    };
    if (hash !== void 0) {
      request[
        /*hash*/
        "h"
      ] = hash;
    }
    this.outstandingPuts_.push({
      action,
      request,
      onComplete
    });
    this.outstandingPutCount_++;
    const index = this.outstandingPuts_.length - 1;
    if (this.connected_) {
      this.sendPut_(index);
    } else {
      this.log_("Buffering put: " + pathString);
    }
  }
  sendPut_(index) {
    const action = this.outstandingPuts_[index].action;
    const request = this.outstandingPuts_[index].request;
    const onComplete = this.outstandingPuts_[index].onComplete;
    this.outstandingPuts_[index].queued = this.connected_;
    this.sendRequest(action, request, (message) => {
      this.log_(action + " response", message);
      delete this.outstandingPuts_[index];
      this.outstandingPutCount_--;
      if (this.outstandingPutCount_ === 0) {
        this.outstandingPuts_ = [];
      }
      if (onComplete) {
        onComplete(message[
          /*status*/
          "s"
        ], message[
          /* data */
          "d"
        ]);
      }
    });
  }
  reportStats(stats) {
    if (this.connected_) {
      const request = {
        /*counters*/
        c: stats
      };
      this.log_("reportStats", request);
      this.sendRequest(
        /*stats*/
        "s",
        request,
        (result) => {
          const status = result[
            /*status*/
            "s"
          ];
          if (status !== "ok") {
            const errorReason = result[
              /* data */
              "d"
            ];
            this.log_("reportStats", "Error sending stats: " + errorReason);
          }
        }
      );
    }
  }
  onDataMessage_(message) {
    if ("r" in message) {
      this.log_("from server: " + stringify(message));
      const reqNum = message["r"];
      const onResponse = this.requestCBHash_[reqNum];
      if (onResponse) {
        delete this.requestCBHash_[reqNum];
        onResponse(message[
          /*body*/
          "b"
        ]);
      }
    } else if ("error" in message) {
      throw "A server-side error has occurred: " + message["error"];
    } else if ("a" in message) {
      this.onDataPush_(message["a"], message["b"]);
    }
  }
  onDataPush_(action, body) {
    this.log_("handleServerMessage", action, body);
    if (action === "d") {
      this.onDataUpdate_(
        body[
          /*path*/
          "p"
        ],
        body[
          /*data*/
          "d"
        ],
        /*isMerge*/
        false,
        body["t"]
      );
    } else if (action === "m") {
      this.onDataUpdate_(
        body[
          /*path*/
          "p"
        ],
        body[
          /*data*/
          "d"
        ],
        /*isMerge=*/
        true,
        body["t"]
      );
    } else if (action === "c") {
      this.onListenRevoked_(body[
        /*path*/
        "p"
      ], body[
        /*query*/
        "q"
      ]);
    } else if (action === "ac") {
      this.onAuthRevoked_(body[
        /*status code*/
        "s"
      ], body[
        /* explanation */
        "d"
      ]);
    } else if (action === "apc") {
      this.onAppCheckRevoked_(body[
        /*status code*/
        "s"
      ], body[
        /* explanation */
        "d"
      ]);
    } else if (action === "sd") {
      this.onSecurityDebugPacket_(body);
    } else {
      error("Unrecognized action received from server: " + stringify(action) + "\nAre you using the latest client?");
    }
  }
  onReady_(timestamp, sessionId) {
    this.log_("connection ready");
    this.connected_ = true;
    this.lastConnectionEstablishedTime_ = (/* @__PURE__ */ new Date()).getTime();
    this.handleTimestamp_(timestamp);
    this.lastSessionId = sessionId;
    if (this.firstConnection_) {
      this.sendConnectStats_();
    }
    this.restoreState_();
    this.firstConnection_ = false;
    this.onConnectStatus_(true);
  }
  scheduleConnect_(timeout) {
    assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
    if (this.establishConnectionTimer_) {
      clearTimeout(this.establishConnectionTimer_);
    }
    this.establishConnectionTimer_ = setTimeout(() => {
      this.establishConnectionTimer_ = null;
      this.establishConnection_();
    }, Math.floor(timeout));
  }
  initConnection_() {
    if (!this.realtime_ && this.firstConnection_) {
      this.scheduleConnect_(0);
    }
  }
  onVisible_(visible) {
    if (visible && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_) {
      this.log_("Window became visible.  Reducing delay.");
      this.reconnectDelay_ = RECONNECT_MIN_DELAY;
      if (!this.realtime_) {
        this.scheduleConnect_(0);
      }
    }
    this.visible_ = visible;
  }
  onOnline_(online) {
    if (online) {
      this.log_("Browser went online.");
      this.reconnectDelay_ = RECONNECT_MIN_DELAY;
      if (!this.realtime_) {
        this.scheduleConnect_(0);
      }
    } else {
      this.log_("Browser went offline.  Killing connection.");
      if (this.realtime_) {
        this.realtime_.close();
      }
    }
  }
  onRealtimeDisconnect_() {
    this.log_("data client disconnected");
    this.connected_ = false;
    this.realtime_ = null;
    this.cancelSentTransactions_();
    this.requestCBHash_ = {};
    if (this.shouldReconnect_()) {
      if (!this.visible_) {
        this.log_("Window isn't visible.  Delaying reconnect.");
        this.reconnectDelay_ = this.maxReconnectDelay_;
        this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime();
      } else if (this.lastConnectionEstablishedTime_) {
        const timeSinceLastConnectSucceeded = (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionEstablishedTime_;
        if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
          this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        }
        this.lastConnectionEstablishedTime_ = null;
      }
      const timeSinceLastConnectAttempt = (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionAttemptTime_;
      let reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
      reconnectDelay = Math.random() * reconnectDelay;
      this.log_("Trying to reconnect in " + reconnectDelay + "ms");
      this.scheduleConnect_(reconnectDelay);
      this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
    }
    this.onConnectStatus_(false);
  }
  async establishConnection_() {
    if (this.shouldReconnect_()) {
      this.log_("Making a connection attempt");
      this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime();
      this.lastConnectionEstablishedTime_ = null;
      const onDataMessage = this.onDataMessage_.bind(this);
      const onReady = this.onReady_.bind(this);
      const onDisconnect = this.onRealtimeDisconnect_.bind(this);
      const connId = this.id + ":" + PersistentConnection.nextConnectionId_++;
      const lastSessionId = this.lastSessionId;
      let canceled = false;
      let connection = null;
      const closeFn = function() {
        if (connection) {
          connection.close();
        } else {
          canceled = true;
          onDisconnect();
        }
      };
      const sendRequestFn = function(msg) {
        assert(connection, "sendRequest call when we're not connected not allowed.");
        connection.sendRequest(msg);
      };
      this.realtime_ = {
        close: closeFn,
        sendRequest: sendRequestFn
      };
      const forceRefresh = this.forceTokenRefresh_;
      this.forceTokenRefresh_ = false;
      try {
        const [authToken, appCheckToken] = await Promise.all([
          this.authTokenProvider_.getToken(forceRefresh),
          this.appCheckTokenProvider_.getToken(forceRefresh)
        ]);
        if (!canceled) {
          log("getToken() completed. Creating connection.");
          this.authToken_ = authToken && authToken.accessToken;
          this.appCheckToken_ = appCheckToken && appCheckToken.token;
          connection = new Connection(
            connId,
            this.repoInfo_,
            this.applicationId_,
            this.appCheckToken_,
            this.authToken_,
            onDataMessage,
            onReady,
            onDisconnect,
            /* onKill= */
            (reason) => {
              warn(reason + " (" + this.repoInfo_.toString() + ")");
              this.interrupt(SERVER_KILL_INTERRUPT_REASON);
            },
            lastSessionId
          );
        } else {
          log("getToken() completed but was canceled");
        }
      } catch (error2) {
        this.log_("Failed to get token: " + error2);
        if (!canceled) {
          if (this.repoInfo_.nodeAdmin) {
            warn(error2);
          }
          closeFn();
        }
      }
    }
  }
  interrupt(reason) {
    log("Interrupting connection for reason: " + reason);
    this.interruptReasons_[reason] = true;
    if (this.realtime_) {
      this.realtime_.close();
    } else {
      if (this.establishConnectionTimer_) {
        clearTimeout(this.establishConnectionTimer_);
        this.establishConnectionTimer_ = null;
      }
      if (this.connected_) {
        this.onRealtimeDisconnect_();
      }
    }
  }
  resume(reason) {
    log("Resuming connection for reason: " + reason);
    delete this.interruptReasons_[reason];
    if (isEmpty(this.interruptReasons_)) {
      this.reconnectDelay_ = RECONNECT_MIN_DELAY;
      if (!this.realtime_) {
        this.scheduleConnect_(0);
      }
    }
  }
  handleTimestamp_(timestamp) {
    const delta = timestamp - (/* @__PURE__ */ new Date()).getTime();
    this.onServerInfoUpdate_({ serverTimeOffset: delta });
  }
  cancelSentTransactions_() {
    for (let i = 0; i < this.outstandingPuts_.length; i++) {
      const put = this.outstandingPuts_[i];
      if (put && /*hash*/
      "h" in put.request && put.queued) {
        if (put.onComplete) {
          put.onComplete("disconnect");
        }
        delete this.outstandingPuts_[i];
        this.outstandingPutCount_--;
      }
    }
    if (this.outstandingPutCount_ === 0) {
      this.outstandingPuts_ = [];
    }
  }
  onListenRevoked_(pathString, query) {
    let queryId;
    if (!query) {
      queryId = "default";
    } else {
      queryId = query.map((q) => ObjectToUniqueKey(q)).join("$");
    }
    const listen = this.removeListen_(pathString, queryId);
    if (listen && listen.onComplete) {
      listen.onComplete("permission_denied");
    }
  }
  removeListen_(pathString, queryId) {
    const normalizedPathString = new Path(pathString).toString();
    let listen;
    if (this.listens.has(normalizedPathString)) {
      const map2 = this.listens.get(normalizedPathString);
      listen = map2.get(queryId);
      map2.delete(queryId);
      if (map2.size === 0) {
        this.listens.delete(normalizedPathString);
      }
    } else {
      listen = void 0;
    }
    return listen;
  }
  onAuthRevoked_(statusCode, explanation) {
    log("Auth token revoked: " + statusCode + "/" + explanation);
    this.authToken_ = null;
    this.forceTokenRefresh_ = true;
    this.realtime_.close();
    if (statusCode === "invalid_token" || statusCode === "permission_denied") {
      this.invalidAuthTokenCount_++;
      if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
        this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
        this.authTokenProvider_.notifyForInvalidToken();
      }
    }
  }
  onAppCheckRevoked_(statusCode, explanation) {
    log("App check token revoked: " + statusCode + "/" + explanation);
    this.appCheckToken_ = null;
    this.forceTokenRefresh_ = true;
    if (statusCode === "invalid_token" || statusCode === "permission_denied") {
      this.invalidAppCheckTokenCount_++;
      if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
        this.appCheckTokenProvider_.notifyForInvalidToken();
      }
    }
  }
  onSecurityDebugPacket_(body) {
    if (this.securityDebugCallback_) {
      this.securityDebugCallback_(body);
    } else {
      if ("msg" in body) {
        console.log("FIREBASE: " + body["msg"].replace("\n", "\nFIREBASE: "));
      }
    }
  }
  restoreState_() {
    this.tryAuth();
    this.tryAppCheck();
    for (const queries of this.listens.values()) {
      for (const listenSpec of queries.values()) {
        this.sendListen_(listenSpec);
      }
    }
    for (let i = 0; i < this.outstandingPuts_.length; i++) {
      if (this.outstandingPuts_[i]) {
        this.sendPut_(i);
      }
    }
    while (this.onDisconnectRequestQueue_.length) {
      const request = this.onDisconnectRequestQueue_.shift();
      this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
    }
    for (let i = 0; i < this.outstandingGets_.length; i++) {
      if (this.outstandingGets_[i]) {
        this.sendGet_(i);
      }
    }
  }
  /**
   * Sends client stats for first connection
   */
  sendConnectStats_() {
    const stats = {};
    let clientName = "js";
    if (isNodeSdk()) {
      if (this.repoInfo_.nodeAdmin) {
        clientName = "admin_node";
      } else {
        clientName = "node";
      }
    }
    stats["sdk." + clientName + "." + SDK_VERSION2.replace(/\./g, "-")] = 1;
    if (isMobileCordova()) {
      stats["framework.cordova"] = 1;
    } else if (isReactNative()) {
      stats["framework.reactnative"] = 1;
    }
    this.reportStats(stats);
  }
  shouldReconnect_() {
    const online = OnlineMonitor.getInstance().currentlyOnline();
    return isEmpty(this.interruptReasons_) && online;
  }
};
PersistentConnection.nextPersistentConnectionId_ = 0;
PersistentConnection.nextConnectionId_ = 0;
var NamedNode = class {
  constructor(name4, node) {
    this.name = name4;
    this.node = node;
  }
  static Wrap(name4, node) {
    return new NamedNode(name4, node);
  }
};
var Index = class {
  /**
   * @returns A standalone comparison function for
   * this index
   */
  getCompare() {
    return this.compare.bind(this);
  }
  /**
   * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
   * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
   *
   *
   * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
   */
  indexedValueChanged(oldNode, newNode) {
    const oldWrapped = new NamedNode(MIN_NAME, oldNode);
    const newWrapped = new NamedNode(MIN_NAME, newNode);
    return this.compare(oldWrapped, newWrapped) !== 0;
  }
  /**
   * @returns a node wrapper that will sort equal to or less than
   * any other node wrapper, using this index
   */
  minPost() {
    return NamedNode.MIN;
  }
};
var __EMPTY_NODE;
var KeyIndex = class extends Index {
  static get __EMPTY_NODE() {
    return __EMPTY_NODE;
  }
  static set __EMPTY_NODE(val) {
    __EMPTY_NODE = val;
  }
  compare(a, b) {
    return nameCompare(a.name, b.name);
  }
  isDefinedOn(node) {
    throw assertionError("KeyIndex.isDefinedOn not expected to be called.");
  }
  indexedValueChanged(oldNode, newNode) {
    return false;
  }
  minPost() {
    return NamedNode.MIN;
  }
  maxPost() {
    return new NamedNode(MAX_NAME, __EMPTY_NODE);
  }
  makePost(indexValue, name4) {
    assert(typeof indexValue === "string", "KeyIndex indexValue must always be a string.");
    return new NamedNode(indexValue, __EMPTY_NODE);
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".key";
  }
};
var KEY_INDEX = new KeyIndex();
var SortedMapIterator = class {
  /**
   * @param node - Node to iterate.
   * @param isReverse_ - Whether or not to iterate in reverse
   */
  constructor(node, startKey, comparator, isReverse_, resultGenerator_ = null) {
    this.isReverse_ = isReverse_;
    this.resultGenerator_ = resultGenerator_;
    this.nodeStack_ = [];
    let cmp = 1;
    while (!node.isEmpty()) {
      node = node;
      cmp = startKey ? comparator(node.key, startKey) : 1;
      if (isReverse_) {
        cmp *= -1;
      }
      if (cmp < 0) {
        if (this.isReverse_) {
          node = node.left;
        } else {
          node = node.right;
        }
      } else if (cmp === 0) {
        this.nodeStack_.push(node);
        break;
      } else {
        this.nodeStack_.push(node);
        if (this.isReverse_) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
    }
  }
  getNext() {
    if (this.nodeStack_.length === 0) {
      return null;
    }
    let node = this.nodeStack_.pop();
    let result;
    if (this.resultGenerator_) {
      result = this.resultGenerator_(node.key, node.value);
    } else {
      result = { key: node.key, value: node.value };
    }
    if (this.isReverse_) {
      node = node.left;
      while (!node.isEmpty()) {
        this.nodeStack_.push(node);
        node = node.right;
      }
    } else {
      node = node.right;
      while (!node.isEmpty()) {
        this.nodeStack_.push(node);
        node = node.left;
      }
    }
    return result;
  }
  hasNext() {
    return this.nodeStack_.length > 0;
  }
  peek() {
    if (this.nodeStack_.length === 0) {
      return null;
    }
    const node = this.nodeStack_[this.nodeStack_.length - 1];
    if (this.resultGenerator_) {
      return this.resultGenerator_(node.key, node.value);
    } else {
      return { key: node.key, value: node.value };
    }
  }
};
var LLRBNode = class {
  /**
   * @param key - Key associated with this node.
   * @param value - Value associated with this node.
   * @param color - Whether this node is red.
   * @param left - Left child.
   * @param right - Right child.
   */
  constructor(key, value, color, left, right) {
    this.key = key;
    this.value = value;
    this.color = color != null ? color : LLRBNode.RED;
    this.left = left != null ? left : SortedMap.EMPTY_NODE;
    this.right = right != null ? right : SortedMap.EMPTY_NODE;
  }
  /**
   * Returns a copy of the current node, optionally replacing pieces of it.
   *
   * @param key - New key for the node, or null.
   * @param value - New value for the node, or null.
   * @param color - New color for the node, or null.
   * @param left - New left child for the node, or null.
   * @param right - New right child for the node, or null.
   * @returns The node copy.
   */
  copy(key, value, color, left, right) {
    return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
  }
  /**
   * @returns The total number of nodes in the tree.
   */
  count() {
    return this.left.count() + 1 + this.right.count();
  }
  /**
   * @returns True if the tree is empty.
   */
  isEmpty() {
    return false;
  }
  /**
   * Traverses the tree in key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   *   node.  If it returns true, traversal is aborted.
   * @returns The first truthy value returned by action, or the last falsey
   *   value returned by action
   */
  inorderTraversal(action) {
    return this.left.inorderTraversal(action) || !!action(this.key, this.value) || this.right.inorderTraversal(action);
  }
  /**
   * Traverses the tree in reverse key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   * node.  If it returns true, traversal is aborted.
   * @returns True if traversal was aborted.
   */
  reverseTraversal(action) {
    return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
  }
  /**
   * @returns The minimum node in the tree.
   */
  min_() {
    if (this.left.isEmpty()) {
      return this;
    } else {
      return this.left.min_();
    }
  }
  /**
   * @returns The maximum key in the tree.
   */
  minKey() {
    return this.min_().key;
  }
  /**
   * @returns The maximum key in the tree.
   */
  maxKey() {
    if (this.right.isEmpty()) {
      return this.key;
    } else {
      return this.right.maxKey();
    }
  }
  /**
   * @param key - Key to insert.
   * @param value - Value to insert.
   * @param comparator - Comparator.
   * @returns New tree, with the key/value added.
   */
  insert(key, value, comparator) {
    let n = this;
    const cmp = comparator(key, n.key);
    if (cmp < 0) {
      n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
    } else if (cmp === 0) {
      n = n.copy(null, value, null, null, null);
    } else {
      n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
    }
    return n.fixUp_();
  }
  /**
   * @returns New tree, with the minimum key removed.
   */
  removeMin_() {
    if (this.left.isEmpty()) {
      return SortedMap.EMPTY_NODE;
    }
    let n = this;
    if (!n.left.isRed_() && !n.left.left.isRed_()) {
      n = n.moveRedLeft_();
    }
    n = n.copy(null, null, null, n.left.removeMin_(), null);
    return n.fixUp_();
  }
  /**
   * @param key - The key of the item to remove.
   * @param comparator - Comparator.
   * @returns New tree, with the specified item removed.
   */
  remove(key, comparator) {
    let n, smallest;
    n = this;
    if (comparator(key, n.key) < 0) {
      if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
        n = n.moveRedLeft_();
      }
      n = n.copy(null, null, null, n.left.remove(key, comparator), null);
    } else {
      if (n.left.isRed_()) {
        n = n.rotateRight_();
      }
      if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
        n = n.moveRedRight_();
      }
      if (comparator(key, n.key) === 0) {
        if (n.right.isEmpty()) {
          return SortedMap.EMPTY_NODE;
        } else {
          smallest = n.right.min_();
          n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
        }
      }
      n = n.copy(null, null, null, null, n.right.remove(key, comparator));
    }
    return n.fixUp_();
  }
  /**
   * @returns Whether this is a RED node.
   */
  isRed_() {
    return this.color;
  }
  /**
   * @returns New tree after performing any needed rotations.
   */
  fixUp_() {
    let n = this;
    if (n.right.isRed_() && !n.left.isRed_()) {
      n = n.rotateLeft_();
    }
    if (n.left.isRed_() && n.left.left.isRed_()) {
      n = n.rotateRight_();
    }
    if (n.left.isRed_() && n.right.isRed_()) {
      n = n.colorFlip_();
    }
    return n;
  }
  /**
   * @returns New tree, after moveRedLeft.
   */
  moveRedLeft_() {
    let n = this.colorFlip_();
    if (n.right.left.isRed_()) {
      n = n.copy(null, null, null, null, n.right.rotateRight_());
      n = n.rotateLeft_();
      n = n.colorFlip_();
    }
    return n;
  }
  /**
   * @returns New tree, after moveRedRight.
   */
  moveRedRight_() {
    let n = this.colorFlip_();
    if (n.left.left.isRed_()) {
      n = n.rotateRight_();
      n = n.colorFlip_();
    }
    return n;
  }
  /**
   * @returns New tree, after rotateLeft.
   */
  rotateLeft_() {
    const nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, nl, null);
  }
  /**
   * @returns New tree, after rotateRight.
   */
  rotateRight_() {
    const nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, nr);
  }
  /**
   * @returns Newt ree, after colorFlip.
   */
  colorFlip_() {
    const left = this.left.copy(null, null, !this.left.color, null, null);
    const right = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, left, right);
  }
  /**
   * For testing.
   *
   * @returns True if all is well.
   */
  checkMaxDepth_() {
    const blackDepth = this.check_();
    return Math.pow(2, blackDepth) <= this.count() + 1;
  }
  check_() {
    if (this.isRed_() && this.left.isRed_()) {
      throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
    }
    if (this.right.isRed_()) {
      throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
    }
    const blackDepth = this.left.check_();
    if (blackDepth !== this.right.check_()) {
      throw new Error("Black depths differ");
    } else {
      return blackDepth + (this.isRed_() ? 0 : 1);
    }
  }
};
LLRBNode.RED = true;
LLRBNode.BLACK = false;
var LLRBEmptyNode = class {
  /**
   * Returns a copy of the current node.
   *
   * @returns The node copy.
   */
  copy(key, value, color, left, right) {
    return this;
  }
  /**
   * Returns a copy of the tree, with the specified key/value added.
   *
   * @param key - Key to be added.
   * @param value - Value to be added.
   * @param comparator - Comparator.
   * @returns New tree, with item added.
   */
  insert(key, value, comparator) {
    return new LLRBNode(key, value, null);
  }
  /**
   * Returns a copy of the tree, with the specified key removed.
   *
   * @param key - The key to remove.
   * @param comparator - Comparator.
   * @returns New tree, with item removed.
   */
  remove(key, comparator) {
    return this;
  }
  /**
   * @returns The total number of nodes in the tree.
   */
  count() {
    return 0;
  }
  /**
   * @returns True if the tree is empty.
   */
  isEmpty() {
    return true;
  }
  /**
   * Traverses the tree in key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   * node.  If it returns true, traversal is aborted.
   * @returns True if traversal was aborted.
   */
  inorderTraversal(action) {
    return false;
  }
  /**
   * Traverses the tree in reverse key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   * node.  If it returns true, traversal is aborted.
   * @returns True if traversal was aborted.
   */
  reverseTraversal(action) {
    return false;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  check_() {
    return 0;
  }
  /**
   * @returns Whether this node is red.
   */
  isRed_() {
    return false;
  }
};
var SortedMap = class {
  /**
   * @param comparator_ - Key comparator.
   * @param root_ - Optional root node for the map.
   */
  constructor(comparator_, root_ = SortedMap.EMPTY_NODE) {
    this.comparator_ = comparator_;
    this.root_ = root_;
  }
  /**
   * Returns a copy of the map, with the specified key/value added or replaced.
   * (TODO: We should perhaps rename this method to 'put')
   *
   * @param key - Key to be added.
   * @param value - Value to be added.
   * @returns New map, with item added.
   */
  insert(key, value) {
    return new SortedMap(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
  }
  /**
   * Returns a copy of the map, with the specified key removed.
   *
   * @param key - The key to remove.
   * @returns New map, with item removed.
   */
  remove(key) {
    return new SortedMap(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
  }
  /**
   * Returns the value of the node with the given key, or null.
   *
   * @param key - The key to look up.
   * @returns The value of the node with the given key, or null if the
   * key doesn't exist.
   */
  get(key) {
    let cmp;
    let node = this.root_;
    while (!node.isEmpty()) {
      cmp = this.comparator_(key, node.key);
      if (cmp === 0) {
        return node.value;
      } else if (cmp < 0) {
        node = node.left;
      } else if (cmp > 0) {
        node = node.right;
      }
    }
    return null;
  }
  /**
   * Returns the key of the item *before* the specified key, or null if key is the first item.
   * @param key - The key to find the predecessor of
   * @returns The predecessor key.
   */
  getPredecessorKey(key) {
    let cmp, node = this.root_, rightParent = null;
    while (!node.isEmpty()) {
      cmp = this.comparator_(key, node.key);
      if (cmp === 0) {
        if (!node.left.isEmpty()) {
          node = node.left;
          while (!node.right.isEmpty()) {
            node = node.right;
          }
          return node.key;
        } else if (rightParent) {
          return rightParent.key;
        } else {
          return null;
        }
      } else if (cmp < 0) {
        node = node.left;
      } else if (cmp > 0) {
        rightParent = node;
        node = node.right;
      }
    }
    throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
  }
  /**
   * @returns True if the map is empty.
   */
  isEmpty() {
    return this.root_.isEmpty();
  }
  /**
   * @returns The total number of nodes in the map.
   */
  count() {
    return this.root_.count();
  }
  /**
   * @returns The minimum key in the map.
   */
  minKey() {
    return this.root_.minKey();
  }
  /**
   * @returns The maximum key in the map.
   */
  maxKey() {
    return this.root_.maxKey();
  }
  /**
   * Traverses the map in key order and calls the specified action function
   * for each key/value pair.
   *
   * @param action - Callback function to be called
   * for each key/value pair.  If action returns true, traversal is aborted.
   * @returns The first truthy value returned by action, or the last falsey
   *   value returned by action
   */
  inorderTraversal(action) {
    return this.root_.inorderTraversal(action);
  }
  /**
   * Traverses the map in reverse key order and calls the specified action function
   * for each key/value pair.
   *
   * @param action - Callback function to be called
   * for each key/value pair.  If action returns true, traversal is aborted.
   * @returns True if the traversal was aborted.
   */
  reverseTraversal(action) {
    return this.root_.reverseTraversal(action);
  }
  /**
   * Returns an iterator over the SortedMap.
   * @returns The iterator.
   */
  getIterator(resultGenerator) {
    return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
  }
  getIteratorFrom(key, resultGenerator) {
    return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
  }
  getReverseIteratorFrom(key, resultGenerator) {
    return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
  }
  getReverseIterator(resultGenerator) {
    return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
  }
};
SortedMap.EMPTY_NODE = new LLRBEmptyNode();
function NAME_ONLY_COMPARATOR(left, right) {
  return nameCompare(left.name, right.name);
}
function NAME_COMPARATOR(left, right) {
  return nameCompare(left, right);
}
var MAX_NODE$2;
function setMaxNode$1(val) {
  MAX_NODE$2 = val;
}
var priorityHashText = function(priority) {
  if (typeof priority === "number") {
    return "number:" + doubleToIEEE754String(priority);
  } else {
    return "string:" + priority;
  }
};
var validatePriorityNode = function(priorityNode) {
  if (priorityNode.isLeafNode()) {
    const val = priorityNode.val();
    assert(typeof val === "string" || typeof val === "number" || typeof val === "object" && contains(val, ".sv"), "Priority must be a string or number.");
  } else {
    assert(priorityNode === MAX_NODE$2 || priorityNode.isEmpty(), "priority of unexpected type.");
  }
  assert(priorityNode === MAX_NODE$2 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};
var __childrenNodeConstructor;
var LeafNode = class {
  /**
   * @param value_ - The value to store in this leaf node. The object type is
   * possible in the event of a deferred value
   * @param priorityNode_ - The priority of this node.
   */
  constructor(value_, priorityNode_ = LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
    this.value_ = value_;
    this.priorityNode_ = priorityNode_;
    this.lazyHash_ = null;
    assert(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
    validatePriorityNode(this.priorityNode_);
  }
  static set __childrenNodeConstructor(val) {
    __childrenNodeConstructor = val;
  }
  static get __childrenNodeConstructor() {
    return __childrenNodeConstructor;
  }
  /** @inheritDoc */
  isLeafNode() {
    return true;
  }
  /** @inheritDoc */
  getPriority() {
    return this.priorityNode_;
  }
  /** @inheritDoc */
  updatePriority(newPriorityNode) {
    return new LeafNode(this.value_, newPriorityNode);
  }
  /** @inheritDoc */
  getImmediateChild(childName) {
    if (childName === ".priority") {
      return this.priorityNode_;
    } else {
      return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
    }
  }
  /** @inheritDoc */
  getChild(path) {
    if (pathIsEmpty(path)) {
      return this;
    } else if (pathGetFront(path) === ".priority") {
      return this.priorityNode_;
    } else {
      return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
    }
  }
  hasChild() {
    return false;
  }
  /** @inheritDoc */
  getPredecessorChildName(childName, childNode) {
    return null;
  }
  /** @inheritDoc */
  updateImmediateChild(childName, newChildNode) {
    if (childName === ".priority") {
      return this.updatePriority(newChildNode);
    } else if (newChildNode.isEmpty() && childName !== ".priority") {
      return this;
    } else {
      return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
    }
  }
  /** @inheritDoc */
  updateChild(path, newChildNode) {
    const front = pathGetFront(path);
    if (front === null) {
      return newChildNode;
    } else if (newChildNode.isEmpty() && front !== ".priority") {
      return this;
    } else {
      assert(front !== ".priority" || pathGetLength(path) === 1, ".priority must be the last token in a path");
      return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
    }
  }
  /** @inheritDoc */
  isEmpty() {
    return false;
  }
  /** @inheritDoc */
  numChildren() {
    return 0;
  }
  /** @inheritDoc */
  forEachChild(index, action) {
    return false;
  }
  val(exportFormat) {
    if (exportFormat && !this.getPriority().isEmpty()) {
      return {
        ".value": this.getValue(),
        ".priority": this.getPriority().val()
      };
    } else {
      return this.getValue();
    }
  }
  /** @inheritDoc */
  hash() {
    if (this.lazyHash_ === null) {
      let toHash = "";
      if (!this.priorityNode_.isEmpty()) {
        toHash += "priority:" + priorityHashText(this.priorityNode_.val()) + ":";
      }
      const type = typeof this.value_;
      toHash += type + ":";
      if (type === "number") {
        toHash += doubleToIEEE754String(this.value_);
      } else {
        toHash += this.value_;
      }
      this.lazyHash_ = sha1(toHash);
    }
    return this.lazyHash_;
  }
  /**
   * Returns the value of the leaf node.
   * @returns The value of the node.
   */
  getValue() {
    return this.value_;
  }
  compareTo(other) {
    if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
      return 1;
    } else if (other instanceof LeafNode.__childrenNodeConstructor) {
      return -1;
    } else {
      assert(other.isLeafNode(), "Unknown node type");
      return this.compareToLeafNode_(other);
    }
  }
  /**
   * Comparison specifically for two leaf nodes
   */
  compareToLeafNode_(otherLeaf) {
    const otherLeafType = typeof otherLeaf.value_;
    const thisLeafType = typeof this.value_;
    const otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
    const thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
    assert(otherIndex >= 0, "Unknown leaf type: " + otherLeafType);
    assert(thisIndex >= 0, "Unknown leaf type: " + thisLeafType);
    if (otherIndex === thisIndex) {
      if (thisLeafType === "object") {
        return 0;
      } else {
        if (this.value_ < otherLeaf.value_) {
          return -1;
        } else if (this.value_ === otherLeaf.value_) {
          return 0;
        } else {
          return 1;
        }
      }
    } else {
      return thisIndex - otherIndex;
    }
  }
  withIndex() {
    return this;
  }
  isIndexed() {
    return true;
  }
  equals(other) {
    if (other === this) {
      return true;
    } else if (other.isLeafNode()) {
      const otherLeaf = other;
      return this.value_ === otherLeaf.value_ && this.priorityNode_.equals(otherLeaf.priorityNode_);
    } else {
      return false;
    }
  }
};
LeafNode.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
var nodeFromJSON$1;
var MAX_NODE$1;
function setNodeFromJSON(val) {
  nodeFromJSON$1 = val;
}
function setMaxNode(val) {
  MAX_NODE$1 = val;
}
var PriorityIndex = class extends Index {
  compare(a, b) {
    const aPriority = a.node.getPriority();
    const bPriority = b.node.getPriority();
    const indexCmp = aPriority.compareTo(bPriority);
    if (indexCmp === 0) {
      return nameCompare(a.name, b.name);
    } else {
      return indexCmp;
    }
  }
  isDefinedOn(node) {
    return !node.getPriority().isEmpty();
  }
  indexedValueChanged(oldNode, newNode) {
    return !oldNode.getPriority().equals(newNode.getPriority());
  }
  minPost() {
    return NamedNode.MIN;
  }
  maxPost() {
    return new NamedNode(MAX_NAME, new LeafNode("[PRIORITY-POST]", MAX_NODE$1));
  }
  makePost(indexValue, name4) {
    const priorityNode = nodeFromJSON$1(indexValue);
    return new NamedNode(name4, new LeafNode("[PRIORITY-POST]", priorityNode));
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".priority";
  }
};
var PRIORITY_INDEX = new PriorityIndex();
var LOG_2 = Math.log(2);
var Base12Num = class {
  constructor(length) {
    const logBase2 = (num) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseInt(Math.log(num) / LOG_2, 10)
    );
    const bitMask = (bits) => parseInt(Array(bits + 1).join("1"), 2);
    this.count = logBase2(length + 1);
    this.current_ = this.count - 1;
    const mask = bitMask(this.count);
    this.bits_ = length + 1 & mask;
  }
  nextBitIsOne() {
    const result = !(this.bits_ & 1 << this.current_);
    this.current_--;
    return result;
  }
};
var buildChildSet = function(childList, cmp, keyFn, mapSortFn) {
  childList.sort(cmp);
  const buildBalancedTree = function(low, high) {
    const length = high - low;
    let namedNode;
    let key;
    if (length === 0) {
      return null;
    } else if (length === 1) {
      namedNode = childList[low];
      key = keyFn ? keyFn(namedNode) : namedNode;
      return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, null, null);
    } else {
      const middle = parseInt(length / 2, 10) + low;
      const left = buildBalancedTree(low, middle);
      const right = buildBalancedTree(middle + 1, high);
      namedNode = childList[middle];
      key = keyFn ? keyFn(namedNode) : namedNode;
      return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, left, right);
    }
  };
  const buildFrom12Array = function(base122) {
    let node = null;
    let root2 = null;
    let index = childList.length;
    const buildPennant = function(chunkSize, color) {
      const low = index - chunkSize;
      const high = index;
      index -= chunkSize;
      const childTree = buildBalancedTree(low + 1, high);
      const namedNode = childList[low];
      const key = keyFn ? keyFn(namedNode) : namedNode;
      attachPennant(new LLRBNode(key, namedNode.node, color, null, childTree));
    };
    const attachPennant = function(pennant) {
      if (node) {
        node.left = pennant;
        node = pennant;
      } else {
        root2 = pennant;
        node = pennant;
      }
    };
    for (let i = 0; i < base122.count; ++i) {
      const isOne = base122.nextBitIsOne();
      const chunkSize = Math.pow(2, base122.count - (i + 1));
      if (isOne) {
        buildPennant(chunkSize, LLRBNode.BLACK);
      } else {
        buildPennant(chunkSize, LLRBNode.BLACK);
        buildPennant(chunkSize, LLRBNode.RED);
      }
    }
    return root2;
  };
  const base12 = new Base12Num(childList.length);
  const root = buildFrom12Array(base12);
  return new SortedMap(mapSortFn || cmp, root);
};
var _defaultIndexMap;
var fallbackObject = {};
var IndexMap = class {
  constructor(indexes_, indexSet_) {
    this.indexes_ = indexes_;
    this.indexSet_ = indexSet_;
  }
  /**
   * The default IndexMap for nodes without a priority
   */
  static get Default() {
    assert(fallbackObject && PRIORITY_INDEX, "ChildrenNode.ts has not been loaded");
    _defaultIndexMap = _defaultIndexMap || new IndexMap({ ".priority": fallbackObject }, { ".priority": PRIORITY_INDEX });
    return _defaultIndexMap;
  }
  get(indexKey) {
    const sortedMap = safeGet(this.indexes_, indexKey);
    if (!sortedMap) {
      throw new Error("No index defined for " + indexKey);
    }
    if (sortedMap instanceof SortedMap) {
      return sortedMap;
    } else {
      return null;
    }
  }
  hasIndex(indexDefinition) {
    return contains(this.indexSet_, indexDefinition.toString());
  }
  addIndex(indexDefinition, existingChildren) {
    assert(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
    const childList = [];
    let sawIndexedValue = false;
    const iter = existingChildren.getIterator(NamedNode.Wrap);
    let next = iter.getNext();
    while (next) {
      sawIndexedValue = sawIndexedValue || indexDefinition.isDefinedOn(next.node);
      childList.push(next);
      next = iter.getNext();
    }
    let newIndex;
    if (sawIndexedValue) {
      newIndex = buildChildSet(childList, indexDefinition.getCompare());
    } else {
      newIndex = fallbackObject;
    }
    const indexName = indexDefinition.toString();
    const newIndexSet = Object.assign({}, this.indexSet_);
    newIndexSet[indexName] = indexDefinition;
    const newIndexes = Object.assign({}, this.indexes_);
    newIndexes[indexName] = newIndex;
    return new IndexMap(newIndexes, newIndexSet);
  }
  /**
   * Ensure that this node is properly tracked in any indexes that we're maintaining
   */
  addToIndexes(namedNode, existingChildren) {
    const newIndexes = map(this.indexes_, (indexedChildren, indexName) => {
      const index = safeGet(this.indexSet_, indexName);
      assert(index, "Missing index implementation for " + indexName);
      if (indexedChildren === fallbackObject) {
        if (index.isDefinedOn(namedNode.node)) {
          const childList = [];
          const iter = existingChildren.getIterator(NamedNode.Wrap);
          let next = iter.getNext();
          while (next) {
            if (next.name !== namedNode.name) {
              childList.push(next);
            }
            next = iter.getNext();
          }
          childList.push(namedNode);
          return buildChildSet(childList, index.getCompare());
        } else {
          return fallbackObject;
        }
      } else {
        const existingSnap = existingChildren.get(namedNode.name);
        let newChildren = indexedChildren;
        if (existingSnap) {
          newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
        }
        return newChildren.insert(namedNode, namedNode.node);
      }
    });
    return new IndexMap(newIndexes, this.indexSet_);
  }
  /**
   * Create a new IndexMap instance with the given value removed
   */
  removeFromIndexes(namedNode, existingChildren) {
    const newIndexes = map(this.indexes_, (indexedChildren) => {
      if (indexedChildren === fallbackObject) {
        return indexedChildren;
      } else {
        const existingSnap = existingChildren.get(namedNode.name);
        if (existingSnap) {
          return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
        } else {
          return indexedChildren;
        }
      }
    });
    return new IndexMap(newIndexes, this.indexSet_);
  }
};
var EMPTY_NODE;
var ChildrenNode = class {
  /**
   * @param children_ - List of children of this node..
   * @param priorityNode_ - The priority of this node (as a snapshot node).
   */
  constructor(children_, priorityNode_, indexMap_) {
    this.children_ = children_;
    this.priorityNode_ = priorityNode_;
    this.indexMap_ = indexMap_;
    this.lazyHash_ = null;
    if (this.priorityNode_) {
      validatePriorityNode(this.priorityNode_);
    }
    if (this.children_.isEmpty()) {
      assert(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
    }
  }
  static get EMPTY_NODE() {
    return EMPTY_NODE || (EMPTY_NODE = new ChildrenNode(new SortedMap(NAME_COMPARATOR), null, IndexMap.Default));
  }
  /** @inheritDoc */
  isLeafNode() {
    return false;
  }
  /** @inheritDoc */
  getPriority() {
    return this.priorityNode_ || EMPTY_NODE;
  }
  /** @inheritDoc */
  updatePriority(newPriorityNode) {
    if (this.children_.isEmpty()) {
      return this;
    } else {
      return new ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
    }
  }
  /** @inheritDoc */
  getImmediateChild(childName) {
    if (childName === ".priority") {
      return this.getPriority();
    } else {
      const child2 = this.children_.get(childName);
      return child2 === null ? EMPTY_NODE : child2;
    }
  }
  /** @inheritDoc */
  getChild(path) {
    const front = pathGetFront(path);
    if (front === null) {
      return this;
    }
    return this.getImmediateChild(front).getChild(pathPopFront(path));
  }
  /** @inheritDoc */
  hasChild(childName) {
    return this.children_.get(childName) !== null;
  }
  /** @inheritDoc */
  updateImmediateChild(childName, newChildNode) {
    assert(newChildNode, "We should always be passing snapshot nodes");
    if (childName === ".priority") {
      return this.updatePriority(newChildNode);
    } else {
      const namedNode = new NamedNode(childName, newChildNode);
      let newChildren, newIndexMap;
      if (newChildNode.isEmpty()) {
        newChildren = this.children_.remove(childName);
        newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
      } else {
        newChildren = this.children_.insert(childName, newChildNode);
        newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
      }
      const newPriority = newChildren.isEmpty() ? EMPTY_NODE : this.priorityNode_;
      return new ChildrenNode(newChildren, newPriority, newIndexMap);
    }
  }
  /** @inheritDoc */
  updateChild(path, newChildNode) {
    const front = pathGetFront(path);
    if (front === null) {
      return newChildNode;
    } else {
      assert(pathGetFront(path) !== ".priority" || pathGetLength(path) === 1, ".priority must be the last token in a path");
      const newImmediateChild = this.getImmediateChild(front).updateChild(pathPopFront(path), newChildNode);
      return this.updateImmediateChild(front, newImmediateChild);
    }
  }
  /** @inheritDoc */
  isEmpty() {
    return this.children_.isEmpty();
  }
  /** @inheritDoc */
  numChildren() {
    return this.children_.count();
  }
  /** @inheritDoc */
  val(exportFormat) {
    if (this.isEmpty()) {
      return null;
    }
    const obj = {};
    let numKeys = 0, maxKey = 0, allIntegerKeys = true;
    this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
      obj[key] = childNode.val(exportFormat);
      numKeys++;
      if (allIntegerKeys && ChildrenNode.INTEGER_REGEXP_.test(key)) {
        maxKey = Math.max(maxKey, Number(key));
      } else {
        allIntegerKeys = false;
      }
    });
    if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
      const array = [];
      for (const key in obj) {
        array[key] = obj[key];
      }
      return array;
    } else {
      if (exportFormat && !this.getPriority().isEmpty()) {
        obj[".priority"] = this.getPriority().val();
      }
      return obj;
    }
  }
  /** @inheritDoc */
  hash() {
    if (this.lazyHash_ === null) {
      let toHash = "";
      if (!this.getPriority().isEmpty()) {
        toHash += "priority:" + priorityHashText(this.getPriority().val()) + ":";
      }
      this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
        const childHash = childNode.hash();
        if (childHash !== "") {
          toHash += ":" + key + ":" + childHash;
        }
      });
      this.lazyHash_ = toHash === "" ? "" : sha1(toHash);
    }
    return this.lazyHash_;
  }
  /** @inheritDoc */
  getPredecessorChildName(childName, childNode, index) {
    const idx = this.resolveIndex_(index);
    if (idx) {
      const predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
      return predecessor ? predecessor.name : null;
    } else {
      return this.children_.getPredecessorKey(childName);
    }
  }
  getFirstChildName(indexDefinition) {
    const idx = this.resolveIndex_(indexDefinition);
    if (idx) {
      const minKey = idx.minKey();
      return minKey && minKey.name;
    } else {
      return this.children_.minKey();
    }
  }
  getFirstChild(indexDefinition) {
    const minKey = this.getFirstChildName(indexDefinition);
    if (minKey) {
      return new NamedNode(minKey, this.children_.get(minKey));
    } else {
      return null;
    }
  }
  /**
   * Given an index, return the key name of the largest value we have, according to that index
   */
  getLastChildName(indexDefinition) {
    const idx = this.resolveIndex_(indexDefinition);
    if (idx) {
      const maxKey = idx.maxKey();
      return maxKey && maxKey.name;
    } else {
      return this.children_.maxKey();
    }
  }
  getLastChild(indexDefinition) {
    const maxKey = this.getLastChildName(indexDefinition);
    if (maxKey) {
      return new NamedNode(maxKey, this.children_.get(maxKey));
    } else {
      return null;
    }
  }
  forEachChild(index, action) {
    const idx = this.resolveIndex_(index);
    if (idx) {
      return idx.inorderTraversal((wrappedNode) => {
        return action(wrappedNode.name, wrappedNode.node);
      });
    } else {
      return this.children_.inorderTraversal(action);
    }
  }
  getIterator(indexDefinition) {
    return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
  }
  getIteratorFrom(startPost, indexDefinition) {
    const idx = this.resolveIndex_(indexDefinition);
    if (idx) {
      return idx.getIteratorFrom(startPost, (key) => key);
    } else {
      const iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
      let next = iterator.peek();
      while (next != null && indexDefinition.compare(next, startPost) < 0) {
        iterator.getNext();
        next = iterator.peek();
      }
      return iterator;
    }
  }
  getReverseIterator(indexDefinition) {
    return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
  }
  getReverseIteratorFrom(endPost, indexDefinition) {
    const idx = this.resolveIndex_(indexDefinition);
    if (idx) {
      return idx.getReverseIteratorFrom(endPost, (key) => {
        return key;
      });
    } else {
      const iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
      let next = iterator.peek();
      while (next != null && indexDefinition.compare(next, endPost) > 0) {
        iterator.getNext();
        next = iterator.peek();
      }
      return iterator;
    }
  }
  compareTo(other) {
    if (this.isEmpty()) {
      if (other.isEmpty()) {
        return 0;
      } else {
        return -1;
      }
    } else if (other.isLeafNode() || other.isEmpty()) {
      return 1;
    } else if (other === MAX_NODE) {
      return -1;
    } else {
      return 0;
    }
  }
  withIndex(indexDefinition) {
    if (indexDefinition === KEY_INDEX || this.indexMap_.hasIndex(indexDefinition)) {
      return this;
    } else {
      const newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
      return new ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
    }
  }
  isIndexed(index) {
    return index === KEY_INDEX || this.indexMap_.hasIndex(index);
  }
  equals(other) {
    if (other === this) {
      return true;
    } else if (other.isLeafNode()) {
      return false;
    } else {
      const otherChildrenNode = other;
      if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
        return false;
      } else if (this.children_.count() === otherChildrenNode.children_.count()) {
        const thisIter = this.getIterator(PRIORITY_INDEX);
        const otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
        let thisCurrent = thisIter.getNext();
        let otherCurrent = otherIter.getNext();
        while (thisCurrent && otherCurrent) {
          if (thisCurrent.name !== otherCurrent.name || !thisCurrent.node.equals(otherCurrent.node)) {
            return false;
          }
          thisCurrent = thisIter.getNext();
          otherCurrent = otherIter.getNext();
        }
        return thisCurrent === null && otherCurrent === null;
      } else {
        return false;
      }
    }
  }
  /**
   * Returns a SortedMap ordered by index, or null if the default (by-key) ordering can be used
   * instead.
   *
   */
  resolveIndex_(indexDefinition) {
    if (indexDefinition === KEY_INDEX) {
      return null;
    } else {
      return this.indexMap_.get(indexDefinition.toString());
    }
  }
};
ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
var MaxNode = class extends ChildrenNode {
  constructor() {
    super(new SortedMap(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default);
  }
  compareTo(other) {
    if (other === this) {
      return 0;
    } else {
      return 1;
    }
  }
  equals(other) {
    return other === this;
  }
  getPriority() {
    return this;
  }
  getImmediateChild(childName) {
    return ChildrenNode.EMPTY_NODE;
  }
  isEmpty() {
    return false;
  }
};
var MAX_NODE = new MaxNode();
Object.defineProperties(NamedNode, {
  MIN: {
    value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE)
  },
  MAX: {
    value: new NamedNode(MAX_NAME, MAX_NODE)
  }
});
KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
LeafNode.__childrenNodeConstructor = ChildrenNode;
setMaxNode$1(MAX_NODE);
setMaxNode(MAX_NODE);
var USE_HINZE = true;
function nodeFromJSON(json, priority = null) {
  if (json === null) {
    return ChildrenNode.EMPTY_NODE;
  }
  if (typeof json === "object" && ".priority" in json) {
    priority = json[".priority"];
  }
  assert(priority === null || typeof priority === "string" || typeof priority === "number" || typeof priority === "object" && ".sv" in priority, "Invalid priority type found: " + typeof priority);
  if (typeof json === "object" && ".value" in json && json[".value"] !== null) {
    json = json[".value"];
  }
  if (typeof json !== "object" || ".sv" in json) {
    const jsonLeaf = json;
    return new LeafNode(jsonLeaf, nodeFromJSON(priority));
  }
  if (!(json instanceof Array) && USE_HINZE) {
    const children = [];
    let childrenHavePriority = false;
    const hinzeJsonObj = json;
    each(hinzeJsonObj, (key, child2) => {
      if (key.substring(0, 1) !== ".") {
        const childNode = nodeFromJSON(child2);
        if (!childNode.isEmpty()) {
          childrenHavePriority = childrenHavePriority || !childNode.getPriority().isEmpty();
          children.push(new NamedNode(key, childNode));
        }
      }
    });
    if (children.length === 0) {
      return ChildrenNode.EMPTY_NODE;
    }
    const childSet = buildChildSet(children, NAME_ONLY_COMPARATOR, (namedNode) => namedNode.name, NAME_COMPARATOR);
    if (childrenHavePriority) {
      const sortedChildSet = buildChildSet(children, PRIORITY_INDEX.getCompare());
      return new ChildrenNode(childSet, nodeFromJSON(priority), new IndexMap({ ".priority": sortedChildSet }, { ".priority": PRIORITY_INDEX }));
    } else {
      return new ChildrenNode(childSet, nodeFromJSON(priority), IndexMap.Default);
    }
  } else {
    let node = ChildrenNode.EMPTY_NODE;
    each(json, (key, childData) => {
      if (contains(json, key)) {
        if (key.substring(0, 1) !== ".") {
          const childNode = nodeFromJSON(childData);
          if (childNode.isLeafNode() || !childNode.isEmpty()) {
            node = node.updateImmediateChild(key, childNode);
          }
        }
      }
    });
    return node.updatePriority(nodeFromJSON(priority));
  }
}
setNodeFromJSON(nodeFromJSON);
var PathIndex = class extends Index {
  constructor(indexPath_) {
    super();
    this.indexPath_ = indexPath_;
    assert(!pathIsEmpty(indexPath_) && pathGetFront(indexPath_) !== ".priority", "Can't create PathIndex with empty path or .priority key");
  }
  extractChild(snap) {
    return snap.getChild(this.indexPath_);
  }
  isDefinedOn(node) {
    return !node.getChild(this.indexPath_).isEmpty();
  }
  compare(a, b) {
    const aChild = this.extractChild(a.node);
    const bChild = this.extractChild(b.node);
    const indexCmp = aChild.compareTo(bChild);
    if (indexCmp === 0) {
      return nameCompare(a.name, b.name);
    } else {
      return indexCmp;
    }
  }
  makePost(indexValue, name4) {
    const valueNode = nodeFromJSON(indexValue);
    const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode);
    return new NamedNode(name4, node);
  }
  maxPost() {
    const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE);
    return new NamedNode(MAX_NAME, node);
  }
  toString() {
    return pathSlice(this.indexPath_, 0).join("/");
  }
};
var ValueIndex = class extends Index {
  compare(a, b) {
    const indexCmp = a.node.compareTo(b.node);
    if (indexCmp === 0) {
      return nameCompare(a.name, b.name);
    } else {
      return indexCmp;
    }
  }
  isDefinedOn(node) {
    return true;
  }
  indexedValueChanged(oldNode, newNode) {
    return !oldNode.equals(newNode);
  }
  minPost() {
    return NamedNode.MIN;
  }
  maxPost() {
    return NamedNode.MAX;
  }
  makePost(indexValue, name4) {
    const valueNode = nodeFromJSON(indexValue);
    return new NamedNode(name4, valueNode);
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".value";
  }
};
var VALUE_INDEX = new ValueIndex();
function changeValue(snapshotNode) {
  return { type: "value", snapshotNode };
}
function changeChildAdded(childName, snapshotNode) {
  return { type: "child_added", snapshotNode, childName };
}
function changeChildRemoved(childName, snapshotNode) {
  return { type: "child_removed", snapshotNode, childName };
}
function changeChildChanged(childName, snapshotNode, oldSnap) {
  return {
    type: "child_changed",
    snapshotNode,
    childName,
    oldSnap
  };
}
function changeChildMoved(childName, snapshotNode) {
  return { type: "child_moved", snapshotNode, childName };
}
var IndexedFilter = class {
  constructor(index_) {
    this.index_ = index_;
  }
  updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
    assert(snap.isIndexed(this.index_), "A node must be indexed if only a child is updated");
    const oldChild = snap.getImmediateChild(key);
    if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
      if (oldChild.isEmpty() === newChild.isEmpty()) {
        return snap;
      }
    }
    if (optChangeAccumulator != null) {
      if (newChild.isEmpty()) {
        if (snap.hasChild(key)) {
          optChangeAccumulator.trackChildChange(changeChildRemoved(key, oldChild));
        } else {
          assert(snap.isLeafNode(), "A child remove without an old child only makes sense on a leaf node");
        }
      } else if (oldChild.isEmpty()) {
        optChangeAccumulator.trackChildChange(changeChildAdded(key, newChild));
      } else {
        optChangeAccumulator.trackChildChange(changeChildChanged(key, newChild, oldChild));
      }
    }
    if (snap.isLeafNode() && newChild.isEmpty()) {
      return snap;
    } else {
      return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
    }
  }
  updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
    if (optChangeAccumulator != null) {
      if (!oldSnap.isLeafNode()) {
        oldSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
          if (!newSnap.hasChild(key)) {
            optChangeAccumulator.trackChildChange(changeChildRemoved(key, childNode));
          }
        });
      }
      if (!newSnap.isLeafNode()) {
        newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
          if (oldSnap.hasChild(key)) {
            const oldChild = oldSnap.getImmediateChild(key);
            if (!oldChild.equals(childNode)) {
              optChangeAccumulator.trackChildChange(changeChildChanged(key, childNode, oldChild));
            }
          } else {
            optChangeAccumulator.trackChildChange(changeChildAdded(key, childNode));
          }
        });
      }
    }
    return newSnap.withIndex(this.index_);
  }
  updatePriority(oldSnap, newPriority) {
    if (oldSnap.isEmpty()) {
      return ChildrenNode.EMPTY_NODE;
    } else {
      return oldSnap.updatePriority(newPriority);
    }
  }
  filtersNodes() {
    return false;
  }
  getIndexedFilter() {
    return this;
  }
  getIndex() {
    return this.index_;
  }
};
var RangedFilter = class {
  constructor(params) {
    this.indexedFilter_ = new IndexedFilter(params.getIndex());
    this.index_ = params.getIndex();
    this.startPost_ = RangedFilter.getStartPost_(params);
    this.endPost_ = RangedFilter.getEndPost_(params);
    this.startIsInclusive_ = !params.startAfterSet_;
    this.endIsInclusive_ = !params.endBeforeSet_;
  }
  getStartPost() {
    return this.startPost_;
  }
  getEndPost() {
    return this.endPost_;
  }
  matches(node) {
    const isWithinStart = this.startIsInclusive_ ? this.index_.compare(this.getStartPost(), node) <= 0 : this.index_.compare(this.getStartPost(), node) < 0;
    const isWithinEnd = this.endIsInclusive_ ? this.index_.compare(node, this.getEndPost()) <= 0 : this.index_.compare(node, this.getEndPost()) < 0;
    return isWithinStart && isWithinEnd;
  }
  updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
    if (!this.matches(new NamedNode(key, newChild))) {
      newChild = ChildrenNode.EMPTY_NODE;
    }
    return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
  }
  updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
    if (newSnap.isLeafNode()) {
      newSnap = ChildrenNode.EMPTY_NODE;
    }
    let filtered = newSnap.withIndex(this.index_);
    filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
    const self2 = this;
    newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
      if (!self2.matches(new NamedNode(key, childNode))) {
        filtered = filtered.updateImmediateChild(key, ChildrenNode.EMPTY_NODE);
      }
    });
    return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
  }
  updatePriority(oldSnap, newPriority) {
    return oldSnap;
  }
  filtersNodes() {
    return true;
  }
  getIndexedFilter() {
    return this.indexedFilter_;
  }
  getIndex() {
    return this.index_;
  }
  static getStartPost_(params) {
    if (params.hasStart()) {
      const startName = params.getIndexStartName();
      return params.getIndex().makePost(params.getIndexStartValue(), startName);
    } else {
      return params.getIndex().minPost();
    }
  }
  static getEndPost_(params) {
    if (params.hasEnd()) {
      const endName = params.getIndexEndName();
      return params.getIndex().makePost(params.getIndexEndValue(), endName);
    } else {
      return params.getIndex().maxPost();
    }
  }
};
var LimitedFilter = class {
  constructor(params) {
    this.withinDirectionalStart = (node) => this.reverse_ ? this.withinEndPost(node) : this.withinStartPost(node);
    this.withinDirectionalEnd = (node) => this.reverse_ ? this.withinStartPost(node) : this.withinEndPost(node);
    this.withinStartPost = (node) => {
      const compareRes = this.index_.compare(this.rangedFilter_.getStartPost(), node);
      return this.startIsInclusive_ ? compareRes <= 0 : compareRes < 0;
    };
    this.withinEndPost = (node) => {
      const compareRes = this.index_.compare(node, this.rangedFilter_.getEndPost());
      return this.endIsInclusive_ ? compareRes <= 0 : compareRes < 0;
    };
    this.rangedFilter_ = new RangedFilter(params);
    this.index_ = params.getIndex();
    this.limit_ = params.getLimit();
    this.reverse_ = !params.isViewFromLeft();
    this.startIsInclusive_ = !params.startAfterSet_;
    this.endIsInclusive_ = !params.endBeforeSet_;
  }
  updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
    if (!this.rangedFilter_.matches(new NamedNode(key, newChild))) {
      newChild = ChildrenNode.EMPTY_NODE;
    }
    if (snap.getImmediateChild(key).equals(newChild)) {
      return snap;
    } else if (snap.numChildren() < this.limit_) {
      return this.rangedFilter_.getIndexedFilter().updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
    } else {
      return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
    }
  }
  updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
    let filtered;
    if (newSnap.isLeafNode() || newSnap.isEmpty()) {
      filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
    } else {
      if (this.limit_ * 2 < newSnap.numChildren() && newSnap.isIndexed(this.index_)) {
        filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
        let iterator;
        if (this.reverse_) {
          iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
        } else {
          iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
        }
        let count = 0;
        while (iterator.hasNext() && count < this.limit_) {
          const next = iterator.getNext();
          if (!this.withinDirectionalStart(next)) {
            continue;
          } else if (!this.withinDirectionalEnd(next)) {
            break;
          } else {
            filtered = filtered.updateImmediateChild(next.name, next.node);
            count++;
          }
        }
      } else {
        filtered = newSnap.withIndex(this.index_);
        filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
        let iterator;
        if (this.reverse_) {
          iterator = filtered.getReverseIterator(this.index_);
        } else {
          iterator = filtered.getIterator(this.index_);
        }
        let count = 0;
        while (iterator.hasNext()) {
          const next = iterator.getNext();
          const inRange = count < this.limit_ && this.withinDirectionalStart(next) && this.withinDirectionalEnd(next);
          if (inRange) {
            count++;
          } else {
            filtered = filtered.updateImmediateChild(next.name, ChildrenNode.EMPTY_NODE);
          }
        }
      }
    }
    return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap, filtered, optChangeAccumulator);
  }
  updatePriority(oldSnap, newPriority) {
    return oldSnap;
  }
  filtersNodes() {
    return true;
  }
  getIndexedFilter() {
    return this.rangedFilter_.getIndexedFilter();
  }
  getIndex() {
    return this.index_;
  }
  fullLimitUpdateChild_(snap, childKey, childSnap, source, changeAccumulator) {
    let cmp;
    if (this.reverse_) {
      const indexCmp = this.index_.getCompare();
      cmp = (a, b) => indexCmp(b, a);
    } else {
      cmp = this.index_.getCompare();
    }
    const oldEventCache = snap;
    assert(oldEventCache.numChildren() === this.limit_, "");
    const newChildNamedNode = new NamedNode(childKey, childSnap);
    const windowBoundary = this.reverse_ ? oldEventCache.getFirstChild(this.index_) : oldEventCache.getLastChild(this.index_);
    const inRange = this.rangedFilter_.matches(newChildNamedNode);
    if (oldEventCache.hasChild(childKey)) {
      const oldChildSnap = oldEventCache.getImmediateChild(childKey);
      let nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
      while (nextChild != null && (nextChild.name === childKey || oldEventCache.hasChild(nextChild.name))) {
        nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
      }
      const compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
      const remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
      if (remainsInWindow) {
        if (changeAccumulator != null) {
          changeAccumulator.trackChildChange(changeChildChanged(childKey, childSnap, oldChildSnap));
        }
        return oldEventCache.updateImmediateChild(childKey, childSnap);
      } else {
        if (changeAccumulator != null) {
          changeAccumulator.trackChildChange(changeChildRemoved(childKey, oldChildSnap));
        }
        const newEventCache = oldEventCache.updateImmediateChild(childKey, ChildrenNode.EMPTY_NODE);
        const nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
        if (nextChildInRange) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildAdded(nextChild.name, nextChild.node));
          }
          return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
        } else {
          return newEventCache;
        }
      }
    } else if (childSnap.isEmpty()) {
      return snap;
    } else if (inRange) {
      if (cmp(windowBoundary, newChildNamedNode) >= 0) {
        if (changeAccumulator != null) {
          changeAccumulator.trackChildChange(changeChildRemoved(windowBoundary.name, windowBoundary.node));
          changeAccumulator.trackChildChange(changeChildAdded(childKey, childSnap));
        }
        return oldEventCache.updateImmediateChild(childKey, childSnap).updateImmediateChild(windowBoundary.name, ChildrenNode.EMPTY_NODE);
      } else {
        return snap;
      }
    } else {
      return snap;
    }
  }
};
var QueryParams = class {
  constructor() {
    this.limitSet_ = false;
    this.startSet_ = false;
    this.startNameSet_ = false;
    this.startAfterSet_ = false;
    this.endSet_ = false;
    this.endNameSet_ = false;
    this.endBeforeSet_ = false;
    this.limit_ = 0;
    this.viewFrom_ = "";
    this.indexStartValue_ = null;
    this.indexStartName_ = "";
    this.indexEndValue_ = null;
    this.indexEndName_ = "";
    this.index_ = PRIORITY_INDEX;
  }
  hasStart() {
    return this.startSet_;
  }
  /**
   * @returns True if it would return from left.
   */
  isViewFromLeft() {
    if (this.viewFrom_ === "") {
      return this.startSet_;
    } else {
      return this.viewFrom_ === "l";
    }
  }
  /**
   * Only valid to call if hasStart() returns true
   */
  getIndexStartValue() {
    assert(this.startSet_, "Only valid if start has been set");
    return this.indexStartValue_;
  }
  /**
   * Only valid to call if hasStart() returns true.
   * Returns the starting key name for the range defined by these query parameters
   */
  getIndexStartName() {
    assert(this.startSet_, "Only valid if start has been set");
    if (this.startNameSet_) {
      return this.indexStartName_;
    } else {
      return MIN_NAME;
    }
  }
  hasEnd() {
    return this.endSet_;
  }
  /**
   * Only valid to call if hasEnd() returns true.
   */
  getIndexEndValue() {
    assert(this.endSet_, "Only valid if end has been set");
    return this.indexEndValue_;
  }
  /**
   * Only valid to call if hasEnd() returns true.
   * Returns the end key name for the range defined by these query parameters
   */
  getIndexEndName() {
    assert(this.endSet_, "Only valid if end has been set");
    if (this.endNameSet_) {
      return this.indexEndName_;
    } else {
      return MAX_NAME;
    }
  }
  hasLimit() {
    return this.limitSet_;
  }
  /**
   * @returns True if a limit has been set and it has been explicitly anchored
   */
  hasAnchoredLimit() {
    return this.limitSet_ && this.viewFrom_ !== "";
  }
  /**
   * Only valid to call if hasLimit() returns true
   */
  getLimit() {
    assert(this.limitSet_, "Only valid if limit has been set");
    return this.limit_;
  }
  getIndex() {
    return this.index_;
  }
  loadsAllData() {
    return !(this.startSet_ || this.endSet_ || this.limitSet_);
  }
  isDefault() {
    return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
  }
  copy() {
    const copy = new QueryParams();
    copy.limitSet_ = this.limitSet_;
    copy.limit_ = this.limit_;
    copy.startSet_ = this.startSet_;
    copy.startAfterSet_ = this.startAfterSet_;
    copy.indexStartValue_ = this.indexStartValue_;
    copy.startNameSet_ = this.startNameSet_;
    copy.indexStartName_ = this.indexStartName_;
    copy.endSet_ = this.endSet_;
    copy.endBeforeSet_ = this.endBeforeSet_;
    copy.indexEndValue_ = this.indexEndValue_;
    copy.endNameSet_ = this.endNameSet_;
    copy.indexEndName_ = this.indexEndName_;
    copy.index_ = this.index_;
    copy.viewFrom_ = this.viewFrom_;
    return copy;
  }
};
function queryParamsGetNodeFilter(queryParams) {
  if (queryParams.loadsAllData()) {
    return new IndexedFilter(queryParams.getIndex());
  } else if (queryParams.hasLimit()) {
    return new LimitedFilter(queryParams);
  } else {
    return new RangedFilter(queryParams);
  }
}
function queryParamsToRestQueryStringParameters(queryParams) {
  const qs = {};
  if (queryParams.isDefault()) {
    return qs;
  }
  let orderBy;
  if (queryParams.index_ === PRIORITY_INDEX) {
    orderBy = "$priority";
  } else if (queryParams.index_ === VALUE_INDEX) {
    orderBy = "$value";
  } else if (queryParams.index_ === KEY_INDEX) {
    orderBy = "$key";
  } else {
    assert(queryParams.index_ instanceof PathIndex, "Unrecognized index type!");
    orderBy = queryParams.index_.toString();
  }
  qs[
    "orderBy"
    /* REST_QUERY_CONSTANTS.ORDER_BY */
  ] = stringify(orderBy);
  if (queryParams.startSet_) {
    const startParam = queryParams.startAfterSet_ ? "startAfter" : "startAt";
    qs[startParam] = stringify(queryParams.indexStartValue_);
    if (queryParams.startNameSet_) {
      qs[startParam] += "," + stringify(queryParams.indexStartName_);
    }
  }
  if (queryParams.endSet_) {
    const endParam = queryParams.endBeforeSet_ ? "endBefore" : "endAt";
    qs[endParam] = stringify(queryParams.indexEndValue_);
    if (queryParams.endNameSet_) {
      qs[endParam] += "," + stringify(queryParams.indexEndName_);
    }
  }
  if (queryParams.limitSet_) {
    if (queryParams.isViewFromLeft()) {
      qs[
        "limitToFirst"
        /* REST_QUERY_CONSTANTS.LIMIT_TO_FIRST */
      ] = queryParams.limit_;
    } else {
      qs[
        "limitToLast"
        /* REST_QUERY_CONSTANTS.LIMIT_TO_LAST */
      ] = queryParams.limit_;
    }
  }
  return qs;
}
function queryParamsGetQueryObject(queryParams) {
  const obj = {};
  if (queryParams.startSet_) {
    obj[
      "sp"
      /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_VALUE */
    ] = queryParams.indexStartValue_;
    if (queryParams.startNameSet_) {
      obj[
        "sn"
        /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_NAME */
      ] = queryParams.indexStartName_;
    }
    obj[
      "sin"
      /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_IS_INCLUSIVE */
    ] = !queryParams.startAfterSet_;
  }
  if (queryParams.endSet_) {
    obj[
      "ep"
      /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_VALUE */
    ] = queryParams.indexEndValue_;
    if (queryParams.endNameSet_) {
      obj[
        "en"
        /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_NAME */
      ] = queryParams.indexEndName_;
    }
    obj[
      "ein"
      /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_IS_INCLUSIVE */
    ] = !queryParams.endBeforeSet_;
  }
  if (queryParams.limitSet_) {
    obj[
      "l"
      /* WIRE_PROTOCOL_CONSTANTS.LIMIT */
    ] = queryParams.limit_;
    let viewFrom = queryParams.viewFrom_;
    if (viewFrom === "") {
      if (queryParams.isViewFromLeft()) {
        viewFrom = "l";
      } else {
        viewFrom = "r";
      }
    }
    obj[
      "vf"
      /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM */
    ] = viewFrom;
  }
  if (queryParams.index_ !== PRIORITY_INDEX) {
    obj[
      "i"
      /* WIRE_PROTOCOL_CONSTANTS.INDEX */
    ] = queryParams.index_.toString();
  }
  return obj;
}
var ReadonlyRestClient = class extends ServerActions {
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param onDataUpdate_ - A callback for new data from the server
   */
  constructor(repoInfo_, onDataUpdate_, authTokenProvider_, appCheckTokenProvider_) {
    super();
    this.repoInfo_ = repoInfo_;
    this.onDataUpdate_ = onDataUpdate_;
    this.authTokenProvider_ = authTokenProvider_;
    this.appCheckTokenProvider_ = appCheckTokenProvider_;
    this.log_ = logWrapper("p:rest:");
    this.listens_ = {};
  }
  reportStats(stats) {
    throw new Error("Method not implemented.");
  }
  static getListenId_(query, tag) {
    if (tag !== void 0) {
      return "tag$" + tag;
    } else {
      assert(query._queryParams.isDefault(), "should have a tag if it's not a default query.");
      return query._path.toString();
    }
  }
  /** @inheritDoc */
  listen(query, currentHashFn, tag, onComplete) {
    const pathString = query._path.toString();
    this.log_("Listen called for " + pathString + " " + query._queryIdentifier);
    const listenId = ReadonlyRestClient.getListenId_(query, tag);
    const thisListen = {};
    this.listens_[listenId] = thisListen;
    const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
    this.restRequest_(pathString + ".json", queryStringParameters, (error2, result) => {
      let data = result;
      if (error2 === 404) {
        data = null;
        error2 = null;
      }
      if (error2 === null) {
        this.onDataUpdate_(
          pathString,
          data,
          /*isMerge=*/
          false,
          tag
        );
      }
      if (safeGet(this.listens_, listenId) === thisListen) {
        let status;
        if (!error2) {
          status = "ok";
        } else if (error2 === 401) {
          status = "permission_denied";
        } else {
          status = "rest_error:" + error2;
        }
        onComplete(status, null);
      }
    });
  }
  /** @inheritDoc */
  unlisten(query, tag) {
    const listenId = ReadonlyRestClient.getListenId_(query, tag);
    delete this.listens_[listenId];
  }
  get(query) {
    const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
    const pathString = query._path.toString();
    const deferred = new Deferred();
    this.restRequest_(pathString + ".json", queryStringParameters, (error2, result) => {
      let data = result;
      if (error2 === 404) {
        data = null;
        error2 = null;
      }
      if (error2 === null) {
        this.onDataUpdate_(
          pathString,
          data,
          /*isMerge=*/
          false,
          /*tag=*/
          null
        );
        deferred.resolve(data);
      } else {
        deferred.reject(new Error(data));
      }
    });
    return deferred.promise;
  }
  /** @inheritDoc */
  refreshAuthToken(token) {
  }
  /**
   * Performs a REST request to the given path, with the provided query string parameters,
   * and any auth credentials we have.
   */
  restRequest_(pathString, queryStringParameters = {}, callback) {
    queryStringParameters["format"] = "export";
    return Promise.all([
      this.authTokenProvider_.getToken(
        /*forceRefresh=*/
        false
      ),
      this.appCheckTokenProvider_.getToken(
        /*forceRefresh=*/
        false
      )
    ]).then(([authToken, appCheckToken]) => {
      if (authToken && authToken.accessToken) {
        queryStringParameters["auth"] = authToken.accessToken;
      }
      if (appCheckToken && appCheckToken.token) {
        queryStringParameters["ac"] = appCheckToken.token;
      }
      const url = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + pathString + "?ns=" + this.repoInfo_.namespace + querystring(queryStringParameters);
      this.log_("Sending REST request for " + url);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (callback && xhr.readyState === 4) {
          this.log_("REST Response for " + url + " received. status:", xhr.status, "response:", xhr.responseText);
          let res = null;
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              res = jsonEval(xhr.responseText);
            } catch (e) {
              warn("Failed to parse JSON response for " + url + ": " + xhr.responseText);
            }
            callback(null, res);
          } else {
            if (xhr.status !== 401 && xhr.status !== 404) {
              warn("Got unsuccessful REST response for " + url + " Status: " + xhr.status);
            }
            callback(xhr.status);
          }
          callback = null;
        }
      };
      xhr.open(
        "GET",
        url,
        /*asynchronous=*/
        true
      );
      xhr.send();
    });
  }
};
var SnapshotHolder = class {
  constructor() {
    this.rootNode_ = ChildrenNode.EMPTY_NODE;
  }
  getNode(path) {
    return this.rootNode_.getChild(path);
  }
  updateSnapshot(path, newSnapshotNode) {
    this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
  }
};
function newSparseSnapshotTree() {
  return {
    value: null,
    children: /* @__PURE__ */ new Map()
  };
}
function sparseSnapshotTreeRemember(sparseSnapshotTree, path, data) {
  if (pathIsEmpty(path)) {
    sparseSnapshotTree.value = data;
    sparseSnapshotTree.children.clear();
  } else if (sparseSnapshotTree.value !== null) {
    sparseSnapshotTree.value = sparseSnapshotTree.value.updateChild(path, data);
  } else {
    const childKey = pathGetFront(path);
    if (!sparseSnapshotTree.children.has(childKey)) {
      sparseSnapshotTree.children.set(childKey, newSparseSnapshotTree());
    }
    const child2 = sparseSnapshotTree.children.get(childKey);
    path = pathPopFront(path);
    sparseSnapshotTreeRemember(child2, path, data);
  }
}
function sparseSnapshotTreeForEachTree(sparseSnapshotTree, prefixPath, func) {
  if (sparseSnapshotTree.value !== null) {
    func(prefixPath, sparseSnapshotTree.value);
  } else {
    sparseSnapshotTreeForEachChild(sparseSnapshotTree, (key, tree) => {
      const path = new Path(prefixPath.toString() + "/" + key);
      sparseSnapshotTreeForEachTree(tree, path, func);
    });
  }
}
function sparseSnapshotTreeForEachChild(sparseSnapshotTree, func) {
  sparseSnapshotTree.children.forEach((tree, key) => {
    func(key, tree);
  });
}
var StatsListener = class {
  constructor(collection_) {
    this.collection_ = collection_;
    this.last_ = null;
  }
  get() {
    const newStats = this.collection_.get();
    const delta = Object.assign({}, newStats);
    if (this.last_) {
      each(this.last_, (stat, value) => {
        delta[stat] = delta[stat] - value;
      });
    }
    this.last_ = newStats;
    return delta;
  }
};
var FIRST_STATS_MIN_TIME = 10 * 1e3;
var FIRST_STATS_MAX_TIME = 30 * 1e3;
var REPORT_STATS_INTERVAL = 5 * 60 * 1e3;
var StatsReporter = class {
  constructor(collection, server_) {
    this.server_ = server_;
    this.statsToReport_ = {};
    this.statsListener_ = new StatsListener(collection);
    const timeout = FIRST_STATS_MIN_TIME + (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
    setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
  }
  reportStats_() {
    const stats = this.statsListener_.get();
    const reportedStats = {};
    let haveStatsToReport = false;
    each(stats, (stat, value) => {
      if (value > 0 && contains(this.statsToReport_, stat)) {
        reportedStats[stat] = value;
        haveStatsToReport = true;
      }
    });
    if (haveStatsToReport) {
      this.server_.reportStats(reportedStats);
    }
    setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
  }
};
var OperationType;
(function(OperationType2) {
  OperationType2[OperationType2["OVERWRITE"] = 0] = "OVERWRITE";
  OperationType2[OperationType2["MERGE"] = 1] = "MERGE";
  OperationType2[OperationType2["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
  OperationType2[OperationType2["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
})(OperationType || (OperationType = {}));
function newOperationSourceUser() {
  return {
    fromUser: true,
    fromServer: false,
    queryId: null,
    tagged: false
  };
}
function newOperationSourceServer() {
  return {
    fromUser: false,
    fromServer: true,
    queryId: null,
    tagged: false
  };
}
function newOperationSourceServerTaggedQuery(queryId) {
  return {
    fromUser: false,
    fromServer: true,
    queryId,
    tagged: true
  };
}
var AckUserWrite = class {
  /**
   * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
   */
  constructor(path, affectedTree, revert) {
    this.path = path;
    this.affectedTree = affectedTree;
    this.revert = revert;
    this.type = OperationType.ACK_USER_WRITE;
    this.source = newOperationSourceUser();
  }
  operationForChild(childName) {
    if (!pathIsEmpty(this.path)) {
      assert(pathGetFront(this.path) === childName, "operationForChild called for unrelated child.");
      return new AckUserWrite(pathPopFront(this.path), this.affectedTree, this.revert);
    } else if (this.affectedTree.value != null) {
      assert(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths.");
      return this;
    } else {
      const childTree = this.affectedTree.subtree(new Path(childName));
      return new AckUserWrite(newEmptyPath(), childTree, this.revert);
    }
  }
};
var ListenComplete = class {
  constructor(source, path) {
    this.source = source;
    this.path = path;
    this.type = OperationType.LISTEN_COMPLETE;
  }
  operationForChild(childName) {
    if (pathIsEmpty(this.path)) {
      return new ListenComplete(this.source, newEmptyPath());
    } else {
      return new ListenComplete(this.source, pathPopFront(this.path));
    }
  }
};
var Overwrite = class {
  constructor(source, path, snap) {
    this.source = source;
    this.path = path;
    this.snap = snap;
    this.type = OperationType.OVERWRITE;
  }
  operationForChild(childName) {
    if (pathIsEmpty(this.path)) {
      return new Overwrite(this.source, newEmptyPath(), this.snap.getImmediateChild(childName));
    } else {
      return new Overwrite(this.source, pathPopFront(this.path), this.snap);
    }
  }
};
var Merge = class {
  constructor(source, path, children) {
    this.source = source;
    this.path = path;
    this.children = children;
    this.type = OperationType.MERGE;
  }
  operationForChild(childName) {
    if (pathIsEmpty(this.path)) {
      const childTree = this.children.subtree(new Path(childName));
      if (childTree.isEmpty()) {
        return null;
      } else if (childTree.value) {
        return new Overwrite(this.source, newEmptyPath(), childTree.value);
      } else {
        return new Merge(this.source, newEmptyPath(), childTree);
      }
    } else {
      assert(pathGetFront(this.path) === childName, "Can't get a merge for a child not on the path of the operation");
      return new Merge(this.source, pathPopFront(this.path), this.children);
    }
  }
  toString() {
    return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
  }
};
var CacheNode = class {
  constructor(node_, fullyInitialized_, filtered_) {
    this.node_ = node_;
    this.fullyInitialized_ = fullyInitialized_;
    this.filtered_ = filtered_;
  }
  /**
   * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
   */
  isFullyInitialized() {
    return this.fullyInitialized_;
  }
  /**
   * Returns whether this node is potentially missing children due to a filter applied to the node
   */
  isFiltered() {
    return this.filtered_;
  }
  isCompleteForPath(path) {
    if (pathIsEmpty(path)) {
      return this.isFullyInitialized() && !this.filtered_;
    }
    const childKey = pathGetFront(path);
    return this.isCompleteForChild(childKey);
  }
  isCompleteForChild(key) {
    return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
  }
  getNode() {
    return this.node_;
  }
};
var EventGenerator = class {
  constructor(query_) {
    this.query_ = query_;
    this.index_ = this.query_._queryParams.getIndex();
  }
};
function eventGeneratorGenerateEventsForChanges(eventGenerator, changes, eventCache, eventRegistrations) {
  const events = [];
  const moves = [];
  changes.forEach((change) => {
    if (change.type === "child_changed" && eventGenerator.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
      moves.push(changeChildMoved(change.childName, change.snapshotNode));
    }
  });
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_removed", changes, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_added", changes, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_moved", moves, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_changed", changes, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "value", changes, eventRegistrations, eventCache);
  return events;
}
function eventGeneratorGenerateEventsForType(eventGenerator, events, eventType, changes, registrations, eventCache) {
  const filteredChanges = changes.filter((change) => change.type === eventType);
  filteredChanges.sort((a, b) => eventGeneratorCompareChanges(eventGenerator, a, b));
  filteredChanges.forEach((change) => {
    const materializedChange = eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache);
    registrations.forEach((registration) => {
      if (registration.respondsTo(change.type)) {
        events.push(registration.createEvent(materializedChange, eventGenerator.query_));
      }
    });
  });
}
function eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache) {
  if (change.type === "value" || change.type === "child_removed") {
    return change;
  } else {
    change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, eventGenerator.index_);
    return change;
  }
}
function eventGeneratorCompareChanges(eventGenerator, a, b) {
  if (a.childName == null || b.childName == null) {
    throw assertionError("Should only compare child_ events.");
  }
  const aWrapped = new NamedNode(a.childName, a.snapshotNode);
  const bWrapped = new NamedNode(b.childName, b.snapshotNode);
  return eventGenerator.index_.compare(aWrapped, bWrapped);
}
function newViewCache(eventCache, serverCache) {
  return { eventCache, serverCache };
}
function viewCacheUpdateEventSnap(viewCache, eventSnap, complete, filtered) {
  return newViewCache(new CacheNode(eventSnap, complete, filtered), viewCache.serverCache);
}
function viewCacheUpdateServerSnap(viewCache, serverSnap, complete, filtered) {
  return newViewCache(viewCache.eventCache, new CacheNode(serverSnap, complete, filtered));
}
function viewCacheGetCompleteEventSnap(viewCache) {
  return viewCache.eventCache.isFullyInitialized() ? viewCache.eventCache.getNode() : null;
}
function viewCacheGetCompleteServerSnap(viewCache) {
  return viewCache.serverCache.isFullyInitialized() ? viewCache.serverCache.getNode() : null;
}
var emptyChildrenSingleton;
var EmptyChildren = () => {
  if (!emptyChildrenSingleton) {
    emptyChildrenSingleton = new SortedMap(stringCompare);
  }
  return emptyChildrenSingleton;
};
var ImmutableTree = class {
  constructor(value, children = EmptyChildren()) {
    this.value = value;
    this.children = children;
  }
  static fromObject(obj) {
    let tree = new ImmutableTree(null);
    each(obj, (childPath, childSnap) => {
      tree = tree.set(new Path(childPath), childSnap);
    });
    return tree;
  }
  /**
   * True if the value is empty and there are no children
   */
  isEmpty() {
    return this.value === null && this.children.isEmpty();
  }
  /**
   * Given a path and predicate, return the first node and the path to that node
   * where the predicate returns true.
   *
   * TODO Do a perf test -- If we're creating a bunch of `{path: value:}`
   * objects on the way back out, it may be better to pass down a pathSoFar obj.
   *
   * @param relativePath - The remainder of the path
   * @param predicate - The predicate to satisfy to return a node
   */
  findRootMostMatchingPathAndValue(relativePath, predicate) {
    if (this.value != null && predicate(this.value)) {
      return { path: newEmptyPath(), value: this.value };
    } else {
      if (pathIsEmpty(relativePath)) {
        return null;
      } else {
        const front = pathGetFront(relativePath);
        const child2 = this.children.get(front);
        if (child2 !== null) {
          const childExistingPathAndValue = child2.findRootMostMatchingPathAndValue(pathPopFront(relativePath), predicate);
          if (childExistingPathAndValue != null) {
            const fullPath = pathChild(new Path(front), childExistingPathAndValue.path);
            return { path: fullPath, value: childExistingPathAndValue.value };
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    }
  }
  /**
   * Find, if it exists, the shortest subpath of the given path that points a defined
   * value in the tree
   */
  findRootMostValueAndPath(relativePath) {
    return this.findRootMostMatchingPathAndValue(relativePath, () => true);
  }
  /**
   * @returns The subtree at the given path
   */
  subtree(relativePath) {
    if (pathIsEmpty(relativePath)) {
      return this;
    } else {
      const front = pathGetFront(relativePath);
      const childTree = this.children.get(front);
      if (childTree !== null) {
        return childTree.subtree(pathPopFront(relativePath));
      } else {
        return new ImmutableTree(null);
      }
    }
  }
  /**
   * Sets a value at the specified path.
   *
   * @param relativePath - Path to set value at.
   * @param toSet - Value to set.
   * @returns Resulting tree.
   */
  set(relativePath, toSet) {
    if (pathIsEmpty(relativePath)) {
      return new ImmutableTree(toSet, this.children);
    } else {
      const front = pathGetFront(relativePath);
      const child2 = this.children.get(front) || new ImmutableTree(null);
      const newChild = child2.set(pathPopFront(relativePath), toSet);
      const newChildren = this.children.insert(front, newChild);
      return new ImmutableTree(this.value, newChildren);
    }
  }
  /**
   * Removes the value at the specified path.
   *
   * @param relativePath - Path to value to remove.
   * @returns Resulting tree.
   */
  remove(relativePath) {
    if (pathIsEmpty(relativePath)) {
      if (this.children.isEmpty()) {
        return new ImmutableTree(null);
      } else {
        return new ImmutableTree(null, this.children);
      }
    } else {
      const front = pathGetFront(relativePath);
      const child2 = this.children.get(front);
      if (child2) {
        const newChild = child2.remove(pathPopFront(relativePath));
        let newChildren;
        if (newChild.isEmpty()) {
          newChildren = this.children.remove(front);
        } else {
          newChildren = this.children.insert(front, newChild);
        }
        if (this.value === null && newChildren.isEmpty()) {
          return new ImmutableTree(null);
        } else {
          return new ImmutableTree(this.value, newChildren);
        }
      } else {
        return this;
      }
    }
  }
  /**
   * Gets a value from the tree.
   *
   * @param relativePath - Path to get value for.
   * @returns Value at path, or null.
   */
  get(relativePath) {
    if (pathIsEmpty(relativePath)) {
      return this.value;
    } else {
      const front = pathGetFront(relativePath);
      const child2 = this.children.get(front);
      if (child2) {
        return child2.get(pathPopFront(relativePath));
      } else {
        return null;
      }
    }
  }
  /**
   * Replace the subtree at the specified path with the given new tree.
   *
   * @param relativePath - Path to replace subtree for.
   * @param newTree - New tree.
   * @returns Resulting tree.
   */
  setTree(relativePath, newTree) {
    if (pathIsEmpty(relativePath)) {
      return newTree;
    } else {
      const front = pathGetFront(relativePath);
      const child2 = this.children.get(front) || new ImmutableTree(null);
      const newChild = child2.setTree(pathPopFront(relativePath), newTree);
      let newChildren;
      if (newChild.isEmpty()) {
        newChildren = this.children.remove(front);
      } else {
        newChildren = this.children.insert(front, newChild);
      }
      return new ImmutableTree(this.value, newChildren);
    }
  }
  /**
   * Performs a depth first fold on this tree. Transforms a tree into a single
   * value, given a function that operates on the path to a node, an optional
   * current value, and a map of child names to folded subtrees
   */
  fold(fn) {
    return this.fold_(newEmptyPath(), fn);
  }
  /**
   * Recursive helper for public-facing fold() method
   */
  fold_(pathSoFar, fn) {
    const accum = {};
    this.children.inorderTraversal((childKey, childTree) => {
      accum[childKey] = childTree.fold_(pathChild(pathSoFar, childKey), fn);
    });
    return fn(pathSoFar, this.value, accum);
  }
  /**
   * Find the first matching value on the given path. Return the result of applying f to it.
   */
  findOnPath(path, f) {
    return this.findOnPath_(path, newEmptyPath(), f);
  }
  findOnPath_(pathToFollow, pathSoFar, f) {
    const result = this.value ? f(pathSoFar, this.value) : false;
    if (result) {
      return result;
    } else {
      if (pathIsEmpty(pathToFollow)) {
        return null;
      } else {
        const front = pathGetFront(pathToFollow);
        const nextChild = this.children.get(front);
        if (nextChild) {
          return nextChild.findOnPath_(pathPopFront(pathToFollow), pathChild(pathSoFar, front), f);
        } else {
          return null;
        }
      }
    }
  }
  foreachOnPath(path, f) {
    return this.foreachOnPath_(path, newEmptyPath(), f);
  }
  foreachOnPath_(pathToFollow, currentRelativePath, f) {
    if (pathIsEmpty(pathToFollow)) {
      return this;
    } else {
      if (this.value) {
        f(currentRelativePath, this.value);
      }
      const front = pathGetFront(pathToFollow);
      const nextChild = this.children.get(front);
      if (nextChild) {
        return nextChild.foreachOnPath_(pathPopFront(pathToFollow), pathChild(currentRelativePath, front), f);
      } else {
        return new ImmutableTree(null);
      }
    }
  }
  /**
   * Calls the given function for each node in the tree that has a value.
   *
   * @param f - A function to be called with the path from the root of the tree to
   * a node, and the value at that node. Called in depth-first order.
   */
  foreach(f) {
    this.foreach_(newEmptyPath(), f);
  }
  foreach_(currentRelativePath, f) {
    this.children.inorderTraversal((childName, childTree) => {
      childTree.foreach_(pathChild(currentRelativePath, childName), f);
    });
    if (this.value) {
      f(currentRelativePath, this.value);
    }
  }
  foreachChild(f) {
    this.children.inorderTraversal((childName, childTree) => {
      if (childTree.value) {
        f(childName, childTree.value);
      }
    });
  }
};
var CompoundWrite = class {
  constructor(writeTree_) {
    this.writeTree_ = writeTree_;
  }
  static empty() {
    return new CompoundWrite(new ImmutableTree(null));
  }
};
function compoundWriteAddWrite(compoundWrite, path, node) {
  if (pathIsEmpty(path)) {
    return new CompoundWrite(new ImmutableTree(node));
  } else {
    const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
    if (rootmost != null) {
      const rootMostPath = rootmost.path;
      let value = rootmost.value;
      const relativePath = newRelativePath(rootMostPath, path);
      value = value.updateChild(relativePath, node);
      return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath, value));
    } else {
      const subtree = new ImmutableTree(node);
      const newWriteTree2 = compoundWrite.writeTree_.setTree(path, subtree);
      return new CompoundWrite(newWriteTree2);
    }
  }
}
function compoundWriteAddWrites(compoundWrite, path, updates) {
  let newWrite = compoundWrite;
  each(updates, (childKey, node) => {
    newWrite = compoundWriteAddWrite(newWrite, pathChild(path, childKey), node);
  });
  return newWrite;
}
function compoundWriteRemoveWrite(compoundWrite, path) {
  if (pathIsEmpty(path)) {
    return CompoundWrite.empty();
  } else {
    const newWriteTree2 = compoundWrite.writeTree_.setTree(path, new ImmutableTree(null));
    return new CompoundWrite(newWriteTree2);
  }
}
function compoundWriteHasCompleteWrite(compoundWrite, path) {
  return compoundWriteGetCompleteNode(compoundWrite, path) != null;
}
function compoundWriteGetCompleteNode(compoundWrite, path) {
  const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
  if (rootmost != null) {
    return compoundWrite.writeTree_.get(rootmost.path).getChild(newRelativePath(rootmost.path, path));
  } else {
    return null;
  }
}
function compoundWriteGetCompleteChildren(compoundWrite) {
  const children = [];
  const node = compoundWrite.writeTree_.value;
  if (node != null) {
    if (!node.isLeafNode()) {
      node.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
        children.push(new NamedNode(childName, childNode));
      });
    }
  } else {
    compoundWrite.writeTree_.children.inorderTraversal((childName, childTree) => {
      if (childTree.value != null) {
        children.push(new NamedNode(childName, childTree.value));
      }
    });
  }
  return children;
}
function compoundWriteChildCompoundWrite(compoundWrite, path) {
  if (pathIsEmpty(path)) {
    return compoundWrite;
  } else {
    const shadowingNode = compoundWriteGetCompleteNode(compoundWrite, path);
    if (shadowingNode != null) {
      return new CompoundWrite(new ImmutableTree(shadowingNode));
    } else {
      return new CompoundWrite(compoundWrite.writeTree_.subtree(path));
    }
  }
}
function compoundWriteIsEmpty(compoundWrite) {
  return compoundWrite.writeTree_.isEmpty();
}
function compoundWriteApply(compoundWrite, node) {
  return applySubtreeWrite(newEmptyPath(), compoundWrite.writeTree_, node);
}
function applySubtreeWrite(relativePath, writeTree, node) {
  if (writeTree.value != null) {
    return node.updateChild(relativePath, writeTree.value);
  } else {
    let priorityWrite = null;
    writeTree.children.inorderTraversal((childKey, childTree) => {
      if (childKey === ".priority") {
        assert(childTree.value !== null, "Priority writes must always be leaf nodes");
        priorityWrite = childTree.value;
      } else {
        node = applySubtreeWrite(pathChild(relativePath, childKey), childTree, node);
      }
    });
    if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) {
      node = node.updateChild(pathChild(relativePath, ".priority"), priorityWrite);
    }
    return node;
  }
}
function writeTreeChildWrites(writeTree, path) {
  return newWriteTreeRef(path, writeTree);
}
function writeTreeAddOverwrite(writeTree, path, snap, writeId, visible) {
  assert(writeId > writeTree.lastWriteId, "Stacking an older write on top of newer ones");
  if (visible === void 0) {
    visible = true;
  }
  writeTree.allWrites.push({
    path,
    snap,
    writeId,
    visible
  });
  if (visible) {
    writeTree.visibleWrites = compoundWriteAddWrite(writeTree.visibleWrites, path, snap);
  }
  writeTree.lastWriteId = writeId;
}
function writeTreeAddMerge(writeTree, path, changedChildren, writeId) {
  assert(writeId > writeTree.lastWriteId, "Stacking an older merge on top of newer ones");
  writeTree.allWrites.push({
    path,
    children: changedChildren,
    writeId,
    visible: true
  });
  writeTree.visibleWrites = compoundWriteAddWrites(writeTree.visibleWrites, path, changedChildren);
  writeTree.lastWriteId = writeId;
}
function writeTreeGetWrite(writeTree, writeId) {
  for (let i = 0; i < writeTree.allWrites.length; i++) {
    const record = writeTree.allWrites[i];
    if (record.writeId === writeId) {
      return record;
    }
  }
  return null;
}
function writeTreeRemoveWrite(writeTree, writeId) {
  const idx = writeTree.allWrites.findIndex((s) => {
    return s.writeId === writeId;
  });
  assert(idx >= 0, "removeWrite called with nonexistent writeId.");
  const writeToRemove = writeTree.allWrites[idx];
  writeTree.allWrites.splice(idx, 1);
  let removedWriteWasVisible = writeToRemove.visible;
  let removedWriteOverlapsWithOtherWrites = false;
  let i = writeTree.allWrites.length - 1;
  while (removedWriteWasVisible && i >= 0) {
    const currentWrite = writeTree.allWrites[i];
    if (currentWrite.visible) {
      if (i >= idx && writeTreeRecordContainsPath_(currentWrite, writeToRemove.path)) {
        removedWriteWasVisible = false;
      } else if (pathContains(writeToRemove.path, currentWrite.path)) {
        removedWriteOverlapsWithOtherWrites = true;
      }
    }
    i--;
  }
  if (!removedWriteWasVisible) {
    return false;
  } else if (removedWriteOverlapsWithOtherWrites) {
    writeTreeResetTree_(writeTree);
    return true;
  } else {
    if (writeToRemove.snap) {
      writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, writeToRemove.path);
    } else {
      const children = writeToRemove.children;
      each(children, (childName) => {
        writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, pathChild(writeToRemove.path, childName));
      });
    }
    return true;
  }
}
function writeTreeRecordContainsPath_(writeRecord, path) {
  if (writeRecord.snap) {
    return pathContains(writeRecord.path, path);
  } else {
    for (const childName in writeRecord.children) {
      if (writeRecord.children.hasOwnProperty(childName) && pathContains(pathChild(writeRecord.path, childName), path)) {
        return true;
      }
    }
    return false;
  }
}
function writeTreeResetTree_(writeTree) {
  writeTree.visibleWrites = writeTreeLayerTree_(writeTree.allWrites, writeTreeDefaultFilter_, newEmptyPath());
  if (writeTree.allWrites.length > 0) {
    writeTree.lastWriteId = writeTree.allWrites[writeTree.allWrites.length - 1].writeId;
  } else {
    writeTree.lastWriteId = -1;
  }
}
function writeTreeDefaultFilter_(write) {
  return write.visible;
}
function writeTreeLayerTree_(writes, filter, treeRoot) {
  let compoundWrite = CompoundWrite.empty();
  for (let i = 0; i < writes.length; ++i) {
    const write = writes[i];
    if (filter(write)) {
      const writePath = write.path;
      let relativePath;
      if (write.snap) {
        if (pathContains(treeRoot, writePath)) {
          relativePath = newRelativePath(treeRoot, writePath);
          compoundWrite = compoundWriteAddWrite(compoundWrite, relativePath, write.snap);
        } else if (pathContains(writePath, treeRoot)) {
          relativePath = newRelativePath(writePath, treeRoot);
          compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), write.snap.getChild(relativePath));
        } else
          ;
      } else if (write.children) {
        if (pathContains(treeRoot, writePath)) {
          relativePath = newRelativePath(treeRoot, writePath);
          compoundWrite = compoundWriteAddWrites(compoundWrite, relativePath, write.children);
        } else if (pathContains(writePath, treeRoot)) {
          relativePath = newRelativePath(writePath, treeRoot);
          if (pathIsEmpty(relativePath)) {
            compoundWrite = compoundWriteAddWrites(compoundWrite, newEmptyPath(), write.children);
          } else {
            const child2 = safeGet(write.children, pathGetFront(relativePath));
            if (child2) {
              const deepNode = child2.getChild(pathPopFront(relativePath));
              compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), deepNode);
            }
          }
        } else
          ;
      } else {
        throw assertionError("WriteRecord should have .snap or .children");
      }
    }
  }
  return compoundWrite;
}
function writeTreeCalcCompleteEventCache(writeTree, treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
  if (!writeIdsToExclude && !includeHiddenWrites) {
    const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
    if (shadowingNode != null) {
      return shadowingNode;
    } else {
      const subMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
      if (compoundWriteIsEmpty(subMerge)) {
        return completeServerCache;
      } else if (completeServerCache == null && !compoundWriteHasCompleteWrite(subMerge, newEmptyPath())) {
        return null;
      } else {
        const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
        return compoundWriteApply(subMerge, layeredCache);
      }
    }
  } else {
    const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    if (!includeHiddenWrites && compoundWriteIsEmpty(merge)) {
      return completeServerCache;
    } else {
      if (!includeHiddenWrites && completeServerCache == null && !compoundWriteHasCompleteWrite(merge, newEmptyPath())) {
        return null;
      } else {
        const filter = function(write) {
          return (write.visible || includeHiddenWrites) && (!writeIdsToExclude || !~writeIdsToExclude.indexOf(write.writeId)) && (pathContains(write.path, treePath) || pathContains(treePath, write.path));
        };
        const mergeAtPath = writeTreeLayerTree_(writeTree.allWrites, filter, treePath);
        const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
        return compoundWriteApply(mergeAtPath, layeredCache);
      }
    }
  }
}
function writeTreeCalcCompleteEventChildren(writeTree, treePath, completeServerChildren) {
  let completeChildren = ChildrenNode.EMPTY_NODE;
  const topLevelSet = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
  if (topLevelSet) {
    if (!topLevelSet.isLeafNode()) {
      topLevelSet.forEachChild(PRIORITY_INDEX, (childName, childSnap) => {
        completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
      });
    }
    return completeChildren;
  } else if (completeServerChildren) {
    const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    completeServerChildren.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
      const node = compoundWriteApply(compoundWriteChildCompoundWrite(merge, new Path(childName)), childNode);
      completeChildren = completeChildren.updateImmediateChild(childName, node);
    });
    compoundWriteGetCompleteChildren(merge).forEach((namedNode) => {
      completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
    });
    return completeChildren;
  } else {
    const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    compoundWriteGetCompleteChildren(merge).forEach((namedNode) => {
      completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
    });
    return completeChildren;
  }
}
function writeTreeCalcEventCacheAfterServerOverwrite(writeTree, treePath, childPath, existingEventSnap, existingServerSnap) {
  assert(existingEventSnap || existingServerSnap, "Either existingEventSnap or existingServerSnap must exist");
  const path = pathChild(treePath, childPath);
  if (compoundWriteHasCompleteWrite(writeTree.visibleWrites, path)) {
    return null;
  } else {
    const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
    if (compoundWriteIsEmpty(childMerge)) {
      return existingServerSnap.getChild(childPath);
    } else {
      return compoundWriteApply(childMerge, existingServerSnap.getChild(childPath));
    }
  }
}
function writeTreeCalcCompleteChild(writeTree, treePath, childKey, existingServerSnap) {
  const path = pathChild(treePath, childKey);
  const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
  if (shadowingNode != null) {
    return shadowingNode;
  } else {
    if (existingServerSnap.isCompleteForChild(childKey)) {
      const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
      return compoundWriteApply(childMerge, existingServerSnap.getNode().getImmediateChild(childKey));
    } else {
      return null;
    }
  }
}
function writeTreeShadowingWrite(writeTree, path) {
  return compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
}
function writeTreeCalcIndexedSlice(writeTree, treePath, completeServerData, startPost, count, reverse, index) {
  let toIterate;
  const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
  const shadowingNode = compoundWriteGetCompleteNode(merge, newEmptyPath());
  if (shadowingNode != null) {
    toIterate = shadowingNode;
  } else if (completeServerData != null) {
    toIterate = compoundWriteApply(merge, completeServerData);
  } else {
    return [];
  }
  toIterate = toIterate.withIndex(index);
  if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
    const nodes = [];
    const cmp = index.getCompare();
    const iter = reverse ? toIterate.getReverseIteratorFrom(startPost, index) : toIterate.getIteratorFrom(startPost, index);
    let next = iter.getNext();
    while (next && nodes.length < count) {
      if (cmp(next, startPost) !== 0) {
        nodes.push(next);
      }
      next = iter.getNext();
    }
    return nodes;
  } else {
    return [];
  }
}
function newWriteTree() {
  return {
    visibleWrites: CompoundWrite.empty(),
    allWrites: [],
    lastWriteId: -1
  };
}
function writeTreeRefCalcCompleteEventCache(writeTreeRef, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
  return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites);
}
function writeTreeRefCalcCompleteEventChildren(writeTreeRef, completeServerChildren) {
  return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerChildren);
}
function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef, path, existingEventSnap, existingServerSnap) {
  return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree, writeTreeRef.treePath, path, existingEventSnap, existingServerSnap);
}
function writeTreeRefShadowingWrite(writeTreeRef, path) {
  return writeTreeShadowingWrite(writeTreeRef.writeTree, pathChild(writeTreeRef.treePath, path));
}
function writeTreeRefCalcIndexedSlice(writeTreeRef, completeServerData, startPost, count, reverse, index) {
  return writeTreeCalcIndexedSlice(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerData, startPost, count, reverse, index);
}
function writeTreeRefCalcCompleteChild(writeTreeRef, childKey, existingServerCache) {
  return writeTreeCalcCompleteChild(writeTreeRef.writeTree, writeTreeRef.treePath, childKey, existingServerCache);
}
function writeTreeRefChild(writeTreeRef, childName) {
  return newWriteTreeRef(pathChild(writeTreeRef.treePath, childName), writeTreeRef.writeTree);
}
function newWriteTreeRef(path, writeTree) {
  return {
    treePath: path,
    writeTree
  };
}
var ChildChangeAccumulator = class {
  constructor() {
    this.changeMap = /* @__PURE__ */ new Map();
  }
  trackChildChange(change) {
    const type = change.type;
    const childKey = change.childName;
    assert(type === "child_added" || type === "child_changed" || type === "child_removed", "Only child changes supported for tracking");
    assert(childKey !== ".priority", "Only non-priority child changes can be tracked.");
    const oldChange = this.changeMap.get(childKey);
    if (oldChange) {
      const oldType = oldChange.type;
      if (type === "child_added" && oldType === "child_removed") {
        this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.snapshotNode));
      } else if (type === "child_removed" && oldType === "child_added") {
        this.changeMap.delete(childKey);
      } else if (type === "child_removed" && oldType === "child_changed") {
        this.changeMap.set(childKey, changeChildRemoved(childKey, oldChange.oldSnap));
      } else if (type === "child_changed" && oldType === "child_added") {
        this.changeMap.set(childKey, changeChildAdded(childKey, change.snapshotNode));
      } else if (type === "child_changed" && oldType === "child_changed") {
        this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.oldSnap));
      } else {
        throw assertionError("Illegal combination of changes: " + change + " occurred after " + oldChange);
      }
    } else {
      this.changeMap.set(childKey, change);
    }
  }
  getChanges() {
    return Array.from(this.changeMap.values());
  }
};
var NoCompleteChildSource_ = class {
  getCompleteChild(childKey) {
    return null;
  }
  getChildAfterChild(index, child2, reverse) {
    return null;
  }
};
var NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
var WriteTreeCompleteChildSource = class {
  constructor(writes_, viewCache_, optCompleteServerCache_ = null) {
    this.writes_ = writes_;
    this.viewCache_ = viewCache_;
    this.optCompleteServerCache_ = optCompleteServerCache_;
  }
  getCompleteChild(childKey) {
    const node = this.viewCache_.eventCache;
    if (node.isCompleteForChild(childKey)) {
      return node.getNode().getImmediateChild(childKey);
    } else {
      const serverNode = this.optCompleteServerCache_ != null ? new CacheNode(this.optCompleteServerCache_, true, false) : this.viewCache_.serverCache;
      return writeTreeRefCalcCompleteChild(this.writes_, childKey, serverNode);
    }
  }
  getChildAfterChild(index, child2, reverse) {
    const completeServerData = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : viewCacheGetCompleteServerSnap(this.viewCache_);
    const nodes = writeTreeRefCalcIndexedSlice(this.writes_, completeServerData, child2, 1, reverse, index);
    if (nodes.length === 0) {
      return null;
    } else {
      return nodes[0];
    }
  }
};
function newViewProcessor(filter) {
  return { filter };
}
function viewProcessorAssertIndexed(viewProcessor, viewCache) {
  assert(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()), "Event snap not indexed");
  assert(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()), "Server snap not indexed");
}
function viewProcessorApplyOperation(viewProcessor, oldViewCache, operation, writesCache, completeCache) {
  const accumulator = new ChildChangeAccumulator();
  let newViewCache2, filterServerNode;
  if (operation.type === OperationType.OVERWRITE) {
    const overwrite = operation;
    if (overwrite.source.fromUser) {
      newViewCache2 = viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
    } else {
      assert(overwrite.source.fromServer, "Unknown source.");
      filterServerNode = overwrite.source.tagged || oldViewCache.serverCache.isFiltered() && !pathIsEmpty(overwrite.path);
      newViewCache2 = viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
    }
  } else if (operation.type === OperationType.MERGE) {
    const merge = operation;
    if (merge.source.fromUser) {
      newViewCache2 = viewProcessorApplyUserMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
    } else {
      assert(merge.source.fromServer, "Unknown source.");
      filterServerNode = merge.source.tagged || oldViewCache.serverCache.isFiltered();
      newViewCache2 = viewProcessorApplyServerMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
    }
  } else if (operation.type === OperationType.ACK_USER_WRITE) {
    const ackUserWrite = operation;
    if (!ackUserWrite.revert) {
      newViewCache2 = viewProcessorAckUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
    } else {
      newViewCache2 = viewProcessorRevertUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
    }
  } else if (operation.type === OperationType.LISTEN_COMPLETE) {
    newViewCache2 = viewProcessorListenComplete(viewProcessor, oldViewCache, operation.path, writesCache, accumulator);
  } else {
    throw assertionError("Unknown operation type: " + operation.type);
  }
  const changes = accumulator.getChanges();
  viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache2, changes);
  return { viewCache: newViewCache2, changes };
}
function viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache2, accumulator) {
  const eventSnap = newViewCache2.eventCache;
  if (eventSnap.isFullyInitialized()) {
    const isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
    const oldCompleteSnap = viewCacheGetCompleteEventSnap(oldViewCache);
    if (accumulator.length > 0 || !oldViewCache.eventCache.isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
      accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache2)));
    }
  }
}
function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCache, changePath, writesCache, source, accumulator) {
  const oldEventSnap = viewCache.eventCache;
  if (writeTreeRefShadowingWrite(writesCache, changePath) != null) {
    return viewCache;
  } else {
    let newEventCache, serverNode;
    if (pathIsEmpty(changePath)) {
      assert(viewCache.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data");
      if (viewCache.serverCache.isFiltered()) {
        const serverCache = viewCacheGetCompleteServerSnap(viewCache);
        const completeChildren = serverCache instanceof ChildrenNode ? serverCache : ChildrenNode.EMPTY_NODE;
        const completeEventChildren = writeTreeRefCalcCompleteEventChildren(writesCache, completeChildren);
        newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeEventChildren, accumulator);
      } else {
        const completeNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
        newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeNode, accumulator);
      }
    } else {
      const childKey = pathGetFront(changePath);
      if (childKey === ".priority") {
        assert(pathGetLength(changePath) === 1, "Can't have a priority with additional path components");
        const oldEventNode = oldEventSnap.getNode();
        serverNode = viewCache.serverCache.getNode();
        const updatedPriority = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventNode, serverNode);
        if (updatedPriority != null) {
          newEventCache = viewProcessor.filter.updatePriority(oldEventNode, updatedPriority);
        } else {
          newEventCache = oldEventSnap.getNode();
        }
      } else {
        const childChangePath = pathPopFront(changePath);
        let newEventChild;
        if (oldEventSnap.isCompleteForChild(childKey)) {
          serverNode = viewCache.serverCache.getNode();
          const eventChildUpdate = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventSnap.getNode(), serverNode);
          if (eventChildUpdate != null) {
            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
          } else {
            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
          }
        } else {
          newEventChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
        }
        if (newEventChild != null) {
          newEventCache = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
        } else {
          newEventCache = oldEventSnap.getNode();
        }
      }
    }
    return viewCacheUpdateEventSnap(viewCache, newEventCache, oldEventSnap.isFullyInitialized() || pathIsEmpty(changePath), viewProcessor.filter.filtersNodes());
  }
}
function viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
  const oldServerSnap = oldViewCache.serverCache;
  let newServerCache;
  const serverFilter = filterServerNode ? viewProcessor.filter : viewProcessor.filter.getIndexedFilter();
  if (pathIsEmpty(changePath)) {
    newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
  } else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
    const newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
    newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
  } else {
    const childKey = pathGetFront(changePath);
    if (!oldServerSnap.isCompleteForPath(changePath) && pathGetLength(changePath) > 1) {
      return oldViewCache;
    }
    const childChangePath = pathPopFront(changePath);
    const childNode = oldServerSnap.getNode().getImmediateChild(childKey);
    const newChildNode = childNode.updateChild(childChangePath, changedSnap);
    if (childKey === ".priority") {
      newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
    } else {
      newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
    }
  }
  const newViewCache2 = viewCacheUpdateServerSnap(oldViewCache, newServerCache, oldServerSnap.isFullyInitialized() || pathIsEmpty(changePath), serverFilter.filtersNodes());
  const source = new WriteTreeCompleteChildSource(writesCache, newViewCache2, completeCache);
  return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache2, changePath, writesCache, source, accumulator);
}
function viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
  const oldEventSnap = oldViewCache.eventCache;
  let newViewCache2, newEventCache;
  const source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
  if (pathIsEmpty(changePath)) {
    newEventCache = viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(), changedSnap, accumulator);
    newViewCache2 = viewCacheUpdateEventSnap(oldViewCache, newEventCache, true, viewProcessor.filter.filtersNodes());
  } else {
    const childKey = pathGetFront(changePath);
    if (childKey === ".priority") {
      newEventCache = viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(), changedSnap);
      newViewCache2 = viewCacheUpdateEventSnap(oldViewCache, newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
    } else {
      const childChangePath = pathPopFront(changePath);
      const oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
      let newChild;
      if (pathIsEmpty(childChangePath)) {
        newChild = changedSnap;
      } else {
        const childNode = source.getCompleteChild(childKey);
        if (childNode != null) {
          if (pathGetBack(childChangePath) === ".priority" && childNode.getChild(pathParent(childChangePath)).isEmpty()) {
            newChild = childNode;
          } else {
            newChild = childNode.updateChild(childChangePath, changedSnap);
          }
        } else {
          newChild = ChildrenNode.EMPTY_NODE;
        }
      }
      if (!oldChild.equals(newChild)) {
        const newEventSnap = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
        newViewCache2 = viewCacheUpdateEventSnap(oldViewCache, newEventSnap, oldEventSnap.isFullyInitialized(), viewProcessor.filter.filtersNodes());
      } else {
        newViewCache2 = oldViewCache;
      }
    }
  }
  return newViewCache2;
}
function viewProcessorCacheHasChild(viewCache, childKey) {
  return viewCache.eventCache.isCompleteForChild(childKey);
}
function viewProcessorApplyUserMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
  let curViewCache = viewCache;
  changedChildren.foreach((relativePath, childNode) => {
    const writePath = pathChild(path, relativePath);
    if (viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
      curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
    }
  });
  changedChildren.foreach((relativePath, childNode) => {
    const writePath = pathChild(path, relativePath);
    if (!viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
      curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
    }
  });
  return curViewCache;
}
function viewProcessorApplyMerge(viewProcessor, node, merge) {
  merge.foreach((relativePath, childNode) => {
    node = node.updateChild(relativePath, childNode);
  });
  return node;
}
function viewProcessorApplyServerMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
  if (viewCache.serverCache.getNode().isEmpty() && !viewCache.serverCache.isFullyInitialized()) {
    return viewCache;
  }
  let curViewCache = viewCache;
  let viewMergeTree;
  if (pathIsEmpty(path)) {
    viewMergeTree = changedChildren;
  } else {
    viewMergeTree = new ImmutableTree(null).setTree(path, changedChildren);
  }
  const serverNode = viewCache.serverCache.getNode();
  viewMergeTree.children.inorderTraversal((childKey, childTree) => {
    if (serverNode.hasChild(childKey)) {
      const serverChild = viewCache.serverCache.getNode().getImmediateChild(childKey);
      const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childTree);
      curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
    }
  });
  viewMergeTree.children.inorderTraversal((childKey, childMergeTree) => {
    const isUnknownDeepMerge = !viewCache.serverCache.isCompleteForChild(childKey) && childMergeTree.value === null;
    if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
      const serverChild = viewCache.serverCache.getNode().getImmediateChild(childKey);
      const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childMergeTree);
      curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
    }
  });
  return curViewCache;
}
function viewProcessorAckUserWrite(viewProcessor, viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
  if (writeTreeRefShadowingWrite(writesCache, ackPath) != null) {
    return viewCache;
  }
  const filterServerNode = viewCache.serverCache.isFiltered();
  const serverCache = viewCache.serverCache;
  if (affectedTree.value != null) {
    if (pathIsEmpty(ackPath) && serverCache.isFullyInitialized() || serverCache.isCompleteForPath(ackPath)) {
      return viewProcessorApplyServerOverwrite(viewProcessor, viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
    } else if (pathIsEmpty(ackPath)) {
      let changedChildren = new ImmutableTree(null);
      serverCache.getNode().forEachChild(KEY_INDEX, (name4, node) => {
        changedChildren = changedChildren.set(new Path(name4), node);
      });
      return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
    } else {
      return viewCache;
    }
  } else {
    let changedChildren = new ImmutableTree(null);
    affectedTree.foreach((mergePath, value) => {
      const serverCachePath = pathChild(ackPath, mergePath);
      if (serverCache.isCompleteForPath(serverCachePath)) {
        changedChildren = changedChildren.set(mergePath, serverCache.getNode().getChild(serverCachePath));
      }
    });
    return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
  }
}
function viewProcessorListenComplete(viewProcessor, viewCache, path, writesCache, accumulator) {
  const oldServerNode = viewCache.serverCache;
  const newViewCache2 = viewCacheUpdateServerSnap(viewCache, oldServerNode.getNode(), oldServerNode.isFullyInitialized() || pathIsEmpty(path), oldServerNode.isFiltered());
  return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache2, path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
}
function viewProcessorRevertUserWrite(viewProcessor, viewCache, path, writesCache, completeServerCache, accumulator) {
  let complete;
  if (writeTreeRefShadowingWrite(writesCache, path) != null) {
    return viewCache;
  } else {
    const source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
    const oldEventCache = viewCache.eventCache.getNode();
    let newEventCache;
    if (pathIsEmpty(path) || pathGetFront(path) === ".priority") {
      let newNode;
      if (viewCache.serverCache.isFullyInitialized()) {
        newNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
      } else {
        const serverChildren = viewCache.serverCache.getNode();
        assert(serverChildren instanceof ChildrenNode, "serverChildren would be complete if leaf node");
        newNode = writeTreeRefCalcCompleteEventChildren(writesCache, serverChildren);
      }
      newNode = newNode;
      newEventCache = viewProcessor.filter.updateFullNode(oldEventCache, newNode, accumulator);
    } else {
      const childKey = pathGetFront(path);
      let newChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
      if (newChild == null && viewCache.serverCache.isCompleteForChild(childKey)) {
        newChild = oldEventCache.getImmediateChild(childKey);
      }
      if (newChild != null) {
        newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, newChild, pathPopFront(path), source, accumulator);
      } else if (viewCache.eventCache.getNode().hasChild(childKey)) {
        newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, pathPopFront(path), source, accumulator);
      } else {
        newEventCache = oldEventCache;
      }
      if (newEventCache.isEmpty() && viewCache.serverCache.isFullyInitialized()) {
        complete = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
        if (complete.isLeafNode()) {
          newEventCache = viewProcessor.filter.updateFullNode(newEventCache, complete, accumulator);
        }
      }
    }
    complete = viewCache.serverCache.isFullyInitialized() || writeTreeRefShadowingWrite(writesCache, newEmptyPath()) != null;
    return viewCacheUpdateEventSnap(viewCache, newEventCache, complete, viewProcessor.filter.filtersNodes());
  }
}
var View = class {
  constructor(query_, initialViewCache) {
    this.query_ = query_;
    this.eventRegistrations_ = [];
    const params = this.query_._queryParams;
    const indexFilter = new IndexedFilter(params.getIndex());
    const filter = queryParamsGetNodeFilter(params);
    this.processor_ = newViewProcessor(filter);
    const initialServerCache = initialViewCache.serverCache;
    const initialEventCache = initialViewCache.eventCache;
    const serverSnap = indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE, initialServerCache.getNode(), null);
    const eventSnap = filter.updateFullNode(ChildrenNode.EMPTY_NODE, initialEventCache.getNode(), null);
    const newServerCache = new CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
    const newEventCache = new CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
    this.viewCache_ = newViewCache(newEventCache, newServerCache);
    this.eventGenerator_ = new EventGenerator(this.query_);
  }
  get query() {
    return this.query_;
  }
};
function viewGetServerCache(view) {
  return view.viewCache_.serverCache.getNode();
}
function viewGetCompleteServerCache(view, path) {
  const cache = viewCacheGetCompleteServerSnap(view.viewCache_);
  if (cache) {
    if (view.query._queryParams.loadsAllData() || !pathIsEmpty(path) && !cache.getImmediateChild(pathGetFront(path)).isEmpty()) {
      return cache.getChild(path);
    }
  }
  return null;
}
function viewIsEmpty(view) {
  return view.eventRegistrations_.length === 0;
}
function viewAddEventRegistration(view, eventRegistration) {
  view.eventRegistrations_.push(eventRegistration);
}
function viewRemoveEventRegistration(view, eventRegistration, cancelError) {
  const cancelEvents = [];
  if (cancelError) {
    assert(eventRegistration == null, "A cancel should cancel all event registrations.");
    const path = view.query._path;
    view.eventRegistrations_.forEach((registration) => {
      const maybeEvent = registration.createCancelEvent(cancelError, path);
      if (maybeEvent) {
        cancelEvents.push(maybeEvent);
      }
    });
  }
  if (eventRegistration) {
    let remaining = [];
    for (let i = 0; i < view.eventRegistrations_.length; ++i) {
      const existing = view.eventRegistrations_[i];
      if (!existing.matches(eventRegistration)) {
        remaining.push(existing);
      } else if (eventRegistration.hasAnyCallback()) {
        remaining = remaining.concat(view.eventRegistrations_.slice(i + 1));
        break;
      }
    }
    view.eventRegistrations_ = remaining;
  } else {
    view.eventRegistrations_ = [];
  }
  return cancelEvents;
}
function viewApplyOperation(view, operation, writesCache, completeServerCache) {
  if (operation.type === OperationType.MERGE && operation.source.queryId !== null) {
    assert(viewCacheGetCompleteServerSnap(view.viewCache_), "We should always have a full cache before handling merges");
    assert(viewCacheGetCompleteEventSnap(view.viewCache_), "Missing event cache, even though we have a server cache");
  }
  const oldViewCache = view.viewCache_;
  const result = viewProcessorApplyOperation(view.processor_, oldViewCache, operation, writesCache, completeServerCache);
  viewProcessorAssertIndexed(view.processor_, result.viewCache);
  assert(result.viewCache.serverCache.isFullyInitialized() || !oldViewCache.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back");
  view.viewCache_ = result.viewCache;
  return viewGenerateEventsForChanges_(view, result.changes, result.viewCache.eventCache.getNode(), null);
}
function viewGetInitialEvents(view, registration) {
  const eventSnap = view.viewCache_.eventCache;
  const initialChanges = [];
  if (!eventSnap.getNode().isLeafNode()) {
    const eventNode = eventSnap.getNode();
    eventNode.forEachChild(PRIORITY_INDEX, (key, childNode) => {
      initialChanges.push(changeChildAdded(key, childNode));
    });
  }
  if (eventSnap.isFullyInitialized()) {
    initialChanges.push(changeValue(eventSnap.getNode()));
  }
  return viewGenerateEventsForChanges_(view, initialChanges, eventSnap.getNode(), registration);
}
function viewGenerateEventsForChanges_(view, changes, eventCache, eventRegistration) {
  const registrations = eventRegistration ? [eventRegistration] : view.eventRegistrations_;
  return eventGeneratorGenerateEventsForChanges(view.eventGenerator_, changes, eventCache, registrations);
}
var referenceConstructor$1;
var SyncPoint = class {
  constructor() {
    this.views = /* @__PURE__ */ new Map();
  }
};
function syncPointSetReferenceConstructor(val) {
  assert(!referenceConstructor$1, "__referenceConstructor has already been defined");
  referenceConstructor$1 = val;
}
function syncPointGetReferenceConstructor() {
  assert(referenceConstructor$1, "Reference.ts has not been loaded");
  return referenceConstructor$1;
}
function syncPointIsEmpty(syncPoint) {
  return syncPoint.views.size === 0;
}
function syncPointApplyOperation(syncPoint, operation, writesCache, optCompleteServerCache) {
  const queryId = operation.source.queryId;
  if (queryId !== null) {
    const view = syncPoint.views.get(queryId);
    assert(view != null, "SyncTree gave us an op for an invalid query.");
    return viewApplyOperation(view, operation, writesCache, optCompleteServerCache);
  } else {
    let events = [];
    for (const view of syncPoint.views.values()) {
      events = events.concat(viewApplyOperation(view, operation, writesCache, optCompleteServerCache));
    }
    return events;
  }
}
function syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete) {
  const queryId = query._queryIdentifier;
  const view = syncPoint.views.get(queryId);
  if (!view) {
    let eventCache = writeTreeRefCalcCompleteEventCache(writesCache, serverCacheComplete ? serverCache : null);
    let eventCacheComplete = false;
    if (eventCache) {
      eventCacheComplete = true;
    } else if (serverCache instanceof ChildrenNode) {
      eventCache = writeTreeRefCalcCompleteEventChildren(writesCache, serverCache);
      eventCacheComplete = false;
    } else {
      eventCache = ChildrenNode.EMPTY_NODE;
      eventCacheComplete = false;
    }
    const viewCache = newViewCache(new CacheNode(eventCache, eventCacheComplete, false), new CacheNode(serverCache, serverCacheComplete, false));
    return new View(query, viewCache);
  }
  return view;
}
function syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete) {
  const view = syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete);
  if (!syncPoint.views.has(query._queryIdentifier)) {
    syncPoint.views.set(query._queryIdentifier, view);
  }
  viewAddEventRegistration(view, eventRegistration);
  return viewGetInitialEvents(view, eventRegistration);
}
function syncPointRemoveEventRegistration(syncPoint, query, eventRegistration, cancelError) {
  const queryId = query._queryIdentifier;
  const removed = [];
  let cancelEvents = [];
  const hadCompleteView = syncPointHasCompleteView(syncPoint);
  if (queryId === "default") {
    for (const [viewQueryId, view] of syncPoint.views.entries()) {
      cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
      if (viewIsEmpty(view)) {
        syncPoint.views.delete(viewQueryId);
        if (!view.query._queryParams.loadsAllData()) {
          removed.push(view.query);
        }
      }
    }
  } else {
    const view = syncPoint.views.get(queryId);
    if (view) {
      cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
      if (viewIsEmpty(view)) {
        syncPoint.views.delete(queryId);
        if (!view.query._queryParams.loadsAllData()) {
          removed.push(view.query);
        }
      }
    }
  }
  if (hadCompleteView && !syncPointHasCompleteView(syncPoint)) {
    removed.push(new (syncPointGetReferenceConstructor())(query._repo, query._path));
  }
  return { removed, events: cancelEvents };
}
function syncPointGetQueryViews(syncPoint) {
  const result = [];
  for (const view of syncPoint.views.values()) {
    if (!view.query._queryParams.loadsAllData()) {
      result.push(view);
    }
  }
  return result;
}
function syncPointGetCompleteServerCache(syncPoint, path) {
  let serverCache = null;
  for (const view of syncPoint.views.values()) {
    serverCache = serverCache || viewGetCompleteServerCache(view, path);
  }
  return serverCache;
}
function syncPointViewForQuery(syncPoint, query) {
  const params = query._queryParams;
  if (params.loadsAllData()) {
    return syncPointGetCompleteView(syncPoint);
  } else {
    const queryId = query._queryIdentifier;
    return syncPoint.views.get(queryId);
  }
}
function syncPointViewExistsForQuery(syncPoint, query) {
  return syncPointViewForQuery(syncPoint, query) != null;
}
function syncPointHasCompleteView(syncPoint) {
  return syncPointGetCompleteView(syncPoint) != null;
}
function syncPointGetCompleteView(syncPoint) {
  for (const view of syncPoint.views.values()) {
    if (view.query._queryParams.loadsAllData()) {
      return view;
    }
  }
  return null;
}
var referenceConstructor;
function syncTreeSetReferenceConstructor(val) {
  assert(!referenceConstructor, "__referenceConstructor has already been defined");
  referenceConstructor = val;
}
function syncTreeGetReferenceConstructor() {
  assert(referenceConstructor, "Reference.ts has not been loaded");
  return referenceConstructor;
}
var syncTreeNextQueryTag_ = 1;
var SyncTree = class {
  /**
   * @param listenProvider_ - Used by SyncTree to start / stop listening
   *   to server data.
   */
  constructor(listenProvider_) {
    this.listenProvider_ = listenProvider_;
    this.syncPointTree_ = new ImmutableTree(null);
    this.pendingWriteTree_ = newWriteTree();
    this.tagToQueryMap = /* @__PURE__ */ new Map();
    this.queryToTagMap = /* @__PURE__ */ new Map();
  }
};
function syncTreeApplyUserOverwrite(syncTree, path, newData, writeId, visible) {
  writeTreeAddOverwrite(syncTree.pendingWriteTree_, path, newData, writeId, visible);
  if (!visible) {
    return [];
  } else {
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceUser(), path, newData));
  }
}
function syncTreeApplyUserMerge(syncTree, path, changedChildren, writeId) {
  writeTreeAddMerge(syncTree.pendingWriteTree_, path, changedChildren, writeId);
  const changeTree = ImmutableTree.fromObject(changedChildren);
  return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceUser(), path, changeTree));
}
function syncTreeAckUserWrite(syncTree, writeId, revert = false) {
  const write = writeTreeGetWrite(syncTree.pendingWriteTree_, writeId);
  const needToReevaluate = writeTreeRemoveWrite(syncTree.pendingWriteTree_, writeId);
  if (!needToReevaluate) {
    return [];
  } else {
    let affectedTree = new ImmutableTree(null);
    if (write.snap != null) {
      affectedTree = affectedTree.set(newEmptyPath(), true);
    } else {
      each(write.children, (pathString) => {
        affectedTree = affectedTree.set(new Path(pathString), true);
      });
    }
    return syncTreeApplyOperationToSyncPoints_(syncTree, new AckUserWrite(write.path, affectedTree, revert));
  }
}
function syncTreeApplyServerOverwrite(syncTree, path, newData) {
  return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceServer(), path, newData));
}
function syncTreeApplyServerMerge(syncTree, path, changedChildren) {
  const changeTree = ImmutableTree.fromObject(changedChildren);
  return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceServer(), path, changeTree));
}
function syncTreeApplyListenComplete(syncTree, path) {
  return syncTreeApplyOperationToSyncPoints_(syncTree, new ListenComplete(newOperationSourceServer(), path));
}
function syncTreeApplyTaggedListenComplete(syncTree, path, tag) {
  const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
  if (queryKey) {
    const r = syncTreeParseQueryKey_(queryKey);
    const queryPath = r.path, queryId = r.queryId;
    const relativePath = newRelativePath(queryPath, path);
    const op = new ListenComplete(newOperationSourceServerTaggedQuery(queryId), relativePath);
    return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
  } else {
    return [];
  }
}
function syncTreeRemoveEventRegistration(syncTree, query, eventRegistration, cancelError, skipListenerDedup = false) {
  const path = query._path;
  const maybeSyncPoint = syncTree.syncPointTree_.get(path);
  let cancelEvents = [];
  if (maybeSyncPoint && (query._queryIdentifier === "default" || syncPointViewExistsForQuery(maybeSyncPoint, query))) {
    const removedAndEvents = syncPointRemoveEventRegistration(maybeSyncPoint, query, eventRegistration, cancelError);
    if (syncPointIsEmpty(maybeSyncPoint)) {
      syncTree.syncPointTree_ = syncTree.syncPointTree_.remove(path);
    }
    const removed = removedAndEvents.removed;
    cancelEvents = removedAndEvents.events;
    if (!skipListenerDedup) {
      const removingDefault = -1 !== removed.findIndex((query2) => {
        return query2._queryParams.loadsAllData();
      });
      const covered = syncTree.syncPointTree_.findOnPath(path, (relativePath, parentSyncPoint) => syncPointHasCompleteView(parentSyncPoint));
      if (removingDefault && !covered) {
        const subtree = syncTree.syncPointTree_.subtree(path);
        if (!subtree.isEmpty()) {
          const newViews = syncTreeCollectDistinctViewsForSubTree_(subtree);
          for (let i = 0; i < newViews.length; ++i) {
            const view = newViews[i], newQuery = view.query;
            const listener = syncTreeCreateListenerForView_(syncTree, view);
            syncTree.listenProvider_.startListening(syncTreeQueryForListening_(newQuery), syncTreeTagForQuery(syncTree, newQuery), listener.hashFn, listener.onComplete);
          }
        }
      }
      if (!covered && removed.length > 0 && !cancelError) {
        if (removingDefault) {
          const defaultTag = null;
          syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(query), defaultTag);
        } else {
          removed.forEach((queryToRemove) => {
            const tagToRemove = syncTree.queryToTagMap.get(syncTreeMakeQueryKey_(queryToRemove));
            syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToRemove), tagToRemove);
          });
        }
      }
    }
    syncTreeRemoveTags_(syncTree, removed);
  }
  return cancelEvents;
}
function syncTreeApplyTaggedQueryOverwrite(syncTree, path, snap, tag) {
  const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
  if (queryKey != null) {
    const r = syncTreeParseQueryKey_(queryKey);
    const queryPath = r.path, queryId = r.queryId;
    const relativePath = newRelativePath(queryPath, path);
    const op = new Overwrite(newOperationSourceServerTaggedQuery(queryId), relativePath, snap);
    return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
  } else {
    return [];
  }
}
function syncTreeApplyTaggedQueryMerge(syncTree, path, changedChildren, tag) {
  const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
  if (queryKey) {
    const r = syncTreeParseQueryKey_(queryKey);
    const queryPath = r.path, queryId = r.queryId;
    const relativePath = newRelativePath(queryPath, path);
    const changeTree = ImmutableTree.fromObject(changedChildren);
    const op = new Merge(newOperationSourceServerTaggedQuery(queryId), relativePath, changeTree);
    return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
  } else {
    return [];
  }
}
function syncTreeAddEventRegistration(syncTree, query, eventRegistration, skipSetupListener = false) {
  const path = query._path;
  let serverCache = null;
  let foundAncestorDefaultView = false;
  syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
    const relativePath = newRelativePath(pathToSyncPoint, path);
    serverCache = serverCache || syncPointGetCompleteServerCache(sp, relativePath);
    foundAncestorDefaultView = foundAncestorDefaultView || syncPointHasCompleteView(sp);
  });
  let syncPoint = syncTree.syncPointTree_.get(path);
  if (!syncPoint) {
    syncPoint = new SyncPoint();
    syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
  } else {
    foundAncestorDefaultView = foundAncestorDefaultView || syncPointHasCompleteView(syncPoint);
    serverCache = serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
  }
  let serverCacheComplete;
  if (serverCache != null) {
    serverCacheComplete = true;
  } else {
    serverCacheComplete = false;
    serverCache = ChildrenNode.EMPTY_NODE;
    const subtree = syncTree.syncPointTree_.subtree(path);
    subtree.foreachChild((childName, childSyncPoint) => {
      const completeCache = syncPointGetCompleteServerCache(childSyncPoint, newEmptyPath());
      if (completeCache) {
        serverCache = serverCache.updateImmediateChild(childName, completeCache);
      }
    });
  }
  const viewAlreadyExists = syncPointViewExistsForQuery(syncPoint, query);
  if (!viewAlreadyExists && !query._queryParams.loadsAllData()) {
    const queryKey = syncTreeMakeQueryKey_(query);
    assert(!syncTree.queryToTagMap.has(queryKey), "View does not exist, but we have a tag");
    const tag = syncTreeGetNextQueryTag_();
    syncTree.queryToTagMap.set(queryKey, tag);
    syncTree.tagToQueryMap.set(tag, queryKey);
  }
  const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, path);
  let events = syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete);
  if (!viewAlreadyExists && !foundAncestorDefaultView && !skipSetupListener) {
    const view = syncPointViewForQuery(syncPoint, query);
    events = events.concat(syncTreeSetupListener_(syncTree, query, view));
  }
  return events;
}
function syncTreeCalcCompleteEventCache(syncTree, path, writeIdsToExclude) {
  const includeHiddenSets = true;
  const writeTree = syncTree.pendingWriteTree_;
  const serverCache = syncTree.syncPointTree_.findOnPath(path, (pathSoFar, syncPoint) => {
    const relativePath = newRelativePath(pathSoFar, path);
    const serverCache2 = syncPointGetCompleteServerCache(syncPoint, relativePath);
    if (serverCache2) {
      return serverCache2;
    }
  });
  return writeTreeCalcCompleteEventCache(writeTree, path, serverCache, writeIdsToExclude, includeHiddenSets);
}
function syncTreeApplyOperationToSyncPoints_(syncTree, operation) {
  return syncTreeApplyOperationHelper_(
    operation,
    syncTree.syncPointTree_,
    /*serverCache=*/
    null,
    writeTreeChildWrites(syncTree.pendingWriteTree_, newEmptyPath())
  );
}
function syncTreeApplyOperationHelper_(operation, syncPointTree, serverCache, writesCache) {
  if (pathIsEmpty(operation.path)) {
    return syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
  } else {
    const syncPoint = syncPointTree.get(newEmptyPath());
    if (serverCache == null && syncPoint != null) {
      serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    let events = [];
    const childName = pathGetFront(operation.path);
    const childOperation = operation.operationForChild(childName);
    const childTree = syncPointTree.children.get(childName);
    if (childTree && childOperation) {
      const childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
      const childWritesCache = writeTreeRefChild(writesCache, childName);
      events = events.concat(syncTreeApplyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
    }
    if (syncPoint) {
      events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
    }
    return events;
  }
}
function syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache) {
  const syncPoint = syncPointTree.get(newEmptyPath());
  if (serverCache == null && syncPoint != null) {
    serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
  }
  let events = [];
  syncPointTree.children.inorderTraversal((childName, childTree) => {
    const childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
    const childWritesCache = writeTreeRefChild(writesCache, childName);
    const childOperation = operation.operationForChild(childName);
    if (childOperation) {
      events = events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
    }
  });
  if (syncPoint) {
    events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
  }
  return events;
}
function syncTreeCreateListenerForView_(syncTree, view) {
  const query = view.query;
  const tag = syncTreeTagForQuery(syncTree, query);
  return {
    hashFn: () => {
      const cache = viewGetServerCache(view) || ChildrenNode.EMPTY_NODE;
      return cache.hash();
    },
    onComplete: (status) => {
      if (status === "ok") {
        if (tag) {
          return syncTreeApplyTaggedListenComplete(syncTree, query._path, tag);
        } else {
          return syncTreeApplyListenComplete(syncTree, query._path);
        }
      } else {
        const error2 = errorForServerCode(status, query);
        return syncTreeRemoveEventRegistration(
          syncTree,
          query,
          /*eventRegistration*/
          null,
          error2
        );
      }
    }
  };
}
function syncTreeTagForQuery(syncTree, query) {
  const queryKey = syncTreeMakeQueryKey_(query);
  return syncTree.queryToTagMap.get(queryKey);
}
function syncTreeMakeQueryKey_(query) {
  return query._path.toString() + "$" + query._queryIdentifier;
}
function syncTreeQueryKeyForTag_(syncTree, tag) {
  return syncTree.tagToQueryMap.get(tag);
}
function syncTreeParseQueryKey_(queryKey) {
  const splitIndex = queryKey.indexOf("$");
  assert(splitIndex !== -1 && splitIndex < queryKey.length - 1, "Bad queryKey.");
  return {
    queryId: queryKey.substr(splitIndex + 1),
    path: new Path(queryKey.substr(0, splitIndex))
  };
}
function syncTreeApplyTaggedOperation_(syncTree, queryPath, operation) {
  const syncPoint = syncTree.syncPointTree_.get(queryPath);
  assert(syncPoint, "Missing sync point for query tag that we're tracking");
  const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, queryPath);
  return syncPointApplyOperation(syncPoint, operation, writesCache, null);
}
function syncTreeCollectDistinctViewsForSubTree_(subtree) {
  return subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
    if (maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
      const completeView = syncPointGetCompleteView(maybeChildSyncPoint);
      return [completeView];
    } else {
      let views = [];
      if (maybeChildSyncPoint) {
        views = syncPointGetQueryViews(maybeChildSyncPoint);
      }
      each(childMap, (_key, childViews) => {
        views = views.concat(childViews);
      });
      return views;
    }
  });
}
function syncTreeQueryForListening_(query) {
  if (query._queryParams.loadsAllData() && !query._queryParams.isDefault()) {
    return new (syncTreeGetReferenceConstructor())(query._repo, query._path);
  } else {
    return query;
  }
}
function syncTreeRemoveTags_(syncTree, queries) {
  for (let j = 0; j < queries.length; ++j) {
    const removedQuery = queries[j];
    if (!removedQuery._queryParams.loadsAllData()) {
      const removedQueryKey = syncTreeMakeQueryKey_(removedQuery);
      const removedQueryTag = syncTree.queryToTagMap.get(removedQueryKey);
      syncTree.queryToTagMap.delete(removedQueryKey);
      syncTree.tagToQueryMap.delete(removedQueryTag);
    }
  }
}
function syncTreeGetNextQueryTag_() {
  return syncTreeNextQueryTag_++;
}
function syncTreeSetupListener_(syncTree, query, view) {
  const path = query._path;
  const tag = syncTreeTagForQuery(syncTree, query);
  const listener = syncTreeCreateListenerForView_(syncTree, view);
  const events = syncTree.listenProvider_.startListening(syncTreeQueryForListening_(query), tag, listener.hashFn, listener.onComplete);
  const subtree = syncTree.syncPointTree_.subtree(path);
  if (tag) {
    assert(!syncPointHasCompleteView(subtree.value), "If we're adding a query, it shouldn't be shadowed");
  } else {
    const queriesToStop = subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
      if (!pathIsEmpty(relativePath) && maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
        return [syncPointGetCompleteView(maybeChildSyncPoint).query];
      } else {
        let queries = [];
        if (maybeChildSyncPoint) {
          queries = queries.concat(syncPointGetQueryViews(maybeChildSyncPoint).map((view2) => view2.query));
        }
        each(childMap, (_key, childQueries) => {
          queries = queries.concat(childQueries);
        });
        return queries;
      }
    });
    for (let i = 0; i < queriesToStop.length; ++i) {
      const queryToStop = queriesToStop[i];
      syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToStop), syncTreeTagForQuery(syncTree, queryToStop));
    }
  }
  return events;
}
var ExistingValueProvider = class {
  constructor(node_) {
    this.node_ = node_;
  }
  getImmediateChild(childName) {
    const child2 = this.node_.getImmediateChild(childName);
    return new ExistingValueProvider(child2);
  }
  node() {
    return this.node_;
  }
};
var DeferredValueProvider = class {
  constructor(syncTree, path) {
    this.syncTree_ = syncTree;
    this.path_ = path;
  }
  getImmediateChild(childName) {
    const childPath = pathChild(this.path_, childName);
    return new DeferredValueProvider(this.syncTree_, childPath);
  }
  node() {
    return syncTreeCalcCompleteEventCache(this.syncTree_, this.path_);
  }
};
var generateWithValues = function(values) {
  values = values || {};
  values["timestamp"] = values["timestamp"] || (/* @__PURE__ */ new Date()).getTime();
  return values;
};
var resolveDeferredLeafValue = function(value, existingVal, serverValues) {
  if (!value || typeof value !== "object") {
    return value;
  }
  assert(".sv" in value, "Unexpected leaf node or priority contents");
  if (typeof value[".sv"] === "string") {
    return resolveScalarDeferredValue(value[".sv"], existingVal, serverValues);
  } else if (typeof value[".sv"] === "object") {
    return resolveComplexDeferredValue(value[".sv"], existingVal);
  } else {
    assert(false, "Unexpected server value: " + JSON.stringify(value, null, 2));
  }
};
var resolveScalarDeferredValue = function(op, existing, serverValues) {
  switch (op) {
    case "timestamp":
      return serverValues["timestamp"];
    default:
      assert(false, "Unexpected server value: " + op);
  }
};
var resolveComplexDeferredValue = function(op, existing, unused) {
  if (!op.hasOwnProperty("increment")) {
    assert(false, "Unexpected server value: " + JSON.stringify(op, null, 2));
  }
  const delta = op["increment"];
  if (typeof delta !== "number") {
    assert(false, "Unexpected increment value: " + delta);
  }
  const existingNode = existing.node();
  assert(existingNode !== null && typeof existingNode !== "undefined", "Expected ChildrenNode.EMPTY_NODE for nulls");
  if (!existingNode.isLeafNode()) {
    return delta;
  }
  const leaf = existingNode;
  const existingVal = leaf.getValue();
  if (typeof existingVal !== "number") {
    return delta;
  }
  return existingVal + delta;
};
var resolveDeferredValueTree = function(path, node, syncTree, serverValues) {
  return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
};
var resolveDeferredValueSnapshot = function(node, existing, serverValues) {
  return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
};
function resolveDeferredValue(node, existingVal, serverValues) {
  const rawPri = node.getPriority().val();
  const priority = resolveDeferredLeafValue(rawPri, existingVal.getImmediateChild(".priority"), serverValues);
  let newNode;
  if (node.isLeafNode()) {
    const leafNode = node;
    const value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
    if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) {
      return new LeafNode(value, nodeFromJSON(priority));
    } else {
      return node;
    }
  } else {
    const childrenNode = node;
    newNode = childrenNode;
    if (priority !== childrenNode.getPriority().val()) {
      newNode = newNode.updatePriority(new LeafNode(priority));
    }
    childrenNode.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
      const newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
      if (newChildNode !== childNode) {
        newNode = newNode.updateImmediateChild(childName, newChildNode);
      }
    });
    return newNode;
  }
}
var Tree = class {
  /**
   * @param name - Optional name of the node.
   * @param parent - Optional parent node.
   * @param node - Optional node to wrap.
   */
  constructor(name4 = "", parent = null, node = { children: {}, childCount: 0 }) {
    this.name = name4;
    this.parent = parent;
    this.node = node;
  }
};
function treeSubTree(tree, pathObj) {
  let path = pathObj instanceof Path ? pathObj : new Path(pathObj);
  let child2 = tree, next = pathGetFront(path);
  while (next !== null) {
    const childNode = safeGet(child2.node.children, next) || {
      children: {},
      childCount: 0
    };
    child2 = new Tree(next, child2, childNode);
    path = pathPopFront(path);
    next = pathGetFront(path);
  }
  return child2;
}
function treeGetValue(tree) {
  return tree.node.value;
}
function treeSetValue(tree, value) {
  tree.node.value = value;
  treeUpdateParents(tree);
}
function treeHasChildren(tree) {
  return tree.node.childCount > 0;
}
function treeIsEmpty(tree) {
  return treeGetValue(tree) === void 0 && !treeHasChildren(tree);
}
function treeForEachChild(tree, action) {
  each(tree.node.children, (child2, childTree) => {
    action(new Tree(child2, tree, childTree));
  });
}
function treeForEachDescendant(tree, action, includeSelf, childrenFirst) {
  if (includeSelf && !childrenFirst) {
    action(tree);
  }
  treeForEachChild(tree, (child2) => {
    treeForEachDescendant(child2, action, true, childrenFirst);
  });
  if (includeSelf && childrenFirst) {
    action(tree);
  }
}
function treeForEachAncestor(tree, action, includeSelf) {
  let node = includeSelf ? tree : tree.parent;
  while (node !== null) {
    if (action(node)) {
      return true;
    }
    node = node.parent;
  }
  return false;
}
function treeGetPath(tree) {
  return new Path(tree.parent === null ? tree.name : treeGetPath(tree.parent) + "/" + tree.name);
}
function treeUpdateParents(tree) {
  if (tree.parent !== null) {
    treeUpdateChild(tree.parent, tree.name, tree);
  }
}
function treeUpdateChild(tree, childName, child2) {
  const childEmpty = treeIsEmpty(child2);
  const childExists = contains(tree.node.children, childName);
  if (childEmpty && childExists) {
    delete tree.node.children[childName];
    tree.node.childCount--;
    treeUpdateParents(tree);
  } else if (!childEmpty && !childExists) {
    tree.node.children[childName] = child2.node;
    tree.node.childCount++;
    treeUpdateParents(tree);
  }
}
var INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
var INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
var MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
var isValidKey2 = function(key) {
  return typeof key === "string" && key.length !== 0 && !INVALID_KEY_REGEX_.test(key);
};
var isValidPathString = function(pathString) {
  return typeof pathString === "string" && pathString.length !== 0 && !INVALID_PATH_REGEX_.test(pathString);
};
var isValidRootPathString = function(pathString) {
  if (pathString) {
    pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
  }
  return isValidPathString(pathString);
};
var isValidPriority = function(priority) {
  return priority === null || typeof priority === "string" || typeof priority === "number" && !isInvalidJSONNumber(priority) || priority && typeof priority === "object" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contains(priority, ".sv");
};
var validateFirebaseData = function(errorPrefix2, data, path_) {
  const path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix2) : path_;
  if (data === void 0) {
    throw new Error(errorPrefix2 + "contains undefined " + validationPathToErrorString(path));
  }
  if (typeof data === "function") {
    throw new Error(errorPrefix2 + "contains a function " + validationPathToErrorString(path) + " with contents = " + data.toString());
  }
  if (isInvalidJSONNumber(data)) {
    throw new Error(errorPrefix2 + "contains " + data.toString() + " " + validationPathToErrorString(path));
  }
  if (typeof data === "string" && data.length > MAX_LEAF_SIZE_ / 3 && stringLength(data) > MAX_LEAF_SIZE_) {
    throw new Error(errorPrefix2 + "contains a string greater than " + MAX_LEAF_SIZE_ + " utf8 bytes " + validationPathToErrorString(path) + " ('" + data.substring(0, 50) + "...')");
  }
  if (data && typeof data === "object") {
    let hasDotValue = false;
    let hasActualChild = false;
    each(data, (key, value) => {
      if (key === ".value") {
        hasDotValue = true;
      } else if (key !== ".priority" && key !== ".sv") {
        hasActualChild = true;
        if (!isValidKey2(key)) {
          throw new Error(errorPrefix2 + " contains an invalid key (" + key + ") " + validationPathToErrorString(path) + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
        }
      }
      validationPathPush(path, key);
      validateFirebaseData(errorPrefix2, value, path);
      validationPathPop(path);
    });
    if (hasDotValue && hasActualChild) {
      throw new Error(errorPrefix2 + ' contains ".value" child ' + validationPathToErrorString(path) + " in addition to actual children.");
    }
  }
};
var validateFirebaseMergePaths = function(errorPrefix2, mergePaths) {
  let i, curPath;
  for (i = 0; i < mergePaths.length; i++) {
    curPath = mergePaths[i];
    const keys = pathSlice(curPath);
    for (let j = 0; j < keys.length; j++) {
      if (keys[j] === ".priority" && j === keys.length - 1)
        ;
      else if (!isValidKey2(keys[j])) {
        throw new Error(errorPrefix2 + "contains an invalid key (" + keys[j] + ") in path " + curPath.toString() + `. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
      }
    }
  }
  mergePaths.sort(pathCompare);
  let prevPath = null;
  for (i = 0; i < mergePaths.length; i++) {
    curPath = mergePaths[i];
    if (prevPath !== null && pathContains(prevPath, curPath)) {
      throw new Error(errorPrefix2 + "contains a path " + prevPath.toString() + " that is ancestor of another path " + curPath.toString());
    }
    prevPath = curPath;
  }
};
var validateFirebaseMergeDataArg = function(fnName, data, path, optional) {
  if (optional && data === void 0) {
    return;
  }
  const errorPrefix$1 = errorPrefix(fnName, "values");
  if (!(data && typeof data === "object") || Array.isArray(data)) {
    throw new Error(errorPrefix$1 + " must be an object containing the children to replace.");
  }
  const mergePaths = [];
  each(data, (key, value) => {
    const curPath = new Path(key);
    validateFirebaseData(errorPrefix$1, value, pathChild(path, curPath));
    if (pathGetBack(curPath) === ".priority") {
      if (!isValidPriority(value)) {
        throw new Error(errorPrefix$1 + "contains an invalid value for '" + curPath.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
      }
    }
    mergePaths.push(curPath);
  });
  validateFirebaseMergePaths(errorPrefix$1, mergePaths);
};
var validatePathString = function(fnName, argumentName, pathString, optional) {
  if (optional && pathString === void 0) {
    return;
  }
  if (!isValidPathString(pathString)) {
    throw new Error(errorPrefix(fnName, argumentName) + 'was an invalid path = "' + pathString + `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`);
  }
};
var validateRootPathString = function(fnName, argumentName, pathString, optional) {
  if (pathString) {
    pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
  }
  validatePathString(fnName, argumentName, pathString, optional);
};
var validateUrl = function(fnName, parsedUrl) {
  const pathString = parsedUrl.path.toString();
  if (!(typeof parsedUrl.repoInfo.host === "string") || parsedUrl.repoInfo.host.length === 0 || !isValidKey2(parsedUrl.repoInfo.namespace) && parsedUrl.repoInfo.host.split(":")[0] !== "localhost" || pathString.length !== 0 && !isValidRootPathString(pathString)) {
    throw new Error(errorPrefix(fnName, "url") + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`);
  }
};
var EventQueue = class {
  constructor() {
    this.eventLists_ = [];
    this.recursionDepth_ = 0;
  }
};
function eventQueueQueueEvents(eventQueue, eventDataList) {
  let currList = null;
  for (let i = 0; i < eventDataList.length; i++) {
    const data = eventDataList[i];
    const path = data.getPath();
    if (currList !== null && !pathEquals(path, currList.path)) {
      eventQueue.eventLists_.push(currList);
      currList = null;
    }
    if (currList === null) {
      currList = { events: [], path };
    }
    currList.events.push(data);
  }
  if (currList) {
    eventQueue.eventLists_.push(currList);
  }
}
function eventQueueRaiseEventsAtPath(eventQueue, path, eventDataList) {
  eventQueueQueueEvents(eventQueue, eventDataList);
  eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, (eventPath) => pathEquals(eventPath, path));
}
function eventQueueRaiseEventsForChangedPath(eventQueue, changedPath, eventDataList) {
  eventQueueQueueEvents(eventQueue, eventDataList);
  eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, (eventPath) => pathContains(eventPath, changedPath) || pathContains(changedPath, eventPath));
}
function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, predicate) {
  eventQueue.recursionDepth_++;
  let sentAll = true;
  for (let i = 0; i < eventQueue.eventLists_.length; i++) {
    const eventList = eventQueue.eventLists_[i];
    if (eventList) {
      const eventPath = eventList.path;
      if (predicate(eventPath)) {
        eventListRaise(eventQueue.eventLists_[i]);
        eventQueue.eventLists_[i] = null;
      } else {
        sentAll = false;
      }
    }
  }
  if (sentAll) {
    eventQueue.eventLists_ = [];
  }
  eventQueue.recursionDepth_--;
}
function eventListRaise(eventList) {
  for (let i = 0; i < eventList.events.length; i++) {
    const eventData = eventList.events[i];
    if (eventData !== null) {
      eventList.events[i] = null;
      const eventFn = eventData.getEventRunner();
      if (logger2) {
        log("event: " + eventData.toString());
      }
      exceptionGuard(eventFn);
    }
  }
}
var INTERRUPT_REASON = "repo_interrupt";
var MAX_TRANSACTION_RETRIES = 25;
var Repo = class {
  constructor(repoInfo_, forceRestClient_, authTokenProvider_, appCheckProvider_) {
    this.repoInfo_ = repoInfo_;
    this.forceRestClient_ = forceRestClient_;
    this.authTokenProvider_ = authTokenProvider_;
    this.appCheckProvider_ = appCheckProvider_;
    this.dataUpdateCount = 0;
    this.statsListener_ = null;
    this.eventQueue_ = new EventQueue();
    this.nextWriteId_ = 1;
    this.interceptServerDataCallback_ = null;
    this.onDisconnect_ = newSparseSnapshotTree();
    this.transactionQueueTree_ = new Tree();
    this.persistentConnection_ = null;
    this.key = this.repoInfo_.toURLString();
  }
  /**
   * @returns The URL corresponding to the root of this Firebase.
   */
  toString() {
    return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
  }
};
function repoStart(repo, appId, authOverride) {
  repo.stats_ = statsManagerGetCollection(repo.repoInfo_);
  if (repo.forceRestClient_ || beingCrawled()) {
    repo.server_ = new ReadonlyRestClient(repo.repoInfo_, (pathString, data, isMerge, tag) => {
      repoOnDataUpdate(repo, pathString, data, isMerge, tag);
    }, repo.authTokenProvider_, repo.appCheckProvider_);
    setTimeout(() => repoOnConnectStatus(
      repo,
      /* connectStatus= */
      true
    ), 0);
  } else {
    if (typeof authOverride !== "undefined" && authOverride !== null) {
      if (typeof authOverride !== "object") {
        throw new Error("Only objects are supported for option databaseAuthVariableOverride");
      }
      try {
        stringify(authOverride);
      } catch (e) {
        throw new Error("Invalid authOverride provided: " + e);
      }
    }
    repo.persistentConnection_ = new PersistentConnection(repo.repoInfo_, appId, (pathString, data, isMerge, tag) => {
      repoOnDataUpdate(repo, pathString, data, isMerge, tag);
    }, (connectStatus) => {
      repoOnConnectStatus(repo, connectStatus);
    }, (updates) => {
      repoOnServerInfoUpdate(repo, updates);
    }, repo.authTokenProvider_, repo.appCheckProvider_, authOverride);
    repo.server_ = repo.persistentConnection_;
  }
  repo.authTokenProvider_.addTokenChangeListener((token) => {
    repo.server_.refreshAuthToken(token);
  });
  repo.appCheckProvider_.addTokenChangeListener((result) => {
    repo.server_.refreshAppCheckToken(result.token);
  });
  repo.statsReporter_ = statsManagerGetOrCreateReporter(repo.repoInfo_, () => new StatsReporter(repo.stats_, repo.server_));
  repo.infoData_ = new SnapshotHolder();
  repo.infoSyncTree_ = new SyncTree({
    startListening: (query, tag, currentHashFn, onComplete) => {
      let infoEvents = [];
      const node = repo.infoData_.getNode(query._path);
      if (!node.isEmpty()) {
        infoEvents = syncTreeApplyServerOverwrite(repo.infoSyncTree_, query._path, node);
        setTimeout(() => {
          onComplete("ok");
        }, 0);
      }
      return infoEvents;
    },
    stopListening: () => {
    }
  });
  repoUpdateInfo(repo, "connected", false);
  repo.serverSyncTree_ = new SyncTree({
    startListening: (query, tag, currentHashFn, onComplete) => {
      repo.server_.listen(query, currentHashFn, tag, (status, data) => {
        const events = onComplete(status, data);
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
      });
      return [];
    },
    stopListening: (query, tag) => {
      repo.server_.unlisten(query, tag);
    }
  });
}
function repoServerTime(repo) {
  const offsetNode = repo.infoData_.getNode(new Path(".info/serverTimeOffset"));
  const offset = offsetNode.val() || 0;
  return (/* @__PURE__ */ new Date()).getTime() + offset;
}
function repoGenerateServerValues(repo) {
  return generateWithValues({
    timestamp: repoServerTime(repo)
  });
}
function repoOnDataUpdate(repo, pathString, data, isMerge, tag) {
  repo.dataUpdateCount++;
  const path = new Path(pathString);
  data = repo.interceptServerDataCallback_ ? repo.interceptServerDataCallback_(pathString, data) : data;
  let events = [];
  if (tag) {
    if (isMerge) {
      const taggedChildren = map(data, (raw) => nodeFromJSON(raw));
      events = syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_, path, taggedChildren, tag);
    } else {
      const taggedSnap = nodeFromJSON(data);
      events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, path, taggedSnap, tag);
    }
  } else if (isMerge) {
    const changedChildren = map(data, (raw) => nodeFromJSON(raw));
    events = syncTreeApplyServerMerge(repo.serverSyncTree_, path, changedChildren);
  } else {
    const snap = nodeFromJSON(data);
    events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap);
  }
  let affectedPath = path;
  if (events.length > 0) {
    affectedPath = repoRerunTransactions(repo, path);
  }
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, events);
}
function repoOnConnectStatus(repo, connectStatus) {
  repoUpdateInfo(repo, "connected", connectStatus);
  if (connectStatus === false) {
    repoRunOnDisconnectEvents(repo);
  }
}
function repoOnServerInfoUpdate(repo, updates) {
  each(updates, (key, value) => {
    repoUpdateInfo(repo, key, value);
  });
}
function repoUpdateInfo(repo, pathString, value) {
  const path = new Path("/.info/" + pathString);
  const newNode = nodeFromJSON(value);
  repo.infoData_.updateSnapshot(path, newNode);
  const events = syncTreeApplyServerOverwrite(repo.infoSyncTree_, path, newNode);
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
}
function repoGetNextWriteId(repo) {
  return repo.nextWriteId_++;
}
function repoUpdate(repo, path, childrenToMerge, onComplete) {
  repoLog(repo, "update", { path: path.toString(), value: childrenToMerge });
  let empty = true;
  const serverValues = repoGenerateServerValues(repo);
  const changedChildren = {};
  each(childrenToMerge, (changedKey, changedValue) => {
    empty = false;
    changedChildren[changedKey] = resolveDeferredValueTree(pathChild(path, changedKey), nodeFromJSON(changedValue), repo.serverSyncTree_, serverValues);
  });
  if (!empty) {
    const writeId = repoGetNextWriteId(repo);
    const events = syncTreeApplyUserMerge(repo.serverSyncTree_, path, changedChildren, writeId);
    eventQueueQueueEvents(repo.eventQueue_, events);
    repo.server_.merge(path.toString(), childrenToMerge, (status, errorReason) => {
      const success = status === "ok";
      if (!success) {
        warn("update at " + path + " failed: " + status);
      }
      const clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
      const affectedPath = clearEvents.length > 0 ? repoRerunTransactions(repo, path) : path;
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, clearEvents);
      repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
    each(childrenToMerge, (changedPath) => {
      const affectedPath = repoAbortTransactions(repo, pathChild(path, changedPath));
      repoRerunTransactions(repo, affectedPath);
    });
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, []);
  } else {
    log("update() called with empty data.  Don't do anything.");
    repoCallOnCompleteCallback(repo, onComplete, "ok", void 0);
  }
}
function repoRunOnDisconnectEvents(repo) {
  repoLog(repo, "onDisconnectEvents");
  const serverValues = repoGenerateServerValues(repo);
  const resolvedOnDisconnectTree = newSparseSnapshotTree();
  sparseSnapshotTreeForEachTree(repo.onDisconnect_, newEmptyPath(), (path, node) => {
    const resolved = resolveDeferredValueTree(path, node, repo.serverSyncTree_, serverValues);
    sparseSnapshotTreeRemember(resolvedOnDisconnectTree, path, resolved);
  });
  let events = [];
  sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree, newEmptyPath(), (path, snap) => {
    events = events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap));
    const affectedPath = repoAbortTransactions(repo, path);
    repoRerunTransactions(repo, affectedPath);
  });
  repo.onDisconnect_ = newSparseSnapshotTree();
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, newEmptyPath(), events);
}
function repoAddEventCallbackForQuery(repo, query, eventRegistration) {
  let events;
  if (pathGetFront(query._path) === ".info") {
    events = syncTreeAddEventRegistration(repo.infoSyncTree_, query, eventRegistration);
  } else {
    events = syncTreeAddEventRegistration(repo.serverSyncTree_, query, eventRegistration);
  }
  eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
}
function repoRemoveEventCallbackForQuery(repo, query, eventRegistration) {
  let events;
  if (pathGetFront(query._path) === ".info") {
    events = syncTreeRemoveEventRegistration(repo.infoSyncTree_, query, eventRegistration);
  } else {
    events = syncTreeRemoveEventRegistration(repo.serverSyncTree_, query, eventRegistration);
  }
  eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
}
function repoInterrupt(repo) {
  if (repo.persistentConnection_) {
    repo.persistentConnection_.interrupt(INTERRUPT_REASON);
  }
}
function repoLog(repo, ...varArgs) {
  let prefix = "";
  if (repo.persistentConnection_) {
    prefix = repo.persistentConnection_.id + ":";
  }
  log(prefix, ...varArgs);
}
function repoCallOnCompleteCallback(repo, callback, status, errorReason) {
  if (callback) {
    exceptionGuard(() => {
      if (status === "ok") {
        callback(null);
      } else {
        const code = (status || "error").toUpperCase();
        let message = code;
        if (errorReason) {
          message += ": " + errorReason;
        }
        const error2 = new Error(message);
        error2.code = code;
        callback(error2);
      }
    });
  }
}
function repoGetLatestState(repo, path, excludeSets) {
  return syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path, excludeSets) || ChildrenNode.EMPTY_NODE;
}
function repoSendReadyTransactions(repo, node = repo.transactionQueueTree_) {
  if (!node) {
    repoPruneCompletedTransactionsBelowNode(repo, node);
  }
  if (treeGetValue(node)) {
    const queue = repoBuildTransactionQueue(repo, node);
    assert(queue.length > 0, "Sending zero length transaction queue");
    const allRun = queue.every(
      (transaction) => transaction.status === 0
      /* TransactionStatus.RUN */
    );
    if (allRun) {
      repoSendTransactionQueue(repo, treeGetPath(node), queue);
    }
  } else if (treeHasChildren(node)) {
    treeForEachChild(node, (childNode) => {
      repoSendReadyTransactions(repo, childNode);
    });
  }
}
function repoSendTransactionQueue(repo, path, queue) {
  const setsToIgnore = queue.map((txn) => {
    return txn.currentWriteId;
  });
  const latestState = repoGetLatestState(repo, path, setsToIgnore);
  let snapToSend = latestState;
  const latestHash = latestState.hash();
  for (let i = 0; i < queue.length; i++) {
    const txn = queue[i];
    assert(txn.status === 0, "tryToSendTransactionQueue_: items in queue should all be run.");
    txn.status = 1;
    txn.retryCount++;
    const relativePath = newRelativePath(path, txn.path);
    snapToSend = snapToSend.updateChild(relativePath, txn.currentOutputSnapshotRaw);
  }
  const dataToSend = snapToSend.val(true);
  const pathToSend = path;
  repo.server_.put(pathToSend.toString(), dataToSend, (status) => {
    repoLog(repo, "transaction put response", {
      path: pathToSend.toString(),
      status
    });
    let events = [];
    if (status === "ok") {
      const callbacks = [];
      for (let i = 0; i < queue.length; i++) {
        queue[i].status = 2;
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId));
        if (queue[i].onComplete) {
          callbacks.push(() => queue[i].onComplete(null, true, queue[i].currentOutputSnapshotResolved));
        }
        queue[i].unwatcher();
      }
      repoPruneCompletedTransactionsBelowNode(repo, treeSubTree(repo.transactionQueueTree_, path));
      repoSendReadyTransactions(repo, repo.transactionQueueTree_);
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
      for (let i = 0; i < callbacks.length; i++) {
        exceptionGuard(callbacks[i]);
      }
    } else {
      if (status === "datastale") {
        for (let i = 0; i < queue.length; i++) {
          if (queue[i].status === 3) {
            queue[i].status = 4;
          } else {
            queue[i].status = 0;
          }
        }
      } else {
        warn("transaction at " + pathToSend.toString() + " failed: " + status);
        for (let i = 0; i < queue.length; i++) {
          queue[i].status = 4;
          queue[i].abortReason = status;
        }
      }
      repoRerunTransactions(repo, path);
    }
  }, latestHash);
}
function repoRerunTransactions(repo, changedPath) {
  const rootMostTransactionNode = repoGetAncestorTransactionNode(repo, changedPath);
  const path = treeGetPath(rootMostTransactionNode);
  const queue = repoBuildTransactionQueue(repo, rootMostTransactionNode);
  repoRerunTransactionQueue(repo, queue, path);
  return path;
}
function repoRerunTransactionQueue(repo, queue, path) {
  if (queue.length === 0) {
    return;
  }
  const callbacks = [];
  let events = [];
  const txnsToRerun = queue.filter((q) => {
    return q.status === 0;
  });
  const setsToIgnore = txnsToRerun.map((q) => {
    return q.currentWriteId;
  });
  for (let i = 0; i < queue.length; i++) {
    const transaction = queue[i];
    const relativePath = newRelativePath(path, transaction.path);
    let abortTransaction = false, abortReason;
    assert(relativePath !== null, "rerunTransactionsUnderNode_: relativePath should not be null.");
    if (transaction.status === 4) {
      abortTransaction = true;
      abortReason = transaction.abortReason;
      events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
    } else if (transaction.status === 0) {
      if (transaction.retryCount >= MAX_TRANSACTION_RETRIES) {
        abortTransaction = true;
        abortReason = "maxretry";
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
      } else {
        const currentNode = repoGetLatestState(repo, transaction.path, setsToIgnore);
        transaction.currentInputSnapshot = currentNode;
        const newData = queue[i].update(currentNode.val());
        if (newData !== void 0) {
          validateFirebaseData("transaction failed: Data returned ", newData, transaction.path);
          let newDataNode = nodeFromJSON(newData);
          const hasExplicitPriority = typeof newData === "object" && newData != null && contains(newData, ".priority");
          if (!hasExplicitPriority) {
            newDataNode = newDataNode.updatePriority(currentNode.getPriority());
          }
          const oldWriteId = transaction.currentWriteId;
          const serverValues = repoGenerateServerValues(repo);
          const newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
          transaction.currentOutputSnapshotRaw = newDataNode;
          transaction.currentOutputSnapshotResolved = newNodeResolved;
          transaction.currentWriteId = repoGetNextWriteId(repo);
          setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
          events = events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_, transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, oldWriteId, true));
        } else {
          abortTransaction = true;
          abortReason = "nodata";
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
        }
      }
    }
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
    events = [];
    if (abortTransaction) {
      queue[i].status = 2;
      (function(unwatcher) {
        setTimeout(unwatcher, Math.floor(0));
      })(queue[i].unwatcher);
      if (queue[i].onComplete) {
        if (abortReason === "nodata") {
          callbacks.push(() => queue[i].onComplete(null, false, queue[i].currentInputSnapshot));
        } else {
          callbacks.push(() => queue[i].onComplete(new Error(abortReason), false, null));
        }
      }
    }
  }
  repoPruneCompletedTransactionsBelowNode(repo, repo.transactionQueueTree_);
  for (let i = 0; i < callbacks.length; i++) {
    exceptionGuard(callbacks[i]);
  }
  repoSendReadyTransactions(repo, repo.transactionQueueTree_);
}
function repoGetAncestorTransactionNode(repo, path) {
  let front;
  let transactionNode = repo.transactionQueueTree_;
  front = pathGetFront(path);
  while (front !== null && treeGetValue(transactionNode) === void 0) {
    transactionNode = treeSubTree(transactionNode, front);
    path = pathPopFront(path);
    front = pathGetFront(path);
  }
  return transactionNode;
}
function repoBuildTransactionQueue(repo, transactionNode) {
  const transactionQueue = [];
  repoAggregateTransactionQueuesForNode(repo, transactionNode, transactionQueue);
  transactionQueue.sort((a, b) => a.order - b.order);
  return transactionQueue;
}
function repoAggregateTransactionQueuesForNode(repo, node, queue) {
  const nodeQueue = treeGetValue(node);
  if (nodeQueue) {
    for (let i = 0; i < nodeQueue.length; i++) {
      queue.push(nodeQueue[i]);
    }
  }
  treeForEachChild(node, (child2) => {
    repoAggregateTransactionQueuesForNode(repo, child2, queue);
  });
}
function repoPruneCompletedTransactionsBelowNode(repo, node) {
  const queue = treeGetValue(node);
  if (queue) {
    let to = 0;
    for (let from = 0; from < queue.length; from++) {
      if (queue[from].status !== 2) {
        queue[to] = queue[from];
        to++;
      }
    }
    queue.length = to;
    treeSetValue(node, queue.length > 0 ? queue : void 0);
  }
  treeForEachChild(node, (childNode) => {
    repoPruneCompletedTransactionsBelowNode(repo, childNode);
  });
}
function repoAbortTransactions(repo, path) {
  const affectedPath = treeGetPath(repoGetAncestorTransactionNode(repo, path));
  const transactionNode = treeSubTree(repo.transactionQueueTree_, path);
  treeForEachAncestor(transactionNode, (node) => {
    repoAbortTransactionsOnNode(repo, node);
  });
  repoAbortTransactionsOnNode(repo, transactionNode);
  treeForEachDescendant(transactionNode, (node) => {
    repoAbortTransactionsOnNode(repo, node);
  });
  return affectedPath;
}
function repoAbortTransactionsOnNode(repo, node) {
  const queue = treeGetValue(node);
  if (queue) {
    const callbacks = [];
    let events = [];
    let lastSent = -1;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].status === 3)
        ;
      else if (queue[i].status === 1) {
        assert(lastSent === i - 1, "All SENT items should be at beginning of queue.");
        lastSent = i;
        queue[i].status = 3;
        queue[i].abortReason = "set";
      } else {
        assert(queue[i].status === 0, "Unexpected transaction status in abort");
        queue[i].unwatcher();
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId, true));
        if (queue[i].onComplete) {
          callbacks.push(queue[i].onComplete.bind(null, new Error("set"), false, null));
        }
      }
    }
    if (lastSent === -1) {
      treeSetValue(node, void 0);
    } else {
      queue.length = lastSent + 1;
    }
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, treeGetPath(node), events);
    for (let i = 0; i < callbacks.length; i++) {
      exceptionGuard(callbacks[i]);
    }
  }
}
function decodePath(pathString) {
  let pathStringDecoded = "";
  const pieces = pathString.split("/");
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].length > 0) {
      let piece = pieces[i];
      try {
        piece = decodeURIComponent(piece.replace(/\+/g, " "));
      } catch (e) {
      }
      pathStringDecoded += "/" + piece;
    }
  }
  return pathStringDecoded;
}
function decodeQuery(queryString) {
  const results = {};
  if (queryString.charAt(0) === "?") {
    queryString = queryString.substring(1);
  }
  for (const segment of queryString.split("&")) {
    if (segment.length === 0) {
      continue;
    }
    const kv = segment.split("=");
    if (kv.length === 2) {
      results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
    } else {
      warn(`Invalid query segment '${segment}' in query '${queryString}'`);
    }
  }
  return results;
}
var parseRepoInfo = function(dataURL, nodeAdmin) {
  const parsedUrl = parseDatabaseURL(dataURL), namespace = parsedUrl.namespace;
  if (parsedUrl.domain === "firebase.com") {
    fatal(parsedUrl.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
  }
  if ((!namespace || namespace === "undefined") && parsedUrl.domain !== "localhost") {
    fatal("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
  }
  if (!parsedUrl.secure) {
    warnIfPageIsSecure();
  }
  const webSocketOnly = parsedUrl.scheme === "ws" || parsedUrl.scheme === "wss";
  return {
    repoInfo: new RepoInfo(
      parsedUrl.host,
      parsedUrl.secure,
      namespace,
      webSocketOnly,
      nodeAdmin,
      /*persistenceKey=*/
      "",
      /*includeNamespaceInQueryParams=*/
      namespace !== parsedUrl.subdomain
    ),
    path: new Path(parsedUrl.pathString)
  };
};
var parseDatabaseURL = function(dataURL) {
  let host = "", domain = "", subdomain = "", pathString = "", namespace = "";
  let secure = true, scheme = "https", port = 443;
  if (typeof dataURL === "string") {
    let colonInd = dataURL.indexOf("//");
    if (colonInd >= 0) {
      scheme = dataURL.substring(0, colonInd - 1);
      dataURL = dataURL.substring(colonInd + 2);
    }
    let slashInd = dataURL.indexOf("/");
    if (slashInd === -1) {
      slashInd = dataURL.length;
    }
    let questionMarkInd = dataURL.indexOf("?");
    if (questionMarkInd === -1) {
      questionMarkInd = dataURL.length;
    }
    host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
    if (slashInd < questionMarkInd) {
      pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
    }
    const queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
    colonInd = host.indexOf(":");
    if (colonInd >= 0) {
      secure = scheme === "https" || scheme === "wss";
      port = parseInt(host.substring(colonInd + 1), 10);
    } else {
      colonInd = host.length;
    }
    const hostWithoutPort = host.slice(0, colonInd);
    if (hostWithoutPort.toLowerCase() === "localhost") {
      domain = "localhost";
    } else if (hostWithoutPort.split(".").length <= 2) {
      domain = hostWithoutPort;
    } else {
      const dotInd = host.indexOf(".");
      subdomain = host.substring(0, dotInd).toLowerCase();
      domain = host.substring(dotInd + 1);
      namespace = subdomain;
    }
    if ("ns" in queryParams) {
      namespace = queryParams["ns"];
    }
  }
  return {
    host,
    port,
    domain,
    subdomain,
    secure,
    scheme,
    pathString,
    namespace
  };
};
var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
var nextPushId = function() {
  let lastPushTime = 0;
  const lastRandChars = [];
  return function(now) {
    const duplicateTime = now === lastPushTime;
    lastPushTime = now;
    let i;
    const timeStampChars = new Array(8);
    for (i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    assert(now === 0, "Cannot push at time == 0");
    let id = timeStampChars.join("");
    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    assert(id.length === 20, "nextPushId: Length should be 20.");
    return id;
  };
}();
var DataEvent = class {
  /**
   * @param eventType - One of: value, child_added, child_changed, child_moved, child_removed
   * @param eventRegistration - The function to call to with the event data. User provided
   * @param snapshot - The data backing the event
   * @param prevName - Optional, the name of the previous child for child_* events.
   */
  constructor(eventType, eventRegistration, snapshot, prevName) {
    this.eventType = eventType;
    this.eventRegistration = eventRegistration;
    this.snapshot = snapshot;
    this.prevName = prevName;
  }
  getPath() {
    const ref2 = this.snapshot.ref;
    if (this.eventType === "value") {
      return ref2._path;
    } else {
      return ref2.parent._path;
    }
  }
  getEventType() {
    return this.eventType;
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this);
  }
  toString() {
    return this.getPath().toString() + ":" + this.eventType + ":" + stringify(this.snapshot.exportVal());
  }
};
var CancelEvent = class {
  constructor(eventRegistration, error2, path) {
    this.eventRegistration = eventRegistration;
    this.error = error2;
    this.path = path;
  }
  getPath() {
    return this.path;
  }
  getEventType() {
    return "cancel";
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this);
  }
  toString() {
    return this.path.toString() + ":cancel";
  }
};
var CallbackContext = class {
  constructor(snapshotCallback, cancelCallback) {
    this.snapshotCallback = snapshotCallback;
    this.cancelCallback = cancelCallback;
  }
  onValue(expDataSnapshot, previousChildName) {
    this.snapshotCallback.call(null, expDataSnapshot, previousChildName);
  }
  onCancel(error2) {
    assert(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback");
    return this.cancelCallback.call(null, error2);
  }
  get hasCancelCallback() {
    return !!this.cancelCallback;
  }
  matches(other) {
    return this.snapshotCallback === other.snapshotCallback || this.snapshotCallback.userCallback !== void 0 && this.snapshotCallback.userCallback === other.snapshotCallback.userCallback && this.snapshotCallback.context === other.snapshotCallback.context;
  }
};
var QueryImpl = class {
  /**
   * @hideconstructor
   */
  constructor(_repo, _path, _queryParams, _orderByCalled) {
    this._repo = _repo;
    this._path = _path;
    this._queryParams = _queryParams;
    this._orderByCalled = _orderByCalled;
  }
  get key() {
    if (pathIsEmpty(this._path)) {
      return null;
    } else {
      return pathGetBack(this._path);
    }
  }
  get ref() {
    return new ReferenceImpl(this._repo, this._path);
  }
  get _queryIdentifier() {
    const obj = queryParamsGetQueryObject(this._queryParams);
    const id = ObjectToUniqueKey(obj);
    return id === "{}" ? "default" : id;
  }
  /**
   * An object representation of the query parameters used by this Query.
   */
  get _queryObject() {
    return queryParamsGetQueryObject(this._queryParams);
  }
  isEqual(other) {
    other = getModularInstance(other);
    if (!(other instanceof QueryImpl)) {
      return false;
    }
    const sameRepo = this._repo === other._repo;
    const samePath = pathEquals(this._path, other._path);
    const sameQueryIdentifier = this._queryIdentifier === other._queryIdentifier;
    return sameRepo && samePath && sameQueryIdentifier;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return this._repo.toString() + pathToUrlEncodedString(this._path);
  }
};
var ReferenceImpl = class extends QueryImpl {
  /** @hideconstructor */
  constructor(repo, path) {
    super(repo, path, new QueryParams(), false);
  }
  get parent() {
    const parentPath = pathParent(this._path);
    return parentPath === null ? null : new ReferenceImpl(this._repo, parentPath);
  }
  get root() {
    let ref2 = this;
    while (ref2.parent !== null) {
      ref2 = ref2.parent;
    }
    return ref2;
  }
};
var DataSnapshot = class {
  /**
   * @param _node - A SnapshotNode to wrap.
   * @param ref - The location this snapshot came from.
   * @param _index - The iteration order for this snapshot
   * @hideconstructor
   */
  constructor(_node, ref2, _index) {
    this._node = _node;
    this.ref = ref2;
    this._index = _index;
  }
  /**
   * Gets the priority value of the data in this `DataSnapshot`.
   *
   * Applications need not use priority but can order collections by
   * ordinary properties (see
   * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data |Sorting and filtering data}
   * ).
   */
  get priority() {
    return this._node.getPriority().val();
  }
  /**
   * The key (last part of the path) of the location of this `DataSnapshot`.
   *
   * The last token in a Database location is considered its key. For example,
   * "ada" is the key for the /users/ada/ node. Accessing the key on any
   * `DataSnapshot` will return the key for the location that generated it.
   * However, accessing the key on the root URL of a Database will return
   * `null`.
   */
  get key() {
    return this.ref.key;
  }
  /** Returns the number of child properties of this `DataSnapshot`. */
  get size() {
    return this._node.numChildren();
  }
  /**
   * Gets another `DataSnapshot` for the location at the specified relative path.
   *
   * Passing a relative path to the `child()` method of a DataSnapshot returns
   * another `DataSnapshot` for the location at the specified relative path. The
   * relative path can either be a simple child name (for example, "ada") or a
   * deeper, slash-separated path (for example, "ada/name/first"). If the child
   * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
   * whose value is `null`) is returned.
   *
   * @param path - A relative path to the location of child data.
   */
  child(path) {
    const childPath = new Path(path);
    const childRef = child(this.ref, path);
    return new DataSnapshot(this._node.getChild(childPath), childRef, PRIORITY_INDEX);
  }
  /**
   * Returns true if this `DataSnapshot` contains any data. It is slightly more
   * efficient than using `snapshot.val() !== null`.
   */
  exists() {
    return !this._node.isEmpty();
  }
  /**
   * Exports the entire contents of the DataSnapshot as a JavaScript object.
   *
   * The `exportVal()` method is similar to `val()`, except priority information
   * is included (if available), making it suitable for backing up your data.
   *
   * @returns The DataSnapshot's contents as a JavaScript value (Object,
   *   Array, string, number, boolean, or `null`).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportVal() {
    return this._node.val(true);
  }
  /**
   * Enumerates the top-level children in the `IteratedDataSnapshot`.
   *
   * Because of the way JavaScript objects work, the ordering of data in the
   * JavaScript object returned by `val()` is not guaranteed to match the
   * ordering on the server nor the ordering of `onChildAdded()` events. That is
   * where `forEach()` comes in handy. It guarantees the children of a
   * `DataSnapshot` will be iterated in their query order.
   *
   * If no explicit `orderBy*()` method is used, results are returned
   * ordered by key (unless priorities are used, in which case, results are
   * returned by priority).
   *
   * @param action - A function that will be called for each child DataSnapshot.
   * The callback can return true to cancel further enumeration.
   * @returns true if enumeration was canceled due to your callback returning
   * true.
   */
  forEach(action) {
    if (this._node.isLeafNode()) {
      return false;
    }
    const childrenNode = this._node;
    return !!childrenNode.forEachChild(this._index, (key, node) => {
      return action(new DataSnapshot(node, child(this.ref, key), PRIORITY_INDEX));
    });
  }
  /**
   * Returns true if the specified child path has (non-null) data.
   *
   * @param path - A relative path to the location of a potential child.
   * @returns `true` if data exists at the specified child path; else
   *  `false`.
   */
  hasChild(path) {
    const childPath = new Path(path);
    return !this._node.getChild(childPath).isEmpty();
  }
  /**
   * Returns whether or not the `DataSnapshot` has any non-`null` child
   * properties.
   *
   * You can use `hasChildren()` to determine if a `DataSnapshot` has any
   * children. If it does, you can enumerate them using `forEach()`. If it
   * doesn't, then either this snapshot contains a primitive value (which can be
   * retrieved with `val()`) or it is empty (in which case, `val()` will return
   * `null`).
   *
   * @returns true if this snapshot has any children; else false.
   */
  hasChildren() {
    if (this._node.isLeafNode()) {
      return false;
    } else {
      return !this._node.isEmpty();
    }
  }
  /**
   * Returns a JSON-serializable representation of this object.
   */
  toJSON() {
    return this.exportVal();
  }
  /**
   * Extracts a JavaScript value from a `DataSnapshot`.
   *
   * Depending on the data in a `DataSnapshot`, the `val()` method may return a
   * scalar type (string, number, or boolean), an array, or an object. It may
   * also return null, indicating that the `DataSnapshot` is empty (contains no
   * data).
   *
   * @returns The DataSnapshot's contents as a JavaScript value (Object,
   *   Array, string, number, boolean, or `null`).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  val() {
    return this._node.val();
  }
};
function ref(db2, path) {
  db2 = getModularInstance(db2);
  db2._checkNotDeleted("ref");
  return path !== void 0 ? child(db2._root, path) : db2._root;
}
function child(parent, path) {
  parent = getModularInstance(parent);
  if (pathGetFront(parent._path) === null) {
    validateRootPathString("child", "path", path, false);
  } else {
    validatePathString("child", "path", path, false);
  }
  return new ReferenceImpl(parent._repo, pathChild(parent._path, path));
}
function update(ref2, values) {
  validateFirebaseMergeDataArg("update", values, ref2._path, false);
  const deferred = new Deferred();
  repoUpdate(ref2._repo, ref2._path, values, deferred.wrapCallback(() => {
  }));
  return deferred.promise;
}
var ValueEventRegistration = class {
  constructor(callbackContext) {
    this.callbackContext = callbackContext;
  }
  respondsTo(eventType) {
    return eventType === "value";
  }
  createEvent(change, query) {
    const index = query._queryParams.getIndex();
    return new DataEvent("value", this, new DataSnapshot(change.snapshotNode, new ReferenceImpl(query._repo, query._path), index));
  }
  getEventRunner(eventData) {
    if (eventData.getEventType() === "cancel") {
      return () => this.callbackContext.onCancel(eventData.error);
    } else {
      return () => this.callbackContext.onValue(eventData.snapshot, null);
    }
  }
  createCancelEvent(error2, path) {
    if (this.callbackContext.hasCancelCallback) {
      return new CancelEvent(this, error2, path);
    } else {
      return null;
    }
  }
  matches(other) {
    if (!(other instanceof ValueEventRegistration)) {
      return false;
    } else if (!other.callbackContext || !this.callbackContext) {
      return true;
    } else {
      return other.callbackContext.matches(this.callbackContext);
    }
  }
  hasAnyCallback() {
    return this.callbackContext !== null;
  }
};
var ChildEventRegistration = class {
  constructor(eventType, callbackContext) {
    this.eventType = eventType;
    this.callbackContext = callbackContext;
  }
  respondsTo(eventType) {
    let eventToCheck = eventType === "children_added" ? "child_added" : eventType;
    eventToCheck = eventToCheck === "children_removed" ? "child_removed" : eventToCheck;
    return this.eventType === eventToCheck;
  }
  createCancelEvent(error2, path) {
    if (this.callbackContext.hasCancelCallback) {
      return new CancelEvent(this, error2, path);
    } else {
      return null;
    }
  }
  createEvent(change, query) {
    assert(change.childName != null, "Child events should have a childName.");
    const childRef = child(new ReferenceImpl(query._repo, query._path), change.childName);
    const index = query._queryParams.getIndex();
    return new DataEvent(change.type, this, new DataSnapshot(change.snapshotNode, childRef, index), change.prevName);
  }
  getEventRunner(eventData) {
    if (eventData.getEventType() === "cancel") {
      return () => this.callbackContext.onCancel(eventData.error);
    } else {
      return () => this.callbackContext.onValue(eventData.snapshot, eventData.prevName);
    }
  }
  matches(other) {
    if (other instanceof ChildEventRegistration) {
      return this.eventType === other.eventType && (!this.callbackContext || !other.callbackContext || this.callbackContext.matches(other.callbackContext));
    }
    return false;
  }
  hasAnyCallback() {
    return !!this.callbackContext;
  }
};
function addEventListener(query, eventType, callback, cancelCallbackOrListenOptions, options) {
  let cancelCallback;
  if (typeof cancelCallbackOrListenOptions === "object") {
    cancelCallback = void 0;
    options = cancelCallbackOrListenOptions;
  }
  if (typeof cancelCallbackOrListenOptions === "function") {
    cancelCallback = cancelCallbackOrListenOptions;
  }
  if (options && options.onlyOnce) {
    const userCallback = callback;
    const onceCallback = (dataSnapshot, previousChildName) => {
      repoRemoveEventCallbackForQuery(query._repo, query, container);
      userCallback(dataSnapshot, previousChildName);
    };
    onceCallback.userCallback = callback.userCallback;
    onceCallback.context = callback.context;
    callback = onceCallback;
  }
  const callbackContext = new CallbackContext(callback, cancelCallback || void 0);
  const container = eventType === "value" ? new ValueEventRegistration(callbackContext) : new ChildEventRegistration(eventType, callbackContext);
  repoAddEventCallbackForQuery(query._repo, query, container);
  return () => repoRemoveEventCallbackForQuery(query._repo, query, container);
}
function onValue(query, callback, cancelCallbackOrListenOptions, options) {
  return addEventListener(query, "value", callback, cancelCallbackOrListenOptions, options);
}
syncPointSetReferenceConstructor(ReferenceImpl);
syncTreeSetReferenceConstructor(ReferenceImpl);
var FIREBASE_DATABASE_EMULATOR_HOST_VAR = "FIREBASE_DATABASE_EMULATOR_HOST";
var repos = {};
var useRestClient = false;
function repoManagerApplyEmulatorSettings(repo, host, port, tokenProvider) {
  repo.repoInfo_ = new RepoInfo(
    `${host}:${port}`,
    /* secure= */
    false,
    repo.repoInfo_.namespace,
    repo.repoInfo_.webSocketOnly,
    repo.repoInfo_.nodeAdmin,
    repo.repoInfo_.persistenceKey,
    repo.repoInfo_.includeNamespaceInQueryParams,
    /*isUsingEmulator=*/
    true
  );
  if (tokenProvider) {
    repo.authTokenProvider_ = tokenProvider;
  }
}
function repoManagerDatabaseFromApp(app2, authProvider, appCheckProvider, url, nodeAdmin) {
  let dbUrl = url || app2.options.databaseURL;
  if (dbUrl === void 0) {
    if (!app2.options.projectId) {
      fatal("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().");
    }
    log("Using default host for project ", app2.options.projectId);
    dbUrl = `${app2.options.projectId}-default-rtdb.firebaseio.com`;
  }
  let parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
  let repoInfo = parsedUrl.repoInfo;
  let isEmulator;
  let dbEmulatorHost = void 0;
  if (typeof process !== "undefined" && process.env) {
    dbEmulatorHost = process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
  }
  if (dbEmulatorHost) {
    isEmulator = true;
    dbUrl = `http://${dbEmulatorHost}?ns=${repoInfo.namespace}`;
    parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
    repoInfo = parsedUrl.repoInfo;
  } else {
    isEmulator = !parsedUrl.repoInfo.secure;
  }
  const authTokenProvider = nodeAdmin && isEmulator ? new EmulatorTokenProvider(EmulatorTokenProvider.OWNER) : new FirebaseAuthTokenProvider(app2.name, app2.options, authProvider);
  validateUrl("Invalid Firebase Database URL", parsedUrl);
  if (!pathIsEmpty(parsedUrl.path)) {
    fatal("Database URL must point to the root of a Firebase Database (not including a child path).");
  }
  const repo = repoManagerCreateRepo(repoInfo, app2, authTokenProvider, new AppCheckTokenProvider(app2.name, appCheckProvider));
  return new Database(repo, app2);
}
function repoManagerDeleteRepo(repo, appName) {
  const appRepos = repos[appName];
  if (!appRepos || appRepos[repo.key] !== repo) {
    fatal(`Database ${appName}(${repo.repoInfo_}) has already been deleted.`);
  }
  repoInterrupt(repo);
  delete appRepos[repo.key];
}
function repoManagerCreateRepo(repoInfo, app2, authTokenProvider, appCheckProvider) {
  let appRepos = repos[app2.name];
  if (!appRepos) {
    appRepos = {};
    repos[app2.name] = appRepos;
  }
  let repo = appRepos[repoInfo.toURLString()];
  if (repo) {
    fatal("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");
  }
  repo = new Repo(repoInfo, useRestClient, authTokenProvider, appCheckProvider);
  appRepos[repoInfo.toURLString()] = repo;
  return repo;
}
var Database = class {
  /** @hideconstructor */
  constructor(_repoInternal, app2) {
    this._repoInternal = _repoInternal;
    this.app = app2;
    this["type"] = "database";
    this._instanceStarted = false;
  }
  get _repo() {
    if (!this._instanceStarted) {
      repoStart(this._repoInternal, this.app.options.appId, this.app.options["databaseAuthVariableOverride"]);
      this._instanceStarted = true;
    }
    return this._repoInternal;
  }
  get _root() {
    if (!this._rootInternal) {
      this._rootInternal = new ReferenceImpl(this._repo, newEmptyPath());
    }
    return this._rootInternal;
  }
  _delete() {
    if (this._rootInternal !== null) {
      repoManagerDeleteRepo(this._repo, this.app.name);
      this._repoInternal = null;
      this._rootInternal = null;
    }
    return Promise.resolve();
  }
  _checkNotDeleted(apiName) {
    if (this._rootInternal === null) {
      fatal("Cannot call " + apiName + " on a deleted database.");
    }
  }
};
function getDatabase(app2 = getApp(), url) {
  const db2 = _getProvider(app2, "database").getImmediate({
    identifier: url
  });
  if (!db2._instanceStarted) {
    const emulator = getDefaultEmulatorHostnameAndPort("database");
    if (emulator) {
      connectDatabaseEmulator(db2, ...emulator);
    }
  }
  return db2;
}
function connectDatabaseEmulator(db2, host, port, options = {}) {
  db2 = getModularInstance(db2);
  db2._checkNotDeleted("useEmulator");
  if (db2._instanceStarted) {
    fatal("Cannot call useEmulator() after instance has already been initialized.");
  }
  const repo = db2._repoInternal;
  let tokenProvider = void 0;
  if (repo.repoInfo_.nodeAdmin) {
    if (options.mockUserToken) {
      fatal('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".');
    }
    tokenProvider = new EmulatorTokenProvider(EmulatorTokenProvider.OWNER);
  } else if (options.mockUserToken) {
    const token = typeof options.mockUserToken === "string" ? options.mockUserToken : createMockUserToken(options.mockUserToken, db2.app.options.projectId);
    tokenProvider = new EmulatorTokenProvider(token);
  }
  repoManagerApplyEmulatorSettings(repo, host, port, tokenProvider);
}
function registerDatabase(variant) {
  setSDKVersion(SDK_VERSION);
  _registerComponent(new Component(
    "database",
    (container, { instanceIdentifier: url }) => {
      const app2 = container.getProvider("app").getImmediate();
      const authProvider = container.getProvider("auth-internal");
      const appCheckProvider = container.getProvider("app-check-internal");
      return repoManagerDatabaseFromApp(app2, authProvider, appCheckProvider, url);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(true));
  registerVersion(name3, version3, variant);
  registerVersion(name3, version3, "esm2017");
}
PersistentConnection.prototype.simpleListen = function(pathString, onComplete) {
  this.sendRequest("q", { p: pathString }, onComplete);
};
PersistentConnection.prototype.echo = function(data, onEcho) {
  this.sendRequest("echo", { d: data }, onEcho);
};
registerDatabase();

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
}
var firebaseConfig = {
  apiKey: "AIzaSyBt9RaT4glOjaVYkSUfYKM3L5g_BxFMtOA",
  authDomain: "vitavault-ddba4.firebaseapp.com",
  databaseURL: "https://vitavault-ddba4-default-rtdb.firebaseio.com",
  projectId: "vitavault-ddba4",
  storageBucket: "vitavault-ddba4.firebasestorage.app",
  messagingSenderId: "251140544413",
  appId: "1:251140544413:web:9e68b0d1c882bacfd2c174",
  measurementId: "G-KXW9L7Z0XR"
};
var app = initializeApp(firebaseConfig);
var db = getDatabase(app);
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 41,
    columnNumber: 10
  }, this);
}
_c = App;
var _c;
$RefreshReg$(_c, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  ref,
  update,
  onValue,
  db,
  links,
  App
};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=/build/_shared/chunk-ETBHUXIR.js.map
