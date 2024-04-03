## Как работать с GraphPredictService?

Сервис GraphPredictService содержит в себе одну функцию - predict

Что-бы сгенерировать график нужно сформировать данные таким образом

```typescript
const graphData: number[] // Данные в виде массива чисел
const predictionCount: number // Число указывает на то, сколько нужно предсказать значений

const graph = new Graph(graphData)
const graphPredictDto = new GraphPredictDto({
    predictionCount,
    graph,
})
const result = service.predict(graphPredictDto)

console.log(result) // Предсказание в виде класса Graph
```

## Насчёт успеваемости, оценок и посещения

Модель принимает на вход массив чисел, которые обозначают успеваемость студента

Успеваемость высчитывается таким образом

**score** = 0.8 _ **grade** + 0.2 _ **attendance**

**score** - успеваемость студента \
**grade** - оценка \
**attendance** - посещение \

Посещение, в этом случае, это процент посещения за какое-то время, в нашем случае это процент посещения за 100 дней. \
Оценки можно брать за каждый день, то есть за 100 дней.

Таким образом мы получаем массив успеваемости, который можно скормить модели.
