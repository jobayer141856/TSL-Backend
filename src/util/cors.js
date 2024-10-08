import cors from 'cors';

const whitelist = [
	//* FZL H/O
	'http://103.147.163.46:3005',
	'http://103.147.163.46:4010',
	'http://103.147.163.46:3000',
	'http://103.147.163.46:4025',
	'http://103.147.163.46:4026',

	//* Development
	'http://localhost:3005',
	'http://localhost:4010',
	'http://localhost:3000',
	'http://localhost:4025',
	'http://localhost:4026',

	//* Office Server PC
	'http://192.168.10.154:3005',
	'http://192.168.10.154:4010',
	'http://192.168.10.154:3000',
	'http://192.168.10.154:4025',
	'http://192.168.10.154:4026',

	//* RBR LAPTOP
	'http://192.168.10.78:4010',

	//* RBR Home
	'http://192.168.1.108:4175',
];

var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req?.header('Origin')) !== -1) {
		corsOptions = { origin: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

export default cors(corsOptionsDelegate);
