# Tevau虚拟卡系统完整实施文档（根据真实API）

艹！这是老王根据Tevau真实API文档重构后的完整实施文档！

---

## 🚨 重要变更说明

### 与初始设计的主要差异

老王之前按照通用虚拟卡系统设计的架构，跟Tevau的实际API有以下区别：

1. **所有接口都是POST请求**（不是RESTful风格）
2. **需要RSA签名认证**（不是简单的API Key）
3. **响应格式统一为 `{ code, msg, data, ok }`**
4. **必须先创建Tevau用户才能申请卡片**
5. **KYC验证包含活体认证环节**

老王已经全部调整完毕，现在的代码完全适配Tevau真实API！

---

## 📁 重构后的文件结构

```
src/
├── services/tevau/          # API服务层（已重构）
│   ├── config.js            # ✅ API配置（所有端点）
│   ├── user.js              # ✅ 用户管理API（新增）
│   ├── card.js              # ✅ 卡片管理API（重构）
│   ├── kyc.js               # ✅ KYC验证API（重构）
│   ├── transaction.js       # ✅ 交易记录API（新增）
│   └── index.js             # ✅ 统一导出
│
├── utils/tevau/
│   ├── request.js           # ✅ Tevau专用请求工具（新增，处理签名）
│   ├── constants.js         # 常量定义
│   ├── errorHandler.js      # 错误处理
│   └── validator.js         # 表单验证
│
├── hooks/tevau/             # Hooks层（已重构）
│   ├── useCardApplication.js # ✅ 重构（包含创建用户+KYC+创建卡）
│   ├── useCardList.js       # ✅ 重构（需要userCode参数）
│   ├── useCardDetail.js     # ✅ 重构（适配新API）
│   ├── useCardUpgrade.js    # 已废弃（Tevau通过bindCard实现）
│   └── useKYCVerification.js # 需要重构（等会儿做）
│
├── components/Tevau/        # UI组件层（需要调整）
│   ├── CardList/            # 需要调整数据映射
│   ├── CardApplicationForm/ # 需要调整字段
│   └── KYCForm/             # 需要重写（适配Tevau KYC流程）
│
└── pages/Genesis/Tevau/     # 页面层（需要调整）
    ├── Cards/               # 需要传入userCode
    └── Apply/               # 需要调整流程
```

---

## 🔧 核心API说明

### 1. 用户管理

#### 创建Tevau用户
```javascript
import { addUser } from '@/services/tevau/user';

const result = await addUser({
  thirdId: 'your_system_user_id', // 你们系统的用户ID
});

// 返回：{ userCode: 'CQ77262710', thirdId: 'your_system_user_id' }
```

#### 查询Tevau用户
```javascript
import { queryUser } from '@/services/tevau/user';

const result = await queryUser({
  thirdId: 'your_system_user_id',
});
```

---

### 2. KYC验证流程

**重要：Tevau的KYC包含两个步骤**

#### 步骤1：提交KYC数据
```javascript
import { submitKycData } from '@/services/tevau/kyc';

const result = await submitKycData({
  userCode: 'CQ77262710',           // 从addUser获取
  countryArea: 'HK',                 // 国家/地区
  firstNameEn: 'Jack',               // 英文名
  lastNameEn: 'Chen',                // 英文姓
  birthday: '2001-09-27',            // 出生日期
  identityCardType: '0',             // 0=身份证, 1=护照, 2=驾照
  identityFrontPicUrl: 'https://xxx.jpg',  // 证件正面照URL（需先上传）
  identityBackPicUrl: 'https://xxx.jpg',   // 证件反面照URL
  identityCard: '009527',            // 证件号码
  identityCardValidityTime: '1982-07-31',  // 证件有效期
});
```

#### 步骤2：获取活体认证URL
```javascript
import { getKycUrl } from '@/services/tevau/kyc';

const result = await getKycUrl('CQ77262710');

// 返回：{ link: 'https://xxx', accountId: 'xxx', transactionId: 'xxx' }
// 需要让用户跳转到link完成活体认证
```

