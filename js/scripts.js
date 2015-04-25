	var name;
	var change =0;
		var theMessage = function(text, userName,id) {
		return {
			message:text,
			user: userName,
			id: id,
		};
	};
	var uniqueId = function() {
		var date = Date.now();
		var random = Math.random() * Math.random();
		return Math.floor(date * random).toString();
	};
	var messageList = [];

	var appState = {
		mainUrl : 'http://localhost:999/chat',
		history:[],
		token : 'TN11EN'
	};
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
		getAllMessages();
		//обновляется все сообщения
		updateMessages();		
	}

		function getAllMessages (continueWith) {
		var url = appState.mainUrl + '?token=' + appState.token;
		get(url, function(responseText) {
		var response = JSON.parse(responseText);

        createAllMessages(response.messages);

        continueWith && continueWith();
    });
		
	}

	function createAllMessages(messageList) {
		for(var i = 0; i < messageList.length; i++)
			addMessage(messageList[i]);
		
	}
	/*function addLastName(message){
		name=message.user;
		addName(name);
		document.getElementById("NameText").setAttribute('disabled',false);
	}*/


	function deleteLastMessage(){
		var messages = document.getElementsByClassName('SeeOneMessage');	
		if(!messages.length)return;
		var element  = messages[messages.length-1];
		deleteMessageFromServer(messages.length-1,function () {});
		element.innerHTML="deleted"
		for(var i=messageList.length-1;i>=0;i--){
			if(messageList[i].id!=element.attributes['data'].value)
				continue;
			messageList[i].deleteMessage=true;
		}
		

	}

	function deleteMessageFromServer(index,continueWith) {
		 var indexToken = index*8+11; 
		 var url = appState.mainUrl + '?token=' + "TN" +indexToken.toString() + "EN";
		    del(url, function () {
		     continueWith && continueWith();
		    });
}

	function editLastMessage(){
		/*
var sendText = document.getElementById('sendText');

        if (sendText.value != "") {
            var name = document.getElementById('name');
            var surname = document.getElementById('surname');

            var index = document.getElementById("allMessages").selectedIndex;
            var select = document.getElementById("allMessages")[index];
            
            var changeMessage = messageOption(sendText.value + "  " + changeIconUtfCode, surname.value + " " + name.value, index);
            changeMessages(changeMessage, function () {
            
            });
           
            select.selected = false;
            sendText.value = null;
            document.getElementById("allMessages").scrollTop = document.getElementById("allMessages").scrollHeight;
		*/
		change=1;
		var messages = document.getElementsByClassName('SeeOneMessage');
		if(!messages.length)return;
		var element  =  messages[messages.length-1];
		document.getElementById("MessageText").value= element.lastChild.innerHTML;

	}

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
		if(!value){ return; }
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

	function delegateEvent(evtObj) {
		if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-add')){
			onAddButtonClick(evtObj);
		}	
	}

	function onAddButtonClick(){
		var MessageText = document.getElementById('MessageText');
		var newMessage = theMessage(MessageText.value,name,messageList.length-1);
		if(MessageText.value == '')
			return;
		MessageText.value = '';
		if(change==1){
			change=0;
			changeMessages(newMessage, function () {  });
		}
		else
		storeMessages(newMessage, function() {
			console.log('Message sent ' + newMessage.text);
		});
	} 

function changeMessages(changeMessage, continueWith) {
    put(appState.mainUrl, JSON.stringify(changeMessage), function () {
        updateMessages();
    });
}
function addAllMessages(message) {
    if (messageList[message.id] == null) {
       var item = createMessage(message);
		var items = document.getElementsByClassName('MessagesPlace')[0];
		messageList.push(message);
		items.appendChild(item);
    }
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
		divItem.lastChild.textContent = task.message;
		divItem.firstChild.innerHTML=task.user +' : ' ;
	} 

	function checkConnect() {
	   var some
	   if(some){
	   	var connected = document.getElementById('connect')
	   connect.setAttribute('action','active');
	}
	   else{
	   	var connected = document.getElementById('connect')
	   connect.setAttribute('action','active');
	}
	}





function updateMessages(continueWith) {
    var url = appState.mainUrl + '?token=' + appState.token;
        get(url, function (responseText) {
        var response = JSON.parse(responseText).messages;
        for (var i = 0; i < response.length; i++) {
            var message = response[i];
            if (message.requst == "POST") {
                addAllMessages(message);
            }
            if (message.requst == "PUT") {
                addChangeMessage(message);
            }
            if (message.requst == "DELETE") {
                //addDeleteMessage(message);
            }
        }
        continueWith && continueWith();
    });
    setTimeout(updateMessages, 1000);

}



function addChangeMessage(message) {
    if (messageList[message.id] != null) {
        var select = document.getElementsByClassName("onlyMessage")[message.id];
        select.innerHTML = message.message;
        messageList[message.id] = message;
    }
}


function get(url, continueWith, continueWithError) {
    ajax('GET', url, null, continueWith, continueWithError);
}
function post(url, data, continueWith, continueWithError) {
    ajax('POST', url, data, continueWith, continueWithError);
}
function put(url, data, continueWith, continueWithError) {
    ajax('PUT', url, data, continueWith, continueWithError);
}
function del(url, continueWith, continueWithError) {
    ajax('DELETE', url, null, continueWith, continueWithError);
}
function storeMessages(sendMessage, continueWith) {
    post(appState.mainUrl, JSON.stringify(sendMessage), function () {
        updateMessages();
    });
}

	function isError(text) {
		if(text == "")
			return false;
		
		try {
			var obj = JSON.parse(text);
		} catch(ex) {
			return true;
		}

		return !!obj.error;
	}

	function ajax(method, url, data, continueWith, continueWithError) {
		var xhr = new XMLHttpRequest();

		continueWithError = continueWithError || defaultErrorHandler;
		xhr.open(method || 'GET', url, true);

		xhr.onload = function () {
			if (xhr.readyState !== 4)
				return;

			if(xhr.status != 200) {
				continueWithError('Error on the server side, response ' + xhr.status);
				return;
			}

			if(isError(xhr.responseText)) {
				continueWithError('Error on the server side, response ' + xhr.responseText);
				return;
			}

			continueWith(xhr.responseText);
		};    

		xhr.ontimeout = function () {
			ontinueWithError('Server timed out !');
		}

		xhr.onerror = function (e) {
			var errMsg = 'Server connection error ' + appState.mainUrl + '\n'+
			'\n' +
			'Check if \n'+
			'- server is active\n'+
			'- server sends header "Access-Control-Allow-Origin:*"';

			continueWithError(errMsg);
		};

		xhr.send(data);
	}
	function sendMessage(message, continueWith) {
		post(appState.mainUrl, JSON.stringify(message), function(){
			updateMessages();
		});
	}

	function defaultErrorHandler(message) {
		console.error(message);
	}