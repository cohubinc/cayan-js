import { expect } from "chai";
import nock from "nock";
import fs from "fs";
import { MerchantwareCreditClient } from "../lib";
import {
  ITransactionResponse45,
  IPaymentData,
  IAuthorizationRequest,
  ITipRequest,
  ISignatureRequest,
  ICaptureRequest,
  IVaultTokenRequest,
  CardType,
  IUpdateBoardedCardRequest
} from "../lib/Merchantware/Credit/definitions";

describe("MerchantwareCreditClient", () => {
  const config = {
    MerchantName: "ZERO INC",
    MerchantSiteId: "00000000",
    MerchantKey: "00000-00000-00000-00000-00000"
  };

  const stubSoap = (xml = null) => {
    if (xml) {
      return nock("https://ps1.merchantware.net").post(
        "/Merchantware/ws/RetailTransaction/v45/Credit.asmx",
        xml
      );
    } else {
      return nock("https://ps1.merchantware.net").post(
        "/Merchantware/ws/RetailTransaction/v45/Credit.asmx"
      );
    }
  };

  let client: MerchantwareCreditClient = null;

  before(async () => {
    client = await MerchantwareCreditClient.createInstance(config);
  });

  it("is defined", () => {
    expect(MerchantwareCreditClient).to.not.be.undefined;
  });

  describe("AdjustTip", async () => {
    it("adds or alters the tip amount to a prior transaction", async () => {
      const request: ITipRequest = { Amount: "1.00", Token: "1236559" };

      stubSoap(AdjustTipXML).reply(
        201,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/AdjustTip.xml"
        )
      );

      const result = await client.AdjustTip(request);

      expect(result.ApprovalStatus).to.equal("APPROVED");
      expect(result.Token).to.equal("1236560");
      expect(result.TransactionDate).to.equal("3/14/2016 7:54:23 PM");
    });
  });

  describe("AttachSignature", () => {
    it("appends a signature record to an existing transaction", async () => {
      const request: ISignatureRequest = {
        Token: "608957",
        ImageData: "10,10^110,110^0,65535^10,110^110,10^0,65535^~"
      };

      stubSoap(AttachSignatureXML).reply(
        201,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/AttachSignature.xml"
        )
      );

      const result = await client.AttachSignature(request);

      expect(result.UploadStatus).to.equal("ACCEPTED");
      expect(result.Token).to.equal("608957");
      expect(result.TransactionDate).to.equal("3/14/2016 7:57:32 PM");
    });
  });

  describe("Authorize", () => {
    it("applies an authorization to a credit card which can be captured at a later time", async () => {
      const paymentData: IPaymentData = {
        Source: "KEYED",
        CardNumber: "4012000033330026",
        ExpirationDate: "1219"
      };

      const transaction: IAuthorizationRequest = {
        Amount: "1.01",
        RegisterNumber: "1",
        CardAcceptorTerminalId: "1",
        MerchantTransactionId: "1000"
      };

      stubSoap(AuthorizeXML).reply(
        201,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/Authorize.xml"
        )
      );

      const result = await client.Authorize(paymentData, transaction);

      expect(result.ApprovalStatus).to.equal("APPROVED");
    });
  });

  describe("BoardCard", () => {
    it("stores payment information for a credit card into the Merchantware Vault", async () => {
      const paymentData: IPaymentData = {
        Source: "KEYED",
        CardNumber: "4012000033330026",
        ExpirationDate: "1219"
      };

      stubSoap(BoardCardXML).reply(
        201,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/BoardCard.xml"
        )
      );

      const result = await client.BoardCard(paymentData);

      expect(result.VaultToken).to.equal("1000000000002WSZECPL");
    });
  });

  describe("Capture", () => {
    it("completes a transaction for a prior authorization", async () => {
      const request: ICaptureRequest = {
        Token: "608939",
        Amount: "1.50",
        InvoiceNumber: "1556",
        RegisterNumber: "35",
        MerchantTransactionId: "167902",
        CardAcceptorTerminalId: "3"
      };

      stubSoap(CaptureXML).reply(
        201,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/Capture.xml"
        )
      );

      const result = await client.Capture(request);

      expect(result.ApprovalStatus).to.equal("APPROVED");
      expect(result.Token).to.equal("608961");
      expect(result.Token).to.equal("608961");
      expect(result.AuthorizationCode).to.equal("OK036C");
      expect(result.TransactionDate).to.equal("3/14/2016 8:09:31 PM");
      expect(result.Amount).to.equal("1.50");
      expect(result.ReaderEntryMode).to.equal("3");
    });
  });

  describe("FindBoardedCard", () => {
    it("retrieves the payment data stored inside the Merchantware Vault", async () => {
      const request: IVaultTokenRequest = {
        VaultToken: "127MMEIIQVEW2WSZECPL"
      };

      stubSoap(FindBoardedCardXML).reply(
        200,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/FindBoardedCard.xml"
        )
      );

      const result = await client.FindBoardedCard(request);

      expect(result.CardNumber).to.equal("0026");
      expect(result.ExpirationDate).to.equal("1218");
      expect(result.CardType).to.equal(CardType.Visa);
    });
  });

  describe("UpdateBoardedCard", () => {
    it("changes the expiration date for an existing payment method stored inside the Merchantware Vault", async () => {
      const request: IUpdateBoardedCardRequest = {
        VaultToken: "127MMEIIQVEW2WSZECPL",
        ExpirationDate: "0118"
      };

      stubSoap(UpdateBoardedCardXML).reply(
        200,
        fs.readFileSync(
          __dirname + "/fixtures/xml/Merchantware/Credit/UpdateBoardedCard.xml"
        )
      );

      const result = await client.UpdateBoardedCard(request);
    });
  });
});

const AdjustTipXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><AdjustTip xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><Amount>1.00</Amount><Token>1236559</Token></Request></AdjustTip></soap:Body></soap:Envelope>`;
const AttachSignatureXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><AttachSignature xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><Token>608957</Token><ImageData>10,10^110,110^0,65535^10,110^110,10^0,65535^~</ImageData></Request></AttachSignature></soap:Body></soap:Envelope>`;
const AuthorizeXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><Authorize xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><PaymentData><Source>KEYED</Source><CardNumber>4012000033330026</CardNumber><ExpirationDate>1219</ExpirationDate></PaymentData><Request><Amount>1.01</Amount><RegisterNumber>1</RegisterNumber><CardAcceptorTerminalId>1</CardAcceptorTerminalId><MerchantTransactionId>1000</MerchantTransactionId></Request></Authorize></soap:Body></soap:Envelope>`;
const BoardCardXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><BoardCard xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><PaymentData><Source>KEYED</Source><CardNumber>4012000033330026</CardNumber><ExpirationDate>1219</ExpirationDate></PaymentData></BoardCard></soap:Body></soap:Envelope>`;
const CaptureXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><Capture xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><Token>608939</Token><Amount>1.50</Amount><InvoiceNumber>1556</InvoiceNumber><RegisterNumber>35</RegisterNumber><MerchantTransactionId>167902</MerchantTransactionId><CardAcceptorTerminalId>3</CardAcceptorTerminalId></Request></Capture></soap:Body></soap:Envelope>`;
const FindBoardedCardXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><FindBoardedCard xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><VaultToken>127MMEIIQVEW2WSZECPL</VaultToken></Request></FindBoardedCard></soap:Body></soap:Envelope>`;
const UpdateBoardedCardXML = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/v45/"><soap:Body><UpdateBoardedCard xmlns="http://schemas.merchantwarehouse.com/merchantware/v45/"><Credentials><MerchantName>ZERO INC</MerchantName><MerchantSiteId>00000000</MerchantSiteId><MerchantKey>00000-00000-00000-00000-00000</MerchantKey></Credentials><Request><VaultToken>127MMEIIQVEW2WSZECPL</VaultToken><ExpirationDate>0118</ExpirationDate></Request></UpdateBoardedCard></soap:Body></soap:Envelope>`;
