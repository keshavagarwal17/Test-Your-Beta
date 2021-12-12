pragma solidity >=0.4.17;

contract company{
    product[] public deployedProducts;
    uint numberOfProducts;
    mapping(address=>product[]) allProducts;
    // mapping(product=>uint) public productBalance;

      modifier NotZero(uint responses, uint money){
        require(responses != 0);
        require(money != 0);
        _;
    }

    function addAProduct(string memory title,string memory desc,string memory livelink,uint responses,uint money, uint ageMin, uint ageMax, string memory gender) public NotZero(responses,money){
        product newProduct = new product(title,desc,livelink,responses,money, ageMin, ageMax, gender, msg.sender);
        allProducts[msg.sender].push(newProduct);
        deployedProducts.push(newProduct);
        // productBalance[product] = msg.value;
        numberOfProducts++;
    }

    function allProductsAddress() public view returns (product[] memory) {
        return deployedProducts;
    }

        function getAllMyProducts(address userAddress) public view returns (product[] memory){
        return allProducts[userAddress];
        }
}

contract product{
    struct Review{
        string cid;
        uint approval;
        address from;
        uint rating;
        bool paid;
    }
    mapping(address => bool) approval;
    string productTitle;
    string productDescription;
    string productLiveLink;
    uint amountOfResponses;
    uint totalMoney;
    uint minAge;
    uint maxAge;
    uint reqMoney;
    address manager;
    Review[] public reviews;
    mapping(address=>uint) Ratings;
    address[] public reviewers;
    mapping(address=>Review) reviewByUser;
    uint public productBalance;


    modifier NotZero(uint responses, uint money){
        require(responses != 0);
        require(money != 0);
        _;
    }

    modifier notApproved(address approver) {
        require(approval[approver] != true);
        _;
    }

    modifier checkAndBalance(uint reviewIndex, uint amt) {
        require(reviews[reviewIndex].paid != true);
        require(amt >= totalMoney);
        _;
    }

    constructor(string memory title,string memory desc,string memory livelink,uint responses,uint money,uint ageMin, uint ageMax, string memory gender, address from) NotZero(responses,money)  {
        productTitle = title;
        productDescription = desc;
        totalMoney = 0;
        productLiveLink = livelink;
        amountOfResponses = responses;
        minAge = ageMin;
        maxAge = ageMax;
        reqMoney = money;
        manager = from;
    }

    function addBalance() public payable {
        totalMoney = msg.value;
    }

    function sendMoney(address receiver, uint amount) public{
        // payable(receiver).transfer(amount);
        receiver.transfer(amount);
    }


    function payToAllReviewers() public {
      uint currentMoney = (amountOfResponses/reviewers.length)*totalMoney;
      uint totalRating=0;
      uint i;
      uint rating;
      address reviewerAddress;
        for(i=0;i<reviewers.length;i++){
          reviewerAddress = reviewers[i];
          rating = Ratings[reviewerAddress];
          totalRating +=rating;
        }
      uint ratingPerStar = currentMoney/totalRating;

       for(i=0;i<reviewers.length;i++){
          reviewerAddress = reviewers[i];
          rating = Ratings[reviewerAddress];
          uint amount = rating * ratingPerStar;
          reviewerAddress.transfer(amount);
        }
    }


    function getAllReviewers() public view returns(address[] memory){
        return reviewers;
    }

    function currentBalance() public view returns(uint){
        return totalMoney;
    }

        function getSummary()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint,
            uint,
            uint,
            uint,
            uint,
            uint,
            address
        )
    {
        return (
                productTitle,
    productDescription,
    productLiveLink,
    amountOfResponses,
    totalMoney,
    minAge,
    maxAge,
    reqMoney,
    reviews.length,
    manager
        );
    }

    function addReview(string memory reviewId) public {
        Review memory newReview = Review({
             cid: reviewId,
             approval: 0,
             from: msg.sender,
             rating: 11,
             paid: false
        });
        reviews.push(newReview);
        reviewers.push(msg.sender);
    }

    function rewardReviewer(uint amt, uint reviewIndex) public {
        // reviewer.transfer(amt);
        reviews[reviewIndex].from.transfer(amt);
        reviews[reviewIndex].paid = true;
        totalMoney = totalMoney - amt;
    }

    function rateReview(uint reviewIndex, uint rating) public {
        reviews[reviewIndex].rating = rating;
    }
    
    function approve(uint index) public notApproved(msg.sender) {
        // approval[]
        reviews[index].approval  = reviews[index].approval + 1;
        approval[msg.sender] = true;
    }
}
