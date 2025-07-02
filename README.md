# Rowan AI Monorepo

现代化的 React 生态系统 Monorepo，包含工具库、Hooks 库和 UI 组件库。基于 TypeScript、pnpm workspace 和 Lerna 构建。

## 🏗️ 项目架构

```
rowan-ai-monorepo/
├── apps/
│   └── web-app/                 # 主应用程序
├── packages/
│   ├── rw-libs/                 # 工具函数库
│   ├── rw-hooks/                # React Hooks 库
│   └── rw-ui/                   # UI 组件库
├── tools/                       # 构建工具配置
├── lerna.json                   # Lerna 配置
├── pnpm-workspace.yaml          # pnpm workspace 配置
└── package.json                 # 根配置文件
```

## 📦 包结构

### @rowan/rw-libs

基础工具库，提供通用的工具函数、验证和格式化功能。

**主要功能：**

* 🔧 数据格式化（货币、文件大小、日期等）
* ✅ 表单验证（邮箱、手机号、身份证等）
* 📅 日期处理工具
* 🏷️ TypeScript 类型定义

### @rowan/rw-hooks

React Hooks 库，提供常用的自定义 Hook。

**主要功能：**

* 🗄️ 状态管理（useLocalStorage、useToggle、useCounter）
* ⏱️ 性能优化（useDebounce、useThrottle、usePrevious）
* 🌐 异步操作（useAsync）
* 📝 表单处理（useForm、useValidation）

### @rowan/rw-ui

React UI 组件库，提供现代化的可复用组件。

**主要功能：**

* 🔘 基础组件（Button、Input）
* 📋 复合组件（Form、Modal）
* ⏳ 反馈组件（Loading）
* 🎨 完整的设计系统

## 🚀 快速开始

### 环境要求

* Node.js >= 18.0.0
* pnpm >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd rowan-ai-monorepo

# 安装依赖
pnpm install

# 构建所有包
pnpm run build
```

### 开发模式

```bash
# 启动开发模式（并行运行所有包的 dev 脚本）
pnpm run dev

