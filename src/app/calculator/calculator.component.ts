import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  mostrarBmiCalculator = false;
  mostrarBodyFatCalculator = false;
  mostrarTmbCalculator = false;
  mostrar1rmCalculator = false;
  peso!: number;
  altura!: number;
  peso2!: number;
  altura2!: number;
  peso3!: number;
  altura3!: number;
  imc!: number;
  clasificacionIMC!: string;
  edad!: number;
  genero!: string;
  edad2!: number;
  genero2!: string;
  pesoLevantado!: number;
  repeticiones!: number;
  grasaCorporal!: number;
  tmb!: number;
  unoRM!: number;

  calcularIMC(): void {
    if (this.altura > 0 && this.peso > 0) {
      this.imc = this.peso / (this.altura * this.altura);
      this.clasificarIMC();
    }
  }

  clasificarIMC(): void {
    if (this.imc < 18.5) {
      this.clasificacionIMC = 'Underweight';
    } else if (this.imc >= 18.5 && this.imc < 25) {
      this.clasificacionIMC = 'Normal';
    } else if (this.imc >= 25 && this.imc < 30) {
      this.clasificacionIMC = 'Overweight';
    } else {
      this.clasificacionIMC = 'Obesity';
    }
  }

  calcular1RM() {
    if (this.pesoLevantado > 0 && this.repeticiones > 0) {
      this.unoRM = this.pesoLevantado / (1.0278 - (0.0278 * this.repeticiones));
    }
  }
  calcularTMB() {
    if (this.peso2 > 0 && this.altura2 > 0 && this.edad > 0) {
      if (this.genero === 'Male') {
        this.tmb = 88.362 + (13.397 * this.peso2) + (4.799 * this.altura2 * 100) - (5.677 * this.edad);
      } else if (this.genero === 'Female') {
        this.tmb = 447.593 + (9.247 * this.peso2) + (3.098 * this.altura2 * 100) - (4.330 * this.edad);
      }
    }
  }
  calcularGrasaCorporal() {
    if (this.altura3 > 0 && this.peso3 > 0 && this.edad2 > 0 && this.genero2) {
      this.imc = this.peso3 / (this.altura3 * this.altura3);
    
      if (this.genero2 === 'Male') {
        this.grasaCorporal = (1.20 * this.imc) + (0.23 * this.edad2) - 16.2;
      } else if (this.genero2 === 'Female') {
        this.grasaCorporal = (1.20 * this.imc) + (0.23 * this.edad2) - 5.4;
      }
  }
  }
}
