import { Day, Exercise, Model } from '../language/generated/ast.js';
import * as fs from 'node:fs';
import { CompositeGeneratorNode, NL, toString } from 'langium';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';

export function generateJavaScript(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    //model.greetings.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.person.ref?.name}!');`, NL));

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, toString(fileNode));
    return generatedFilePath;
}


export function act(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.txt`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    model.exercises.forEach(exo => fileNode.append(`console.log('Hello, ${exo.name}!');`, NL));
    model.days.forEach(day => fileNode.append(`console.log('Hello, ${day.name}!');`, NL));
    const calendar = maximizeExercises(model.days, model.exercises)

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, convertCalendarToString(calendar));
    return generatedFilePath;
}

function maximizeExercises(days: Day[], exercises: Exercise[]): Map<Day, Exercise[]> {
    exercises.sort((a: Exercise, b: Exercise) => {
      if (b.duration !== a.duration) {
        return b.duration - a.duration;
      }
      return a.bodyPart.localeCompare(b.bodyPart);
    });
  
    const assignedExercises = new Map<Day, Exercise[]>();
  
    for (const day of days) {
      const dayExercises: Exercise[] = [];
  
      let remainingDuration = day.duration;
      for (const exercise of exercises) {
        if (
          remainingDuration >= exercise.duration &&
          day.bodyParts.includes(exercise.bodyPart)
        ) {
          dayExercises.push(exercise);
          remainingDuration -= exercise.duration;
        }
      }
  
      assignedExercises.set(day, dayExercises);
    }
  
    return assignedExercises;
  }


function convertCalendarToString(calendrier: Map<Day, Exercise[]>): string {
    let resultString = '';


    for (const [day, exercises] of calendrier.entries()) {
        resultString += `${day.name}\n`;
        resultString += `  Body parts: ${day.bodyParts.join(', ')}\n`;
        resultString += `  Duration: ${day.duration} minutes\n`;
        resultString += `  Exercises:\n`;

        for (const exercise of exercises) {
            resultString += `   - Exercise: ${exercise.name}\n`;
        }
    }

    return resultString;
}

// Monday
// - Body parts: upper,lower,abs
// - Duration : 50 minutes
// - Exercises :
// 	- ExerciseUpper
// 	- ExerciceLowerShort
// 	- ExerciseAbs
// - Total kcal consumed: 1140

// Tuesday
// - Body parts: upper,lower,abs
// - Duration : 30 minutes
// - Exercises :
// 	- ExerciceLowerLong
// 	- ExerciceLowerShort
// - Total kcal consumed: 400