import {
  IGeniusClient,
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
  IUpdateTotalResponse
} from "./definitions";
import "fetch-everywhere";
import GeniusWSDL from "./GeniusWSDL";
import CreateSoapClientWithWSDL from "../CreateSoapClientWithWSDL";

export default class GeniusClient<IGeniusClient> {
  config: IGeniusConfig;
  soapClient: any;

  constructor(config: IGeniusConfig) {
    this.config = config;
  }

  static async createInstance(config: IGeniusConfig) {
    let client = new GeniusClient(config);

    const soapClient = await CreateSoapClientWithWSDL(
      GeniusWSDL,
      "https://transport.merchantware.net/v4/transportService.asmx"
    );

    client.soapClient = soapClient;

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
   */
  async CheckStatus(): Promise<ICheckStatusResponse> {
    const url = this.makeUrl({ Action: "Status", Format: "JSON" });

    return (await fetch(url).then(r => r.json())) as ICheckStatusResponse;
  }

  /**
   * Start an order
   * @param order - The order or invoice number associated with the transaction.
   */
  async StartOrder(order: string): Promise<IStartOrderResponse> {
    const url = this.makeUrl({
      Action: "StartOrder",
      Format: "JSON",
      Order: order
    });

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
    const url = this.makeUrl({
      Action: "EndOrder",
      Format: "JSON",
      Order: order,
      ExternalPaymentType: externalPaymentType
    });

    return await fetch(url).then(r => r.json());
  }

  /**
   * Cancels the current order and resets the screen back to an idle state
   */
  async Cancel(): Promise<any> {
    const url = this.makeUrl({ Action: "Cancel", Format: "JSON" });

    return await fetch(url).then(r => r.json());
  }

  /**
   * Add an item to the screen. Also allows updating order totals.
   * @param item - The item to be added to the order. See IAddItemParameters
   */
  async AddItem(item: IAddItemParameters): Promise<IAddItemResponse> {
    const url = this.makeUrl({
      Action: "AddItem",
      Format: "JSON",
      ...item
    });

    return await fetch(url).then(r => r.json());
  }

  /**
   * Add a line item discount
   * @param discountItem - Discount to be applied
   */
  async DiscountItem(
    discountItem: IDiscountItemParameters
  ): Promise<IDiscountItemResponse> {
    const url = this.makeUrl({
      Action: "DiscountItem",
      Format: "JSON",
      ...discountItem
    });

    return await fetch(url).then(r => r.json());
  }

  /**
   * Delete a line item
   * @param item - Item to be deleted from the list
   */
  async DeleteItem(item: IDeleteItemParameters): Promise<IDeleteItemResponse> {
    const url = this.makeUrl({
      Action: "DeleteItem",
      Format: "JSON",
      ...item
    });

    return await fetch(url).then(r => r.json());
  }

  /**
   * Delete all items from the order
   * @param params - order total and tax updates.
   */
  async DeleteAllItems(
    params: IDeleteAllItemsParameters
  ): Promise<IDeleteAllItemsResponse> {
    const url = this.makeUrl({
      Action: "DeleteAllItems",
      Format: "JSON",
      ...params
    });

    return await fetch(url).then(r => r.json());
  }

  /**
   * Update a line item
   * @param item - the item to be updated
   */
  async UpdateItem(item: IUpdateItemParameters): Promise<IUpdateItemResponse> {
    const url = this.makeUrl({
      Action: "UpdateItem",
      Format: "JSON",
      ...item
    });

    return await fetch(url).then(r => r.json());
  }

  async UpdateTotal(params: IUpdateTotalParams): Promise<IUpdateTotalResponse> {
    const url = this.makeUrl({
      Action: "UpdateTotal",
      Format: "JSON",
      ...params
    });

    return await fetch(url).then(r => r.json());
  }

  private makeUrl = (params: object) => {
    const queryString = makeQueryString(params);

    return `http://${this.config.CEDHostname}:8080/v2/pos?${queryString}`;
  };
}

function makeQueryString(obj: any): string {
  return Object.keys(obj)
    .map((key: string) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}
