
//console.log('funcionou')
//alert('funcionou')

var db = openDatabase('myDB', '2.0', 'Mybase', 1024);

function salvar(){

  status = decidir()

  console.log('ESTATUS: ',status)

  if (status == true){

    db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY,nome TEXT,fornecedor TEXT, qt INTEGER, cat TEXT, pre INTEGER)");
    });

    var nome = document.getElementById('nome').value
    var fornecedor = document.getElementById("fornecedor").value;
    var qt = document.getElementById("qt").value;
    var cat = document.getElementById("cat").value;
    var pre = document.getElementById("pre").value;

    result = `${nome} | ${fornecedor} | ${qt} | ${cat} | ${pre}`

    console.log(result)

    db.transaction(function (tx){
      tx.executeSql('INSERT INTO myTable (nome,fornecedor,qt,cat,pre) VALUES (?, ?, ?, ?, ?)', [nome,fornecedor,qt,cat,pre])
    })

    mostrar()

  }

}

function mostrar(){

  //new-table

  var tabela = document.createElement('table')
  var titulo = document.getElementById('alinha-h3')
  var cabecalho = document.createElement('thead')

  var dados = '<th scope="col">Codigo</th>\
              <th scope="col">Nome</th>\
              <th scope="col">Fornecedor</th>\
              <th scope="col">Quantidade</th>\
              <th scope="col">Categoria</th>\
              <th scope="col">Preço</th>'

  titulo.innerHTML = 'Estoque de Produtos'

  cabecalho.innerHTML = dados
  cabecalho.classList.add('thead-dark')
  tabela.classList.add('table')

  tabela.appendChild(cabecalho)
  tabela.appendChild(montaBody())

  document.getElementById('new-table').appendChild(tabela)

}

function montaBody(){
  var corpo = document.createElement('tbody')

  db.transaction(function (tx){
    tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado){
      var rows = resultado.rows
      var tr = ''

      for (let i=0;i<rows.length;i++){
        tr += '<tr>';
          tr += '<td onclick="chamaId('+ rows[i].id  +')">' + rows[i].id + '</td>';
          tr += '<td>' + rows[i].nome + ' </td>';
          tr += '<td>' + rows[i].fornecedor + ' </td>';
          tr += '<td>' + rows[i].qt + ' </td>';
          tr += '<td>' + rows[i].cat + ' </td>';
          tr += '<td>' + rows[i].pre + ' </td>';
          tr += '</tr>'; 
      }
      corpo.innerHTML = tr

  }, null);

  });

  return corpo;

}

function chamaId(id){
  console.log('ID: ', id)

  var id_filed = document.getElementById("field-id")
  var nome = document.getElementById("nome")
  var fornecedor = document.getElementById("fornecedor")
  var qt = document.getElementById("qt")
  var cat = document.getElementById("cat")
  var pre = document.getElementById("pre")

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
        var rows = resultado.rows;

        id_filed.value = rows[id-1].id;
        nome.value = rows[id-1].nome;
        fornecedor.value = rows[id-1].fornecedor;
        qt.value = rows[id-1].qt;
        cat.value = rows[id-1].cat;
        pre.value = rows[id-1].pre;
        
    }, null);
  });

}

function alterar(){
  var id_filed = document.getElementById("field-id").value
  var nome = document.getElementById("nome").value
  var fornecedor = document.getElementById("fornecedor").value
  var qt = document.getElementById("qt").value
  var cat = document.getElementById("cat").value
  var pre = document.getElementById("pre").value

  db.transaction(function(tx) {
    tx.executeSql('UPDATE myTable SET nome=?, fornecedor=?, qt=?, cat=?, pre=? WHERE id=?', [nome,fornecedor,qt,cat,pre,id_filed],null);
  });

}

function deletar(){
    
  var id_lido = document.getElementById('field-id').value;
  
  db.transaction(function(tx) {
      tx.executeSql("DELETE FROM myTable WHERE id=?", [id_lido]);
  });
  
  location.reload()

}

function decidir(){
  var status;
  var nota;
  var teste = confirm('Deseja Realmnte Adicionar Itens?')

  if (teste == true){
    nota = 'Itens Serão Adicionados'
    status = true
  }else{
    nota = 'Ok, Não vou Salvar'
    status = false
  }

  alert(innerHTML = nota)

  return status
}
