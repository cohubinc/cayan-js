"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("fetch-everywhere");
var GeniusWSDL_1 = __importDefault(require("./GeniusWSDL"));
var GeniusReportingWSDL_1 = __importDefault(require("./GeniusReportingWSDL"));
var CreateSoapClientWithWSDL_1 = __importDefault(require("../CreateSoapClientWithWSDL"));
var GeniusClient = /** @class */ (function () {
    function GeniusClient(config) {
        this.config = config;
    }
    GeniusClient.createInstance = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var client, soapClient, reportClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new GeniusClient(config);
                        return [4 /*yield*/, CreateSoapClientWithWSDL_1.default(GeniusWSDL_1.default, "https://transport.merchantware.net/v4/transportService.asmx")];
                    case 1:
                        soapClient = _a.sent();
                        return [4 /*yield*/, CreateSoapClientWithWSDL_1.default(GeniusReportingWSDL_1.default, "https://genius.merchantware.net/v1/Reporting.asmx")];
                    case 2:
                        reportClient = _a.sent();
                        client.soapClient = soapClient;
                        client.reportClient = reportClient;
                        return [2 /*return*/, client];
                }
            });
        });
    };
    GeniusClient.prototype.StageTransaction = function (transportRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = {
                            merchantName: this.config.MerchantName,
                            merchantSiteId: this.config.MerchantSiteId,
                            merchantKey: this.config.MerchantKey,
                            request: __assign({}, transportRequest)
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.CreateTransactionAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result[0].CreateTransactionResult];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                return resolve(new Error("Error staging transaction"));
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check the status of the CED
     * @param TransportKey - The transport key from the StageTransaction response
     */
    GeniusClient.prototype.InitiateTransaction = function (TransportKey) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { TransportKey: TransportKey, Format: "JSON" };
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v2/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url)
                                .then(function (r) { return r.json(); })
                                .catch(function (e) { return e; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Check the status of the CED
     */
    GeniusClient.prototype.CheckStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { Action: "Status", Format: "JSON" };
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v2/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url)
                                .then(function (r) { return r.json(); })
                                .catch(function (e) { return e; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Initiates keyed entry on the CED
     * @param
     */
    GeniusClient.prototype.InitiateKeyedEntry = function (PaymentType) {
        if (PaymentType === void 0) { PaymentType = null; }
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { Action: "InitiateKeyedEntry", Format: "JSON" };
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Start an order
     * @param Order - The order or invoice number associated with the transaction.
     */
    GeniusClient.prototype.StartOrder = function (Order) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { Action: "StartOrder", Format: "JSON", Order: Order };
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * End the currently displayed order using an alternate payment method. See ExternalPaymentTypes
     * @param order - The order or invoice number associated with the transaction
     * @param externalPaymentType - The external payment type. Must be one of the ExternalPaymentTypes
     */
    GeniusClient.prototype.EndOrder = function (order, externalPaymentType) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            Action: "EndOrder",
                            Format: "JSON",
                            Order: order,
                            ExternalPaymentType: externalPaymentType
                        };
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Cancels the current order and resets the screen back to an idle state
     */
    GeniusClient.prototype.Cancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { Action: "Cancel", Format: "JSON" };
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Add an item to the screen. Also allows updating order totals.
     * @param item - The item to be added to the order. See IAddItemParameters
     */
    GeniusClient.prototype.AddItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign({ Action: "AddItem", Format: "JSON" }, item);
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Add a line item discount
     * @param discountItem - Discount to be applied
     */
    GeniusClient.prototype.DiscountItem = function (discountItem) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign({ Action: "DiscountItem", Format: "JSON" }, discountItem);
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete a line item
     * @param item - Item to be deleted from the list
     */
    GeniusClient.prototype.DeleteItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign({ Action: "DeleteItem", Format: "JSON" }, item);
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete all items from the order
     * @param params - order total and tax updates.
     */
    GeniusClient.prototype.DeleteAllItems = function (deleteParams) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign({ Action: "DeleteAllItems", Format: "JSON" }, deleteParams);
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update a line item
     * @param item - the item to be updated
     */
    GeniusClient.prototype.UpdateItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign({ Action: "UpdateItem", Format: "JSON" }, item);
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GeniusClient.prototype.UpdateTotal = function (updateParams) {
        return __awaiter(this, void 0, void 0, function () {
            var params, queryString, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign({ Action: "UpdateTotal", Format: "JSON" }, updateParams);
                        queryString = makeQueryString(params);
                        url = "http://" + this.config.CEDHostname + ":8080/v1/pos?" + queryString;
                        console.log(url);
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.json().catch(function (e) { return e; }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DetailsByTransportKey
     */
    GeniusClient.prototype.DetailsByTransportKey = function (TransportKey) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = {
                            Name: this.config.MerchantName,
                            SiteID: this.config.MerchantSiteId,
                            Key: this.config.MerchantKey,
                            TransportKey: TransportKey
                        };
                        return [4 /*yield*/, this.reportClient.DetailsByTransportKeyAsync(args)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0].DetailsByTransportKeyResult];
                }
            });
        });
    };
    return GeniusClient;
}());
exports.default = GeniusClient;
function makeQueryString(obj) {
    return Object.keys(obj)
        .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
        .join("&");
}
