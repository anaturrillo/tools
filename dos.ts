const obj = {};

const tee = fn => obj => {
    return Promise.all(fn(obj)).then(() => obj);
};

const add = (key, value, obj) => ({...obj, [key]: value});

const writer = (key, fn) => context => {
    return Promise
        .all(fn(context))
        .then(result => add(key, result, context));
};


Promise
    .resolve(obj)
    .then(writer("bd", conectoBd))
    .then(writer("col", conectoCollection))
    .then(writer("A", usoBdYCollectionYLlamoAlServicioA))
    .then(tee(desconectoBDyCollection))
    .then(writer("B", llamoConAalserivicoB))
    .then(writer("timer", desconectoTimer))



    .then(e => e) // conecto a la bd
    .then(e => e) // conecto a la collection
    .then(e => e) // uso bd y collection y llamo a un servicio, dato A
    .then(e => e) // me desconecto de bd y collection
    .then(e => e) // llamo con A al servicio B
    .then(e => e); // llamo a un metodo del obj


function conectoBd(context){}
function conectoCollection(context){}
function usoBdYCollectionYLlamoAlServicioA(context){}
function desconectoBDyCollection(context){}
function llamoConAalserivicoB(context){}
function desconectoTimer(context){}


