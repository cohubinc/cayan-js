import { IGeniusConfig, ExternalPaymentTypes, IAddItemParameters, IDiscountItemParameters, IDeleteItemParameters, IDeleteAllItemsParameters, IUpdateItemParameters, IUpdateTotalParams, ITransportRequest, ICheckStatusResponse, IStageTransactionResult, IStartOrderResponse, IEndOrderResponse, IAddItemResponse, IDiscountItemResponse, IDeleteItemResponse, IDeleteAllItemsResponse, IUpdateItemResponse, IUpdateTotalResponse, IInitiateTransactionResult, ICancelTransactionResponse, IDetailsByTransportKeyResponse } from "./definitions";
import "fetch-everywhere";
export default class GeniusClient {
    config: IGeniusConfig;
    soapClient: any;
    reportClient: any;
    constructor(config: IGeniusConfig);
    static createInstance(config: IGeniusConfig): Promise<GeniusClient>;
    StageTransaction(transportRequest: ITransportRequest): Promise<IStageTransactionResult | Error>;
    /**
     * Check the status of the CED
     * @param TransportKey - The transport key from the StageTransaction response
     */
    InitiateTransaction(TransportKey: string): Promise<IInitiateTransactionResult | Error>;
    /**
     * Check the status of the CED
     */
    CheckStatus(timeout?: number): Promise<ICheckStatusResponse | Error>;
    /**
     * Initiates keyed entry on the CED
     * @param
     */
    InitiateKeyedEntry(PaymentType?: string): Promise<IStartOrderResponse | Error>;
    /**
     * Start an order
     * @param Order - The order or invoice number associated with the transaction.
     */
    StartOrder(Order: string): Promise<IStartOrderResponse | Error>;
    /**
     * End the currently displayed order using an alternate payment method. See ExternalPaymentTypes
     * @param order - The order or invoice number associated with the transaction
     * @param externalPaymentType - The external payment type. Must be one of the ExternalPaymentTypes
     */
    EndOrder(order: string, externalPaymentType: ExternalPaymentTypes): Promise<IEndOrderResponse | Error>;
    /**
     * Cancels the current order and resets the screen back to an idle state
     */
    Cancel(timeout?: number): Promise<ICancelTransactionResponse | Error>;
    /**
     * Add an item to the screen. Also allows updating order totals.
     * @param item - The item to be added to the order. See IAddItemParameters
     */
    AddItem(item: IAddItemParameters): Promise<IAddItemResponse | Error>;
    /**
     * Add a line item discount
     * @param discountItem - Discount to be applied
     */
    DiscountItem(discountItem: IDiscountItemParameters): Promise<IDiscountItemResponse | Error>;
    /**
     * Delete a line item
     * @param item - Item to be deleted from the list
     */
    DeleteItem(item: IDeleteItemParameters): Promise<IDeleteItemResponse | Error>;
    /**
     * Delete all items from the order
     * @param params - order total and tax updates.
     */
    DeleteAllItems(deleteParams: IDeleteAllItemsParameters): Promise<IDeleteAllItemsResponse | Error>;
    /**
     * Update a line item
     * @param item - the item to be updated
     */
    UpdateItem(item: IUpdateItemParameters): Promise<IUpdateItemResponse | Error>;
    UpdateTotal(updateParams: IUpdateTotalParams): Promise<IUpdateTotalResponse | Error>;
    /**
     * DetailsByTransportKey
     */
    DetailsByTransportKey(TransportKey: string): Promise<IDetailsByTransportKeyResponse>;
}
/**
 * A simple HTTP client that times out after the specified amount of time
 */
export declare function impatientFetch(url: string, timeout?: number): Promise<Response>;
