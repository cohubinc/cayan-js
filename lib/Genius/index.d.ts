import { IGeniusConfig, ExternalPaymentTypes, IAddItemParameters, IDiscountItemParameters, IDeleteItemParameters, IDeleteAllItemsParameters, IUpdateItemParameters, IUpdateTotalParams, ITransportRequest, ICheckStatusResponse, IStageTransactionResult, IStartOrderResponse, IEndOrderResponse, IAddItemResponse, IDiscountItemResponse, IDeleteItemResponse, IDeleteAllItemsResponse, IUpdateItemResponse, IUpdateTotalResponse } from "./definitions";
import "fetch-everywhere";
export default class GeniusClient {
    config: IGeniusConfig;
    soapClient: any;
    reportClient: any;
    constructor(config: IGeniusConfig);
    static createInstance(config: IGeniusConfig): Promise<GeniusClient>;
    StageTransaction(transportRequest: ITransportRequest): Promise<IStageTransactionResult>;
    /**
     * Check the status of the CED
     * @param TransportKey - The transport key from the StageTransaction response
     */
    InitiateTransaction(TransportKey: string): Promise<any>;
    /**
     * Check the status of the CED
     */
    CheckStatus(): Promise<ICheckStatusResponse>;
    /**
     * Initiates keyed entry on the CED
     * @param
     */
    InitiateKeyedEntry(PaymentType?: string): Promise<IStartOrderResponse>;
    /**
     * Start an order
     * @param Order - The order or invoice number associated with the transaction.
     */
    StartOrder(Order: string): Promise<IStartOrderResponse>;
    /**
     * End the currently displayed order using an alternate payment method. See ExternalPaymentTypes
     * @param order - The order or invoice number associated with the transaction
     * @param externalPaymentType - The external payment type. Must be one of the ExternalPaymentTypes
     */
    EndOrder(order: string, externalPaymentType: ExternalPaymentTypes): Promise<IEndOrderResponse>;
    /**
     * Cancels the current order and resets the screen back to an idle state
     */
    Cancel(): Promise<any>;
    /**
     * Add an item to the screen. Also allows updating order totals.
     * @param item - The item to be added to the order. See IAddItemParameters
     */
    AddItem(item: IAddItemParameters): Promise<IAddItemResponse>;
    /**
     * Add a line item discount
     * @param discountItem - Discount to be applied
     */
    DiscountItem(discountItem: IDiscountItemParameters): Promise<IDiscountItemResponse>;
    /**
     * Delete a line item
     * @param item - Item to be deleted from the list
     */
    DeleteItem(item: IDeleteItemParameters): Promise<IDeleteItemResponse>;
    /**
     * Delete all items from the order
     * @param params - order total and tax updates.
     */
    DeleteAllItems(deleteParams: IDeleteAllItemsParameters): Promise<IDeleteAllItemsResponse>;
    /**
     * Update a line item
     * @param item - the item to be updated
     */
    UpdateItem(item: IUpdateItemParameters): Promise<IUpdateItemResponse>;
    UpdateTotal(updateParams: IUpdateTotalParams): Promise<IUpdateTotalResponse>;
    /**
     * DetailsByTransportKey
     */
    DetailsByTransportKey(TransportKey: string): Promise<any>;
}
