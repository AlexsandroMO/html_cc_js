from flask import Flask, render_template
import db

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')


@app.route('/fipe_second', methods = ['POST', 'GET'])
def fipe_second():
  if request.method == 'POST':
    dados = request.form

    nome = result_fipe2['veiculo']
    ItensCar.car_name_brand = car_name_brand

    var = Progpy.name_car(ItensCar.var, ItensCar.car_name_brand)
    ItensCar.id_code = var[-1]

    return render_template('fipe_second.html', var=var, car_name_brand =car_name_brand )



if __name__ == '__main__':
  #app.run(host='0.0.0.0', port=8080, debug=True)
  app.run(port=8080, debug=True)


