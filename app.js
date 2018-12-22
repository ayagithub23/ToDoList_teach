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

var todoData = [
    {
        content: "吃午餐",
        createdAt: 1
    },
    {
        content: "吃晚餐",
        createdAt: 1000
    }
];

// 讀取資料
function render(todoData){
    // 把資料渲染到螢幕上
    var $ul = $("ul");
    var HTML = "";

    for(var i = 0; i < todoData.length; i++){
        HTML = HTML + `
        <li>
            <span class="delete">
                刪除
            </span>
            ${todoData[i].content}
            ${moment(todoData[i].createdAt).format("MM/DD hh:mm")}
        </li>`;
    };

    $ul.append(HTML);

};

render(todoData);


// 寫入資料
$("#addTodoBtn").on("click", function(event){
    event.preventDefault();
    var $addTodoInput = $("#addTodoInput");
    var newTodoText = $addTodoInput.val().trim();

    // 如果使用者啥都沒輸入
    if(!newTodoText) return;

    // 把使用者輸入的資料存進todoData
    var newTodoData = {
        content: newTodoText,
        createdAt: moment().valueOf()
    };

    todoData.push(newTodoData);

    
    // 清空畫面
    $("ul").empty();

    // 再次render todoData
    render(todoData);


    // $("ul").append(`<li><span class="delete">刪除</span>${newTodoText}${moment().format("MM/DD hh:mm")}</li>`);

    $addTodoInput.val("");
});


$("ul").on("click", ".delete", function(){
    // 我要刪掉誰？
    $(this).parent("li").remove();
});