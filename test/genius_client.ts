import { GeniusClient } from "../lib";
import { expect, assert } from "chai";
import nock from "nock";
import fs from "fs";
import {
  ITransportRequest,
  CEDScreen,
  ExternalPaymentTypes,
  CEDBoolean
} from "../lib/Genius/definitions";

import { impatientFetch } from "../src/Genius";

describe("GeniusClient", () => {
  const config = {
    MerchantName: "TEST",
    MerchantSiteId: "000000",
    MerchantKey: "00000-00000-00000-00000-00000",
    CEDHostname: "10.0.0.76"
  };
  let client: GeniusClient;
  // const genius = new GeniusClient(config);
  const CEDUrl = `https://${config.CEDHostname}:8443`;

  before(async () => {
    client = await GeniusClient.createInstance(config);
  });

  it("is defined", () => {
    expect(GeniusClient).to.not.be.undefined;
  });

  it("initializes with config", () => {
    expect(client.config).to.equal(config);
  });

  describe("StageTransaction", () => {
    it("allows you to submit non-sensitive payment information to the payment gateway and returns a unique key (TransportKey) in the response which will be used for all subsequent steps to identify the transaction", async () => {
      const transaction: ITransportRequest = {
        TransactionType: "SALE",
        ClerkId: "1",
        Dba: "ZERO INC",
        SoftwareName: "POS Software",
        SoftwareVersion: "1",
        Amount: 1.01,
        OrderNumber: "TEST-1",
        TaxAmount: 0.1,
        EnablePartialAuthorization: false
      };

      nock("https://transport.merchantware.net")
        .get("/v4/transportService.asmx?WSDL")
        .reply(200, fs.readFileSync(__dirname + "/fixtures/xml/WSDL.xml"));

      nock("https://transport.merchantware.net")
        .post("/v4/transportService.asmx")
        .reply(
          201,
          fs.readFileSync(
            __dirname + "/fixtures/xml/StageTransactionResponse.xml"
          )
        );

      const result = await client.StageTransaction(transaction);
      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.TransportKey).to.equal(
        "d4e59cb1-e5d9-49bf-a6b9-b8284a8709c3"
      );
    });

    it("returns an error for failed fetch", async () => {
      const transaction: ITransportRequest = {
        TransactionType: "SALE",
        ClerkId: "1",
        Dba: "ZERO INC",
        SoftwareName: "POS Software",
        SoftwareVersion: "1",
        Amount: 1.01,
        OrderNumber: "TEST-1",
        TaxAmount: 0.1,
        EnablePartialAuthorization: false
      };

      nock("https://transport.merchantware.net")
        .get("/v4/transportService.asmx?WSDL")
        .reply(200, fs.readFileSync(__dirname + "/fixtures/xml/WSDL.xml"));

      nock("https://transport.merchantware.net")
        .post("/v4/transportService.asmx")
        .reply(500, "Error");

      const result = await client.StageTransaction(transaction);
      expect(result instanceof Error).to.be.true;
    });
  });

  describe("impatientFetch", async () => {
    it("A Timeout Error is thrown if the request takes to long", async () => {
      nock("http://www.github.com")
        .get("/noop")
        .delayBody(2000)
        .replyWithError("Timeout Error");

      const result = await impatientFetch("http://www.github.com/noop", 1_000)
        .then(resp => resp.json())
        .catch(err => err.message);

      expect(result).to.be.equal("Timeout Error");
    });

    it("A Timeout Error is NOT thrown when the specified time isn't exceeded", async () => {
      nock("http://www.github.com")
        .get("/noop")
        .delayBody(1000)
        .reply(200, "ok");

      const result = await impatientFetch("http://www.github.com/noop", 2_000)
        .then(resp => resp.text())
        .catch(err => err.message);

      expect(result).to.be.equal("ok");
    });
  });

  describe("InitiateTransaction", () => {
    it("prompts the customer to select the payment type and complete the transaction", async () => {
      const TransportKey = "cc604260-4b07-494a-865d-f228c8780eb3";
      nock(CEDUrl)
        .get("/v2/pos")
        .query({
          TransportKey,
          Format: "JSON"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/InitiateTransaction.json")
        );

      const result = await client.InitiateTransaction(TransportKey);

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("APPROVED");
      expect(result.AmountApproved).to.equal("1.00");
    });

    it("returns an error for failed fetch", async () => {
      const TransportKey = "abc-123";

      nock(CEDUrl)
        .get("/v2/pos")
        .query({ TransportKey, Format: "JSON" })
        .reply(500, null);

      const result = await client.InitiateTransaction(TransportKey);
      expect(result instanceof Error).to.be.true;
    });
  });

  describe("CheckStatus", () => {
    it("sends a request to the CED to check which screen the device is on", async () => {
      nock(CEDUrl)
        .get("/v2/pos")
        .query({ Action: "Status", Format: "JSON" })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/CheckStatus.json")
        );

      const result = await client.CheckStatus();

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Online");
      expect(result.CurrentScreen).to.equal(CEDScreen["Idle screen"]);
      expect(result.ResponseMessage).to.equal("");
      expect(result.SerialNumber).to.equal("WSC00000000");
      expect(result.ApplicationVersion).to.equal("H1.0.1.68");
      expect(result.AdditionalParameters.PaymentDataCaptured).to.equal(false);
      expect(result.AdditionalParameters.RemoveEMVCard).to.equal(false);
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v2/pos")
        .query({ Action: "Status", Format: "JSON" })
        .reply(500, null);

      const result = await client.CheckStatus();
      expect(result instanceof Error).to.be.true;
    });
  });

  describe("StartOrder", () => {
    it("initiates the line item display screen and the start of the transaction", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({ Action: "StartOrder", Order: "1000", Format: "JSON" })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/StartOrder.json")
        );
      const result = await client.StartOrder("1000");

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({ Action: "StartOrder", Order: "1000", Format: "JSON" })
        .reply(500, null);

      const result = await client.StartOrder("1000");
      expect(result instanceof Error).to.be.true;
    });
  });

  describe("EndOrder", () => {
    it("completes the line item display for transactions completed outside of the Genius CED", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "EndOrder",
          Order: "1000",
          Format: "JSON",
          ExternalPaymentType: "Cash"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/EndOrder.json")
        );

      const result = await client.EndOrder("1000", ExternalPaymentTypes.Cash);
      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "EndOrder",
          Order: "1000",
          Format: "JSON",
          ExternalPaymentType: "Cash"
        })
        .reply(500, null);

      const result = await client.EndOrder("1000", ExternalPaymentTypes.Cash);
      expect(result instanceof Error).to.be.true;
    });
  });

  describe("Cancel", () => {
    it("sends a request to the CED to cancel the current transaction", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "Cancel",
          Format: "JSON"
        })
        .reply(200, fs.readFileSync(__dirname + "/fixtures/json/Cancel.json"));

      const result = await client.Cancel();
      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Cancelled");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "Cancel",
          Format: "JSON"
        })
        .reply(500, null);

      const result = await client.Cancel();
      expect(result instanceof Error).to.be.true;
    });
  });

  describe("AddItem", () => {
    it("adds an item to the line display screen and display updated data for tax and total amounts", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "AddItem",
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
          Category: "None",
          Format: "JSON"
        })
        .reply(200, fs.readFileSync(__dirname + "/fixtures/json/AddItem.json"));

      const result = await client.AddItem({
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

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
      expect(result.ItemID).to.equal("1");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "AddItem",
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
          Category: "None",
          Format: "JSON"
        })
        .reply(500, null);

      const result = await client.AddItem({
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

      expect(result instanceof Error).to.be.true;
    });
  });

  describe("DiscountItem", () => {
    it("add a discount line item to the display screen and display updated data for tax and total amounts.", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "DiscountItem",
          TargetItemID: "1",
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
          Category: "None",
          Format: "JSON"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/DiscountItem.json")
        );

      const result = await client.DiscountItem({
        Order: "1000",
        TargetItemID: "1",
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

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
      expect(result.ItemID).to.equal("3");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "DiscountItem",
          TargetItemID: "1",
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
          Category: "None",
          Format: "JSON"
        })
        .reply(500, null);

      const result = await client.DiscountItem({
        Order: "1000",
        TargetItemID: "1",
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

      expect(result instanceof Error).to.be.true;
    });
  });

  describe("DeleteItem", () => {
    it("deletes an item from the items list", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Order: "1000",
          TargetItemID: "1",
          OrderTotal: "0",
          OrderTax: "0",
          Action: "DeleteItem",
          Format: "JSON"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/DeleteItem.json")
        );

      const result = await client.DeleteItem({
        Order: "1000",
        TargetItemID: "1",
        OrderTotal: "0",
        OrderTax: "0"
      });

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Order: "1000",
          TargetItemID: "1",
          OrderTotal: "0",
          OrderTax: "0",
          Action: "DeleteItem",
          Format: "JSON"
        })
        .reply(500, null);

      const result = await client.DeleteItem({
        Order: "1000",
        TargetItemID: "1",
        OrderTotal: "0",
        OrderTax: "0"
      });

      expect(result instanceof Error).to.be.true;
    });
  });

  describe("DeleteAllItems", () => {
    it("deletes all items from the items list", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Order: "1000",
          Action: "DeleteAllItems",
          OrderTotal: "0",
          OrderTax: "0",
          Format: "JSON",
          RetainPaymentData: "false"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/DeleteAllItems.json")
        );

      const result = await client.DeleteAllItems({
        Order: "1000",
        RetainPaymentData: CEDBoolean.False,
        OrderTotal: "0",
        OrderTax: "0"
      });

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Order: "1000",
          Action: "DeleteAllItems",
          OrderTotal: "0",
          OrderTax: "0",
          Format: "JSON",
          RetainPaymentData: "false"
        })
        .reply(500, null);

      const result = await client.DeleteAllItems({
        Order: "1000",
        RetainPaymentData: CEDBoolean.False,
        OrderTotal: "0",
        OrderTax: "0"
      });

      expect(result instanceof Error).to.be.true;
    });
  });

  describe("UpdateItem", () => {
    it("updates an existing item", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "UpdateItem",
          TargetItemID: "1",
          Order: "1000",
          Type: "Sku",
          TypeValue: "xxx",
          UPC: "UPC123",
          Quantity: "2",
          Description: "Pad Prik Pow",
          Amount: "12.25",
          TaxAmount: "0",
          OrderTotal: "24.50",
          OrderTax: "0",
          Category: "None",
          Format: "JSON"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/UpdateItem.json")
        );

      const result = await client.UpdateItem({
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

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "UpdateItem",
          TargetItemID: "1",
          Order: "1000",
          Type: "Sku",
          TypeValue: "xxx",
          UPC: "UPC123",
          Quantity: "2",
          Description: "Pad Prik Pow",
          Amount: "12.25",
          TaxAmount: "0",
          OrderTotal: "24.50",
          OrderTax: "0",
          Category: "None",
          Format: "JSON"
        })
        .reply(500, null);

      const result = await client.UpdateItem({
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

      expect(result instanceof Error).to.be.true;
    });
  });

  describe("UpdateTotal", () => {
    it("updates the order totals without adding/removing items", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "UpdateTotal",
          Order: "1000",
          OrderTotal: "20.25",
          OrderTax: "0",
          Format: "JSON"
        })
        .reply(
          200,
          fs.readFileSync(__dirname + "/fixtures/json/UpdateTotal.json")
        );

      const result = await client.UpdateTotal({
        Order: "1000",
        OrderTotal: "20.25",
        OrderTax: "0"
      });

      if (result instanceof Error) {
        assert(false, "Result is an error");
        return;
      }

      expect(result.Status).to.equal("Success");
    });

    it("returns an error for failed fetch", async () => {
      nock(CEDUrl)
        .get("/v1/pos")
        .query({
          Action: "UpdateTotal",
          Order: "1000",
          OrderTotal: "20.25",
          OrderTax: "0",
          Format: "JSON"
        })
        .reply(500, null);

      const result = await client.UpdateTotal({
        Order: "1000",
        OrderTotal: "20.25",
        OrderTax: "0"
      });

      expect(result instanceof Error).to.be.true;
    });
  });
});
