# cayan

A Javascript library for talking to the Cayan APIs

<!-- [![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url] -->

## Install (not published yet)

```bash
yarn add cayan
```

or

```bash
npm install cayan --save
```

## Usage

### Genius APIs

Initialize the client with your merchant credentials and the hostname of your CED device.

```javascript
import { GeniusClient } from "cayan";

const config = {
  MerchantName: "TEST",
  MerchantSiteId: "000000",
  MerchantKey: "00000-00000-00000-00000-00000",
  CEDHostname: "10.0.0.76"
};

const genius = await GeniusClient.createInstance(config);
```

Once you've initialized the Genius client, here are the operations you now have access to:

- [StageTransaction](#stagetransaction)
- [CheckStatus](#checkstatus)
- [StartOrder](#startorder)
- [EndOrder](#endorder)
- [Cancel](#cancel)
- [AddItem](#additem)
- [DeleteItem](#deleteitem)
- [DeleteAllItems](#deleteallitems)
- [DiscountItem](#discountitem)
- [UpdateItem](#updateitem)
- [UpdateTotal](#updatetotal)

---

#### StageTransaction

Allows you to submit non-sensitive payment information to the payment gateway and returns a unique key (TransportKey) in the response which will be used for all subsequent steps to identify the transaction. [API Docs](https://cayan.com/developers/genius/transactions#stage)

```javascript
const transaction = {
  TransactionType: "SALE",
  ClerkId: "1",
  Dba: "Acme Inc",
  SoftwareName: "Your Project",
  SoftwareVersion: "1",
  Amount: 1.01,
  OrderNumber: "1000",
  TaxAmount: 0.1
};

const result = await genius.StageTransaction(transaction);
```

---

#### CheckStatus

Sends a request to the CED to check which screen the device is on. [API Docs](https://cayan.com/developers/genius/transactions#status)

A list of possible `CurrentScreen` values and their meanings can be found [here](https://cayan.com/developers/knowledge-base/faqs/what-are-the-genius-status-call-possible-responses)

```javascript
const result = await genius.CheckStatus();

// Example Return Value
{
  "Status": "Online",
  "CurrentScreen": "00",
  "ResponseMessage": "",
  "SerialNumber": "WSC00000000",
  "ApplicationVersion": "H1.0.1.68",
  "OSVersion": "7.0",
  "AdditionalParameters": {
    "PaymentDataCaptured": false,
    "RemoveEMVCard": false
  }
}
```

---

#### StartOrder

Initiates the line item display screen and the start of the transaction.

```javascript
const result = await genius.StartOrder("ORDER-NUMBER-HERE");

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "AdditionalParameters": {}
}
```

---

#### EndOrder

Completes the line item display for transactions completed outside of the Genius CED. Should only be used when payment is accepted outside of the Genius CED. For example, if a consumer pays with cash or check. [API Docs](https://cayan.com/developers/genius/transactions#end-transaction)

```javascript
const result = await genius.EndOrder("ORDER-NUMBER-HERE", "Cash | Check | StoreCredit | Other");

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "AdditionalParameters": {}
}
```

---

#### Cancel

Sends a request to the CED to cancel the current transaction [API Docs](https://cayan.com/developers/genius/transactions#cancel)

```javascript
const result = await genius.Cancel();

// Example Return Value
{
  "Status": "Cancelled",
  "ResponseMessage": "",
  "AdditionalParameters": {}
}
```

---

#### AddItem

Adds an item to the line display screen and display updated data for tax and total amounts [API Docs](https://cayan.com/developers/genius/line-item-display#additem)

```javascript
const result = await genius.AddItem({
  Order: "1000",
  Type: "Sku",
  TypeValue: "xxx",
  UPC: "UPC123",
  Quantity: "1",
  Description: "Pad Prik Pow",
  Amount: "12.25",
  TaxAmount: "0",
  OrderTotal: "12.25",
  OrderTax: "0",
  Category: "None"
});

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "ItemID": "1",
  "AdditionalParameters": {}
}
```

---

#### DiscountItem

Adds a discount line item to the display screen and display updated data for tax and total amounts. This will apply a negative value to the order. Note: If you delete the item associated with the discount, you must also delete the discount. [API Docs](https://cayan.com/developers/genius/line-item-display#discountitem)

```javascript
const result = await genius.DiscountItem({
  Order: "1000",
  TargetItemID: "1",
  Type: "Sku",
  TypeValue: "xxx",
  UPC: "UPC123",
  Quantity: "1",
  Description: "Pad Prik Pow",
  Amount: "2.25",
  TaxAmount: "0",
  OrderTotal: "10.00",
  OrderTax: "0",
  Category: "None"
});

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "ItemID": "3",
  "AdditionalParameters": {}
}
```

---

#### DeleteItem

Deletes an item from the items list [API Docs](https://cayan.com/developers/genius/line-item-display#deleteitem)

```javascript
const result = await genius.DeleteItem({
  Order: "1000",
  TargetItemID: "1",
  OrderTotal: "0",
  OrderTax: "0"
});

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "AdditionalParameters": {}
}
```

---

#### DeleteAllItems

Deletes all items from the items list [API Docs](https://cayan.com/developers/genius/line-item-display#deleteall)

```javascript
const result = await genius.DeleteAllItems({
  Order: "1000",
  RetainPaymentData: CEDBoolean.False,
  OrderTotal: "0",
  OrderTax: "0"
});

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "AdditionalParameters": {}
}
```

---

#### UpdateItem

Updates an existing item [API Docs](https://cayan.com/developers/genius/line-item-display#updateitem)

```javascript
const result = await genius.UpdateItem({
  Order: "1000",
  TargetItemID: "1",
  Type: "Sku",
  TypeValue: "xxx",
  UPC: "UPC123",
  Quantity: "2",
  Description: "Pad Prik Pow",
  Amount: "12.25",
  TaxAmount: "0",
  OrderTotal: "24.50",
  OrderTax: "0",
  Category: "None"
});

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "ItemID": "4",
  "AdditionalParameters": {}
}
```

---

#### UpdateTotal

Updates the order totals without adding/removing items [API Docs](https://cayan.com/developers/genius/line-item-display#updatetotal)

```javascript
const result = await genius.UpdateTotal({
  Order: "1000",
  OrderTotal: "20.25",
  OrderTax: "0"
});

// Example Return Value
{
  "Status": "Success",
  "ResponseMessage": "",
  "AdditionalParameters": {}
}
```

<!-- ## License -->

<!-- [MIT](http://vjpr.mit-license.org) -->

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master
