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
const ClientIdentity = require('fabric-shim').ClientIdentity;


class queryAsset extends Contract {
    constructor(){
        super('queryAsset')
    }
    // ReadAsset returns the asset stored in the world state with given salesReturnsTransactionID.
    async ReadAsset(ctx, submissionID) {
        const assetJSON = await ctx.stub.getState(submissionID); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

   // GetAllAssets returns all assets found in the world state.
   async GetAllAssets(ctx) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange('', '');
    let result = await iterator.next();
    while (!result.done) {
        const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        let record;
        try {
            record = JSON.parse(strValue);
        } catch (err) {
            console.log(err);
            record = strValue;
        }
        allResults.push(record);
        result = await iterator.next();
    }
    return JSON.stringify(allResults);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, submissionID) {
        const assetJSON = await ctx.stub.getState(submissionID);
        return assetJSON && assetJSON.length > 0;
    }


}
module.exports = queryAsset