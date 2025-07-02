# @rowan/rw-ui

现代化的 React UI 组件库，基于 TypeScript 构建，集成 `@rowan/rw-libs` 工具库和 `@rowan/rw-hooks` Hook 库。

## 🌟 特性

* 🎨 **现代设计** - 简洁美观的设计语言
* 📱 **响应式** - 完美适配移动端和桌面端
* 🔧 **TypeScript** - 完整的类型定义支持
* 🎯 **开箱即用** - 丰富的组件和预设样式
* 🔗 **深度集成** - 与 rw-libs 和 rw-hooks 无缝集成
* 🎪 **高度可定制** - 灵活的主题和样式定制
* 📦 **按需导入** - 支持 tree-shaking，减小包体积

## 📦 安装

```bash
# npm
npm install @rowan/rw-ui @rowan/rw-libs @rowan/rw-hooks

# yarn
yarn add @rowan/rw-ui @rowan/rw-libs @rowan/rw-hooks

# pnpm
pnpm add @rowan/rw-ui @rowan/rw-libs @rowan/rw-hooks
```

## 🚀 快速开始

```typescript
import React from 'react';
import { Button, Input, Form, Modal } from '@rowan/rw-ui';
import { ValidationRules } from '@rowan/rw-libs';
import '@rowan/rw-ui/styles'; // 引入样式

function App() {
  return (
    <div>
      <Button variant="primary" size="large">
        Hello rw-ui!
      </Button>
    
      <Input 
        label="邮箱" 
        placeholder="请输入邮箱" 
        required 
      />
    </div>
  );
}
```

## 📚 组件文档

### 🔘 Button 按钮

支持多种样式变体和状态的按钮组件。

```typescript
import { Button } from '@rowan/rw-ui';

// 基础用法
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="danger">危险按钮</Button>
<Button variant="ghost">幽灵按钮</Button>

// 不同尺寸
<Button size="small">小按钮</Button>
<Button size="medium">中等按钮</Button>
<Button size="large">大按钮</Button>

// 状态
<Button loading>加载中</Button>
<Button disabled>禁用状态</Button>

// 带图标
<Button icon={<UserIcon />}>带图标</Button>
```

#### Button Props


| 属性     | 类型                                           | 默认值      | 描述     |
| -------- | ---------------------------------------------- | ----------- | -------- |
| variant  | `'primary' | 'secondary' | 'danger' | 'ghost'` | `'primary'` | 按钮类型 |
| size     | `'small' | 'medium' | 'large'`                 | `'medium'`  | 按钮尺寸 |
| loading  | `boolean`                                      | `false`     | 加载状态 |
| icon     | `React.ReactNode`                              | -           | 图标     |
| disabled | `boolean`                                      | `false`     | 禁用状态 |

### 📝 Input 输入框

功能丰富的输入框组件，支持验证、图标、清除等功能。

```typescript
import { Input } from '@rowan/rw-ui';

// 基础用法
<Input label="用户名" placeholder="请输入用户名" />

// 带验证
<Input 
  label="邮箱"
  type="email"
  error="邮箱格式不正确"
  required
/>

// 带图标和清除功能
<Input
  label="搜索"
  prefix={<SearchIcon />}
  suffix={<InfoIcon />}
  clearable
  onClear={() => console.log('清除')}
/>

// 不同尺寸
<Input size="small" placeholder="小尺寸" />
<Input size="medium" placeholder="中等尺寸" />
<Input size="large" placeholder="大尺寸" />
```

#### Input Props


| 属性       | 类型                           | 默认值     | 描述             |
| ---------- | ------------------------------ | ---------- | ---------------- |
| label      | `string`                       | -          | 输入框标签       |
| size       | `'small' | 'medium' | 'large'` | `'medium'` | 输入框尺寸       |
| error      | `string | string[]`            | -          | 错误信息         |
| helperText | `string`                       | -          | 帮助文本         |
| required   | `boolean`                      | `false`    | 是否必填         |
| prefix     | `React.ReactNode`              | -          | 前缀图标         |
| suffix     | `React.ReactNode`              | -          | 后缀图标         |
| clearable  | `boolean`                      | `false`    | 是否显示清除按钮 |
| onClear    | `() => void`                   | -          | 清除回调         |

### 📋 Form 表单

集成验证功能的高级表单组件，基于 `@rowan/rw-hooks` 的 `useForm`。

```typescript
import { Form, Input, Button } from '@rowan/rw-ui';
import { ValidationRules } from '@rowan/rw-libs';

interface FormData {
  email: string;
  password: string;
}

<Form<FormData>
  initialValues={{ email: '', password: '' }}
  validationRules={{
    email: ValidationRules.email,
    password: ValidationRules.password
  }}
  onSubmit={async (values) => {
    console.log('提交数据:', values);
  }}
>
  {(form) => (
    <>
      <Input
        label="邮箱"
        value={form.values.email}
        onChange={(e) => form.setValue('email', e.target.value)}
        error={form.errors.email}
      />
    
      <Input
        label="密码"
        type="password"
        value={form.values.password}
        onChange={(e) => form.setValue('password', e.target.value)}
        error={form.errors.password}
      />
    
      <Button onClick={form.handleSubmit} loading={form.isSubmitting}>
        提交
      </Button>
    </>
  )}
</Form>
```

