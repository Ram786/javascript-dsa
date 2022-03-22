class Graph {
    constructor(noOfVertices) {
        this.V = noOfVertices;
        this.edges = [];
        this.visited = Array(this.V).fill(false);
        this.result = [];

        for (let i = 0; i < this.V; i++) {
            this.edges.push([]);
        }
    }

    addEdge(src, dest) {
        this.edges[src].push(dest);
    }

    bfsTraversal(s) {
        // add first node to queue
        let queue = [s];
        this.visited[s] = true;

        while (queue.length) {
            let curr = queue.shift();

            for (let i = 0; i < this.edges[curr].length; i++) {
                let next = this.edges[curr][i];
                if (!this.visited[next]) {
                    // adding adjacent nodes for current node
                    queue.push(next);
                    this.visited[next] = true;
                }
            }
            this.result.push(curr);
        }
        console.log(this.result);
    }
}

const graph = new Graph(12);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(0, 4);
graph.addEdge(1, 3);
graph.addEdge(1, 9);
graph.addEdge(1, 4);
graph.addEdge(1, 6);
graph.addEdge(2, 5);
graph.addEdge(3, 6);
graph.addEdge(4, 1);
graph.addEdge(4, 7);
graph.addEdge(5, 8);
graph.addEdge(7, 10);
graph.addEdge(10, 11);

graph.bfsTraversal(0);
