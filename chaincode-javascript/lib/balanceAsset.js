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
const queryAsset = require('./queryAsset-ConstructorAttempt');
let queryContract = new queryAsset();
const ClientIdentity = require('fabric-shim').ClientIdentity;


class balanceAsset extends Contract {

    async BalanceSR(ctx, submissionID){
        //ABAC
        let cid = new ClientIdentity(stub);
        if (cid.assertAttributeValue('role', 'approver')) { 
            throw new Error('Not a valid user');
        }

        const exists = await queryContract.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await queryContract.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "balancedSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }

    async CumulateSR(ctx, submissionID){
        //ABAC
        let cid = new ClientIdentity(stub);
        if (cid.assertAttributeValue('role', 'approver')) { 
            throw new Error('Not a valid user');
        }

        const exists = await queryContract.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await queryContract.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "cumulatedSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }


}
module.exports = balanceAsset
