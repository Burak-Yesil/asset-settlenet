/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

//const assetTransfer = require('./lib/assetTransfer');
const submitAsset = require('./lib/submitAsset')
const queryAsset = require('./lib/queryAsset')
const accountingAsset =  require('./lib/accountingAsset')
const balanceAsset = require('./lib/balanceAsset')


module.exports.submitAsset = submitAsset;
module.exports.queryAsset = queryAsset;
module.exports.accountingAsset = accountingAsset;
module.exports.balanceAsset = balanceAsset;

module.exports.contracts = [submitAsset, accountingAsset, balanceAsset, queryAsset];
