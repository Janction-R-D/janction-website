

📘 Tevau API 完整接口说明（Markdown）

⸻

📌 前置：调用规范

🔐 请求基础
	•	协议：HTTPS
	•	请求方式：所有接口均为 POST
	•	Content-Type：application/json

🧾 通用 HTTP Header

Header	必需	说明
x-nexus-api-key	✅	API Key，用于鉴权
versions	✅	API 版本，如 v1
appId	✅	应用 ID
timestamp	✅	时间戳
nonce	✅	随机字符串
sign	✅	签名参数（见下）

🔏 签名规则

签名字符串为除 sign, x-nexus-api-key, versions 外的所有非空参数按 ASCII 排序拼接成 key=value&...，再用 RSA 私钥签名。
具体规则参考官方签名说明文档。 ￼

⸻

🧱 01. 客户管理（User）

⸻

🟢 1.1 创建客户

POST /openapi/user/addUser
通过第三方系统唯一标识创建 Tevau 客户。

请求 Body

参数	类型	必需	说明
thirdId	string	✅	第三方用户唯一标识

示例：

{
  "thirdId": "user9001"
}

响应

{
  "code": 0,
  "msg": "SUCCESS",
  "data": {
    "userCode": "CQ77262710",
    "thirdId": "user900122"
  },
  "ok": true
}


⸻

🟢 1.2 查询客户

POST /openapi/user/queryUser

请求 Body

参数	类型	必需	说明
thirdId	string	✅	第三方用户唯一标识

示例：

{
  "thirdId": "user9001"
}


⸻

🧾 02. KYC 身份验证

⸻

🟡 2.1 V1 提交客户 KYC

POST /openapi/kyc/submitKycData

{
  "userCode": "CB14837342",
  "countryArea": "HK",
  "firstNameEn": "jack",
  "lastNameEn": "cheng",
  "birthday": "2001-09-27",
  "identityCardType": "0",
  "identityFrontPicUrl": "https://xxx.jpg",
  "identityBackPicUrl": "https://xxx.jpg",
  "identityCard": "009527",
  "identityCardValidityTime": "1982-07-31"
}


⸻

🟡 2.2 获取活体认证 URL

POST /openapi/kyc/getKycUrl

请求：

{
  "userCode": "CB14837342"
}

返回包含跳转链接：

{
  "code": 0,
  "msg": "SUCCESS",
  "data": {
    "link": "https://xxx",
    "accountId": "xxx",
    "transactionId": "xxx"
  },
  "ok": true
}


⸻

🟡 2.5 Sandbox 模拟 KYC 审核（测试）

POST /openapi/kyc/simUserKycAudit

请求示例：

{
  "passOrNot": true,
  "userCode": "CB31586447"
}


⸻

💳 03. 卡片管理

⸻

🔹 3.1 创建卡

POST /openapi/card/submitCard

请求示例（Body）

{
  "userCode": "CB14837342",
  "cardCode": 1004,
  "dialCode": "852",
  "phoneNumber": "12345678",
  "email": "123456@gmail.com",
  "billingAddress": { "address":"...", "countryArea":"HK","city":"HK","postCode":"123456" },
  "postalAddress": { "address":"...", "firstName":"Jack","lastName":"Wang","countryArea":"HK","city":"HK","postCode":"123456","province":"province","recipientTitle":"recipientTitle" }
}

响应示例：

{
  "code": 0,
  "msg": "SUCCESS",
  "data": {
    "cardId": "CIDP012954903239",
    "orderNo": "CA2505231726137808965"
  },
  "ok": true
}

￼

⸻

🔹 3.2 查询客户的卡列表

POST /openapi/card/getCardListByUserCode

（参数多字段，例如 userCode, status 等，官方按文档字段传入）

⸻

🔹 3.3 调整卡余额

POST /openapi/card/adjustCardBalance

（调整账户余额，输入 cardId 与调整金额等内容）

⸻

🔹 3.4 查询卡详情

POST /openapi/query/card/getCardDetail

请求：

{ "cardId": "string" }

响应：

{
  "code": 0,
  "msg": "SUCCESS",
  "data": {
    "cardId": "...",
    "cardCode": "...",
    "cardNumber": "...",
    "cardBalance": 1.11,
    "cardStatus": 2,
    "phoneNumber": "12345678"
    ...
  },
  "ok": true
}

￼

⸻

🔹 3.5 绑定实体卡

POST /openapi/card/bindCard

⸻

🔹 3.6 注销卡

POST /openapi/card/cancelCard

⸻

🔹 3.7 冻结卡

POST /openapi/card/freezeCard

⸻

🔹 3.8 解冻卡

