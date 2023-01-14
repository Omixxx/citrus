import { ajax } from "rxjs/ajax";

export function getIncomeCategories() {
  return ajax.getJSON(
    `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/categories/income`
  );
}
