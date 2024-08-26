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
      //input: "",       Form.js에서 hook 사용으로 인해 제거
      todos: []
    }
    //this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    // bind(this)에서 this는 app의 인스턴스를 가리킴.

  }

  componentDidMount(){
    this.handleInitInfo()
  }

  handleInitInfo(){
    fetch("/todos")
    .then(res => res.json())
    .then(todos => this.setState({todos: todos}))
    .catch(err => console.log(err))
  }


  // 등록
  //Hook 사용으로 state에서 input제외하고 todos만 파라미터로 받는다.
  handleCreate(input){ //TODO 생성 메서드
    const {todos} = this.state;     
    if(input===""){ 
      alert("내용을 입력해주세요"); //입력값 없으면
      return;
    }
    //화면에서 먼저 변경사항을 보여주는 방법으로 이용
    this.setState({ //업데이트 
      //input:"",
      todos: todos.concat({
        id: 0,  //임의 (key에러 방지)
        content: input,
        isComplete: false
      })
    });

    const data = {
      body: JSON.stringify({"content" : input}),
      headers: {'Content-Type': 'application/json'},
      method: 'post'
    }
    fetch("/todos", data)
    .then(res => {
      if(!res.ok){
        throw new Error(res.status);
      }else{
        return this.handleInitInfo();
      }
    }).catch(err => console.log(err));
  }



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

    const data = {  
      headers: {'Content-Type': 'application/json'},
      method: 'put'
    }

    console.log(selected);  
    console.log(data);        //@!@ isComplete 반전은 서버에서 따로 처리한다.
                              //id값만 넘겨받아 db에서 기존값을 확인함.(클라이언트 조작 때문 신뢰x)
    fetch("/todos/" + id, data)  //@@!id값만 넘김 
    .then(res => {
      console.log(res); //서버 응답 확인
      if(!res.ok){
        throw new Error(res.status);
      } else{
        return this.handleInitInfo();
      }
    }).catch(err => console.log(err));
  }

  
  //삭제
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

    const data = {
      headers: {'Content-Type':'application/json'},
      method: 'delete'
    }
    fetch('/todos/'+id, data)
    .then(res => {
      if(!res.ok){
        throw new Error(res.status);
      } else{
        return this.handleInitInfo();
      }
    }).catch(err => console.log(err));
    
  }



  render(){
    return (  //홈 화면 뿌려짐.
      < TodoListTemplate form ={(
        <Form
          // Form.js에서 hook 사용으로 인해 제거 
          onCreate={this.handleCreate}/>  //onCreate props에 handleCreate할당
                                  //폼.js에서 onCreate호출 시 handleCreate호출!!  
      )}>
        <TodoItemList 
          todos={this.state.todos}
          onToggle={this.handleToggle}
          onRemove={this.handleRemove}/>
      </TodoListTemplate>
    );
  }
}


export default App;
