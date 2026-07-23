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
        staticryptConfig = {"encryptedMsg":"b4a9ab7238c4710a64412b2e30b2787982df05868a552f663fd01aa5125907160616e87071babab22e955a3498cd2c8b3cd0016a6a02a65ffdeeba6726f153bca8aaeaef3861b087a34e5497fcc6c1eef9a8ec2533b495ae58584992da636563fb131159152e0182be2ae53e930cbe4ef6a5dbad437ced05950c1741701c6c936e4e07928453ea29e2e8a4233c0797b6a274c87b4700fdbbff99f964d2375a24bd3cdab8bf0598848ba48fc320e3f6d44ae8e137de03bc5154129bd51666c4a96f6c484caf0284f101e1dc9a241ff99308b83464845c2235a8c9099d8548ecf24be9bc68ddb2cfdededb54ff947e00b955c6b030ae8e384f4ce58f34191cdd99b0912fdbc89d3c8ec2f9b5a2ee6363c5c04d6f336ffc46e349f4920491601a9c0dfe77143686062df92e35017055853493bcfd3a923aa1679814d95e29f3bd0ec9ccf5b250b07e118ccf3b077511ac3eb9377059f0958d0bd2d2a506e9afa37e0e3c41c2642aa1fb5117f422958858cdaba9ba38bfc2eebabe3b0d7f7b78b739784a0a2656c8fb9b76354eb809105fd01bd5a00e6d0f60ff7c0479633b46693ba019be366427a173d824e61860bc8f28f6ece1a9372df209ce670b44a5d300dbca6a59a3f299871572de158ed8f73243b663a576889e0e9818f47c7ee06818f10181e552c299c1b9d7f3bedeb761ef1ffca372e6fb91965d7e12ed9fe602f7a3aed9b75bfd7406eb5c9cf09992f5b11fed705ce79231b737a06be8571f12cc5ac3f9c05394a7621df8442fc072aa04058714dc9c0fc179b4d0a0c23c1fad3abec50b142ca6574d6df788792a7aa61012703b02de04a3d1742590ab23d332935f4e38374acd345eafa2d4609ff7af532a20004a67c59a3587744206055dc88ae104b2580ed37b331e0939dbfb2cc5caa0c7468616067f3498e67cab6f45438ce509a6dc719e80e8365819ac199c376b220ade2b7de1f9f31e6061ecbaf7d5a690314b8d98fe4052f9aa52563cff7bce1449cd288d612cb6c74f367b765a01dabb3dd10a4bfae4f5e9f148db8ca6e61038204a32b2b3b5a3255e2885f0556741400478a95a75134835448134217cc84304eaea7cd10de58b6c5ebcd9866ee3d4711f7de318fdde2f600b68e7cd26d5b4da19549c6f9fe2775df71a5425566aa4f0fc08423dc9b3ff98172697b562e6e1f3d0aac73b50011b9c339eafa421583874c39ca75a35980f429a479de286fc05f026029822f21be63557f82d705c78137e96bb58390956ebc01d963d5822f4eb3e01fef5eb98dcdb525f29e770da0abb055911cddb5624524ef5bebb059e74c9bf931762c6a15d4ac1866d3b4c80b69677d041b62e50feb671db21412b841be02553d311a8c819d58d3a7f6982daa1e9e92584366657c7f5a300a4451d4ddae4f6744337bf6812dac1f633dcedec452727121dd1029195e3dfbbb1648dc41182f236f400f6b19ed5ee3adf99976cbdf0f0242f75a5f4ca3b2b154785ae32628a29906c023c8a447f21abbe324a7424b24c0e664ebf24630f3a16efc44a4a7d5b49f63cb0e92f93f0b43f9e7c56785f290eddce2ed6554871d70ed995277d99b0a540e504da4a7dfc8a3ca4ec1fdb58a91deebfa9341299e2ea1c8ab4e1e99d033f81a9b99d026d6c15461417795ae879db8e2ee0d2cf9ae398a481d892dfcafb225f09f31cfaf8c59b7d0287acf230fabf66e88b1f10f3b63653be04ee10d3332eadb0c53ea58f2b87b4c851cbacf3b287d34a9651551ade938d4ffa2a6b4c9fd5e6f225d9890dbfcb0042b53d4dfff9bf1cf8dcdf3ea8b567ac0d052c1f7b7b31847571ab40d840389100b0c541b20cf43f999ea598ea49b4c3fb3f49f3772af37f759d6ec9c4a4ccd86d39daa9e33119977ca3504a81f90e455df68d91aeb2db4a2b6d2ee054a00a1afe94c675fce793d2b2eb3426fe68a6bc6c663da678a995ea527fd0380a1210da90430be96a998e0964eb916866257e850cb6df3d237cfdeb4b1c1d2c96b1ec38f2adc9708c410db4e9fac2f39445343966b5e0a2d9b849a9b44c7d3a88d78c6324e13831003d0d472c3ebd7c133cc8e3160dd59786d8ade9cf1d2091134c32396d23154847f5ff574c289b8ff4ef3413614213c603e0b74b87f8c6eba3427c8cbf29faaffd4f3dec4b18022b892249835c9d27aecd2fd146ad11e69fd27403fc58fd8e1be75bdb7f72d79c1a677ec50dbd9315305d4d1cb4b96e1a8ca9d6779bbfdbe0d36c6e11f49234ec482065c18f1909a1d9bf48d96a66550a65d4326c767a391dae0a321aba3162fdf2b9fba6634894707d23bf026513fe58059c449ee8751b5f491c941464e83b39c31df420ff9f55e2642abc0cc44838532980f42b7e72f271e93206327dc504f98646290352884492ebb9a0efb467c52793eb043924db9544df24bae7167384cf6337878cd405d66a92629c5cd02107332ce18d56f04c694a49946f4fa4ae8b4a91a67458a48b30882cf6e2dc52bd0d193a67a1edd014f3ff6ada83c5ebdb0c40c807583ab8f80f41f6e5c9e2cc9f7bb551e9b7921de73a40f6f37573730c198ffd6d0929dbb75a853d0096156f441d24e9c067937efa72a836990f56838d8561f9d9dac0bb3d05c9dd7ca72a17af0837f1d5bc5abeeda5c3087e6ee02d3abbcd457dbaa2ef1057aba4466249cf3211d4b0807118de4eec22df8a6b1afc361c71884c4c1ee38381ee24e18d154c25ede1e665aa9fcb2a216a4ee5ce0117fd4b1b1e9787156402c1b486a8c47232dec539b25bbaf6b8951bef6cc79979bd69d797db011beed33e0ea92e44426c7b3194cc099bc2c7ebf683547168df1fd59e07f1a34cc8d346c490a43da3cf67b7e4fb7c5009b1d9a5ab8609acb0542021a28cfe1a6b9a0cc729d61010199d9a8f822a89f0ce06c9ccf4ddfbe77a0f407f5c5731010ad682bc7a6b339ef4a1ab24594b27e5f1b420a1f48ed7c6cfc5071dc4495b28ee317ae7a806cc7d613be67fcf8e9cc390d8213ea473acd9348bd572c5a150b4806b8d353e619a695a0dafda108cfc773226dabc44a8d63f9a22c601f722d571ae68760ae48c2b5c1dc07216bb27f16e4eee48f9c267b3efd735f6ab39fc6e6cc87cd34933adb88acf195e1e1d31e9b4dadaf335479fb07cecef9f36b8ce6f30d96f98c66641ce2a0afad4d0291495730c83e83c099f249b87de2f528f8c32934c1bb47886308590a4798dd08cb9bc6c33672995759aed27c774c8642d063d13522efb42e46e87d914f589f07209ea7684460d076b904d90a02d5c6f8702388395ef8809cfef16fa246af034d2ded7845a899db5e47238a63de7356a2894e04c1316447542a87594156cec9ddc488fef2cdac17507c40a6b20cb19fb2e33b519de377280adc5c8f1c00df81eda0ce641c21c38913e9e7898e81d4c9849954ef28db14bbc407d66dd1f8b28cb50a5d6d185f9c07c9084133e2f07b0fd8198c08bf67435d4ee064a7a5b1bac4878ddecc8e73c13d9e2e0a0ce6ededa3fe8190a26e4278c203671df6b3ca15311e4eed706842814da7087930e489d1426b25f9403cbb75d966ed304b8c62715510616f351ef5cad1589c9611bc0a47b101b4557f6ef7d469af71628884c00cf9dc338ef5f935c8a420cd7a174d2bf31fb1ed7eca0966fd83fa431d64fcd776fd3313492bd17072081cc70198e230ce1b81b287b48c857380d41641b6bf2c2ed37cb537372c26dec54a98cd226719891584408d206577513193f4fcc4a2802e95d5a242ecdbab2bfdc07d46cfdfb7f0a5ed195cf73b41936ea0d73312744abb5141859483aeb46d7148522120c00434c449d91cc2d5911ee130a0dd7e3f61e05d3e67373a131f19c3cc3102b4edbfa39ea52ab2c97e1a2e2e25bf3d49b520ad244b92e4ceb780b176089e1bc5dfd2a138eb8cffcd769e6d57235e217f7043fe71e37ea747190726630a268fd9ab2a2acbf062e4f4fc5a819331335e2728c1d13bcef6cd7c53add991bf91e490cc61edafd47ead6b427a333c86da426204d03f91b710782dd2cc791934bfdfb53380531d6ab667ef93138bd3edd673e0c87cc3a59f7f7ecc6d3113b745ecdac0bc32d11de7468b3a30bf4d1a9d7b60113e0d72765617242929ed0fdcfb17cb28db02b40889a8f4f959d6b1b2a7945eb9f5ee72de641cb2b8397dba2003b0f753a4408f42edc1d711d079b4ae5dcca697fd3135e8e3461b338a78a9ddfd936a3a41303c405c88d262e4ad2f569d43366e82fc76b2144af9e30a051e03b6f29a2cfd7eff41bbd91a4c0b38ae8ed59e0c8383f0cb5d38d20d7b22aec4cb334826f3f4355a67ba7ef9fa68a26104bcdb797e739036e59ff0d409487dbe54fa822c66ed1377873fc7d8b0438f2f9c19c43449739ad49331d9c71fb252185af96e91a53983eb444ec0c9b53ec91f2fe6ba4b8eef3f7561c02c9e7765854b8dc64a6a5a4a51549453637b2233f4d3025f1c642e98c5f6c2c8d125ec28ebf4d1bb6eaca7b1290b109ffbeea4796a75493a8db5d157043e8990bb77f86aeae809c788c6b3b9cd2933264dcf910ed1c2f4953b7e86cb322f080516da09ea5b5fa8bce9d2079b22735eb478209264e63d41773bde26f884932b7ecea3898da6f64a75bf144ad158b3c9dd319d255b93419dd1019eb79744b01ddc671aa0523132de1d0f9628f093dba6ecb330238a9f0b5070596cc9645bc4ed2d6673779c6ea00f227af7fe9dd332a09cd8ed0680431934b36385490a1c6aeb022b3369d761dfc8c69e20747a1e3deb53fb46fc51d41861010a8b651930d64b6b7d0263e80cf6b1618fec24eb34fd68d7a2799d4cec74a616b4d8233eb84c9a3b49d3316b77cd26675c95f009fa34360f54431806cf6c7797921127a0668cd76382cacafc232bd4672ef9d1d4f53496f40141a950ef421387217c951b3681fb91d9c9deb9c125827e2db65dc1e504f322beced5395fa6fbc1fceea9f5640ac15a3ebd48cf46f7ec2d27552d19ca93b1e6d38bf4777ba0bbe76d1abdabe0da51f473d754535b5addc1d7acc6ea328947e79aa4400f6111929273f81b6ef31a3d154541b894d3a9b42e852c03053ab2d6ab5e47ae6a0f9d2741c0ff1c26e06f4d561e96f6f56aff366027bb202db49d98b167b40dd1e3470cb723efd9482cac643b243a1e93fb54709c289d608890d749f95dd631d67701c8ddb1af8bcf8fc70c24bcaea1fdd761f46f5e9e4a6c5c57ac2010f7a7256fd1414886fdeac811b33fab3e6806d38143a0a58d951bea7a03f8fdac44b766286ce320ded80e0e71cb0ecaef07b82501fa54e73960b3511b9e7fb7afb8bebdc1eb193a53a3000bbe804938a2465212ce7db4d7a20bcc078f6bb610c8d95b915e7f320899669cbb95a8f1ccf568a867966e4d7b0dfd2abdf3376f17b2f46c1585b89018ea22af6a9e368ae8bd066a0e63048b865e25de265eb94e19a5249d47d2d6400f7fe5788cc74508a6d5da13624627d77b162bb60e45514ff49ac66f37f3a7162d63395236383377f2696ea9895a5727d9a1f4b044494c4479181a1c2b3c421dc04285db5c2ee3f1874d34720398fa719310e40e2abc873124b8070f18453d0c4bf520c870dee72c858cf2b4f71f161af98a611a18bb1d647863ac26288779c9fc130bd794fb370bc0086dc897131dd9a861bfca2171b727e02145573ed9eae3cfae2aa8a41074449de4b74056a9eb96a2e56fdf395dedc4beaa91f762e8865047120841431f5a3bc727dde24c0f05b2b9fdd8bdff2d0d42ee8077effda3d7869d46d8f7374d9e10486af29f43eebd165ee7e332a5cd23d5eb990a673fd7df0d346e36d6343d075ed6b536d116f6502330926f2206386c97c660200435b64327eb6da72db1f95d57ae21312bf21cab2b33a7c83925404869680f86085d97c42900b4729b20bf9f36f17de52ebd0490e8412ed22d231abb49fb3f7d39c464ad4ed51086b87ac79f67c36add8744cccf5127180825a8a030327e86e8009e7566719d7c05ad54d60062816aaf1be584cf04529a7425083305554c8844849b0618d49d3fe291face8ddc0146212cfe32ea1f315461226a821a499a15ad6b3ef86c92bfe546f4c6ed39cd050f87dbdd8f6004d7ff12f4ed789bbf4ce137114a43b86e1802a8e017f9e9fecb8e4a13f6a3d50e7a423bb43b3387be297427bae135a98bc1104066f40f9f68da0ecf6623a15dea3787c0d2501bb64eb0b9cad1ded7e9a7b5404d8aea0bbe2d418884632ae0270f68a88b1f954bc3d821e4afa0657937bc79132ad8d94f78b5df38b694e980c04ab31f06ac1c5be6603d8aacead2a00c24b71b4a1d1f9c04d597a91aab9fbb91b596d0cfb22f3b76d7d0e510f32e352794e9f38e75c10968807adc10b23778691c916c2fa74d94c6b17a30dc1174900a6e41e38dd0c9f293fd57ba90cf13c94e1b27bcb19176da3ce225b41451466be9bbea002c77bad76ac357b66cc059c4e6f7b30eaba8b8ffc774904c74d41b6de563b6abed4fb417325d93fd5f906b3c5be1a79d471b4b72734bdd9f1fda69371350b5902694038638105111ea332d2b2783315a905665ce9457d218c7be19cd020f7c8d7d68950113d6097027478c21c6f3719c3366e56627cabaff8e0a61be053a19e3a00af9b99f2bc143c3d6f72a026810fc2512c6d46ced4a39e5e9cfcbdc9104c60c3aac47dd968bf78043ecdbf909dc31a7c3f046997a5b91b8d8194ed429f0ba97d6c8efaac3c7df6fdb4b8b2ef91733f0cab217a0eaf9e2e1708eda0de6d62e631f34424e3c906ad04c86be5efedcfe9c4a8b0986665623ade192030a71a4403b6973cea5168da2296b7df64d9d47c66c3794e3278a5a628fc9115c4eccc39a5eaaae272c4f5357d74bdbc69368021688ed2b49a8409d1a071247751d2e4ddd2a0a3d0ba2f68148a9bfc8c788435aee8b492aff1f2cb10bda6d994d9ad71f8671b4e2a7e61161128a86589244338bc70c0f0bb75a7da0c43b2f67c682be5c398e3d07a7264f3e64266dfd3b319dee953a0a2cd126109cd9375465dc7304241def07ca1a24bb8da25fa9f8ac3f3c53b2efe40f1ccb1631c760132237960d588a9a94b7f49b283e85ec86acf2df090f70fa7e37043d3fe9b48f84434e2d3818cfdba5d0f6222239c193cc2bc1fe8ee7283720629622883f255243e5d150a8b7be4cc5aa231b50f96f97a84c486450326a0506146428fea0b8782fa91ca06cd25a244d83cd79ae7cec063ddfb7694a57cdbed93aad51a732412c24588856bb58e9cfd639134a4111f5bb51c441d013dc2cac422876d92945c796ac4effc8c0c07c9c73e38c2419932c7f69f5be08436cd4ed5e2a923a1446f5210ddc6c37f2259718c4d250d8cf5a49633cf8518f0a65ee1dc7933f88cdffbb9fab68bfcfa64fe4d1e000b153a0ce4ad777ac5d186c70ab28d52c88a9611064baf98f26ecde7f806a784d42262e7405c1f89895d0f4fc17a75580d9498de271bd2070fb4062c50d80c12718a8661e8930506744207682e3bc05c8da0913a7a2122266aabab198132196688a97131de5bbc2c325f41a77a7c3326fffe879b11cb30b11a443a62a007f8a52b6654c69ab83e2164d8f3ce222a31130a11a71880b49d38a0f41a861cb8966f7f63865e52accdfd74fb6029d5fd97f7de474481847a83fd9e74f8b51d6ccfd281277b6d3fc4ac93168bac73feaf5dc3d1548c6a0c74ae8cc271460797a54ad08519696bdcaf04546207c42f586bf4169df6e2053c2b81b4d5fb69969a90524ac488c29a746af9e3c2e8a023065975f2f505713ed4d7f7ff6c49270d6651fca00880e813e0b9a7467859fedf529928cddf84b714715f7f0033d767bcdeb69fc4a02362cc3fc54a5d51123b6e264a14f508511c861828fc5064a17e4518588904bc0d20ab70a4e89085b65755820c6d62ce6ff2250da6e2ebc656e1e3d8ae0c0db9899b76b1da6506be038cf3b3e44e6bb00e73900fcb6deaef129e738dc0af03387911ba1e63e06d279048ca045989525e79a453355a21043750863d0b6fdfa6182a3b6935c9b79d3720145b8fb67d5402726633c06bb5867602b04ab1d51776f4f2f1994c324f1eb9ce19c08d51ec38ad46afee04b9c3175c497a0336a23a7d4c8671bce2defb086d26afba664f69b69806174732905d187b2c4a38a21608307ec643db7d70ad52f3ba2833de2177700ef5ef91b97abd36490b9e035fe84c4fdcf5525f787d979e73ba86256e319d63f399bd78a90fa2c3c80828c47aba312a8b210a3ac2f7843bae08b9969d3464692c124515d3de152abd80152435f371b532eb57e12703ac56775e899ddeb123f52482ff97a150da69e050d7dd8f250386b248d2524a5ec45a574eef9c6b78d43105d5ba79fc362fe4c2d3b098c362785f4052681387a85d0c13db14bbc9843194bc7127e487fa2f3ae1ab9a9189ab320a0cc7df751f204a19d9ba4ccfd38fc398cce6bdd06d4286445d47854abb0b78ea2d0450d80e94d2073b5c0c9b738d2aa8391e9b3109f5e644ac996f794a69e1dea5d1dedc3625c07234063cb807acc360463270bfbca4897b72a969f99e296fbff883d34be26a2a18d6aaf23833d0e3e103311da6f6120aa21d591acbbe1537de602f3621440591b8f96af6483335ad63e943ebf08b4174aa3946a6cb868b4814d503249e63a6feb206ca7636fb5ad40d02099aafcf29738f91382c97738174d6501a41f60e5f3c1486610a431bad86df534983b813eda8649db3eaee04f74f3dd6247e7ddaa1c6cccb3ea3de482afe502694f29214a830781d28a333fecf03ad67a5351dbf9e4799cf714301c77db08b4ce45ab2d62a680dcc2f92815f492cdde3a787ddf80c24efe3c991286e504927c1650ef731be62893b0863d90fc9ad4e30db504dca41292570233b43e50472545a1a48b1a65958b722889a96f03d521e8de4b0882fb89cd2c89ad9ee674d1027c4e772fd96fb5ed6c7bb371947670f12d548193367c2d6376e57b5687ad5bb26b86242603a94e4896877d178fafc551993b2107f5b1f9751db2efcfa803bd661fdbc427e14873d38e6f78fb4261822290635a17bca12ba2f1d7143b272a34b943b2afe9ce2754c9fcfcd7929779c35e25a3d4a666fdde0bb346f3537fe1d526dd71324972bd53c816f33d61a7d308e8a487e3f4f626bd81ac14f9989d551bc6f84862193ffb0873c8bdf1708f50a551dcb509972db0ec3e4ce99a68f650a80675354cb1b7276517170cc0a712ee53ef19a32cafb9255021275c46463ffcf932030554b664dd64df46b9ef65d1c76bc2efb8c4e3230a4db51336dbf4de318204b37896a08b56b02025de55cea576afafb2e2570f75f5cba1b5bcd30e66d42c2e5018bc76ad4d3fa5d0700dd2de1840982e93f1dbe8c00f8ff43d1a70b40ca3dd3d7d3b48f6ed31a7b8e1793158b1b6edc8ae9217057bebc28b391fa458313c534ea643beaf06960f6e4310ea78b520d8e841b24b0adf6c249feb9f040d6f682786c88495f96f342e34d3c24a2b2864c7f982cae61048401d905df8613d2e75526b0669a5f1ed25ca5ecdf7975343afadeca167dfd2bfce12990b5d6d25928a4bff9e91ee37ac5c9bf1df6895469b47e7f9594e9ba3cc89e7be4e2564cc817eb16199f78bedafefe0fcec7ce441fb7843a9804caabe3c2116a29ccd02d4e148a04955da271c8d7ca7e6bd9274ba6676404c37654fdfa68a089e751ce77c465f9227d75e3c6f95d3d781f6158cf99f9c8ac0fd91c893697a3720139d087b48ae68efb56ef203b9e1c24ca675a615e4ebb297743719e11d97a276fd6bde8afe216bd9145f9cd5e2f0955c389d3539e1dc19d4426d690039bc7a04f11e924ed7d3410616304c5a9a9b11774849e950a9a2839ecbdcc3bbaa9d24d0cd6f3fd35449da7f89b6b9da89bc61a2908f39e4b68c32efd398b352260372c580b1d50146c8841f88b33513e2cff73f04ba13c7d099b01a835f1ba93a5eaea01f800437df42a3788d244033136c2d12ce916e98043be5e6c985f2ed1a261f66c5bbcc515a551eca6b41bbcfde3c3d838a03c94c37e3e4395258bee707fb2bd944031c1a5c607875baa88206b5173f812bf840fa110b800dcdf2dc778aa434316230f9f668ee982c273d798bf9636d3503e0127b251466ec9f92049aef46a054bbdaaad776d57379f74da5ad40ece1f2b8f942ef33e452572fa221d7e3fe9e141730fd97066d9f495697ab2f42b3d440c99b4160837b69b47d8056f6d3d9323e0c059e4e0f8b59a84fa625185844268462c22fffb4d5497631a662dc511fc2646ebce46813f35b41b4e8c2c6d9c2df14c82cb78284ccb97a7eaf587bb03772c226ff8b83bdc0066cd98e3ce05741b1c261d6d6603e32ef9944a90dc5a9e8d8bdb0ed81918cb0d6e77a971144021c18b57b29258e932cec4f28c49fffae16b851688c7a393fcb96a4375bfa124235aeb0e219025e31c183ce4cdaa66e88557b13875fbaae6a144f5c17e360db2ea8af623010804b06fbfe231fd19c4c50ece8374bb4664860cd31bab1131186d1753952ba0b69c524b982db4ff32426d30cd872979e86a2deb2cb0442c8db8154bbf39b1e95f392d871ec6a746b5b3df66be7349a08c11c85af87b3e486a00a519c48a5bb347686a37839d593aa4ab0d4c4e3fd2570f89fc197ca2b4292b386812cf37dd3e950150a95daaa25a6bba815eb3ed365fefe8f072eed0340d68eb38f3af57d6c07ec37f5383fd13d975ca58abc1f9c62cd68ee39cbd6aad6e7796756ffb463ce34569febfe39a81ef255d325878ed8d12abce299f08af29b26bf8ff1ec6f3d4e0f7ac948a79dce0649ba580e2f443f3a7a3c9832687e98792cfa78cdd55e7f57c0395ea3945309c9a4d1415d640f4995543280a38fb2509d253f7cf46ce9033990cb938c61e1be094900089ef5bb68db12496f89a0fd8e583ff449d231d71bb91d96fbd3ce0df75669c4b2312e94bf4d8373f703ab405e88cee94da5b1e7f8e231d8294041bf850b056f2b1a1d5028d816157ffceff8eafea5ea7379799755e929ade65d36fb4e174fc065a24906b316b73403e16e6257e0919366d5ed19fb84620bfed91667198df78bb34e5a5db90ea92ec870e40fe56e1ad299551474c2234da99d4a3ba95845cb3a4bcccfbf86439ad40d3087c3f51d9e04530b639691067af34810c1c2b330016d5ca7bede36dc1b0e713d824812e85348228667b1045114e5a21e6b285aab9acde6511934e2f69e87bf85b9f9fbb39bb0c3e561674296664ae4be6eda4a44cf1b765c62d99b4f3a5378c5ca68044da976457ba5ace54e654b52c7734ba4876a5710c61215ef38ace073c19ba9d9b300e549fc206682dbf1c7f54d133094aec7662097c18cba7612caeb220e009685128a5877060c621b2e5de9fdbc8fd4c31a4d10c957db9fdb947664fd9f4fe2c0102d800aa9de4ea2c86454b8d986ee19d7e5cffd6af90444ddcb45ebf31ef8f93e89fd83e588efaafffa6e02a34056de4f0858d015995c0e1133513adf994890f7042965032ad88b0b3efb499193f07a572397be45198b2fca01b7c84e0508227a1a177e14721e2e7e4a2a36606687312f296e6662704445c4911ead5bbb7100593a5e9749192cc0ab2aaaa2cc504a1114337ade5446090955974ec1be4dbd02d1481baef1e510b9190636cc28aebbe15f412226e0c3ec7d428ae72de2a234660f1a15987eaee120c334da5caa14d1eae605e1a8ed389d61606ec75f31c416c1052caa1e496218796bf749a62ea29f8f354b6d362a5ac1a3d08f0b9a41dab387c06cd6ab08317ddf47f10fe4952e88678ae60727d2c519e055349fd2d1df463221a05f44f7f003071cb62059315a7280ebb7742c0e1bc2b0017bd740e124ce2e8993870225ea67c1bfc4f398b092fe56370717b7dbb19f3ae571fd02cb04a8496f62fb4ad25afc2202abbbc49deb2dcbb63aba011f44a99acb44c7d21a221b6ffc31229eb38413fae8892fe29c33269169f8c984a993958fa9b7acac5e07e8a716e2030512fe599993f32eccb4f528b6c2062d8fd8a611fec16a1aac20311d4ad920afdc3aa6ff202e9acacc3e07212ccf0b28beb2cc3833a16a45482412ff06bed410428790fda0f3848aec3233d2fcb690407ff95cfa2ea76badeb7232ef3b52d160dba756dc259bcafab1ebc93ab52904da03ff5200c54bfcbf40d41c5c51ef86f84c7f7f1e96a71dff1643bc5f0b7afe9de7c8a15802d0803bdd7b02cb48f37ac3af0544e65f1a183546fe6f0426d42ba6f1298439a674aa03bd4e84970929fce5a19ec3f259219e28418bba46efeca9b67ddaa6737211ebfa4d35525e1486497aadfea611ce7549becd4586ac302e4c5aa807fcd090c83fa9fbee7176d6b74c76b5aa80ae71f2c4ce6e10aaed66376e09d6974705cc83825bf7859d9c1fcd552f0b0037cca34cdb3364ab261bf60273118843cca381f0eccf19e39aaafb3262a1ca67074ee2b70fabdf22cb4091a1dc95d810a5fc9dd02bff48d69bcd8b9a86ce1549ce7307928c066f26ec5c5ef14de6409050b02c051a37666dd573409fb49b0aebd7a6dd3737fd1eb2e4a021f25ae202fadd2ccde17ebc9b2d23ac53cf0f93768b0b0b304c5d3fe8accc6a5a987bf5e1212ae8345e009f1918aa3bf4073b3d1a0b757e374dfc4992d1a8ca7c50d0e9fffac3354019a4726d8c24d212d950a5c8aebd61fd9e61e5e7a6e145c922efbcda77df31ba5a3211e4a1288ade53b4c6666253453086795897d376251e6ce07d38123326246682f5f4e19476b63acb7cefbf3babf8f48ae57eaf6c5e73de85411dc803cf30bdb72f22677f2e08de7b17a93b37bc66fa0bee8151f982560673f5647b57b32540a77eed72ff686ea43e2aac29f6f0ec69016cd153610bb1f3f3018e46b16350afa92475f5d22f5eff7db40daed6c761da8f66ffc34b6dea29db7210aeef4cb57c267065d525f3e80366b449d06389ac006d644ef848da0589ed0b774264748170b4dffa49d282ef840a5ec27b0e4da156b2c4a11d20ffeea84adf4bcc0a886c67d5fcad9589796718cddceff24b51b4ad10dfa2130ebf40485dcc6c57d24f9bd38eb79d1ce7914a0f2c0fdb0b80218943aa27d61f0330d420029d2b18389bf8fbcb1d40d19e8b463156503698b09af1d9012555b50efc0e8cee3acf26dfc2d3cd26b440fdec00922b949f7dd45bdbfaf5948c05c8ba73b529d126b337e73723854a414c705ee1c5d08ea2153db9aaa8210db44d7a148e1d020ccb07356bea996cd4e43c51a15fca2e8a8b12ab328559033289ece30d926a45d909985b4d3e07019113e13d5c6173033ff7d09a18a25c699c27076dc6e02e8bb438e84b289e6bf04abc33c5b7199e7322b809cc184dad68b929f31f8e8446252b4aa1e3d3bd549f0e3e1210ec2882931cc15741a39a83f8ed0d91326ad7aa95a9bd507a346a83eab9a6f264173fd61c31539065d479871b058fab003f44b9fb9633f917f5adb5ea5dd5fedf3d0ea4213f01aec725f3829854e3a2096dd13b1f9af4bc325488eb8678fa4595f31bc221e43f188f8c89c291df7252dbab3ac5acfdd484f8e27b32142b368df576e7317c45165057d4655b22ab0d2b5d4b18e1687e936300b773f2a5d8e80cc3b00fd67e6c078e782aa77aef9898191f0e52a83a3808fa9ba8ef8c1498e2ba358c16c30b377791aa01f88e5766b6027996d570d55fa3003f056544091616644f2131f9b928be95ae91c7d7d6951b038f7c08e4bdda2fe049f1e3d775ddb6ea3b16805bbe226fcdc49e16aca437ee9d74075f5cb5c57e8facf165a4a1d4b01c7b15d1ca97b9ac143166ddcd0bd8b27cc4b384b0dec83bf01a4f1292ca4c34c518b290dc83a1af51e68c7239b159631b468ade4afc48e12bfdaac993ab6d9a0b291ffbdc089596892c98055378485e0e375c2839376f16623e700b449e80beebe9b637a9861f3d850589cdba4126d2393e9589409d7b9d917e548e431ac69e489453855a00d0255c328a370937326d071bea4ac83a753bc42631de0da907e202c28d2ea46383e99a0f112532f8ea511e7ffb7e5b6deab53afa1ce63a9d7460e194f93a02b2e02e2ddcd164a14d46e0a57633a28374aa425abf6e942a82bb778ac958b39954760e069ed1753745c6b92b0b864ec5a90d129af7d1b6f120220b5527eda865ff8bd8eeca433b4ff6a171751174f3d132890d1d338e37805b7ac808531f380a9a6bd568c38f856e9f4c540ca9f43ff7d9637cbba78263422a1a86c1ce73b261d9ca3d2f23391194ab7346162711553c9f06737c9612e586988e1256524d101b89fcca55f195fe748e7c9a256dcd316fd640b032edec48b1ed4e38f969af45a9c6d89aeead30833b427bbd53ded1319916753c97caa901fa2a0b48e7c46e243780d68a415a7ac1459fef8eabbef0dac1cd9dccfe134d9de00bd2a7cedc37f239d950030a72de014a7f08b3da44e51f01839391693e0a3f08a3e37f01f9c44c13c276e5c77330b36e62f6fd69a2f7529a942e6512a81f3999218b36ea46c3606a76a6cd47a9e335b7869eba81a226e50227c2d3c70f03dc4c87bf2824debc8ec27d6a9cd98ed8a5f26330573f038f0a1c3ee2593111e6cebffb4a15e40ee47afe633b5017d5c982abe60edf071ee582a09195cbf8c072facd23b42a499491eb162e8486635ce1800b92851f06a1adde789e70eb12ce00d47d7a725b2ed358be897b0a15f5cec4074b2456792a59ab109033c315927faa82aeae3f98bbcb134f643d2ada0d36dd17e6fd563a2f684323569a577a55927eadc02444ce15c949cfb8d50e5d430f902fa18bdc5dc268852dd0a0348af26b886b438b103a46422425f272749fb2668cfb996e01aabf3f0172928e1ee2bd1e1e1d1a3a63fc76ef360af9001420d01c310ec7b6725a1f846f734cdd3fff2892d976d3f10d0b42024d15a19940993033bf079a1036009dd0f2d8af3abaf4b94f955580cb903e1e1fbc3a10d5efd4afbe02484da7fa761a6c69aeef38e3db524c8f9dbfb12e10dc5e2159cdecf84ad40ddccf82bf38d540c94830fbc3739936b70f555a323765d832239b60bae160a371f33a88e29090f36c065d203cbf3779e38b360ec62234a6aecbf15de3779b4fc2c3d4ee601f366872bb703d1f02984777f0a377d96441ca1feba2f7f9503ce3ba178f98332dce4de955c289b7079d9707f39e9333d1b27bdf0d837f4e80ce4d8163d24656c91c08cbb4e7ee81e2e38ca68e5fbfc065a0f44c6fa1bd02cea606a52228d0ccdc610d07995b35cd754911554535229c4a08fe36bb622e87f9f57a380896b560ccf2dc6587a216c4741253c34c05cd4ace4983fc68f6d5ad01d6c0cc6465dbbc1b08e298763cc043f53fa8d627622b931b9c3f9d01a0192d65168bc2e4d87382a838aa884299336cc5cd614d429a767b30e32146a5827b1fddbb46633eda9d12229c6849356d00180742035760e6388cdcf162da4397654550493eac3093d91a2a3c956fd8898e8d255bf6b7f228bd526b412c68f0e554c395783230678d26e1f4140786ec02797d08098370d59599b61c93e64854d30311c282e4d66451c887a0ca1cb58a1abd5d39ea7a690ad14ed2b01c967b0dd00b0f97cb5fdd92e167d737049da51a126179d54708f4e2a7adecaec0cc42408f7b0692f61af612da3cbf1014741bfcf2bb282eeaaf10e19baf43359af6a7aa7dd938984a712826e777f42f5ba1811d6a494582da60b212996c43518bedc6db032385dc652e47b948e8a6cfa915291d3696e2fa11e7f1d9cc45ac9881f9eb99e4f4abfb36c7953af63efe8192399eaac01a6b7a2e2b5d9b47b4289ee548ddf777eba84395f5ab124e5c950b73d8aaf7f66ca947a22ef176fa729aad46df45b7912afca07a821fa42460650ccac793a1f7237c17e0a4105c51b45b231ed2410e7033935cde94f0fbb011e82d6728431bd65cd03e29f2a7628c5e2fa5ea683be4115bce9334cb8ea3686fa2d67deceea76b9a9b59e8e51cf712768944ad2036374afd026b424189d496b9fb5d9aa3ed1f9f6c131c478c6038680c1fef20d5428aa3ba28e41970eb7c718dd07baca1f12cf5bcddcab9b7274565c34e658a9535894dd07d8c3e75de0e244591ce5c98db61e8500495f91a387aeccdd3ad4d4165a672f48b7b987df7fbb02bd74b7b0837abc75d81aa268a12faa9cf0627e890680310474a89b6135247cea00d339f90d6d00e2215bfdb7800cdc349256d709eb6ce57c44137f12fb1c4aae489515934a8ded2d08e6d99a168cf7ff37a95b076c47afce0f76690e0b6d589c3459469196e2074c676bef184871049046edeecb127df83af565dcd092adac90a62d9e03f38205caf2878159daddb70feedaad9d1c8e34c68b9c8e35d6ed254126115bd2c85b306c40fb5c979fac14565193c95ece3cf578ab61e67a9cc431bececb437524cf840807e80ca5df28d9fbb10b6a053b3b4729917241389849ad4ac5aa31daef71fe6a24ab24329b51cd944b0a96ba08f929e1d6217128d784c8487dc181faf8c629193bb78f81e34b8358e7d585968e0ecd7d3a2a4fe4ab836da0be7d4fa7beb8da94d9e3b99abfc0435087026a0b8eee60d7d605ee67f5d60a965a40182399085d2f80f1b6ab21b0a57ddd30ed05508bf655b91b367b810262e2011b794701c979ca83e91724a9e0ca291f4e5e7ae24616a8ad75dc6fde960564bf456ad9bb20a690313d8ea304fe089237758742e38a0b2c65a55814fde0f76e0cb37064962fd68200112608b0154b5218c2f13a12a38984e4087a57f9da1556e47780e2cb5d00ba4d8acaf0e93952fd6d171942a9cf19af3502f5867fda8c0d921c1f56d6dd2d20f54d2cb0a2a8ecd56cef7dde8db41e0af3b47215f89e2b451ad942344197f7e08aa8d54c090083e50673d6abb8d687e1def6ec122a575b83d5dcbf084cecdc205ccfe07aec37852baf910b3bc60e4b16f0d402c85c74aa687e01a8d90ff8b27ad6e2d47c482854fa98dfe6d5750228c968a85b43295e55065114de0510fe1146d8ae445678edae388a7b1287562b190622524ed7fb887d6681349ebb5f04cd908390ecbccb077eb9c68d0924973451bbbfc981b6b256704ce9addeab444e76f7448153949eb1c0fbf7134e42b12002465458b392ab5db193858d2ac3c35c1bd3c2f9d83144fffc6cf0b1325ddfbd0b333327718c50dafd21ed05ebfaaaf90f36fe0bdb106d0b018bca68e3d8816d74fbce479e30e4431fd0d354c63524f155f5d62d7b914b91d9774b16d4a7634623bb54e014cd5dd5b406196b5896d6085925374e3db458c909e1dcf258479551682f70b3fdb2dffd1045df888f7163fdd35793d1482eb0856c268a8752915c776b42e879154ff5c1f23ef6301c992ccddca29d2a0e926c5929db16a6fecb4121abbe1b481ce44bcd5f84991aadcf3b4b48b4d1cfd361647737e7e74cc99eef9c52f1da93fe2b83c11be340667b914fc7aff674ee66f508ca8cbe57ddf708e61faa16933e057f3cfeec796bef7ec891372e3be89efcaab784ce5f728534075f8788e18bfdf82deaa824f5f55acb73a90385d007da4a47a66fff5e98fa75ca128dd536586101c4dcf4d28227a8e292ed3a42096d4e0a98a0cb21896efa2e04284312bc7e09cdb713142a63853c759ebac1b73e8db6253966f1c49beb506bb07e397ee095995a87c2b0f7d1b46b0aab33a192f157c5f1ae00f4d6f99e591e4bde3697ee99c3dd8dc179662c9c2aca70e1e0d6ca9e621b1e3cca056ed0ac1617687734f7a0426e6d9ae4854cce5341d4024005c7a111328e0080bbc4857763188020afb2f0b364d1b86abc37564c4b28f070b47267d314abb013fe7a15baaffd096f0490d27643a1995dc85a9ca8e88985eb2980fda9b7efb39fc93da1d79c963e7e048afd0d70b105b6e949f7ec62be4b33682a194bee472ae58f3ede3322ccc929d3c06c80e74dc439d7711ae2aeeb0021d86fb03e659eeab3498fb0f6bc929680d89c336520f53c738c20a46e4e5390d723bb0a259586b909672dbf5b13eaf96822c596b5645ce99fba9e10355c75d1b4254648149fa860d534133c70dd75550fdcfce777f21967e9110a3203212b1f2d91d62ad95e6bf6ff908da47d327c6cd0d9b575df5174f056f0e3c5817e0bf82b11588c08d16beb3d6c3ab4ae7da55c20237becc2d8306b074c945fefc055f5e67ac02ec3ad3881a06ea91722225a60b71729b0a1549bb8eb04eebb56e4a59566992d1ca908928d27ca7f66b0524257f9686d944bbe71c867bab5a84fd29b81459aea1dc43709cc92a4a4a0cf180a0aead19de7582930574d86dfd7d30027a5732de33b52f2b02a36c5b23f7eddd72ad502e0effc6e9d3c9f0f21666aa23c60370adbb473c7ead79a7328509de1e4b843a3e197fbbd41fa7ed3012742beb133efbaa25886ef88f2762befd48ad8ada1cebe824f6d3e3b2bd4c4d1de9700d23d04e91c4c761ad23bb0832601fb024aa1eae6ab777f026100d841eec414f8a6c3ba150dfe1c177c1908c876271c8472dd11b7f327015b78ba7d0a7e0cc18f9ef5bf256dc9804492de37c1951321bd04f76fe856ab5e66dff33233c811e4efb349a0ad5d4428ba6e0dfb4e73bd185f0ac13e3b034ebeabcb167816d46abb3eb7e69d037952355644a39edc9538fdd663b03de2b51076a22e5c655be253a1a8764707f57e11155e49abb128b5618abd3a0ed605f2e1aaff53a31627bcdba55592467e822f796a3ee576fa2a0b57ffa6a848ac44eb3e9008d129bc372a902fcc8a8b64ab9315c2708f56919be8d8cb143c78458d3421a42bb9c207f36756671f8c87602251122562e4c7e9fe15ad66059aab1b94c0cac2192550ff0e2c1203070a9b8ecf907d0e73044b5f011b88d8226a2d8c3fa186dfd8eac9ec6707f452223eae67b8d564df799a77809a97fe94a45b40e84b7456761f59214b859832b7c8d393d0a56604cc8252e07403c1fe2b15725fcc9f32e48626e01e5701023a68ea2835ae5e9e074d708dedda1393278ecaa8cfc728dd72c7d6910bac475b80109c3559c212d4a4b18e5bc9090c4d54b6fbaf722d0e830c643a8d85249f982febda2b9439c39511da0c61ada525b13c613c4e801274eafe3e3bffe322060db72db787c0048e2f71e77870495f55f37fcad466f1894958c25ba46b660dd73d949c9aff11a2506614df1b8ca8e1ddcd10a9c42c41f4d3f1922010adaefbb9800a4eaabdf99c1f632373203c3ebea20a00a5e78579a57f87e18838331b0853faf77a58bea3d88a6b5f99193d05f8024bdd27c1926a4cd77c76243fa76a253624b874bc3632e3c3ffeb93352bad748d666313809373f15e122d3404d9f44777fb17b55135c83056167794ea5247dd75a8da6367f4f6dcd4634c40ccd6facad58715a5e338cb19c2af1dfedf146e8ffd6b08bb6356b8237fb56d12c5060d5b03c92e8c2d47a7c12582193d6c6d100a38e714345a8357df4d88e2fc373e5a2cf42fd572a308c42ddae54ceaec7a3a9c8461d73264a63b68a33585110fbdb04b758479ed2622a336b413ae934c7993f65fd874f749e444e7c042767e5cef8996e59ab2c36e228630db28fc52ece75b45cc937ce5598691cac87f01b5ad39c4106874722cc5c9f1452355224313acf6d1d784fb6f6522a2d76717536e4c082b1d3f892da786ba8b10a9bba3644883da2f6f07877a5b67723e1f5c6768742f6f9b161ed68e587ee9b0e97ad5407e2575c6a507c52ff54a5e69f9b353d73a1f5d78a7cc340af25f396f658a92b275eca02c109b5735ce3539d432ed4937c8ada650e6ad3bbae2e7a8f630d4531c932cc7cf4e563a0e6f0a4e1babf2b307596302035ae6e73a56149c4c35364fb625c3515aea00ba00f0c56c074034a981f360f7b8d52044705ada0c77deef7d6baa00a2382fd33d857492fa806a7db1a77492d859861f60e6be26b85f66dc7bb2fa377d6a84da91f84dd03a1a8a3f6836e11b62703201b576d5b39439aef9d3503f5f408a300ee64d70ecd13be830becbe9083013b676ff1989346995108594dad76fc9ed2b20ebe51ec4da7c58fa692943edc0749fbb7ecd7c42ada1a7bc64c936ae9dff9ea9bd9a8cb7ed3bc1ab9e9686d45a154ff239a438b3b42457d1e43be8ef01b024d20e06d0dd2e01780ad2b44fb62ccda7eb32dbfe1aa4c21e8650c9382c59a8d2c2cc6c8a1588e83f1b1d5cfe6130bb0567f658a767e9430b9146274e4764ed21b25f20cdcecded3cf589b0b8b8c2abac7610b9f21e7c6e39712d7eff5dcf0e42fd127ac304d09b35d9712d3c69beb57dbf25f17cb5772d75ed996c307d4ee82b0e4db750d33c0beb605ad4e52b81cfc2c38119a0b7f6447f389b72e579961725298e2ecd99cbb00dd3e0a96d10660b5c14193b9402462bb41b5be5137a956c756d4e37fc450b30a6dea86b97c81c697c5adbd68e57609c5badcca61858a6da97c39d3c173b3bbf55ccc6c018fd4c91fa9c9416d06cfb56af12df6a453a69b0eccffc03c1b86d4517a6e700e7a5504c998dca71c6fe3120118691c32811c4695c50dbfd1c1f31aea32fdb88f440f5b9777c9f512f3c0f12eb86f277c27357013ac8533caa423b664d68bd5d103e026797d3c4e61def79bf4b55b90c007d71a0265672a2dbd8c72d748c5dad6bb1c9d37c0da334015b7d10e8c2abe9de9a034fb1580e2375297941c23a2345a771fc753014cd2a91f40c932003b6d415b67887827c7817ea5a048e8e0afd7aac4c4f25814de759500b507ffdd2bc8e25193e219a4d36102a86d57eb279a7125c0cfddb3f9e120e8fdbd0531fc0905025708c2ba6f4ef0cd791f1847e7ff799dd89eb006a37c475dce6a7723c7071670d4f2953725d2b33bcdc4b514fc96711ab9ba1c0e74a63eab089a25d5d9fc87ebca13f92a6dace4c43598a1355b87acf2fcad4dc4e6c686b85f2d3745b1cdef2f9ebd72286b5f81cb6aeab0f299865e259dc890c0526395464877e801bd13b4530b2fa33e30875e087f344a9d2fd2a9a6c33e2daa0ee04ca8639a44871bbf706a25bb342d9783dc84d9664bb8dce2aacbb6be03d8be61770aadf5e6cff6e3910fc9025c20bb428bea03902c9038cb1ddbda9d4349ff8a5e9ab5c7d80904c8c5aab896eb6cb10bfcdb937ff6cb31069910d866040a7d1d136a1e17ebaddc2803e1833d3d807eb8963d8569b1034f0eed7aa884797daf90b90eb897f0d2f836eb26d7daf85629e057bea01bd7d4c228d582cf96fb0078175aeac14aa2b913c065312fd1f1b1a5425faef20be1fbb23e0f43de209e7970e2671baaf50235fa97fa40acb607e0fe65785d92a28f25a30562b1748b779ae7c4c330d298ea0836fff5f2d6bca2d8fbe3250332c70ad960dd167c2795c752f972b2cb0e2f4c9bebd1ca6a403923ca18a2fee6bfaed8ed79d8c6ab0155fe0aa8afde90f15df3b5e9532c3c03fab20f6e2114e94771ff61272e52b94012551d6fb5a72d4387dd65882ad063530583774d940d9e3fa119806d7b2ba9712625bb661fe646148bbdf16fe8dd6a8209029c12a8f860d7ad26487c531754393284e561ea44b6db2770a216c054ba675c75baa358972ccab97785f0f07c5b93bc865b467933d518700e9ce14ca2f25ee5b0b2829c046e8c812081f728055921a05854b998fc1a114b9e5277514bf7de208a62f810d065e819669f69284d632c1653851a92d0d378b855633b4bfa68cc40983aa225bccc1469f1664ed1d105677ef6355425482280cc4fd29615e6697e486087d28fafbc2d416fb963be5da610d55f0b2d35260b40aa1dc0e1cf08b64e83963d4f67b39be0313fd843e0e405315b43c733d59e7c4e415660d2ebfe61ac9a35d5cd96a07de51c35c905c0034ae9c8d4694a286aed7460dc97580e9cc304fe0729c79bbaff282143f4bbfe2afdf4f82a481df85c46fc3839ebf1eebec7e798161560743774aceca5a4884474eeb666bdec5d3dd5c71e992b1dd3f41ed79250f5e55632f0e8073143152e2dc8bc6e0c7c31091b74edacb9d7395003525715a98da0c115065dfcd72de3c96bf42a611ed6c8525a0199aac74204b6267e789b2855cd7f1de0aecaf70bd42160d3ea50551a9a3bfdff6c5631d23bd62938443148602805ab4e6cf9142b153425af18ff43c6afc4a12c92cfb8a5e55dcf4ac28637900b5814fb029ea1050c9db5edcae509c2c47ca7231daf0ffd9603e5fe7937cd3c16cd733bbc839be03f7727d72c8ea823e9e6dcbc855176f4eb4d7ba7a4bfd98e349e42247efd7071cef425c354f0e5a3c2cf2a77a1e356f6ddf424b643c93d8ab5adba0e29f48c67641d77095acb9209659cce6b58d441c5a073d4a10db62a75aeda7408a21f492127b9357a4c9af38ed869f226a08cc7b4caa29f3a141c0182232b1184ff864d37c00e1941cca94730cb902e90dae706e1c2e5c74f2914b0aaea5b34f960a9acd8a91a965b05ac9617204532e27d34fa6257884e0490b1c990d3e99bd9c3752dd1587db5bf44636cf9f1ed67f978e8eabb2b000fa4e9466964b15c4cc5ab3282fa1da8f6ce84abfede4a8c11de09f836c3c05f84240e294964b54c0867c3995fed6d45c5f8b19ca89ffb23858e1d496bcb68c3f62ee0604bde85fea73dfeea8d2bf81831bd4dea07fd176319c851e64786b5af1560a341cc8ff27f67dac1e296526a7e2092f4044688a843b26483bf78e3dd182d006dbcb44f01dbc8f3e7a99c0f4011490121a85ae209cd539ca5daa74bbe4d9ae1f0489653b3a38a707fd19dc57593dcc6c7353f7b8793b15f8d71b45b11c6c5702429c7cbc493f0b402dd624e9fe735caf8b360ab0830637172084858968b79eceb58842c56874b70170eb2297430f27b4324e033c2580dddb8547a23baaa54625f69a8bc3c6df33f18197027d36232be8e71504d06089db808fdf43c2ec064a5f4b8295d734186c756f12c56d4c4b6b616c260cb4fa514f23a8336bab88b6b0c13910ed51d48682586ad69af604b773a8a337ec7b8b0d1c2580225b9e6643543df5401c23400a31c7f91692e7b37eb44160910e016530395ade3c6adac382de63d2e89d47fb9fe1a6ef5a187e0b4d565dde7c74f81de25b3fb00960f3e031db1d306f198558a79e1658e46e0d071314788330d6089d02bd2f29ae0a3d7604951887cf30c9ef7f7dde9422f7662bd88286d1ecbc2f18f3b9c44b704d18f32e0328e1ad847f3eff39bccd3e63ddedc6521505520d93e7ccf38aeda07a407c434f7f56568f150a7323e56b81f46fb27453ee7eb2d1962a2b88c0bae68cc8fdbd544216648de38137979475c39496331d73cd7b8dc9a7191f8be23bf42df406e421b08265fa223f35ad94b25f0f86e09aea20487a9303a02919ba54ea9d1bf8dfeba2e33f99f8dd69f3443397009760e3d1da4832fa1ce6b41b9455b4eaddc89e5b907fa1903c4792a0f78d15d5e622fea825e4431bb8438eafeaca3215143b8d78e7758083bfbb80c148e95f2a4eb37a790765bf55a06eec591150f3eb598ee85ddd6f8fca374bfff907d063e0de7f4a8d7fdce9da6ee9b3c4ce0d31f70c4932fc4060d2bb432ec7d8f65262fca5386f8fda73cd910d2d0569541e0643c94e4358e738649291a202d089f35cd822f05717b31644e30901d469915d095242a3abc98405c7e8e205b60b17d526d8dc3ed8c1a6324b37b9fdfa3f8d74eaa4bbc647dcf565a16f95dead098a0965326b83b1b8fce3a0ebaeac8b41f7cfd63ccdf8e2b03b407dcc0ae40f9ee0a969a5a4498b00e38bae52e3fe6622d99c04da9385aae6d532401047dee7e0576e3b13f522b8b399bfc7a0215bf0f44ec7a70f635c45ee7e6bbb2e00d9e4d25b46d20d60d24bd0172d541125b3221cdd4e4bd0a4510f9af352e99785f0293baa7f7a63b91ec75f01732f44415ada283ac8060bc0a03d3f779ae471796a5b0e3aad3214db5085600c91813f54d8066ab9ae40aafe39770ef038c5609633ae4fc8de4a7d0c5489d92a6a69a2d30a8decfe1bcc1463eff760087401f559eda407ee04377daaeda78f5f44853f892c321ad6bde18c4e6dd2c9d73b38c4022f37bc6566a4cdf594b58a20700b36c2b9e5038cb63819606a5db04f3a54f9e944c21707c4522157dc709ff53e9690b372f12a09ad2a37b3e6462c66beb5b71d4123807f0249231a63826eada9c8f2217bd6d54da670084abc48a7ed33cddd1819e8abbc032e191e01916e7c659296a585e99801654c80cfbfd3580bdc0a8fd82aaa9443db8f5d9df244fe4fde05660c779028fc997e7f9bf9c31b1bd4cb4bedfd6391290ac8ff9f941c1d9cadb0e28f7832332d8e8a407896c12f8a4384859a4a6c243508a60a9991d98b484f71b942a9fc2f6834403ef09c66f5e62d8ebfa74dcb0a65e7a559143627cfdbc6054e347e3fa1c7c92d2474bc54e71d2e3e7445183f5854efa6f2264388ef5be8e790acbd0c0b969c213ba6c1df5a3796107af23a38fc34149bdabee476b06c604f72410a1dd8e1002b9c9e7d244c9e322be8055ffc35a0e6ab2ddf43757f489f24463d85fbb91cbf19d3dc364f8f2baa017247a0ebcc0bd4166bd2898394b4e8165c0a68e1ab093a39c0267f978577fa9b9cf88aa008cb7ceaddbd600951bc2c2c03a0f1c40fda1d1d07b6333c3882656fb80112b80d0087ff0283b8149778df7d095b80ea1e6e70617dd9cb32f5a17e2c7600acaea358388120bfda33451651f1e862e24f5c201f49848cfa6706ad524c91b9b7bd7ca6050ed06f8605c3632f6e8b562289bfb08df10d0ee2dc0f5a7f49a2b89f409c2684f652460d39f878c31205b903d3e066966b320ec14c613a5654ad113838496c5fe565a7d79814d4aa0a501bc4d578e31c2caaded6527ed03837e23eb62007089315aee3ec1d90d7ba620a9590df88d537c353c32198cb8ba01bcecbfe7b583a77bda4ae82859cc3fd6fc10e32bc6ccb8b2dae6d735b590a3706cd770385d0491d0eaeff0bed3a7b9f310f53c70725c70c4909bbf284ad82d358731c1c9d4af2e1807fe576dcb1a61aefff2dc5ff01453a38020a34812bfedc38f7e6835eb154790a5b44ea21de0eb0f020a38e45d7b85f01e9e6a36a76c28ce42c8d60b9b6767697ce7169348401ca0c11de60131ad941452b2164a34a78b3bc0323a2e71f8bdada366957a47cfe90405d2a46fa9fced2b32a470cf8269ad026984ea21f0b8fbb4c0ff9e84062c97330dbe311278078ef2704c77515c354dd5b49d12881663459b5095fbc76ac8d05379b416883ba2f5c5d72952482adf5db3d37b9f3bde107f4db0c72ae4e93896075e1073c28a0f3cf139d1c77c131eca547ff13af915d47a0f76d369e832ffebc8f60b5eb25616aa3bf99a6355625d2bf1599cf0d066d3cfdfe30f708ecf141672a7995390fcee919c248d9bed74f473b412109c5b6411507f617dee638ef0138041727c2de807f4274c91cab7ea10e57e4b167934291ed335ac38352d333f51f30babe3dadccdd8ea7bc75bc586e33ad9020b9e08e86479c1c55ae24dccf22dc71d24fd5770fa3f6051bbb9c787a1ab3911fae59b961848c9888b51508a16a3e7e73de117d2a347ffbfc2803cb536302d3f49b582a505c68816e11cf170a39606c7ebfbcadc85d23d2448535a0eb335fea6221a6160432b5a0d3f826aa9c9fb14a05d940f5d3ae6122de81a5960f66e2128ae384cc1993bd8bf47c78589711a4870e0160caa37716f117ca4908641d91285c4200f9da872603ccaa1048a67ab3a149b89ce05253d933eef63b5f77f1153cde4a40af4b0eea7fe0cba52f314ba92eb68bc6f670006beb3c905f0f155d9aca0850cd0cc929ef30978a326ecf96c3b19c61395e374f3c933334cb4a3b71c4f44babef02ad1e4c61986c2acbad76b3ebe1807ed2b8d319c2b6c49a1739f86e69123520827c6654eff0423048b946222520d25fc1c1cf0856ea58cc42d9c14e6b7e09fa75b8043fbc3d713beaa8b4d4b87f9152601136ce2580668193b824e31b5833928d930ff4a9ed0ab1e0a3be0adf8cd0fdff2568ae8b05c4ba534450572c1d57d44914b4aecba8ccf71d3ec4a744b8893d70ed9f376e037328f41b02b55c5d18ec213036b52dfca4cad2f1866e980001ecf8ec040408a79536c1d06b9dc548db46b028029b1527d1806d303dd449aa7e771536ee49cf2278be5d0ceb1aa76db45eadd52fcbc3c428e855a20bc392ad70d27847438eef348dc9cb642f9e7ef95e0ae4cf62d8eeb319ebe449d455e303b2a2dc47f34070328edb1622f3f7a6953e51976a3f60c8647202d6263d556342af6e351259a33678dd5557c9a96dab244d1d3dd445024d17b0e28a1ab490e23078cf2a5c4addf6d304bb833fdf416139a125b2ded8922fb2468c48b6620778480f8992f41ffbdb25a56c15b6aefa802252537d6835913965406c1c588466ef515fd55d34085cfee08554a16c09e792fe7a1fb350d732f281f5a6cb89b07bd1ae814896c8738e2b2c06314519561f59d514eba5b4bceb1c0ee49e4c387746dba01ee7bb79341f8c4226adf03b3ccc3f85fdcdd1ebba094c549e62d9a6822e65ba5c72444154a24a9330cf88ad7bcc44facec6784130d25fd22e0bb91d8c939b4e616d83380fa1a965e6c14a06acab4ad5a935da229c078451fc04fe16bbc86b1dd41727beaabb7f5b75740e0ddffe16804cfce21d97c9fc0aeb48104975099650916faa9211bd2fac58e715c3dd707e6be2cfc1b4f03425b0a052277fb527260fdf6f6cb4da62c477055488507782ef8066b636dcaa051b2c2e5c15585055a64d9f044acda94a9abe1daf10433107a6ca8e1f792837c6ccc057fe9ea04b749d6d0460fcd92f11dba2f1b710e801ef063de3b46cdfa9d6c0acd1a30ba1ca6a67fcf8fa6124f00d1847c466872ec32d288437252d63cc9adabc83c389b55ebe36f1d12b377a0ca8587316ec01700cdbd5a2e370e4787513042e7d0ffd59dc74b68a1f6e5f2c1b0000c4dd22b8e15bc0b9794a1f5b05ab32c6171813a6afb650b06931029cdded6b8a29061dd88144295b48705cd23556ccb93cd74bfb3c0867d8ecdee90cbc57d56bfe9e248d9719847d9610fa6ea28bca5fbdcf7ba1a7843bb2c641431119b838fd3247408f2ad1082aae4e0dabf40ca2fc98f2dd4dcf84c73f12b7b9f94f8742cbc5be33d86a1b53a1b92db420aa11f999d5eb78555bb784fac0c32adfa4d7cb1e148c7b709e149e539c38462b4f3614c53d135468ab1df940c31255019ee98088dc76ae50413bfb41a929b12e1e7bfd4f3c591af7cd4b62208cbc24dffd47c26d4047e7b98c6c06cf0aa4552bfe1ab149acccbfb19aba5726de7db35a3467f0293da33da144dcfff740758d96af1a41cc92cbe2fdb6da955b18b9cd7ae51282d6593e56e12fbb7b1f5650a4ad6c955616fc04ffe70fe740279a6e98957b53c2fa246d1251b920c4c3a22a47ea2089496f128b93a85459bbe3f6647345f661e8b8a51c5b0f1fe949136513367e3b12d50bbd9e5e0871fad2302926ae1fad0ace1f96d71b650119a1178620e47ff1e191ad4b8f5c52ee3eff41be67d0569b32ec401d2c1fbd884f7bee0dfba122ab4cc86e859563bf30be7755ef825ba997fa2fded4acdf8bb1640abf44a3cb4c39b2a44a4931c64872199e6ec63e476366bf7a8f1ab191297cfd7c28b456428037cd6d4868309c1974b96c612e93ff7d8a39828f5936d0aff478af6d25b2672f4147474003bea3c97b753fa08de227bed249ad740386823d6e1c76e1805119a288123da297e6f3e6eaa99e0c4f76f68d3c75b9560fd6a6a523bda8892287379f1ca0762911a2058ac3d3ee93f58a634ac057b0038b9b2ed61af4baf2ffb55d1a9dc89348e119a4b7341231b125a9ff399aceb889753dab772c6d67c7f0a84145d942592c66d56fd7cc93eabd182a00cd91af021d3311e705577f18f8d63ffb4fd42b8f894bd78421c4eca19ed0e3d296162696d6997aa33621deb717db1922c68c500b80dacf5ea69e38b3194b15c1280525670c20a1583621577066979f5e8acc99671d49c190eb55e244b949dd5b3059ea86ee9889cfe9cb8ea090c8d566e8a4ac2d2a936c18ce7accc040f0cc3deafa7811daddb41e4fe960846f2afcaee7c7e702ee304dcb22e967d8a83c49adfd705fa11b5049af463daed513bb2402d503823708771b67d1dfcd6f4fa942957f835109e4831456a9eebf78037c4a497a8fc27e9db35b6992bcb10bd86172e0cca9a34b83e7a38d93c4a57e92786b5e5dcea71dfc231da72d9568572570432d54b865ed59e61b323e4ccf0084b70da8f4ef26b51bf8a0f2b6a93f9296c2ec83ac475ad4c1191742972fd828fdaab190ccd6673a74404abad34607f3267ebd3c4aed5d0d8c0bba9bc873a4bb5fcc7d7543697e2b9a994327c9c56c75c4a67081f2428e7e64cef5f824e09a92e527cbc7035fcb32aff905bd34f2eef4edd3b445bf51c3b52e0a7275944cae464ee376bb44b0dbcaa6ed1e9291c5041a018907b2fd2aa7462aee990cda87f61ddbc26b707fbb8bfce8b17167029cd6feee0832f2eb5e253fa52acf0c1e68c8dc56b773db3eeb97e0f87dfcb84e77e7f8e1ddf8ed026afb360c5eda086950aeeeaa05bec490d3e5d49189cf6d62692015eda38d48e280c62e226ed607ef6f182b51d1cc26edb71ccf6f5987bbc06277c78466f664f5f719433e2d7807ad82a3986481012cf42457f296545d703219c2066b689f90e9f87a806a3a9d6df6e6ba09d46221a8e9769906a59a7bfe7cd33d4ddfd261be6ab8f6428a0cf34adba039e1f5f4bd06cbda584818dc386ee2eebbc077608fc7c939fe01844420b106466ae7dc349951fa9f3f8acffc20c3f8eaf051b994a198bb400e4116413afd37615fac9fc33fc2903efbb8ff8c461321a5ec9141fc6c2be2243633d4fe0fb2401e2ffdb9ac50a260f6f72942ed33658578f6d27cb24f571a6091e8e6ff22e894fc747d065773b95993d1789207e673022eae0c2483377753e7cc1c9f4dfd43f12313adb86517c0f555a2ef93f25481573ea63dcef7f65ca2417df4fa5f5ca7e44edd0fe8992a051fe06edf2c500e573c901d973c612dee5d07acbd7af072a6e3b12f90dd77f11f074da47233e7ab4342b6f9acf1dbb32b9f2687177b54400e46f4ecc91e6dcae1e5e4ac38f6cf377c669bc115e0cf2e278e346e7b6436b8c2a06c2a1bc6cf974843be36be698b90c8c6a0c08630c1c377f84580874d238ab658d45166d20072dcc0779afb8963a5146cb3352875e58ba570a5f59e3403637abd66258897bded393072735d17b414fa47dcdc3467aba566d94222aba6600d8a23a7a73c1140a6406bcda84266b7ff22f2beaf2467af726fbdc4dd98661eac3199d0bb64e025c3708708a43a3aacd570c1d1ab80463d42ee35d19ea4eb04d9ec944a3532b469b14ec80d95e1f7ac491bf4f9e40588d0a0465c168d788afb946392b18a21d6a21094f4f80d59b3eb18c8afb99629f02f14089cb5e0021dfb648f87348f1098837c7a3201d219bfdf6190d36473624f7a621503053725f176e6a853a0c56ff95600b8fa18d358a1653647456e9e594ad98a29416ae636d2ffca62df7e6612cd357e43d9f4fd0dccc31d69ca898edd7d74be9ce594bfffd57cfb46975f2cc87df5d4b520ee78d8529781153eae6fa1b3838e5b894e7d9cf27011cbd8c8486eff493d6d9793c578e678a3b59fe468b07c31da6d1ee7fca406d0c4c5f914e6c1604bea26aa1a5a3300151fff29a3faf0889ff246d84e23e39be8603b5f4c1258cb8bb0d607a55efa8694649d349f40e89524b8b0208fa30c36a12999e7d8b2d8b5f1d74b260def084a9aa1b842c71df512e83d7fa955870f4495a49e73b3c0861b715002284c1a0f6238c3c942295eba343d38525f132ff4e6815b112999b28082dcfc9ec7d0657879193d58fa7aa1220a8cb9efff201a81adfc2f81aba6577d48bfcc3ba8fd937dbda12fea578cf391d68e6e22315812a1d90423c5ec772144a81d844fe7e9b05eae6a0acffdc1472bbb289224d93b78bd0e202e5ebe109f299c829b6cbea90b5f7279166b1136bb34e1ea5936e0040f029f800b6f2b4d3758634efef41524118319e15d9e78de07cbf62ec5ed4c1c244c6bda57b8ee9bef7f4e6797e98f6a8152b20b93ea12a44a969e48651a1a542683e81ca5d1294680eafafad743f2109f803991b5a7c0b656e61fa594509ed4d85f000e2e6f75c32653ede9a4ef40023da97bfb709d9c02a4b8c68e0fc274334570b16aa2112ea850bdcd96ecec1af9f6af9e2fd43341c342c18d6df48da5437fdbbeacda89ddd6a96d649ddd9a3a0388ca19795f163be68efe874120d37f346c8f1cc1633c1b09f9fea613828cfb50437e888795e91b4b435d7fdb92bd5fc450f2a4d40b2cec18889608f53d83c47620267c7b5e88c566acffe7d4272a1092f7973e6721f8f2ca94b1fa18854a4aba492c50ff1da71b24af254001f59f6521c37e1928c4502a72a051d365f34d17f5af754ff242fa8f8b4d60fc800e2274a9110025b509ecc90e531d9f0f0530a5945ff131b60bfc7377ed4e5a495c897e8518f2614f36276be6abe04b5a5184d37dd1e1f5bad8c69696bb399c13e7b2da7abaec267662536a8b2a4f762b88eb72a795cb7cdb391489b83775b2ca28ca5f3355de8d55b99fba000253ee333307836faaa8cb39f368d59802d619462b92b746c31737c8ec8aa272c1f6535c5eb58106936b85291bddca4825aa04677bab63fc99e666d470d6a38c2866d35ba3c0755ce4b2d3264c06f4bf0bd3e107f8178cd14f6b2983ed3669ed060917c99a2bd96350f7c92c7b378f6d40c0cee894b3520349b33a9a4c5ec795110e7c79092e97e4a53ad509f3c32d7e58bb6af0bd57b46c5d06fd5f8086ecb31735d854a1476e1ce5c2a6ba7aaf4d5b34ece416feba96fcde62bec9d3f941a598a7d58cb2e910a7665bbaa99a57fe636e20f22fccc1664251cf8b045e0c07e0fe2b7d4ff7d93a00f327a3b7828940c28b496e3a2c63dbaea2d8faeeff05d6ce797fafd8c0e91d80e637261d797d5a08a0cd429890637d5b7acf3178c70729a4792d2d16c779f1788104346e20d69b3b087c45aedeecdfd9810419e76e01d3efdbfc07d970fe6fde6d282b01e3c648c21f27710bec1240bf44c40de5fad40a141e35b0b0c5d9fe1a6fc86898055e100bc997f2cb84e81ef630f03ebcbcc64e738504e6955722cfdda835118460dbce886a6c0d66e52c266b625f1a0916a8d715f2c8a67f4878b3cfe3a7efb04d3b0dd7b90c8fb6686167bf5e3a4c41c2916ea2fa3f44314a650d35f26cea677d30f15d33ce82379e6d474af1158cc411172daab19186d55dd37269f9b9297439a5d53ad3fa5d48ba19a1b0e58762a98462c515aa618df73fbd749ff5160c1e5e2813acc26d30982f752f3debec6886b0f654f99ae807b731f1e3ff8d747bffa3ba73517cb8ac628202abc9bb22f5ad918b543d2a7cff5b66e80f85de8a4b88a9ffd5748b47605c53bc53daefd17abc312a4a5918dfa88de375b6a34cce180f3c566a5fd20bb22924cc88d5e81159da6fced4078caedc8dac83984e97476d232fcfe2b0bf4b789676c083a7a9b7b9d7de952fae7f75c67bbef396a510b42d8ad8093853b4ea1de1b4d44168ac5d49f343cde610653b1f5963fd7925a50cefe9dfadcd4edcd46a4ee0d50e90d501b8774c2305a58f7724132824037489589aa00d63a58039934dcfb132736ec9cc1d0d1c1750b78fd61bda90022ec07b10c3659f89372e038256fefbd543eb9298bcfddeb0ae5fa9900ee39f3b7e38dca3f57f2dcb6c4e25292b9dbffbd348abf3b4cc07e3fc01ee3f4bafbbf6a25c45772a6e1dd90a020b9990baea3021f6509076accbbaccca40aff9f3ff6bf6f70e9504b57c6b4775fa5e793f35817c1e14b7fac21f707d3fb0717a88d00aac0d08f1da217918fb5e91ebb2f82e08516755717ab629cfcaaefdb1fe69be02e508920e9a796bc1241790daf160adb9b5989bcb4be8fb5d49947c9b8a3ed1fca79c6d38d7cdd9ca81627c72e8eb7410050094d0704e6ff372284366488576bf8a8b9b9da10eedd3db75597f5d64a865f7fd434e79fe964694dad48f08592d3f79b51cc596325368cf6f8caa0dc2af563dd8ac399298a996fe3377ca65079c189156bb327dc64fd56d4583cee10cae5de09a32817ca09b08e81b2deccd22d7f19f5705857654e4f1278dedb69aa484ad97e71c97f1d697de4a2b67","isRememberEnabled":true,"rememberDurationInDays":30,"salt":"bda3ddfcb8a68bfbfaa3be616d357f7a"};

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
