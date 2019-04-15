import { IMerchantCredentials } from "../../definitions";
import { ITipRequest, ITransactionResponse45, ISignatureRequest, ISignatureResponse45, IAuthorizationRequest, IPaymentData, IVaultBoardingResponse45, ICaptureRequest, IVaultTokenRequest, IVaultTokenResponse45, IUpdateBoardedCardRequest, ISaleRequest } from "./definitions";
export default class MerchantwareCreditClient {
    config: IMerchantCredentials;
    soapClient: any;
    constructor(config: IMerchantCredentials);
    static createInstance(config: IMerchantCredentials): Promise<MerchantwareCreditClient>;
    private processResult;
    private withCredentials;
    AdjustTip(Request: ITipRequest): Promise<ITransactionResponse45 | Error>;
    AttachSignature(request: ISignatureRequest): Promise<ISignatureResponse45 | Error>;
    Authorize(PaymentData: IPaymentData, Request: IAuthorizationRequest): Promise<ITransactionResponse45 | Error>;
    BoardCard(PaymentData: IPaymentData): Promise<IVaultBoardingResponse45 | Error>;
    Capture(Request: ICaptureRequest): Promise<ITransactionResponse45 | Error>;
    FindBoardedCard(Request: IVaultTokenRequest): Promise<IVaultTokenResponse45 | Error>;
    UpdateBoardedCard(Request: IUpdateBoardedCardRequest): Promise<IVaultBoardingResponse45 | Error>;
    Sale(PaymentData: IPaymentData, Request: ISaleRequest): Promise<ITransactionResponse45 | Error>;
}
