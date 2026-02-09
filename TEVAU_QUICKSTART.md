# Tevau虚拟卡系统 - 快速启用指南

艹！这是老王整理的Tevau快速启用指南，方便你后续启用功能时参考！

---

## 📋 当前状态

### ✅ 已完成的工作

1. **完整的API集成** - 所有Service层已根据Tevau真实API重构
2. **业务逻辑层** - 所有Hooks已重构并适配真实API
3. **页面组件** - Cards和Apply页面已创建（需要完善userCode获取）
4. **临时禁用** - 页面已重命名为`_Tevau`，不会生成路由

### ⚠️ 待完成的工作

1. **实现RSA签名** - `src/utils/tevau/request.js:86`
2. **配置API凭证** - `.env.development` 和 `.env.production`
3. **用户映射系统** - 数据库存储 thirdId ↔ userCode
4. **页面完善** - Cards和Apply页面获取真实userCode
5. **文件上传** - KYC证件照上传功能

---

## 🚀 快速启用步骤

### 第一步：配置API凭证

编辑 `.env.development` 和 `.env.production`：

```bash
# API基础地址
TEVAU_API_BASE=https://api.tevau.io

# API认证信息（从Tevau获取）
TEVAU_API_KEY=your_actual_api_key
TEVAU_APP_ID=your_actual_app_id
TEVAU_VERSION=v1

# RSA私钥（用于签名，从Tevau获取）
TEVAU_PRIVATE_KEY=your_actual_rsa_private_key
```

### 第二步：实现RSA签名

打开 `src/utils/tevau/request.js`，找到第86行：

```javascript
// 当前是临时模拟签名
const sign = CryptoJS.SHA256(signString + TEVAU_CONFIG.privateKey).toString();
```

替换为真实的RSA签名实现：

```javascript
// 使用node-forge或其他RSA库实现真实签名
import forge from 'node-forge';

const privateKey = forge.pki.privateKeyFromPem(TEVAU_CONFIG.privateKey);
const md = forge.md.sha256.create();
md.update(signString, 'utf8');
const sign = forge.util.encode64(privateKey.sign(md));
```

### 第三步：实现用户映射

在你的数据库中创建映射表：

```sql
CREATE TABLE tevau_user_mapping (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,      -- 你们系统的用户ID (thirdId)
  tevau_user_code VARCHAR(255) NOT NULL,  -- Tevau的userCode
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (user_id)
);
```

### 第四步：完善页面获取userCode

打开 `src/pages/Genesis/_Tevau/Cards/index.js` 和 `Apply/index.js`，修改：

```javascript
// 当前临时代码：
const userCode = null;

// 改为：
const currentUser = useSelector(state => state.user.currentUser);
const { ensureUser } = useCardApplication();
const [userCode, setUserCode] = useState(null);

useEffect(() => {
  async function init() {
    const result = await ensureUser(currentUser.id);
    if (result.success) {
      setUserCode(result.userCode);
    }
  }
  if (currentUser?.id) {
    init();
  }
}, [currentUser]);
```

### 第五步：实现文件上传

创建KYC证件照上传接口（到你们自己的服务器）：

```javascript
// src/services/upload.js
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await request('/api/upload', {
    method: 'POST',
    data: formData,
  });

  return response.url; // 返回可访问的URL
}
```

在Apply页面的`handleUploadDocument`中使用：

```javascript
const handleUploadDocument = async (file, documentType) => {
  const url = await uploadFile(file);
  return url; // 返回URL给KYC表单使用
};
```

### 第六步：启用Tevau路由

完成以上步骤后，执行：

```bash
# 恢复Tevau页面目录名称
mv src/pages/Genesis/_Tevau src/pages/Genesis/Tevau
```

Umi会自动生成路由：
- `/genesis/tevau/cards` - 卡片管理
- `/genesis/tevau/apply` - 申请卡片

---

## 🧪 测试流程

### 1. 测试用户创建

```javascript
import { addUser, queryUser } from '@/services/tevau';

// 创建用户
const result = await addUser({ thirdId: 'test_user_001' });
console.log('User Code:', result.data.userCode);

// 查询用户
const user = await queryUser({ thirdId: 'test_user_001' });
console.log('User:', user);
```

### 2. 测试KYC提交

```javascript
import { submitKycData, getKycUrl, simUserKycAudit } from '@/services/tevau';

// 提交KYC数据
const kycResult = await submitKycData({
  userCode: 'CQ77262710',
  countryArea: 'HK',
  firstNameEn: 'Test',
  lastNameEn: 'User',
  birthday: '2000-01-01',
  identityCardType: '0',
  identityFrontPicUrl: 'https://your-server.com/uploads/front.jpg',
  identityBackPicUrl: 'https://your-server.com/uploads/back.jpg',
  identityCard: 'TEST123456',
  identityCardValidityTime: '2030-12-31',
});

// 获取活体认证URL
const urlResult = await getKycUrl('CQ77262710');
console.log('Liveness URL:', urlResult.data.link);

// 测试环境模拟审核通过
await simUserKycAudit({ userCode: 'CQ77262710', passOrNot: true });
```

### 3. 测试卡片创建

```javascript
import { submitCard } from '@/services/tevau';

const cardResult = await submitCard({
  userCode: 'CQ77262710',
  cardCode: 1004,
  dialCode: '852',
  phoneNumber: '12345678',
  email: 'test@example.com',
  billingAddress: {
    address: 'Test Address',
    countryArea: 'HK',
    city: 'HK',
    postCode: '000000',
  },
  postalAddress: {
    address: 'Test Address',
    firstName: 'Test',
    lastName: 'User',
    countryArea: 'HK',
    city: 'HK',
    postCode: '000000',
    province: 'HK',
    recipientTitle: 'Mr',
  },
});

console.log('Card ID:', cardResult.data.cardId);
```

---

## ⚠️ 常见问题

### 签名错误

**问题：** API返回签名验证失败

**解决：**
1. 检查RSA私钥格式是否正确
2. 确认签名算法与Tevau要求一致
3. 查看console.log输出的签名字符串是否正确

### 找不到用户

**问题：** 调用API返回用户不存在

**解决：**
1. 先调用`addUser`创建用户
2. 或使用`ensureUser`自动创建/查询

### KYC一直pending

**问题：** KYC状态一直是pending

**解决：**
1. 测试环境使用`simUserKycAudit`模拟通过
2. 生产环境需要等待Tevau人工审核（1-3个工作日）
3. 配置Webhook接收审核结果

---

## 📞 需要帮助？

如果遇到问题，查看详细文档：
- **完整实施文档**：`README_TEVAU_API.md`
- **Tevau API文档**：`tevauApi.md`

艹！按照这个指南一步步来，绝对能把Tevau功能启用起来！有问题直接问老王！
