System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function domInject(seletorCSS) {
        return function (target, key) {
            let elemento;
            const getter = function () {
                if (!elemento) {
                    console.log('###############################################');
                    console.log(`Buscando ${seletorCSS} para injetar em ${key}`);
                    elemento = $(seletorCSS);
                }
                return elemento;
            };
            Object.defineProperty(target, key, {
                get: getter
            });
        };
    }
    exports_1("domInject", domInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
