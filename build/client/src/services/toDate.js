"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = void 0;
const toDate = (timestamp) => {
    const isoTimestamp = timestamp;
    const date = new Date(isoTimestamp);
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
};
exports.toDate = toDate;
