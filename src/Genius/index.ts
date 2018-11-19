import {
  IGeniusConfig,
  ExternalPaymentTypes,
  IAddItemParameters,
  IDiscountItemParameters,
  IDeleteItemParameters,
  IDeleteAllItemsParameters,
  IUpdateItemParameters,
  IUpdateTotalParams,
  ITransportRequest,
  ICheckStatusResponse,
  IStageTransactionResult,
  IStartOrderResponse,
  IEndOrderResponse,
  IAddItemResponse,
  IDiscountItemResponse,
  IDeleteItemResponse,
  IDeleteAllItemsResponse,
  IUpdateItemResponse,
  IUpdateTotalResponse,
  IInitiateTransactionResult
} from "./definitions";
import "fetch-everywhere";
import GeniusWSDL from "./GeniusWSDL";
import GeniusReportingWSDL from "./GeniusReportingWSDL";
import CreateSoapClientWithWSDL from "../CreateSoapClientWithWSDL";

export default class GeniusClient {
  config: IGeniusConfig;
  soapClient: any;
  reportClient: any;

  constructor(config: IGeniusConfig) {
    this.config = config;
  }

  static async createInstance(config: IGeniusConfig) {
    let client = new GeniusClient(config);

    const soapClient = await CreateSoapClientWithWSDL(
      GeniusWSDL,
      "https://transport.merchantware.net/v4/transportService.asmx"
    );

    const reportClient = await CreateSoapClientWithWSDL(
      GeniusReportingWSDL,
      "https://genius.merchantware.net/v1/Reporting.asmx"
    );

    client.soapClient = soapClient;
    client.reportClient = reportClient;

    return client;
  }

  async StageTransaction(
    transportRequest: ITransportRequest
  ): Promise<IStageTransactionResult> {
    const args = {
      merchantName: this.config.MerchantName,
      merchantSiteId: this.config.MerchantSiteId,
      merchantKey: this.config.MerchantKey,
      request: { ...transportRequest }
    };
    const result = await this.soapClient.CreateTransactionAsync(args);
    return result[0].CreateTransactionResult;
  }

  /**
   * Check the status of the CED
   * @param TransportKey - The transport key from the StageTransaction response
   */
  async InitiateTransaction(TransportKey: string): Promise<any> {
    const params = { TransportKey, Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v2/pos?${queryString}`;
    console.log(url);
    return (await fetch(url).then(r => r.json())) as IInitiateTransactionResult;
  }

  /**
   * Check the status of the CED
   */
  async CheckStatus(): Promise<ICheckStatusResponse> {
    const params = { Action: "Status", Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v2/pos?${queryString}`;
    console.log(url);
    return (await fetch(url).then(r => r.json())) as ICheckStatusResponse;
  }

  /**
   * Initiates keyed entry on the CED
   * @param
   */
  async InitiateKeyedEntry(
    PaymentType: string = null
  ): Promise<IStartOrderResponse> {
    const params = { Action: "InitiateKeyedEntry", Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Start an order
   * @param Order - The order or invoice number associated with the transaction.
   */
  async StartOrder(Order: string): Promise<IStartOrderResponse> {
    const params = { Action: "StartOrder", Format: "JSON", Order };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * End the currently displayed order using an alternate payment method. See ExternalPaymentTypes
   * @param order - The order or invoice number associated with the transaction
   * @param externalPaymentType - The external payment type. Must be one of the ExternalPaymentTypes
   */
  async EndOrder(
    order: string,
    externalPaymentType: ExternalPaymentTypes
  ): Promise<IEndOrderResponse> {
    const params = {
      Action: "EndOrder",
      Format: "JSON",
      Order: order,
      ExternalPaymentType: externalPaymentType
    };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Cancels the current order and resets the screen back to an idle state
   */
  async Cancel(): Promise<any> {
    const params = { Action: "Cancel", Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Add an item to the screen. Also allows updating order totals.
   * @param item - The item to be added to the order. See IAddItemParameters
   */
  async AddItem(item: IAddItemParameters): Promise<IAddItemResponse> {
    const params = { Action: "AddItem", Format: "JSON", ...item };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Add a line item discount
   * @param discountItem - Discount to be applied
   */
  async DiscountItem(
    discountItem: IDiscountItemParameters
  ): Promise<IDiscountItemResponse> {
    const params = { Action: "DiscountItem", Format: "JSON", ...discountItem };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Delete a line item
   * @param item - Item to be deleted from the list
   */
  async DeleteItem(item: IDeleteItemParameters): Promise<IDeleteItemResponse> {
    const params = { Action: "DeleteItem", Format: "JSON", ...item };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Delete all items from the order
   * @param params - order total and tax updates.
   */
  async DeleteAllItems(
    deleteParams: IDeleteAllItemsParameters
  ): Promise<IDeleteAllItemsResponse> {
    const params = {
      Action: "DeleteAllItems",
      Format: "JSON",
      ...deleteParams
    };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * Update a line item
   * @param item - the item to be updated
   */
  async UpdateItem(item: IUpdateItemParameters): Promise<IUpdateItemResponse> {
    const params = { Action: "UpdateItem", Format: "JSON", ...item };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  async UpdateTotal(
    updateParams: IUpdateTotalParams
  ): Promise<IUpdateTotalResponse> {
    const params = { Action: "UpdateTotal", Format: "JSON", ...updateParams };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    console.log(url);
    return await fetch(url).then(r => r.json());
  }

  /**
   * DetailsByTransportKey
   */
  async DetailsByTransportKey(TransportKey: string) {
    const args = {
      Name: this.config.MerchantName,
      SiteID: this.config.MerchantSiteId,
      Key: this.config.MerchantKey,
      TransportKey
    };
    const result = await this.reportClient.DetailsByTransportKeyAsync(args);
    return result[0].DetailsByTransportKeyResult;
  }
}

function makeQueryString(obj: any): string {
  return Object.keys(obj)
    .map((key: string) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}
