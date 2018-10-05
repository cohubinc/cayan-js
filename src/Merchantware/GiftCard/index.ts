import { IMerchantCredentials } from "../../definitions";
import CreateSoapClientWithWSDL from "../../CreateSoapClientWithWSDL";
import GiftCardWSDL from "./GiftCardWSDL";
import {
  IActivateCardRequest,
  IAddPointsRequest,
  IAddValueRequest,
  IGiftPaymentData,
  IGiftResponse45
} from "./definitions";

export default class MerchantwareGiftCardClient {
  config: IMerchantCredentials;
  soapClient: any;

  constructor(config: IMerchantCredentials) {
    this.config = config;
  }

  static async createInstance(config: IMerchantCredentials) {
    let client = new MerchantwareGiftCardClient(config);

    const soapClient = await CreateSoapClientWithWSDL(
      GiftCardWSDL,
      "https://ps1.merchantware.net/Merchantware/ws/ExtensionServices/v45/Giftcard.asmx"
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

  async ActivateCard(
    PaymentData: IGiftPaymentData,
    Request: IActivateCardRequest
  ): Promise<IGiftResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.ActivateCardAsync(args);
    return result[0].ActivateCardResult;
  }

  async AddPoints(
    PaymentData: IGiftPaymentData,
    Request: IAddPointsRequest
  ): Promise<IGiftResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.AddPointsAsync(args);
    return result[0].AddPointsResult;
  }

  async AddValue(
    PaymentData: IGiftPaymentData,
    Request: IAddValueRequest
  ): Promise<IGiftResponse45> {
    const args = this.withCredentials({ Request });
    const result = await this.soapClient.AddValueAsync(args);
    return result[0].AddValueResult;
  }
}
