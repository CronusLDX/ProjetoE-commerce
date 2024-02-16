class Produto {
    constructor(nome, preco, qtd, qtdEstoque, ) {
        this.nome = nome;
        this.preco = preco;
        this.qtd = qtd;
        this.qtdEstoque = qtdEstoque;
        
        
    }
    Reembolso(reembolso) {
        switch (reembolso) {
            case 'Sim':
                let valorReembolso = this.preco - (this.preco * 0.3);
                return `Reembolso aprovado, este é o valor devolvido: R$${valorReembolso.toFixed(2).replace('.', ',')}`;
            case 'Não':
                return `Reembolso não selecionado`;
        }
    }

    VerificarProdutoEmEstoque() {
        if (this.qtd >= this.qtdEstoque) {
            return `O produto ${this.nome}, não se encontra em quantidade(s) suficiente(s)  no estoque para suprimir a(s) demanda(s) desejada(s), apenas há ${this.qtdEstoque} unidade(s)`;
        } else if (this.qtdEstoque == 0) {
            return 'Não há esse item em estoque';
        } else if (this.qtd < this.qtdEstoque) {
            return `Esse(s) item(ns) está(ão) disponível(is) no estoque, nessa(s) quantidade(s) ${this.qtdEstoque}`;
        }
    }
 AddCarrinho(){
    if(this.qtd > this.qtdEstoque){
        return` Este(s) item(ns) ${this.nome} , na(s) quantidades(s) ${this.qtd}, não está(ão) disponivel(eis) no Estoque para ser(em) adicionado(s) ao carrinho`
    
    }
    else{
    return `O(s) item(ns) ${this.nome}, foi(ram) adicionado(s) no carrinho de compras. `
    }
 }
    
    PrecoTotaldoEstoque() {
        const valor = this.qtdEstoque * this.preco;
        return `O valor total do(s) item(ns) no estoque  é ${valor}`;
    }

    Comprar(){
        if( this.qtd > this.qtdEstoque){
            return `O(s) item(s) ${this.nome}, não esta(ão) disponivel(is) pra compra`
        }
        else{
        let ValorComImposto = ((this.preco * 0.074) * this.qtd) + this.preco
        return `O valor a ser pago pelo(s) item(ns)  ${this.nome} adicionado(s) ao carrinho, é  de  R$${ValorComImposto.toFixed(2).replace('.',',')} `
        }
    }

    AdicionarAoEstoque(adicionar){
        this.qtdEstoque += adicionar
        return `Foram adicionadas ${adicionar} unidades do produto ${this.nome} ao estoque.`
    }

    RemoverDoEstoque(remover){
        if(this.qtdEstoque < remover){
            return `Não é possível remover ${remover} unidades do produto ${this.nome} do estoque. A quantidade em estoque é de apenas ${this.qtdEstoque} unidades.`
        }

        else{
            this.qtdEstoque -= remover
         return `Foram removidas ${remover} unidades do produto ${this.nome} do estoque.`
        }
    }

    RelatoriosDeEstoque(){
        if(this.qtdEstoque == 0 ){
            return `Não há itens do tipo ${this.nome} disponiveis no Estoque, recomenda-se aquisição de mais itens do tipo ${this.nome} para no minimo 2 unidades sobresalentes`
        }

        else if(this.qtd > 0 && this.qtdEstoque <= 4){
            return `Há apenas ${this.qtdEstoque} disponivel(s) no Estoque, pode haver problemas para suprir as demandas de compras de usuarios pelo site. Recomendado comprar mais unidades`

        }

        else{
            return `Há quantidades suficientes do item ${this.nome} para suprir futuras demandas do site de compras`
        }
    }

}

let produto1 = new Produto('Geladeira', 2000, 8, 2 );




