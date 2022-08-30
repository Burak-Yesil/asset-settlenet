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

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                SalesReturnsTransactionID: "100",
                CustomerID: "673038879772327",
                AccountID: "9403383513748187627",
                AccountType: "LOC",
                MerchantID: "9774974428",
                ProcessorID: "4036943357",
                ServicerSysID: "457296",
                SubmissionID: "49416087768766425",
                PresentmentNumber: "01",
                SubmissionTimeStamp: "1577858461",
                SalesReturnsTransactionType: "sales",
                SalesReturnsTransactionAmt: 199.00,
                SalesReturnsTransactionCurrencyCode: "USD",
                SalesReturnsTransactionTimestamp: "1577858461",
                OrderTimestamp: "1577858450",
                ShippingTimestamp: "1577858451",
                SalesReturnCurrentState: "submittedSR",
                ReasonCode: "because ....",
                AuthorizationID: "23948230948",
                AuthorizationCode: "authorized",
                AuthorizationTimestamp: "1577858440",
                AuthorizedAmt: 200.00,
                AuthorizedSysID: "Blah",
                CNPIndicator: 'Y',
            },
            {
                SalesReturnsTransactionID: "101",
                CustomerID: "673038879772327",
                AccountID: "9403383513748187627",
                AccountType: "LOC",
                MerchantID: "9774974428",
                ProcessorID: "4036943357",
                ServicerSysID: "457296",
                SubmissionID: "94160877687661111",
                PresentmentNumber: "01",
                SubmissionTimeStamp: "1577858461",
                SalesReturnsTransactionType: "sales",
                SalesReturnsTransactionAmt: 299.00,
                SalesReturnsTransactionCurrencyCode: "USD",
                SalesReturnsTransactionTimestamp: "1577858461",
                OrderTimestamp: "1577858450",
                ShippingTimestamp: "1577858451",
                SalesReturnCurrentState: "submittedSR",
                ReasonCode: "because ....",
                AuthorizationID: "23948230948",
                AuthorizationCode: "authorized",
                AuthorizationTimestamp: "1577858440",
                AuthorizedAmt: 200.00,
                AuthorizedSysID: "Blah",
                CNPIndicator: 'Y',
            },
            {
                SalesReturnsTransactionID: "102",
                CustomerID: "673038879772327",
                AccountID: "9403383513748187627",
                AccountType: "LOC",
                MerchantID: "9774974428",
                ProcessorID: "4036943357",
                ServicerSysID: "457296",
                SubmissionID: "59416087768766000",
                PresentmentNumber: "01",
                SubmissionTimeStamp: "1577858461",
                SalesReturnsTransactionType: "sales",
                SalesReturnsTransactionAmt: 69.00,
                SalesReturnsTransactionCurrencyCode: "USD",
                SalesReturnsTransactionTimestamp: "1577858461",
                OrderTimestamp: "1577858450",
                ShippingTimestamp: "1577858451",
                SalesReturnCurrentState: "submittedSR",
                ReasonCode: "because ....",
                AuthorizationID: "23948230948",
                AuthorizationCode: "authorized",
                AuthorizationTimestamp: "1577858440",
                AuthorizedAmt: 100.00,
                AuthorizedSysID: "Blah",
                CNPIndicator: 'Y',
            },
            {
                SalesReturnsTransactionID: "103",
                CustomerID: "673038879772327",
                AccountID: "9403383513748187627",
                AccountType: "LOC",
                MerchantID: "9774974428",
                ProcessorID: "4036943357",
                ServicerSysID: "457296",
                SubmissionID: "62959416087768766425",
                PresentmentNumber: "01",
                SubmissionTimeStamp: "1577858461",
                SalesReturnsTransactionType: "sales",
                SalesReturnsTransactionAmt: 199.00,
                SalesReturnsTransactionCurrencyCode: "USD",
                SalesReturnsTransactionTimestamp: "1577858461",
                OrderTimestamp: "1577858450",
                ShippingTimestamp: "1577858451",
                SalesReturnCurrentState: "submittedSR",
                ReasonCode: "because ....",
                AuthorizationID: "23948230948",
                AuthorizationCode: "authorized",
                AuthorizationTimestamp: "1577858440",
                AuthorizedAmt: 200.00,
                AuthorizedSysID: "Blah",
                CNPIndicator: 'Y',
            },
            {
                SalesReturnsTransactionID: "104",
                CustomerID: "673038879772327",
                AccountID: "9403383513748187627",
                AccountType: "LOC",
                MerchantID: "9774974428",
                ProcessorID: "4036943357",
                ServicerSysID: "457296",
                SubmissionID: "42629594160877687620121",
                PresentmentNumber: "01",
                SubmissionTimeStamp: "1577858461",
                SalesReturnsTransactionType: "sales",
                SalesReturnsTransactionAmt: 10.00,
                SalesReturnsTransactionCurrencyCode: "USD",
                SalesReturnsTransactionTimestamp: "1577858461",
                OrderTimestamp: "1577858450",
                ShippingTimestamp: "1577858451",
                SalesReturnCurrentState: "submittedSR",
                ReasonCode: "because ....",
                AuthorizationID: "23948230948",
                AuthorizationCode: "authorized",
                AuthorizationTimestamp: "1577858440",
                AuthorizedAmt: 15.00,
                AuthorizedSysID: "Blah",
                CNPIndicator: 'Y',
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convention of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresponding hash
            await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // SubmitSR issues a new asset to the world state with given details.
    async SubmitSR(ctx, 
        salesReturnsTransactionID, customerID, accountID, accountType, merchantID, 
        processorID, servicerSysID, submissionID, presentmentNumber, submissionTimeStamp,
        salesReturnsTransactionType, salesReturnsTransactionAmt, salesReturnsTransactionCurrencyCode,
        salesReturnsTransactionTimestamp, orderTimestamp, shippingTimestamp,
        reasonCode, authorizationID, authorizationCode, authorizationTimestamp, authorizedAmt, 
        authorizedSysID, cNPIndicator) {
        const exists = await this.AssetExists(ctx, submissionID);
        if (exists) {
            throw new Error(`The asset ${submissionID} already exists`);
        }

        const asset = {
            SalesReturnsTransactionID: salesReturnsTransactionID,
            CustomerID: customerID,
            AccountID: accountID,
            AccountType: accountType,
            MerchantID: merchantID,
            ProcessorID: processorID,
            ServicerSysID: servicerSysID,
            SubmissionID: submissionID,
            PresentmentNumber: presentmentNumber,
            SubmissionTimeStamp: submissionTimeStamp,
            SalesReturnsTransactionType: salesReturnsTransactionType,
            SalesReturnsTransactionAmt: salesReturnsTransactionAmt,
            SalesReturnsTransactionCurrencyCode: salesReturnsTransactionCurrencyCode,
            SalesReturnsTransactionTimestamp: salesReturnsTransactionTimestamp,
            OrderTimestamp: orderTimestamp,
            ShippingTimestamp: shippingTimestamp,
            SalesReturnCurrentState: "submittedSR",
            ReasonCode: reasonCode,
            AuthorizationID: authorizationID,
            AuthorizationCode: authorizationCode,
            AuthorizationTimestamp: authorizationTimestamp,
            AuthorizedAmt: authorizedAmt,
            AuthorizedSysID: authorizedSysID,
            CNPIndicator: cNPIndicator,   
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given salesReturnsTransactionID.
    async ReadAsset(ctx, submissionID) {
        const assetJSON = await ctx.stub.getState(submissionID); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateSalesReturnCurrentState(ctx, submissionID, salesReturnCurrentState) {
        const exists = await this.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await this.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = salesReturnCurrentState;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;

    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, submissionID) {
        const assetJSON = await ctx.stub.getState(submissionID);
        return assetJSON && assetJSON.length > 0;
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

    async BalanceSR(ctx, submissionID){
        const exists = await this.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await this.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "balancedSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }

    async CumulateSR(ctx, submissionID){
        const exists = await this.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await this.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "cumulatedSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }

    async SettlePayment(ctx, submissionID){
        const exists = await this.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await this.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "settledSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }

    async ClearPayment(ctx, submissionID){
        const exists = await this.AssetExists(ctx, submissionID);
        if (!exists) {
            throw new Error(`The asset ${submissionID} does not exist`);
        }
        const assetString = await this.ReadAsset(ctx, submissionID);
        const asset = JSON.parse(assetString);
        const oldSalesReturnCurrentState = asset.SalesReturnCurrentState;
        asset.SalesReturnCurrentState = "clearedSR";
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.SubmissionID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldSalesReturnCurrentState;
    }




}

module.exports = AssetTransfer;