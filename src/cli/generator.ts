import { Day, Exercise, Model } from '../language/generated/ast.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';

export class WorkoutGenerator {
  calendar = new Map<Day, Exercise[]>();
  daysToFill: Day[] = [];
  exercises: Exercise[] = [];

  constructor(){}
  
  generateWorkoutPlan(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.txt`;
    this.daysToFill = model.days;
    this.exercises = model.exercises;

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, this.convertCalendarToString(this.calendar));
    return generatedFilePath;
  }

  maximizeExercises(){
    const sortedExercises = this.sortExercises();

    this.populateDays(sortedExercises);
  }


  sortExercises() {
    return this.exercises.sort((a: Exercise, b: Exercise) => {
      return b.duration - a.duration;
    });
  }

  populateDays(exercises: Exercise[]) {
    while (!this.isFinished()) {
      this.populateDay(exercises);
    }
  }

  populateDay(exercises: Exercise[]) {
    const day = this.daysToFill.pop() as Day;
    if(!day) return;
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

    this.calendar.set(day, dayExercises);
  }
  
  isFinished(): boolean {
    return this.daysToFill.length === 0;
  }

  convertCalendarToString(calendrier: Map<Day, Exercise[]>): string {
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
}