// import soap from "../../../soap-client/soap";
import { IMerchantCredentials } from "../../definitions";
import {
  ITipRequest,
  ITransactionResponse45,
  ISignatureRequest,
  ISignatureResponse45,
  IAuthorizationRequest,
  IPaymentData,
  IVaultBoardingResponse45,
  ICaptureRequest,
  IVaultTokenRequest,
  IVaultTokenResponse45,
  IUpdateBoardedCardRequest,
  ISaleRequest
} from "./definitions";
import CreditWSDL from "./CreditWSDL";
import CreateSoapClientWithWSDL from "../../CreateSoapClientWithWSDL";
import isEmpty from "lodash/isEmpty";

export default class MerchantwareCreditClient {
  config: IMerchantCredentials;
  soapClient: any;

  constructor(config: IMerchantCredentials) {
    this.config = config;
  }

  static async createInstance(config: IMerchantCredentials) {
    let client = new MerchantwareCreditClient(config);

    const soapClient = await CreateSoapClientWithWSDL(
      CreditWSDL,
      "https://ps1.merchantware.net/Merchantware/ws/RetailTransaction/v45/Credit.asmx"
    );

    client.soapClient = soapClient;

    return client;
  }

  private processResult(result: any, key: string, error) {
    if (result && result[0] && !isEmpty(result[0])) {
      return result[0][key];
    } else {
      return new Error(error);
    }
  }

  private withCredentials(args: any) {
    return {
      Credentials: {
        MerchantName: this.config.MerchantName,
        MerchantSiteId: this.config.MerchantSiteId,
        MerchantKey: this.config.MerchantKey
      },
      ...args
    };
  }

  async AdjustTip(
    Request: ITipRequest
  ): Promise<ITransactionResponse45 | Error> {
    const args = this.withCredentials({ Request });
    try {
      const result = await this.soapClient.AdjustTipAsync(args);
      return this.processResult(
        result,
        "AdjustTipResult",
        "Error adjusting tip"
      );
    } catch (_e) {
      return new Error("Error adjusting tip");
    }
  }

  async AttachSignature(
    request: ISignatureRequest
  ): Promise<ISignatureResponse45 | Error> {
    const args = this.withCredentials({ Request: request });

    try {
      const result = await this.soapClient.AttachSignatureAsync(args);
      return this.processResult(
        result,
        "AttachSignatureResult",
        "Error Attaching Signature"
      );
    } catch (_e) {
      return new Error("Error attaching signature");
    }
  }

  async Authorize(
    PaymentData: IPaymentData,
    Request: IAuthorizationRequest
  ): Promise<ITransactionResponse45 | Error> {
    const args = this.withCredentials({ PaymentData, Request });

    try {
      const result = await this.soapClient.AuthorizeAsync(args);
      return this.processResult(result, "AuthorizeResult", "Error authorizing");
    } catch (_e) {
      return new Error("Error authorizing");
    }
  }

  async BoardCard(
    PaymentData: IPaymentData
  ): Promise<IVaultBoardingResponse45 | Error> {
    const args = this.withCredentials({ PaymentData });

    try {
      const result = await this.soapClient.BoardCardAsync(args);
      return this.processResult(
        result,
        "BoardCardResult",
        "Error boarding card"
      );
    } catch (_e) {
      return new Error("Error boarding card");
    }
  }

  async Capture(
    Request: ICaptureRequest
  ): Promise<ITransactionResponse45 | Error> {
    const args = this.withCredentials({ Request });

    try {
      const result = await this.soapClient.CaptureAsync(args);
      return this.processResult(
        result,
        "CaptureResult",
        "Error capturing card"
      );
    } catch (_e) {
      return new Error("Error capturing card");
    }
  }

  async FindBoardedCard(
    Request: IVaultTokenRequest
  ): Promise<IVaultTokenResponse45 | Error> {
    const args = this.withCredentials({ Request });

    try {
      const result = await this.soapClient.FindBoardedCardAsync(args);
      return this.processResult(
        result,
        "FindBoardedCardResult",
        "Error finding boarded card"
      );
    } catch (_e) {
      return new Error("Error finding boarded card");
    }
  }

  async UpdateBoardedCard(
    Request: IUpdateBoardedCardRequest
  ): Promise<IVaultBoardingResponse45 | Error> {
    const args = this.withCredentials({ Request });

    try {
      const result = await this.soapClient.UpdateBoardedCardAsync(args);
      return this.processResult(
        result,
        "UpdateBoardedCardResult",
        "Error updating boarded card"
      );
    } catch (_e) {
      return new Error("Error updating boarded card");
    }
  }

  async Sale(
    PaymentData: IPaymentData,
    Request: ISaleRequest
  ): Promise<ITransactionResponse45 | Error> {
    const args = this.withCredentials({ PaymentData, Request });

    try {
      const result = await this.soapClient.SaleAsync(args);
      return this.processResult(result, "SaleResult", "Error processing sale");
    } catch (_e) {
      return new Error("Error processing sale");
    }
  }
}
