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

  async AdjustTip(Request: ITipRequest): Promise<ITransactionResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.AdjustTipAsync(args);
    return result[0].AdjustTipResult;
  }

  async AttachSignature(
    request: ISignatureRequest
  ): Promise<ISignatureResponse45> {
    const args = this.withCredentials({ Request: request });
    const result = await this.soapClient.AttachSignatureAsync(args);
    return result[0].AttachSignatureResult;
  }

  async Authorize(
    PaymentData: IPaymentData,
    Request: IAuthorizationRequest
  ): Promise<ITransactionResponse45> {
    const args = this.withCredentials({ PaymentData, Request });
    const result = await this.soapClient.AuthorizeAsync(args);
    return result[0].AuthorizeResult;
  }

  async BoardCard(
    PaymentData: IPaymentData
  ): Promise<IVaultBoardingResponse45> {
    const args = this.withCredentials({ PaymentData });
    const result = await this.soapClient.BoardCardAsync(args);
    return result[0].BoardCardResult;
  }

  async Capture(Request: ICaptureRequest): Promise<ITransactionResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.CaptureAsync(args);
    return result[0].CaptureResult;
  }

  async FindBoardedCard(
    Request: IVaultTokenRequest
  ): Promise<IVaultTokenResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.FindBoardedCardAsync(args);
    return result[0].FindBoardedCardResult;
  }

  async UpdateBoardedCard(
    Request: IUpdateBoardedCardRequest
  ): Promise<IVaultBoardingResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.UpdateBoardedCardAsync(args);
    return result[0].UpdateBoardedCardResult;
  }

  async Sale(Request: ISaleRequest): Promise<ITransactionResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.SaleAsync(args);
    return result[0].SaleResult;
  }
}
