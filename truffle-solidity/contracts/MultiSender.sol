// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MultiSender is Ownable {
    using SafeERC20 for IERC20;

    uint public fee;
    address payable feeTo;

    event Withdrawn(address indexed token, address indexed to, uint amount);
    event Multisended(uint256 total, address tokenAddress);

    constructor(uint _fee, address _feeTo) {
        setFee(_fee);
        setFeeTo(_feeTo);
    }

    receive() external payable {}

    /// @dev 提现eth
    function withdraw(uint _amount) external onlyOwner {
        feeTo.transfer(_amount); 
        emit Withdrawn(address(0), feeTo, _amount);
    }

    /// @dev 提现token
    function withdrawToken(address _token, uint _amount) external onlyOwner {
        IERC20(_token).safeTransfer(feeTo, _amount);   
        emit Withdrawn(_token, feeTo, _amount);
    }

    /// @dev 设置手续费
    function setFee(uint256 _newFee) public onlyOwner {
        fee = _newFee;
    }

    function setFeeTo(address _feeTo) public onlyOwner {
        feeTo = payable(_feeTo);
    }
 
    /// @dev token == 0x000000000000000000000000000000000000bEEF 时批量转账eth，否则转token
    /// @notice trc20不支持safeTransfer
    function multisendToken(address token, address[] calldata _contributors, uint256[] calldata _balances) external payable {
        require(_contributors.length == _balances.length, "parameter error");
        if (token == 0x000000000000000000000000000000000000bEEF){
            require(msg.value >= fee + sum(_balances), "send amount error or without fee");
            multisendEther(_contributors, _balances);
        } else {
            require(msg.value >= fee, "need to pay");
            uint total = 0;
            IERC20 erc20 = IERC20(token);
            for (uint i; i < _contributors.length; i++) {
                erc20.safeTransferFrom(msg.sender, _contributors[i], _balances[i]);
                total += _balances[i];
            }
            emit Multisended(total, token);
        }
    }

    function multisendEther(address[] calldata _contributors, uint256[] calldata _balances) public payable {
        uint256 totalValue = msg.value;
        uint totalSend = totalValue - fee;
        require(totalSend >= sum(_balances), "send amount error or without fee");

        for (uint i; i < _contributors.length; i++) {
            require(totalValue >= _balances[i], "not enough ether");
            totalValue -= _balances[i];
            payable(_contributors[i]).transfer(_balances[i]);
        }
        emit Multisended(totalSend, 0x000000000000000000000000000000000000bEEF);
    }

    function sum(uint[] memory amounts) internal pure returns (uint) {
        uint totalAmnt = 0;
        for (uint i=0; i < amounts.length; i++) {
            totalAmnt += amounts[i];
        }
        return totalAmnt;
    }

}