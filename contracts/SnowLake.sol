// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SnowLake {
  uint256 public a = 3;
  string text;
  bool completed; 
  struct Todo{
    string text;
    bool completed;
  }


  Todo[] public todos;

  constructor() public {

  }



  function function1(uint256 one, uint256 two) external pure returns (bool success, uint256 res) { 
    success = true;
    res = one + two;
  }

  function function2(uint256 one, uint256 two) external pure returns (bool success, uint256 res) { 
    return (true, one + two);
  }

  function multiply(uint256 number1, uint256 number2) public view returns(uint256){
    return a * block.timestamp * number1 * number2;
  }

  function create(string calldata _text) external{
         todos.push(Todo({
                text: _text,
                completed: false
         }));
    }


    function updateText(uint _index, string calldata _text) external {
        //more expensive
        todos[_index].text = _text;
        // does update with less gas
        // Todo storage todo = todos[_index];
        // todo.text = _text;
    }

    function get(uint _index) external view returns (string memory, bool){
        Todo memory todo = todos[_index];
        return (todo.text, todo.completed);
    }

    function toggleCompleted(uint _index) external {
        todos[_index].completed = !todos[_index].completed;

}

}
