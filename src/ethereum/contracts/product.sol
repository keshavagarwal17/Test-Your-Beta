pragma solidity >=0.4.17;

contract company{
    product[] public deployedProducts;
    uint numberOfProducts;
    mapping(address=>product[]) allProducts;

      modifier NotZero(uint responses, uint money){
        require(responses != 0);
        require(money != 0);
        _;
    }

    function addAProduct(string memory title,string memory desc,string memory livelink,uint responses,uint money, uint ageMin, uint ageMax, string memory gender) public NotZero(responses,money){
        product newProduct = new product(title,desc,livelink,responses,money, ageMin, ageMax, gender);
        allProducts[msg.sender].push(newProduct);
        deployedProducts.push(newProduct);
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
    }
    mapping(address => bool) approval;
    string productTitle;
    string productDescription;
    string productLiveLink;
    uint amountOfResponses;
    uint totalMoney;
    uint minAge;
    uint maxAge;
    string sex;
    Review[] public reviews;
    mapping(address=>uint) Ratings;
    address[] public reviewers;
    mapping(address=>Review) reviewByUser;


    modifier NotZero(uint responses, uint money){
        require(responses != 0);
        require(money != 0);
        _;
    }

    modifier notApproved(address approver) {
        require(approval[approver] != true);
        _;
    }
    constructor(string memory title,string memory desc,string memory livelink,uint responses,uint money,uint ageMin, uint ageMax, string memory gender) NotZero(responses,money){
        productTitle = title;
        productDescription = desc;
        totalMoney = money;
        productLiveLink = livelink;
        amountOfResponses = responses;
        minAge = ageMin;
        maxAge = ageMax;
        sex = gender;
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
            string memory,
            uint
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
    sex,
    reviews.length
        );
    }

    function addReview(string memory reviewId) public {
        Review memory newReview = Review({
             cid: reviewId,
             approval: 0,
             from: msg.sender,
             rating: 11
        });
        reviews.push(newReview);
        reviewers.push(msg.sender);
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
