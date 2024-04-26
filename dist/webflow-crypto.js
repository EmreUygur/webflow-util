"use strict";
/*
 * webflow-crypto
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Hashing & Cryptographic Utilities
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _XXH64_seed, _XXH64_v1, _XXH64_v2, _XXH64_v3, _XXH64_v4, _XXH64_memory, _XXH64_len, _XXH64_memsize;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XXH32 = exports.XXH64 = void 0;
// xxhash64 implementation
// Copyright 2019-2020, Yann Collet <github.com/Cyan4973>
// Copyright 2016, Pierre Curto <github.com/pierrec>
// Copyright 2019, Daniel Lo Nigro <github.com/Daniel15>
// Copyright 2021, intrnl <github.com/intrnl>
// https://codeberg.org/intrnl/js-xxhash64/src/branch/trunk/src/index.js
const PRIME64_1 = 11400714785074694791n;
const PRIME64_2 = 14029467366897019727n;
const PRIME64_3 = 1609587929392839161n;
const PRIME64_4 = 9650029242287828579n;
const PRIME64_5 = 2870177450012600261n;
const BITS = 64n;
const BITMASK = 2n ** BITS - 1n;
const encoder = new TextEncoder();
function bitsToBigInt(a00, a16, a32, a48) {
    return (BigInt(a00) |
        (BigInt(a16) << 16n) |
        (BigInt(a32) << 32n) |
        (BigInt(a48) << 48n));
}
function memoryToBigInt(memory, offset) {
    return (BigInt(memory[offset]) |
        (BigInt(memory[offset + 1]) << 8n) |
        (BigInt(memory[offset + 2]) << 16n) |
        (BigInt(memory[offset + 3]) << 24n) |
        (BigInt(memory[offset + 4]) << 32n) |
        (BigInt(memory[offset + 5]) << 40n) |
        (BigInt(memory[offset + 6]) << 48n) |
        (BigInt(memory[offset + 7]) << 56n));
}
function rotl(value, rotation) {
    return ((value << rotation) & BITMASK) | (value >> (BITS - rotation));
}
function trunc(value) {
    return BigInt.asUintN(64, value);
}
class XXH64 {
    constructor(seed = 0) {
        _XXH64_seed.set(this, void 0);
        _XXH64_v1.set(this, void 0);
        _XXH64_v2.set(this, void 0);
        _XXH64_v3.set(this, void 0);
        _XXH64_v4.set(this, void 0);
        _XXH64_memory.set(this, void 0);
        _XXH64_len.set(this, void 0);
        _XXH64_memsize.set(this, void 0);
        this.reset(seed);
    }
    reset(seed = __classPrivateFieldGet(this, _XXH64_seed, "f")) {
        __classPrivateFieldSet(this, _XXH64_seed, BigInt.asUintN(32, BigInt(seed)), "f");
        __classPrivateFieldSet(this, _XXH64_v1, trunc(__classPrivateFieldGet(this, _XXH64_seed, "f") + PRIME64_1 + PRIME64_2), "f");
        __classPrivateFieldSet(this, _XXH64_v2, trunc(__classPrivateFieldGet(this, _XXH64_seed, "f") + PRIME64_2), "f");
        __classPrivateFieldSet(this, _XXH64_v3, __classPrivateFieldGet(this, _XXH64_seed, "f"), "f");
        __classPrivateFieldSet(this, _XXH64_v4, trunc(__classPrivateFieldGet(this, _XXH64_seed, "f") - PRIME64_1), "f");
        __classPrivateFieldSet(this, _XXH64_memory, null, "f");
        __classPrivateFieldSet(this, _XXH64_len, 0, "f");
        __classPrivateFieldSet(this, _XXH64_memsize, 0, "f");
        return this;
    }
    update(input) {
        if (typeof input === "string") {
            input = encoder.encode(input);
        }
        let p = 0;
        let len = input.length;
        let bEnd = p + len;
        if (len === 0) {
            return this;
        }
        __classPrivateFieldSet(this, _XXH64_len, __classPrivateFieldGet(this, _XXH64_len, "f") + len, "f");
        if (__classPrivateFieldGet(this, _XXH64_memsize, "f") === 0) {
            __classPrivateFieldSet(this, _XXH64_memory, new Uint8Array(32), "f");
        }
        if (__classPrivateFieldGet(this, _XXH64_memsize, "f") + len < 32) {
            __classPrivateFieldGet(this, _XXH64_memory, "f").set(input.subarray(0, len), __classPrivateFieldGet(this, _XXH64_memsize, "f"));
            __classPrivateFieldSet(this, _XXH64_memsize, __classPrivateFieldGet(this, _XXH64_memsize, "f") + len, "f");
            return this;
        }
        if (__classPrivateFieldGet(this, _XXH64_memsize, "f") > 0) {
            __classPrivateFieldGet(this, _XXH64_memory, "f").set(input.subarray(0, 32 - __classPrivateFieldGet(this, _XXH64_memsize, "f")), __classPrivateFieldGet(this, _XXH64_memsize, "f"));
            let p64 = 0;
            let other;
            other = memoryToBigInt(__classPrivateFieldGet(this, _XXH64_memory, "f"), p64);
            __classPrivateFieldSet(this, _XXH64_v1, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v1, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
            p64 += 8;
            other = memoryToBigInt(this.memory, p64);
            __classPrivateFieldSet(this, _XXH64_v2, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v2, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
            p64 += 8;
            other = memoryToBigInt(this.memory, p64);
            __classPrivateFieldSet(this, _XXH64_v3, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v3, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
            p64 += 8;
            other = memoryToBigInt(this.memory, p64);
            __classPrivateFieldSet(this, _XXH64_v4, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v4, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
            p += 32 - __classPrivateFieldGet(this, _XXH64_memsize, "f");
            __classPrivateFieldSet(this, _XXH64_memsize, 0, "f");
        }
        if (p <= bEnd - 32) {
            const limit = bEnd - 32;
            do {
                let other;
                other = memoryToBigInt(input, p);
                __classPrivateFieldSet(this, _XXH64_v1, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v1, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
                p += 8;
                other = memoryToBigInt(input, p);
                __classPrivateFieldSet(this, _XXH64_v2, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v2, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
                p += 8;
                other = memoryToBigInt(input, p);
                __classPrivateFieldSet(this, _XXH64_v3, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v3, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
                p += 8;
                other = memoryToBigInt(input, p);
                __classPrivateFieldSet(this, _XXH64_v4, trunc(rotl(trunc(__classPrivateFieldGet(this, _XXH64_v4, "f") + other * PRIME64_2), 31n) * PRIME64_1), "f");
                p += 8;
            } while (p <= limit);
        }
        if (p < bEnd) {
            __classPrivateFieldGet(this, _XXH64_memory, "f").set(input.subarray(p, bEnd), __classPrivateFieldGet(this, _XXH64_memsize, "f"));
            __classPrivateFieldSet(this, _XXH64_memsize, bEnd - p, "f");
        }
        return this;
    }
    digest() {
        let input = __classPrivateFieldGet(this, _XXH64_memory, "f");
        let bEnd = __classPrivateFieldGet(this, _XXH64_memsize, "f");
        let p = 0;
        let h64 = 0n;
        let h = 0n;
        let u = 0n;
        if (__classPrivateFieldGet(this, _XXH64_len, "f") >= 32) {
            h64 =
                rotl(__classPrivateFieldGet(this, _XXH64_v1, "f"), 1n) +
                    rotl(__classPrivateFieldGet(this, _XXH64_v2, "f"), 7n) +
                    rotl(__classPrivateFieldGet(this, _XXH64_v3, "f"), 12n) +
                    rotl(__classPrivateFieldGet(this, _XXH64_v4, "f"), 18n);
            h64 = trunc(h64 ^ (rotl(trunc(__classPrivateFieldGet(this, _XXH64_v1, "f") * PRIME64_2), 31n) * PRIME64_1));
            h64 = trunc(h64 * PRIME64_1 + PRIME64_4);
            h64 = trunc(h64 ^ (rotl(trunc(__classPrivateFieldGet(this, _XXH64_v2, "f") * PRIME64_2), 31n) * PRIME64_1));
            h64 = trunc(h64 * PRIME64_1 + PRIME64_4);
            h64 = trunc(h64 ^ (rotl(trunc(__classPrivateFieldGet(this, _XXH64_v3, "f") * PRIME64_2), 31n) * PRIME64_1));
            h64 = trunc(h64 * PRIME64_1 + PRIME64_4);
            h64 = trunc(h64 ^ (rotl(trunc(__classPrivateFieldGet(this, _XXH64_v4, "f") * PRIME64_2), 31n) * PRIME64_1));
            h64 = trunc(h64 * PRIME64_1 + PRIME64_4);
        }
        else {
            h64 = trunc(__classPrivateFieldGet(this, _XXH64_seed, "f") + PRIME64_5);
        }
        h64 += BigInt(__classPrivateFieldGet(this, _XXH64_len, "f"));
        while (p <= bEnd - 8) {
            u = memoryToBigInt(input, p);
            u = trunc(rotl(trunc(u * PRIME64_2), 31n) * PRIME64_1);
            h64 = trunc(rotl(h64 ^ u, 27n) * PRIME64_1 + PRIME64_4);
            p += 8;
        }
        if (p + 4 <= bEnd) {
            u = bitsToBigInt((input[p + 1] << 8) | input[p], (input[p + 3] << 8) | input[p + 2], 0, 0);
            h64 = trunc(rotl(h64 ^ trunc(u * PRIME64_1), 23n) * PRIME64_2 + PRIME64_3);
            p += 4;
        }
        while (p < bEnd) {
            u = bitsToBigInt(input[p++], 0, 0, 0);
            h64 = trunc(rotl(h64 ^ trunc(u * PRIME64_5), 11n) * PRIME64_1);
        }
        h = trunc(h64 >> 33n);
        h64 = trunc((h64 ^ h) * PRIME64_2);
        h = trunc(h64 >> 29n);
        h64 = trunc((h64 ^ h) * PRIME64_3);
        h = trunc(h64 >> 32n);
        h64 = trunc(h64 ^ h);
        return h64;
    }
    static hash(input, seed = 0) {
        return new XXH64(seed).update(input).digest().toString(16); // Hex
    }
}
exports.XXH64 = XXH64;
_XXH64_seed = new WeakMap(), _XXH64_v1 = new WeakMap(), _XXH64_v2 = new WeakMap(), _XXH64_v3 = new WeakMap(), _XXH64_v4 = new WeakMap(), _XXH64_memory = new WeakMap(), _XXH64_len = new WeakMap(), _XXH64_memsize = new WeakMap();
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// https://www.npmjs.com/package/blueimp-md5-es6
// https://github.com/pvorb/node-md5/issues/52
// https://code.tutsplus.com/tutorials/how-to-hash-and-decrypt-with-md5-in-javascript--cms-38297
// import CryptoJS from '';
// import * as md5 from 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js';
// const toUtf8_1 = require("https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/toUtf8.js");
const PRIME32_1 = 2654435761;
const PRIME32_2 = 2246822519;
const PRIME32_3 = 3266489917;
const PRIME32_4 = 668265263;
const PRIME32_5 = 374761393;
// https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/toUtf8.js
function toUtf8_1(text) {
    const bytes = [];
    const w = new Array(4);
    const h = [0x00, 0xc0, 0xe0, 0xf0];
    const m = [0x7f, 0x3f, 0x3f, 0x3f];
    const p = [0x00, 0x80, 0x80, 0x80];
    for (const char of text) {
        const b = w;
        const cp = char.codePointAt(0);
        const n = 0 -
            (-(cp & 0xffffff80) >> 31) -
            (-(cp & 0xfffff800) >> 31) -
            (-(cp & 0xffff0000) >> 31);
        const z = m[n];
        const y = p[n];
        b[3] = y | (cp & z);
        b[2] = y | ((cp >>> 6) & z);
        b[1] = y | ((cp >>> 12) & z);
        b[0] = y | ((cp >>> 18) & z);
        const s = 3 - n;
        b[s] |= h[n];
        Array.prototype.push.apply(bytes, b.slice(s));
    }
    return new Uint8Array(bytes);
}
class XXH32 {
    /**
     *
     * @param buffer - byte array or string
     * @param seed - optional seed (32-bit unsigned);
     */
    // https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/xxHash32.js
    static hash(buffer, seed = 0) {
        buffer = typeof buffer === "string" ? toUtf8_1(buffer) : buffer;
        const b = buffer;
        /*
                Step 1. Initialize internal accumulators
                Each accumulator gets an initial value based on optional seed input. Since the seed is optional, it can be 0.
    
                ```
                    u32 acc1 = seed + PRIME32_1 + PRIME32_2;
                    u32 acc2 = seed + PRIME32_2;
                    u32 acc3 = seed + 0;
                    u32 acc4 = seed - PRIME32_1;
                ```
                Special case : input is less than 16 bytes
                When input is too small (< 16 bytes), the algorithm will not process any stripe. Consequently, it will not
                make use of parallel accumulators.
    
                In which case, a simplified initialization is performed, using a single accumulator :
    
                u32 acc  = seed + PRIME32_5;
                The algorithm then proceeds directly to step 4.
            */
        let acc = (seed + PRIME32_5) & 0xffffffff;
        let offset = 0;
        if (b.length >= 16) {
            const accN = [
                (seed + PRIME32_1 + PRIME32_2) & 0xffffffff,
                (seed + PRIME32_2) & 0xffffffff,
                (seed + 0) & 0xffffffff,
                (seed - PRIME32_1) & 0xffffffff,
            ];
            /*
                      Step 2. Process stripes
                      A stripe is a contiguous segment of 16 bytes. It is evenly divided into 4 lanes, of 4 bytes each.
                      The first lane is used to update accumulator 1, the second lane is used to update accumulator 2, and so on.
      
                      Each lane read its associated 32-bit value using little-endian convention.
      
                      For each {lane, accumulator}, the update process is called a round, and applies the following formula :
      
                      ```
                      accN = accN + (laneN * PRIME32_2);
                      accN = accN <<< 13;
                      accN = accN * PRIME32_1;
                      ```
      
                      This shuffles the bits so that any bit from input lane impacts several bits in output accumulator.
                      All operations are performed modulo 2^32.
      
                      Input is consumed one full stripe at a time. Step 2 is looped as many times as necessary to consume
                      the whole input, except the last remaining bytes which cannot form a stripe (< 16 bytes). When that
                      happens, move to step 3.
                  */
            const b = buffer;
            const limit = b.length - 16;
            let lane = 0;
            for (offset = 0; (offset & 0xfffffff0) <= limit; offset += 4) {
                const i = offset;
                const laneN0 = b[i + 0] + (b[i + 1] << 8);
                const laneN1 = b[i + 2] + (b[i + 3] << 8);
                const laneNP = laneN0 * PRIME32_2 + ((laneN1 * PRIME32_2) << 16);
                let acc = (accN[lane] + laneNP) & 0xffffffff;
                acc = (acc << 13) | (acc >>> 19);
                const acc0 = acc & 0xffff;
                const acc1 = acc >>> 16;
                accN[lane] =
                    (acc0 * PRIME32_1 + ((acc1 * PRIME32_1) << 16)) & 0xffffffff;
                lane = (lane + 1) & 0x3;
            }
            /*
                      Step 3. Accumulator convergence
                      All 4 lane accumulators from previous steps are merged to produce a single remaining accumulator
                      of same width (32-bit). The associated formula is as follows :
      
                      ```
                      acc = (acc1 <<< 1) + (acc2 <<< 7) + (acc3 <<< 12) + (acc4 <<< 18);
                      ```
                  */
            acc =
                (((accN[0] << 1) | (accN[0] >>> 31)) +
                    ((accN[1] << 7) | (accN[1] >>> 25)) +
                    ((accN[2] << 12) | (accN[2] >>> 20)) +
                    ((accN[3] << 18) | (accN[3] >>> 14))) &
                    0xffffffff;
        }
        /*
                Step 4. Add input length
                The input total length is presumed known at this stage. This step is just about adding the length to
                accumulator, so that it participates to final mixing.
    
                ```
                acc = acc + (u32)inputLength;
                ```
            */
        acc = (acc + buffer.length) & 0xffffffff;
        /*
                Step 5. Consume remaining input
                There may be up to 15 bytes remaining to consume from the input. The final stage will digest them according
                to following pseudo-code :
                ```
                while (remainingLength >= 4) {
                    lane = read_32bit_little_endian(input_ptr);
                    acc = acc + lane * PRIME32_3;
                    acc = (acc <<< 17) * PRIME32_4;
                    input_ptr += 4; remainingLength -= 4;
                }
                ```
                This process ensures that all input bytes are present in the final mix.
            */
        let limit = buffer.length - 4;
        for (; offset <= limit; offset += 4) {
            const i = offset;
            const laneN0 = b[i + 0] + (b[i + 1] << 8);
            const laneN1 = b[i + 2] + (b[i + 3] << 8);
            const laneP = laneN0 * PRIME32_3 + ((laneN1 * PRIME32_3) << 16);
            acc = (acc + laneP) & 0xffffffff;
            acc = (acc << 17) | (acc >>> 15);
            acc =
                ((acc & 0xffff) * PRIME32_4 + (((acc >>> 16) * PRIME32_4) << 16)) &
                    0xffffffff;
        }
        /*
                ```
                while (remainingLength >= 1) {
                    lane = read_byte(input_ptr);
                    acc = acc + lane * PRIME32_5;
                    acc = (acc <<< 11) * PRIME32_1;
                    input_ptr += 1; remainingLength -= 1;
                }
                ```
            */
        for (; offset < b.length; ++offset) {
            const lane = b[offset];
            acc = acc + lane * PRIME32_5;
            acc = (acc << 11) | (acc >>> 21);
            acc =
                ((acc & 0xffff) * PRIME32_1 + (((acc >>> 16) * PRIME32_1) << 16)) &
                    0xffffffff;
        }
        /*
                Step 6. Final mix (avalanche)
                The final mix ensures that all input bits have a chance to impact any bit in the output digest,
                resulting in an unbiased distribution. This is also called avalanche effect.
                ```
                acc = acc xor (acc >> 15);
                acc = acc * PRIME32_2;
                acc = acc xor (acc >> 13);
                acc = acc * PRIME32_3;
                acc = acc xor (acc >> 16);
                ```
            */
        acc = acc ^ (acc >>> 15);
        acc =
            (((acc & 0xffff) * PRIME32_2) & 0xffffffff) +
                (((acc >>> 16) * PRIME32_2) << 16);
        acc = acc ^ (acc >>> 13);
        acc =
            (((acc & 0xffff) * PRIME32_3) & 0xffffffff) +
                (((acc >>> 16) * PRIME32_3) << 16);
        acc = acc ^ (acc >>> 16);
        // turn any negatives back into a positive number;
        return acc < 0 ? acc + 4294967296 : acc;
    }
}
exports.XXH32 = XXH32;
//https://cdnjs.com/libraries/crypto-js
// https://cryptojs.gitbook.io/docs/
// https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.min.js
// https://stackoverflow.com/questions/56280825/crypto-js-module-is-imported-but-does-not-work-as-expected
// import "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/core.min.js";
//import * as CryptoJS from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
//  import HmacMD5 from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/hmac-md5.min.js";
// import * as CryptoJS from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.js";
// import * as XXH from "https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/xxHash32.js";
//import * as xx from "https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/index.js";
// import { xxHash32 } from "https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/index.js";
// https://cdn.jsdelivr.net/npm/js-xxhash@1.0.4/dist/index.js
// https://github.com/bryc/code/blob/master/jshash/hashes/murmurhash3.js
function MurmurHash3(key, seed = 0) {
    var k, p1 = 3432918353, p2 = 461845907, h = seed | 0;
    for (var i = 0, b = key.length & -4; i < b; i += 4) {
        k = (key[i + 3] << 24) | (key[i + 2] << 16) | (key[i + 1] << 8) | key[i];
        k = Math.imul(k, p1);
        k = (k << 15) | (k >>> 17);
        h ^= Math.imul(k, p2);
        h = (h << 13) | (h >>> 19);
        h = (Math.imul(h, 5) + 3864292196) | 0; // |0 = prevent float
    }
    k = 0;
    switch (key.length & 3) {
        case 3:
            k ^= key[i + 2] << 16;
        case 2:
            k ^= key[i + 1] << 8;
        case 1:
            k ^= key[i];
            k = Math.imul(k, p1);
            k = (k << 15) | (k >>> 17);
            h ^= Math.imul(k, p2);
    }
    h ^= key.length;
    h ^= h >>> 16;
    h = Math.imul(h, 2246822507);
    h ^= h >>> 13;
    h = Math.imul(h, 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
}
//# sourceMappingURL=webflow-crypto.js.map