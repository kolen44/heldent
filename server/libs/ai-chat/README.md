# Как работать

импортировать с помощью "@ai-chat/ai-chat"

```typescript
import { AiChatModule } from "@ai-chat/ai-chat"
```

## Классы

### Класс Chat

**Chat** представляет из себя обычный чат, как в ChatGPT.

Создаётся с помощью объекта, таким образом:

```typescript
const chat = new Chat({
    role: YandexChatRole.USER,
    text: "question",
})
```

или же с помощью массива так:

```typescript
const chat = new Chat([
    {
        role: YandexChatRole.USER,
        text: "question",
    },
    {
        role: YandexChatRole.ASSISTANT,
        text: "answer",
    },
    {
        role: YandexChatRole.USER,
        text: "question",
    },
])
```

### Класс GenerateTextDto

Специальный класс для метода generate в сервисе AiChatService. Служит для дополнительной обёртки класса Chat.

## Методы

### Метод generate

Метод generate принимает GenerateTextDto

Класс GenerateTextDto можно создать таким способом:

```typescript
const chat = new Chat({
    role: YandexChatRole.USER,
    text: "question",
})

const generateTextDto = new GenerateTextDto(chat)
```
