import {Component, OnInit} from '@angular/core';
import { ExchangeRateService } from '../../exchange-rate.service';
import {NgFor} from "@angular/common";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  exchangeRates: any[] = [];

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates().subscribe(
      (data) => {
        this.exchangeRates = data.filter((item: { cc: string; }) => item.cc === "USD" || item.cc === "EUR");
        console.log(this.exchangeRates)
      },
      (error) => {
        console.error('Error fetching exchange rates', error);
      }
    );
  }
}
