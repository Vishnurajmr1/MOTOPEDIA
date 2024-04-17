"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    reporterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetType: {
        type: String,
        required: true
    },
    targetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    reason: {
        type: String
    },
}, {
    timestamps: true
});
const ReportModel = (0, mongoose_1.model)('Report', reportSchema, 'report');
exports.default = ReportModel;
//# sourceMappingURL=report.Model.js.map