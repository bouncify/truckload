import * as moment from 'moment';

import {Globals} from "./Global"

export module DateFunctions {
    export function formatDateTime(datetime: any): string {
        return moment(datetime).format(`${Globals.dateFormat} @h: mm a`);
    }

    export function formatDate(datetime: any): string {
        if (datetime) {
            return moment(datetime).format(`${Globals.dateFormat}`);
        }
        return "";
    }

    export function formatLoadDate(datetime: any): string {
        return moment(datetime).format("dddd, MMMM Do YYYY");
    }

    export function isDateEqual(date1: Date, date2: Date): boolean {
        return moment(date1).format(`${Globals.dateFormat}`) === moment(date2).format(`${Globals.dateFormat}`);
    }
}

