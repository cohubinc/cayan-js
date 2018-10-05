const GiftCardWSDL = `

<?xml version="1.0" encoding="utf-8"?>
<wsdl:definitions xmlns:s="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" xmlns:tns="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" targetNamespace="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
  <wsdl:types>
    <s:schema elementFormDefault="qualified" targetNamespace="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard">
      <s:element name="ActivateCard">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:ActivateCardRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="MerchantCredentials">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="MerchantName" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantSiteId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantKey" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="GiftPaymentData">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Source" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="GiftCardPin" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TrackData" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CardNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Token" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="ActivateCardRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerEmailAddress" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="ActivateCardResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="ActivateCardResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="GiftResponse45">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="ApprovalStatus" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CardNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ErrorMessage" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ExpirationDate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ReaderEntryMode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ResponseMessage" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Token" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="TransactionDate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Gift" type="tns:GiftDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="Loyalty" type="tns:LoyaltyDetail" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerEmailAddress" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="GiftDetail">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="ApprovedAmount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="RequestedAmount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="GiftBalance" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="RewardsBalance" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="RedeemableBalance" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="LoyaltyDetail">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="PointsType" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ApprovedPoints" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PointsBeforeNextReward" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PointsBalance" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="AddValue">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:AddValueRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="AddValueRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerEmailAddress" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="AddValueResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="AddValueResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="BalanceInquiry">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:BalanceInquiryRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="BalanceInquiryRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="BalanceInquiryResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="BalanceInquiryResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="Refund">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:GiftRefundRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="GiftRefundRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="RefundResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="RefundResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="Sale">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:GiftSaleRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="GiftSaleRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="EnablePartialAuthorization" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerEmailAddress" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="SaleResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="SaleResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="Void">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:GiftVoidRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="GiftVoidRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="Token" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="VoidResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="VoidResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="AddPoints">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:AddPointsRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="AddPointsRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="AmountType" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerEmailAddress" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="AddPointsResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="AddPointsResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="RemovePoints">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="Credentials" type="tns:MerchantCredentials" />
            <s:element minOccurs="0" maxOccurs="1" name="PaymentData" type="tns:GiftPaymentData" />
            <s:element minOccurs="0" maxOccurs="1" name="Request" type="tns:RemovePointsRequest" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="RemovePointsRequest">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="AmountType" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="Amount" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="InvoiceNumber" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="MerchantTransactionId" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CustomerEmailAddress" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="RemovePointsResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="RemovePointsResult" type="tns:GiftResponse45" />
          </s:sequence>
        </s:complexType>
      </s:element>
    </s:schema>
  </wsdl:types>
  <wsdl:message name="ActivateCardSoapIn">
    <wsdl:part name="parameters" element="tns:ActivateCard" />
  </wsdl:message>
  <wsdl:message name="ActivateCardSoapOut">
    <wsdl:part name="parameters" element="tns:ActivateCardResponse" />
  </wsdl:message>
  <wsdl:message name="AddValueSoapIn">
    <wsdl:part name="parameters" element="tns:AddValue" />
  </wsdl:message>
  <wsdl:message name="AddValueSoapOut">
    <wsdl:part name="parameters" element="tns:AddValueResponse" />
  </wsdl:message>
  <wsdl:message name="BalanceInquirySoapIn">
    <wsdl:part name="parameters" element="tns:BalanceInquiry" />
  </wsdl:message>
  <wsdl:message name="BalanceInquirySoapOut">
    <wsdl:part name="parameters" element="tns:BalanceInquiryResponse" />
  </wsdl:message>
  <wsdl:message name="RefundSoapIn">
    <wsdl:part name="parameters" element="tns:Refund" />
  </wsdl:message>
  <wsdl:message name="RefundSoapOut">
    <wsdl:part name="parameters" element="tns:RefundResponse" />
  </wsdl:message>
  <wsdl:message name="SaleSoapIn">
    <wsdl:part name="parameters" element="tns:Sale" />
  </wsdl:message>
  <wsdl:message name="SaleSoapOut">
    <wsdl:part name="parameters" element="tns:SaleResponse" />
  </wsdl:message>
  <wsdl:message name="VoidSoapIn">
    <wsdl:part name="parameters" element="tns:Void" />
  </wsdl:message>
  <wsdl:message name="VoidSoapOut">
    <wsdl:part name="parameters" element="tns:VoidResponse" />
  </wsdl:message>
  <wsdl:message name="AddPointsSoapIn">
    <wsdl:part name="parameters" element="tns:AddPoints" />
  </wsdl:message>
  <wsdl:message name="AddPointsSoapOut">
    <wsdl:part name="parameters" element="tns:AddPointsResponse" />
  </wsdl:message>
  <wsdl:message name="RemovePointsSoapIn">
    <wsdl:part name="parameters" element="tns:RemovePoints" />
  </wsdl:message>
  <wsdl:message name="RemovePointsSoapOut">
    <wsdl:part name="parameters" element="tns:RemovePointsResponse" />
  </wsdl:message>
  <wsdl:portType name="GiftcardSoap">
    <wsdl:operation name="ActivateCard">
      <wsdl:input message="tns:ActivateCardSoapIn" />
      <wsdl:output message="tns:ActivateCardSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="AddValue">
      <wsdl:input message="tns:AddValueSoapIn" />
      <wsdl:output message="tns:AddValueSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="BalanceInquiry">
      <wsdl:input message="tns:BalanceInquirySoapIn" />
      <wsdl:output message="tns:BalanceInquirySoapOut" />
    </wsdl:operation>
    <wsdl:operation name="Refund">
      <wsdl:input message="tns:RefundSoapIn" />
      <wsdl:output message="tns:RefundSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="Sale">
      <wsdl:input message="tns:SaleSoapIn" />
      <wsdl:output message="tns:SaleSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="Void">
      <wsdl:input message="tns:VoidSoapIn" />
      <wsdl:output message="tns:VoidSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="AddPoints">
      <wsdl:input message="tns:AddPointsSoapIn" />
      <wsdl:output message="tns:AddPointsSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="RemovePoints">
      <wsdl:input message="tns:RemovePointsSoapIn" />
      <wsdl:output message="tns:RemovePointsSoapOut" />
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:portType name="GiftcardHttpPost" />
  <wsdl:binding name="GiftcardSoap" type="tns:GiftcardSoap">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" />
    <wsdl:operation name="ActivateCard">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/ActivateCard" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="AddValue">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/AddValue" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="BalanceInquiry">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/BalanceInquiry" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="Refund">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/Refund" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="Sale">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/Sale" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="Void">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/Void" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="AddPoints">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/AddPoints" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="RemovePoints">
      <soap:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/RemovePoints" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:binding name="GiftcardSoap12" type="tns:GiftcardSoap">
    <soap12:binding transport="http://schemas.xmlsoap.org/soap/http" />
    <wsdl:operation name="ActivateCard">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/ActivateCard" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="AddValue">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/AddValue" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="BalanceInquiry">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/BalanceInquiry" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="Refund">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/Refund" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="Sale">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/Sale" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="Void">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/Void" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="AddPoints">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/AddPoints" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="RemovePoints">
      <soap12:operation soapAction="http://schemas.merchantwarehouse.com/merchantware/45/Giftcard/RemovePoints" style="document" />
      <wsdl:input>
        <soap12:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap12:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:binding name="GiftcardHttpPost" type="tns:GiftcardHttpPost">
    <http:binding verb="POST" />
  </wsdl:binding>
  <wsdl:service name="Giftcard">
    <wsdl:port name="GiftcardSoap" binding="tns:GiftcardSoap">
      <soap:address location="https://ps1.merchantware.net/Merchantware/ws/ExtensionServices/v45/Giftcard.asmx" />
    </wsdl:port>
    <wsdl:port name="GiftcardSoap12" binding="tns:GiftcardSoap12">
      <soap12:address location="https://ps1.merchantware.net/Merchantware/ws/ExtensionServices/v45/Giftcard.asmx" />
    </wsdl:port>
    <wsdl:port name="GiftcardHttpPost" binding="tns:GiftcardHttpPost">
      <http:address location="https://ps1.merchantware.net/Merchantware/ws/ExtensionServices/v45/Giftcard.asmx" />
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>
`;

export default GiftCardWSDL;
