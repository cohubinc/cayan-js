import { IMerchantCredentials } from "../definitions";

export interface IGeniusConfig extends IMerchantCredentials {
  CEDHostname?: string;
}

export interface IGeniusClient {}

export interface IErrorMessage {
  field: string;
  information: string;
}

export interface IStageTransactionResult {
  TransportKey?: string;
  ValidationKey?: string;
  Messages?: IErrorMessage[];
}

export enum TransactionTypes {
  "SALE" = "SALE",
  "AUTHORIZATION" = "AUTHORIZATION",
  "REFUND" = "REFUND",
  "ADDVALUE" = "ADDVALUE",
  "BALANCEINQUIRY" = "BALANCEINQUIRY"
}

export enum PaymentTypes {
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

export enum EntryModes {
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
  TransactionType:
    | "SALE"
    | "_REFUND"
    | "LEVEL2SALE"
    | "PREAUTH"
    | "FORCESALE"
    | "ADDVALUE"
    | "BALANCEINQUIRY";
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

export enum ExternalPaymentTypes {
  Cash = "Cash",
  Check = "Check",
  StoreCredit = "StoreCredit",
  Other = "Other"
}

export enum CEDCategories {
  None = "None",
  Ebt = "Ebt",
  Fuel = "Fuel"
}

export enum CEDItemTypes {
  Sku = "Sku",
  Misc = "Misc"
}

export enum CEDBoolean {
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

export enum CEDScreen {
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
  Status:
    | "Cancelled"
    | "TransactionApproved_NoSignatureCollected"
    | "Denied"
    | "Error";
  ResponseMessage: string;
  AdditionalParameters: any;
}

export interface IDetailsByTransportKeyResponse {
  Status: string; // The Status of the transaction, whether approved or declined. This value may also have other definitions depending on CardType and context.
  ErrorMessage: string; // A message indicating why the transaction could not be processed.
  TotalAmountApproved: string; // The amount of the transaction that was approved. If partial authorizations are enabled, this will be the authorized amount and may be different than the requested amount.
  RequestedAmount: string; // The requested amount of the transaction.
  ResponseType: string; // SINGLE, MULTI or COMPOUND. Typical credit, debit and EBT payment types will return SINGLE as the ResponseType. MULTI or COMPOUND response types are returned for additional payment types such as gift and loyalty.
  PaymentDetails: { PaymentDetail: IPaymentDetail } | IPaymentDetail[]; // Collection of detail objects for the transaction processed. If more than one payment type was processed to complete the transaction, each sub-transaction will be in the collection. For example, if a $100 transaction is processed using a $30 gift card and $70 credit card transaction, there will be a payment detail for each one within the payment details object.
  Invoice: IInvoice; // An optional field that specifies various data for level three processing-rates.
  AdditionalResponseParameters: IAdditionalResponseParameters;
}

export interface IPaymentDetail {
  PaymentType:
    | "UNKNOWN"
    | "AMEX"
    | "DISCOVER"
    | "MASTERCARD"
    | "VISA"
    | "DEBIT"
    | "EBT"
    | "EGC"
    | "WEX"
    | "VOYAGER"
    | "JCB"
    | "CUP"
    | "LU";
  Status:
    | "UNKNOWN"
    | "APPROVED"
    | "FAILED"
    | "DECLINED"
    | "DECLINED_DUPLICATE"
    | "REFERRAL";
  ErrorMessage: string;
  TransactionType: "UNKNOWN" | "SALE" | "REFUND" | "AUTHORIZATION";
  Token: string;
  AuthorizationCode: string;
  Customer: string;
  Email: string;
  PhoneNumber: string;
  AccountNumber: string;
  ExpirationDate: string;
  EntryMode:
    | "UNKNOWN"
    | "MANUAL"
    | "SWIPE"
    | "AUTHORIZATION"
    | "PROXIMITY"
    | "BARCODE";
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
  TaxIndicator: "NotProvided" | "Provided" | "Exempt"; // An indicator that specifies whether the transaction's primary amount includes or omits tax. Values are:
  ProductDescription: string; // 0-100 Describes the item being purchased by the consumer.
  DiscountAmount: number; // Decimal 0-100 The amount that the merchant deducts as a discount from the cost of the item.
  ShippingAmount: number; // Decimal 0-100 If the merchant needs to ship the item, this is the amount of the transaction that the customer pays for shipping.
  DutyAmount: number; // Decimal 0-100 If the merchant needs to ship the item, this is the amount of the transaction that the customer pays as duty when the shipment enters the destination country.
  DestinationPostalCode: string; // 0-9 If the merchant needs to ship the item, this is the postal code of the customer’s delivery address.
  DestinationCountryCode: string; // 0-3 If the merchant needs to ship the item, this is the country code of the customer’s delivery address.
  ShipFromPostalCode: string; // 0-9 If the merchant needs to ship the item, this is the postal code of the location the merchant ships the item from.
  LineItems: ILineItem[]; // The list of item level details for the transaction.
}

export interface ILineItem {
  CommodityCode: string; // 0-30 The line item’s commodity code.
  Description: string; // 0-100 The description of the line item.
  Upc: string; // 0-12 The line item’s Universal Product Code.
  Quantity: number; // Decimal 0-(9,4) The number of units that the line item contains. Units for the line item are specified in the UnitOfMeasure field.
  UnitOfMeasure: string; // 0-50 The unit of measure for the contents of the line item.
  UnitCost: number; // Decimal 	0-100 The cost of a single unit from the line item.
  DiscountAmount: number; // Decimal 0-100 The amount that the merchant deducts as a discount from the cost of the line item.
  TotalAmount: number; // Decimal 0-100 The total amount of the line item after the merchant deducts all tax and discounts.
  TaxAmount: number; // Decimal 0-100 The tax amount of the line item that is tax.
  ExtendedAmount: number; // Decimal 0-100 The extended amount of the line item.
  DebitOrCreditIndicator: "Credit" | "Debit"; // An indicator of whether the line item is a credit or a debit. Values are:
  NetOrGrossIndicator: "Net" | "Gross"; // An indicator of whether the line item includes tax (gross) or excludes tax (net). Values are:
}

export interface IAdditionalResponseParameters {
  FsaCard: boolean;
  EbtDetails: {
    EbtType: "CASH" | "SNAP";
    FnsId?: string; // FnsId is shown only when EbtType is SNAP;
    Balances: {
      CashAvailableBalance: number;
      SnapAvailableBalance: number;
    };
  };
}
