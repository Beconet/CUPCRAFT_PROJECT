//set up
var loader = document.getElementById("preloader");

//container sidebar
let container_sidebar = document.getElementById("container_sidebar");

//add event icon
let home = document.getElementById("home_btn");
let dashboard = document.getElementById("dashboard_btn");
let record = document.getElementById("record_btn");


//set text open and close bar
let homeSidebar = document.getElementById("text_sidebar_home");
let dashboardSidebar = document.getElementById("text_sidebar_dashboard");
let recordSidebar = document.getElementById("text_sidebar_record");
//set open and close bar
let more_btn = document.getElementById("more_btn");

//container main right side
let container_right = document.getElementById("container-right");

//head_text
let headText = document.getElementById("head_text");

//home_page
let homePage = document.getElementById("home_page");
let dashboardPage = document.getElementById("dashboard_page");
let recordPage = document.getElementById("record_page");

//container_slip
let container_slip = document.getElementById("container_slip");



//reciep_box
let addtocart = document.getElementById("addOnCart");

let reduceOnCart = document.getElementById("reduceOnCart");



//count for open/close sidebar
let countForChange = 0;
let turn;

order = 1;
let orderNum = document.getElementById("orderNum");

orderNum.innerText = `Order ${order}`;
window.addEventListener("load",function(){
    setTimeout(() => {
        loader.style.display = "none";
      }, "250");
    
});


//home event
home.addEventListener('click',function(){
    homePage.style.display = "block";
    dashboardPage.style.display = "none";
    recordPage.style.display = "none";


    headText.innerHTML = "HOME PAGE";


    homeSidebar.style.color = "#FFF1E0";
    homeSidebar.style.backgroundColor = "#cabfb1";

    dashboardSidebar.style.color = "#a39a8f";
    dashboardSidebar.style.backgroundColor = "transparent";

    recordSidebar.style.color = "#a39a8f";
    recordSidebar.style.backgroundColor = "transparent";
})
//dashboard event
dashboard.addEventListener('click',function(){
    homePage.style.display = "none";
    dashboardPage.style.display = "block";
    recordPage.style.display = "none";

    headText.innerHTML = "DASHBOARD";


    homeSidebar.style.color = "#a39a8f";
    homeSidebar.style.backgroundColor = "transparent";

    dashboardSidebar.style.color = "#FFF1E0";
    dashboardSidebar.style.backgroundColor = "#cabfb1";

    recordSidebar.style.color = "#a39a8f";
    recordSidebar.style.backgroundColor = "transparent";
    
})
//record event
record.addEventListener('click',function(){
    homePage.style.display = "none";
    dashboardPage.style.display = "none";
    recordPage.style.display = "block";
    
    headText.innerHTML = "RECORD";


    homeSidebar.style.color = "#a39a8f";
    homeSidebar.style.backgroundColor = "transparent";


    dashboardSidebar.style.color = "#a39a8f";
    dashboardSidebar.style.backgroundColor = "transparent";
  

    recordSidebar.style.color = "#FFF1E0";
    recordSidebar.style.backgroundColor = "#cabfb1";

})
//open and close bar event
more_btn.addEventListener('click',function(){
    countForChange += 1;
    turn = countForChange;
    if(turn % 2 == 1 ){
        console.log("close");
        homeSidebar.innerHTML = " ";
        homeSidebar.style.height = "1px";

        dashboardSidebar.innerHTML = " ";
        dashboardSidebar.style.height = "1px";

        recordSidebar.innerHTML = " ";
        recordSidebar.style.height = "1px";

        more_btn.style.transform = "scaleX(-1)";
        container_sidebar.style.width = "120px";
        container_right.style.marginLeft ="200px";

        container_slip.style.display = "flex";
    }else if(turn % 2 == 0 ){
        console.log("open");
        homeSidebar.innerHTML = "HOME";
        homeSidebar.style.height = "35px";

        dashboardSidebar.innerHTML = "DASHBOARD";
        dashboardSidebar.style.height = "35px";

        recordSidebar.innerHTML = "RECORD";
        recordSidebar.style.height = "35px";

        more_btn.style.transform = "";
        container_sidebar.style.width = "200px";
        container_right.style.marginLeft ="260px";
        container_slip.style.display = "none";
    }else{
        console.log("error,please reset program");
    }
})

///////////////////////////////////////////////////////set cup////////////////////////////////////////////////
let cup;
let cupTotal;
let latteCup = 30;
let lattePrice = 125;
let numCart = 0; 

