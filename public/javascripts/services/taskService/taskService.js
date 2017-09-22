const encapsulated = {};

class TaskList {
    constructor ($http) {
        encapsulated.$http = $http;
    }

    getTasks() {
        return encapsulated.$http.get('/tasks').then((resp)=>{
            return resp.data;
        });
    }

    getTaskById(id) {
        return encapsulated.$http.get(`/tasks/${id}`).then((resp)=>{
            return resp.data;
        }).catch(()=> undefined);
    }

    updateTask(task) {
        return encapsulated.$http.put(`/tasks/${task.id}`, task).then((resp)=> {
            return resp.data;
        })
    }
}

TaskList.$inject = ['$http'];

export {TaskList};