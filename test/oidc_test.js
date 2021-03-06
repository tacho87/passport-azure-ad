/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* eslint-disable no-new */

'use strict';

const OidcStrategy = require('../lib/index').OIDCStrategy;

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

function noop() {}

exports.oidc = {
  'no args': (test) => {
    test.expect(1);
    // tests here
    test.throws(() => { new OidcStrategy(); },
      TypeError,
      'Should fail with no arguments)'
    );

    test.done();
  },
  'no verify function': (test) => {
    test.expect(1);
    // tests here
    test.throws(() => { new OidcStrategy({}, null); },
      TypeError,
      'Should fail with no verify function (2nd argument)'
    );

    test.done();
  },

  'no options': (test) => {
    test.expect(1);
    // tests here

    test.throws(
      () => {
        new OidcStrategy({}, noop);
      },
      TypeError,
      'Should fail with no OIDC config options'
    );

    test.done();
  },
  'with missing option resposneType': (test) => {
    test.expect(1);
    // tests here

    const oidcConfig = {
      // required options
      identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      responseType: 'id_tokennn', // for login only flows use id_token. For accessing resources use `id_token code`
    };
    test.throws(
      () => {
        const s = new OidcStrategy(oidcConfig, noop);
        s.loadOptions(oidcConfig, noop);
      },
      TypeError,
      'Should fail with wrong reponses config options'
    );

    test.done();
  },
  'with missing option resposneMode': (test) => {
    test.expect(1);
    // tests here

    const oidcConfig = {
      // required options
      identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      responseMode: 'fragment', // For login only flows we should have token passed back to us in a POST
    };
    test.throws(
      () => {
        const s = new OidcStrategy(oidcConfig, noop);
        s.loadOptions(oidcConfig, noop);
      },
      Error,
      'Should fail with wrong reponses config options'
    );

    test.done();
  },
  'with options': (test) => {
    test.expect(1);
    // tests here

    const oidcConfig = {
      // required options
      identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration',
      issuer: 'http://localhost:3000', // this is the URI you entered for APP ID URI when configuring SSO for you app on Azure AAD
    };

    test.doesNotThrow(
      () => {
        new OidcStrategy(oidcConfig, noop);
      },
      Error,
      'Should not fail with proper OIDC config options'
    );

    test.done();
  },
};