let name_menu = document.getElementById("name_menu");
let price_menu = document.getElementById("price_menu");


//set recipe
let subtotalPrice = document.getElementById("subtotal_price"); 
let discountPrice = document.getElementById("discount_price");
let taxPrice = document.getElementById("tax_price");
let totalPrice = document.getElementById("total_price");

let clearReceipt = document.getElementById("clear_receipt");

let cupAmount = document.getElementById("cup_amount");  


//payment recipe
let subP = 0;
let disP = 0;
let taxP = 0;
let totalP = 0;
let subtotalPrice_price;
let cart = {
    latte: {name:"latte",quantity: 0, amount: 30, price: 125, ID: 100001,count:0},
    americano: {name:"americano",quantity:0,amount:30,price:135,ID:100002,count:0},
    greentea: {name:"greentea",quantity:0,amount:45,price:100,ID:100003,count:0},
    cocoa: {name:"cocoa",quantity:0,amount:25,price:130,ID:100004,count:0},
    sweetmilk: {name:"sweetmilk",quantity:0,amount:30,price:130,ID:100005,count:0},
}

//set time in real world on payment
let paymentDate = document.getElementById("payment_date")
const now = new Date();
const currentDateTime  = now.toLocaleString();

const today = new Date();
const options = { year: 'numeric', month: '2-digit', day: 'numeric' };

const formattedDate = today.toLocaleString('en-US', options);



paymentDate.innerText = `Payment : ${currentDateTime}`

function addToCart(item){
    console.log(cart[item].name);
    if(cart[item].amount > 1){
        cart[item].amount -= 1;
        cart[item].quantity += 1;
        updateCartDisplay(item);
        plus(item);
        if(cart[item].count == 0){
            cart[item].count += 1;
            updateCartRecipe(item);
            
            let cq = document.getElementById(`cupAmount_${cart[item].name}`);
            cq.innerText = `${cart[item].quantity}`;
        }else{
            let cq = document.getElementById(`cupAmount_${cart[item].name}`);
            cq.innerText = `${cart[item].quantity}`;
        }
        collectData(item)
        

    }else if(cart[item].amount == 1){
        cart[item].amount -= 1;
        cart[item].quantity += 1;
        plus(item);

        let quantityElement = document.getElementById(`cupRemain_${item}`);
        quantityElement.innerText = `out of stock`;
        cq.innerText = `${cart[item].quantity}`;
    }    
}



function reduceFromCart(item){

    if(cart[item].quantity > 1){
        cart[item].amount += 1;
        cart[item].quantity -= 1;
        console.log(`${cart[item].quantity}`)
        updateCartDisplay(item);
        minus(item)
        let cq = document.getElementById(`cupAmount_${cart[item].name}`);
        cq.innerText = `${cart[item].quantity}`;
    }else if(cart[item].quantity == 1){
        cart[item].amount += 1;
        cart[item].quantity -= 1;
        cart[item].count -= 1;
        updateCartDisplay(item);
        minus(item)
        let reduceMenu = document.getElementById(`box_${cart[item].name}`);
        reduceMenu.remove();
    }
    collectData(item)
}
//collect item zone
let collectMenu = [];
let backUpMenu = [];
function collectData(item) {
    let total_price_menu = cart[item].quantity * cart[item].price;
    let found = false;

    for (let i = 0; i < collectMenu.length; i++) {
        if (collectMenu[i][0] === cart[item].name) {
            collectMenu[i][1] = cart[item].quantity;
            collectMenu[i][2] = total_price_menu;
            found = true;
            break; 
        }
    }

    if (!found) {
        collectMenu.push([cart[item].name, cart[item].quantity, total_price_menu]);
    }

    // Remove array if quantity is zero
    for (let i = 0; i < collectMenu.length; i++) {
        if (collectMenu[i][1] === 0) {
            collectMenu.splice(i, 1);
            i--; // 
        }
    }

    console.log(collectMenu);
}


//clear btn
let print = document.getElementById("saveandprint_btn");
let recipe_image = document.getElementById("recipe_image");
let checkSavePrint = 0;
let collect = 0;

