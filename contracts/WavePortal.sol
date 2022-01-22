// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  event NewPost(Post post);
  struct Post {
    address author;
    string content;
    uint256 timestamp;
    uint likes;
  }
  mapping(address => uint256) lastPost;
  Post[] posts;

  constructor() payable {
    console.log("WavePortal contract has been constructed");
  }
  function createPost(string memory _content) public {
    uint256 timeElapsed = block.timestamp - lastPost[msg.sender];
    require(timeElapsed > 1 minutes, "You're posting too often!");
    Post memory post = Post(msg.sender, _content, block.timestamp, 0);
    posts.push(post);
    emit NewPost(post);
    lastPost[msg.sender] = block.timestamp;
    console.log('Address %s just wrote: "%s"', msg.sender, _content);
  }
  function getAllPosts() public view returns(Post[] memory) {
    return posts;
  }
  function getTotalPosts() public view returns(uint) {
    uint totalPosts = posts.length;
    console.log("There are %d posts!", totalPosts);
    return totalPosts;
  }
  function sendMoney(address _to, uint _amount) public payable {
    require(address(this).balance >= _amount, "There are no enough money on smart contract");
    (bool success, ) = _to.call{ value: _amount }("");
    require(success, "Failed to send money from contract");
  }
}
