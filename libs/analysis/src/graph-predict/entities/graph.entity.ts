export class Graph {
    public readonly arrOfNum: number[]
    public readonly length: number

    constructor(arr: number[]) {
        this.arrOfNum = arr
        this.length = arr.length
    }

    public truncateArrayFromEnd(length: number) {
        return this.arrOfNum.slice(
            this.arrOfNum.length - length,
            this.arrOfNum.length,
        )
    }
}
