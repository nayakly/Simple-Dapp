// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

//lets us use javascript style console.log() in our solidity code
// Is beneficial when testing and debugging our code
//remove from production code - consumes a small amount of gas
import "hardhat/console.sol"; 

// If you happen to change the code after compilation, hardhat will automatically re-compile the code before testing

// Not an ERC20 token - just a simple one
contract token{
    string public name= "Hardhat token";
    string public symbol= "HHT";
    uint public totalSupply= 10000000;

    address public owner;
    mapping(address => uint) balances;

    constructor(){
        balances[msg.sender]= totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external{
        console.log("** Sender Balance is %s **", balances[msg.sender]);
        console.log("** Sender is sending %s tokens to address %s **", amount, to);
        
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;

    }

    function balanceOf(address account) external view returns(uint ){
        return balances[account];
    }

}