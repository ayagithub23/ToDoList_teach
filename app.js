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

$("#addTodoBtn").on("click",function(event){
    event.preventDefault();
    // 從jquery抓出來的東西加個$字號
    var $addTodoInput = $("#addTodoInput");
    var newTodoText = $addTodoInput.val();
    // 如果使用者都沒輸入的話,結束函數
    // if(!newTodoText){ return;}
    // https://momentjs.com/
    if(!newTodoText) return;
    $("ul").append(`<li>${newTodoText}  ${moment().format("MM/DD hh:mm")}</li>`);
    $addTodoInput.val("");
});
// moment().format("YYYY/MM/DD hh:mm:ss");
// moment("1992-09-29").format("YYYY/MM/DD hh:mm:ss");