let afterClickSavePrint = false;
//updateCartdDisplay
function updateCartDisplay(item){

    let quantityElement = document.getElementById(`cupRemain_${item}`);
    if(afterClickSavePrint == true){
        if(cart[item].count == 1){
            cart[item].count -=  1;
            reduceMenu = document.getElementById(`box_${cart[item].name}`);
            reduceMenu.remove();
        }
        cart[item].quantity = 0;

        let remainElement = document.getElementById(`cupRemain_${item}`);
        if(remainElement){
            quantityElement.innerText = `${cart[item].amount} cups remain`;
        }
    }
    clearReceipt.addEventListener('click',function(){
        console.log('reset button')
         //check count
        document.getElementById("customerName").value = "";
        document.getElementById("customerEmail").value = ""; 
        document.getElementById("customerCash").value = ""; 

        if(cart[item].count == 1){
            cart[item].count -=  1;
            reduceMenu = document.getElementById(`box_${cart[item].name}`);
            reduceMenu.remove();
        }
        //set amount and quantity
        cart[item].amount +=  cart[item].quantity;
        cart[item].quantity = 0;

        //set display
        let quantityElement = document.getElementById(`cupRemain_${item}`);
        if(quantityElement){
            quantityElement.innerText = `${cart[item].amount} cups remain`;
        }
        
        
        //reset recipe
        subP = 0;
        disP = 0;
        taxP = 0;
        totalP = 0;
        subtotalPrice.innerText = `${subP}$`;
        taxPrice.innerText = `${taxP}$`;
        totalPrice.innerText = `${totalP}$`;
        collectMenu = []
    });
    
    let redText = document.getElementById("redText");
    redText.style.display = "none";
    redText.innerText = "";
    

    if(quantityElement){
        quantityElement.innerText = `${cart[item].amount} cups remain`;
    }

    
}

//let redText = document.getElementById("redText");
//redText.style.display = "flex";
//redText.innerText = "Please Field only number on Customer Receive Cash";
let box_recipe = document.getElementById("box_recipe");


let recipe_container = document.getElementById("recipe_container")

