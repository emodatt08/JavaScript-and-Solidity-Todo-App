const { assert } = require("chai");

const TodoList = artifacts.require('TodoList')

contract('TodoList', (accounts) => {
    before(async () =>{
        this.todoList = await TodoList.deployed();
    })

    it('deploys smart contract successfully', async () =>{
        const address = await this.todoList.address;
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it("lists a task from smart contract", async () => {
        const taskCount = await this.todoList.taskCount().then(result => result.toNumber());
        const task = await this.todoList.tasks( taskCount )
        assert.equal(task.id.toNumber(), taskCount)
    })

    it("creates a task in the smart contract", async() =>{
        const result = await this.todoList.createTask('A new task')
        const taskCount = await this.todoList.taskCount().then(result => result.toNumber());
        const event = result.logs[0].args
        
        assert.equal(event.id.toNumber(), taskCount)
        assert.equal(event.content, 'A new task')
        assert.equal(event.completed, false)
    })

    it('toggles task completion', async () => {
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
      })
})