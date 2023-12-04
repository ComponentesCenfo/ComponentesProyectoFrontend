import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public evaluateExpression(expression: string): number | null {
    try {
      return eval(expression);
    } catch (error) {
      return null;
    }
  }
}
