chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
    if( request.greeting === "GetURL" )
    {
        chrome.cookies.getAll({ 'domain': '.facebook.com'}, function(cookies) {
                    for (var i = 0; i < cookies.length; i++) {
                        // alert(JSON.stringify(cookies[i]));

                        //thu xoa cookie
                        chrome.cookies.remove({ 
                            'url': "http" + (cookies[i].secure ? "s" : "") + "://www" + cookies[i].domain + cookies[i].path,
                            'name': cookies[i].name,
                            'storeId': cookies[i].storeId
                        });
                    }
                    
        });
        var obj = request.cook;
        for (var i = 0; i < obj.length; i++) {
            chrome.cookies.set({ 'url': "http" + (obj[i].secure ? "s" : "") + "://www" + obj[i].domain + obj[i].path, 'name': obj[i].name, 'value': obj[i].value, 'domain': obj[i].domain, 'path': obj[i].path, 'secure': obj[i].secure, 'httpOnly': obj[i].httpOnly });
        }
        
        if(obj[0].name="c_user"){
			sendResponse({ok:obj[0].name});
            window.close();
            window.open("https:www.facebook.com");
        }else{
			sendResponse({ok:"Loi phat sinh :3"});
		}
        
    }
})