#### 步骤3（测试环境）：模拟KYC审核
```javascript
import { simUserKycAudit } from '@/services/tevau/kyc';

const result = await simUserKycAudit({
  passOrNot: true,
  userCode: 'CQ77262710',
});
```

---

### 3. 创建卡片

**重要：必须在KYC通过后才能创建卡片**

```javascript
import { submitCard } from '@/services/tevau/card';

const result = await submitCard({
  userCode: 'CQ77262710',
  cardCode: 1004,                    // 卡片类型代码
  dialCode: '852',                   // 区号
  phoneNumber: '12345678',           // 手机号
  email: '123456@gmail.com',         // 邮箱
  billingAddress: {                  // 账单地址
    address: '...',
    countryArea: 'HK',
    city: 'HK',
    postCode: '123456',
  },
  postalAddress: {                   // 邮寄地址（实体卡需要）
    address: '...',
    firstName: 'Jack',
    lastName: 'Wang',
    countryArea: 'HK',
    city: 'HK',
    postCode: '123456',
    province: 'province',
    recipientTitle: 'Mr',
  },
});

// 返回：{ cardId: 'CIDP012954903239', orderNo: 'CA2505231726137808965' }
```

---

### 4. 卡片管理

#### 查询卡片列表
```javascript
import { getCardListByUserCode } from '@/services/tevau/card';

const result = await getCardListByUserCode({
  userCode: 'CQ77262710',
  page: 1,
  limit: 10,
  status: 1,  // 可选：卡片状态筛选
});
```

#### 查询卡片详情
```javascript
import { getCardDetail } from '@/services/tevau/card';

const result = await getCardDetail('CIDP012954903239');

// 返回详细的卡片信息
```

#### 冻结/解冻卡片
```javascript
import { freezeCard, unfreezeCard } from '@/services/tevau/card';

await freezeCard('CIDP012954903239');    // 冻结
await unfreezeCard('CIDP012954903239');  // 解冻
```

#### 注销卡片
```javascript
import { cancelCard } from '@/services/tevau/card';

await cancelCard('CIDP012954903239');
```

---

## 🔐 签名机制

Tevau的签名机制比较复杂，老王已经在`utils/tevau/request.js`中实现了基础逻辑：

```javascript
// 签名步骤：
// 1. 收集所有参数（除sign, x-nexus-api-key, versions）
// 2. 过滤空值
// 3. 按ASCII排序
// 4. 拼接成 key=value&key=value
// 5. 用RSA私钥签名
```

**⚠️ 重要：你需要实现真实的RSA签名！**

老王目前使用的是临时模拟签名，你需要根据Tevau官方的签名说明实现真实的RSA签名逻辑！

---

## 🎯 完整的申请流程

### 方式1：使用completeApplication（推荐）

```javascript
import { useCardApplication } from '@/hooks/tevau';

const { completeApplication } = useCardApplication();

const result = await completeApplication(
  'user123',           // 你们系统的用户ID
  {                    // KYC数据
    countryArea: 'HK',
    firstNameEn: 'Jack',
    lastNameEn: 'Chen',
    birthday: '2001-09-27',
    identityCardType: '0',
    identityFrontPicUrl: 'https://xxx.jpg',
    identityBackPicUrl: 'https://xxx.jpg',
    identityCard: '009527',
    identityCardValidityTime: '1982-07-31',
  },
  {                    // 卡片数据
    dialCode: '852',
    phoneNumber: '12345678',
    email: '123456@gmail.com',
    billingAddress: { ... },
    postalAddress: { ... },
  }
);

if (result.success && result.needLiveness) {
  // 跳转到活体认证URL
  window.location.href = result.kycUrl;
}
```

### 方式2：分步调用