let thxCustomerName = document.getElementById("thxCustomerName");
let thxCustomerEmail = document.getElementById("thxCustomerEmail");
let collectDataCustomer = []
let recordNoneMenu = document.getElementById("recordNoneMenu");
let latteAmount = 0
let americanoAmount = 0
let greenTeaAmount = 0
let CocoaAmount = 0
let sweetmilkAmount = 0
print.addEventListener('click', function () {
    let customerName = document.getElementById("customerName").value;
    let customerEmail = document.getElementById("customerEmail").value;
    let customerCash = document.getElementById("customerCash").value;
    

    if (collectMenu.length === 0) {
        redText.style.display = "flex";
        redText.innerText = "Please Select Menu";
        redText.style.fontSize = "";
    } else {
        if (customerName !== "") {
            if (!/^[A-Za-z]+$/.test(customerName)) {
                redText.style.display = "flex";
                redText.innerText = "Customer Name Should be letters only.";
                redText.style.fontSize = "15px";
                return; 
            }
        }

        if (customerEmail !== "") {
            if (!isValidEmail(customerEmail)) {
                redText.style.display = "flex";
                redText.innerText = "Invalid email address.";
                redText.style.fontSize = "";
                return; 
            }
        }

        if (customerCash !== "") {
            if (isNaN(customerCash) || isNaN(parseFloat(customerCash))) {
                redText.style.display = "flex";
                redText.innerText = "Cash Should input number only.";
                redText.style.fontSize = "18px";
                return; 
            }
            if(customerCash < totalP){
                redText.style.display = "flex";
                redText.innerText = "Cash Should more then total price";
                redText.style.fontSize = "18px";
                return; 
            }
        }

        redText.style.display = "none";
        redText.innerText = "";
        redText.style.fontSize = "";
        afterCheck();

    }
});


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function afterCheck(){
    let MenuList = ""
    for(let i = 0;i < collectMenu.length;i++){
        let splitMenu = `${collectMenu[i][0]} : x${collectMenu[i][1]} = ${collectMenu[i][2]}$` + "\n";
        MenuList += splitMenu;
    } 
    
    let text = `Confirm order?!\nPlease check order before click Ok.\n${MenuList}`;
    if (confirm(text) == true) {
        container_sidebar.style.display = 'none';
        container_right.style.display = 'none';
        headText.style.display = 'none';
        box_recipe.style.display = "block";
        console.log(collectMenu);


        let quereText = document.getElementById("quereText");
        quereText.innerText = `${order}`;
        order += 1
        orderNum.innerText = `Order ${order}`;

        let customerName = document.getElementById("customerName").value;
        let customerEmail = document.getElementById("customerEmail").value;
        let customerCash = document.getElementById("customerCash").value;
        console.log(customerName,customerEmail,customerCash)

        let receiveCashRrecipe = document.getElementById("receiveCash_recipe");
        let cashReceivedRecipe = document.getElementById("cashReceived_recipe");
        
        if(customerName != ""){
            thxCustomerName.innerText = `Thank you for using our service : ${customerName}!`;
        }else{
            customerName = "underdifind"
            thxCustomerName.innerText = `Thank you for using our service!`;
        }
        if(customerEmail != ""){
            thxCustomerEmail.innerText = `Custom Email : ${customerEmail}`;
        }else{
            customerEmail = "underdifind"
            thxCustomerEmail.innerText = ``;
        }
        if(customerCash != ""){
            let totalCash = customerCash - totalP
            receiveCashRrecipe.innerText = `Receive cash : ${customerCash}.-`
            cashReceivedRecipe.innerText = `Cash recived : ${totalCash.toFixed(2)}.-`

        }else{
            receiveCashRrecipe.innerText = ``
            cashReceivedRecipe.innerText = ``
        }

        for(let i = 0; i < collectMenu.length;i++){
            console.log(collectMenu[i])
            let menuDiv = document.createElement("div");
            menuDiv.classList.add("recipe_column");
            menuDiv.id = "menudiv"
            let menuBox = document.createElement("div");
            menuBox.classList.add("recipe_column_box");
            menuBox.id = "menuBox"
        
            let menuBoxLeft = document.createElement("div");
            menuBoxLeft.classList.add("recipe_column_box_left");
            let menuName = document.createElement("span");
            menuName.innerText= `${collectMenu[i][0]}`
    
            let menuBoxRight = document.createElement("div");
            menuBoxRight.classList.add("recipe_column_box_right");
            let menuAmount = document.createElement("span");
            menuAmount.classList.add("recipe_column_box_right_menuAmount");
            let menuPrice = document.createElement("span");
            menuPrice.classList.add("recipe_column_box_right_menuPrice");
            menuAmount.innerText= `X${collectMenu[i][1]}`
            menuPrice.innerText= `${collectMenu[i][2].toFixed(2)}.-`
    
            menuBoxRight.appendChild(menuAmount);
            menuBoxRight.appendChild(menuPrice);
    
            menuBoxLeft.appendChild(menuName);
    
            menuBox.appendChild(menuBoxLeft);
            menuBox.appendChild(menuBoxRight);
    
            menuDiv.appendChild(menuBox);
            recipe_container.appendChild(menuDiv);
            
            
        }
        //setpayment
        let texDiv = document.createElement("div");
        texDiv.classList.add("recipe_column");
        texDiv.id = "menudiv"
        let menuBox = document.createElement("div");
        menuBox.classList.add("recipe_column_box");
        menuBox.id = "menuBox"


        let menuBoxLeft = document.createElement("div");
        menuBoxLeft.classList.add("recipe_column_box_left");
        let taxName = document.createElement("span");
        taxName.innerText = "TAX"

        let menuBoxRight = document.createElement("div");
        menuBoxRight.classList.add("recipe_column_box_right");
        let menuAmount = document.createElement("span");
        menuAmount.classList.add("recipe_column_box_right_menuAmount");
        let menuPrice = document.createElement("span");
        menuPrice.classList.add("recipe_column_box_right_menuPrice");
        menuPrice.innerText= `${taxP.toFixed(2)}.-`
        menuAmount.innerText= ` `
        menuBoxRight.appendChild(menuAmount);
        menuBoxRight.appendChild(menuPrice);

        menuBoxLeft.appendChild(taxName);
        
        menuBox.appendChild(menuBoxLeft);
        menuBox.appendChild(menuBoxRight);

        texDiv.appendChild(menuBox);
        recipe_container.appendChild(texDiv);


        let paymentTotal = document.getElementById("payment_total");
        paymentTotal.innerText = `total : ${totalP.toFixed(2)}฿`
        let totalAmountRecipe = document.getElementById("totalAmount_recipe");
        totalAmountRecipe.innerText = `Total Amount : ${totalP.toFixed(2)}.-`

        window.print();
        recordNoneMenu.style.display  = "none";
        //after print all data collect and reset quantity then get back to home page
        backUpMenu = collectMenu;
        //let record = [no,productID,name,location,date,amount,status]
        updateRecord(collectMenu,customerName)
        //set for display 
        afterClickSavePrint = true;
        let nameMenuForReset;
        ////////////////////////chill chill///////////////////////
        useUpdatedValues();
        //console.log(latteAmount,americanoAmount,greenTeaAmount,CocoaAmount,sweetmilkAmount)
        afterClickSavePrint = false;
        subP = 0;
        disP = 0;
        taxP = 0;
        totalP = 0;
        subtotalPrice.innerText = `${subP}$`;
        taxPrice.innerText = `${taxP}$`;
        totalPrice.innerText = `${totalP}$`;
        collectMenu = []
        document.getElementById("customerName").value = "";
        document.getElementById("customerEmail").value = ""; 
        document.getElementById("customerCash").value = ""; 



        container_sidebar.style.display = 'block';
        container_right.style.display = 'block';
        headText.style.display = 'flex';
        box_recipe.style.display = "none"; 

        let recipeContainer = document.getElementById("recipe_container");
        let menuDiv = document.querySelectorAll("#menudiv");
        menuDiv.forEach(menuDiv => {
            recipeContainer.removeChild(menuDiv);
        });
       
    }
}
//Function to Update Value Amount and Chart in Dashboard

