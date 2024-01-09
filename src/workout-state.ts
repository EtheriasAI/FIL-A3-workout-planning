import { DayState } from "./day-state.js";
import { ExerciseState } from "./exercise-state.js";
import { Model } from "./language/generated/ast.js";

export class WorkoutState {
    readonly workout: Model;
    readonly days: DayState[] = [];
    readonly exercises: ExerciseState[] = [];
    
    constructor(workout: Model){
        this.workout = workout;

        workout.days.forEach(day => {
            this.days.push(new DayState(day));
        });

        workout.exercises.forEach(exercise => {
            this.exercises.push(new ExerciseState(exercise));
        });
    }
}