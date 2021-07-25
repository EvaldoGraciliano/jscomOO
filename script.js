class Produto {

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
       let produto = this.lerDados();
     
        if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            } else{
                this.atualizar(this.editId,produto);
            }

        }

        console.log(this.arrayProdutos);
       
       
        this.listatabela();
        this.cancelar();
    }

    listatabela (){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i =0; i<this.arrayProdutos.length; i++){
          
            let tr = tbody.insertRow(); // cria a linha
            
            let td_id = tr.insertCell(); // criaçao das colunas
            let td_produto = tr.insertCell(); // criaçao das colunas
            let td_valor = tr.insertCell(); // criaçao das colunas
            let td_acao = tr.insertCell(); // criaçao das colunas

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;
            td_id.innerText = this.arrayProdutos[i].id;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick","produto.preparaEditacao("+ JSON.stringify(this.arrayProdutos[i]) + ")"); 

            

            let imgExcluir = document.createElement('img');
            imgExcluir.src = 'img/excluir-opcao-de-simbolo.png'
            imgExcluir.setAttribute("onclick","produto.deletar("+ this.arrayProdutos[i].id + ")"); 

            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgExcluir);


        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
                 
            }
        }
    }


    preparaEditacao (dados) {
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';

    }


    lerDados(){
       let produto = {} 
       produto.id = this.id;
       produto.nomeProduto = document.getElementById('produto').value;
       produto.preco = document.getElementById('preco').value;
       
       return produto;
    }

    validaCampos(produto) {
        
        let msg = '';
        
        if(produto.nomeProduto ==''){
            msg += '- Informe o nome do Produto \n'
        }

        if(produto.preco =='') {
            msg += '- Informe o preço do produto \n'
        }

        if(msg != ''){

            alert(msg);
            return false
        }

        return true;
    }
    
    
    cancelar() {
        document.getElementById('produto').value = "";
        document.getElementById('preco').value = "";

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar (id) {

        if(confirm('Deseja realmente deletar o produto do ID ' + id)){
        let tbody = document.getElementById('tbody');

            for(let i =0; i<this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice (i,1);
                    tbody.deleteRow(i);  
                }
            }
        }   

    }


}


var produto = new Produto();
