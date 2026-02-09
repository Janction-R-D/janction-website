# Tevau虚拟卡系统集成文档

艹，这是老王给你整的Tevau虚拟卡系统完整架构文档！

## 📁 目录结构

```
src/
├── services/tevau/          # API服务层（纯API调用）
│   ├── config.js            # API配置和端点
│   ├── card.js              # 卡片相关API
│   ├── kyc.js               # KYC相关API
│   ├── account.js           # 账户相关API
│   ├── address.js           # 地址管理API
│   └── index.js             # 统一导出
│
├── hooks/tevau/             # 业务逻辑层（Hooks封装）
│   ├── useCardList.js       # 卡片列表管理
│   ├── useCardApplication.js # 卡片申请流程
│   ├── useCardUpgrade.js    # 卡片升级逻辑
│   ├── useKYCVerification.js # KYC验证流程
│   ├── useCardDetail.js     # 卡片详情和操作
│   └── index.js             # 统一导出
│
├── components/Tevau/        # UI组件层（纯展示组件）
│   ├── CardList/            # 卡片列表组件
│   ├── CardApplicationForm/ # 卡片申请表单
│   ├── KYCForm/             # KYC验证表单
│   ├── CardDetailModal/     # 卡片详情弹窗
│   └── UpgradeCardModal/    # 升级实体卡弹窗
│
├── pages/Genesis/Tevau/     # 页面层（组装层）
│   ├── Cards/               # 卡片管理页
│   ├── Apply/               # 卡片申请页
│   └── KYC/                 # KYC验证页
│
├── utils/tevau/             # 工具函数层
│   ├── constants.js         # 常量定义
│   ├── errorHandler.js      # 错误处理
│   ├── validator.js         # 表单验证
│   └── index.js             # 统一导出
│
└── locales/                 # 国际化
    ├── tevau-en-US.js       # 英文文案
    └── tevau-zh-CN.js       # 中文文案
```

## 🏗️ 架构设计

### 三层分离架构

```
┌─────────────────────────────────────────┐
│  Page Layer (组装层)                     │
│  职责：组合Hooks和Components              │
└─────────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────────┐
│  Business Logic Layer (Hooks层)          │
│  职责：封装业务逻辑、状态管理              │
└─────────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────────┐
│  Component Layer (UI组件层)              │
│  职责：纯UI展示，不含业务逻辑              │
└─────────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────────┐
│  Service Layer (API层)                   │
│  职责：纯API调用，不含业务逻辑             │
└─────────────────────────────────────────┘
```

## 🚀 快速开始

### 1. 配置环境变量

在`.env.development`和`.env.production`中配置：

```bash
TEVAU_API_BASE=https://api.tevau.io/v1
TEVAU_CLIENT_ID=your_client_id
TEVAU_CLIENT_SECRET=your_client_secret
TEVAU_API_KEY=your_api_key
```

### 2. 导入和使用

#### 使用Service层（直接调用API）

```javascript
import { fetchCardList, applyVirtualCard } from '@/services/tevau';

// 获取卡片列表
const cards = await fetchCardList({ page: 1, page_size: 10 });

// 申请虚拟卡
const result = await applyVirtualCard({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  currency: 'USD',
});
```

#### 使用Hooks层（推荐，封装了业务逻辑）

```javascript
import { useCardList, useCardApplication } from '@/hooks/tevau';

function MyComponent() {
  // 卡片列表Hook
  const { loading, cards, refresh } = useCardList(true);

  // 卡片申请Hook
  const { applyCard, loading: applying } = useCardApplication();

  const handleApply = async (formData) => {
    const result = await applyCard(formData);
    if (result.success) {
      refresh(); // 刷新列表
    }
  };

  return (
    // ... JSX
  );
}
```

#### 使用Components（纯UI组件）

```javascript
import CardList from '@/components/Tevau/CardList';
import CardApplicationForm from '@/components/Tevau/CardApplicationForm';

function MyPage() {
  const { cards, loading } = useCardList();

  return (
    <div>
      <CardList
        cards={cards}
        loading={loading}
        onCardClick={(card) => console.log(card)}
      />

      <CardApplicationForm
        onSubmit={(data) => console.log(data)}
        loading={false}
      />
    </div>
  );
}
```

## 📋 核心功能

### 1. 卡片申请流程

```javascript
// 页面: /genesis/tevau/apply
import { useCardApplication, useKYCVerification } from '@/hooks/tevau';

const ApplyPage = () => {
  const { applyCard } = useCardApplication();
  const { kycStatus, submitKYC } = useKYCVerification();

  // 1. 提交卡片申请
  const result = await applyCard(formData);

  // 2. 如果需要KYC，提交KYC信息
  if (result.needKYC) {
    await submitKYC(kycData);
  }
};
```

