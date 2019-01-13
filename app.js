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

function render(todoData) {
    moment.locale('zh-tw');
    var $errorMsg = $("#errorMsg");
    var $addTodoInput = $("#addTodoInput");
    var HTML = "";
    var $ul = $("ul");
    for (var i = 0; i < todoData.length; i++) {
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
    $("#errorMsg").text("");
    $ul.append(HTML);
    // $addTodoInput.val("");
    // $errorMsg.text("");
}


// function validate(e){
//     var isValid = true;
//     if(e === ""){
//         isValid = false;
//     }
//     for(var i=0;i<todoData.length;i++){
//         if(e===todoData[i].content){
//             isValid = false;
//         }
//     }
//     return isValid;
// }
function errorRender(){
    $("#errorMsg").text(errorMsgData);
    
}
function validate(newTodoText){
    var isValid = true;
    if(newTodoText === ""){
        errorMsgData = "請輸入內容";
        isValid = false;
        
    }
    for(var i=0;i<todoData.length;i++){
        if(newTodoText===todoData[i].content){
            errorMsgData = "重複輸入";
            isValid = false;
        }
    }
    return isValid;
}

render(todoData);



$("#addTodoBtn").on("click", function () {
    // 阻止li消失的狀況，所以加上event.preventDefault();
    event.preventDefault();
    var $addTodoInput = $("#addTodoInput");
    // 修剪（）方法從字符串的兩側去除空格。
    var newTodoText = $addTodoInput.val().trim();
    moment.locale('zh-tw');
    
    // [2019-01-07]validate 接 newTodoData.content:newTodoText的值
    var isValid = validate(newTodoText);
    // 當我執行validate函式，檢查是否合法 newTodoText
    if(isValid === false){
        errorRender();
        return isValid;

    }
    var newTodoData = {
        // newTodoText 輸入得值
        id: uuid(),
        content: newTodoText,
        createdAt: moment().valueOf()
    };
    todoData.push(newTodoData);
    render(todoData);
});


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
    render(todoData);
});