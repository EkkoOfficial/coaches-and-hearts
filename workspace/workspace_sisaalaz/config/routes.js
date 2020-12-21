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
    app.get('/index-*.html', controllers.serviceUtils.durchreichen); 
    app.get('/buchladen-*.html', controllers.serviceUtils.durchreichen);
    app.get('/uebung-*.html', controllers.serviceUtils.durchreichen);
    app.get('/plenum-*.html', controllers.serviceUtils.durchreichen);
	
//Routing zum serviceBuecher-Controller ohne REST mit generalInterface.html
    app.post(  '/buch-lesen/:id'   , controllers.serviceBuecher.get);
    app.post(  '/buecher-lesen'    , controllers.serviceBuecher.getall);
    app.post(  '/buch-anlegen'     , controllers.serviceBuecher.create);
    app.post(  '/buch-aendern/:id' , controllers.serviceBuecher.update);
    app.post(  '/buch-loeschen/:id', controllers.serviceBuecher.delete);  

//Routing zum Test-Controller
    app.get(   '/test*.html', controllers.serviceUtils.durchreichen);
    app.get(   '/testa/:id' , controllers.serviceTest.get);
    app.get(   '/testb'     , controllers.serviceTest.getall);
    app.post(  '/testc'     , controllers.serviceTest.create);
    app.put(   '/testd/:id' , controllers.serviceTest.update);
    app.delete('/teste/:id' , controllers.serviceTest.delete);	

//Routing zum serviceBuecher-Controller mit REST
    //app.get(   '/buch-kaufen*.html', controllers.serviceUtils.durchreichen);
    app.get(   '/buch-kaufen/:id' , controllers.serviceBuecher.get);
    app.get(   '/buch-kaufen'     , controllers.serviceBuecher.getall);
    app.post(  '/buch-kaufen'     , controllers.serviceBuecher.create);
    app.put(   '/buch-kaufen/:id' , controllers.serviceBuecher.update);
    app.delete('/buch-kaufen/:id' , controllers.serviceBuecher.delete);        
//Routing zum serviceBuecher-Controller mit REST
    app.get(   '/buch-verkaufen/:id' , controllers.serviceGebrauchteBuecher.get);
    app.get(   '/buch-verkaufen'     , controllers.serviceGebrauchteBuecher.getall);
    app.post(  '/buch-verkaufen'     , controllers.serviceGebrauchteBuecher.create);
    app.put(   '/buch-verkaufen/:id' , controllers.serviceGebrauchteBuecher.update);
    app.delete('/buch-verkaufen/:id' , controllers.serviceGebrauchteBuecher.delete);       
    
    console.log("Server wurde gestartet!");
    
};
