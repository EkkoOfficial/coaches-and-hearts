module.exports = function(app, controllers) {
    
    //Routing zur Home-Page (unterschiedliche Routes, aber ein hardkodierter Service)
    app.get('/', controllers.serviceUtils.index);
    app.get('/index', controllers.serviceUtils.index);
    
//Services
    app.get('/service_istEingelogged', controllers.serviceUtils.istEingelogged);
    app.get('/service_rollenAbfrage' , controllers.protect.readRoles);
    

//Standard für Login und Logout
  
    //--> Anmeldung
    app.get(    '/login'                  , controllers.protect.login);
    app.post(   '/login'                  , controllers.protect.loginSet);
    //--> Registrierung
    app.get(    '/signinBasic.html'       , controllers.serviceUtils.durchreichen);
    app.post(   '/signin'                 , controllers.protect.signinSet);
    //--> Abmeldung
    app.get(    '/logout'                 , controllers.protect.logout);   
    
//Hilfsroutes 
   
	 app.get('/pics/*', controllers.serviceUtils.durchreichen);
    app.get('/*.js', controllers.serviceUtils.durchreichenBackend);
    app.get('/*.css', controllers.serviceUtils.durchreichenBackend);
    app.get('/index-*.html', controllers.serviceUtils.durchreichen); 
 
  
	
  
  //Routing zum servicePartner-Controller mit REST
    app.get(   '/partner.html', controllers.serviceUtils.durchreichen);
    app.get(   '/partner/:id' , controllers.servicePartner.get);
    app.get(   '/partner'     , controllers.servicePartner.getall);
    app.post(  '/partner'     , controllers.servicePartner.create);
    app.put(   '/partner/:id' , controllers.servicePartner.update);
    app.delete('/partner/:id' , controllers.servicePartner.delete);  
    
    console.log("Server wurde gestartet!");
    
};