### 🪟 Modal 模态框

灵活的模态框组件，支持多种配置和样式。

```typescript
import { Modal, Button } from '@rowan/rw-ui';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="确认操作"
  width={400}
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        取消
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        确认
      </Button>
    </>
  }
>
  <p>你确定要执行此操作吗？</p>
</Modal>
```

#### Modal Props


| 属性         | 类型              | 默认值 | 描述             |
| ------------ | ----------------- | ------ | ---------------- |
| open         | `boolean`         | -      | 是否显示         |
| onClose      | `() => void`      | -      | 关闭回调         |
| title        | `React.ReactNode` | -      | 标题             |
| width        | `number | string` | `520`  | 宽度             |
| footer       | `React.ReactNode` | -      | 底部内容         |
| closable     | `boolean`         | `true` | 是否显示关闭按钮 |
| maskClosable | `boolean`         | `true` | 点击遮罩是否关闭 |
| centered     | `boolean`         | `true` | 是否居中显示     |

### ⏳ Loading 加载

多种样式的加载指示器，支持包装模式。

```typescript
import { Loading } from '@rowan/rw-ui';

// 独立使用
<Loading size="medium" type="spinner" tip="加载中..." />

// 不同类型
<Loading type="spinner" />  {/* 旋转器 */}
<Loading type="dots" />     {/* 点状 */}
<Loading type="pulse" />    {/* 脉冲 */}

// 包装模式
<Loading loading={isLoading} tip="数据加载中...">
  <div>要包装的内容</div>
</Loading>
```

## 🎨 样式定制

### CSS 变量

你可以通过 CSS 变量来定制主题：

```css
:root {
  --rw-primary-color: #1890ff;
  --rw-danger-color: #f5222d;
  --rw-success-color: #52c41a;
  --rw-warning-color: #faad14;
  --rw-border-radius: 6px;
  --rw-font-size-sm: 12px;
  --rw-font-size-md: 14px;
  --rw-font-size-lg: 16px;
}
```

### SCSS 变量

如果你使用 SCSS，可以在导入样式前定义变量：

```scss
// 自定义变量
$primary-color: #2196f3;
$border-radius-base: 8px;

// 导入组件样式
@import '@rowan/rw-ui/styles';
```

## 🔧 按需导入

支持按需导入以减小包体积：

```typescript
// 只导入需要的组件
import { Button } from '@rowan/rw-ui/components/Button';
import { Input } from '@rowan/rw-ui/components/Input';

// 或使用解构导入
import { Button, Input } from '@rowan/rw-ui';
```

## 📱 响应式设计

所有组件都内置了响应式设计：

```typescript
// 组件会自动适配移动端
<Modal 
  open={open}
  width={600} // 桌面端宽度
  // 移动端会自动调整为全宽
>
  内容
</Modal>
```

## 🔗 集成示例

### 与验证库集成

```typescript
import { Form, Input } from '@rowan/rw-ui';
import { ValidationRules, validateEmail } from '@rowan/rw-libs';

// 使用预设验证规则
<Form
  validationRules={{
    email: ValidationRules.email,
    phone: ValidationRules.phone
  }}
>
  {/* 表单内容 */}
</Form>

// 或自定义验证
<Form
  validationRules={{
    email: {
      required: true,
      custom: (value) => validateEmail(value) || '邮箱格式不正确'
    }
  }}
>
  {/* 表单内容 */}
</Form>
```

### 与 Hooks 集成

```typescript
import { Input, Loading } from '@rowan/rw-ui';
import { useDebounce, useAsync } from '@rowan/rw-hooks';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  const { data, loading } = useAsync(async () => {
    if (debouncedQuery) {
      return await searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <Input
        placeholder="搜索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        clearable
        onClear={() => setQuery('')}
      />
    
      <Loading loading={loading}>
        <div>{/* 搜索结果 */}</div>
      </Loading>
    </div>
  );
}
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

# 启动 Storybook
pnpm storybook

# 构建 Storybook
pnpm build-storybook
```

## 📋 浏览器支持

* Chrome >= 91
* Firefox >= 90
* Safari >= 14
* Edge >= 91

## 🔗 相关依赖

* **React**: `>=16.8.0` (需要 Hooks 支持)
* **@rowan/rw-libs**: 提供验证和工具函数
* **@rowan/rw-hooks**: 提供 React Hooks
* **clsx**: 类名合并工具

## 📄 License

ISC License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 更新日志

### v1.0.0

* ✨ 初始版本发布
* 🔘 Button 组件
* 📝 Input 组件（支持验证、图标、清除）
* 📋 Form 组件（集成验证功能）
* 🪟 Modal 组件（支持多种配置）
* ⏳ Loading 组件（多种样式和包装模式）
* 🎨 完整的设计系统和主题定制
* 📱 响应式设计支持
