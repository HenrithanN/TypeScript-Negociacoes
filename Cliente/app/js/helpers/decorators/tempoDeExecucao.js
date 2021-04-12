System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function tempoDeExecucao(tempoEmSegundos = false) {
        return function (target, key, descriptor) {
            /*
            metodoOriginal = Recebe o valor do Metodo Original(Metodo que será analisado, passado por parametro).
            */
            const metodoOriginal = descriptor.value;
            /*
            Function= Sobrescrevendo o Método Original.
            ...args = rest operator, pode receber vários parametros.
            */
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (tempoEmSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log('###########################################');
                console.log(`Parâmetros passados para o método ${key}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                /*
                apply = Chamando o metodo original, no contexto.
                */
                const retorno = metodoOriginal.apply(this, args);
                /*
                Retornando o retorno do metodo.
                */
                const t2 = performance.now();
                console.log(`O retorno do método ${key} é ${JSON.stringify(retorno)}`);
                console.log(`Tempo de execução do método ${key} = ${(t2 - t1) / divisor}${unidade}`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("tempoDeExecucao", tempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
