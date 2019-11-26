import { IMerchantCredentials } from "../definitions";
export interface IGeniusConfig extends IMerchantCredentials {
    CEDHostname?: string;
}
export interface IGeniusClient {
}
export interface IErrorMessage {
    field: string;
    information: string;
}
export interface IStageTransactionResult {
    TransportKey?: string;
    ValidationKey?: string;
    Messages?: IErrorMessage[];
}
export declare enum TransactionTypes {
    "SALE" = "SALE",
    "AUTHORIZATION" = "AUTHORIZATION",
    "REFUND" = "REFUND",
    "ADDVALUE" = "ADDVALUE",
    "BALANCEINQUIRY" = "BALANCEINQUIRY"
}
export declare enum PaymentTypes {
    "VISA" = "VISA",
    "MASTERCARD" = "MASTERCARD",
    "AMEX" = "AMEX",
    "DISCOVER" = "DISCOVER",
    "DEBIT" = "DEBIT",
    "GIFT" = "GIFT",
    "EBT" = "EBT",
    "LEVELUP" = "LEVELUP",
    "VOYAGER" = "VOYAGER",
    "WEX" = "WEX",
    "JCB" = "JCB",
    "CUP" = "CUP",
    "UNKNOWN" = "UNKNOWN"
}
export declare enum EntryModes {
    "SWIPE" = "SWIPE",
    "PROXIMITY" = "PROXIMITY",
    "BARCODE" = "BARCODE",
    "MANUAL" = "MANUAL"
}
export interface IInitiateTransactionResult {
    Status: string;
    AmountApproved: string;
    AuthorizationCode: string;
    Cardholder: string;
    AccountNumber: string;
    PaymentType: PaymentTypes;
    EntryMode: EntryModes;
    ErrorMessage: string;
    Token: string;
    TransactionDate: string;
    TransactionType: TransactionTypes;
    ResponseType: "SINGLE" | "MULTI" | "COMPOUND";
    ValidationKey: string;
    AdditionalParameters: any;
    EMV: any;
}
export interface ITransportRequest {
    TransactionType: "SALE" | "_REFUND" | "LEVEL2SALE" | "PREAUTH" | "FORCESALE" | "ADDVALUE" | "BALANCEINQUIRY";
    ClerkId: string;
    Dba: string;
    SoftwareName: string;
    SoftwareVersion: string;
    Amount: number;
    OrderNumber: string;
    TaxAmount: number;
    TerminalId?: string;
    PoNumber?: string;
    CustomerCode?: string;
    EnablePartialAuthorization: boolean;
}
export interface IStartOrderParameters {
    Order: string;
}
export interface IAddItemParameters {
    Order: string;
    ItemID?: string;
    Type: string;
    TypeValue: string;
    UPC?: string;
    Quantity: string;
    Description: string;
    Amount: string;
    TaxAmount: string;
    OrderTotal: string;
    OrderTax: string;
    Category: string;
    DisplayOverride?: string;
    DisplayCustomSubTotal?: string;
}
export declare enum ExternalPaymentTypes {
    Cash = "Cash",
    Check = "Check",
    StoreCredit = "StoreCredit",
    Other = "Other"
}
export declare enum CEDCategories {
    None = "None",
    Ebt = "Ebt",
    Fuel = "Fuel"
}
export declare enum CEDItemTypes {
    Sku = "Sku",
    Misc = "Misc"
}
export declare enum CEDBoolean {
    True = "true",
    False = "false"
}
export interface IDiscountItemParameters {
    Order: string;
    ItemID?: string;
    TargetItemID: string;
    Type: string;
    TypeValue: string;
    UPC?: string;
    Quantity: string;
    Description: string;
    Amount: string;
    TaxAmount: string;
    OrderTotal: string;
    OrderTax: string;
    Category: string;
    DisplayOverride?: string;
    DisplayCustomSubTotal?: string;
}
export interface IDeleteItemParameters {
    Order: string;
    TargetItemID: string;
    OrderTotal: string;
    OrderTax: string;
    DisplayCustomSubTotal?: string;
}
export interface IDeleteAllItemsParameters {
    Order: string;
    RetainPaymentData: CEDBoolean;
    OrderTotal: string;
    OrderTax: string;
    DisplayCustomSubTotal?: string;
}
export interface IUpdateItemParameters {
    Order: string;
    TargetItemID: string;
    Type?: string;
    TypeValue?: string;
    UPC?: string;
    Quantity?: string;
    Description?: string;
    Amount?: string;
    TaxAmount?: string;
    OrderTotal: string;
    OrderTax: string;
    Category: string;
    DisplayOverride?: string;
    DisplayCustomSubTotal?: string;
}
export interface IUpdateTotalParams {
    Order: string;
    OrderTotal: string;
    OrderTax: string;
    DisplayCustomerSubTotal?: string;
}
export declare enum CEDScreen {
    "Idle screen" = "00",
    "Validating TransportKey" = "01",
    "Main payment collection" = "02",
    "Custom payment collection" = "03",
    "Looking up card BIN" = "04",
    "Waiting for amount confirmation" = "05",
    "Waiting for PIN entry" = "06",
    "Processing payment" = "07",
    "Waiting for signature" = "08",
    "Processing signature capture" = "09",
    "Transaction result" = "10",
    "Cancel confirmation" = "11",
    "Run as credit confirmation" = "12",
    "SKU display" = "13",
    "Cashback selection screen" = "14",
    "Cashback custom screen" = "15",
    "Tip selection screen" = "16",
    "Tip custom screen" = "17",
    "Donation selection screen" = "18",
    "Donation custom screen" = "19",
    "Confirmation screen" = "20",
    "Error screen" = "24",
    "SKU amount confirmation screen" = "26",
    "PAN entry screen" = "27",
    "Expiration entry screen" = "28",
    "CVV entry screen" = "29",
    "Zip entry screen" = "30",
    "Agreement screen" = "31",
    "Agreement signature screen" = "32",
    "EMV application selection screen" = "33",
    "Get customer input screen" = "35",
    "Gift card capture screen" = "36",
    "Network details screen" = "38",
    "Network configuration screen" = "39"
}
export interface ICheckStatusResponse {
    Status: string;
    CurrentScreen: CEDScreen;
    ResponseMessage: string;
    SerialNumber: string;
    ApplicationVersion: string;
    OSVersion: string;
    AdditionalParameters: {
        PaymentDataCaptured: "true" | "false";
        RemoveEMVCard: "true" | "false";
    };
}
export interface IStartOrderResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface IEndOrderResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface IAddItemResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    ItemID: string;
    AdditionalParameters: any;
}
export interface IDiscountItemResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    ItemID: string;
    AdditionalParameters: any;
}
export interface IDeleteItemResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface IDeleteAllItemsResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface IUpdateItemResponse {
    Status: "Success" | "Failed" | "Denied";
    ItemID: string;
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface IUpdateTotalResponse {
    Status: "Success" | "Failed" | "Denied";
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface ICancelTransactionResponse {
    Status: "Cancelled" | "TransactionApproved_NoSignatureCollected" | "Denied" | "Error";
    ResponseMessage: string;
    AdditionalParameters: any;
}
export interface IDetailsByTransportKeyResponse {
    Status: string;
    ErrorMessage: string;
    TotalAmountApproved: string;
    RequestedAmount: string;
    ResponseType: string;
    PaymentDetails: {
        PaymentDetail: IPaymentDetail;
    } | IPaymentDetail[];
    Invoice: IInvoice;
    AdditionalResponseParameters: IAdditionalResponseParameters;
}
export interface IPaymentDetail {
    PaymentType: "UNKNOWN" | "AMEX" | "DISCOVER" | "MASTERCARD" | "VISA" | "DEBIT" | "EBT" | "EGC" | "WEX" | "VOYAGER" | "JCB" | "CUP" | "LU";
    Status: "UNKNOWN" | "APPROVED" | "FAILED" | "DECLINED" | "DECLINED_DUPLICATE" | "REFERRAL";
    ErrorMessage: string;
    TransactionType: "UNKNOWN" | "SALE" | "REFUND" | "AUTHORIZATION";
    Token: string;
    AuthorizationCode: string;
    Customer: string;
    Email: string;
    PhoneNumber: string;
    AccountNumber: string;
    ExpirationDate: string;
    EntryMode: "UNKNOWN" | "MANUAL" | "SWIPE" | "AUTHORIZATION" | "PROXIMITY" | "BARCODE";
    TransactionDate: string;
    AmountDetail: IAmountDetail;
    SignatureDetail: ISignatureDetail;
    GiftDetail: IGiftCardDetail;
    LoyaltyDetail: ILoyaltyDetail;
    AdditionalResponseParameters: IAdditionalResponseParameters;
}
export interface IAmountDetail {
    AmountApproved: number;
    AmountCharged: number;
    TaxAmount: number;
    TipAmount: number;
    UserTipAmount: number;
    DiscountAmount: number;
    VoucherAmount: number;
    RemainingCardBalance: number;
}
export interface ISignatureDetail {
    SignatureType: string;
    Signature: string;
}
export interface IGiftCardDetail {
    Balance: number;
}
export interface ILoyaltyDetail {
    Visits: number;
    LastVisit: string;
    LifetimeSpend: number;
    Balance: number;
}
export interface IInvoice {
    TaxIndicator: "NotProvided" | "Provided" | "Exempt";
    ProductDescription: string;
    DiscountAmount: number;
    ShippingAmount: number;
    DutyAmount: number;
    DestinationPostalCode: string;
    DestinationCountryCode: string;
    ShipFromPostalCode: string;
    LineItems: ILineItem[];
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
    DebitOrCreditIndicator: "Credit" | "Debit";
    NetOrGrossIndicator: "Net" | "Gross";
}
export interface IAdditionalResponseParameters {
    FsaCard: boolean;
    EbtDetails: {
        EbtType: "CASH" | "SNAP";
        FnsId?: string;
        Balances: {
            CashAvailableBalance: number;
            SnapAvailableBalance: number;
        };
    };
}