# 或者单独启动某个包
pnpm --filter @rowan/rw-libs dev
pnpm --filter @rowan/rw-hooks dev
pnpm --filter @rowan/rw-ui dev
```

## 📚 使用示例

### 安装包

```bash
# 从私有仓库安装
pnpm install @rowan/rw-ui @rowan/rw-hooks @rowan/rw-libs
```

### 基础使用

```typescript
import React from 'react';
import { Button, Input, Form } from '@rowan/rw-ui';
import { useLocalStorage, useDebounce } from '@rowan/rw-hooks';
import { ValidationRules, formatCurrency } from '@rowan/rw-libs';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  return (
    <div>
      <h1>Rowan AI Monorepo Demo</h1>
    
      {/* 使用格式化工具 */}
      <p>价格: {formatCurrency(1234.56)}</p>
    
      {/* 使用 Hook */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索..."
      />
      <p>防抖搜索词: {debouncedSearch}</p>
    
      {/* 使用表单组件 */}
      <Form
        initialValues={{ email: '', password: '' }}
        validationRules={{
          email: ValidationRules.email,
          password: ValidationRules.password
        }}
        onSubmit={(values) => console.log('提交:', values)}
      >
        {(form) => (
          <>
            <Input
              label="邮箱"
              value={form.values.email}
              onChange={(e) => form.setValue('email', e.target.value)}
              error={form.errors.email}
            />
            <Button onClick={form.handleSubmit} loading={form.isSubmitting}>
              提交
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}
```

## 🛠️ 开发指南

### 包间依赖关系

```
rw-libs (基础工具层)
    ↑
rw-hooks (React Hook 层)
    ↑  
rw-ui (UI 组件层)
    ↑
web-app (应用层)
```

### 开发工作流

1. **修改基础包** (rw-libs)
   ```bash
   cd packages/rw-libs
   # 修改源码
   pnpm dev  # 监听模式构建
   ```
2. **测试上层包** (rw-hooks/rw-ui)
   * 源码修改会自动反映到上层包
   * 支持热重载开发
3. **验证应用集成** (web-app)
   ```bash
   cd apps/web-app
   pnpm dev  # 启动应用验证
   ```

### 添加新组件

```bash
# 在 rw-ui 中添加新组件
cd packages/rw-ui/src/components
mkdir NewComponent
cd NewComponent

# 创建组件文件
touch NewComponent.tsx
touch NewComponent.module.scss
touch index.ts
```

### 添加新 Hook

```bash
# 在 rw-hooks 中添加新 Hook
cd packages/rw-hooks/src/hooks
touch useNewHook.ts

# 更新导出
# 编辑 src/hooks/index.ts 添加导出
```

## 🔧 可用脚本

### 根目录脚本

```bash
# 构建所有包
pnpm run build

# 开发模式（并行）
pnpm run dev

# 类型检查
pnpm run type-check

# 清理构建文件
pnpm run clean

# 版本管理
pnpm run version

# 发布到私仓
pnpm run publish
```

### 单独包操作

```bash
# 构建特定包
pnpm --filter @rowan/rw-libs build

# 为特定包添加依赖
pnpm --filter @rowan/rw-ui add lodash

# 运行特定包的脚本
pnpm --filter @rowan/rw-hooks dev
```

## 📦 版本管理与发布

### 使用 Lerna 管理版本

```bash
# 交互式版本更新
lerna version

# 发布到私有仓库
lerna publish from-package --registry=http://localhost:4873
```

### 使用 pnpm 发布

```bash
# 构建所有包
pnpm -r run build

# 发布所有包
pnpm -r publish --registry=http://localhost:4873
```

### 设置私有仓库

```bash
# 安装 Verdaccio
npm install -g verdaccio

# 启动私有仓库
verdaccio  # 运行在 http://localhost:4873

# 配置项目使用私仓
echo "@rowan:registry=http://localhost:4873" > .npmrc
```

## 🏗️ 技术栈

### 核心技术

* **TypeScript** - 类型安全的 JavaScript
* **React** - UI 库（18.x）
* **pnpm** - 快速、节省磁盘空间的包管理器
* **Lerna** - Monorepo 管理工具

### 构建工具

* **Rollup** - 库打包工具
* **Vite** - 应用开发服务器
* **SCSS** - CSS 预处理器
* **PostCSS** - CSS 后处理器

### 开发工具

* **ESLint** - 代码检查
* **Prettier** - 代码格式化
* **Verdaccio** - 私有 npm 仓库

## 📂 项目配置文件

### 根目录配置

* `package.json` - 根项目配置和脚本
* `lerna.json` - Lerna 配置
* `pnpm-workspace.yaml` - pnpm workspace 配置
* `tsconfig.json` - 全局 TypeScript 配置
* `.npmrc` - npm 配置（私仓设置）

### 包级配置

每个包都包含：

* `package.json` - 包配置和依赖
* `tsconfig.json` - TypeScript 配置
* `rollup.config.js` - 构建配置（库包）
* `README.md` - 包文档

## 🔍 故障排查

### 常见问题

**1. 包间依赖解析失败**

```bash
# 清理并重新安装
pnpm clean
rm -rf node_modules
pnpm install
```

**2. TypeScript 类型错误**

```bash
# 重建所有包
pnpm -r run build

# 重启 TypeScript 服务器（VS Code）
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

**3. 发布权限问题**

```bash
# 检查私仓状态
curl http://localhost:4873

# 重新登录
npm adduser --registry=http://localhost:4873
```

### 调试技巧

```bash
# 查看包的构建输出
pnpm --filter @rowan/rw-libs build --verbose

# 检查包的依赖关系
pnpm --filter @rowan/rw-ui ls --depth=0

# 查看 workspace 信息
pnpm list -r
```

## 🤝 贡献指南

### 开发流程

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范

* 使用 TypeScript 编写所有代码
* 遵循 ESLint 和 Prettier 规则
* 为新功能添加相应的类型定义
* 更新相关文档和示例

### 提交规范

使用约定式提交：

* `feat:` 新功能
* `fix:` 修复 bug
* `docs:` 文档更新
* `style:` 代码格式调整
* `refactor:` 重构
* `test:` 测试相关
* `chore:` 构建过程或辅助工具的变动

## 📄 许可证

MIT License - 详见 [LICENSE](https://claude.ai/chat/LICENSE) 文件

## 👥 维护者

* **ro wan** - 初始开发和维护

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

* 提交 GitHub Issue
* 发送邮件至：[row287630@gmail.com]

---

⭐ 如果这个项目对你有帮助，请给个 Star！
