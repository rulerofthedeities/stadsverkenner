import {Pipe, PipeTransform} from '@angular/core';
/*
 * Convert a population number info a formatted number.
*/
@Pipe({name: 'population'})
export class FormatPopulationPipe implements PipeTransform {

  transform(population: number=0, separator: string=' ') {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }
}
