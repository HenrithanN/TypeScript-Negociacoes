System.register(["../views/index", "../models/index", "../helpers/decorators/index", "../services/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, diasDaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView');
                    this._mensagemSucessoView = new index_1.MensagemSucessoView('#mensagemView');
                    this._mensagemErroView = new index_1.MensagemErroView('#mensagemView');
                    this._negociacaoService = new index_4.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                /*
                Metodos
                */
                adiciona() {
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this._naoEhFimDeSemana(data)) {
                        this._mensagemErroView.update('Negociações não podem ser realizadas no Sábado ou Domingo.');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputValor.val()), parseFloat(this._inputQuantidade.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemSucessoView.update('Negociação adicionada com sucesso!');
                    index_5.imprime(negociacao, this._negociacoes);
                }
                _naoEhFimDeSemana(data) {
                    return data.getDay() != diasDaSemana.Domingo && data.getDay() != diasDaSemana.Sabado;
                }
                importaDados() {
                    function isOk(res) {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    }
                    this._negociacaoService.obterNegociacoes(isOk)
                        .then(negociacoesParaImportadas => {
                        const negociacoesJaImportadas = this._negociacoes.paraArray();
                        negociacoesParaImportadas
                            .filter(negociacao => !negociacoesJaImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                            .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                        ;
                        this._mensagemSucessoView.update('Negociações Importadas com Sucesso!');
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (diasDaSemana) {
                diasDaSemana[diasDaSemana["Domingo"] = 0] = "Domingo";
                diasDaSemana[diasDaSemana["Segunda"] = 1] = "Segunda";
                diasDaSemana[diasDaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
                diasDaSemana[diasDaSemana["Quarta"] = 3] = "Quarta";
                diasDaSemana[diasDaSemana["Quinta"] = 4] = "Quinta";
                diasDaSemana[diasDaSemana["Sexta"] = 5] = "Sexta";
                diasDaSemana[diasDaSemana["Sabado"] = 6] = "Sabado";
            })(diasDaSemana || (diasDaSemana = {}));
        }
    };
});
