import {Symbol} from "typescript";

var waitValues = obj => {
    if(!obj
        || obj instanceof Promise
        || typeof obj !== 'object'
        || typeof obj[Symbol.iterator] === 'function') {
        throw new TypeError("No object received " + obj);
    }

    return Promise.all(
        Object
            .keys(obj)
            .map(key => Promise.all([key, obj[key]]))
    ).then(values =>
        values
            .reduce(
                (response, [key, value]) =>
                    ({ ...response, [key]: value }),
                {})
    );
};

waitValues({
    nombre: Promise.resolve("pablo"),
    apellido: "Codeiro"
}).then(console.log);
