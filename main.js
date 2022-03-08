'use strict';

const input = document.querySelector('.input__text');
const add = document.querySelector('.add');
const list = document.querySelector('ul')

add.addEventListener('click', addItem);
input.addEventListener('keypress',(e)=>{
  const key = e.key;
  if(key === 'Enter') addItem();
});

// 추후 UI 변경에 따른 버그 방지로 태그사용해 부모/자식 호출방식 지양
// 이벤트 위임 (event deligation)
list.addEventListener('click', event => {
  const target = event.target;
  const itemId = target.dataset.id;
  const targetId = target.dataset.target_id;
  if (itemId) {
    const toggleItem = document.querySelector(`.item[data-id="${itemId}"]`);
    toggleItem.classList.toggle('checked');
  }

  if (targetId) {
    const delItem = document.querySelector(`.row[data-id="${targetId}"]`);
    delItem.remove();
  }

});

// 신규 아이템 추가
function addItem() {
  if(input.value.trim() !== '') {
    const newItem = createItem(input.value);
    list.appendChild(newItem);
  
    console.log(`Add a new item [${input.value}]`);
    newItem.scrollIntoView();
  }

  input.value='';
  input.focus();
}

// 아이템 생성
let id = 0;
function createItem(input) {
  const newItem = document.createElement('li');
  newItem.setAttribute('class', 'row')
  newItem.setAttribute('data-id', id);

  newItem.innerHTML = `
    <div class="item" data-id=${id}>
      <span class="item_text" data-id=${id}>${input}</span>
      <button class="delete">
        <i class="fa-regular fa-trash-can" data-target_id = ${id}></i>
      </button>
    </div>
  `;
  
  id++;
  return newItem;
}