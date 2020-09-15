import moment from 'moment';
export function time(stamp){
    return moment(stamp).format('YY-MM-DD');
}