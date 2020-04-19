import React from 'react';
import './App.css';

class WorldClock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hour: this.props.time,
      minute: 0,
      stop: false,
    };

    this.setState({minute: 1});
    this.timer = setInterval(() => {
      this.setState((state) => (
        state.minute === 59
        ? { hour: state.hour + 1, minute: 0 }
        : { minute: state.minute + 1 }
      ));
    }, 5000);
    console.log("Child Start");
  };

  componentDidMount() {
    console.log("Child Mount");
  }

  componentDidUpdate() {
    console.log("Child Update");
  }

  componentWillMount() {
    console.log("Child UnMount");
    clearInterval(this.timer);
  }

  handlingClick = (event) => {
    console.log(event.target);
    this.setState({stop: event.target.value});
    clearInterval(this.timer);
  };

  render() {
    return (
      <div className={"worldClock"}>
        <h2>도시: {this.props.city}</h2>
        <p>시간: {this.state.hour}시 {this.state.minute}분</p>
        <button value={true} onClick={this.handlingClick}>Stop</button>
      </div>
    );
  };
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.cityTimeData = [
      ['서울', 10],
      ['베이징', 9],
      ['시드니', 12],
      ['LA', 17]
    ];
    this.state = {
      content: '',
      show: true,
    }
    console.log("Parent Start");
  };

  componentDidMount() {
    console.log("Parent Mount");
  }

  componentDidUpdate() {
    console.log("Parent Update");
  }

  handlingChange = (event) => {
    this.setState({content: event.target.value});
  };

  handlingClick = (event) => {
    this.setState((prevState) => ({show: !prevState.show}));
  }

  render() {
    return (
      <div className="App">
        <h1 className={'myStyle'}>Hello</h1>
        <div className={'post'}>
          첫 게시글입니다.
          <textarea value={this.state.content} onChange={this.handlingChange}></textarea>
        </div>
        <button onClick={this.handlingClick}>손가락 튕기기</button>
        {
          true && true
        }
        { this.state.show &&
          this.cityTimeData.map((cityTime, index) =>
          <WorldClock city={cityTime[0]} time={cityTime[1]} key={index}/>
        )}
      </div>
    );
  };
}

export default App;
