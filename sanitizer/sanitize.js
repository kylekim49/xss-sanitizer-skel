export class Sanitizer {
  static sanitize(input) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<body>${input}</body>`, "text/html");
    const body = doc.body;
    return body.innerHTML;
  }
}
