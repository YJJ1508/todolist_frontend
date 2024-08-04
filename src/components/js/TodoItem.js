import React from 'react';
import '../css/TodoItem.css';

class TodoItem extends React.Component{

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.isComplete !== nextProps.isComplete;
    // }

    render(){
        const {content, isComplete, id, onToggle, onRemove} = this.props;
    
        console.log(id);

        return(
            <div className='todo-item' onClick={()=>onToggle(id)}>
                <div className='todo-item-remove' onClick={(e)=>{
                    e.stopPropagation();  //onToggle이 실행되지 않도록 함 //&times 곱하기 기호
                    onRemove(id)}}> 
                    &times;  
                </div>
                <div className={ `todo-item-content ${isComplete && 'isComplete'}` }>
                    <div>{content}</div>
                </div>
                { isComplete && (<div className='isComplete-mark'>✓</div>) }
            </div>
        )
    }
}

export default TodoItem;