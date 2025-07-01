# @rowan/rw-libs

通用工具库，提供日常开发中常用的工具函数、常量定义和类型声明。

## 📦 安装

```bash
# npm
npm install @rowan/rw-libs

# yarn
yarn add @rowan/rw-libs

# pnpm
pnpm add @rowan/rw-libs
```

## 🚀 快速开始

```typescript
import { formatCurrency, validateEmail, formatDate } from '@rowan/rw-libs';

// 格式化货币
const price = formatCurrency(12345.67); // "¥12,345.67"

// 验证邮箱
const isValid = validateEmail('user@example.com'); // true

// 格式化日期
const today = formatDate(new Date(), 'YYYY-MM-DD'); // "2025-07-02"
```

## 📚 功能模块

### 🔧 工具函数 (Utils)

#### 格式化 (Format)

```typescript
import { 
  formatNumber, 
  formatCurrency, 
  formatFileSize, 
  formatPercentage,
  formatPhone,
  truncateText,
  capitalize
} from '@rowan/rw-libs';

// 数字格式化
formatNumber(1234567); // "1,234,567"
formatNumber(1234567, ' '); // "1 234 567"

// 货币格式化
formatCurrency(1234.56); // "¥1,234.56"
formatCurrency(1234.56, '$', 2); // "$1,234.56"

// 文件大小格式化
formatFileSize(1024); // "1.00 KB"
formatFileSize(1048576); // "1.00 MB"

// 百分比格式化
formatPercentage(0.1234); // "12.34%"

// 手机号格式化
formatPhone('13800138000'); // "138 0013 8000"

// 文本截断
truncateText('这是一段很长的文本', 10); // "这是一段很长的..."

// 首字母大写
capitalize('hello world'); // "Hello world"
```

#### 验证 (Validation)

```typescript
import { 
  validateEmail,
  validateChinesePhone,
  validateIdCard,
  validatePasswordStrength,
  validateField,
  validateForm,
  ValidationRules
} from '@rowan/rw-libs';

// 基础验证
validateEmail('user@example.com'); // true
validateChinesePhone('13800138000'); // true
validateIdCard('110101199003077777'); // true

// 密码强度验证
const pwdResult = validatePasswordStrength('MyP@ssw0rd123');
console.log(pwdResult);
// {
//   isValid: true,
//   strength: 'strong',
//   suggestions: []
// }

// 字段验证
const fieldResult = validateField('test@email.com', {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
});

// 表单批量验证
const formData = {
  email: 'user@example.com',
  username: 'testuser',
  password: 'StrongP@ss123'
};

const formRules = {
  email: ValidationRules.email,
  username: ValidationRules.username,
  password: ValidationRules.password
};

const formResult = validateForm(formData, formRules);
```

#### 日期处理 (Date)

```typescript
import { formatDate, getRelativeTime } from '@rowan/rw-libs';

// 日期格式化
formatDate(new Date(), 'YYYY-MM-DD'); // "2025-07-02"
formatDate(new Date(), 'YYYY年MM月DD日'); // "2025年07月02日"

// 相对时间
const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
getRelativeTime(lastWeek); // "7天前"
```

### 📋 常量 (Constants)

```typescript
import { Constants } from '@rowan/rw-libs';

// 使用预定义常量
console.log(Constants.API_BASE_URL);
console.log(Constants.DEFAULT_PAGE_SIZE);
```

### 🏷️ 类型定义 (Types)

```typescript
import { Types } from '@rowan/rw-libs';

// 使用通用类型
const apiResponse: Types.ApiResponse<User[]> = {
  success: true,
  data: users,
  message: '获取成功'
};
```

## 🎯 按需导入

你可以按需导入特定的功能模块：

```typescript
// 只导入格式化功能
import { formatCurrency, formatFileSize } from '@rowan/rw-libs/utils/format';

// 只导入验证功能
import { validateEmail, validateForm } from '@rowan/rw-libs/utils/validation';

// 导入预设验证规则
import { ValidationRules } from '@rowan/rw-libs/utils/validation';
```

## 🔍 API 参考

### 格式化函数


| 函数名                                         | 参数                       | 返回值   | 描述                         |
| ---------------------------------------------- | -------------------------- | -------- | ---------------------------- |
| `formatNumber(num, separator?)`                | `number, string?`          | `string` | 格式化数字，添加千分位分隔符 |
| `formatCurrency(amount, currency?, decimals?)` | `number, string?, number?` | `string` | 格式化货币                   |
| `formatFileSize(bytes, decimals?)`             | `number, number?`          | `string` | 格式化文件大小               |
| `formatPercentage(value, decimals?)`           | `number, number?`          | `string` | 格式化百分比                 |
| `formatPhone(phone, separator?)`               | `string, string?`          | `string` | 格式化手机号                 |
| `truncateText(text, maxLength, suffix?)`       | `string, number, string?`  | `string` | 截断文本                     |

### 验证函数


| 函数名                                           | 参数                  | 返回值                   | 描述           |
| ------------------------------------------------ | --------------------- | ------------------------ | -------------- |
| `validateEmail(email)`                           | `string`              | `boolean`                | 验证邮箱格式   |
| `validateChinesePhone(phone)`                    | `string`              | `boolean`                | 验证中国手机号 |
| `validateIdCard(idCard)`                         | `string`              | `boolean`                | 验证身份证号   |
| `validatePasswordStrength(password, minLength?)` | `string, number?`     | `PasswordStrengthResult` | 验证密码强度   |
| `validateField(value, rules)`                    | `any, ValidationRule` | `ValidationResult`       | 通用字段验证   |
| `validateForm(data, rules)`                      | `object, object`      | `FormValidationResult`   | 表单批量验证   |

### 预设验证规则

```typescript
const ValidationRules = {
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, pattern: /^1[3-9]\d{9}$/ },
  password: { required: true, minLength: 8, custom: passwordValidator },
  username: { required: true, minLength: 3, maxLength: 20, pattern: /^[a-zA-Z0-9_]+$/ },
  chineseName: { required: true, pattern: /^[\u4e00-\u9fa5]{2,4}$/ },
  idCard: { required: true, pattern: /^[1-9]\d{5}(18|19|20)\d{2}.../ },
  bankCard: { required: true, custom: bankCardValidator },
  url: { required: true, custom: urlValidator }
};
```

## 🛠️ 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm type-check

# 清理构建文件
pnpm clean
```

## 📄 License

ISC License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 更新日志

### v1.0.0

* ✨ 初始版本发布
* 🔧 提供基础的格式化工具函数
* ✅ 提供完整的表单验证解决方案
* 📅 提供日期处理工具函数
* 🏷️ 提供 TypeScript 类型定义