POST /openapi/card/unfreezeCard

⸻

🔹 3.9 激活实体卡

POST /openapi/card/activeCard

请求：

{ "cardId": "string", "activeCode": "string" }

￼

⸻

🔹 3.10 查询卡 PAN-HTML

POST /openapi/card/getCardPanHtml

⸻

🔹 3.11 查询 PIN 码

POST /openapi/card/getPinCode

⸻

🔹 3.12 查询卡限额

POST /openapi/card/getCardLimit

⸻

🔹 3.13 调整卡费用

POST /openapi/card/updateCardFee

{
  "cardId": "CIDV015982776547",
  "cardFeeConfigList": [
    { "chargeItem": 1, "fixedAmount": "1", "percentage": "1.2" }
  ]
}

￼

⸻

🔹 3.14 查询卡费用

POST /openapi/card/getCardFee

⸻

🔹 3.15 卡交易 3DS 授权确认/取消

POST /openapi/card/confirm3DS

⸻

🔹 3.16 更新卡手机号

POST /openapi/card/updateCardPhoneNumber

⸻

🔹 3.17 更新卡邮箱

POST /openapi/card/updateCardEmail

⸻

🔹 3.18 修改卡 PIN

POST /openapi/card/updateCardPin

⸻

🚚 04. 物流信息查询

🔹 4.1 查询物流信息

POST /openapi/logistics/getLogisticsInfo
	•	输入运单号等
	•	返回物流状态与路径数据

⸻

💰 05. 预付款账户

⸻

📌 5.1 查询预付款账户余额

POST /openapi/query/getAccountBalance

⸻

📌 5.2 查询预付款账户交易列表

POST /openapi/query/getAccountDetailPage

请求 Body 示例：

{
  "tenantAccountingType": "",
  "tradeSn": "",
  "limit": 10,
  "page": 1
}

￼

⸻

💳 06. 交易记录

⸻

📍 6.1 查询交易记录

POST /openapi/query/getBillPage

请求示例：

{
  "cardId": "1",
  "limit": 10,
  "page": 1,
  "createTimeStart": "",
  "createTimeEnd": ""
}

返回响应结构含 total, list[], pages 等字段。 ￼

⸻

📍 6.2 查询单笔交易详情

POST /openapi/query/getBillDetail
	•	输入 orderId, cardId
	•	返回该笔交易完整详情

⸻

🧪 07. 模拟交易接口（测试环境）

⸻

📌 7.1 模拟授权（Authorisation）

POST /openapi/trade/authorisation

{
  "cardID": "CIDV...",
  "billAmount": "30",
  "transactionAmount": "59",
  "transactionCurrency": "CNY"
}

￼

⸻

📌 7.2 模拟结算（Clearing）

POST /openapi/trade/clearing

⸻

📌 7.3 模拟退款（Refund）

POST /openapi/trade/refund

⸻

📌 7.4 模拟退单（Reversal）

POST /openapi/trade/reversal

{
  "transactionID": "string",
  "transactionAmount": "string",
  "billAmount": "string"
}

￼

⸻

📌 7.5 模拟 3DS 验证

POST /openapi/trade/3dsSimulate

⸻

📌 7.6 模拟卡片状态

POST /openapi/trade/auth/cardStatus

{
  "cardID":"string",
  "cardStatus":"string"
}

￼

⸻

🔔 08. Webhook 回调通知

⸻

🟡 8.1 KYC 审核通知

Webhook 推送客户 KYC 审核结果数据。

⸻

🟡 8.2 卡片结果通知

Webhook 示例：

{
  "eventType": "CardClose",
  "cardId": "CIDV012566246286",
  "orderNo": "CA2507250308114804",
  "totalAmount": "1"
}

￼

⸻

🟡 8.3 调整卡余额通知
	•	当卡片余额由系统调整时推送事件

⸻

🟡 8.4 授权 3DS 通知

⸻

🟡 8.5 交易通知
	•	支付授权、清算等结果推送

⸻

🟡 8.6 物流状态变化通知

⸻

📝 09. 错误码与响应说明

所有接口返回统一 JSON：

{
  "code": number,
  "msg": "string",
  "data": {...},
  "ok": boolean
}

	•	code == 0 && ok == true: 调用成功
	•	非 0 或 ok false：业务失败

⸻

📘 附录：签名示例（Java 伪码）

String str="appId=...&nonce=...&timestamp=...&param1=...";
String sign=RSA.sign(str, privateKey);

￼

⸻

如果你需要，我也可以把接口快速 curl / JavaScript / Python 示例代码整合到这个文档对应每个接口一起。要不要带上？（直接回复 “带示例代码”）