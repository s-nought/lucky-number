import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: {
        total: 0,
        includeNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      results: []
    };
  }

  onChangeSelect = (e) => {
    let data = this.state.inputData;
    data.includeNums = Array.from(e.target.selectedOptions, option => option.value);

    this.setState({
      inputData: data
    });
  }

  onInput = (e) => {
    let data = this.state.inputData;
    switch (e.target.name) {
      case 'input':
        data.total = Number(e.target.value);
        break;
      case 'select':
        data.includeNums = Array.from(e.target.selectedOptions, option => option.value);
        break;
      default:
        break;
    }

    this.setState({
      inputData: data
    });
  }

  searchNum = () => {
    const total = this.state.inputData.total;
    const includeNums = this.state.inputData.includeNums;
    let array = [];

    includeNums.forEach(a => {
      includeNums.forEach(b => {
        includeNums.forEach(c => {
          includeNums.forEach(d => {
            if (Number(total) === Number(a) + Number(b) + Number(c) + Number(d)) {
              array.push(String(a) + String(b) + String(c) + String(d));
            }
          });
        });
      });
    });

    if (array.length === 0) {
      alert(`含まれる数が [ ${includeNums.join(", ")} ] かつ合計数が ${total} になる組み合わせは存在しません。`);
    }

    this.setState({ results: array });
  }

  render() {
    const { results } = this.state;
    return (
      <div className="container mt-3">
        <h1>合計数字と4桁の数の組み合わせ</h1>
        <div className="bg-light p-3 p-sm-5 my-4 rounded">
          <Form>
            <Row className="align-items-center">
              <Col xs={12} className="my-1">
                <FloatingLabel controlId="floatingSelect" label="組み合わせに含む数字を選択してください">
                  <Form.Select name="select" multiple defaultValue={this.state.inputData.includeNums} onInput={this.onInput} onChange={this.onChangeSelect} id="inlineFormInputIncludeNum">
                    {(() => {
                      const items = [];
                      for (let i = 0; i < 10; i++) {
                        items.push(<option key={"include-num-" + i}>{i}</option>);
                      }
                      return items;
                    })()}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col xs={12} className="my-1">
                <Form.Control name="input" type="number" min="0" max="36" onInput={this.onInput} id="inlineFormInputTotal" placeholder="合計数字を入力してください" />
              </Col>
              <Col xs={12} className="my-1">
                <Button variant="primary" className="w-100" onClick={this.searchNum} >組み合わせを表示</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <textarea className="w-100" rows="10" readOnly value={results.join("\n")}></textarea>
      </div>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);