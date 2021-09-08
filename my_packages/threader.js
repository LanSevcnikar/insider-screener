module.exports = class Threader {
  constructor() {
    this.queue = [];
    this.index = 0
  }
  addToQueue(queue_item) {
    this.queue.push(queue_item);
  }

  readQueue() {
    this.queue.forEach(item => {
      console.log(item)
    });
  }

  run_threads(num_threads) {
    for (let i = 0; i < num_threads; i += 1) {
      this.run_thread(this.queue[this.index])
      this.index += 1;
    }
  }

  run_thread(request) {
    try {
      request.action(...request.args).then(() => {
        if (this.index >= this.queue.length) return;
        this.run_thread(this.queue[this.index]);
        this.index += 1;
        console.log("Done a task")
      })
    } catch (e) {
      if (this.index >= this.queue.length) return;
      this.run_thread(this.queue[this.index]);
      this.index += 1;
      console.log("Failed a task")
    }
  }
}