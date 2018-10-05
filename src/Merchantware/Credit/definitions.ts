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
  CardAcceptorTerminalId: string;
  MerchantTransactionId: string;
  RegisterNumber: string;
}

export interface ICaptureRequest {
  Token: string;
  Amount: string;
  InvoiceNumber: string;
  RegisterNumber: string;
  MerchantTransactionId: string;
  CardAcceptorTerminalId: string;
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
