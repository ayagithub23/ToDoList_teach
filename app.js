// jQuery 程式庫
// $(css選擇器).事件監聽器
// $(css選擇器).取用元素內部內容
// document.querySelectorAll("header").classList.add("top");
// $().on("監聽的事件內容","要執行的函數");
// $('#header').html();
// $('#header').attr("class","top");
// $("#inputArea button").on("click",function(){
//     alert("我被點擊了");
// });


// 取消事件預設行為preventDefault

// $("#addTodoBtn").on("click",function(event){
//     event.preventDefault();
//     var newTodo = $("#addTodoInput").val();
//     $("ul").append(`<li>${newTodo}</li>`);
//     console.log(newTodo);
//     var newTodo = $("#addTodoInput").val("");
// });

// 取消事件預設行為preventDefault

// $("#addTodoBtn").on("click",function(event){
//     event.preventDefault();
//     // 從jquery抓出來的東西加個$字號
//     var $addTodoInput = $("#addTodoInput");
//     var newTodoText = $addTodoInput.val();
//     // 如果使用者都沒輸入的話,結束函數
//     // if(!newTodoText){ return;}
//     // https://momentjs.com/
//     if(!newTodoText) return;
//     $("ul").append(`<li>${newTodoText}  ${moment().format("MM/DD hh:mm")}</li>`);
//     $addTodoInput.val("");
// });
// moment().format("YYYY/MM/DD hh:mm:ss");
// moment("1992-09-29").format("YYYY/MM/DD hh:mm:ss");

// $("#inputArea button").on("click",function(){
//     alert("點我Button");
// });
// $("#inputArea input[type='button']").on("click",function(){
//     alert("點我InputButton");
// });
// $("#inputArea input[type='submit']").on("click",function(){
//     alert("點我InputSubmit");
// });

// [2018-12-22] 01. 設一個物件，為了要印在HTML上。
var todoData = [{
        id: uuid(),
        content: "吃午餐",
        createdAt: 1
    },
    {
        id: uuid(),
        content: "吃晚餐",
        createdAt: 1000
    }
];

var errorMsgData = "";


console.log(todoData);

function render(todoData, newTodoText, isInitial) {
    moment.locale('zh-tw');
    var $errorMsg = $("#errorMsg");
    var $addTodoInput = $("#addTodoInput");
    var HTML = "";
    var $ul = $("ul");
    // [2018-12-22] 04. 建立迴圈，因為寫成i<=todoData.length，導致找不到資料，會出問題
    // [2018-12-22] app.js:32 Uncaught TypeError: Cannot read property 'content' of undefined at render
    for (var i = 0; i < todoData.length; i++) {
        // [2018-12-22] 如果輸入i變數的情況下
        // [2018-12-22] app.js:32 Uncaught TypeError: Cannot read property 'content' of undefined at render
        // [2018-12-22] 04. 其實我也可以這樣做
        // $("ul").append(`<li><span class="delete"><button>刪除</button></span>${todoData[i].content} ${moment().format('llll')}</li>`);
        // [2018-12-22] X錯誤 [2018-12-22] 04. 如果加了兩個點點"delete"按鈕樣式會不見。
        HTML = HTML +
            `<li id="${todoData[i].id}"><span><button class="delete">刪除</button></span>
            ${todoData[i].content}
            ${moment().format('llll')}
            </li>`
        // [2018-12-22] 不懂 CREATEAT ${moment(todoData[i].createdAt).format("MM/DD hh:mm")}
    };
    $("ul").empty();
    $errorMsgData = "";
    $ul.append(HTML);
    $addTodoInput.val("");
    $errorMsg.text("");
}

function renderErr() {
    var $errorMsg = $("#errorMsg");
    var $addTodoInput = $("#addTodoInput");
    $errorMsg.text(errorMsgData);
    $errorMsgData = "";
    $addTodoInput.val("");
}



function validate(newTodoText) {
    var isValid = true;

    // 驗證資料，若資料合法回傳true;
    // 第一關，驗證是否空值，若是者把isVailid改false
    // 三元運算子
    // isValid = newTodoText ? ture : false;
    // var a = 1+1===2 ? "正確" : "錯誤";
    // var a;
    // if(1+1===2){
    //     a = "正確";
    // }else{
    //     a = "錯誤";
    // }
    if (!newTodoText) {
        errorMsgData = "請輸入內容";
        isValid = false;
    }



    // 第二關，驗證是否重複，若是者把isVailid改false
    // forEach 只能用在陣列上
    // forEach 無法中斷
    // todoData.forEach(function(eachTodo){
    // if(eachTodo.content===newTodoText){
    //     isValid = false;
    // }
    // });
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].content === newTodoText) {
            isValid = false;
            errorMsgData = "重複輸入";
        }
    }
    // 若資料不合法，回傳false
    return isValid;
};


render(todoData, "", true);



$("#addTodoBtn").on("click", function () {
    // alert("點我Button");
    // preventDefault() 方法阻止元素發生默認的行為（例如，當點擊提交按鈕時阻止對表單的提交）。
    // https://goo.gl/uAWuJS
    // 阻止li消失的狀況，所以加上event.preventDefault();
    event.preventDefault();
    // 從jquery抓出來的東西加個$字號
    var $addTodoInput = $("#addTodoInput");
    // var str = "       Hello World!        ";
    // alert(str.trim());
    // 修剪（）方法從字符串的兩側去除空格。
    // string.trim()
    // https://www.w3schools.com/jsref/jsref_trim_string.asp
    var newTodoText = $addTodoInput.val().trim();
    // console.log("測試input是否真的有值出現" + $("#addTodoInput").val());
    // 中文化
    moment.locale('zh-tw');
    // [2018-12-22] 05. 如果沒在 addTodoInput 輸入資料的話，那就不會出現LI，順序很重要，不能夠再APPEND下面，否則這功能會失效。

    // [2018-12-22] 06. 使用者資料存進新的物件(建立新的物件)

    var isValid = validate(newTodoText);
    if (!isValid) {
        renderErr();
        return;
    }

    var newTodoData = {
        // newTodoText 輸入得值
        id: uuid(),
        content: newTodoText,
        createdAt: moment().valueOf()
    };

    // [2018-12-22] 06. 如果我不想用push的方式，而是建立一支新物件，我該怎麼做。
    // var newTodoData = {
    //     content: newTodoText,
    //     createdAt: moment().valueOf()
    // };
    // $("ul").append(`<li><span class="delete"><button>刪除</button></span>
    // ${newTodoData.content} 
    // ${moment().format('llll')}
    // </li>`);
    // console.log(newTodoData);

    // [2018-12-22] 07. 新的物件陣列，push進todoData
    todoData.push(newTodoData);
    render(todoData);
});
// https://momentjs.com/
// moment().format('MMMM Do YYYY, h:mm:ss a');


// [2018-12-22] 03. 新增刪除按鈕 
$("ul").on("click", ".delete", function () {
    // $(this).parent("li").remove();
    // 先刪掉資料庫裡的資料
    var idToDelete = $(this).parents("li").attr("id");
    // alert(idToDelete);
    // 將匹配元素集合縮減為匹配選擇器或匹配函數返回值的新元素。
    todoData = todoData.filter(function (todo) {
        if (todo.id === idToDelete) return false;
        else return true;
    });
    render(todoData, "", false);
});