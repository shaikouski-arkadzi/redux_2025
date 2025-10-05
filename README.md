
# Правила использования селекторов в Redux

### 1. Неоптимальный пример

`const user = useAppSelector( state => state.users.find(user => user.id === userId)
)` 

#### Что делает

-   Берёт весь массив `state.users`
    
-   Ищет нужного пользователя методом `.find()`
    

#### Проблема

-   **Сложность O(n)** — перебирает всех пользователей.
    
-   При большом числе пользователей это **неэффективно**.
    
-   Каждый раз при изменении `state.users` весь массив может пересоздаваться, что вызывает **ненужные ререндеры**.
    

#### Вывод

Так лучше не делать — это пример **неэффективного селектора**.

----------

### 2. Оптимальный пример

`const counter = useAppSelector( state => state.users.entities[userId]
)` 

#### Что делает

-   Получает конкретного пользователя **по ключу `userId`** из словаря (`entities`).
    

#### Преимущества

-   **Сложность O(1)** — доступ напрямую по ключу.
    
-   Не нужно искать в массиве.
    
-   **Меньше данных выбирается из стора**, значит меньше поводов для ререндера.
    

#### Вывод

Это **предпочтительный способ** выбора данных из стора Redux.

----------

### 3. Структура состояния пользователей

`type  UsersState = { entities: Record<UserId, User | undefined> ids: UserId[]
}` 

#### Что это

Тип данных для состояния пользователей.

#### Объяснение

-   `entities`: хранит пользователей как объект (`Record`), где ключ — это `UserId`, а значение — `User`.
    
        {
          "entities": {
	         "1": { "id": "1", "name": "Alice" },
	         "2": { "id": "2", "name": "Bob" }
	      },
          "ids": ["1", "2"]
        }

    
-   `ids`: список всех идентификаторов — для сохранения порядка.
    

#### Зачем так

Такое **нормализованное хранение** делает выборку и обновление данных **быстрой и предсказуемой**.  

----------
## Почему хранить `ids` отдельно от `entities`

###  1. `entities` — для быстрого доступа (O(1))

`entities: Record<UserId, User | undefined>` 

Позволяет мгновенно найти пользователя по ID:

`const user = state.users.entities[userId];` 

Но объекты **не хранят порядок** и **неудобны для итерации**.

----------

###  2. `ids` — для сохранения порядка и обхода

`ids: UserId[]` 

Используется, когда нужно:

-   отрисовать список пользователей в порядке добавления;
    
-   пройтись по всем пользователям:
    
    `const users = state.users.ids.map(id => state.users.entities[id]);` 
    

----------

###  3. Redux Toolkit делает это автоматически

`createEntityAdapter()` создаёт структуру:

`{ ids: [], entities: {}
}` 

и предоставляет готовые селекторы:

`adapter.getSelectors(state => state.users)` 

----------

### Итог

-   `entities` — для **скорости**
    
-   `ids` — для **порядка и итерации**
    
-   Вместе — **универсальная и эффективная структура** для Redux
    

----------

## Как превратить массив пользователей в структуру `entities + ids`

### Пример входных данных

    const users = [
      { id: '1', name: 'Alice', age: 25 },
      { id: '2', name: 'Bob', age: 30 },
      { id: '3', name: 'Charlie', age: 22 }
    ];

----------

###  Вариант 1. Вручную (через `reduce`)

    const normalized = users.reduce(
      (acc, user) => {
        acc.entities[user.id] = user;
        acc.ids.push(user.id);
        return acc;
      },
      { entities: {}, ids: [] as string[] }
    );
    
    console.log(normalized);


**Результат:**

    {
      "entities": {
        "1": { "id": "1", "name": "Alice", "age": 25 },
        "2": { "id": "2", "name": "Bob", "age": 30 },
        "3": { "id": "3", "name": "Charlie", "age": 22 }
      },
      "ids": ["1", "2", "3"]
    }

----------

### Вариант 3. Через Redux Toolkit (`createEntityAdapter`)

    import { createEntityAdapter } from '@reduxjs/toolkit';
    
    const usersAdapter = createEntityAdapter<User>({
      selectId: (user) => user.id,
    });
    
    const initialState = usersAdapter.getInitialState();
    const loadedState = usersAdapter.setAll(initialState, users);
    
    console.log(loadedState);

 

**Результат:**

    {
      "ids": ["1", "2", "3"],
      "entities": {
        "1": { "id": "1", "name": "Alice", "age": 25 },
        "2": { "id": "2", "name": "Bob", "age": 30 },
        "3": { "id": "3", "name": "Charlie", "age": 22 }
      }
    }

----------

## Альтернатива: использование createAppSelector


    const selectUserById = createAppSelector(
      state => state.users,
      (_, userId: UserId) => userId,
      (users, userId) => users.find(user => user.id === userId)
    );
    
    const user = useAppSelector(state => selectUserById(state, userId));
    
### Что здесь происходит

-   `createAppSelector` — это просто алиас над `createSelector`, обёрнутый под твой `useAppSelector`.
    
-   Селектор принимает:
    
    1.  всё состояние `state.users`,
        
    2.  `userId` (второй аргумент),
        
    3.  вычисляющую функцию: ищет нужного пользователя.
        

### Преимущества

-   **Мемоизация по `userId`** — пока `state.users` и `userId` не изменились, вычисления (`find`) не выполняются заново.
    
-   Это **устраняет лишние ререндеры** и делает селектор **O(1)** по времени при повторных вызовах.
    
-   Код остаётся декларативным и читаемым.
