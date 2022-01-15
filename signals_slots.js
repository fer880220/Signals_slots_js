class SigSlotObject{
	constructor(){
		/********************************************
		*mapF : key = signalName
		*      value = {obj: objReciver  , slot: slotName}
		*
		**********************************************/
		this.mapF = new Map();
	}
	signal(name){
		this.mapF.set(name , []);
		eval(`${this.constructor.name}.prototype.${name} = (val) => { this.mapF.get(name).forEach(v=>{v.slot.call(v.obj, val)}) }`);
	}
	connect(signalName , objReciver , slotName ){
		this.mapF.get(signalName).push( {obj: objReciver  , slot: slotName} );
	}
}

class Emiter extends SigSlotObject{
	constructor(){
		super();
		this.signal('ready');
	}
	
	emite( msg ){
		this.ready(msg )
	}
}

class Receiver{
	constructor(){
		
	}
	doer( msg ){
		console.log(`Receiver::doer -> ${msg} , and val = ${this.val}`);
	}
}

let e = new Emiter , r = new Receiver ; r.val = 456.345;
e.connect('ready' , r , r.doer);
e.emite('hola mundo');