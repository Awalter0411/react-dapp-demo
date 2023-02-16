// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint256 counter;

    constructor() {
        counter = 0;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function addCounter() public {
        counter++;
    }
}
