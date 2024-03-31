import { Injectable } from '@nestjs/common';
import { Graph } from './generateGraph.model';

@Injectable()
export class GenerateGraphService {
	graph: Graph[] = [];
	insertGraph(name: string, grate: number) {
		const graphId = new Date().toString();
		const newGraph = new Graph(graphId, name, grate);
		this.graph.push(newGraph);
		return graphId;
	}
}
