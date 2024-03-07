class Produto {
    constructor(nome, preco, qtd, qtdEstoque) {
        this.nome = nome;
        this.preco = preco;
        this.qtd = qtd;
        this.qtdEstoque = qtdEstoque;
        this.valorComImposto = 0;
    }

    reembolso(reembolso) {
        switch (reembolso) {
            case 'Sim':
                let valorReembolso = this.preco - (this.preco * 0.3);
                return `Reembolso aprovado, este é o valor devolvido: R$${valorReembolso.toFixed(2).replace('.', ',')}`;
             case 'Não':
                return `Reembolso não selecionado`;
                 default:
                 throw new Error('Opção de reembolso inválida');
        }
    }

    verificarProdutoEmEstoque() {
        if (this.qtd >= this.qtdEstoque) {
            return `O produto ${this.nome}, não se encontra em quantidade(s) suficiente(s) no estoque para suprir a(s) demanda(s) desejada(s), apenas há ${this.qtdEstoque} unidade(s)`;
        } else if (this.qtdEstoque === 0) {
            return 'Não há esse item em estoque';
        } else if (this.qtd < this.qtdEstoque) {
            return `Esse(s) item(ns) está(ão) disponível(is) no estoque, nessa(s) quantidade(s) ${this.qtdEstoque}`;
        }
    }

    addCarrinho() {
        if (this.qtd > this.qtdEstoque) {
            return `Este(s) item(ns) ${this.nome} , na(s) quantidades(s) ${this.qtd}, não está(ão) disponivel(eis) no Estoque para ser(em) adicionado(s) ao carrinho`;
        } else {
            return `O(s) item(ns) ${this.nome}, foi(ram) adicionado(s) no carrinho de compras.`;
        }
    }

    precoTotaldoEstoque() {
        const valor = this.qtdEstoque * this.preco;
        return `O valor total do(s) item(ns) no estoque é ${valor}`;
    }

    checkOut() {
        if (this.qtd > this.qtdEstoque) {
            return `O(s) item(s) ${this.nome}, não está(ão) disponível(is) para compra`;
        } else {
            this.valorComImposto = ((this.preco * 0.074) * this.qtd) + this.preco; // Armazenando o valor com imposto
            return `O valor a ser pago pelo(s) item(ns) ${this.nome} adicionado(s) ao carrinho é de R$${this.valorComImposto.toFixed(2).replace('.', ',')}. Deseja confirmar sua compra?`;
        }
    }

    confirmarCompra(confirmar, callback) {
        if (this.qtd > this.qtdEstoque) {
            throw new Error('Não é possível confirmar a compra, pois não há quantidade de itens suficientes no estoque para suprir sua demanda');
        } else {
            setTimeout(() => {
                switch (confirmar) {
                    case 'Sim':
                        console.log(`Sua compra foi confirmada!`);
                        callback();
                        break;
                    case 'Não':
                        console.log(`A compra do item ${this.nome} não foi confirmada`);
                        break;
                    default:
                        throw new Error('Opção de confirmação inválida');
                }
            }, 2000);
        }
    }

    realizarCompra(comprar, callback) {
        if (this.qtd > this.qtdEstoque) {
            console.log('Compra não finalizada. Não há quantidade suficiente em estoque.');
            return Promise.reject('Compra não finalizada. Não há quantidade suficiente em estoque.');
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    switch (comprar) {
                        case 'Sim':
                            console.log(`Sua compra do(s) item(ns) ${this.nome}, pelo valor de ${this.valorComImposto.toFixed(2).replace('.', ',')} , está finalizada! Obrigado por comprar conosco!`);
                            resolve('Compra efetuada com sucesso!');
                            callback();
                            break;
                        case 'Não':
                            console.log('Compra não finalizada');
                            reject('Compra não finalizada.');
                            break;
                        default:
                            throw new Error('Opção de compra inválida');
                    }
                }, 5000);
            });
        }
    }

    adicionarAoEstoque(adicionar) {
        this.qtdEstoque += adicionar;
        return `Foram adicionadas ${adicionar} unidades do produto ${this.nome} ao estoque.`;
    }

    removerDoEstoque(remover) {
        if (this.qtdEstoque < remover) {
            return `Não é possível remover ${remover} unidades do produto ${this.nome} do estoque. A quantidade em estoque é de apenas ${this.qtdEstoque} unidades.`;
        } else {
            this.qtdEstoque -= remover;
            return `Foram removidas ${remover} unidades do produto ${this.nome} do estoque.`;
        }
    }

    relatoriosDeEstoque() {
        if (this.qtdEstoque === 0) {
            return `Não há itens do tipo ${this.nome} disponíveis no Estoque, recomenda-se aquisição de mais itens do tipo ${this.nome} para no mínimo 2 unidades sobresalentes`;
        } else if (this.qtd > 0 && this.qtdEstoque <= 4) {
            return `Há apenas ${this.qtdEstoque} disponível(s) no Estoque, pode haver problemas para suprir as demandas de compras de usuários pelo site. Recomendado comprar mais unidades`;
        } else {
            return `Há quantidades suficientes do item ${this.nome} para suprir futuras demandas do site de compras`;
        }
    }
}

let produto1 = new Produto('Geladeira', 2000, 11, 2);

console.log(produto1.adicionarAoEstoque(19));
console.log(produto1.removerDoEstoque(8));
console.log(produto1.addCarrinho());
console.log(produto1.checkOut());
produto1.confirmarCompra('Sim', () => { });
produto1.realizarCompra('Sim', () => { });
