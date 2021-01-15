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

	
  
  //Routing zum serviceKontaktanfragen-Controller mit REST
  app.get(   '/Kontaktanfragen.html', controllers.serviceUtils.durchreichen);
    app.get(   '/Kontaktanfrage/:id' , controllers.serviceKontaktanfragen.get);
    app.get(   '/kontaktanfrage'     , controllers.serviceKontaktanfragen.getall);
    app.post(  '/kontaktanfrage'     , controllers.serviceKontaktanfragen.create);
    app.put(   '/kontaktanfrage/:id' , controllers.serviceKontaktanfragen.update);
    app.delete('/kontaktanfrage/:id' , controllers.serviceKontaktanfragen.delete);     
    
    console.log("Server wurde gestartet!");
    
};
