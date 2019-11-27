
var btn = document.querySelector('.btn');
var text = document.querySelector('.text');
var list = document.querySelector('.list');
var body = document.querySelector('.body');
//此arrList必須如此宣告，在沒有任何值時為空陣列，若為有值的字串
var arrList = JSON.parse(localStorage.getItem('arrStorage')) || [];

function todoList(){
    var arrLen = arrList.length; //若為在todoList外宣告，會抓到上一次的arrLen
    localStorage.setItem('arrStorage',JSON.stringify(arrList))
    var str = '';  
    for (var i=0;i<arrLen;i++){
        str += '<li>' + '<a data-num=' + i + ' href="#">完成</a>   ' + arrList[i] + '</li>';
    }
    list.innerHTML = str;
    text.value = '';  //加入到代辦事項後清空input text內容
    text.focus();  //並將cursor鎖定在input text裡
}
todoList(); // 代辦事項已儲存在localStorage裡，在每次網頁重啟直接渲染

//儲存代辦事項
function saveText(){
    var value = text.value;
    if(value == ''){
        alert('輸入不可為空') //先確認input text內的值是否為空
    }
    else{
        arrList.push(value);
    }
    todoList();
}


//清除已完成事項
function delList(e){
    var del = e.target.nodeName;
    var num = e.target.dataset.num;
    if(del !== 'A'){return}
    arrList.splice(num,1)
    todoList();
}


// 新增功能:輸入完代辦事項後按enter，即可儲存
function enter(e){
    if(e.keyCode == 13){
        saveText();
    }
}


body.addEventListener('keydown',enter,false);
btn.addEventListener('click',saveText,false);
list.addEventListener('click',delList,false);