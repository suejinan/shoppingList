'use strict';

const input = document.querySelector('.input__text');
const add = document.querySelector('.add');
const list = document.querySelector('ul')

add.addEventListener('click', addItem);
input.addEventListener('keypress',(e)=>{
  const key = e.key;
  if(key === 'Enter') addItem();
});

// 이벤트 위임 (event deligation)
list.addEventListener('click', event => {
  const tagName = event.target.tagName;
  if (tagName == 'LI') {
    event.target.classList.toggle('checked');
  } else if (tagName == 'DIV') {
    event.target.parentNode.classList.toggle('checked');
  }

  if (tagName == 'I') { // trash can icon
    const parent = event.target.parentElement.parentElement;
    list.removeChild(parent);
  }

});

list.addEventListener('mouseover', (event) => {
  if (event.target.tagName == 'LI') {
    const child = event.target.querySelector('.delete');
    child.classList.add('hover');
  }
});

list.addEventListener('mouseout', (event) => {
  if (event.target.tagName == 'LI') {
    const child = event.target.querySelector('.delete');
    child.classList.remove('hover');
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
function createItem(input) {
  const newItem = document.createElement('li');
  const text = document.createElement('div');

  text.innerHTML = input;
  text.setAttribute('class','text');
  
  const btnDel = document.createElement('button');
  btnDel.innerHTML= '<i class="fa-regular fa-trash-can"></i>';
  btnDel.setAttribute('class','delete');
  
  newItem.appendChild(text);
  newItem.appendChild(btnDel);
  
  return newItem;
}