"use strict";
const Tasks = require('./../task.json');

class TaskCollection {
    constructor() {}

    getAllTask() {
        return new Promise((resolve, reject)=> {
            resolve(Tasks);
        })
    }

    getTaskById(_id) {
        let n_id = Number(_id);

        //emulation request to DB
        return new Promise((resolve, reject)=> {
            let task = Tasks.find( (el)=> {
                return el.id === n_id;
            });
            resolve(task);
        })
    }
}

module.exports = new TaskCollection();