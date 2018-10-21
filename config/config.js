/*PUERTO*/
process.env.PORT = process.env.PORT || 3000;

/*ENTORN*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*DB*/
let url;
if (process.env.NODE_ENV === 'dev') url = 'mongodb://localhost/cafe';
else url = 'mongodb://cafe-prd:c4r4d3p3n3@ds137703.mlab.com:37703/cafe';

process.env.URLDB = url;
