import React from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends React.Component{

    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.todos !== nextProps.todos;
    // }

    render(){
        const {todos, onToggle, onRemove} = this.props;

        const todoList = todos.map(
            ({id, content, isComplete}) => (
                <TodoItem
                id={id}
                content={content}
                isComplete={isComplete}
                onToggle={onToggle}
                onRemove={onRemove}
                key={id}/>
            )
        )

//생략
        return(
            <div>
                {todoList}
            </div>
        )
    }
}

export default TodoItemList;
