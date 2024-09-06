import {Component, OnInit} from '@angular/core';
import {ExchangeRateService} from "../../exchange-rate.service";
import {NgFor} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit {
  firstAmount: number = 1;
  firstCurrency: string = 'USD';
  secondAmount: number = 1;
  secondCurrency: string = 'EUR';
  currencies: any[] = [];
  exchangeRates: any = {};

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates().subscribe((data) => {

      // Додаємо гривню з курсом 1
      this.currencies = [{ cc: 'UAH', txt: 'Українська гривня', rate: 1 }, ...data];

      // Створюємо об'єкт курсів валют, включаючи гривню
      this.exchangeRates = data.reduce((acc: any, currency: any) => {
        acc[currency.cc] = currency.rate;
        return acc;
      }, {});

      // Явно додаємо курс гривні
      this.exchangeRates['UAH'] = 1;

      this.convert('first');
    });
  }


  convert(from: string): void {
    if (from === 'first') {
      const rate = this.exchangeRates[this.firstCurrency] / this.exchangeRates[this.secondCurrency];
      this.secondAmount = parseFloat((this.firstAmount * rate).toFixed(2));
    } else {
      const rate = this.exchangeRates[this.secondCurrency] / this.exchangeRates[this.firstCurrency];
      this.firstAmount = parseFloat((this.secondAmount * rate).toFixed(2));
    }
  }
}
