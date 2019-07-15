import { IMerchantCredentials } from "../../definitions";
import { ITipRequest, ITransactionResponse45, ISignatureRequest, ISignatureResponse45, IAuthorizationRequest, IPaymentData, IVaultBoardingResponse45, ICaptureRequest, IVaultTokenRequest, IVaultTokenResponse45, IUpdateBoardedCardRequest, ISaleRequest, IVoidRequest } from "./definitions";
export default class MerchantwareCreditClient {
    config: IMerchantCredentials;
    soapClient: any;
    constructor(config: IMerchantCredentials);
    static createInstance(config: IMerchantCredentials): Promise<MerchantwareCreditClient>;
    private processResult;
    private withCredentials;
    AdjustTip(Request: ITipRequest): Promise<Error | ITransactionResponse45>;
    AttachSignature(request: ISignatureRequest): Promise<Error | ISignatureResponse45>;
    Authorize(PaymentData: IPaymentData, Request: IAuthorizationRequest): Promise<Error | ITransactionResponse45>;
    BoardCard(PaymentData: IPaymentData): Promise<Error | IVaultBoardingResponse45>;
    Capture(Request: ICaptureRequest): Promise<Error | ITransactionResponse45>;
    FindBoardedCard(Request: IVaultTokenRequest): Promise<Error | IVaultTokenResponse45>;
    UpdateBoardedCard(Request: IUpdateBoardedCardRequest): Promise<Error | IVaultBoardingResponse45>;
    Sale(PaymentData: IPaymentData, Request: ISaleRequest): Promise<Error | ITransactionResponse45>;
    Void(Request: IVoidRequest): Promise<Error | ITransactionResponse45>;
}
