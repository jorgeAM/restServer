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
