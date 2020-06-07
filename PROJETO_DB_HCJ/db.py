import sqlite3

def criar_tabela():
  conn = sqlite3.connect('DB_PROJECT.db')
  c = conn.cursor()

  table_createdb = f"""
    
    CREATE TABLE IF NOT EXISTS myTable (
    ID INTEGER PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    FORNECEDOR VARCHAR(50) NOT NULL,
    QT INTEGER,
    CAT VARCHAR(50) NOT NULL,
    QT INTEGER
    )
    
    """

  c.execute(table_createdb)

  conn.commit()
  conn.close()

  print('Table Created')