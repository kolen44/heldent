import { Graph } from './graph.entity';

export class GraphPredict {
	constructor(
		public readonly model: any,
		public readonly graph: Graph,
	) {}
}
