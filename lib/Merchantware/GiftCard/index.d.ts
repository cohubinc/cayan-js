import { IMerchantCredentials } from "../../definitions";
import { IActivateCardRequest, IAddPointsRequest, IAddValueRequest, IGiftPaymentData, IGiftResponse45 } from "./definitions";
export default class MerchantwareGiftCardClient {
    config: IMerchantCredentials;
    soapClient: any;
    constructor(config: IMerchantCredentials);
    static createInstance(config: IMerchantCredentials): Promise<MerchantwareGiftCardClient>;
    private withCredentials;
    ActivateCard(PaymentData: IGiftPaymentData, Request: IActivateCardRequest): Promise<IGiftResponse45>;
    AddPoints(PaymentData: IGiftPaymentData, Request: IAddPointsRequest): Promise<IGiftResponse45>;
    AddValue(PaymentData: IGiftPaymentData, Request: IAddValueRequest): Promise<IGiftResponse45>;
}
