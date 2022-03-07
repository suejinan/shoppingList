'use strict';

const input = document.querySelector('.input__text');
const add = document.querySelector('.add');
const list = document.querySelector('ul')

add.addEventListener('click', addItem);
input.addEventListener('keypress',(e)=>{
  const key = e.key;
  if(key === 'Enter') addItem();
});

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

function createItem(input) {
  const newItem = document.createElement('li');
  const text = document.createElement('div');

  text.innerHTML = input;
  text.setAttribute('class','text');
  text.addEventListener('click', ()=>{
    text.classList.toggle('checked');
  });
  
  const btnDel = document.createElement('button');
  btnDel.innerHTML= '<i class="fa-regular fa-trash-can"></i>';
  btnDel.setAttribute('class','delete');
  btnDel.addEventListener('click', ()=> {
      list.removeChild(newItem);
  });
  
  newItem.appendChild(text);
  newItem.appendChild(btnDel);
    
  newItem.addEventListener('mouseover', () => {
    btnDel.classList.add('hover');
  });
  newItem.addEventListener('mouseout', () => {
    btnDel.classList.remove('hover');
  });
  
  return newItem;
}