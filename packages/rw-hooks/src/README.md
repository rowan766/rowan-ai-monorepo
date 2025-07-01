# @rowan/rw-hooks

React Hooks 工具库，提供一系列实用的自定义 Hook，帮助简化 React 应用开发。

## 📦 安装

```bash
# npm
npm install @rowan/rw-hooks

# yarn
yarn add @rowan/rw-hooks

# pnpm
pnpm add @rowan/rw-hooks
```

## 🚀 快速开始

```typescript
import { useLocalStorage, useDebounce, useForm } from '@rowan/rw-hooks';
import { ValidationRules } from '@rowan/rw-libs';

function App() {
  // 本地存储
  const [user, setUser] = useLocalStorage('user', null);
  
  // 防抖
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  // 表单管理
  const form = useForm({
    initialValues: { email: '', password: '' },
    validationRules: {
      email: ValidationRules.email,
      password: ValidationRules.password
    }
  });

  return (
    // 你的组件JSX
  );
}
```

## 📚 Hooks 列表

### 🗄️ 状态管理

#### useLocalStorage

本地存储状态管理

```typescript
import { useLocalStorage } from '@rowan/rw-hooks';

function UserProfile() {
  const [user, setUser] = useLocalStorage('user', {
    name: '',
    email: ''
  });

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => updateUser({ name: e.target.value })}
      />
    </div>
  );
}
```

#### useToggle

布尔状态切换

```typescript
import { useToggle } from '@rowan/rw-hooks';

function Modal() {
  const [isOpen, toggle, setIsOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>切换模态框</button>
      <button onClick={() => setIsOpen(true)}>打开</button>
      {isOpen && <div>模态框内容</div>}
    </div>
  );
}
```

#### useCounter

计数器状态管理

```typescript
import { useCounter } from '@rowan/rw-hooks';

function Counter() {
  const { count, increment, decrement, reset, set } = useCounter(0);

  return (
    <div>
      <span>计数: {count}</span>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => set(10)}>设为10</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

### ⏱️ 性能优化

#### useDebounce

防抖处理

```typescript
import { useDebounce } from '@rowan/rw-hooks';

function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // 执行搜索请求
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

#### useThrottle

节流处理

```typescript
import { useThrottle } from '@rowan/rw-hooks';

function ScrollHandler() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 100);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>滚动位置: {throttledScrollY}</div>;
}
```

#### usePrevious

获取上一个值

```typescript
import { usePrevious } from '@rowan/rw-hooks';

function ValueCompare({ value }) {
  const prevValue = usePrevious(value);

  return (
    <div>
      <div>当前值: {value}</div>
      <div>上一个值: {prevValue}</div>
      <div>是否改变: {value !== prevValue ? '是' : '否'}</div>
    </div>
  );
}
```

### 🌐 异步操作

#### useAsync

异步操作状态管理

```typescript
import { useAsync } from '@rowan/rw-hooks';

function UserList() {
  const { data: users, loading, error, execute } = useAsync(
    async () => {
      const response = await fetch('/api/users');
      return response.json();
    },
    [] // 依赖数组，为空表示仅在组件挂载时执行
  );

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={execute}>重新加载</button>
    </div>
  );
}
```

### 📝 表单处理

#### useForm

表单状态和验证管理（集成 @rowan/rw-libs 验证）

```typescript
import { useForm } from '@rowan/rw-hooks';
import { ValidationRules } from '@rowan/rw-libs';

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationRules: {
      email: ValidationRules.email,
      password: ValidationRules.password
    },
    onSubmit: async (values) => {
      // 提交登录请求
      await login(values);
    }
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <div>
        <input
          type="email"
          value={form.values.email}
          onChange={(e) => form.setValue('email', e.target.value)}
          placeholder="邮箱"
        />
        {form.errors.email && (
          <div className="error">{form.errors.email.join(', ')}</div>
        )}
      </div>

      <div>
        <input
          type="password"
          value={form.values.password}
          onChange={(e) => form.setValue('password', e.target.value)}
          placeholder="密码"
        />
        {form.errors.password && (
          <div className="error">{form.errors.password.join(', ')}</div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={form.values.rememberMe}
            onChange={(e) => form.setValue('rememberMe', e.target.checked)}
          />
          记住我
        </label>
      </div>

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? '登录中...' : '登录'}
      </button>
    
      <button type="button" onClick={form.reset}>
        重置
      </button>
    </form>
  );
}
```

#### useValidation

字段级验证

```typescript
import { useValidation } from '@rowan/rw-hooks';
import { ValidationRules } from '@rowan/rw-libs';

function EmailInput() {
  const [email, setEmail] = useState('');
  const { isValid, errors } = useValidation(email, ValidationRules.email);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={!isValid && email ? 'error' : ''}
      />
      {errors.length > 0 && (
        <div className="error-text">{errors.join(', ')}</div>
      )}
    </div>
  );
}
```

## 🔍 API 参考

### Hook 参数和返回值


| Hook                 | 参数                                           | 返回值                                            | 描述             |
| -------------------- | ---------------------------------------------- | ------------------------------------------------- | ---------------- |
| `useLocalStorage<T>` | `key: string, initialValue: T`                 | `[T, (value: T | ((val: T) => T)) => void]`       | 本地存储状态管理 |
| `useDebounce<T>`     | `value: T, delay: number`                      | `T`                                               | 防抖处理         |
| `useThrottle<T>`     | `value: T, delay: number`                      | `T`                                               | 节流处理         |
| `useToggle`          | `initialValue?: boolean`                       | `[boolean, () => void, (value: boolean) => void]` | 布尔值切换       |
| `useCounter`         | `initialValue?: number`                        | `CounterActions`                                  | 计数器操作       |
| `usePrevious<T>`     | `value: T`                                     | `T | undefined`                                   | 获取上一个值     |
| `useAsync<T>`        | `asyncFunction: () => Promise<T>, deps: any[]` | `AsyncState<T>`                                   | 异步操作管理     |
| `useForm<T>`         | `UseFormOptions<T>`                            | `FormState<T>`                                    | 表单状态管理     |
| `useValidation`      | `value: any, rule: ValidationRule`             | `ValidationResult`                                | 字段验证         |

### 类型定义

```typescript
interface CounterActions {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: () => Promise<void>;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string[]>>;
  isSubmitting: boolean;
  setValue: (name: keyof T, value: any) => void;
  validate: () => boolean;
  handleSubmit: () => Promise<void>;
  reset: () => void;
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

# 清理构建文件
pnpm clean
```

## 🔗 依赖

* **React**: `>=16.8.0` (需要 Hooks 支持)
* **@rowan/rw-libs**: 提供验证和工具函数支持

## 💡 使用建议

1. **性能优化**: 合理使用 `useDebounce` 和 `useThrottle` 来优化用户交互体验
2. **表单处理**: 结合 `useForm` 和 `@rowan/rw-libs` 的验证规则，快速构建复杂表单
3. **状态持久化**: 使用 `useLocalStorage` 来保存用户偏好和应用状态
4. **异步操作**: 使用 `useAsync` 来管理 API 请求的各种状态

## 📄 License

ISC License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 更新日志

### v1.0.0

* ✨ 初始版本发布
* 🗄️ 提供状态管理 Hooks
* ⏱️ 提供性能优化 Hooks
* 🌐 提供异步操作 Hooks
* 📝 提供表单处理 Hooks（集成验证功能）
