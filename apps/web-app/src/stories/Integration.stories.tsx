import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Modal } from '@rowan/rw-ui';
import { useToggle, useLocalStorage } from '@rowan/rw-hooks';
import { debounce } from '@rowan/rw-libs';
import { useState } from 'react';

const meta: Meta = {
  title: 'Integration/Component Combinations',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 表单集成示例
export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useLocalStorage('form-input', '');
    const [isOpen, { toggle }] = useToggle();
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <h3>Form Integration Example</h3>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            value={value}
            onChange={setValue}
            placeholder="Type something..."
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button onClick={toggle}>Open Modal</Button>
          <Button 
            variant="secondary" 
            onClick={() => setValue('')}
          >
            Clear
          </Button>
        </div>
        
        <Modal isOpen={isOpen} onClose={toggle}>
          <div style={{ padding: '2rem' }}>
            <h4>Modal Content</h4>
            <p>Input value: {value}</p>
            <Button onClick={toggle}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  },
};

// Hooks 集成示例
export const HooksExample: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [toggle, { toggle: toggleState }] = useToggle();
    
    // 使用 rw-libs 的防抖函数
    const debouncedIncrement = debounce(() => setCount(c => c + 1), 300);
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <h3>Hooks Integration Example</h3>
        <p>Count: {count}</p>
        <p>Toggle State: {toggle ? 'ON' : 'OFF'}</p>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button onClick={debouncedIncrement}>
            Debounced +1
          </Button>
          <Button variant="secondary" onClick={toggleState}>
            Toggle
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              setCount(0);
              if (toggle) toggleState();
            }}
          >
            Reset All
          </Button>
        </div>
      </div>
    );
  },
};

// 完整应用示例
export const MiniApp: Story = {
  render: () => {
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, { toggle: toggleModal }] = useToggle();
    
    const addTodo = () => {
      if (inputValue.trim()) {
        setTodos([...todos, { id: Date.now(), text: inputValue, done: false }]);
        setInputValue('');
      }
    };
    
    const toggleTodo = (id: number) => {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ));
    };
    
    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>Todo App - Full Integration</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Input
            value={inputValue}
            onChange={setInputValue}
            placeholder="Add a todo..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo}>Add</Button>
          <Button variant="ghost" onClick={toggleModal}>
            Stats
          </Button>
        </div>
        
        <div>
          {todos.map(todo => (
            <div 
              key={todo.id}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem',
                textDecoration: todo.done ? 'line-through' : 'none'
              }}
            >
              <Button
                size="small"
                variant={todo.done ? 'secondary' : 'primary'}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.done ? '✓' : '○'}
              </Button>
              <span>{todo.text}</span>
            </div>
          ))}
        </div>
        
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <div style={{ padding: '2rem' }}>
            <h4>Todo Statistics</h4>
            <p>Total: {todos.length}</p>
            <p>Completed: {todos.filter(t => t.done).length}</p>
            <p>Remaining: {todos.filter(t => !t.done).length}</p>
            <Button onClick={toggleModal}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  },
};