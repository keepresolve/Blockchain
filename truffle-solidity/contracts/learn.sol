pragma solidity >=0.4.22 <0.9.0;


contract SimpleStorage {
    uint storedData;
    //枚举
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;
    //函数类型
    // function (<parameter types>) {internal|external} [pure|constant|view|payable] [returns (<return types>)]



    function set(uint  x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }

    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }
    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }
}