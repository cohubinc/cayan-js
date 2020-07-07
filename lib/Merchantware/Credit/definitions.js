"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxIndicator = exports.CardType = exports.ReaderEntryMode = void 0;
var ReaderEntryMode;
(function (ReaderEntryMode) {
    ReaderEntryMode["Unknown"] = "0";
    ReaderEntryMode["Keyed"] = "1";
    ReaderEntryMode["Magneticstripe"] = "2";
    ReaderEntryMode["Capture"] = "3";
    ReaderEntryMode["Proximity"] = "4";
    ReaderEntryMode["LevelUpScanner"] = "5";
    ReaderEntryMode["ICC"] = "6";
    ReaderEntryMode["ContactlessMobileCommerce"] = "7";
})(ReaderEntryMode = exports.ReaderEntryMode || (exports.ReaderEntryMode = {}));
var CardType;
(function (CardType) {
    CardType["Unknown"] = "0";
    CardType["American Express"] = "1";
    CardType["Discover"] = "2";
    CardType["Mastercard"] = "3";
    CardType["Visa"] = "4";
    CardType["Debit"] = "5";
    CardType["EBT"] = "6";
    CardType["Giftcard"] = "7";
    CardType["Wright Express (Fleet Card)"] = "8";
    CardType["Voyager (Fleet Card / USBank Issued)"] = "9";
    CardType["JCB"] = "10";
    CardType["China Union Pay"] = "11";
    CardType["LevelUp"] = "12";
})(CardType = exports.CardType || (exports.CardType = {}));
var DebitOrCreditIndicator;
(function (DebitOrCreditIndicator) {
    DebitOrCreditIndicator["Credit"] = "Credit";
    DebitOrCreditIndicator["Debit"] = "Debit";
})(DebitOrCreditIndicator || (DebitOrCreditIndicator = {}));
var NetOrGrossIndicator;
(function (NetOrGrossIndicator) {
    NetOrGrossIndicator["Net"] = "Net";
    NetOrGrossIndicator["Gross"] = "Gross";
})(NetOrGrossIndicator || (NetOrGrossIndicator = {}));
var TaxIndicator;
(function (TaxIndicator) {
    TaxIndicator["NotProvided"] = "NotProvided";
    TaxIndicator["Provided"] = "Provided";
    TaxIndicator["Exempt"] = "Exempt";
})(TaxIndicator = exports.TaxIndicator || (exports.TaxIndicator = {}));
