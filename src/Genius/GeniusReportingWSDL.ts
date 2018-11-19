const GeniusReportingWSDL = `

<?xml version="1.0" encoding="utf-8"?>
<wsdl:definitions xmlns:s="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" xmlns:tns="http://schemas.merchantwarehouse.com/genius/10/Reporting" xmlns:s1="http://schemas.merchantwarehouse.com/reward/v1" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" targetNamespace="http://schemas.merchantwarehouse.com/genius/10/Reporting" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
  <wsdl:types>
    <s:schema elementFormDefault="qualified" targetNamespace="http://schemas.merchantwarehouse.com/genius/10/Reporting">
      <s:import namespace="http://schemas.merchantwarehouse.com/reward/v1" />
      <s:element name="DetailsByTransportKey">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Name" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="SiteID" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="Key" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="TransportKey" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="DetailsByTransportKeyResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="DetailsByTransportKeyResult" type="tns:TransactionResult" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="TransactionResult">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Status" type="tns:StatusType" />
          <s:element minOccurs="0" maxOccurs="1" name="ErrorMessage" type="s:string" />
          <s:element minOccurs="1" maxOccurs="1" name="TotalAmountApproved" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="RequestedAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="ResponseType" type="tns:ResponseType" />
          <s:element minOccurs="0" maxOccurs="1" name="PaymentDetails" type="tns:PaymentDetails" />
          <s:element minOccurs="0" maxOccurs="1" name="AdditionalResponseParameters" type="tns:AdditionalResponseParameters" />
          <s:element minOccurs="0" maxOccurs="1" name="Survey" type="tns:SurveyDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="Invoice" type="tns:Invoice" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="StatusType">
        <s:restriction base="s:string">
          <s:enumeration value="UNKNOWN" />
          <s:enumeration value="APPROVED" />
          <s:enumeration value="FAILED" />
          <s:enumeration value="DECLINED" />
          <s:enumeration value="DECLINED_DUPLICATE" />
          <s:enumeration value="REFERRAL" />
        </s:restriction>
      </s:simpleType>
      <s:simpleType name="ResponseType">
        <s:restriction base="s:string">
          <s:enumeration value="UNKNOWN" />
          <s:enumeration value="SINGLE" />
          <s:enumeration value="MULTI" />
          <s:enumeration value="COMPOUND" />
        </s:restriction>
      </s:simpleType>
      <s:complexType name="PaymentDetails">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="PaymentDetail" type="tns:PaymentDetail" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="PaymentDetail">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="PaymentType" type="tns:PaymentType" />
          <s:element minOccurs="1" maxOccurs="1" name="Status" type="tns:StatusType" />
          <s:element minOccurs="0" maxOccurs="1" name="ErrorMessage" type="s:string" />
          <s:element minOccurs="1" maxOccurs="1" name="TransactionType" type="tns:TransactionType" />
          <s:element minOccurs="0" maxOccurs="1" name="Token" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AuthorizationCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Customer" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Email" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PhoneNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AccountNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ExpirationDate" type="s:string" />
          <s:element minOccurs="1" maxOccurs="1" name="EntryMode" type="tns:EntryMode" />
          <s:element minOccurs="0" maxOccurs="1" name="TransactionDate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AmountDetail" type="tns:AmountDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="SignatureDetail" type="tns:SignatureDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="GiftDetail" type="tns:GiftDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="LoyaltyDetail" type="tns:LoyaltyDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="AdditionalResponseParameters" type="tns:AdditionalResponseParameters" />
          <s:element minOccurs="0" maxOccurs="1" name="Emv" type="tns:Emv" />
          <s:element minOccurs="0" maxOccurs="1" name="RFMIQ" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MaskedAccountNumber" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="PaymentType">
        <s:restriction base="s:string">
          <s:enumeration value="UNKNOWN" />
          <s:enumeration value="AMEX" />
          <s:enumeration value="DISCOVER" />
          <s:enumeration value="MASTERCARD" />
          <s:enumeration value="VISA" />
          <s:enumeration value="DEBIT" />
          <s:enumeration value="EBT" />
          <s:enumeration value="EGC" />
          <s:enumeration value="WEX" />
          <s:enumeration value="VOYAGER" />
          <s:enumeration value="JCB" />
          <s:enumeration value="CUP" />
          <s:enumeration value="LEVELUP" />
          <s:enumeration value="GIFT" />
          <s:enumeration value="LOYALTY" />
          <s:enumeration value="GROUPON" />
        </s:restriction>
      </s:simpleType>
      <s:simpleType name="TransactionType">
        <s:restriction base="s:string">
          <s:enumeration value="UNKNOWN" />
          <s:enumeration value="SALE" />
          <s:enumeration value="REFUND" />
          <s:enumeration value="VOID" />
          <s:enumeration value="FORCE" />
          <s:enumeration value="AUTHORIZATION" />
          <s:enumeration value="REPEATSALE" />
          <s:enumeration value="ADDPOINTS" />
          <s:enumeration value="ADDVALUE" />
          <s:enumeration value="BALANCEINQUIRY" />
        </s:restriction>
      </s:simpleType>
      <s:simpleType name="EntryMode">
        <s:restriction base="s:string">
          <s:enumeration value="UNKNOWN" />
          <s:enumeration value="MANUAL" />
          <s:enumeration value="SWIPE" />
          <s:enumeration value="AUTHORIZATION" />
          <s:enumeration value="PROXIMITY" />
          <s:enumeration value="BARCODE" />
          <s:enumeration value="ICC" />
        </s:restriction>
      </s:simpleType>
      <s:complexType name="AmountDetail">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="AmountApproved" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="AmountCharged" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="TaxAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="TipAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="UserTipAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="DiscountAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="VoucherAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="CashbackAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="DonationAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="HealthCareTotalAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="CopayAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="ClinicalAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="DentalAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="PrescriptionAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="VisionAmount" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="RemainingCardBalance" type="s:decimal" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="SignatureDetail">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="SignatureType" type="tns:SignatureType" />
          <s:element minOccurs="0" maxOccurs="1" name="Signature" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="SignatureType">
        <s:restriction base="s:string">
          <s:enumeration value="UNKNOWN" />
          <s:enumeration value="VECTOR" />
          <s:enumeration value="TIFF" />
        </s:restriction>
      </s:simpleType>
      <s:complexType name="GiftDetail">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Balance" type="s:decimal" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="LoyaltyDetail">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Visits" type="s:int" />
          <s:element minOccurs="0" maxOccurs="1" name="LastVisit" type="s:string" />
          <s:element minOccurs="1" maxOccurs="1" name="LifetimeSpend" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="Balance" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="OriginalToken" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PointsEarned" nillable="true" type="s:int" />
          <s:element minOccurs="0" maxOccurs="1" name="PointsBalance" nillable="true" type="s:int" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="AdditionalResponseParameters">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="SignatureRequired" type="s:boolean" />
          <s:element minOccurs="0" maxOccurs="1" name="AmountDetails" type="tns:AmountDetails" />
          <s:element minOccurs="0" maxOccurs="1" name="TrackingId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="FsaCard" nillable="true" type="s:boolean" />
          <s:element minOccurs="0" maxOccurs="1" name="DebitTraceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="RewardResult" type="s1:RewardResultType" />
          <s:element minOccurs="0" maxOccurs="1" name="EbtDetails" type="tns:EbtDetails" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="AmountDetails">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="UserTip" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="Cashback" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="Donation" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="Surcharge" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="Discount" type="tns:Discount" />
          <s:element minOccurs="1" maxOccurs="1" name="RemainingCardBalance" type="s:decimal" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="Discount">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Total" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="DiscountsApplied" type="tns:DiscountsApplied" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="DiscountsApplied">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="unbounded" name="DiscountApplied" type="tns:DiscountApplied" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="DiscountApplied">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Amount" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="Type" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Message" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="EbtDetails">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="EbtType" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="FnsId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Balances" type="tns:EbtBalances" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="EbtBalances">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="CashAvailableBalance" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="SnapAvailableBalance" type="s:decimal" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="Emv">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationInformation" type="tns:ApplicationInformation" />
          <s:element minOccurs="0" maxOccurs="1" name="CardInformation" type="tns:CardInformation" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationCryptogram" type="tns:ApplicationCryptogram" />
          <s:element minOccurs="0" maxOccurs="1" name="CvmResults" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="IssuerApplicationData" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalVerificationResults" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="UnpredictableNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="tns:Amount" />
          <s:element minOccurs="0" maxOccurs="1" name="PosEntryMode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalInformation" type="tns:TerminalInformation" />
          <s:element minOccurs="0" maxOccurs="1" name="TransactionInformation" type="tns:TransactionInformation" />
          <s:element minOccurs="0" maxOccurs="1" name="CryptogramInformationData" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PinStatement" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CvmMethod" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="IssuerActionCodeDefault" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="IssuerActionCodeDenial" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="IssuerActionCodeOnline" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AuthorizationResponseCode" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="ApplicationInformation">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Aid" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationLabel" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationExpiryDate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationEffectiveDate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationInterchangeProfile" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationVersionNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationTransactionCounter" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationUsageControl" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationPreferredName" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApplicationDisplayName" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="CardInformation">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="MaskedPan" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PanSequenceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CardExpiryDate" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="ApplicationCryptogram">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="CryptogramType" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Cryptogram" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="Amount">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="AmountAuthorized" type="s:decimal" />
          <s:element minOccurs="1" maxOccurs="1" name="AmountOther" type="s:decimal" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="TerminalInformation">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="TerminalType" type="s:int" />
          <s:element minOccurs="0" maxOccurs="1" name="IfdSerialNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalCountryCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalID" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalActionCodeDefault" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalActionCodeDenial" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TerminalActionCodeOnline" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="TransactionInformation">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="TransactionType" type="s:int" />
          <s:element minOccurs="1" maxOccurs="1" name="TransactionCurrencyCode" type="s:int" />
          <s:element minOccurs="0" maxOccurs="1" name="TransactionStatusInformation" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="SurveyDetail">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="MerchantMessage" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerMessage" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="Invoice">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="TaxIndicator" type="tns:TaxIndicator" />
          <s:element minOccurs="0" maxOccurs="1" name="ProductDescription" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="DiscountAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="ShippingAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="DutyAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="DestinationPostalCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="DestinationCountryCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ShipFromPostalCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AlternateTaxAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="AlternateTaxRate" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="LineItems" type="tns:ArrayOfLineItem" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="TaxIndicator">
        <s:restriction base="s:string">
          <s:enumeration value="UNSPECIFIED" />
          <s:enumeration value="NOTPROVIDED" />
          <s:enumeration value="PROVIDED" />
          <s:enumeration value="EXEMPT" />
        </s:restriction>
      </s:simpleType>
      <s:complexType name="ArrayOfLineItem">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="unbounded" name="LineItem" nillable="true" type="tns:LineItem" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="LineItem">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="CommodityCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Description" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Upc" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Quantity" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="UnitOfMeasure" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="UnitCost" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="DiscountAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="TotalAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="TaxAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="ExtendedAmount" nillable="true" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="DebitOrCreditIndicator" type="tns:DebitOrCreditIndicator" />
          <s:element minOccurs="0" maxOccurs="1" name="NetOrGrossIndicator" type="tns:NetOrGrossIndicator" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="DebitOrCreditIndicator">
        <s:restriction base="s:string">
          <s:enumeration value="UNSPECIFIED" />
          <s:enumeration value="CREDIT" />
          <s:enumeration value="DEBIT" />
        </s:restriction>
      </s:simpleType>
      <s:simpleType name="NetOrGrossIndicator">
        <s:restriction base="s:string">
          <s:enumeration value="UNSPECIFIED" />
          <s:enumeration value="NET" />
          <s:enumeration value="GROSS" />
        </s:restriction>
      </s:simpleType>
      <s:element name="DetailsByTransactionId">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="name" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="siteId" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="key" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="merchantTransactionId" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="DetailsByTransactionIdResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="DetailsByTransactionIdResult" type="tns:TransactionResult" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="TransactionResult" nillable="true" type="tns:TransactionResult" />
    </s:schema>
    <s:schema elementFormDefault="qualified" targetNamespace="http://schemas.merchantwarehouse.com/reward/v1">
      <s:complexType name="RewardResultType">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Status" type="s1:RewardResultStatusType" />
          <s:element minOccurs="1" maxOccurs="1" name="TransactionDate" type="s:dateTime" />
          <s:element minOccurs="0" maxOccurs="1" name="ErrorMessage" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AccountNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AccountHolderName" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AccountBalance" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="AccountPointBalance" type="s:int" />
          <s:element minOccurs="0" maxOccurs="unbounded" name="OperationResult" type="s1:OperationResultType" />
          <s:element minOccurs="0" maxOccurs="1" name="AccountBalances" type="s1:ArrayOfAccountBalance" />
          <s:element minOccurs="0" maxOccurs="1" name="RFMIQ" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="RewardResultStatusType">
        <s:restriction base="s:string">
          <s:enumeration value="Success" />
          <s:enumeration value="SuccessWithFailures" />
          <s:enumeration value="Failure" />
        </s:restriction>
      </s:simpleType>
      <s:complexType name="OperationResultType">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="Operation" type="s1:OperationNameType" />
          <s:element minOccurs="0" maxOccurs="1" name="Status" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ErrorMessage" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Token" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AuthCode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="AmountAuthorized" type="s:decimal" />
          <s:element minOccurs="0" maxOccurs="1" name="PointsAdded" type="s:int" />
        </s:sequence>
      </s:complexType>
      <s:simpleType name="OperationNameType">
        <s:restriction base="s:string">
          <s:enumeration value="AddPointsForValue" />
          <s:enumeration value="AddValue" />
          <s:enumeration value="Redeem" />
          <s:enumeration value="BalanceInquiry" />
        </s:restriction>
      </s:simpleType>
      <s:complexType name="ArrayOfAccountBalance">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="unbounded" name="AccountBalance" type="s1:AccountBalance" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="AccountBalance">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Type" type="s:string" />
          <s:element minOccurs="1" maxOccurs="1" name="Amount" type="s:decimal" />
        </s:sequence>
      </s:complexType>
    </s:schema>
  </wsdl:types>
  <wsdl:message name="DetailsByTransportKeySoapIn">
    <wsdl:part name="parameters" element="tns:DetailsByTransportKey" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransportKeySoapOut">
    <wsdl:part name="parameters" element="tns:DetailsByTransportKeyResponse" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransactionIdSoapIn">
    <wsdl:part name="parameters" element="tns:DetailsByTransactionId" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransactionIdSoapOut">
    <wsdl:part name="parameters" element="tns:DetailsByTransactionIdResponse" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransportKeyHttpGetIn">
    <wsdl:part name="Name" type="s:string" />
    <wsdl:part name="SiteID" type="s:string" />
    <wsdl:part name="Key" type="s:string" />
    <wsdl:part name="TransportKey" type="s:string" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransportKeyHttpGetOut">
    <wsdl:part name="Body" element="tns:TransactionResult" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransactionIdHttpGetIn">
    <wsdl:part name="name" type="s:string" />
    <wsdl:part name="siteId" type="s:string" />
    <wsdl:part name="key" type="s:string" />
    <wsdl:part name="merchantTransactionId" type="s:string" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransactionIdHttpGetOut">
    <wsdl:part name="Body" element="tns:TransactionResult" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransportKeyHttpPostIn">
    <wsdl:part name="Name" type="s:string" />
    <wsdl:part name="SiteID" type="s:string" />
    <wsdl:part name="Key" type="s:string" />
    <wsdl:part name="TransportKey" type="s:string" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransportKeyHttpPostOut">
    <wsdl:part name="Body" element="tns:TransactionResult" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransactionIdHttpPostIn">
    <wsdl:part name="name" type="s:string" />
    <wsdl:part name="siteId" type="s:string" />
    <wsdl:part name="key" type="s:string" />
    <wsdl:part name="merchantTransactionId" type="s:string" />
  </wsdl:message>
  <wsdl:message name="DetailsByTransactionIdHttpPostOut">
    <wsdl:part name="Body" element="tns:TransactionResult" />
  </wsdl:message>
  <wsdl:portType name="MustangReportingSoap">
    <wsdl:operation name="DetailsByTransportKey">
      <wsdl:input message="tns:DetailsByTransportKeySoapIn" />
      <wsdl:output message="tns:DetailsByTransportKeySoapOut" />
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <wsdl:input message="tns:DetailsByTransactionIdSoapIn" />
      <wsdl:output message="tns:DetailsByTransactionIdSoapOut" />
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:portType name="MustangReportingHttpGet">
    <wsdl:operation name="DetailsByTransportKey">
      <wsdl:input message="tns:DetailsByTransportKeyHttpGetIn" />
      <wsdl:output message="tns:DetailsByTransportKeyHttpGetOut" />
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <wsdl:input message="tns:DetailsByTransactionIdHttpGetIn" />
      <wsdl:output message="tns:DetailsByTransactionIdHttpGetOut" />
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:portType name="MustangReportingHttpPost">
    <wsdl:operation name="DetailsByTransportKey">
      <wsdl:input message="tns:DetailsByTransportKeyHttpPostIn" />
      <wsdl:output message="tns:DetailsByTransportKeyHttpPostOut" />
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <wsdl:input message="tns:DetailsByTransactionIdHttpPostIn" />
      <wsdl:output message="tns:DetailsByTransactionIdHttpPostOut" />
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:binding name="MustangReportingSoap" type="tns:MustangReportingSoap">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" />
    <wsdl:operation name="DetailsByTransportKey">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/genius/10/Reporting/DetailsByTransportKey" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/genius/10/Reporting/DetailsByTransactionId" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:binding name="MustangReportingSoap12" type="tns:MustangReportingSoap">
    <soap12:binding transport="http://schemas.xmlsoap.org/soap/http" />
    <wsdl:operation name="DetailsByTransportKey">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/genius/10/Reporting/DetailsByTransportKey" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/genius/10/Reporting/DetailsByTransactionId" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:binding name="MustangReportingHttpGet" type="tns:MustangReportingHttpGet">
    <http:binding verb="GET" />
    <wsdl:operation name="DetailsByTransportKey">
      <http:operation location="/DetailsByTransportKey" />
      <wsdl:input>
        <http:urlEncoded />
      </wsdl:input>
      <wsdl:output>
        <mime:mimeXml part="Body" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <http:operation location="/DetailsByTransactionId" />
      <wsdl:input>
        <http:urlEncoded />
      </wsdl:input>
      <wsdl:output>
        <mime:mimeXml part="Body" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:binding name="MustangReportingHttpPost" type="tns:MustangReportingHttpPost">
    <http:binding verb="POST" />
    <wsdl:operation name="DetailsByTransportKey">
      <http:operation location="/DetailsByTransportKey" />
      <wsdl:input>
        <mime:content type="application/x-www-form-urlencoded" />
      </wsdl:input>
      <wsdl:output>
        <mime:mimeXml part="Body" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="DetailsByTransactionId">
      <http:operation location="/DetailsByTransactionId" />
      <wsdl:input>
        <mime:content type="application/x-www-form-urlencoded" />
      </wsdl:input>
      <wsdl:output>
        <mime:mimeXml part="Body" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:service name="MustangReporting">
    <wsdl:port name="MustangReportingSoap" binding="tns:MustangReportingSoap">
      <soap:address location="https://genius.merchantware.net/v1/Reporting.asmx" />
    </wsdl:port>
    <wsdl:port name="MustangReportingSoap12" binding="tns:MustangReportingSoap12">
      <soap12:address location="https://genius.merchantware.net/v1/Reporting.asmx" />
    </wsdl:port>
    <wsdl:port name="MustangReportingHttpGet" binding="tns:MustangReportingHttpGet">
      <http:address location="https://genius.merchantware.net/v1/Reporting.asmx" />
    </wsdl:port>
    <wsdl:port name="MustangReportingHttpPost" binding="tns:MustangReportingHttpPost">
      <http:address location="https://genius.merchantware.net/v1/Reporting.asmx" />
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>
`;

export default GeniusReportingWSDL;
