export enum ReaderEntryMode {
  "Unknown" = "0",
  "Keyed" = "1",
  "Magneticstripe" = "2",
  "Capture" = "3",
  "Proximity" = "4",
  "LevelUpScanner" = "5",
  "ICC" = "6",
  "ContactlessMobileCommerce" = "7"
}

export enum CardType {
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

enum DebitOrCreditIndicator {
  Credit = "Credit",
  Debit = "Debit"
}

enum NetOrGrossIndicator {
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
  Amount: number; //String (Double) 	0-100 	The amount of the sale.
  CashbackAmount?: number; //String (Double) 	0-20 	The optional amount the customer received as cash back from the transaction when performing sales using a debit card.
  SurchargeAmount?: number; //String (Double) 	0-20 	The optional surcharge fee or amount charged for the transaction when performing sales using a debit card.
  TaxAmount?: number; //String (Double) 	0-100 	The declared tax amount of the transaction.
  HealthCareAmountDetails?: IHealthCareAmountDetails; //HealthCareAmountDetails 	(Not Required) 	The health care amount details used when processing FSA cards.
  InvoiceNumber?: string; //String 	0-8 	The invoice or order number associated with the transaction.
  PurchaseOrderNumber?: string; //String 	0-100 	The customer-defined identifier declaring a purchase order for the transaction.
  CustomerCode?: string; //String 	0-100 	The merchant-defined identifier for the customer involved in the transaction.
  RegisterNumber?: string; //String 	0-100 	The identifier for the register or point of sale device submitting the transaction.
  MerchantTransactionId?: string; //String 	0-100 	The merchant-defined identifier for the transaction.
  CardAcceptorTerminalId?: string; //String (Numeric) 	0-16 	The Mastercard Card Acceptor Terminal Identifierused to uniquely identify the terminal to the processor.
  EnablePartialAuthorization?: boolean; //String (bool) 	0-5 	Allow for only part of the total Amount to be authorized during the sale.
  ForceDuplicate?: boolean; //String (bool) 	0-5 	Overrides duplicate protection and allow the transaction to process normally.
  Invoice?: IInvoice; //Object 	- 	An optional field that you use to specify various data the merchant needs to include for level three processing-rates.
}

export interface IVoidRequest {
  Token?: string; // 0-100 The token identifier returned from a previous transaction. Note: Either Token or MerchantTransactionId is required.
  RegisterNumber?: string; // 0-100 The identifier for the register or point of sale device submitting the transaction.
  MerchantTransactionId?: string; // 0-100 The merchant-defined identifier for the transaction. Note: Either Token or MerchantTransactionId is required.
  CardAcceptorTerminalId?: number; // (Numeric) 0-16 The Mastercard Card Acceptor Terminal Identifierused to uniquely identify the terminal to the processor.
}

export interface IInvoice {
  TaxIndicator: TaxIndicator; // 	- 	- 	An indicator that specifies whether the transaction's primary amount includes or omits tax. Values are: NotProvided Provided Exempt
  ProductDescription: string; // 	String 	0-100 	Describes the item being purchased by the consumer.
  DiscountAmount: number; // 	Decimal 	0-100 	The amount that the merchant deducts as a discount from the cost of the item.
  ShippingAmount: number; // 	Decimal 	0-100 	If the merchant needs to ship the item, this is the amount of the transaction that the customer pays for shipping.
  DutyAmount: number; // 	Decimal 	0-100 	If the merchant needs to ship the item, this is the amount of the transaction that the customer pays as duty when the shipment enters the destination country.
  DestinationPostalCode: string; // 	String 	0-9 	If the merchant needs to ship the item, this is the postal code of the customer’s delivery address.
  DestinationCountryCode: string; // 	String 	0-3 	If the merchant needs to ship the item, this is the country code of the customer’s delivery address.
  ShipFromPostalCode: string; // 	String 	0-9 	If the merchant needs to ship the item, this is the postal code of the location the merchant ships the item from.
  LineItems: ILineItem[]; // 	Object 	- 	The list of item level details for the transaction.
}

export enum TaxIndicator {
  NotProvided = "NotProvided",
  Provided = "Provided",
  Exempt = "Exempt"
}

export interface ILineItem {
  CommodityCode: string; // 	String 	0-30 	The line item’s commodity code.
  Description: string; //	String 	0-100 	The description of the line item.
  Upc: string; // 	String 	0-12 	The line item’s Universal Product Code.
  Quantity: number; // 	Decimal 	0-(9,4) 	The number of units that the line item contains. Units for the line item are specified in the UnitOfMeasure field.
  UnitOfMeasure: string; // 	String 	0-50 	The unit of measure for the contents of the line item.
  UnitCost: number; // 	Decimal 	0-100 	The cost of a single unit from the line item.
  DiscountAmount: number; // 	Decimal 	0-100 	The amount that the merchant deducts as a discount from the cost of the line item.
  TotalAmount: number; // 	Decimal 	0-100 	The total amount of the line item after the merchant deducts all tax and discounts.
  TaxAmount: number; // 	Decimal 	0-100 	The tax amount of the line item that is tax.
  ExtendedAmount: number; // 	Decimal 	0-100 	The extended amount of the line item.
  DebitOrCreditIndicator: DebitOrCreditIndicator; // 	String 	- 	An indicator of whether the line item is a credit or a debit. Values are: Credit Debit
  NetOrGrossIndicator: NetOrGrossIndicator; //	String 	- 	An indicator of whether the line item includes tax (gross) or excludes tax (net). Values are: Net Gross
}

export interface IHealthCareAmountDetails {
  CopayAmount: number;
  ClinicalAmount: number;
  DentalAmount: number;
  HealthCareTotalAmount: number;
  PrescriptionAmount: number;
  VisionAmount: number;
}
