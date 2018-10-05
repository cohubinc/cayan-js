export interface IActivateCardRequest {
  Amount: string;
  InvoiceNumber: string;
  MerchantTransactinoID: string;
}

export interface IAddPointsRequest {
  AmountType: "POINTS" | "CURRENCY";
  Amount: string;
  InvoiceNumber?: string;
  MerchantTransactionId: string;
}

export interface IAddValueRequest {
  Amount: string;
  InvoiceNumber: string;
  MerchantTransactionId: string;
}

export interface IGiftPaymentData {
  Source: "READER" | "KEYED" | "PREVIOUSTRANSACTION";
  GiftCardPin?: string;
  TrackData?: string;
  CardNumber?: string;
  Token?: string;
}

export enum ReaderEntryMode {
  "Unknown" = "0",
  "Keyed" = "1",
  "Magneticstripe" = "2"
}

export interface IGiftDetail {
  ApprovedAmount?: string;
  GiftBalance?: string;
  RedeemableBalance: string;
  RequestedAmount?: string;
  RewardsBalance?: string;
}

export interface ILoyaltyDetail {
  ApprovedPoints?: string;
  PointsType?: "POINTS" | "FREQUENCY";
  PointsBeforeNextReward?: string;
  PointsBalance: string;
}

export interface IGiftResponse45 {
  ApprovalStatus: string;
  CardNumber: string;
  ExpirationDate: string;
  ErrorMessage: string;
  InvoiceNumber: string;
  ResponseMessage: string;
  ReaderEntryMode: ReaderEntryMode;
  Token: string;
  TransactionDate: string;
  Gift: IGiftDetail;
  Loyalty: ILoyaltyDetail;
}
