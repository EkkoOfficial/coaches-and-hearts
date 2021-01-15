module.exports = function(app, controllers) {
    
    //Routing zur Home-Page (unterschiedliche Routes, aber ein hardkodierter Service)
    app.get('/', controllers.serviceUtils.index);
    app.get('/index', controllers.serviceUtils.index);
    
//Services
    app.get('/service_istEingelogged', controllers.serviceUtils.istEingelogged);
    app.get('/service_rollenAbfrage' , controllers.protect.readRoles);
    

//Standard für Login und Logout
    app.get(    '/erfolg.html'          , controllers.serviceUtils.durchreichen);
    //--> Anmeldung
    app.get(    '/login'                  , controllers.protect.login);
    app.post(   '/login'                  , controllers.protect.loginSet);
    //--> Registrierung
    app.get(    '/signinBasic.html'       , controllers.serviceUtils.durchreichen);
    app.post(   '/signin'                 , controllers.protect.signinSet);
    //--> Abmeldung
    app.get(    '/logout'                 , controllers.protect.logout);   
    
//Hilfsroutes 
    app.get('/generalInterface.html', controllers.serviceUtils.durchreichen);
	 app.get('/pics/*', controllers.serviceUtils.durchreichen);
    app.get('/*.js', controllers.serviceUtils.durchreichenBackend);
    app.get('/*.css', controllers.serviceUtils.durchreichenBackend);
    app.get('/index.html', controllers.serviceUtils.durchreichen); 

    

  
  //Routing zum serviceAktionen-Controller mit REST
   app.get(   '/aktionen.html', controllers.serviceUtils.durchreichen);  
   app.get(   '/aktion/:id' , controllers.serviceAktionen.get);
   app.get(   '/aktion'     , controllers.serviceAktionen.getall);
   app.post(  '/aktion'     , controllers.serviceAktionen.create);
   app.put(   '/aktion/:id' , controllers.serviceAktionen.update);
   app.delete('/aktion/:id' , controllers.serviceAktionen.delete); 
  
  
  
	

	
    
    console.log("Server wurde gestartet!");
    
};
