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
var CreditWSDL_1 = __importDefault(require("./CreditWSDL"));
var CreateSoapClientWithWSDL_1 = __importDefault(require("../../CreateSoapClientWithWSDL"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var MerchantwareCreditClient = /** @class */ (function () {
    function MerchantwareCreditClient(config) {
        this.config = config;
    }
    MerchantwareCreditClient.createInstance = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var client, soapClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new MerchantwareCreditClient(config);
                        return [4 /*yield*/, CreateSoapClientWithWSDL_1.default(CreditWSDL_1.default, "https://ps1.merchantware.net/Merchantware/ws/RetailTransaction/v45/Credit.asmx")];
                    case 1:
                        soapClient = _a.sent();
                        client.soapClient = soapClient;
                        return [2 /*return*/, client];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.processResult = function (result, key, error) {
        if (result && result[0] && !isEmpty_1.default(result[0])) {
            return result[0][key];
        }
        else {
            return new Error(error);
        }
    };
    MerchantwareCreditClient.prototype.withCredentials = function (args) {
        return __assign({ Credentials: {
                MerchantName: this.config.MerchantName,
                MerchantSiteId: this.config.MerchantSiteId,
                MerchantKey: this.config.MerchantKey
            } }, args);
    };
    MerchantwareCreditClient.prototype.AdjustTip = function (Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.AdjustTipAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "AdjustTipResult", "Error adjusting tip")];
                    case 3:
                        _e_1 = _a.sent();
                        return [2 /*return*/, new Error("Error adjusting tip")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.AttachSignature = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ Request: request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.AttachSignatureAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "AttachSignatureResult", "Error Attaching Signature")];
                    case 3:
                        _e_2 = _a.sent();
                        return [2 /*return*/, new Error("Error attaching signature")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.Authorize = function (PaymentData, Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ PaymentData: PaymentData, Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.AuthorizeAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "AuthorizeResult", "Error authorizing")];
                    case 3:
                        _e_3 = _a.sent();
                        return [2 /*return*/, new Error("Error authorizing")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.BoardCard = function (PaymentData) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ PaymentData: PaymentData });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.BoardCardAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "BoardCardResult", "Error boarding card")];
                    case 3:
                        _e_4 = _a.sent();
                        return [2 /*return*/, new Error("Error boarding card")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.Capture = function (Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.CaptureAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "CaptureResult", "Error capturing card")];
                    case 3:
                        _e_5 = _a.sent();
                        return [2 /*return*/, new Error("Error capturing card")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.FindBoardedCard = function (Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.FindBoardedCardAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "FindBoardedCardResult", "Error finding boarded card")];
                    case 3:
                        _e_6 = _a.sent();
                        return [2 /*return*/, new Error("Error finding boarded card")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.UpdateBoardedCard = function (Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.UpdateBoardedCardAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "UpdateBoardedCardResult", "Error updating boarded card")];
                    case 3:
                        _e_7 = _a.sent();
                        return [2 /*return*/, new Error("Error updating boarded card")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.Sale = function (PaymentData, Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, _e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ PaymentData: PaymentData, Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.SaleAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "SaleResult", "Error processing sale")];
                    case 3:
                        _e_8 = _a.sent();
                        return [2 /*return*/, new Error("Error processing sale")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MerchantwareCreditClient.prototype.Void = function (Request) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = this.withCredentials({ Request: Request });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.soapClient.VoidAsync(args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.processResult(result, "VoidResult", "Error processing void")];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, e_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MerchantwareCreditClient;
}());
exports.default = MerchantwareCreditClient;
