import React from 'react';
import ReactDOM from 'react-dom';
// //建立一個DOM物件
// let element = <h1>Hello, world!</h1>

// //使用ReactDOM.render把剛建立的物件element插入目標DOM中
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

const timeComponent = () => {
  class HelloTitle extends React.Component {
    //render是唯一必要的屬性，會回傳一個根Element
    constructor(props) {
      super(props);
      this.state = {
        time : new Date().toLocaleTimeString(),
        num : props.num,
      };
    };
    render() {
      return <h1>成功囉！,{this.state.num} 現在顯示時間 {this.state.time}</h1>
    };
    //加入組件建構完成後執行的事件
    // 相當於 vue mounted 執行 
    componentDidMount(){
      /*在建構完成後，每秒都去刷新this.state.time的值
      (1)先去宣告一個更新state內容的function
      (2)每秒去執行一次該function刷新*/
      const upTime = () =>{
          //這裡面的setState()能夠重新設定state的值  追加Props 引入異步處理 state
          this.setState((props) => 
            ({time : new Date().toLocaleTimeString(), num: Number(props.num) + 1})
          );
      };
      setInterval(upTime,1000);
    };
    componentDidUpdate(){
      //執行內容
      console.log(this.state)
    };
    componentWillUnmount(){
      //這裡記錄移除掉的時間
      console.log(`移除組件的時間為：${this.state.time}`)
    };
  };
  let title = ( 
    <div>
      <HelloTitle num="200"/>
    </div>
    );
  ReactDOM.render(title, document.getElementById('root'));
}
const removeComponent = () =>{
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}
timeComponent();
//延遲五秒後執行移除
setTimeout(removeComponent,5000)

const testBtnComponent = () => {
  class TestBtn extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        clickCount : props.clickNum,
      };
      this.testConsole = this.testConsole.bind(this);
    };
    testConsole(){
      this.setState({clickCount: Number(this.state.clickCount) + 1});
      // console.log('測試成功');
    };
    componentDidUpdate(){
      console.log(`點了${this.state.clickCount}下`)
    };
    render() {
      return <button onClick={this.testConsole}>
                <p>按測試查看</p>
              </button>;
    };
  };
  let btn = (
      <TestBtn clickNum="0"></TestBtn>
    );
  ReactDOM.render(btn, document.getElementById('testBtn'));
};
testBtnComponent();

const selectorBtnComponent = () => {
  class InputGander extends React.Component {
    constructor(props){
      super(props)
      this.state = ({gender : ''})
      this.changeGender = this.changeGender.bind(this)
    };
    //宣告事件時傳入參數event取得觸發事件變數
    changeGender(event){
        //將觸發事件的DOM從event內的target屬性取出
        console.log(event.target)
        //指定選擇的性別給state.gender
        this.setState({ gender: event.target.value });
    };
    componentDidUpdate(){
        console.log(`已將state.gender變動為：${this.state.gender}`);
    };
    render(){
        return (<select onChange={this.changeGender.bind(this)}>
                    <option value="M">男</option>
                    <option value="W">女</option>
                </select>)
    };
  };
  ReactDOM.render(<InputGander />, document.getElementById('gander-select'));
};
selectorBtnComponent();
