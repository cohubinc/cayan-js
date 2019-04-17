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
  IInitiateTransactionResult,
  ICancelTransactionResponse
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
  ): Promise<IStageTransactionResult | Error> {
    const args = {
      merchantName: this.config.MerchantName,
      merchantSiteId: this.config.MerchantSiteId,
      merchantKey: this.config.MerchantKey,
      request: { ...transportRequest }
    };

    try {
      const result = await this.soapClient.CreateTransactionAsync(args);
      return result[0].CreateTransactionResult;
    } catch (e) {
      return new Promise(resolve =>
        resolve(new Error("Error staging transaction"))
      );
    }
  }

  /**
   * Check the status of the CED
   * @param TransportKey - The transport key from the StageTransaction response
   */
  async InitiateTransaction(
    TransportKey: string
  ): Promise<IInitiateTransactionResult | Error> {
    const params = { TransportKey, Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v2/pos?${queryString}`;
    return await fetch(url)
      .then(r => r.json())
      .catch(e => e);
  }

  /**
   * Check the status of the CED
   */
  async CheckStatus(): Promise<ICheckStatusResponse | Error> {
    const params = { Action: "Status", Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v2/pos?${queryString}`;
    return await fetch(url)
      .then(r => r.json())
      .catch(e => e);
  }

  /**
   * Initiates keyed entry on the CED
   * @param
   */
  async InitiateKeyedEntry(
    PaymentType: string = null
  ): Promise<IStartOrderResponse | Error> {
    const params = { Action: "InitiateKeyedEntry", Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Start an order
   * @param Order - The order or invoice number associated with the transaction.
   */
  async StartOrder(Order: string): Promise<IStartOrderResponse | Error> {
    const params = { Action: "StartOrder", Format: "JSON", Order };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * End the currently displayed order using an alternate payment method. See ExternalPaymentTypes
   * @param order - The order or invoice number associated with the transaction
   * @param externalPaymentType - The external payment type. Must be one of the ExternalPaymentTypes
   */
  async EndOrder(
    order: string,
    externalPaymentType: ExternalPaymentTypes
  ): Promise<IEndOrderResponse | Error> {
    const params = {
      Action: "EndOrder",
      Format: "JSON",
      Order: order,
      ExternalPaymentType: externalPaymentType
    };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Cancels the current order and resets the screen back to an idle state
   */
  async Cancel(): Promise<ICancelTransactionResponse | Error> {
    const params = { Action: "Cancel", Format: "JSON" };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Add an item to the screen. Also allows updating order totals.
   * @param item - The item to be added to the order. See IAddItemParameters
   */
  async AddItem(item: IAddItemParameters): Promise<IAddItemResponse | Error> {
    const params = { Action: "AddItem", Format: "JSON", ...item };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Add a line item discount
   * @param discountItem - Discount to be applied
   */
  async DiscountItem(
    discountItem: IDiscountItemParameters
  ): Promise<IDiscountItemResponse | Error> {
    const params = { Action: "DiscountItem", Format: "JSON", ...discountItem };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Delete a line item
   * @param item - Item to be deleted from the list
   */
  async DeleteItem(
    item: IDeleteItemParameters
  ): Promise<IDeleteItemResponse | Error> {
    const params = { Action: "DeleteItem", Format: "JSON", ...item };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Delete all items from the order
   * @param params - order total and tax updates.
   */
  async DeleteAllItems(
    deleteParams: IDeleteAllItemsParameters
  ): Promise<IDeleteAllItemsResponse | Error> {
    const params = {
      Action: "DeleteAllItems",
      Format: "JSON",
      ...deleteParams
    };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  /**
   * Update a line item
   * @param item - the item to be updated
   */
  async UpdateItem(
    item: IUpdateItemParameters
  ): Promise<IUpdateItemResponse | Error> {
    const params = { Action: "UpdateItem", Format: "JSON", ...item };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
  }

  async UpdateTotal(
    updateParams: IUpdateTotalParams
  ): Promise<IUpdateTotalResponse | Error> {
    const params = { Action: "UpdateTotal", Format: "JSON", ...updateParams };
    const queryString = makeQueryString(params);
    const url = `http://${this.config.CEDHostname}:8080/v1/pos?${queryString}`;
    return await fetch(url).then(r => r.json().catch(e => e));
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
