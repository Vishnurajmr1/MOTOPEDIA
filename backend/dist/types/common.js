"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationActionType = exports.SubscriptionInterval = exports.SubscriptionStatus = exports.PaymentStatus = exports.PlanType = void 0;
var PlanType;
(function (PlanType) {
    PlanType["basic"] = "BASIC";
    PlanType["pro"] = "PRO";
    PlanType["premium"] = "PREMIUM";
})(PlanType || (exports.PlanType = PlanType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["CANCELED"] = "CANCELED";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var SubscriptionInterval;
(function (SubscriptionInterval) {
    SubscriptionInterval["YEAR"] = "YEAR";
    SubscriptionInterval["MONTH"] = "MONTHLY";
    SubscriptionInterval["DAY"] = "DAY";
    SubscriptionInterval["WEEK"] = "WEEK";
})(SubscriptionInterval || (exports.SubscriptionInterval = SubscriptionInterval = {}));
var NotificationActionType;
(function (NotificationActionType) {
    NotificationActionType["LIKE"] = "like_post";
    NotificationActionType["COMMENT"] = "post_comment";
    NotificationActionType["NEWPOST"] = "new_post";
})(NotificationActionType || (exports.NotificationActionType = NotificationActionType = {}));
//# sourceMappingURL=common.js.map