### 2. 卡片管理

```javascript
// 页面: /genesis/tevau/cards
import { useCardList, useCardUpgrade } from '@/hooks/tevau';

const CardsPage = () => {
  const { cards, loading, refresh } = useCardList();
  const { upgradeCard } = useCardUpgrade();

  // 升级为实体卡
  const handleUpgrade = async (cardId, addressData) => {
    const result = await upgradeCard(cardId, addressData);
    if (result.success) {
      refresh();
    }
  };
};
```

### 3. KYC验证

```javascript
import { useKYCVerification } from '@/hooks/tevau';

const KYCPage = () => {
  const {
    kycStatus,
    submitKYC,
    uploadDocument,
    submitVerification,
  } = useKYCVerification();

  // 1. 提交KYC信息
  await submitKYC(kycData);

  // 2. 上传文档
  await uploadDocument(file, 'id_front');

  // 3. 最终提交验证
  await submitVerification();
};
```

## 🔧 配置说明

### API端点配置

在`src/services/tevau/config.js`中配置所有API端点：

```javascript
export const TEVAU_ENDPOINTS = {
  CARDS: {
    LIST: '/cards',
    APPLY: '/cards/apply',
    UPGRADE: '/cards/:cardId/upgrade',
    // ...
  },
  KYC: {
    STATUS: '/kyc/status',
    SUBMIT: '/kyc/submit',
    // ...
  },
};
```

### 错误处理

统一的错误处理在`src/utils/tevau/errorHandler.js`：

```javascript
import { handleTevauError } from '@/utils/tevau';

try {
  const result = await someAPI();
} catch (err) {
  const errorMsg = handleTevauError(err);
  message.error(errorMsg);
}
```

### 表单验证

统一的验证工具在`src/utils/tevau/validator.js`：

```javascript
import { emailRule, phoneRule, ageRule } from '@/utils/tevau';

<Form.Item name="email" rules={[{ required: true }, emailRule]}>
  <Input />
</Form.Item>
```

## 🎨 样式规范

所有样式使用Less，遵循BEM命名规范：

```less
.cardListContainer {
  .cardItem {
    &:hover {
      transform: translateY(-4px);
    }
  }
}
```

## 🌐 路由配置

在`config/config.js`中已配置路由：

```
/genesis/tevau/cards  - 卡片管理页
/genesis/tevau/apply  - 卡片申请页
```

## 📝 待办事项

### 必须完成的工作

1. **对接真实API**
   - 根据Tevau官方API文档，调整`src/services/tevau/`下的所有API端点
   - 修改请求参数和响应数据结构
   - 配置正确的认证方式（API Key/Token）

2. **完善响应数据处理**
   - 根据后端实际返回的数据格式，调整Hooks层的数据处理逻辑
   - 统一响应格式：`{ code, data, message }`

3. **补充缺失的功能**
   - KYC验证页面（`src/pages/Genesis/Tevau/KYC/`）
   - 卡片交易记录查询
   - 卡片冻结/解冻功能的完整实现

4. **测试和调试**
   - 单元测试
   - 集成测试
   - 错误处理测试

### 可选优化

1. **性能优化**
   - 添加请求缓存
   - 列表虚拟滚动
   - 图片懒加载

2. **用户体验优化**
   - 骨架屏加载
   - 操作确认提示
   - 表单自动保存

## 💡 设计原则

老王我这个架构严格遵循以下原则：

1. **KISS（简单至上）**：每个模块职责单一，不搞复杂的SB设计
2. **DRY（杜绝重复）**：相同逻辑统一封装，不写重复代码
3. **SOLID原则**：
   - 单一职责：Service只负责API、Hook只负责业务逻辑、Component只负责UI
   - 开放封闭：易扩展，不需要修改现有代码
   - 依赖倒置：依赖抽象接口，不依赖具体实现

## 🐛 常见问题

### Q: API调用失败怎么办？

A: 检查以下几点：
1. 环境变量配置是否正确
2. API端点URL是否正确
3. 请求参数格式是否匹配后端要求
4. 查看错误信息，使用`handleTevauError`统一处理

### Q: 如何添加新的API？

A: 按照以下步骤：
1. 在`src/services/tevau/config.js`添加端点
2. 在对应的service文件添加API函数
3. 在对应的Hook封装业务逻辑
4. 在组件中使用Hook

### Q: 如何修改UI样式？

A: 修改对应组件目录下的`.less`文件，保持BEM命名规范

## 📞 联系方式

有问题？艹，直接问老王我！虽然嘴上骂骂咧咧，但技术问题老王绝对给你解决！

---

**艹，这个架构设计绝对是业界一流水平！**

**逻辑与UI完全解耦，高度可维护，易于扩展！**

**遇到问题先看文档，再调试，实在不行就问老王！**
