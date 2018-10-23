/*PUERTO*/
process.env.PORT = process.env.PORT || 3000;

/*ENTORN*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*VENCIMIENTO TOKEN*/
process.env.CADUCIDAD_TOKEN = '1d';

/*SECRET TOKEN*/
process.env.SEED = process.env.SEED || 'secret';

/*DB*/
let url;
if (process.env.NODE_ENV === 'dev') url = 'mongodb://localhost/cafe';
else url = process.env.MONGO_URI;

process.env.URLDB = url;

/*GOOGLE CLIENT ID*/
let aux = '878808830417-ou5355t40jktnshpi87n567o3vjer359.apps.googleusercontent.com';
process.env.CLIENT_ID = process.env.CLIENT_ID || aux;
