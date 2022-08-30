/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');
let queryContract = new queryAsset();


class accountingAsset extends Contract {


    async SettlePayment(ctx, submissionID){
        const exists = await queryContract.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await queryContract.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "settledSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }

    async ClearPayment(ctx, submissionID){
        const exists = await queryContract.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await queryContract.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "clearedSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }

}
module.exports = accountingAsset