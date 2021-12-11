pragma solidity >=0.4.17;

contract product{
    struct Review{
        string bestPart;
        string enhancement;
        bool stuckSomewhere;
        uint rating;
        bool wouldRecommend;
        string bug;
    }

    string productTitle;
    string productDescription;
    string productLiveLink;
    uint amountOfResponses;
    uint totalMoney;
    Review[] public reviews;
    address[] public reviewers;
    mapping(address=>Review) reviewByUser;


    modifier NotZero(uint responses, uint money){
        require(responses != 0);
        require(money != 0);
        _;
    }
    constructor(string memory title,string memory desc,string memory livelink,uint responses,uint money) NotZero(responses,money){
        productTitle = title;
        productDescription = desc;
        totalMoney = money;
        productLiveLink = livelink;
        amountOfResponses = responses;
    }
    function addAProduct(string memory title,string memory desc,string memory livelink,uint responses,uint money) public NotZero(responses,money){
        productTitle = title;
        productDescription = desc;
        totalMoney = money;
        productLiveLink = livelink;
        amountOfResponses = responses;
    }

    function sendMoney(address receiver, uint amount) public{
        payable(receiver).transfer(amount);
    }
    function getAllReviewers() public view returns(address[] memory){
        return reviewers;
    }

    function currentBalance() public view returns(uint){
        return totalMoney;
    }
}


contract company{
    uint numberOfProducts;
    mapping(address=>product[]) allProducts;

      modifier NotZero(uint responses, uint money){
        require(responses != 0);
        require(money != 0);
        _;
    }

    function addAProduct(string memory title,string memory desc,string memory livelink,uint responses,uint money) public NotZero(responses,money){
        product newProduct = new product(title,desc,livelink,responses,money);
        allProducts[msg.sender].push(newProduct);
    }
}