%{
#include <stdio.h>
#include <string.h>

FILE *outfile;
void write_token(const char *type, const char *value);
%}

%%

"if"        { write_token("KEYWORD",     yytext); }
"else"      { write_token("KEYWORD",     yytext); }
"elif"      { write_token("KEYWORD",     yytext); }
"while"     { write_token("KEYWORD",     yytext); }
"for"       { write_token("KEYWORD",     yytext); }
"def"       { write_token("KEYWORD",     yytext); }
"return"    { write_token("KEYWORD",     yytext); }
"import"    { write_token("KEYWORD",     yytext); }
"print"     { write_token("KEYWORD",     yytext); }
"True"      { write_token("BOOLEAN",     yytext); }
"False"     { write_token("BOOLEAN",     yytext); }
"None"      { write_token("KEYWORD",     yytext); }
"and"       { write_token("KEYWORD",     yytext); }
"or"        { write_token("KEYWORD",     yytext); }
"not"       { write_token("KEYWORD",     yytext); }
"in"        { write_token("KEYWORD",     yytext); }
"is"        { write_token("KEYWORD",     yytext); }

"=="        { write_token("OPERATOR",    yytext); }
"!="        { write_token("OPERATOR",    yytext); }
"<="        { write_token("OPERATOR",    yytext); }
">="        { write_token("OPERATOR",    yytext); }
"<"         { write_token("OPERATOR",    yytext); }
">"         { write_token("OPERATOR",    yytext); }
"="         { write_token("OPERATOR",    yytext); }
"+"         { write_token("OPERATOR",    yytext); }
"-"         { write_token("OPERATOR",    yytext); }
"*"         { write_token("OPERATOR",    yytext); }
"/"         { write_token("OPERATOR",    yytext); }
"%"         { write_token("OPERATOR",    yytext); }
"+="        { write_token("OPERATOR",    yytext); }
"-="        { write_token("OPERATOR",    yytext); }

":"         { write_token("PUNCTUATION", yytext); }
","         { write_token("PUNCTUATION", yytext); }
"."         { write_token("PUNCTUATION", yytext); }
"("         { write_token("PUNCTUATION", yytext); }
")"         { write_token("PUNCTUATION", yytext); }
"["         { write_token("PUNCTUATION", yytext); }
"]"         { write_token("PUNCTUATION", yytext); }

[0-9]+\.[0-9]+              { write_token("FLOAT",       yytext); }
[0-9]+                      { write_token("INTEGER",     yytext); }

\"[^\"]*\"                  { write_token("STRING",      yytext); }
'[^']*'                     { write_token("STRING",      yytext); }

#[^\n]*                     { write_token("COMMENT",     yytext); }

[a-zA-Z_][a-zA-Z0-9_]*     { write_token("IDENTIFIER",  yytext); }

[ \t\r\n]+                  { /* skip whitespace */ }

.                           {
                                char msg[64];
                                snprintf(msg, sizeof(msg), "Unknown token: %s", yytext);
                                write_token("ERROR", msg);
                            }

%%

int yywrap() { return 1; }

void write_token(const char *type, const char *value) {
    printf("%-15s %-30s\n", type, value);
    fprintf(outfile, "%-15s %-30s\n", type, value);
}

int main() {
    outfile = fopen("output.txt", "w");
    if (!outfile) {
        fprintf(stderr, "Error: could not open output.txt\n");
        return 1;
    }

    printf("%-15s %-30s\n", "TOKEN_TYPE", "VALUE");
    printf("%-15s %-30s\n", "---------------", "------------------------------");
    fprintf(outfile, "%-15s %-30s\n", "TOKEN_TYPE", "VALUE");
    fprintf(outfile, "%-15s %-30s\n", "---------------", "------------------------------");

    yylex();

    fclose(outfile);
    return 0;
}
