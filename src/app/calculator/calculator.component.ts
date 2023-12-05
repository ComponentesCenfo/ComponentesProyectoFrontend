import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  peso!: number;
  altura!: number;
  imc!: number;
  clasificacionIMC!: string;

  calcularIMC(): void {
    if (this.altura > 0 && this.peso > 0) {
      this.imc = this.peso / (this.altura * this.altura);
      this.clasificarIMC();
    }
  }

  clasificarIMC(): void {
    if (this.imc < 18.5) {
      this.clasificacionIMC = 'Bajo peso';
    } else if (this.imc >= 18.5 && this.imc < 25) {
      this.clasificacionIMC = 'Normal';
    } else if (this.imc >= 25 && this.imc < 30) {
      this.clasificacionIMC = 'Sobrepeso';
    } else {
      this.clasificacionIMC = 'Obesidad';
    }
  }
}