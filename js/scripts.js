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
		getAllMessages();
		updateMessages();	
		
	}
	function createAllMessages(messageList) {
		
		for(var i = 0; i < messageList.length; i++)
			//if(messageList[i].deleteMessage==false)
			addMessage(messageList[i]);
		
	}
	function addLastName(message){
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
		var newMessage = theMessage(MessageText.value,name,messageList.length);
		if(MessageText.value == '')
			return;
		MessageText.value = '';
		storeMessages(newMessage, function() {
			console.log('Message sent ' + newMessage.text);
		});
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
	   	var connected = document.getElementById('disconnect')
	   connect.setAttribute('action','active');
	}
	}

	var theMessage = function(text, userName,id) {
		return {
			message:text,
			user: userName,
			id: id+1,
		};
	};
	var uniqueId = function() {
		var date = Date.now();
		var random = Math.random() * Math.random();
		return Math.floor(date * random).toString();
	};
	var messageList = [];

	//server
	var appState = {
		mainUrl : 'http://localhost:999/chat',
		history:[],
		token : 'TN11EN'
	};

	function getAllMessages (continueWith) {
		var url = appState.mainUrl + '?token=' + appState.token;
		get(url, function(responseText) {
		var response = JSON.parse(responseText);

        createAllMessages(response.messages);

        continueWith && continueWith();
    });
		
	}
	/*function mainLoop() {
		function loop() {
			var url = appState.mainUrl + '?token=' + appState.token;

			get(url, function(responseText) {
				var response = JSON.parse(responseText);

				appState.token = response.token;
				updateHistory(response.messages);
				setTimeout(loop, 1000);
			}, function(error) {
				defaultErrorHandler(error);
				setTimeout(loop, 1000);
			});
		}

		loop();
	}
	function updateHistory(newMessages) {
		for(var i = 0; i < newMessages.length; i++)
			addMessage(newMessages[i]);
		//addLastName(newMessages[newMessages.length-1]);
	}
	function addMessageInternal(message) {
		var historyBox = document.getElementById('MessagesPlace');
		var history = appState.history;

		history.push(message);
		createMessage(message);
		//istoryBox.innerHTML = message.user + ' имел сказать:\n' + message.text + '\n\n' + historyBox.innerHTML;
	}*/
function updateMessages(continueWith) {
    var url = appState.mainUrl + '?token=' + appState.token;
        get(url, function (responseText) {
        var response = JSON.parse(responseText).messages;
        for (var i = 0; i < response.length; i++) {
         var message = response[i];
    if (messageList[message.id] == null) 
         addMessage(message);
          }
        continueWith && continueWith();
    });
    setTimeout(updateMessages, 1000);

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