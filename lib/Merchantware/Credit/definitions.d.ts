export declare enum ReaderEntryMode {
    "Unknown" = "0",
    "Keyed" = "1",
    "Magneticstripe" = "2",
    "Capture" = "3",
    "Proximity" = "4",
    "LevelUpScanner" = "5",
    "ICC" = "6",
    "ContactlessMobileCommerce" = "7"
}
export declare enum CardType {
    "Unknown" = "0",
    "American Express" = "1",
    "Discover" = "2",
    "Mastercard" = "3",
    "Visa" = "4",
    "Debit" = "5",
    "EBT" = "6",
    "Giftcard" = "7",
    "Wright Express (Fleet Card)" = "8",
    "Voyager (Fleet Card / USBank Issued)" = "9",
    "JCB" = "10",
    "China Union Pay" = "11",
    "LevelUp" = "12"
}
declare enum DebitOrCreditIndicator {
    Credit = "Credit",
    Debit = "Debit"
}
declare enum NetOrGrossIndicator {
    Net = "Net",
    Gross = "Gross"
}
export interface ITipRequest {
    Amount: string;
    Token: string;
}
export interface ISignatureRequest {
    Token: string;
    ImageData: string;
}
export interface IAuthorizationRequest {
    Amount: string;
    CardAcceptorTerminalId?: string;
    MerchantTransactionId?: string;
    RegisterNumber: string;
    invoice?: IInvoice;
    InvoiceNumber?: string;
    CardCaptureCapability?: string;
    PinAuthenticationCapability?: string;
    PosConditionCode?: string;
    PosEntryMode?: string;
    TerminalCategoryCode?: string;
    TerminalEntryCapability?: string;
    TerminalLocationIndicator?: string;
    EnablePartialAuthorization?: boolean;
    TaxAmount?: string;
    PurchaseOrderNumber?: string;
    CustomerCode?: string;
    CustomerEmailAddress?: string;
    ForceDuplicate?: boolean;
}
export interface ICaptureRequest {
    Token: string;
    Amount: string;
    InvoiceNumber?: string;
    RegisterNumber?: string;
    MerchantTransactionId?: string;
    CardAcceptorTerminalId?: string;
}
export interface IUpdateBoardedCardRequest {
    VaultToken: string;
    ExpirationDate: string;
}
export interface IVaultTokenRequest {
    VaultToken: string;
}
export interface IPaymentData {
    Source: "READER" | "KEYED" | "PREVIOUSTRANSACTION" | "VAULT" | "WALLET";
    TrackData?: string;
    PinBlock?: string;
    PinKsn?: string;
    ReaderEntryMode?: "MAGNETICSTRIPE" | "PROXIMITY";
    CardNumber?: string;
    ExpirationDate?: string;
    Cardholder?: string;
    AvsStreetAddress?: string;
    AvsZipCode?: string;
    CardVerificationValue?: string;
    EncryptedKeyedData?: string;
    Token?: string;
    VaultToken?: string;
    WalletId?: string;
    PaymentCryptogram?: string;
    PaymentCryptogramType?: string;
    EncryptedPaymentData?: string;
    EciIndicator?: string;
}
export interface ISignatureResponse45 {
    UploadStatus: string;
    Token: string;
    TransactionDate: string;
    ErrorMessage: number;
}
export interface ITransactionResponse45 {
    ApprovalStatus: string;
    Token: string;
    AuthorizationCode: string;
    TransactionDate: string;
    Amount: string;
    RemainingCardBalance: string;
    CardNumber: string;
    Cardholder: string;
    CardType: string;
    FsaCard: string;
    ReaderEntryMode: ReaderEntryMode;
    AvsResponse: string;
    CvResponse: string;
    ErrorMessage: string;
    ExtraData: string;
    FraudScoring: string;
    Rfmiq: string;
}
export interface IVaultBoardingResponse45 {
    VaultToken: string;
    ErrorCode: string;
    ErrorMessage: string;
    Rfmiq: string;
}
export interface IVaultTokenResponse45 {
    CardNumber: string;
    ExpirationDate: string;
    Cardholder: string;
    CardType: CardType;
    AvsStreetAddress: string;
    AvsZipCode: string;
    ErrorCode: string;
    ErrorMessage: string;
    Rfmiq: string;
}
export interface ISaleRequest {
    Amount: number;
    CashbackAmount?: number;
    SurchargeAmount?: number;
    TaxAmount?: number;
    HealthCareAmountDetails?: IHealthCareAmountDetails;
    InvoiceNumber?: string;
    PurchaseOrderNumber?: string;
    CustomerCode?: string;
    RegisterNumber?: string;
    MerchantTransactionId?: string;
    CardAcceptorTerminalId?: string;
    EnablePartialAuthorization?: boolean;
    ForceDuplicate?: boolean;
    Invoice?: IInvoice;
}
export interface IVoidRequest {
    Token?: string;
    RegisterNumber?: string;
    MerchantTransactionId?: string;
    CardAcceptorTerminalId?: number;
}
export interface IInvoice {
    TaxIndicator: TaxIndicator;
    ProductDescription: string;
    DiscountAmount: number;
    ShippingAmount: number;
    DutyAmount: number;
    DestinationPostalCode: string;
    DestinationCountryCode: string;
    ShipFromPostalCode: string;
    LineItems: ILineItem[];
}
export declare enum TaxIndicator {
    NotProvided = "NotProvided",
    Provided = "Provided",
    Exempt = "Exempt"
}
export interface ILineItem {
    CommodityCode: string;
    Description: string;
    Upc: string;
    Quantity: number;
    UnitOfMeasure: string;
    UnitCost: number;
    DiscountAmount: number;
    TotalAmount: number;
    TaxAmount: number;
    ExtendedAmount: number;
    DebitOrCreditIndicator: DebitOrCreditIndicator;
    NetOrGrossIndicator: NetOrGrossIndicator;
}
export interface IHealthCareAmountDetails {
    CopayAmount: number;
    ClinicalAmount: number;
    DentalAmount: number;
    HealthCareTotalAmount: number;
    PrescriptionAmount: number;
    VisionAmount: number;
}
export {};
