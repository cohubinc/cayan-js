import { IMerchantCredentials } from "../../definitions";
import { ITipRequest, ITransactionResponse45, ISignatureRequest, ISignatureResponse45, IAuthorizationRequest, IPaymentData, IVaultBoardingResponse45, ICaptureRequest, IVaultTokenRequest, IVaultTokenResponse45, IUpdateBoardedCardRequest } from "./definitions";
export default class MerchantwareCreditClient {
    config: IMerchantCredentials;
    soapClient: any;
    constructor(config: IMerchantCredentials);
    static createInstance(config: IMerchantCredentials): Promise<MerchantwareCreditClient>;
    private withCredentials;
    AdjustTip(Request: ITipRequest): Promise<ITransactionResponse45>;
    AttachSignature(request: ISignatureRequest): Promise<ISignatureResponse45>;
    Authorize(PaymentData: IPaymentData, Request: IAuthorizationRequest): Promise<ITransactionResponse45>;
    BoardCard(PaymentData: IPaymentData): Promise<IVaultBoardingResponse45>;
    Capture(Request: ICaptureRequest): Promise<ITransactionResponse45>;
    FindBoardedCard(Request: IVaultTokenRequest): Promise<IVaultTokenResponse45>;
    UpdateBoardedCard(Request: IUpdateBoardedCardRequest): Promise<IVaultBoardingResponse45>;
}
