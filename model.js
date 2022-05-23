class ToDo{ 

    //
        static PRIORITY = {
            Low: {order: 0, name: 'bassa', color: 'green'},
            Medium: {order: 1, name: 'media', color: 'yellow'},
            High: {order: 2, name: 'alta', color: 'orange'},
            Max: {order: 3, name: 'molto alta', color: 'red'}, 
        }  
    
        constructor(id, name, tags = [], priority = ToDo.PRIORITY.Low,){ 
            this.id = id;
            this.name = name;
            this.tags = tags; 
            this._creationDate = new Date().getTime(); 
            this._priority = priority;
        } 
    
        set priority(newPriority){ 
    this._priority = newPriority;
        }
    
        get priority(){ 
            return this._priority;
        }

        get creationDate(){ 
            const date = new Date(this._creationDate); 
            return date;
        } 

        set creationDate(newDate){ 
            const timeStamp = newDate.getTime(); 
            this._creationDate = timeStamp;
        }
    
        toString(){ 
            const toDoString = 'ToDo: ' + this.name + '\n' +
                               'priority: ' + this.priority.name + '\n' +
                               'tags: ' + this.tags + '\n' + 
                               'Data di creazione: ' + this.creationDate; 
            return  toDoString;
        }

        static fromObj(obj){ 
            const newToDo = new ToDo(obj.id, obj.name, obj.tags);
            newToDo._creationDate = obj.creationDate; 
            if (obj.priority === 0) {
                newToDo.priority = ToDo.PRIORITY.Low;
            } else if (obj.priority === 1) {
                newToDo.priority = ToDo.PRIORITY.Normal;
            } else if (obj.priority === 2) {
                newToDo.priority = ToDo.PRIORITY.High;
            } else if (obj.priority === 3) {
                newToDo.priority = ToDo.PRIORITY.Max;
            } 
            return newToDo;
        }
}