const topsale = document.getElementById('chart_topSales');
let chartTurn = false ;
function useUpdatedValues() {
    for(let i = 0; i < collectMenu.length;i++){
        nameMenuForReset = collectMenu[i][0]
        amountMenuForReset = collectMenu[i][1]
        updateCartDisplay(nameMenuForReset)
        if(nameMenuForReset == "latte"){
            latteAmount += amountMenuForReset;
        
        }else if(nameMenuForReset == "americano"){
            americanoAmount += amountMenuForReset;
        }
        else if(nameMenuForReset == "greentea"){
            greenTeaAmount += amountMenuForReset;
        }
        else if(nameMenuForReset == "cocoa"){
            CocoaAmount += amountMenuForReset;
        }
        else if(nameMenuForReset == "sweetmilk"){
            sweetmilkAmount += amountMenuForReset;
        }
    }
    console.log(chartTurn);
    if (chartTurn) {
        amountChart.destroy();
    }

    amountChart = new Chart(topsale, {
        type: 'bar',
        data: {
            labels: ['LATTE', 'AMERICANO', 'GREEN TEA', 'COCOA', 'SWEETMILK'],
            datasets: [{
                label: 'Cup Amount in month',
                data: [latteAmount, americanoAmount, greenTeaAmount, CocoaAmount, sweetmilkAmount],
                backgroundColor: [
                    'rgb(255, 152, 61)',
                    'rgb(148, 74, 0)',
                    'rgb(255, 204, 94)',
                    'rgb(110, 71, 0)',
                    'rgb(255, 191, 191)',
                ],
                borderWidth: 1
            }]
        },
        options: {

        }
    });
    console.log(amountChart);
    chartTurn = true;

}
// append Menu select here
let container = document.getElementById("menu_select_box");

function updateCartRecipe(item){
    let coffeeDiv = document.createElement("div");
    coffeeDiv.classList.add("menu_amount_box");
    coffeeDiv.id = `box_${item}`;

    let coffeeImg = document.createElement("img")
    coffeeImg.classList.add("in_select_box");
    coffeeImg.src = `images/MENU/${item}.png`;
    coffeeImg.alt = ` ${item} image`;
    
    let coffeeName = document.createElement("span")
    coffeeName.innerText = `${item}`;

    let coffeeMinus = document.createElement("img")
    coffeeMinus.classList.add("btn_add_on_cart_smail");
    coffeeMinus.src = `images/icon/Reduce_icon.png`;
    coffeeMinus.alt = "Minus image button";
    coffeeMinus.addEventListener('click',function(){
        reduceFromCart(`${item}`);
    });

    let coffeeQuantity = document.createElement("span")
    coffeeQuantity.id = `cupAmount_${item}`;

    let coffeePlus = document.createElement("img")
    coffeePlus.classList.add("btn_add_on_cart_smail");
    coffeePlus.src = `images/icon/add_icon.png`;
    coffeePlus.alt = `Plus image button`;
    coffeePlus.addEventListener('click',function(){
        addToCart(`${item}`);
    });

    coffeeDiv.appendChild(coffeeImg);

    coffeeDiv.appendChild(coffeeName);
    coffeeDiv.appendChild(coffeeMinus);
    coffeeDiv.appendChild(coffeeQuantity);
    coffeeDiv.appendChild(coffeePlus);
    
    container.appendChild(coffeeDiv);
}


