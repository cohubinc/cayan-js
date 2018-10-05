import { expect } from "chai";
import nock from "nock";
import fs from "fs";
import { MerchantwareGiftCardClient } from "../lib";
import {
  IGiftPaymentData,
  IActivateCardRequest,
  IAddPointsRequest,
  IAddValueRequest,
  IGiftResponse45,
  ReaderEntryMode
} from "../lib/Merchantware/GiftCard/definitions";

describe("MerchantwareGiftCardClient", () => {
  const config = {
    MerchantName: "ZERO INC",
    MerchantSiteId: "00000000",
    MerchantKey: "00000-00000-00000-00000-00000"
  };

  const stubSoap = (xml = null) => {
    if (xml) {
      return nock("https://ps1.merchantware.net").post(
        "/Merchantware/ws/ExtensionServices/v45/Giftcard.asmx",
        xml
      );
    } else {
      return nock("https://ps1.merchantware.net").post(
        "/Merchantware/ws/ExtensionServices/v45/Giftcard.asmx"
      );
    }
  };

  let client: MerchantwareGiftCardClient = null;

  before(async () => {
    client = await MerchantwareGiftCardClient.createInstance(config);
  });

  it("is defined", () => {
    expect(MerchantwareGiftCardClient).to.not.be.undefined;
  });

  describe("ActivateCard", () => {
    it("activates, and adds value to, a new stored value card", async () => {
      const PaymentData: IGiftPaymentData = {
        Source: "READER",
        TrackData:
          "%1234567890123456^GIFTCARD/TEST^00000000000000000?;1234567890123456=00000000000000000?"
      };

      const Request: IActivateCardRequest = {
        Amount: "1.29",
        InvoiceNumber: "Transaction1000",
        MerchantTransactinoID: "a1234"
      };

      stubSoap(ActivateCardXML).reply(
        200,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/GiftCard/ActivateCard.xml"
        )
      );

      const result: IGiftResponse45 = await client.ActivateCard(
        PaymentData,
        Request
      );
      expect(result.ApprovalStatus).to.equal("APPROVED");
      expect(result.ResponseMessage).to.equal("928061");
      expect(result.Token).to.equal("MC0110");
      expect(result.InvoiceNumber).to.equal("Transaction1000");
      expect(result.TransactionDate).to.equal("10/10/2008 1:13:55 PM");
      expect(result.ExpirationDate).to.equal("080729");
      expect(result.CardNumber).to.equal("***********3456");
      expect(result.ReaderEntryMode).to.equal(ReaderEntryMode.Magneticstripe);
      expect(result.Gift.ApprovedAmount).to.equal("1.29");
      expect(result.Gift.RequestedAmount).to.equal("1.29");
      expect(result.Gift.RedeemableBalance).to.equal("1.29");
    });
  });

  describe("AddPoints", () => {
    it("adds points to a card's point balance", async () => {
      const PaymentData: IGiftPaymentData = {
        Source: "READER",
        TrackData:
          "%1234567890123456^GIFTCARD/TEST^00000000000000000?;1234567890123456=00000000000000000?"
      };

      const Request: IAddPointsRequest = {
        AmountType: "CURRENCY",
        Amount: "1.29",
        InvoiceNumber: "Transaction1000",
        MerchantTransactionId: "a1234"
      };

      stubSoap(AddPointsXML).reply(
        200,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/GiftCard/AddPoints.xml"
        )
      );

      const result: IGiftResponse45 = await client.AddPoints(
        PaymentData,
        Request
      );

      expect(result.ApprovalStatus).to.equal("APPROVED");
      expect(result.ResponseMessage).to.equal("928061");
      expect(result.Token).to.equal("MC0110");
      expect(result.InvoiceNumber).to.equal("Transaction1000");
      expect(result.TransactionDate).to.equal("10/10/2008 1:13:55 PM");
      expect(result.ExpirationDate).to.equal("080729");
      expect(result.CardNumber).to.equal("***********3456");
      expect(result.ReaderEntryMode).to.equal(ReaderEntryMode.Magneticstripe);
      expect(result.Loyalty.PointsType).to.equal("FREQUENCY");
      expect(result.Loyalty.ApprovedPoints).to.equal("1");
      expect(result.Loyalty.PointsBeforeNextReward).to.equal("5");
      expect(result.Loyalty.PointsBalance).to.equal("7");
    });
  });

  describe("AddValue", () => {
    it("adds value to a stored value card", async () => {
      const PaymentData: IGiftPaymentData = {
        Source: "READER",
        TrackData:
          "%1234567890123456^GIFTCARD/TEST^00000000000000000?;1234567890123456=00000000000000000?"
      };

      stubSoap().reply(
        200,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/GiftCard/AddValue.xml"
        )
      );

      const Request: IAddValueRequest = {
        Amount: "1.29",
        InvoiceNumber: "Transaction1000",
        MerchantTransactionId: "a1234"
      };

      const result: IGiftResponse45 = await client.AddValue(
        PaymentData,
        Request
      );
      expect(result.ApprovalStatus).to.equal("APPROVED");
      expect(result.ResponseMessage).to.equal("928061");
      expect(result.Token).to.equal("MC0110");
      expect(result.InvoiceNumber).to.equal("Transaction1000");
      expect(result.TransactionDate).to.equal("10/10/2008 1:13:55 PM");
      expect(result.ExpirationDate).to.equal("080729");
      expect(result.CardNumber).to.equal("***********3456");
      expect(result.ReaderEntryMode).to.equal(ReaderEntryMode.Magneticstripe);
      expect(result.Gift.ApprovedAmount).to.equal("1.29");
      expect(result.Gift.RequestedAmount).to.equal("1.29");
      expect(result.Gift.RedeemableBalance).to.equal("100.00");
    });
  });
});

const ActivateCardXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ActivateCard xmlns="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><Amount>1.29</Amount><InvoiceNumber>Transaction1000</InvoiceNumber><MerchantTransactinoID>a1234</MerchantTransactinoID></Request></ActivateCard></soap:Body></soap:Envelope>`;
const AddPointsXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><AddPoints xmlns="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><AmountType>CURRENCY</AmountType><Amount>1.29</Amount><InvoiceNumber>Transaction1000</InvoiceNumber><MerchantTransactionId>a1234</MerchantTransactionId></Request></AddPoints></soap:Body></soap:Envelope>`;
