class Node {
  constructor(value) {
    this.value = value;
    this.left = {};
    this.right = {};
  }
}

class BT {
  constructor(value) {
    this.root = new Node(value)
  }

  insert = (value, currentNode = this.root, newNode = new Node(value)) => {
    // base cases
    if (value < currentNode.value && !(currentNode.left instanceof Node)) {
      currentNode.left = newNode;
      return;
    }
    if (value >= currentNode.value && !(currentNode.right instanceof Node)) {
      currentNode.right = newNode;
      return;
    }

    // recurse
    if (value < currentNode.value) {
      this.insert(value, currentNode.left, newNode);
    }
    if (value >= currentNode.value) {
      this.insert(value, currentNode.right, newNode);
    }

  }

  build = (arr) => {
    for (let element of arr) {
      this.insert(element);
    }
  }

  depthTraverse = (currentNode = this.root) => {
    let path = [];
    let walk = (currentNode) => {
      path.push(currentNode.value);
      // base case (i.e. hit terminal node)
      if (!(currentNode.left instanceof Node) && !(currentNode.right instanceof Node)) {
        return
      }

      //recurse
      if (currentNode.left instanceof Node) {
        walk (currentNode.left)
      }
      if (currentNode.right instanceof Node) {
        walk (currentNode.right)
      }
    }
    walk(currentNode);
    return path;
  }

  breadthTraverse = (currentNode = this.root) => {
    let queue = [];
    let path = [currentNode.value];
    let walk = (currentNode) => {
      // build queue
      if (currentNode.left instanceof Node) {
        queue.push(currentNode.left)
      }
      if (currentNode.right instanceof Node) {
        queue.push(currentNode.right)
      }

      // base cases (i.e. empty queue)
      if (queue.length === 0) {
        return
      }

      //recurse
      path.push(queue[0].value);
      walk(queue.shift());
    }
    walk(currentNode);
    return path;
  }

  inOrderTraverse = (currentNode = this.root) => {
    let path = [];
    let walk = (currentNode) => {
      // base case
      if (!(currentNode.left instanceof Node) && !(currentNode.right instanceof Node)) {
        path.push(currentNode.value);
        return;
      }
      // recurse
      if (currentNode.left instanceof Node) {
        walk(currentNode.left);
      }
      // in order = middle
      path.push(currentNode.value);
      if (currentNode.right instanceof Node) {
        walk(currentNode.right);
      }

    }
    walk(currentNode);
    return path;
  }
}

let seedValue = 50;
let tree = new BT(seedValue)
let arr = [30, 20, 40, 35, 70, 60, 80, 70];
// for (let i = 0; i < 50; i++) {
//   arr.push(Math.floor(100 * Math.random()))
// }
tree.build(arr);
arr.unshift(seedValue);
console.log('arr: ', arr);
console.log('depth traversal: ', tree.depthTraverse());
console.log('breadth traversal: ', tree.breadthTraverse());
console.log('in order traverseal: ', tree.inOrderTraverse());
