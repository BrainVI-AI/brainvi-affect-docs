<!doctype html>
<html class="staticrypt-html">
<head>
    <meta charset="utf-8">
    <title>BrainVI Knowledge</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- do not cache this page -->
    <meta http-equiv="cache-control" content="max-age=0"/>
    <meta http-equiv="cache-control" content="no-cache"/>
    <meta http-equiv="expires" content="0"/>
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT"/>
    <meta http-equiv="pragma" content="no-cache"/>

    <style>
        .staticrypt-hr {
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #eee;
        }

        .staticrypt-page {
            width: 360px;
            padding: 8% 0 0;
            margin: auto;
            box-sizing: border-box;
        }

        .staticrypt-form {
            position: relative;
            z-index: 1;
            background: #FFFFFF;
            max-width: 360px;
            margin: 0 auto 100px;
            padding: 45px;
            text-align: center;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        }

        .staticrypt-form input[type="password"] {
            outline: 0;
            background: #f2f2f2;
            width: 100%;
            border: 0;
            margin: 0 0 15px;
            padding: 15px;
            box-sizing: border-box;
            font-size: 14px;
        }

        .staticrypt-form .staticrypt-decrypt-button {
            text-transform: uppercase;
            outline: 0;
            background: #ff5a36;
            width: 100%;
            border: 0;
            padding: 15px;
            color: #FFFFFF;
            font-size: 14px;
            cursor: pointer;
        }

        .staticrypt-form .staticrypt-decrypt-button:hover, .staticrypt-form .staticrypt-decrypt-button:active, .staticrypt-form .staticrypt-decrypt-button:focus {
            background: #ff5a36;
            filter: brightness(92%);
        }

        .staticrypt-html {
            height: 100%;
        }

        .staticrypt-body {
            height: 100%;
            margin: 0;
        }

        .staticrypt-content {
            height: 100%;
            margin-bottom: 1em;
            background: #0b2933;
            font-family: "Arial", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .staticrypt-instructions {
            margin-top: -1em;
            margin-bottom: 1em;
        }

        .staticrypt-title {
            font-size: 1.5em;
        }

        label.staticrypt-remember {
            display: flex;
            align-items: center;
            margin-bottom: 1em;
        }

        .staticrypt-remember input[type=checkbox] {
            transform: scale(1.5);
            margin-right: 1em;
        }

        .hidden {
            display: none !important;
        }

        .staticrypt-spinner-container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .staticrypt-spinner {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            vertical-align: text-bottom;
            border: 0.25em solid gray;
            border-right-color: transparent;
            border-radius: 50%;
            -webkit-animation: spinner-border .75s linear infinite;
            animation: spinner-border .75s linear infinite;
            animation-duration: 0.75s;
            animation-timing-function: linear;
            animation-delay: 0s;
            animation-iteration-count: infinite;
            animation-direction: normal;
            animation-fill-mode: none;
            animation-play-state: running;
            animation-name: spinner-border;
        }

        @keyframes spinner-border {
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body class="staticrypt-body">

<div id="staticrypt_loading" class="staticrypt-spinner-container">
    <div class="staticrypt-spinner"></div>
</div>

<div id="staticrypt_content" class="staticrypt-content hidden">
    <div class="staticrypt-page">
        <div class="staticrypt-form">
            <div class="staticrypt-instructions">
                <p class="staticrypt-title">BrainVI Knowledge</p>
                <p>BrainVI access password.</p>
            </div>

            <hr class="staticrypt-hr">

            <form id="staticrypt-form" action="#" method="post">
                <input id="staticrypt-password"
                       type="password"
                       name="password"
                       placeholder="Password"
                       autofocus/>

                <label id="staticrypt-remember-label" class="staticrypt-remember hidden">
                    <input id="staticrypt-remember"
                           type="checkbox"
                           name="remember"/>
                    Remember me
                </label>

                <input type="submit" class="staticrypt-decrypt-button" value="Open documentation"/>
            </form>
        </div>

    </div>
</div>

<script>
    // these variables will be filled when generating the file - the template format is 'variable_name'
    const staticryptInitiator = ((function(){
  const exports = {};
  const cryptoEngine = ((function(){
  const exports = {};
  const { subtle } = crypto;

const IV_BITS = 16 * 8;
const HEX_BITS = 4;
const ENCRYPTION_ALGO = "AES-CBC";

/**
 * Translates between utf8 encoded hexadecimal strings
 * and Uint8Array bytes.
 */
const HexEncoder = {
    /**
     * hex string -> bytes
     * @param {string} hexString
     * @returns {Uint8Array}
     */
    parse: function (hexString) {
        if (hexString.length % 2 !== 0) throw "Invalid hexString";
        const arrayBuffer = new Uint8Array(hexString.length / 2);

        for (let i = 0; i < hexString.length; i += 2) {
            const byteValue = parseInt(hexString.substring(i, i + 2), 16);
            if (isNaN(byteValue)) {
                throw "Invalid hexString";
            }
            arrayBuffer[i / 2] = byteValue;
        }
        return arrayBuffer;
    },

    /**
     * bytes -> hex string
     * @param {Uint8Array} bytes
     * @returns {string}
     */
    stringify: function (bytes) {
        const hexBytes = [];

        for (let i = 0; i < bytes.length; ++i) {
            let byteString = bytes[i].toString(16);
            if (byteString.length < 2) {
                byteString = "0" + byteString;
            }
            hexBytes.push(byteString);
        }
        return hexBytes.join("");
    },
};

/**
 * Translates between utf8 strings and Uint8Array bytes.
 */
const UTF8Encoder = {
    parse: function (str) {
        return new TextEncoder().encode(str);
    },

    stringify: function (bytes) {
        return new TextDecoder().decode(bytes);
    },
};

/**
 * Salt and encrypt a msg with a password.
 */
async function encrypt(msg, hashedPassword) {
    // Must be 16 bytes, unpredictable, and preferably cryptographically random. However, it need not be secret.
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#parameters
    const iv = crypto.getRandomValues(new Uint8Array(IV_BITS / 8));

    const key = await subtle.importKey(
        "raw",
        HexEncoder.parse(hashedPassword),
        ENCRYPTION_ALGO,
        false,
        ["encrypt"]
    );

    const encrypted = await subtle.encrypt(
        {
            name: ENCRYPTION_ALGO,
            iv: iv,
        },
        key,
        UTF8Encoder.parse(msg)
    );

    // iv will be 32 hex characters, we prepend it to the ciphertext for use in decryption
    return HexEncoder.stringify(iv) + HexEncoder.stringify(new Uint8Array(encrypted));
}
exports.encrypt = encrypt;

/**
 * Decrypt a salted msg using a password.
 *
 * @param {string} encryptedMsg
 * @param {string} hashedPassword
 * @returns {Promise<string>}
 */
async function decrypt(encryptedMsg, hashedPassword) {
    const ivLength = IV_BITS / HEX_BITS;
    const iv = HexEncoder.parse(encryptedMsg.substring(0, ivLength));
    const encrypted = encryptedMsg.substring(ivLength);

    const key = await subtle.importKey(
        "raw",
        HexEncoder.parse(hashedPassword),
        ENCRYPTION_ALGO,
        false,
        ["decrypt"]
    );

    const outBuffer = await subtle.decrypt(
        {
            name: ENCRYPTION_ALGO,
            iv: iv,
        },
        key,
        HexEncoder.parse(encrypted)
    );

    return UTF8Encoder.stringify(new Uint8Array(outBuffer));
}
exports.decrypt = decrypt;

/**
 * Salt and hash the password so it can be stored in localStorage without opening a password reuse vulnerability.
 *
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>}
 */
async function hashPassword(password, salt) {
    // we hash the password in multiple steps, each adding more iterations. This is because we used to allow less
    // iterations, so for backward compatibility reasons, we need to support going from that to more iterations.
    let hashedPassword = await hashLegacyRound(password, salt);

    hashedPassword = await hashSecondRound(hashedPassword, salt);

    return hashThirdRound(hashedPassword, salt);
}
exports.hashPassword = hashPassword;

/**
 * This hashes the password with 1k iterations. This is a low number, we need this function to support backwards
 * compatibility.
 *
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>}
 */
function hashLegacyRound(password, salt) {
    return pbkdf2(password, salt, 1000, "SHA-1");
}
exports.hashLegacyRound = hashLegacyRound;

/**
 * Add a second round of iterations. This is because we used to use 1k, so for backwards compatibility with
 * remember-me/autodecrypt links, we need to support going from that to more iterations.
 *
 * @param hashedPassword
 * @param salt
 * @returns {Promise<string>}
 */
function hashSecondRound(hashedPassword, salt) {
    return pbkdf2(hashedPassword, salt, 14000, "SHA-256");
}
exports.hashSecondRound = hashSecondRound;

/**
 * Add a third round of iterations to bring total number to 600k. This is because we used to use 1k, then 15k, so for
 * backwards compatibility with remember-me/autodecrypt links, we need to support going from that to more iterations.
 *
 * @param hashedPassword
 * @param salt
 * @returns {Promise<string>}
 */
function hashThirdRound(hashedPassword, salt) {
    return pbkdf2(hashedPassword, salt, 585000, "SHA-256");
}
exports.hashThirdRound = hashThirdRound;

/**
 * Salt and hash the password so it can be stored in localStorage without opening a password reuse vulnerability.
 *
 * @param {string} password
 * @param {string} salt
 * @param {int} iterations
 * @param {string} hashAlgorithm
 * @returns {Promise<string>}
 */
async function pbkdf2(password, salt, iterations, hashAlgorithm) {
    const key = await subtle.importKey(
        "raw",
        UTF8Encoder.parse(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const keyBytes = await subtle.deriveBits(
        {
            name: "PBKDF2",
            hash: hashAlgorithm,
            iterations,
            salt: UTF8Encoder.parse(salt),
        },
        key,
        256
    );

    return HexEncoder.stringify(new Uint8Array(keyBytes));
}

function generateRandomSalt() {
    const bytes = crypto.getRandomValues(new Uint8Array(128 / 8));

    return HexEncoder.stringify(new Uint8Array(bytes));
}
exports.generateRandomSalt = generateRandomSalt;

async function signMessage(hashedPassword, message) {
    const key = await subtle.importKey(
        "raw",
        HexEncoder.parse(hashedPassword),
        {
            name: "HMAC",
            hash: "SHA-256",
        },
        false,
        ["sign"]
    );
    const signature = await subtle.sign("HMAC", key, UTF8Encoder.parse(message));

    return HexEncoder.stringify(new Uint8Array(signature));
}
exports.signMessage = signMessage;


function getRandomAlphanum() {
    const possibleCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let byteArray;
    let parsedInt;

    // Keep generating new random bytes until we get a value that falls
    // within a range that can be evenly divided by possibleCharacters.length
    do {
        byteArray = crypto.getRandomValues(new Uint8Array(1));
        // extract the lowest byte to get an int from 0 to 255 (probably unnecessary, since we're only generating 1 byte)
        parsedInt = byteArray[0] & 0xff;
    } while (parsedInt >= 256 - (256 % possibleCharacters.length));

    // Take the modulo of the parsed integer to get a random number between 0 and totalLength - 1
    const randomIndex = parsedInt % possibleCharacters.length;

    return possibleCharacters[randomIndex];
}

/**
 * Generate a random string of a given length.
 *
 * @param {int} length
 * @returns {string}
 */
function generateRandomString(length) {
    let randomString = '';

    for (let i = 0; i < length; i++) {
        randomString += getRandomAlphanum();
    }

    return randomString;
}
exports.generateRandomString = generateRandomString;


  return exports;
})())
const codec = ((function(){
  const exports = {};
  /**
 * Initialize the codec with the provided cryptoEngine - this return functions to encode and decode messages.
 *
 * @param cryptoEngine - the engine to use for encryption / decryption
 */
function init(cryptoEngine) {
  const exports = {};

  /**
   * Top-level function for encoding a message.
   * Includes password hashing, encryption, and signing.
   *
   * @param {string} msg
   * @param {string} password
   * @param {string} salt
   *
   * @returns {string} The encoded text
   */
  async function encode(msg, password, salt) {
    const hashedPassword = await cryptoEngine.hashPassword(password, salt);

    const encrypted = await cryptoEngine.encrypt(msg, hashedPassword);

    // we use the hashed password in the HMAC because this is effectively what will be used a password (so we can store
    // it in localStorage safely, we don't use the clear text password)
    const hmac = await cryptoEngine.signMessage(hashedPassword, encrypted);

    return hmac + encrypted;
  }
  exports.encode = encode;

  /**
   * Encode using a password that has already been hashed. This is useful to encode multiple messages in a row, that way
   * we don't need to hash the password multiple times.
   *
   * @param {string} msg
   * @param {string} hashedPassword
   *
   * @returns {string} The encoded text
   */
  async function encodeWithHashedPassword(msg, hashedPassword) {
    const encrypted = await cryptoEngine.encrypt(msg, hashedPassword);

    // we use the hashed password in the HMAC because this is effectively what will be used a password (so we can store
    // it in localStorage safely, we don't use the clear text password)
    const hmac = await cryptoEngine.signMessage(hashedPassword, encrypted);

    return hmac + encrypted;
  }
  exports.encodeWithHashedPassword = encodeWithHashedPassword;

  /**
   * Top-level function for decoding a message.
   * Includes signature check and decryption.
   *
   * @param {string} signedMsg
   * @param {string} hashedPassword
   * @param {string} salt
   * @param {int} backwardCompatibleAttempt
   * @param {string} originalPassword
   *
   * @returns {Object} {success: true, decoded: string} | {success: false, message: string}
   */
  async function decode(
      signedMsg,
      hashedPassword,
      salt,
      backwardCompatibleAttempt = 0,
      originalPassword = ''
  ) {
    const encryptedHMAC = signedMsg.substring(0, 64);
    const encryptedMsg = signedMsg.substring(64);
    const decryptedHMAC = await cryptoEngine.signMessage(hashedPassword, encryptedMsg);

    if (decryptedHMAC !== encryptedHMAC) {
      // we have been raising the number of iterations in the hashing algorithm multiple times, so to support the old
      // remember-me/autodecrypt links we need to try bringing the old hashes up to speed.
      originalPassword = originalPassword || hashedPassword;
      if (backwardCompatibleAttempt === 0) {
        const updatedHashedPassword = await cryptoEngine.hashThirdRound(originalPassword, salt);

        return decode(signedMsg, updatedHashedPassword, salt, backwardCompatibleAttempt + 1, originalPassword);
      }
      if (backwardCompatibleAttempt === 1) {
        let updatedHashedPassword = await cryptoEngine.hashSecondRound(originalPassword, salt);
        updatedHashedPassword = await cryptoEngine.hashThirdRound(updatedHashedPassword, salt);

        return decode(signedMsg, updatedHashedPassword, salt, backwardCompatibleAttempt + 1, originalPassword);
      }

      return { success: false, message: "Signature mismatch" };
    }

    return {
      success: true,
      decoded: await cryptoEngine.decrypt(encryptedMsg, hashedPassword),
    };
  }
  exports.decode = decode;

  return exports;
}
exports.init = init;

  return exports;
})())
const decode = codec.init(cryptoEngine).decode;


/**
 * Initialize the staticrypt module, that exposes functions callbable by the password_template.
 *
 * @param {{
 *  encryptedMsg: string,
 *  isRememberEnabled: boolean,
 *  rememberDurationInDays: number,
 *  salt: string,
 * }} staticryptConfig - object of data that is stored on the password_template at encryption time.
 *
 * @param {{
 *  rememberExpirationKey: string,
 *  rememberPassphraseKey: string,
 *  replaceHtmlCallback: function,
 *  clearLocalStorageCallback: function,
 * }} templateConfig - object of data that can be configured by a custom password_template.
 */
function init(staticryptConfig, templateConfig) {
    const exports = {};

    /**
     * Decrypt our encrypted page, replace the whole HTML.
     *
     * @param {string} hashedPassword
     * @returns {Promise<boolean>}
     */
    async function decryptAndReplaceHtml(hashedPassword) {
        const { encryptedMsg, salt } = staticryptConfig;
        const { replaceHtmlCallback } = templateConfig;

        const result = await decode(encryptedMsg, hashedPassword, salt);
        if (!result.success) {
            return false;
        }
        const plainHTML = result.decoded;

        // if the user configured a callback call it, otherwise just replace the whole HTML
        if (typeof replaceHtmlCallback === 'function') {
            replaceHtmlCallback(plainHTML);
        } else {
            document.write(plainHTML);
            document.close();
        }

        return true;
    }

    /**
     * Attempt to decrypt the page and replace the whole HTML.
     *
     * @param {string} password
     * @param {boolean} isRememberChecked
     *
     * @returns {Promise<{isSuccessful: boolean, hashedPassword?: string}>} - we return an object, so that if we want to
     *   expose more information in the future we can do it without breaking the password_template
     */
    async function handleDecryptionOfPage(password, isRememberChecked) {
        const { isRememberEnabled, rememberDurationInDays, salt } = staticryptConfig;
        const { rememberExpirationKey, rememberPassphraseKey } = templateConfig;

        // decrypt and replace the whole page
        const hashedPassword = await cryptoEngine.hashPassword(password, salt);

        const isDecryptionSuccessful = await decryptAndReplaceHtml(hashedPassword);

        if (!isDecryptionSuccessful) {
            return {
                isSuccessful: false,
                hashedPassword,
            };
        }

        // remember the hashedPassword and set its expiration if necessary
        if (isRememberEnabled && isRememberChecked) {
            window.localStorage.setItem(rememberPassphraseKey, hashedPassword);

            // set the expiration if the duration isn't 0 (meaning no expiration)
            if (rememberDurationInDays > 0) {
                window.localStorage.setItem(
                    rememberExpirationKey,
                    (new Date().getTime() + rememberDurationInDays * 24 * 60 * 60 * 1000).toString()
                );
            }
        }

        return {
            isSuccessful: true,
            hashedPassword,
        };
    }
    exports.handleDecryptionOfPage = handleDecryptionOfPage;

    /**
     * Clear localstorage from staticrypt related values
     */
    function clearLocalStorage() {
        const { clearLocalStorageCallback, rememberExpirationKey, rememberPassphraseKey } = templateConfig;

        if (typeof clearLocalStorageCallback === 'function') {
            clearLocalStorageCallback();
        } else {
            localStorage.removeItem(rememberPassphraseKey);
            localStorage.removeItem(rememberExpirationKey);
        }
    }

    async function handleDecryptOnLoad() {
        let isSuccessful = await decryptOnLoadFromUrl();

        if (!isSuccessful) {
            isSuccessful = await decryptOnLoadFromRememberMe();
        }

        return { isSuccessful };
    }
    exports.handleDecryptOnLoad = handleDecryptOnLoad;

    /**
     * Clear storage if we are logging out
     *
     * @returns {boolean} - whether we logged out
     */
    function logoutIfNeeded() {
        const logoutKey = "staticrypt_logout";

        // handle logout through query param
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has(logoutKey)) {
            clearLocalStorage();
            return true;
        }

        // handle logout through URL fragment
        const hash = window.location.hash.substring(1);
        if (hash.includes(logoutKey)) {
            clearLocalStorage();
            return true;
        }

        return false;
    }

    /**
     * To be called on load: check if we want to try to decrypt and replace the HTML with the decrypted content, and
     * try to do it if needed.
     *
     * @returns {Promise<boolean>} true if we derypted and replaced the whole page, false otherwise
     */
    async function decryptOnLoadFromRememberMe() {
        const { rememberDurationInDays } = staticryptConfig;
        const { rememberExpirationKey, rememberPassphraseKey } = templateConfig;

        // if we are login out, terminate
        if (logoutIfNeeded()) {
            return false;
        }

        // if there is expiration configured, check if we're not beyond the expiration
        if (rememberDurationInDays && rememberDurationInDays > 0) {
            const expiration = localStorage.getItem(rememberExpirationKey),
                isExpired = expiration && new Date().getTime() > parseInt(expiration);

            if (isExpired) {
                clearLocalStorage();
                return false;
            }
        }

        const hashedPassword = localStorage.getItem(rememberPassphraseKey);

        if (hashedPassword) {
            // try to decrypt
            const isDecryptionSuccessful = await decryptAndReplaceHtml(hashedPassword);

            // if the decryption is unsuccessful the password might be wrong - silently clear the saved data and let
            // the user fill the password form again
            if (!isDecryptionSuccessful) {
                clearLocalStorage();
                return false;
            }

            return true;
        }

        return false;
    }

    function decryptOnLoadFromUrl() {
        const passwordKey = "staticrypt_pwd";

        // get the password from the query param
        const queryParams = new URLSearchParams(window.location.search);
        const hashedPasswordQuery = queryParams.get(passwordKey);

        // get the password from the url fragment
        const hashRegexMatch = window.location.hash.substring(1).match(new RegExp(passwordKey + "=(.*)"));
        const hashedPasswordFragment = hashRegexMatch ? hashRegexMatch[1] : null;

        const hashedPassword = hashedPasswordFragment || hashedPasswordQuery;

        if (hashedPassword) {
            return decryptAndReplaceHtml(hashedPassword);
        }

        return false;
    }

    return exports;
}
exports.init = init;
  return exports;
})())
    const templateError = 'Bad password!',
        isRememberEnabled = true,
        staticryptConfig = {"encryptedMsg":"72969769f6a508baf35f300b9c126df0776eef01b157550d559f3ae307f551abb7b88c0dc3b52f4ee7752bea7b2da083c4814e37071f94a112df1d5a7137c99c2bc69813d2d6e91af038e5ae7cb15b057ca272d5c42b870ac310ea144b692353813e5feb114051f2c1137cc66ab5e8fdfcf2474b95ef067bf9f334e0da4fe879b3036d7e11ef7bfbbe4579a3e9efb3812be9d49513db8b8a0a8edc6b5b5859868e6a0b8948cf8b160e420da84e5e2d56b339d66a33c0d8838c27fd78324fc1c83aff2834e9a787debf4dd8b586f062e161b3a3a2b008c53bbd22334cc82c8cf2c72540e4ff98c8f8220314b8f13f1241a60026b82a6e207fadcccdbd018aa56df8096c3d1b564fc2237fcb3efd87a9743137287715581618799950a6c94a00b6f3f23c9905a71793912c1e7ae16a25c57de1c48c2232e5dd7b6e25da6b9d8547e19410616bdea7755224a6b6e9fcba0379c53129f56bcd243bc841ae738b3c17b14e23ebe829fc97d6ac3935ab0abc7e310e8ff5476fbb4e60dedf93abebecac2a831c455500c739402b3501d711fc8ace7473003b39d7478334da1952bd071ee31ca429956b8ff5c621e534da97c6e8696bed01f5af85508cc819ee85830e87a779b7f7bb65130126fe7551d0830df5bcb49d5642d30c10238c5f79070e5cee86587d8b4a4b9c0067b51d1657748963c0e958d4d224767202a80f16c9c3050ff815ae2e7ecd3c71151f08edede6ebc8148b0d87a826fbef9834a418c0a351c76f21c72d3455740125c724ac33e0fe4db2e59a9d56015922af9091177159d4e5f3f896bc2db49f6a6cdf3060cb447f196ff418aa652800525c7026019b5b19c2a1860e550d0bddd7bfc1f5d2d9729dc4f94652c839b24249b9be4879eb5e4acf775f7435503ebbefdff4d942e9506b3262cc8ca4bb27c74918150d2adaa16537c350221815b0b0e977b3b5c8ae579f03b13b40c91de24a4ce639b27b1fac602191da48c677bbe6fe0f8e9959ca15e63fbe45381a38fb82b758f3a79463fdef4153f81b9be29fdaaf1e52d3a235dc1d98da7f15c74a59e5d47f87cc23a5596eaf34debff57df42c1ebbd1911502d640cfcabf44ba4df7a33eba51f7e7eaeaed8b1537efc4d5e6561a901b34d46fc60208f65f0720ed8457199f7099d87c15ef1ab895c79164e6556d8973cc984162d667b82538829eea61d17703e7c7d78dc8f15848bcea8f6860c47af5f237ec3a8171527142b81ecadadf6d441a5ece0b475d75616810eb23677d8d34b769912ef933624a0d397230331123d7d4fa282da4cf80b90d8484a1d4bd7fc3d8b914b49666aff47b8a5b5774eea46eb03462f69058889acfc8ded76fb69a2c9e628076924769c3c4482a4c700ada37bab9f573b0048a75e640ea1705e5ccc61f5b72ec1e3c5af745b79c4b43d3d5892bf1d941a4f6264c3f245268c2f2dba5e9ab724255ccdc002a3c493a9628933e860672763bf15e532eab6f38421921f58a4beaf42d3ff2ef0d10d17d57ec0236259650cade921e308139f321283493eb316bd513c7dc3b199b17f6630237ea706c8ba52c967019075b00a642a0598e8abf86bc42e3b25637ec3f68bbcbfde6164f3a5aa197213a36c1a374f06d72590e544539f3aff75162d8ab4014bef8196b1d48d7c38f21761fd42b9bb1faa77068575276d8dfed0db102bb6d16bc932c149d6caa4e38f8d453f9f6a6e61a42672a2a5ef27260b0454ae0ccc37847161a46945119fcf4ad578d5bb3c3a1f2191a43530c58ce218b3659873cd8a5520a56c8f3c4c0b55bfbd60f291fc151a9cb54e0ad27449f6646c38beb008e815b74dc7f46fb0ee995eaa9214495247efa0ba15b81116855ee89dca880c1d1e9aa0f97b7a35d1bf49712fc9069790c8cd4f496b38fedd3a8014e7aa181162138ac685880f51995d33930f51d8c86edafd9259cb10d5b16e039bfb688df574bfd010919396c50a0dc8227f68e3b6e9397a33b68afd31fe867e7da8f3c3fb36d654025ae4b9df9b74f8f653a11f32ccc4f330eb3a6fb4abcc541f445b0bac5adc73e1eabf66fa4496218e62ca88300d4b0af8ef571c66288797049ca902503872d6fcd65b5e87aae87247195e38ce65a68826d453afd1229ac5171bffadd5e61ddd1cb25538068f9fe892413cec9f4bb1cec0f503f8746497ebe6cf0a3193ec790e8ee2517884e5f73a73e1e68a2a7bc9d95f0246c51d54d8dffeee6e8a6762d630a6c7c18690c16d10c94304813218e1cce0b6b3a160edca4b4e98e96be36effb33e2b4d5626345175406f6663692d6d0fc04eb3b88a6ef22153505e1e8e764b38c277c2dd5e37490f02aae464f3046809a497cc25cf2f24526410fb5a3e2d6fc3d7e649f6d7e8deba27535c213122fdd368368a7668d1e318e0dee8343e64aeb972728c4500f822bb4bb28382481f3b70a84d88451cf9a566a98875c9b8377161b02df6d4bb7e4bbd92f4f1046be59871be75cb26fdbfe2e7c88975783cd597b0e41094b9a77522373394f961e1cf1ecb678e7eb9a794fa53c37de8b521b97391e1ea485f444099871457870b33d156047e89fce65d270e16d6d61f2314df245976cf7a50d9af268b82a7696c3100c82638a1822e512bb30a675a4b9075012175e02d3cf84ea006946a70c2575720ad7977174c8398e15ae8c98874bea9bc1f11151480f07be396e364fa70d625dfb5de23f0108f9f0b334d64665b1c7b6b62d4df36a6e853d1be2ed7a652a3d44e53ff63ed13cd5f3f54ef0d41c268695f9121acba32e3968c87a59eff0b789a49d95eecd85a90789a6c8236b76780888906ea05db4b82a8f87bae600bd69f645f6fe47e1b08f6b4f48593c84386f8417a2fe0731f2caf5771e382e185282d90923d083c1f1e71b6aeb2dcf6b07e1fd4740553d3f84b12639f2393b62c62eb06629503e0f219bb10d380f0d84e489366de6c715b40af9c53348fb1f985d030e56c78671b7d40982a07371a9a8ed2cb44bbaaa6d837c4ae02a3072afefb275515f747f83745b704989727775223ad499063f28a62755fddbff4b42697150f549f80e5250bc36be4ed134600e4523e737c74a20a25df91159bffd67308183b87c1e8514d11de27312fe1137e27493a0bcf8aa676587160973b0f4cfe36c256fb10279d13b45f908723d91a97ba92e16cdeb290d6bc6035b1a558b9482fbf2690ceb84164aa77515949c27135790b750a0768acc4f6523040570f8f0d1459960462054d36a26bc35614abd78ffca193f86ccaddd8b91e1065613c93538805c9dcce918c91762dc5bb5125cc8b9dff97edc7d6a466f03dc5421a75f582e3a5587ca982b88fc7fd932c9f530738a86f73372fd6014d44c9e9ff8d9eaa28cb85f73bb6984672c0ce021e026605831721a4981a24aeaabea5b056b1f7937f5fd32769de413a5c2339d6aabc8938c2e45f16d7685e1d3b77b98e0352dabc2b401b7606f3fe30788121b4af20999a4087c56ead9bcac88ef9cb34cb88ee4c57929bb46de8d22486e2bc9a9f80d565098d68266519e9ccf1fbfc8805395cb04e63bfd971af99e174ff157d8892626194f070a3ec9f14c9fb1489fcfc14db2c7af212897bc994b0022190cd929c7ddc2ba2b8a3b51d8fbbd26f4a35db30bc8eedb871cfae0df8e067e73a6a04468213341f109db657659cb71f176fc7b0fea3b399d852a5c81ca8d82d21c92b06f19296eb42894bbfd0cc9f1755b8f13dc657febdb5fbda9bf88c08dcdd6772d6138536fed022f2eaf09cdbb056d6351d3cc6d3bca08c21d2e6ee554521d35c05e267de22fbea1022b5f0a79375b0a22ea8640e40d0aacb1ffad1b187de0f73198c15ce66332283eba1c1999cddbb8e57147a5ebcb756fa58dfcd477f24410e8b9d84538efdd3a03027172d203cdd92e93bab01f0c58ab7ca6da7fe07c8624e5771108562217683774a3999e2e71252a26a87306cab58a9a5167c083387acbb6dab3c43426df4e8c5d188b74fab6320f6d9dbc7b16730f6ef992f4b123b1f0e954df866430107a8cc301c1090545a00c97ca5166e3fcb6d6ab88a400dbddb0dc18891759100dc5f02496f76b2a5ed651122e88b762c09c67a206254958122460b2336b418a5c5058aa9d150115dfad219f81c8a372b2b53e5380acc3851846f3f8e41cd987d141151bc9f3436cd0128aa04713cbf8a2bec94bd2f154d29c160c242356efdbef98dd9ea3f188a084e68b9ce226a805c64320be0f3d684f88ef1cef4b43fdbda98a525c82c67af98d0a8177657f1fb58c1d07c6786137a8486866ccdc2d6e12946196a9a404ebba523aa6ac45909ca620550eba674fbf23fdde160781ca5815d65c8db9472b8274deffd3708f38b7578541401f8b2ad6df4d0ab58fbdf28c5046206c7cb649e2e7beb30dd435b1fde6fb58ffec25e72f845454c47b843b1eaa2c2f8d4de5ba1be94abdb7d467f6df10acdd36f03d83ae4726d4e18418ea72eb4b74e7ade458e1bdd31b12486cf6cf70f4c4b5a749f818972b5488aa5b34860ec61cdd3f096418e513352a257eae43ef9ff33bf1b60cd1bff3da29b277135603961a0e2e4b3d53d9d5a34ec6e1cc0646e3be0fd71416a9b9039867a9efabbe5c050c3fd383e4fc6e8e1c1f9cfeb3bd6824573349453588b530b3049ba4154ffd2f4afdbeeffa624f1a6124675a2385f9bd5664ecb3ca3486c34dfedd8b7dad774aa4cfb5f95ef9844fb5f429dd427a997e9b0bcc4d1e2673ebec9c7c160cc1cf57a9405589f1887aadceb4a25ff3847a6833d2397693f56ab49402586f9bfb87fbc7c19cc814538c33d24a653da0b28ee5dc3325c619d1f770e93903dd979bbfbef686bd29be5f989667989ef1c6546485d233be4e982d548ffd022d50c593e7809c6748c00ec6071ee79e7021a37fdf2667cb08b28d803e267db2b24b65b66c0e80982afa550fddf17acf170744b674b11e8cd82ac46e4ab88df3c9ce3a610c9818a9a22334013ebeb89738c6f68a82ea6ad36baab68ef01ffae1200e8b441ccf1f1fbf97b88459c86d979cdbe725b026d651b51d8539c5479728b5bc38f876c26ff84e25d0f5fb369e937004db2cba811ce0afea425e549ae7a157887c31e3b2c29c17bbb1f2c0021ea0374dab039e365c5bb223265a53d516e704ffd32a51a832f8d9dd35493b83586ef4e0ddceee52634add72e9ae1fba9894edc44811d1f6c5991b77df7d5422205feb975c493d8e2a7eb683add74c58c286e9a5586637d56e4eed83b800066ce9df69c373d313d5fdf711ce6c1a2ff71eb421a24a128a09c3b584a8d60e74cfe1f98b48f18842df8d18831b9d19c467b5e17e57b29d3a9e3d814a93d62920335646daa6b65dab8d8d6f9383265b7f9fc201ec0c2ee83a126d03feb9f556124512177f1ac36f1cff996a510c909b5509893922d292cec9948a84f0bfb531082fa1f0a9c3932568d60f4cf904b9822b83f7aa6e73a3afded655b45121456a526f1901f7eb9afb3f0c914f341dfd7aae87d72a20a3c26afc7a5b2f7244c9b384502e96ba44077816b6502e94c679702ca0a050cff5478c037e4da43f8825f328dd9be088a9ad6152db6e8d94c08527763d1ed5ecef2d2a28baeb46cd440a358a74b27641d824410bbbbcc8cd22f13def9e2127c37528f02a8eda96d43249e66e178f85ec286b6025b117d9c0aa285cd176a2de18819cfff46de77d205d4b7c7d1bfe58a1cd7ba1f74c9edbe9179f913c2268f57ff62ad02c065be091d786d23d90a57a26a9ca39988012e48758f2b0b42505065a8da4fbcc9e0fe97e4b87b986bf28d718146732bb5de9b680448080dfc3ce8eb819db80f43942b6e45c6a031bed5c48f7e95b1ab2f8caabb83d9c9f62ae82ab55726e5465a0df62cb4ff4ab4d82a8d0f79c548162dfe766d9defdd1148a3b402521cb931c2d77ac2710eb8d8bbf7f615678a119ca7bd919f9f64b222718b8c579634ca949ca1a9378f5b796ec86b43e554db1a0c293400fca98ffdd4f17a0b28987e12707cb7d06beccb6ac0cb06de5d26ca5f436f06b0821aa9170671425b06d0801ec695e73ca37a6073eb3f30a26976e9eed487162260c0036e51919a2f440f17a09fced251006d6b9e120fb61e67b797de88fe5fb4fc4c239be362b505949441207208f604b279ea2ba9e997a2dccac74e06c15544bda0e6e984ac72dd56a64f34fb538e4b04922049b37c14b0610616ee72dc4e7a952ab1bc3a81b3ccb7f3cac6d518bb4ad7ba49f58e30ff645e122bdfc7c68eeeb343039f331da877b87cd9aa1843f22f98b61b0a166669aba1b82d05467fa65ae6b04a296cfcb789b1a48a82b4be34e6656a0f79ba5239205c4cea78fd3da1ea8d684eb07d4eedf23d9cd2375defe7f3982defa6eaa13b1cc3348d6a4316e1bc492cdeacab226dd7803e5d6a585e4b98a576da1a14e7ffed522f3bad61e57b34b9b827385c726bae9af1d5a4c2779fc4ca451055258a95c2601583af27760492c921ddf35b8ef45b68f94e495800b1a5d1fbf678db5862125723b756032e20ee7bbe94abb83b2b46b78e16061f9bf563b8ae55698e9bc8db582f940547c8800938190855924ae15ecf8db2487da0f0bcb3e9e5901c0af1611f725938a8c2e31f8c004fec3d3b7a8418993fe0ee37f8a890c448ffae6d11baa296363b9c60dfeac3334bc616af1529605e8eca5bcbae92b5dd712a756967bba1e83129e692299e9f9f539c8913cd1dd7f85d2825bd7c79da3ae6bc7d11067a0bcfc6fa177e23b60e094b757a0680adf8d30369fb882d8cfb4f7d809e0c8327083e3754a6ff93dc8df81494ddc7ebb2c9f2267bc4fc8083b4b935cdf20e74de565bf09a94e836edfc76d48e6531a982a72bc6d543bddd92b1fba16ff40c0c615b361aa448b52b09b1af392666619a6bf628b82339c932f13e29617400c2665554be0ccc5a9fef2ce8e4b0d33042901ca2ba4556a84c9c7aa3a9c95fad3df21ac1ef3dd7d97ed17addd7439d637e27c167a6cfab2f34ac160474f87c6e6f4f8d53f0088ab148a0aa646fdbf86c2453657b908b882f8a85b537d24bf916bca14480f04475212ca091fce052ac06b33cb40475169d5008d190d054327d18e689b9259033ebb1840025c3a3233b274f4fce7206afac20b20c9837d62dfda2d516618ddc4919fc1e36ad2af1f3e7f982d3c66ca6590d1c02eb07938395bd7eef3b50a0070ab5a831c47e628290e547402969d77f6f725ce80475d7105250b58bdf8d4f4534aae626fabfa2763b7520465a38a24adb8118eee0a6c5af3a836619d71221f70b7d8e88dd9ed15ca4322e9976a62feaaf6bbb2cd2e03ee365b9c5c9642cdc3ee0a3bf4b25eeef7ba7f94027ae94567adfd2ebbe9ef2c3a4f896a66cde98e9ddfbf4ee87f2defada5838371067919e49d9e48431bce0ed717cd1cf0ec63c29ffd92cfcd25996b0bc2255440f5fcbe9f36741f8e8237398e03897e3be580ccea3715e87940b7b84ab08f0fbd1a81cec2142202b546a875f93e72908599da81400fef2d21b02689809744d708f9cbf0427ec3227865b8f75188ba03dce3d3f3eef9f527558c4b4a087cbe4f13b74a524abd6909a33d242394f9ed1642764a64ba7e10cccae5616dd01634659eafad937a7ad3213d95e494c883003b275f0660524ffebe1cb15e00ed0248829a45187caa2861c0acb7600334e1be27cfc7c76deab4df4329caa504421b92a7e22d74ec479b1e2e18d6bf19087f9023ce430cedfc3145ef46d439f9fec7732d62c5637778bd2933d72f23276ec96a3b7257e5d7c05c3ed8268b3e09d20eddc741239b237e8f205afa6779654ade43ef6273690d48210dc738e79a65f25e2be17cd2d71f21e0d902a22ffde49b58f0b48f5330319152e25f211d27479fbad89401e6e11601856235f2379f3d34386405ab8d2621ace371500017749e335bae82e950fec1e1e7ac33faa93ed9cd336231727aba759a5ad1321a9149889fc48e69d9eb6c5934663a0bda32d1c82cf25a166939d9e475faf46e073fd573173655e1cf3c74fc100412d70e9ad5e3c90406c0c235b7edf969141ee99bd87a04807bbeced7c4213b42824985336bb85d82ede6a9b740be918fb5a2079d93d51ce9b8b0b0f4de2ac56f77421c492b0325f96a408b5a2e6f675815a2cd52b1ac03ff8fa03545c4567b74aeb089584e715a40950b0a10f6d3af4e30d00170bcf512587509b74f290c0718d6e60ca8b19d910cd0fad889687b94895374d00c4c497aea63c506eab6cbf1dfb4f65f8a132625c4fd9f6211475ee0a2bf633e3c2bc050932ed638c4cfa85d89624f2bd64759b5bbe30f5a02783c4e83d90c71878dfe22b89ffc9ee0fcb28755ed4458bc281748444185f3a6457a15cb8abbbda1936df9d50165eed6eae672d9824f16966c924bf6c02f4e35b108ae3a043ed9aee953a197f2893814dc2db4474811ffe33200ac2c3e3453786e659b5503e0dc6fb6821511d9cc243bdd6333c17321bb3dfc433ed78fcc8d115da23da8438b971aed3f7995a78d4d099e66bb642692d37237c92a5a222926d8d5dcf999a6d7eaf78ac39d0173af990b0ff6ac5f2a84487ca3531900ef1b6a987b13049fc07c396a746c458963d5645eded3dd4f73e78dd1890623c08b2354b02596195b70b7b1b4f52b9e600adb0a375a872bec5b2f24ccdd37b583c2516233f7105cb1a14f6ea44650d33ea306533a6f795279a55eb9310dce802b846618eaec74c457a5d274f0b9757e59cedc1a624fed3b85b981de82fe8b59ee48bd0627f3cb9091e49f5f8873300b07b3b7bd6226ba47defcdc705709d013d64e604550447deb735d5eba222d960093ea72459745b2ce09ab08fec8bfca0fb18cdffe13dee24e06f6af9c4b5b0782fc8252d68d21825360a6c83edaf6278c443784c7a3ad32ec4229e94c5714c5a9ab306032e0869bd83b764f38462efe7a48b788de84a3cb74e93b0d178fdcac609db08d83a1f66179d4fa9645184fef351b3ca52bafb35cf43348750720f05dcf6172677c91cdbac0cd8cb1868f56e13d35d7f28872213afda4c821a5fb6323ce2770cda1d087f0b4c7bb95dbdaa7cca63b2128d213626985cf377cfdda04d2e1d49c17df72fe7cf733467e5bd5a683fb3248008d6e61636e183787a169d3581d4c1e454d199ecc8e00dcad480f796a169e0a24653208a50ed77c01ff057f330504374e685086a5d3b94e0eb9a7917fc5ec6060e50e095a4f1a0b79e61ff9a3ea6f928d17eec64e7bda801dde432d2f24a5c14744d6439d7ba89f6efb188da02eee29915276ed2f238b1921148759efd064b61c4ca572114f66e576af1d6d273b2cccd0d261522efb3be9297ed4eb6a299bd0c3de0189aefbcd5eae8d3a51f6d20602a1bfa8ca7dec55c9e466676f4edadc626c8d27984c06da34d8e6a67f1f8bc850cae48d8e59070e5577d30dcf03b8e44655591c8f48e368eee7ac80d3e38093fe2d465369c16977898f51f7a172ce1697615179558c1f602f1f1d9f31de888ad5221ecd3831e72de700e85522b4c4099fbd26f8706b1ac58e4fc457ee74396e34f224995632dac1455b818fc9a934cffa871617ee13e84ff43e85864d9f6a11605320253ca0fdef4773b3a43a34cd8463fe1e83ab4817c17ed284cc12b05bfc1268e606e6cfba875e4f4d1e42a7b577f0f8b8aa2a8f51d83b7dfd3815b1b9765eec5019e37e2b5f08dcadecac6c3eb4b641a054a028195003e878d0c8e03133d33eff9b5a82e9b47f60035399e60c871e6fadd91f5e7516e78e947647f8cdba8dbf73003a24465cd623ea978e3ea00284a4d8119d444aea324a3f63fad934b34a061dca5f1e6404b32065349421369effe4b26707f36d088e71fbbd5bb1c7d6ffd5d9c18bd11d60db878028016baabb806fe465b08f93dc0f5f522011a3a2712295f59649e2bba79c137f3e686dbe01ee4eb3c19dd533f0aa54755ab517cf7ef2e091040f6c52a53d09af5d528a525f3dea0029686f848b5c21ab49376ed2bcf0b45858104cb04d94ef117ccdf2dc2ae3cb60354ed74c6bc4536091a8b920cd1c4e5c52487996617544d5a8a26e98ab20cb384c7431167c2589fadb4d4fec55dc8e9fc5036ef462caa3d75819feffc4166d7ad8660b83e7a4d0606197028926aa604ecca1a2b91cbc93323b0004e65ab74bca6b7f1bddf4623dea9c288ab71ba9ca2934a43f49b7d3e2dced5b70ac0cfc82ae9dcee2741130eb77ac126a4ee8af60211fa28d7fbb8f85e5c37586fadc926c1caf53a2d74b515a665e2ba0826f3b3d934ee7691eb0f7d01aab51548152894183ca1ffa9b14eb8996f88d7fd23a65c5e4ff274e1412fdf24ea68f4a9b24bda53562174cb3d6fc888ea991defd2e458768c734192400840814d3c5915f5900d6c33ec681fcfea06da7df1709d6da5918f875b3b9873930aa4cde81a832684b7e31aa6e6f74626ea28ef29bef7a53a7c6144a329d4677fa5ce2c85879dc6545fe4c7b473cc1b5b3435bf7d5030003dca060941760fb9155cb19560581e732818db05416d1b8a6cd940db28eec638bc38fea5c0e65069c842809a9a824ca09a6ee02df67221f8e3bcf63f487ee76cde0b925ffa300ae94ba782c683ac260baea4b52d0ba07ef9d94e7f466bd2128ea1e688f344902e682ffb12df95d0e24ee3d4e43b98bca61d50425f5d18155821794168a5f9664dfb731804df83486b263a6110f8ee2d8836fc8aff54f6a05e20b7ba1705483fdab5357fef828217ea15426230099a3efa1df4ee39b33ce4290cd563579a1e38f58a471d20164997cdda23b8a68bbdab94f36b7a0bb3b7e966642442d14f4d9ea652b1f081f7427acb161c7132c1166ab4a205d4a55cfb3d5a0f39cc9008c3036a86b472bcc4e97b981340fb6dd112caa132dbefc60b1a37e68f6e719a8c8dcc7cf8b5238afcff835e2ce7b04ce28255f2dd36e4f3cc2f90471627e19322c17719ddc35b4cf36aefc6ea87ca970559b205aba29b71015d04f789ccde46b881ae459e885e994e7998e78b6a960163ee53ab798ee005b464e1852fba1b1d1995940f8cd7eae3f83c0b4ef0494932a9a16e18830be6bc6bef5685b1996f0a16b3cc01c3ffc18e5a7d89039442e6d095a05a8a2348e05738680b63983f4627225f0c5089d659134b75ce2032033aa60effc386fbacf71806e916236656b04bf0d24369a86e190afdfecba4aa6256bba2e770315ff15bcc1239a826e8cb790b34706c3021ca92d5cd25de422e0fe739ba6919fd6d2ecf86a842d775987db8fc262a8edc9345d33116203a05ef90013b8b3bf4e227e5af84fe95cc63a90f96bf7cc10352e842b34195b4491ceb73d773dab85baf67281daf732afe8f8090f52080bb9213f8c3380ad8c4611712da7f2a782233058eca8d43de375c1db1703a0d6c7b86d95b4e731c207e5b6a80a11e1b01caa955ee4ad9c9d33cb24351b11dc8e918dc5fb5f76afacb3a74a22827d96de2f3a560a0a77f822987aa798048ca690288aed03626d54a2cf7d7b75222d9de12b7d2f0b2f171f2536433126647cf0989df5882eb0ac00223e9aec8b2f17e02ae23bd912bcc7e9d7312c64e5d3a65dfe6ef50e5589c5aadcf4ffa89204a1a19644e8197006d5e537026551cd7bb5d4e0b7adc942e45d3b21d87484ebf899fbfb7c57a4428b0e2144eda61c31c63745fa0fbc1c39a1b6cf1ada8a3824c9728f27212444d2771bce53ef0943424750dd8419e97ffd880cc5f4a013d78c251a1945a4a5305f7a93496003b33097f9bdd84394686c2af76978d8ca1050b51a5041bf31e6eeb98d68972f9ec1b9daa42897b942bbdf1cd1ab698c5f4d1c064daf65fce7876e720df17e4e3abb047ee60eda7892c364ee00a197086bf5d0517a0c6a2ab45d425224f18b2d2551a07b1b113def125aeca957ae017cdb597639cdc89770df8ef148f5ed29799bd1d1c90aa0410c2cba6cb8ce5322e0c3975e7d84e055549b8da8ad10c802b229e898fc3a28d975a96a739c6b5a08f0bf1e1b563b090a3499f855a7b6ae52235637b2251e08bac663b5e699867a91c6cdde4a52b1c8c7add786779fc9e35e5c75f5fdba416aa77630c1c345855f7dc2b275061cf3f977d6c0dea72d139aad20f9b0899b10dda7dfb6f1c06a494c149f800040bd62fe459a23b936acc6186044765d8aac7fe752042b47ac411e045fd5e422693cdcd4264e5682ffcb903544255d48796db90d3273a0cd3dfdedda54dc76a1d93101a914a76977692119c39679b939b4973a4ef8274886d8181d60ece0b2eee05818ffb524ff40cdbc3a133a9530050a92d514c0379659a2ea3c8f26f742751e04f43ab1defd2c8086fbd4c42f4b1fdd5a0a335f2ddc740e066d3b40fd2a6cd2e7c1a682894a4bbb675918597a6fb205dcbc72be6034e9bf39173d15dab88c157063393509932889c35315f8a54080de9dc0383775b95eaa6e53da3e2cfd3db3ecf9106becf2acef5a932ad9f68450a197f38577cdf94506097befec5b8e99f3865b53176263cd033c1f13e0c207844f0f92019864050da476b9620e65b6334e7d0df3316fb0b90e5555d81404764f77c8927e1bcb6f7403fea86f1a5cc9da604d5a31e41b6f98d7bba851535b5ceb14b3d2549c310e8b2edc00fd63d5a1926ff94e22adb02525fb544667bbfc8e473ad5d25272d559cc280018baf99d10afb352b5672e13dba4e548c2fad3ac074c5a94f497324419b41a07403186065184b459108ce34cdcc3bbe298b57bcd3d1372ebd51acb8aedb7bbe3cdd79bfaeb0d4a6bd2db541a96eae7db97f919a646185a3910ea8831743aafd662960b09308a850e4d5a561f36be8c65274983b45cb10b7ddc10955bae193c388278b4f37742ae3e6019b92ce4373f71e1d22fb261017a0d7348a537ffc447caf4d7b6735c0af0f2ee94b662cf9d6b2ab9c4354bb978cc77bbc26ddce45da8c92d880140d2f4d30909b20e5b4a5407b05bbd2bfabc4e3b4bb614d08bce4ac135e124ed159d03dc704d1210ca8bbd0c60416bf363a5e6ee20f4537c8b6a9de124c48f18a7adafc33dfd362385de1f15143cd8dc3739a5341b87fc674c05ce287c9f62de9e817c153302f5fa292a83c52e75f34cee952c63a5aad522ed400ae42e80a6d870d47d431684b2d681db222a0434e28079ab1c57525f788a9d0340dfae1ec5e936cb4f44e6d7d5346ede22fa460c7e7965b17bc8ed1996fdce34cfeb2e8877460d4c53d9224d7916cf5a3ce5e7f01e089c4af0762c92e2649f2dc9846803d610812fccde96b2e92af761c3420155d31ca493a5ccb993b0bc4dc5b10761adb4a407c0a0948a2c555f0b456c52093c5a8221592c5ec5faf0a97496ab1e015c47167ef5da0e4ddc0a917efc09d309b4877b0b1b16a7ef05c382f04afa1d16bf6b98c57059564230078a64d375d0f2faa84c887ac3d90199d31904929c10e283e31f65a6255f3bcbcd531f9a579c79774a06a4514e551b79428057a758c9a5d252dabdf12fb8a6f64aeb0a2f072a249b3ca0be8f97b0a2f04be08a02cd7ae196687d8a203f785f8036be6c2cf4231faeb4da9ca06d465ca43cc81f94f0765a1ec5df5c4b1d8eee2e522d1236cd69bda82687de7a25e8f1769e2f7dd4b6dec83047e34ce02d8c95e0c0b9552490fb9f15a86638ef0fda5d4c5914bf52976f138587d274545b44f4472efa6744117752b7ee4c19adb05a15bbca363d01f8c1831ad0cc35e3c788585e7174f375a24c4b482bbbdd9edde21a3b83a760f0525cfd86ccd254124b5029d4d30759877c35fa2097708c05bc9d079a50fbf0cab9f35af2092b3860eb4493df6e42c00e64823619a756b5738b34f332a811909aa220b16d40dccb46c8b682a8b247cc01bbbf3b5d45a7c61cd02269ce8c72d28ea4765a9f54716b746c3759e1a68d0c4d0d06a572308539eb6a68f4fe884ef309c4af0bfaab8ec80e7312eb76bf4042ac1e3641be9dd81f3633874b2d3b708fe7bf0d7ae3b334a8cdea6609de9be591c4b4f5c1d6163b5b432fbb9a72bf8a0a70cc4b6fa5b4aa8fa15927ff352f74fefefc0460b7c4a3241e010c20d7897166e712833c463eb647372e200674f9355d2a5732884e190f79b3d8bea3f72744765dbecb1b9b0245151c3b28dc826c5a643da6d1340f88c80076e5facb1b9f0ee4d759eba5c13887e2a0757a3da847c005bc6bbca2a8c667681787e5ece3336d61913541dbc9afc836cdacc0e6a32848451666545d20924ddb5a68bd3118e74971a3f329cbafd67015db3b1de2689cb6eabd637c813cd9eaba64b0a9160c8dae20b8b831449f73c9ae466ea80707c049a1ec6f7a953934805b68453e04f922dd6b374fa5ca4448aa4dff0f9dfdc428b2ff5e5f1c63871bd3764a559d5aa8230cef51526b5e6dae184139671fb298d2326960863a14a88e664bab460dd38d9e8618b5224485daafde06f1e1f215e665d27858f9ec406805342ece83205dbc149a1c608fe69333652294774fb60e3f5486ede2c77958bd5c09b726dd979afca350ea8e3cb9106ba702f43c9d6322d7224b5f81f993143afce073f447b5f4cf74578e3e6e5569518c5285b4049fb47f2f51105700da44135f8bf4844aabc5f30e8d021dfbc6ed28964c5357d4e3c13bd0a8fa8a9f9fdab5b98b75a96eb0a54d52df90f79e4357b2b2c458455801efb7a2b86fa04a7e0a09583db44886802453d05f64509ca06760d5ee45d07627b7dd4b7e50d9d6da829d5bd0dfe64520426bad2b5a638933ece6e9982518ab9ec2198d94dc10c937daf8286cb777fdbf8794ef235e14e9993b46287376fb8263b7d440ed43ccae7a841745718a2fed74fe2b68c72c15e9242d8e350f9e8d1c1da7976337cc43d52161a2590e2359e4438893c7a03f70e85944d060fe530cf282630ff140e05e00b5f6b89f259204a0d0a81b95337062ccef0a57c3d117f8b499dbeaff3342f7fbd7bfe52a4f9ab07271e65dae9ba61754aa235469fe9d5bc15c8a6b9baeaec2f4bc5787de1affad3c32585c8480f41ba28165043eb928def9d6cbb9a6bbeb4fd959464ccffecda7e1fe9253e30922d9958a937df4df86387df4190726a5104b2be26ab1aa3d30f6f6a19f3af18b6f994954fa027be86b2891d11fe82ec87e68264683a5c5c14ce5477918df8b499616a878da85cca0c19cd4dd3180a95030078a05a50644cea7d9d0869bed5822b1f85dba6717f5326c35961963f0eb12c3ac33dfd8430b6df699d8838ebbb2b015773e387f1abc807fa6ad9410485b3fd9a144acdf4747915b0ca2d916d0cb400821567f71c7d26659dd182a21707446b0b718955d0e093938ff1663acf8e324981c2ee7ce8ca0756c2df59ac22fac6a31ea5e1abbf7e9230e682a8b1d2735d81a3eb15399aa3e81c1389b5ee4e4a55a46127eeebb493ee0b0ed9206417eb0212470443d93f938daec1fdc61942f34d7cd1645db8dc9503378f5a5dc533223ca64c9d543fc6d1b91d5daa3e87746e4206702d48f1d5e1510aa927981eccca7b272f473ef2ecf5040cb09fa39fa3999ee83b12ee43f70b4f992a2e7629250179b7bf49c85e09e80289e874018430bd4eab9a9a6ef9ac7da7d191f12e49f069bd9d31defe918c7b70f2732b50d883e7c49408dff0e323196e3b30fdb3c610d4d2d4a1df169d1c4f0b72726914d21d72e308340de7148f59c4d946468193018f570d70f1e1248c4d0ca7da958925b6d77c5af7153697e4c51e4a9450ce85870794f3c256e1490a87e4cc49a745c2ddff82c5e9791d64b75ef83876d0d10b0da6522f669f0bfc6462b571a9720328541f29fab27cd24908f29bc642aa57e09bc6cc0114c84a26c3d983b4766f671ec2d34554ed40f6849dc32c9f2a2aa8c0e099e66ac9d702bd862f03b623e81355333d0a373415de8afcbdd9ea649b5e0c5fd6b9aeb9ee52fb07dacd1abc26809d4365b9a312b118773a6e79c51dbe76a7101764da444074075d78a2467c61ce61fd11aff4981ac209affef9b7cc9905c5024957f436df797ecead930aaa54389b5f6e6407b129b94d67f8c25f33ea753dcd136b39a8fbef5545436a1a9ebc90e69cac33f8e5e52d5d0ba0cdff2c68897a1947c604e5bb71fac1f8ebdacf436e59a2365abd9dc639776879214a2af1b48f08e3bd9ea846799419773358b7a0d66bb217becc613eca67620c9cdccb126bd23b59743d9d465a3e53bcf7373eee01b3acb9082d406aac73d2c0fedee3ce42c73353b257770b136946e98c914266bddbd7e75fd18a017d7c34bc6eb2ff6b956aad763ef2a28a517f37073d3bb902fd5b4201764097d2931b36e6397f978d0c7d234942cb4f318438ee856f79e080d38487a33e880046c83b8f4cb8af561eab92888ac4726b6c1e50b3e9af635658ff2d75e3552677f74ef36613bffb340dd0b944431b44b0015b488584f99d5152ce2863d9738e600efb44b64bdfec934b0b490dfc9f2eec961485873d63202690fa0e40e43003544942c924118a1880839a91d68863171ed7f39c25687fe9c93215c374ca6ff1593d796b13d3b24bcb8454dff010d11d947c8e3127a5af496a2f5cfbdc5bb4a484ba3745ac1d08a4ec6ecaa593a83b75ea6864403827d5113cebd9dbb2328f6234764f506b47eb6e64aa3062acd9667379dab408722e739862b92f1dfadb08ae34faeae1d879a056da8bb15c0bd8a9e793f650d75160d6110e18215ed6b9e9a32a5306f07168d9a810781a9dea8c8f056d499462abc1202e9f720982bf28db73a2cbf65cb0d096b2968b15201e1cd8713b1c2cc91b92ba8234e4adb1e732c9e32a3f16ced679c7a6e9a78183b065239e6103a7bcd101a53dca33429268f689c464b69de0671bca536b48abb4558504fc645303f4d6438656f6314d7c483a3d0fa5400b74103284314abcb5b07d0a7e7d7eb30ebccde8dcad9f76c0ad1289b6c9ef6e8da81877b747df5541a6cb312b53a3f738620b069d2b9404ab6fd31ccc290faa873b6fd27ab660a182542c2251ba7155e2cbb8813c1000e56fd639972064ce7bb817dc550cf63f1c23f116f79db2c6b2b268fb6ba2319d1ba8c6d9af7a83cd2d56bef16c7ec32386bc9b3f51080146170bde7c72b98f3cbd4b7e0c0496388717495f2f0db83685a877a034820fa03092bf22634b0606e8c5c4fe42ec2f6748b7455489ef84cda5b3501148537f547d59725906112838ddc8c7a6e558eced5a97c989f6c04c376ed6dbb3a41e17f79fe99bb89c9071f88d9903807eee8f00934218b30d79168eae53a37eac411daa3ce5cfa0183df7c1ef0719be52a0f8464a66588aa8613564fb7ef20b7996d5cec485597f782741da5fdc6ebc813e7bd180a7cfa81ea8b4e6b1cba7ec5f0778e40288b91e076efa32215efa5c62c682a937f59b119f10fac4195b9ddc1be5f866e4b9b5936baa7b152e0d1545e85a58051c75a383a4786dad3b44e29e07ef9bdbb7b3382a0384b58ddedfb7e9562f45add2bf5a7d7bd1090d7bad4b60201836aa9a136ad42480b39ae54f814bd65443e981dc592b1d2cf8a93bb036bb3e790c8c474a43add8801bc5e082e879e5f1c7dc97cbb06117b81815c3a11735cc00f761dd2a5c52b91084d2c2b2f3172636944fd412b59a0cda032c5ce5088ae0696015bfbc5ed0e616bec3fefb466e353a854c2833d0f28d88dbc11d0cb5f69ae3489b5d5b86f2c2542bab6fe77cbe9c1afa889b8c2e470d72cdd59ef316406129ebcb0c0c84f2b7942040c269b47e6e335799cf4f2407167aab3c9e2d41b0cffd249459b2eea3d6c3320553bc97bf289fe70a32ccdb60debfec986e668877f608c6b4467f0cbd15b51c7bf9cb77820bd13ae2f6ac8bf884e68ebe389b5519ad0c97f780a8f723124c26c9e1296085efb80a2e63b74f7d2f83fa1dbcb3b6e9843fe173cab450ff69b3feeb936a65e4b98244424e0f3c91ea48ce4bed85fb00bd1955ae2aed861f93b15a76e6a57af99460160866c3f8d2dd34f7bd2bc00796448b072a5ac4929b14f3a65cbb301232b3efc8feb29205427b595d74137e479dda3a8cc25e09ef418005d8950a3b830c7a6833ac40c6c30ff6430beb37c63d9cdb31b5ad95f5e3d3d3ecbb8a0f603f38083ca86fd5b5f747fa7ffcbfd9f58dbc631b00014d1695f7ad8a0a38d9416479c440710782531401934859b314f19960000b99fd30806656892ebb4db41691ce181c6a501d6595b53f9d00b3d2b3445dde3ad01e62d2556215e16ed3ad7569092d0b4f2baf611aeb352ce0a5316a0ef47f4676362dae2f4f204a2cb6345db7c5d7c231b83eadb34367c6ac86c91a1ab618b1d237c30958866d4987d4c7cc2847ff4300e669ad4aa589a4e395c272420e2ceb35656ccfce5d2bdae932f9e726b55e83b2c5dfaed740679585523fb679cb65bc5bae985a6fb680b4577fcec3142b0fdee8d05941266e9962791e29f0c72b0ac50dd02f7edf3e4798c026772cd7928ceb158f130f6a0e1742bea7b0681f96d3d1f053efeb65724952c2995e39819feef3d73d47f8f67c915a12b9ad461a49fa7120687e2dbbbf7538021fafb9cb79a05b8250e05207d4fda19e57bf7ba5384d77ef7318b6433d689717fb1ceb790e95032e71be3bae99f0373a1be08cc76860d03263dd39282be467f81dd54130e91cd32e056a27df2c0f9d2ca0ea686075a602dc23939f3c1b70e0b1f355b21e5b17c10fb519837a464e0eec948f57507715188e54de1a4124bd850853a928b6df3689befd6bf0cf3e535af6dcf5db4a246df20e1b57e7fd6d43164b8ee890021ca950b3dcc55f46a07b771991cbb83d7e3bdd48dfdd9bd530e78f8cf5076964db955938e80babf1e9e2f87d642396c9a38d79f9b6498c994a3d712113c792da024a89c65d13ea74114993d4daa8b0aeacef63c8480c1228d59c144c5e3c7e8b1e59653f60989726cc98cc53812561969431647f5c693db24ad6a98147beb5fc1d903da407086d923b0710e5b48747c6089eee262afae5c0e5729cf28fd4eee1d570261f9591009d55b78c7cc968fc2c643a7cb68a60784c5a8fa1eda87ca7a46cb4225d2865eca254c10897ba70748f2efbe97877dbf8cc062ed808cc94386d7ee28c10d62b55a78ed493d3b1588f2a32db0c076a99514aa880ebda5c8ab66a63d33fa5903820e2461cca0217b574f310de29aad4e065492fedbb76fd84c5ef897843379b055d3ab4b6b51d60b3a7c99c311e6c2d6b947d2dd8504be74e52e50f9d5fc1d0a61bf06210664065366f37c351d01602d5eebffb2564315afa672a202d29fd57b115eacad5e4941b2166b106820fc3607e0395d5cf41439f5054843618e282cab63229e0f561ce55da96744cf5e9db6969cd1f93ea07d2c714df9227b366249f06d985b96157959bc53be9a0b38dda023bc924d9e8f0f21f10db5e432116be7874a299e811d982f88b28a89e4b78e49acbcc1e6ee6f0bbcf4e6661ea5f2461876b4574398060379a1245204e4cf0b9386680f66b00fabdcb3ad0060d55846b1043661694885f8c37c91b52d166a3284a4a4c5c4225e6440499265a5cb6bded94f31b6b99322dd92c02de8c4ab1d68e38d483b1c1f9a5a3c90b50fc8c271cd5d7331ed65390d2ab3c3fe114b2fb509b342ab073b38d034a64466767765e4e83e09929805d2367c63e386d45fbb828b88103ef07f0f78a29fb2820c9cf47e2437801d2212c115772cd3ba6e860a811721484f1c4f6946a69bb01f9faf1b66982234c3d9b923d70385746ab7ba818df40634a39dee7bffba506fa85304f7151f98143368aee8e3b4ff128524c0b427debb25b1b70332bb8d3391d343226efea3149e4b127b5507c0f609a44f0c429d16c78cac7d7368f3f3285f52ef22aad6ca40b767790541c95f3976ea6758d57a563198905a3a693fbb36c631000dc77b951add8648efa9dbc2abab75e635e19a334ecbed58756a17fdd9e328ab2848ff214c37ef572d1d25f9e17f5ed597345539872eacfd336e7ae2923adbb942c85ff472d374ccda22156572bf4cad9dada829e6fad55a70d348617db332a40c69a4860d141c23bc05c28509da942b6d7f6f53d24186fb28b9611761c9b9a6879c41e6ea1d919b54d1f23e9787f5012da6e457a875612e61bbbcffdeb48df46d07b1a87ed6fdbbbd1b5c41bcecd0c2bf05273a5c7d7f5ea9bfa05713840d08f1c191e8a8b893b8d5b98b06f06ef637e7e0f91cfef41f95b309761039be3984dcb0cc417083cd78499b48de5c87d6aceb9e2ac4036913b0dbc4cd8c630199ecca708b0e3b3411b274a809beee8ad6c3c1f92b28ce4c9e52cb3f9cc3345cbd49d879701d903ae06a846e7da73cc75aa05079914453dab9f426249f7d9da279aedb9437da97cbd98bbf050d9158fff5fcfbc10773a60744d77461b22499e972df97dfa4c654955b8aecebc3b57373a126f26bf8c7c4ff53e47ebffb9ff50b08ca8eff84c37324cc914f901c60ae80b7364f658f511bcaec820b0868074723dcd824e80a35d3751875fba3b2218204d2c9bb278b4d26f1f218380d0dd928d2356d3badcd789aede732aa32cf11babe1a080cae05c54fa228a44affe1a6db046f5d412ce4fef394be11e546a68c736de079c35d5d071a976217a7b30c5a8efd9adfb8e226c59d7c5126b1a70696edf4ad4791d97964ca138eecdc029694291cd6b5759deee67828a3290ab01142d26e0cc210f680d38cb998bab49be0c41d22e568e63520812f78b772b0e7cf56a2702141f22b55d2521fd02dea2e171100ae7cf0edb3f2aff071e359ae5cdfc2642b7887316beee567b00f237d9508439f3e3d0ecb84e6751fbe7b1ea72f225946440d0d9e19cd3456650d681315e794ad5a55b60cc3780e00e8abb3b75c59c889fbc877351d0df6dbc31f9c8fe245a5cae20a4a8bec54cef06ee1dfcba8a39194ad5ced22bcabc48963b87791e1782eb89e38479792853fd9aec283c88174b6c785fd4f9d75dbfb7603226d180cbee9413be4b2faafbf5d061041865219430282566d4a73b10161fe44b62ff3b56978c48a7b5749859c39d8d0f019995743eddda282996ccd4a19a00172fcebdce385259279b24b7c0817a2f6c85d9ad899933fc4633af9473c3c1f90676017851371f05dbf24d3e4908bd3e9feaffd2f1438553084aec7b64ae767c18dad08ed2fed274ff80ec305053dd79e8064061c61199505b0c6258a670212a1154c972d44603c4ae2aa2d69e95d1a3de52d684625825d60cbf64133d5ae776fe6634d7f907a3f068f98c2ec245a75171dbc82f29c844ef1dd85e1fa97f8fbb328155b1b0d688536c7450d19c41967f97bd2b63451e890c59c581fc98b993bf7ce8791b7b89d30a4e48149e785291081e62c88e2972be7cb93310cbd7736559d7b82537150037e8de51cfeba7072b7c8da8135e19d7446c7bd406f20838a2b6d2405d6ca1e368886e751d1d0e3ef0bdd1213bbcc0d014f780a11c831cf4c4ce6563f89867178d30044dc342074e3b261584cd96889fbefc617e06e8921b28e1d199be8708d6795076827948f4ad0584cbdc7e09d6428836a76b8930d037fed7cd71f14616ecd2f0d0ff4b9d15e508e9a9571b12130cfb1e204050ebf2888bab310e6f1e1983539730db1222787fdace23392e2f1b61b637ba56e284707710909c384ffdde2d3aca29508dcf933f684a9b11e1959d93077da979c66fedd16a1a00d21240f5ef0d9d7c036c39335f26b1668a1bdc725a2996560e0a70a908928cef08b0188697e0ee976d2843c2093a32e5a7eb8843e152bde5f6fe037262165ed154077c7ed3671c9c7c14c2ad541815413e189023f4d50e55673b4daf7d1113e7357032eb6757a13428d0f3716f609508bf9542eba5bc39c2d125c58c8e6fb0e44328245b6fbacbc50007893ac96d456e04a80ccd0ff105f2502910734dc21f71bac0f42cae32727e47a5f34c7d1b70522cc17438b1e495cfb7ce738a3288287e6243211f89d8f10c5fae8864e3ae46e372ea3850f84e89fee3c1aab46be966611d60f855069d5eab813b4bf1fbf938b4a7f4c7808983b0c360b9dcbdf91fa3346f36e60d075fcf2d1e9c1e1006528d5e7c035eb9d2fa1897f90f4240d2ef6c7d6596f244080262ca0d3d53dd0ffe319bc64a95f9466e2709176ccfdfe5ac0b0ae743849e04f63927fc260f667eb49676d031ff265ecf5c3a72c94ae963d35e54ae8e3a135f1b789f03ec9d02545477e33c865392bd617f83357f5ecdcfd2dc8038236edb7dc82e808664f379e9b45bfe9b302ee9b841ee752bdebe61242d5f5d545b87e58e79fb4923f437ea3f3d559b53f93f143f3ef0a8fc98a6b9a28386b5525822c90f9cd8cbd6e3e8619c72a0bbedf41e17459e2d1aeae0523e012159fa1a28541f2c0cfdd97f0187a0e1b2e773abb957e09cc60d7a7df2e27eccc3b2d19050c0c0f100f69beece1d5b860684dde8d7d13c7f3626f246798ce448e548c08d5ebf2e6622f5dedb12cd5cc23ab3583e2746a8ef5708706e61eb8a658ff4b8cad8060acf8d6935ae097164c777eaab9d8b8607938141bee37e8bb9218c84c47a9116178cb8aaaec9a836646a3e647f3064c5d962db2ce9519191904c71019b60921e17ba4b26e19cdd4ec2e51b038a366fefed1e6bb1b765e62f2c7caacd228a79a5987b2e41779a226a1fa32864b09ff6f9ec46f2098ac1109f2d635cd9b4cf853e58e77ae9d061c5cf24943c255e090a230967aa113b7b7d519e68f320b2ce5c85db5ed2fcf256e034f1ead18ec42552a2adaf431cbb6775ad932d9f3d44b6902589f6a8fb3961ccb305350ba2feb605893ae56cc243b7f4b8a76056aaa256f2dfd8790412dcf4a54f15926ebe7807bdd88f19f2d8ad804e16c210dcee4b6f20dccf2931c7dabd5d2a4d05af9deb32382da72300ee2421e1298bbd816cc441a72e187a695d2e4cc7aad561146c294be18c4ea3e52763fc2abe36078d91f0cca01de0d3834a0a08d6059add3c34805eee1d2a5ef0df9bb56122b24fec10815c682cc98380cbc1b8955fc3cd5e06f407c6ad9c416e86e50daa1c0be3f0c9b637fc3bcce895dab3a04f1e5135951046622ac7b0d9460ea01106b49aaff3cf3ae6f18fc060ecb740475ad12e39040ea33ec12510ed602f46947f0c288af0d9202acd3da5b23555ea996bac3835b2386404a34ee484da54866906b1a15887040d2658858887cf32e43d98a9bb6dbbd299d4fa495e5e2ac719165e34f4498b3cb34dbf6cb65c185d16559a04872ac8941a9f595072e6a5c3d0bcf5ac2808a98cc9062315b9691ecf60911d25ca839368af9cb8b5abc30c0ec65699a693d8ff5e00793399d73c4f1a0bd07736f4a428426e9cae23a3fab9b2c26789a60f83ce9415525e9ecdb2f87db8623fd011f819213b658a48415f94cce476be5a1f3a9d7a818de035acc00cddb142c64de6098231793c363abc6e785064baf8afba580dc0e99937a55e0050ce5252adae40383ff7e6a3575198a751647cf9740a91a4fec7bb50d41bbecc398a07c37fd09323e6fa7cf6d2e0342e3f9efa7ad55e3170626d25c44d5929b7953ce68f5c54fd63b5df9ced73e36686c2b8a2ff464cd702b60c1cbd44cf446b1820a81bad348d30df302fc9afc192aa802d857f194a11889e409b6dfb3ab4e2ab4690c0c1fe3e43de49ff64c5302ae76f4b5c9ef6a9c2ce44f3ad88120d591f2b66cc8ff466db11ec6e66062be0bc0f3c8c1da92e20b3314d4f489504d3475e5f0fd6fd95f5b708a7881ce9ddc8020cd7454a184b3a458f3cefe09ce3e955bd146c73c508b8acbbf62f1e96bfe3c85b09ec7f5acbbafa17a1714be7b803ccb230575948c3853b0105c2286d35bb6a85033cac2761f6b16ce5b60f45dd015f677dd2fda39eb1ece3173130d8b5c4d1f107ff9a2e4cc4dd4a84b30c7245a534d79747fe135901bbb3c76fc5d7853de9be3255101a2b6b1f4767b1670a9b1738a7f2bc7f6636e911a75cc641d4d0132e679da5ca28e54126efa3a2c56a37eab7cd17c07b4a56177d697c40cf9050d728ab74646b11d236dc5ec7f7c41fbd748f36fd1862ce97c4bc887357df473b143c45d5e4d9883bb177465a9eba5c74531fc1635ca31b72177e91d11113f7966bf25059ed50421c842e3efe64a4d0e187be0faa48fcc3e22e6d52187ff0cfc03da644550ce18bc14d009f7bd474e1947a7ea4ba7eb4ef1cd88523c8fdb644566382bd9740fd7d4aa5f5bb169117ed8b30d4aa337ca1e569007b2e1d6697ba6e9b0459d6d2105d14a9eb6e16af139861577600f3886e386d9a2abdb4c4fc86fc74daad875d782ae21f2b9ab8f34af635c1ac9a8e36db228cb8b4503549dbc1bd77193532650e19a23bdaec5ebfc21eff5f04cca8771fff33fcdd89f61d60f25449c27b838bf7cd5c9dc469480bf4adef910ac878e4bbf51d884b96e7419121b9a44bdd7c8839d943145a5bdf5b65d11d6b4dddfef692571c62df169a53a1d3e06fca89658a97d4b22c31ab0280ea46f6dbca91f924459807aa96e0f546eee52889ef74f79f0cfe7a9ee61c200cc8d94e658ba73016d86a14557694252bf9576b8c1ed7da60e948c4983cbeddf4634fd57bd62066378c2a910ec59dd75ddb2022fcf9dbb5e6b4da7f7386e3e976137e3ffe2c64a52827ac28628a10a4e3077454922d730385bf8e133f592a4fb8a1a24ebbb91e00cf80ee09f33ab60b604e8e97098410261788b4881f97c57f7ddedf92ca63390bd151dc5092137433c558560df52086df67043243f654a7ee58a8b710d6ffa06cd4d41403c765a2c100391578eca8ddf282dda915fae84e34d0f01fef30e670d75b791cbb8de0acb20df224f533f0615b991f4390e7657d473fb9ab2c0fb686a294dd347da9222720f386705633b9f9e3071130fbb9b583bc7513edd93c7173e61c0e2ea99c246b393d5cb6cd386523f458f36d0e185ecc3ed60101bc98167fb2e326844ca5fad4e016f3f481d1a8898c8f6b007cc33cf5ef482f62ece2737969ee5bbd1f52251d5d1171e5a94c7840083d80145fab51e4f957fdb81d76528814ffeba901c56263888a293f9a674fa2199fd35ba6b5163ab351815429ca995d6dbdb73bae4791f3f7daa68662fecedfcd151797a9e0ac7e33d89d6b1e5968328f289f36128683b9aac25c9bb84943955933f9a7182e2d4fbda057c8bbfe71d8f8e7a9f4117e406c051a11f0b510ba1653768f0bdc3bac644374b6d999e2896521a10b71cc5f4e4d1a6ed98c579272c11ce06e9b778134d7d05b49c6b9071f23f4185fca9759b473960089ce46d2205bc6a693a4c0c7d63387ecb56e25ee4d7ef3e7362d0d24f82399fd7eac98f342441434007b6d6c3d49e60feae317f8ba8f571f36d13476282c9faabfdc91a1a13271805563e6d6ffc77325d61c6adc99e5619bcf90fa98d7f1e8726b5fe502825495fb1d64a42b22e775385017c723cc44bb16ab8563e1f595792b505deef89e5681eae2a27caa8529fab1fbe59d9ba872907e489a044308db61330d65120aaf79db003e81b17e2ce904b862d373ae0249694c8e5a3139bac9c9b344b1af8b6f48315e346d0eec15af22e0d95d7009264ec5a8d644bb96c9ecb7b63321a74b689662888dd061afb8baf7eaea9c69c930c272b5aae7b326639b2bfd75b142d28a85654c7fb8b23f43f0ea0f5fa34a1749a0025870aed7937aaffee1164765caadee8e812d2a216a8feeadaf976ed2c40a07a34b6dad0eda16f14511e04ae5476f74abffa1a4c063455bfb961ce89f33b8fe8cac91c56f4845a3df1357f396e6e82b210d24a4f4c0874c7d81a079d4c9871c145d92743693f3f8e822d3ed1f21b1964b9660a18986a2f30a342ede52482a7b57ba42fa352c44215fd86cea85f1ac847b89abd486864b46bf559ae1004604bb5fc2b190fc505773d6578382ef1f47e74166f16f8924db6777531e53e5fbef82d8d48e8b3f2d79eb9813a4a0e1f5fec614841d8ad3a40ca349bfc8b8afc05042a4fc0ac2f966b50df1b135fb20e8ed302cac2398c2ea2461a065310dcdceda903455ee1adbbc7e8c5b82f2a0ed50de7b52997bce5474e45e4bf153b166b42af03db4e4d099408128e3308cfcc79461dca9166c1062d0eb2a961a0372a4228d9f2fb600060268deb68576de585225b307df4dbc4ea5f18d2160459432b469886ce1411edf9d3b45161d40f58f9097941743fa6973df2c0078d47309fa3fd683fc428892c83f0f8a521f325adc4ac6793cb71cd836e19ad9e6d830c8940cc13979cad4e639ce160720f0b2bb21c7a751254917fb66e3e19392ba3a6e9faba5eedd543d99ed5eda254ef528f11ba80e2c5bc715aa176e5d051ba1a694a71f2e06d42264aadf8bd0eeea6a9107c4920a3c509eb83b195adc6eb2fbedb4401c2a7304343e7c4782d958c4181342d4eb4ee715b581f14eed62aad09f61d604c3eaa25b2bfa77413142d8e72af6b9fe47ba453b60d8259bb13a458930f31ed41e7c73a0adbe3b4830f84f51a9757851676c6249759f681f33a2a94bc07e1996adb9d611584ba565cd4b11d643986e16ed3b0fbf15fa696ccd6e555122ee6593eacab5f55b6355b8f80b5b492194e199a8d12fb0b68e4183983a3939e404e4bc474e0965afddf1f742e470de17b52aa51dad970d556ed1ba2306637e11b24cb8cab65a4344f3bca05bb0800199a2b0f42acad4cf14a88fad714a50e906cc04876ee39d209aa876e5c054474903c81e6a268b1a8a995462c7553fadb050761b956501b70066ad7ce9a7779be14107f8113557bcd7dd31deb62e8dec6d5a68c0ecc8f37fdee91272d365f0a3ea9c8ce18a60b18b02368dabdc2c9da3d837676e171970c0ac97651ff3ec8eb4ef7c9eeb4757a24513c08cf6cd2fc73ad314a36f20640fabd49bad8371de4be313434a19d71aed64dbcf37596113dc476256e2287afdf257a74bd9d335de91776229b1aa5b5e9c0d7f355a34a4ebdf8c8d09b161ed2eb16a6dd71fb1cadfe66a0660bd160ff1ed4eb0588f2773ce7befc7176f5dcc59abcc0fdd90fc67aca88e1cb255fdb7ecae9e447e857bcbebad069db6051d2701a36462c041cce896ce48c1c4bd0a34f3c35baec3bd33dabfebe2a5bad7239f946476dd6bfcc21fb0d5e3a8c8e08244b2407bceb81198a789c8b189c22d6eca70378f89ba54dcd4f6fea9f419a2187cd9afdde7f9f7e71e8b9a8b4b9fb20efb9f5326a1485abb054ba2b46449abb310f9c647db3dd0c832078a0400c8a1f0a90462851694edcd920b72bb1e12dae075ad3a053aa6a92c7af814b552b2f0101c4fc08a68455ff21c189f1dc7956d72f6b5579ededc7f88fe4a23f712c2b5acfaae71f928bebd2db1695a04b8bfba72dd619c69f68ae5377d48fb34487cc1be23dfe0468abd24ad388bb00c8468781b389683c8d4105aff8ec5fa9896f0224bed5cb41af7c8badbe0de43c9f96230718f9e8d41ea82f903bd6081edf1a153922b5e8105d92c4c131f37afcb82b20d36518abc1253a8b26f882f2d726963c7d23c6437b23675be4c4c44cb2cb84aa2bb6e34f84cd10b77147875d5524e0ffd7bdbce61455b7047e3be5a3827c56fe9fbbe766e5a04faca13ef48d40487f4252ecbad5060c1462e09f57b0f5502d3cf8f6fa66b64cc11267bda50be6b2e69d5342e011b6ff06d67daf31dcdf82b81c0ab4f21f55cea312f08800f5e93078a9d807dccbade81b00c038840513ce8aba77f93c36c6ccffc8ec01fc2fc3ff6978ff7fa2fcd9bdbd44fd8bbde7cebd04d9ef11747c661307a9ed6909e2b423e14b18ae0654885634e4bf5107e150044e5aa20c5ab3d266bb3d38c690afab92a35737ec1dd4d8121cefa305968593b86d2a9309de68764301f0fa423442618981aee60cf3ae49ac7eb43728f46025a48cce9d5e1b27268ba0a255ce65353450da632a8a2e81a9856b7be5925f6f073a0865b94eca44d90fdea1491da0b5fbe7804111006cb006d622b5ff5fa55fb7913dc51ab57bf20ad0ebc69a0c713eff4da9653784fee45abb27600f0750564de7f3de55e4a15cb43456833d50049c90f2ee09d76aecd8be5a93dcf9e892939a70aa82379fb771059c6a40e90aebe085fbc534727be1bbda7466a7df40522e5a052c4d237466e3a19266abdb5febf53c903bd54c359f09e0419b70196293eea09e40d54b3077291852b61eaf6a1c4ab63d0f8c15bcbad82a86cbc4f227c02adaf317ca8a42ef5f476df7489a0cd77832f14dd57ea56513440e04d61aa6342e7940a5db3991a4c7593cc157f2b50a61ef1ee8bd75a8acc4c2084c0599dc93be9524c1514518785963d354ee3bfc5e66e5c12c0eb990e6db182fc45699cb89fa716d52186d2e06c1da67f64bb633d1dfa87a20a8e6783fcfa05ee110b3e7a5063ad7192add1d7b632720ed43e6303bf5a3c28d161e02026426a7fada1dbe2eaaef971c6680b6bf08374ae4e325cfe02e33d70c19ed3c1ef97a58f9d452cac4d0a1c89d765d852b159aec23905d3a8727fafd640ffe33934645e58d115ac91339796568a3c6957f0be44ce50595d8e76a0d16b36416e5139dfa3715751f1f1b4b62a208641242d195faac986317a00bc7e29ba2ee4b51f15d5d9df8171fd9c125dc83efb293d3f6df0a159c7f7cf05628b40b0cdfa95823b8c311e7963c11e280eb5a41c891f67832785897760bed3d87b1f22f1d1f5b3a29dea0c95ee8828d13bd92ad95fa8c4a9a642c3841834ef651a36c8eb4f44441903a72adbf40df075f4ed25da57bd1bd05eb50f8705e22b8bd2482230189f09c4448c250bd7771d5dcf54413f1c447b08d155c5ca3a0fb90de9c172614ded5e55fe1895e070074a0fd550c2f2ccfa3956c03b1a2315eaf6658a87d952285a15f88ba343f650b99e7269eabf85b0a900541e7c03785c7678c0da82b7b2e4343591e421fd6814d1ea69e4161796221a7ed3f6476a77474b8fac279d728e71b833d59d2c38bb7537d9dc71bc22350b02b16c103087f781318a65e150dfa73072dbde225ec4569de29760c2bef8f03db0328eabedb7af1d856b6e7765cae3f547fe62753ba3511ba650a0ffbe0300579e1684c3250b7e6378cc3f08cc0008e71f103bd6db659d8ff164890f89adf290c8c73e9c329ce413809b6544cfd2d2840b536c76c2bc7c97878d9db1ee8e7d1838d51365cf4d333c36ee4aaf3681fcfffeca24d6c5dfdbd32b85a66caed9979917aeff7f8857d35f5b79948b2e3399ac2422f13d5d8dadea826de3eb0fb76632f5b7481ae05a2a7220709f5b9864bdb3a63011155b1fb2ae31be9d01288156551dff5a8b2b02d9e91873085d553a53e37d5429d7947df98ed984f4bc64d20dbc9ceaa9d93a267c6127b2fde2c2bf948e3176e49f3b7d2e74c3452d73fa0dbba1b8affdb7f8aa1a096f5880d801d23cd154e1ca9791fee276c763dae59270f6b4bd1ed62be361a1009cc08e8300bfdd3b0efcd8ccf3722e7a04239b4dac47dd5c97fac2bace6cf6cc957342947e75e0a942568866303ee692da1b87174664d89bfb8626c42562493928430786e8052a316655628dab0dcd7bb28a18bce74a1789ca61abc0686574748d3014e4f3dd2bad024103d98d9ff8cb2d76f3723a147f63c1afad32c5d62ffd7134e10ebfd0acad7361f6e39e673b278d119f6dd022cddb6b2f5165ebb849604c714a5390eaf42771a1fd4950533a42ac98f2dad90a6fc9c671e5c23a869e8f6ccbb19dce282d6063f3bf5d466abf81b49aa000bc1f630174b61e778667aa402bf9a30da5c7b3a06f0093bf66dfaa424dd33003409b987e04d6f92a9a03f081710617fc5606b70ef4ac14f063cba9f88905fa9bec1823550b6bb1c777c242c85930d2c4f95f7ae5caa5a5ac5b11434fc5e8943a2488d86ef1ac94d4518f9046f4cda87bee844322824f8ceb1d8189490322c7889d3557db156baa9fefeb5ef915a5258107f51ab3f3a3278cb1a6f50bbb654853e4b80682770b45fabb08a46b2be841ed97d55de77c594900aad61e97593cceed801b31c275159026f6cf7e9662e9002d8395faaa5b3516ec103142e828a73a11abdc21f4cfd6aad17075014f6a9fa9fdbb593c717822e98d79c6ff2adce372bf0b83a9f720d120ccf3d5f629a42d9d4285c0fe643060e258724335d439cb47de9d63677ee904a59715b986f67f701522aa3e6f2d99d64995c6f0078b625cfd1d70aa53c53b6f06550fe61054dfc7285e5d51f1378c1ffe4355643ddfaf1efcd4e3a30e9abf074a8f6aea9e016fd88e7440adf432118ef957c8695060329138e161fbc4ca6576d6ce1457b06fa23bcf00e19af1d52d1a5fbde4628cb30b1aff74279cc57793c26cd65174af64bf8d138cc114b465dc64075b8bd90a9a1264018ff42606e9761190001e7092660c3c35d8d26d887966bae39023d7dcbaf92e1ae84600cf90e9e2a0dbfda0daf3041aee94d685d4086e39635f3b0bcfce8b0cea155df77bdb908b6c32bffb6c6a2fcf8bc468e7defb6737fc47f546549ac11d76a339c7070ba31497b738d592f4eeea6eaf832f69ffab3471514b7104269896fa56db856afdb51a186650fcb7c89eea541c39b92fabffffff90fc7b81afb02e7fd56ad4d794434ae6c8d8467f82138a873766a5084c8e3410ee39b127f88cda1d0032046a12131b1f7efbb3e3614e12aca7bd0bf85c8e22dacfc2fdddba2ba63606d2793c37b864861b56eeb607b8d00025432df3ee49e59d41cb7e181cf3ff698c4acd6125049a9fd646858b2b7490ce06c748b18489aa5d5ff8db293e8b74332596fee972dc3b92599e40b851907d7783eba7ad5efe6124896836331d3056e3cc73004e04478ca20c90bc02ed3a9df6267066419d38b0064acb77c58be3be71bdf7ec89c9b4b97527b6f9cc3584acbbad6325861bbbfec81f76e29da162393e4f93d99d127ee94b49dfd96c8b5f58b311d204197fdb9b964e5a063ac71f68c6c1d61bf17b4bb8d810efeaf72d6987cf538e1e192f9afb1b39de3d24668ab312044ae492f197b8e279a5cc139ad0d3c6cc21197bce7beab3680980b40704e0d2b1e265245b020a84b8b6d581d3965ba028f6a49fdb02b8aa37fddb610748a9552aa020438a03e12f977043b8862de206f985f54d56479379d9777b862d45f244b61c94cb5e8da226828f33a9e252517378c05fa6019c02e72a258c00ee9f1085c0ee4f405683d90285491936e21428e9aa5afb49575cf66e70a048c94397249d0344fc18e59acd2824ccc68e9defd567e5f7713c5d53834c0d093ab991d8bc064006e3fa8427e1c1c906f8d0cd9526d5b34cfcbecdf321040a176048de922947a88e88d94683fab7fb6dae64136b670ba847c1182aae638cf2d3e143f4ebc0d94af2d1e8bad6320260acd0299e08e2c21f0b379fc63f9e1d097ad6580a3a6210b143903df517eeb46b3c665dcae8bd55e70270085c0fe109b487ba6c7da14333f5ce72ce23b6aff6709a8770c00cbe80c6de83ffca54aa687be6e04029edbd72259e8046df17ec15d237c44161e1009c6b57befe5a78b05e8fa7b41eef8291a397babbebfa5f3bbfe1811c239bbbb15962c75c90ef1ee0625f06be214a2d2152a7f7c5286e42e987792bc9a05f62b62df219e084e979b27844e7402690b6b13af835d9a3b735b7cf115f01d760634b64e6a332b93ffe03a6179c2ca1a61f4a32e9f095621439ce3c23761ce4038dc64a58164b94ebd947bf8d1050eece4c9e523486dcdf7b170a71533b6cc968ebbb3d7586db2d236559c0e85ea4b5d7766e90b386fd0762ca81c686a780a4466032a7b37cba13ed7e95bc643023bf604b608976f35ac9425d99a24f53522e89eff9116efa406299579db25e7b520c3690cb1e3b37067511760142cfcf45a7022b093e7e81759744330c8efb3b9ca2468af28a8206021eb118c05e6634ed757da9537b6dc1a7da7a7bef949ad05d8d6bdbd69ece914345be1b6446ca01449d42cb1cf0682dd2e11a9a5e8c2b7700adefd300ccf33122b9a3525dffdcc8f5e703bfc2b5bfcb25ab8d8ccbcdf9953ed430adb64a4775e3b83b1434692c13ecd87eb0bd9e47579849a5bd53c3a81b932a46c8f7691bcad94b63e4ccc9b1c5c261516746a2bbb6b9b6170bddd3fc45907dc1803447fb0557799c18f7d58bd1e4796e0f596f680aa2f0b320d9af9011ee003c2cd45fdf3c01d673ea22109db3b3ecca7f13f2719889bd7acccf207fcfba62ba98b628dd73a0495fed32966e8f23a779466022ab668533e8f081916e88dc611c90d051ef2c540b9367da015f31ac7c84fd6a99a01aff4df55459e020e56cd0df7","isRememberEnabled":true,"rememberDurationInDays":30,"salt":"bda3ddfcb8a68bfbfaa3be616d357f7a"};

    // you can edit these values to customize some of the behavior of StatiCrypt
    const templateConfig = {
        rememberExpirationKey: 'staticrypt_expiration',
        rememberPassphraseKey: 'staticrypt_passphrase',
        replaceHtmlCallback: null,
        clearLocalStorageCallback: null,
    };

    // init the staticrypt engine
    const staticrypt = staticryptInitiator.init(staticryptConfig, templateConfig);

    // try to automatically decrypt on load if there is a saved password
    window.onload = async function () {
        const { isSuccessful } = await staticrypt.handleDecryptOnLoad();

        // if we didn't decrypt anything on load, show the password prompt. Otherwise the content has already been
        // replaced, no need to do anything
        if (!isSuccessful) {
            // hide loading screen
            document.getElementById("staticrypt_loading").classList.add("hidden");
            document.getElementById("staticrypt_content").classList.remove("hidden");
            document.getElementById("staticrypt-password").focus();

            // show the remember me checkbox
            if (isRememberEnabled) {
                document.getElementById('staticrypt-remember-label').classList.remove('hidden');
            }
        }
    }

    // handle password form submission
    document.getElementById('staticrypt-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const password = document.getElementById('staticrypt-password').value,
            isRememberChecked = document.getElementById('staticrypt-remember').checked;

        const { isSuccessful } = await staticrypt.handleDecryptionOfPage(password, isRememberChecked);

        if (!isSuccessful) {
            alert(templateError);
        }
    });
</script>
</body>
</html>
