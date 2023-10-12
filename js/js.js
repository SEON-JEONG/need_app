// 지운 li를 localstorage 에 반영
// 삭제 추가를 하다보면 id 값이 꼬임 => id값을 고유한 값으로 바꿈

const items = document.querySelector('.items')  //ul.items
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footer_addBtn') 

let id = 0;
let shoppingLists = []; // 입력한 내용을 넣을 배열 선언


//로컬 스토리지에 배열을 집어넣는 함수 정의
const save = ()=>{
  localStorage.setItem('shopList',JSON.stringify(shoppingLists))
}


// localStorage에 저장된 것을 가져오는 함수
    const init =() =>{
      if(!localStorage.key('shopList')){
        return;
      }
      const userList = JSON.parse(localStorage.getItem('shopList'));

      if(userList){
      userList.forEach(obj => {
        creatItem(obj);
        shoppingLists = userList;
      });
    }
  }
    init();


  const onAdd = () =>{
    const list = {
      id:Date.now(), // UTC시간부터 현재까지 몇초 지났는지 - id이용 (id값 꼬이지 않게)
      text:input.value
    }

    if (list.text == ''){ // 입력내용이 없을때는 작동안되게!!
      input.focus();
      return;
    }

    shoppingLists.push(list);
    save() //배열을 저장하는 함수 실행

creatItem(list);

  input.value = '';
  input.focus();

}


  // 새로운 아이템을 만드는 함수 정의
  function creatItem(list){
    const itemRow = document.createElement('li');
    itemRow.className = 'item_row'
    itemRow.setAttribute('data-id',list.id);


    itemRow.innerHTML = `
    <div class="item">
          <span class="item_name">${list.text}</span>
          <button class="item_delBtn">
            <i class="fa-solid fa-trash-can" data-id=${list.id}></i>
          </button>
        </div>
        <div class="item_divider"></div>
        `




    items.append(itemRow)
    itemRow.scrollIntoView();
    return itemRow
  }
  
addBtn.addEventListener('click', onAdd)

// 엔터를 쳤을때에도 입력이 되게!!!!!!!!!!!
input.addEventListener('keypress', event =>{
  event.key === 'Enter' && onAdd();
})





// 이벤트 위임을 이용한 삭제 (쓰레기통을 클릭했을때 삭제)
// 쓰레기통을 클릭하면 delete-id값을 알아와서 그와 같은 값의 li를 찾고 그 li가 삭제되게



items.addEventListener('click', e =>{
  const clickId = e.target.dataset.id;
  if(clickId){
    const toBeDeleted =document.querySelector(`.item_row[data-id="${clickId}"]`);
  toBeDeleted.remove();



  // localStorage도 삭제
  shoppingLists = shoppingLists.filter( aa => aa.id != clickId)
  save()
  }
})
