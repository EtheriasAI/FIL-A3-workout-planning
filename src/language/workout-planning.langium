grammar WorkoutPlanning

entry Model:
    (exercises+=Exercise | days+=Day)*;

Exercise:
    'Exercise' name=ID
    'duration:' duration=INT
    'bodyPart:' bodyPart=ID
    'kcal:' kcal=INT
;    

Day:
    'Day' name=ID
    'duration:' duration=INT
    'bodyParts:' bodyParts+=ID*
;    

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
