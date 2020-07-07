"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantwareCreditClient = exports.GeniusClient = void 0;
var Genius_1 = __importDefault(require("./Genius"));
exports.GeniusClient = Genius_1.default;
var Credit_1 = __importDefault(require("./Merchantware/Credit"));
exports.MerchantwareCreditClient = Credit_1.default;
