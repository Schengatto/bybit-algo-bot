"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const base64_1 = require("../../core/helpers/base64");
const encryptPassword = (encryptionKey, timestamp, password) => {
    try {
        // const input = stringToBytes(password + "|" + timestamp);
        const input = `${password}|${timestamp}`;
        (0, base64_1.encodeBase64)(input);
        KeyFactory;
        keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        PublicKey;
        publicKey = keyFactory.generatePublic(new X509EncodedKeySpec(Base64.decodeBase64(stringToBytes(encryptionKey))));
        Cipher;
        cipher = Cipher.getInstance(PKCS1_PADDING_TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[];
        output = cipher.doFinal(input);
        output = Base64.encodeBase64(output);
        return bytesToString(output);
    }
    catch (Exception) { }
    e;
    {
        throw new RuntimeException(e);
    }
};
exports.encryptPassword = encryptPassword;