function plus(item){
    subtotalPrice_price = cart[item].price;
    subP = subP + subtotalPrice_price ;
    subtotalPrice.innerText = `${subP}$`;

    discountPrice.innerText = `0$`;
     
    taxP = subP * 0.07;
    taxPrice.innerText = `${taxP.toFixed(2)}$`;


    totalP = subP + disP + taxP;
    totalPrice.innerText = `${totalP.toFixed(2)}$`;
}

function minus(item){
    subtotalPrice_price = cart[item].price;
    subP = subP - subtotalPrice_price ;
    subtotalPrice.innerText = `${subP}$`;

    discountPrice.innerText = `0$`;
     
    taxP = subP * 0.07;
    taxPrice.innerText = `${taxP.toFixed(2)}$`;


    totalP = subP + disP + taxP;
    totalPrice.innerText = `${totalP.toFixed(2)}$`;
}
let recordOrder = 0;
let recordUserBox = document.getElementById("recordUserBox");
function updateRecord(dataMenu,userName){
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: 'numeric' };

    const formattedDate = today.toLocaleString('en-US', options);

    console.log(dataMenu);
    let productID = '';
    for(let i = 0 ; i < dataMenu.length; i++){  

    recordOrder += 1;
    let nameMenu = dataMenu[i][0]
    nameMenu = nameMenu.toLowerCase()

    if(nameMenu == "latte"){
        productID = "100001"
    
    }else if(nameMenu == "americano"){
        productID = "100002"
    }
    else if(nameMenu == "greentea"){
        productID = "100003"
    }
    else if(nameMenu == "cocoa"){
        productID = "100004"
    }
    else if(nameMenu == "sweetmilk"){
        productID = "100005"
    }

    let recordDiv = document.createElement("div");
    recordDiv.classList.add('recordDiv');

    let no = document.createElement("span");
    let img = document.createElement("img");
    let proID = document.createElement("span");
    let username = document.createElement("span");
    let location = document.createElement("span");
    let formantdate = document.createElement("span");
    let amount = document.createElement("span");
    let status = document.createElement("span");

    no.classList.add("group1");
    img.classList.add("img_record");
    proID.classList.add("group2");
    username.classList.add("group3");
    location.classList.add("group4");
    formantdate.classList.add("group5");
    amount.classList.add("group6");
    status.classList.add("group7");

    no.innerText = `${recordOrder}.`
    img.src = `images/MENU/${nameMenu}.png`;
    img.alt = ` ${nameMenu} image`;
    proID.innerText = `${productID}`
    username.innerText = `${userName.toUpperCase()}`
    location.innerText = `ICONSIAM`
    formantdate.innerText = `${formattedDate}`
    amount.innerText = `${dataMenu[i][1]}`
    status.innerText = `COMPLETE`
    status.style.color = "#42A34B"

    recordDiv.appendChild(no);
    recordDiv.appendChild(img);
    recordDiv.appendChild(proID);
    recordDiv.appendChild(username);
    recordDiv.appendChild(location);
    recordDiv.appendChild(formantdate);
    recordDiv.appendChild(amount);
    recordDiv.appendChild(status);

    recordUserBox.appendChild(recordDiv);
    console.log(recordOrder,productID,userName.toUpperCase(),"ICONSIAM",formattedDate,dataMenu[i][1],"COMPLETE")
    }
}
////////////////////////////////////dashboard chart/////////////////////////////////////////////

const monthChart = document.getElementById('monthChart');
              
new Chart(monthChart, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April ', 'May', 'June','July','August ','September','October ','November','December'],
    datasets: [{
      label: 'SALES',
      data: [12, 19, 3, 5, 2, 3, 19, 3, 5, 2, 3,9],
      borderWidth: 4
    },{
      label: 'COST',
      data: [11, 13, 24, 1, 22, 1, 19, 3, 6, 4, 7,12],
      borderWidth: 4
    },{
      label: 'PROFIT',
      data: [7, 3, 7, 4, 8, 14, 15, 20, 13, 5, 1,2],
      borderWidth: 4
    },{
      label: 'ORDER',
      data: [2, 1, 27, 4, 7, 5, 8, 9,17, 20,5,1],
      borderWidth: 4
    }]
  },
  options: {
  }
});
