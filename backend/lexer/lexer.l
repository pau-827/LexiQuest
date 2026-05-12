%{
#include <stdio.h>
#include <string.h>

FILE *outfile;
void write_token(const char *type, const char *value);
%}

%%

"say"                           { write_token("PRINT",    yytext); }
"add"                           { write_token("ADD",      yytext); }
"mul"                           { write_token("MULTIPLY", yytext); }
"weather"                       { write_token("WEATHER",  yytext); }
"play"                          { write_token("MUSIC",    yytext); }

[0-9]+                          { write_token("NUMBER",   yytext); }
\"[^\"]*\"                      { write_token("STRING",   yytext); }

[ \t\r\n]+                      { /* skip whitespace */ }

[a-zA-Z][a-zA-Z0-9_]*          { write_token("UNKNOWN_CMD", yytext); }

.                               {
                                    char msg[64];
                                    snprintf(msg, sizeof(msg), "Unknown token: %s", yytext);
                                    write_token("ERROR", msg);
                                }

%%

int yywrap() { return 1; }

void write_token(const char *type, const char *value) {
    printf("%-20s %-30s\n", type, value);
    fprintf(outfile, "%-20s %-30s\n", type, value);
}

int main() {
    outfile = fopen("output.txt", "w");
    if (!outfile) {
        fprintf(stderr, "Error: could not open output.txt\n");
        return 1;
    }

    printf("%-20s %-30s\n", "TOKEN_TYPE", "VALUE");
    printf("%-20s %-30s\n", "--------------------", "------------------------------");
    fprintf(outfile, "%-20s %-30s\n", "TOKEN_TYPE", "VALUE");
    fprintf(outfile, "%-20s %-30s\n", "--------------------", "------------------------------");

    yylex();

    fclose(outfile);
    return 0;
}
