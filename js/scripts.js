var name;
function run(){
	var appContainer = document.getElementsByClassName('reader')[0];
	appContainer.addEventListener('click', delegateEvent);
	appContainer.addEventListener('change', delegateEvent);
	appContainer.addEventListener('click',delegateName);
	var messageText = document.getElementById("MessageText");
	messageText.addEventListener('keydown', function(e){
		if(e.keyCode == 13)
			onAddButtonClick(e);
	}
	)
	messageText.addEventListener('keydown', function(e){
		if(e.keyCode == 38)
			editLastMessage(e);
	}
	)
	messageText.addEventListener('keydown', function(e){
		if(e.keyCode == 40)
			deleteLastMessage(e);
	}
	)
	var messageList = restore();
	createAllMessages(messageList)
	
	
}
function createAllMessages(messageList) {
	
	for(var i = 0; i < messageList.length; i++)
		if(messageList[i].deleteMessage==false)
		addMessage(messageList[i]);
	 	addLastName(messageList[messageList.length-1]);
	
}
function addLastName(message){
	var MessageText = message.user;
	name=message.user;
	addName(name);
	document.getElementById("NameText").setAttribute('disabled',false);

}

//delete message
function deleteLastMessage(){
	var messages = document.getElementsByClassName('SeeOneMessage');	
	if(!messages.length)return;
	var element  = messages[messages.length-1];
	element.parentNode.removeChild(element);
	for(var i=messageList.length-1;i>=0;i--){
		if(messageList[i].id!=element.attributes['data'].value)
			continue;
		messageList[i].deleteMessage=true;
		store(messageList);
	}
    

}
//edit message
function editLastMessage(){
	var messages = document.getElementsByClassName('SeeOneMessage');
	if(!messages.length)return;
	var element  = messages[messages.length-1];
	for(var i=messageList.length-1;i>=0;i--){
		if(messageList[i].id!=element.attributes['data'].value)
			continue;
		messageList[i].deleteMessage=true;
		store(messageList);
	}
	document.getElementById("MessageText").value= element.lastChild.innerHTML;
	deleteLastMessage();
}

//evrything connected with name
function delegateName(evtObj){
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-name')){
		NameAddButtonClick(evtObj);
	}
}
function NameAddButtonClick(){
	var MessageText = document.getElementById('NameText');
	name=MessageText.value;
	addName(MessageText.value);
	MessageText.value = '';
	document.getElementById("NameText").setAttribute('disabled',false);

}

function addName(value){
	if(!value){
		return;
	}
	var item = createName(value);
	var divItem =document.createElement('div');
	divItem.classList.add('form-group');
	divItem.classList.add('user');
	divItem.setAttribute('id','user');
	divItem.appendChild(item);
	var items = document.getElementsByClassName('user')[0];
	items.appendChild(divItem);
}

function createName(text){
	var buttonItem = document.createElement('button');
	buttonItem.classList.add('btn');
	buttonItem.classList.add('btn-info');
	buttonItem.classList.add('form-group');
	buttonItem.classList.add('changeName');
	buttonItem.setAttribute('onclick','editName()');
	buttonItem.appendChild(document.createTextNode(text));
	return buttonItem;
}

 function editName() {
	document.getElementById("NameText").disabled= false;
 var user = document.getElementsByClassName("changeName");
 var element=user[user.length-1];
 document.getElementById("NameText").value= element.innerHTML; 

 deleteUser();
}
function deleteUser(){
	var users = document.getElementsByClassName('changeName');	
	var element  = users[users.length-1];
element.parentNode.removeChild(element);
} 



//message
function delegateEvent(evtObj) {
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-add')){
		onAddButtonClick(evtObj);
	}	
}

function onAddButtonClick(){
	var MessageText = document.getElementById('MessageText');
	var newMessage = theMessage(MessageText.value,name);
	if(MessageText.value == '')
		return;

	addMessage(newMessage);
	MessageText.value = '';
	store(messageList);
} 

function addMessage(message) {
	if(!message){
		return;
	}
	var item = createMessage(message);
	var items = document.getElementsByClassName('MessagesPlace')[0];
	messageList.push(message);
	items.appendChild(item);
}
function createMessage(text){
	var divItem = document.createElement('div');
	var htmlAsText = '<div class="SeeOneMessage" ><span> name : </span><span class="onlyMessage">text</span></div>';
	divItem.innerHTML= htmlAsText;
	updateItem(divItem.firstChild, text);
	return divItem.firstChild;
}

function updateItem(divItem, task){
	divItem.setAttribute('data', task.id);
	divItem.lastChild.textContent = task.description;
	divItem.firstChild.innerHTML=task.user +' : ' ;

} 

function checkConnect() {
   var some
   if(some){
   	var connected = document.getElementById('connect')
   connect.setAttribute('action','active');
}
   else{
   	var connected = document.getElementById('disconnect')
   connect.setAttribute('action','active');
}
}

var theMessage = function(text, userName,deleteMessage) {
	return {
		description:text,
		user: userName,
		id: uniqueId(),
		deleteMessage:!!deleteMessage,
	};
};
var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();
	return Math.floor(date * random).toString();
};
var messageList = [];

function store(listToSave) {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("Chat messageList", JSON.stringify(listToSave));
}
function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("Chat messageList");

	return item && JSON.parse(item);
}