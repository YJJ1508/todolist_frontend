//import logo from './logo.svg';
//import './App.css';
//import { useState } from 'react'; //state 사용

import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';

class App extends React.Component{
  constructor(props){
    super(props);
    //this.id = 2;
    this.state = {
      //input: "",        Hook 사용으로 인해 제거
      todos: [
        //{id: 0, content:"리액트를 공부하자0", isComplete:false},
        //{id: 1, content:"리액트를 공부하자1", isComplete:true}
      ]
    }
    //this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // Form 컴포넌트 메서드               //Hook 사용으로 제거
  // handleChange(event){  //입력 값이 변경될 때 호출
  //   this.setState({ //현재 입력값으로 업데이트
  //     input: event.target.value
  //   });
  // }

  //Hook 사용으로 state에서 input제외하고 todos만 파라미터로 받는다.
  handleCreate(inputValue){ //TODO 생성 메서드
    const {todos} = this.state;     
    if(inputValue===""){ //입력값 없으면 경고
      alert("내용을 입력해주세요");
      return;
    }
    this.setState({ //업데이트 
      //input:"",
      todos: todos.concat({
        id: 0,  //임의 (key에러 방지)
        content: inputValue,
        isComplete: false
      })
    })
  }
  // handleKeyPress(event){  //ENTER키 눌렀을 때 호출되는 메서드        //Hook 
  //   if(event.key ==="Enter"){
  //     this.handleCreate();
  //   }
  // }

  // 수정
  //TodoItem컴포넌트 메서드-완료처리
  handleToggle(id){
    const {todos} = this.state; //todos 배열 불러오기           //수정

    //id와 일치하는 항목 찾기(해당 항목 가져오기)
    const isComplete =  todos.find(todo=>todo.id===id).isComplete;
    if(!window.confirm(isComplete ? "미완료 처리 하시겠습니까?":"완료 처리 하시겠습니까?")){
      return; //confirm 팝업창
    }

    const index = todos.findIndex(todo=>todo.id ===id); //파라미터로 받은 id를 가지고 몇번째 item인지 찾는다
    const selected = todos[index]; //선택한 객체 저장
    const nextTodos = [...todos]; //배열 복사
    
    //완료처리 객체 세팅
    nextTodos[index] = {  
      ...selected,
      isComplete:!selected.isComplete //반전
    };
    this.setState({
      todos:nextTodos
    });
  }
  handleRemove(id){
    const {todos} = this.state; //todo 목록 불러오기          //수정
    
    // 삭제 팝업 띄우기
    const removeContent = todos.find(todo => todo.id ===id).content;
    if(!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")){
      return;
    }
    this.setState({
      todos: todos.filter(todo => todo.id !== id) //filter(포함된 내용을 새 배열로 생성)
    })
    
  }



  render(){
    return (  //홈 화면 뿌려짐.
    < TodoListTemplate form = {(
      <Form
        //value={this.state.input}
        //onChange={this.handleChange}
        onCreate={this.handleCreate}/>
        //onKeyPress={this.handleKeyPress}
      )} >
      <TodoItemList 
        todos={this.state.todos}
        onToggle={this.handleToggle}
        onRemove={this.handleRemove}/>
    </TodoListTemplate>
  );
  }
}


export default App;
