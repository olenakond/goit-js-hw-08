import throttle from 'lodash.throttle';

const emailElement = document.querySelector('input');
const messageElement = document.querySelector('textarea');
const buttonElement = document.querySelector('button');
const formElement = document.querySelector('.feedback-form');

emailElement.addEventListener('input', throttle(onEmailInput, 500));
messageElement.addEventListener('input', throttle(onMessageInput, 500));
buttonElement.addEventListener('click', onButtonClick);

const setStorageData = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const getStorageData = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

let formData = getStorageData('feedback-form-state') || {email: "", message: ""};

if (formData) {
  emailElement.value = formData.email;
  messageElement.value = formData.message;
}

function onEmailInput(event) {
  formData.email = event.target.value;
  setStorageData('feedback-form-state', formData);
}

function onMessageInput(event) {
  formData.message = event.target.value.trim();
  setStorageData('feedback-form-state', formData);
}

function onButtonClick(event) {
  event.preventDefault();

  if (formData.email && formData.message){
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formElement.reset(); 
  formData = {email: "", message: ""};
  } else {
    alert('All fields must be filled!');
  }
}
