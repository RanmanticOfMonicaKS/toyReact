import { createElement, Component, render } from  './toy-react';

// render方法，给component的实例root赋值 
// class MyComponent extends Component{
//     constructor() {
//         super();  // 调用父类构造函数
//         this.state = {
//             a:1,
//             b:2,
//         }
//     }
//     render() {
//         return  <div>
//             <h1>my component</h1>
//             <button onclick={() => { this.setState({a: this.state.a +1 }) }}>add</button>
//             <span>{this.state.a.toString()}</span>
//             <span>{this.state.b.toString()}</span>
//         </div>
//     }
   
// }
/* var a = <div id="a" class="c">
    <div></div>
    <div></div>
    <div></div>
</div> */

//SUCCESS  就能够这也样一个结构 createElement("div", {
//   id: "a",
//   "class": "c"
// }, createElement("div", null), createElement("div", null), createElement("div", null));

//  jsx 语法即使碰到html的括号会被翻译成一个函数的调用  以上会翻译为React.createElement('div',null);
// 通过配置  @babel/transform-react-jsx  插件的 第二个参数，能够修改这个函数名

// 如果我去定义这createElement为document.createElement 的操作，就能够将 jsx语法转化为真实的dom节点


// 将a挂载到body上
// 改为大写的，默认为一个类，不会再当做字符串进行create 再用上面的createElement不再合适
// 需要对createElement中原生方法，如createElement和createTextNode等api进行适配
// 视频中称为wrapper

// 将a 挂载到 body上
// document.body.appendChild(a)   // 当有文本内容的时候，需要判断

// render(<MyComponent>
//     <div>abc</div>
//     <div></div>
//     <div></div>
// </MyComponent>,document.body);

// 根据toy-react传入render函数 相当于document.body.appendChild()
/*****
 * <MyComponent>
    <div>abc</div>
    <div></div>
    <></>
</MyComponent>
 * 
 * MyComponent.root 就是他的返回  <div>
            <h1>my component</h1>
            { this.children }   
        </div>

        div以及H1都会转化为 ElementWrapper 解析
        my component  转化为 TextWrapper 解析
        this.children 相当于占位符，会将<div>abc</div>
    <div></div>
    <div></div> 当做children push到component的child中，
 */


//  Tic Tac Toe
class Square extends Component {
  render () {
    return   (
  <button className="square" onClick={this.props.onClick}>
    {this.props.value}
  </button>
);
} 
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

