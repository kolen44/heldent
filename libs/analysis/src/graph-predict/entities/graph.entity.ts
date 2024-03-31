export class Graph {
    public readonly arr: number[]
    public readonly length: number

    constructor(arr: number[]) {
        this.arr = arr
        this.length = arr.length
    }

    public truncateArrayFromEnd(length: number) {
        return this.arr.slice(this.arr.length - length, this.arr.length)
    }
}
