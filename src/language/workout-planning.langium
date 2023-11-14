grammar WorkoutPlanning

entry Model:
    (persons+=Person | greetings+=Greeting | exercises+=Exercise | days+=Day | assigns+=assign)*;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

Exercise:
    'Exercise' name=ID
    'duration' time=INT
    'bodyPart' bodyPart=ID
    'kcal' kcal=INT
;    

Day:
    'Day' name=ID
    'duration' time=INT
    'bodyPart' bodyPart+=ID*
;    

assign:
    'assign exercises' day=[Day:ID]
;    

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
