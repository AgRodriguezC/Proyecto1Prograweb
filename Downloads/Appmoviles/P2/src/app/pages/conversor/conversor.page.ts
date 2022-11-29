import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { ConversorService } from 'src/app/services/conversor/conversor.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {

getdata:any[]=[];
indicadores: any;
UF: any;
Dolar: any;
Euro: any ;
CLP: number = 0;
llegaRES: boolean=false;
conversion: any;


  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(public ConversorService: ConversorService, private navController: NavController) {}


  ngOnInit(): void {
    this.cargaDivisa();
  }

  async cargaDivisa(listaDivisa:boolean = false, event?){

    await this.ConversorService.getIndicadores()
    .then(respuesta => {
      this.indicadores = respuesta;
      this.UF = respuesta.uf;
      this.Dolar = respuesta.dolar;
      this.Euro = respuesta.euro;
      this.llegaRES = true;
    },
    (err) => {
      console.log(err);
    });
  }

  ConvertirDolar() {
     var numDolar = this.CLP / parseFloat(this.Dolar.valor)
    this.conversion = numDolar.toFixed(2)
  }
  ConvertirEuro() {
    var numEuro = this.CLP / parseInt(this.Euro.valor)
    this.conversion =  numEuro.toFixed(2)
   
 }
  ResetearCampo(){
    this.conversion = 0;
    this.CLP = 0;
  }

}
 