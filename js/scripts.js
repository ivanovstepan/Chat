function run(){
	var appContainer = document.getElementsByClassName('reader')[0];
	appContainer.addEventListener('click', delegateEvent);
	appContainer.addEventListener('change', delegateEvent);
	appContainer.addEventListener('click',delegateName);
	var messageText = document.getElementById("MessageText");
	messageText.addEventListener('keydown', function(e){
		if(e.keyCode == 13)
			onAddButtonClick(e);
	})
	
	
}

function deleteLastMessage(){
	var messages = document.getElementsByClassName('SeeOneMessage');	
	if(!messages.length)return;
	var element  = messages[messages.length-1];
	
element.parentNode.removeChild(element);


};
function editLastMessage(){
	var messages = document.getElementsByClassName('SeeOneMessage');
	if(!messages.length)return;
	var element  = messages[messages.length-1];
	
	document.getElementById("MessageText").value= element.innerHTML;
deleteLastMessage();

};


function delegateName(evtObj){
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-name')){
		NameAddButtonClick(evtObj);
	}
}

function delegateEvent(evtObj) {
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-add')){
		onAddButtonClick(evtObj);
	}

	if(evtObj.type === 'change' && evtObj.target.nodeName == 'INPUT'){
		var labelEl = evtObj.target.parentElement;
		onToggleItem(labelEl);
	}
}

function NameAddButtonClick(){
	var MessageText = document.getElementById('NameText');
	addName(MessageText.value);
	MessageText.value = '';

}


function onAddButtonClick(){
	var MessageText = document.getElementById('MessageText');
	addTodo(MessageText.value);
	MessageText.value = '';
} 


function onToggleItem(labelEl) {
	if(labelEl.classList.contains('SeeOneMessage')) {
		labelEl.classList.remove('SeeOneMessage');
	}
	else {
		labelEl.classList.add('SeeOneMessage');
	}
}

function addTodo(value) {
	if(!value){
		return;
	}
	var item = createItem(value);
	var items = document.getElementsByClassName('SeeMessages')[0];
	items.appendChild(item);
}
function addName(value){
	if(!value){
		return;
	}
	var item = createName(value);
	var divItem =document.createElement('div');
	divItem.classList.add('form-group');
	divItem.classList.add('user');
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
function createItem(text){
	var divItem = document.createElement('div');
	divItem.classList.add('SeeOneMessage');
	divItem.id="userid";
	divItem.appendChild(document.createTextNode(text));
	return divItem;
}

//edit Name
 function editName() {
 var user = document.getElementsByClassName("changeName");
 var element=user[user.length-1];
 document.getElementById("NameText").value= element.innerHTML; 
 deleteUser();
}
function deleteUser(){
	var users = document.getElementsByClassName('changeName');	
	var element  = users[users.length-1];
element.parentNode.removeChild(element);


};

function checkConnect() {
   var some
   if(some)
   	var connected = document.getElementById('connect')
   connect.setAttribute('action','active');
   else
   	var connected = document.getElementById('disconnect')
   connect.setAttribute('action','active');
};