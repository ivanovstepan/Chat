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

	
	
}

function deleteLastMessage(){
	var messages = document.getElementsByClassName('SeeOneMessage');	
	if(!messages.length)return;
	var element  = messages[messages.length-1];
    element.parentNode.removeChild(element);


};
function editLastMessage(){
	var messages = document.getElementsByClassName('onlyMessage');
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

	
}

function NameAddButtonClick(){
	var MessageText = document.getElementById('NameText');
	addName(MessageText.value);
	MessageText.value = '';
	 document.getElementById("NameText").setAttribute('disabled',false);

}


function onAddButtonClick(){
	var MessageText = document.getElementById('MessageText');
	addMessage(MessageText.value);
	MessageText.value = '';
} 




function addMessage(value) {
	if(!value){
		return;
	}
	var item = createMessage(value);
	var items = document.getElementsByClassName('MessagesPlace')[0];
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
function createMessage(text){
	var divItem = document.createElement('div');
	divItem.classList.add('SeeOneMessage');
	divItem.id="userid";
	var spanItem_1 = document.createElement('span');
	var nameOfTheUser = document.getElementsByClassName('changeName')[0];
	spanItem_1.appendChild(document.createTextNode(nameOfTheUser.innerHTML+" : "));
	divItem.appendChild(spanItem_1);
	var spanItem_2 = document.createElement('span');
	spanItem_2.classList.add("onlyMessage");
	spanItem_2.appendChild(document.createTextNode(text));
	divItem.appendChild(spanItem_2);
	return divItem;
}

//edit Name
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


};

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
};