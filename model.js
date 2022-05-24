class ToDo{ 

    //
        static PRIORITY = {
            Low: {order: 0, name: 'bassa', color: 'green'},
            Medium: {order: 1, name: 'media', color: 'yellow'},
            High: {order: 2, name: 'alta', color: 'orange'},
            Max: {order: 3, name: 'molto alta', color: 'red'}, 
        }  
    
        constructor(id, name, tags = [], creationDate = new Date(), priority = ToDo.PRIORITY.Low,){ 
            this.id = id;
            this.name = name;
            this.tags = tags; 
            this._creationDate = creationDate.getTime(); 
            this._priority = priority;
        } 
    
        set priority(newPriority){ 
            this._priority = newPriority;
        }
    
        get priority(){ 
            return this._priority;
        }

        get creationDate(){ 
            return new Date(this._creationDate); 
        } 

        set creationDate(date){
            this._creationDate = date.getTime();
          }

        static fromObj(obj){ 
            const newToDo = new ToDo(obj.id, obj.name, obj.tags, new Date(obj.creationDate * 1000));
            newToDo.id = obj.id; 
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