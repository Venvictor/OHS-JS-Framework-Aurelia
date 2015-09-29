import moment from 'moment';

// Custom value converter to make dates more reasonable in views.
// See: http://eisenbergeffect.bluespire.com/binding-with-value-converters-in-aurelia/
export class DateFormatValueConverter {
  toView(value) {
    return moment(value).format('M/D/YYYY h:mm:ss a');
  }
}
