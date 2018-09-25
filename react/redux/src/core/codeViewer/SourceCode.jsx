import React from 'react';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import atomDark from 'react-syntax-highlighter/styles/prism/atom-dark';
import { withStyles } from '@material-ui/core/styles';

const atomDarkTabSpace2 = {
  ...atomDark,
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    tabSize: '2',
  },
};

registerLanguage('jsx', jsx);

const styles = theme => ({
  sourceCodeContainer: {},
});
function SourceCode({ code, classes }) {
  return (
    <SyntaxHighlighter
      language="jsx"
      className={classes.sourceCodeContainer}
      wrapLines
      showLineNumbers
      style={atomDarkTabSpace2}>
      {code}
    </SyntaxHighlighter>
  );
}

export default withStyles(styles)(SourceCode);
