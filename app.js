// jQuery 程式庫
// $(css選擇器).事件監聽器
// $(css選擇器).取用元素內部內容
// document.querySelectorAll("header").classList.add("top");
// $().on("監聽的事件內容","要執行的函數");
$('#header').html();
$('#header').attr("class","top");

$("#inputArea button").on("click",function(){
    alert("我被點擊了");
})