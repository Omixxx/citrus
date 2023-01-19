export class Money {
  static inputSanitizer (value: string) {
    return value
      .replace(/^0/g, '')
      .replace(/[^\d.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/\-/g, '')
      .replace(/(\..*)\./g, '$1')
      .replace(/(\..{2}).*/g, '$1')
      .replace(/[^a-zA-Z0-9\.]/g, '')
  }

  static inputFormatter (value: string) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  static inputValidator (value: string) {
    const regex = '^d+(.d{2})?$/'
    return value.match(regex)
  }
}
