import { useMemo } from "react";

import {
  Language,
  parsedTokensToHtml,
  syntaxParsingCache,
} from "../../suspense/SyntaxParsingCache";
import { ParsedTokens } from "../../suspense/SyntaxParsingCache";
import styles from "./shared.module.css";

export function SyntaxHighlighted({
  className = "",
  code,
  language,
  showLineNumbers = false,
}: {
  className?: string;
  code: string;
  language: Language;
  showLineNumbers?: boolean;
}) {
  const tokens = syntaxParsingCache.read(code, language);
  return (
    <TokenRenderer
      className={className}
      tokens={tokens}
      showLineNumbers={showLineNumbers}
    />
  );
}

function TokenRenderer({
  className,
  showLineNumbers,
  tokens,
}: {
  className: string;
  showLineNumbers: boolean;
  tokens: ParsedTokens[];
}) {
  const maxLineNumberLength = `${tokens.length + 1}`.length;

  const html = useMemo<string>(() => {
    return tokens
      .map((lineTokens, index) => {
        const html = parsedTokensToHtml(lineTokens);

        if (showLineNumbers) {
          return `<span class="${styles.LineNumber}">${
            index + 1
          }</span> ${html}`;
        }

        return html;
      })
      .join("<br/>");
  }, [showLineNumbers, tokens]);

  return (
    <code
      className={[styles.Code, className].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        // @ts-ignore
        "--max-line-number-length": `${maxLineNumberLength}ch`,
      }}
    />
  );
}
