import transformCss from 'css-to-react-native';

export default function (context) {
  var pboard = NSPasteboard.generalPasteboard();
  pboard.clearContents();

  var doc = context.document;
  var selection = context.selection;

  if (selection.count() == 0) {
    context.document.showMessage("💅: Please select an element");
  } else if (selection.count() > 1) {
    context.document.showMessage("💅: Please select a single element, not a group");
  } else {
    const cssAttributes = '' + selection[0].CSSAttributes().slice(1).join('\n');
    const result = transformCss(cssAttributes.split("\n").map((cssExpression) => cssExpression.replace(';', '').split(': ')));
    context.document.showMessage("💅: CSS Styles copied to clipboard!");
    pboard.setString_forType_(JSON.stringify(result), NSPasteboardTypeString);
  }
}
