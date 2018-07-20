pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./ExampleToken.sol";

contract ERC20Batcher is Ownable {
  using SafeMath for uint256;

  function batchSend(ExampleToken erc20, address[] addresses, uint256[] amounts) public {
    require(addresses.length == amounts.length);

    uint256 myBalance = erc20.balanceOf(address(this));
    uint256 length = addresses.length;
    uint256 sum = 0;

    for (uint256 i = 0; i < length; i++) {
      uint256 amount = amounts[i];
      require(amount > 0);
      sum.add(amount);
      require(sum <= myBalance);
      erc20.transfer(addresses[i], amount);
    }
  }
}
