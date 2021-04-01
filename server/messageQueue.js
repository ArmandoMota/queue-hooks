class Queue {
  constructor() {
    this.messages = [];
  }

  enqueue(msg) {
    this.messages.push(msg);
  }

  dequeue() {
    if (this.messages.length > 0) {
      const dequeued = this.messages[0];
      this.messages = this.messages.slice(1);
      return dequeued;
    }
  }

  peek() {
    return this.messages[0];
  }

  size() {
    return this.messages.length;
  }
}

const monitorOutgoingQueue = () => {
  setInterval()
}

const queue = new Queue();

exports.queue = queue;