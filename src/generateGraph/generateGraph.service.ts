import { Injectable } from '@nestjs/common';
import { Graph } from './generateGraph.model';
@Injectable()
export class GenerateGraphService {
  graph: Graph[] = [];
  insertGraph(name: string, grate: number) {
    const newGraph = new Graph(new Date().toString(), name, great);
  }
}