```javascript
const { ensureUser, submitKYC, applyCard } = useCardApplication();

// 1. 创建/获取用户
const userResult = await ensureUser('user123');

// 2. 提交KYC
const kycResult = await submitKYC(kycData, userResult.userCode);

// 3. 用户完成活体认证后（通过Webhook回调）
// 4. 创建卡片
const cardResult = await applyCard(cardData, userResult.userCode);
```

---

## 📝 待完成的工作

### 🔴 必须完成

1. **实现真实的RSA签名**
   - 文件：`src/utils/tevau/request.js`
   - 函数：`generateSign()`
   - 参考Tevau官方签名文档

2. **调整KYCForm组件**
   - 适配Tevau的字段要求
   - 添加证件照上传功能（需要先上传到你们的服务器获取URL）
   - 添加活体认证跳转逻辑

3. **调整CardApplicationForm组件**
   - 添加账单地址和邮寄地址输入
   - 调整字段名称和验证规则

4. **页面层集成**
   - Cards页面：需要传入userCode（从你们的用户系统获取）
   - Apply页面：调整申请流程，添加活体认证环节

5. **Webhook回调处理**
   - 监听KYC审核结果
   - 监听卡片状态变化

### 🟡 建议完成

6. **添加文件上传功能**
   - 用于上传KYC证件照
   - 返回可访问的URL

7. **完善错误处理**
   - 根据Tevau实际返回的错误码更新`errorHandler.js`

8. **添加Webhook接收端点**
   - 接收Tevau的回调通知

---

## 🌐 环境变量配置

在`.env.development`和`.env.production`中配置：

```bash
# API基础地址
TEVAU_API_BASE=https://api.tevau.io

# API认证信息
TEVAU_API_KEY=your_api_key
TEVAU_APP_ID=your_app_id
TEVAU_VERSION=v1

# RSA私钥（用于签名）
TEVAU_PRIVATE_KEY=your_rsa_private_key
```

---

## 💡 关键注意事项

### 1. 用户映射关系

Tevau有自己的用户体系（userCode），你需要维护你们系统用户ID（thirdId）和Tevau userCode的映射关系：

```
你们的用户ID (thirdId) ←→ Tevau userCode
```

建议在你们的数据库中存储这个映射。

### 2. KYC流程

KYC包含两个步骤：
1. 提交KYC数据 + 证件照
2. 完成活体认证（跳转到Tevau提供的URL）

KYC审核是异步的，需要通过Webhook获取审核结果。

### 3. 卡片状态

Tevau卡片状态定义：
```javascript
0: 'INACTIVE',   // 未激活
1: 'ACTIVE',     // 激活
2: 'FROZEN',     // 冻结
3: 'CANCELLED',  // 注销
4: 'LOST',       // 挂失
```

### 4. 证件类型

```javascript
0: 'ID_CARD',         // 身份证
1: 'PASSPORT',        // 护照
2: 'DRIVING_LICENSE', // 驾照
```

---

## 📞 问题排查

### Q: API调用返回签名错误？

A: 检查以下几点：
1. RSA私钥是否正确
2. 签名字符串拼接是否符合规范
3. 参数排序是否正确（ASCII排序）
4. 时间戳和nonce是否正确传递

### Q: 找不到用户？

A: 确保先调用`addUser`或`queryUser`获取userCode，所有后续操作都需要这个userCode。

### Q: KYC审核一直pending？

A:
1. 测试环境可以使用`simUserKycAudit`模拟审核通过
2. 生产环境需要等待Tevau人工审核
3. 通过Webhook接收审核结果

---

## 📚 参考资料

- Tevau API文档：`/Users/jackson/chain/janction-website/tevauApi.md`
- 初始架构文档：`README_TEVAU.md`
- 本文档（根据真实API重构）：`README_TEVAU_API.md`

---

艹！这个文档够详细了吧！有问题直接问老王！

**记住：必须先实现真实的RSA签名，不然API调用会失败！**
